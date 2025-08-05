import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { generateAnonymousId } from '@/lib/utils'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            consultantProfile: true,
            clientProfile: true,
            trainerProfile: true,
            adminProfile: true
          }
        })

        if (!user) {
          return null
        }

        // For OAuth users, password might be null
        const userWithPassword = user as typeof user & { password?: string }
        if (userWithPassword.password) {
          const isPasswordValid = await bcrypt.compare(credentials.password, userWithPassword.password)
          if (!isPasswordValid) {
            return null
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'role' in user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token.role && session.user) {
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
    async signIn({ user, account }) {
      // Handle OAuth sign-in
      if (account?.provider === 'google' || account?.provider === 'linkedin') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Create new user with default role
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                image: user.image,
                role: 'CONSULTANT', // Default role, user can change later
                emailVerified: new Date()
              }
            })

            // Create consultant profile with anonymous ID
            await prisma.consultantProfile.create({
              data: {
                userId: newUser.id,
                anonymousId: generateAnonymousId(),
                yearsExperience: 0,
                specializations: [],
                certifications: [],
                skills: [],
                preferredProjectTypes: []
              }
            })
          }
        } catch (error) {
          console.error('Error creating user:', error)
          return false
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
})

export { handler as GET, handler as POST }
