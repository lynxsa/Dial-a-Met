'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { useAuth } from '@/components/AuthProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { 
  Pickaxe, 
  Mail, 
  Lock, 
  User, 
  Building, 
  GraduationCap, 
  UserCheck,
  Shield
} from 'lucide-react'
import Link from 'next/link'

interface DemoCredential {
  email: string
  password: string
  role: string
  name: string
  description: string
  icon: React.ReactNode
}

const demoCredentials: DemoCredential[] = [
  {
    email: 'client@dialammet.com',
    password: 'demo123',
    role: 'MINE_CLIENT',
    name: 'Mine Client',
    description: 'Post projects and hire experts',
    icon: <Building className="h-6 w-6" />
  },
  {
    email: 'consultant@dialammet.com',
    password: 'demo123',
    role: 'CONSULTANT',
    name: 'Mining Consultant',
    description: 'Bid on projects anonymously',
    icon: <UserCheck className="h-6 w-6" />
  },
  {
    email: 'jobseeker@dialammet.com',
    password: 'demo123',
    role: 'JOB_SEEKER',
    name: 'Job Seeker',
    description: 'Find career opportunities',
    icon: <User className="h-6 w-6" />
  },
  {
    email: 'trainer@dialammet.com',
    password: 'demo123',
    role: 'TRAINER',
    name: 'Training Provider',
    description: 'Offer mining education',
    icon: <GraduationCap className="h-6 w-6" />
  },
  {
    email: 'admin@dialammet.com',
    password: 'demo123',
    role: 'ADMIN',
    name: 'Administrator',
    description: 'Platform management',
    icon: <Shield className="h-6 w-6" />
  }
]

export default function SignInPage() {
  const { classes } = useThemeClasses()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate authentication with demo credentials
      const demoUser = demoCredentials.find(
        (cred) => cred.email === email && cred.password === password
      )

      if (demoUser) {
        // Create user object for AuthProvider
        const user = {
          id: `user_${Date.now()}`,
          email: demoUser.email,
          name: demoUser.name,
          role: demoUser.role
        }

        // Login using AuthProvider
        login(user)

        // Redirect based on role
        const roleRoutes = {
          'MINE_CLIENT': '/dashboard/mine',
          'MINE': '/dashboard/mine',
          'CONSULTANT': '/dashboard/consultant',
          'JOB_SEEKER': '/dashboard/career',
          'TRAINER': '/dashboard/training',
          'ADMIN': '/dashboard/admin'
        }

        const redirectRoute = roleRoutes[demoUser.role as keyof typeof roleRoutes] || '/dashboard'
        router.push(redirectRoute)
      } else {
        setError('Invalid credentials. Please use one of the demo accounts below.')
      }
    } catch {
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (credential: DemoCredential) => {
    setEmail(credential.email)
    setPassword(credential.password)
  }

  return (
    <div className={`min-h-screen ${classes.background.page}`}>
      {/* Enhanced Navigation */}
      <nav className={`${classes.background.card}/95 backdrop-blur-lg border-b ${classes.border} shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg group-hover:scale-105 transition-transform">
                <Pickaxe className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400`}>Dial-a-Met</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/">
                <button className={`${classes.text.secondary} hover:text-blue-600 px-4 py-2 font-medium transition-colors`}>
                  ← Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full space-y-8">
          {/* Enhanced Header */}
          <div className="text-center">
            <h2 className={`text-3xl font-bold ${classes.text.primary}`}>
              Welcome Back to Dial-a-Met
            </h2>
            <p className={`mt-2 text-sm ${classes.text.secondary}`}>
              Sign in to access your mining consultation platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sign In Form */}
            <div className={`${classes.background.card} rounded-2xl shadow-xl border ${classes.border} p-8`}>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-xl font-semibold ${classes.text.primary} mb-2`}>Sign In</h3>
                  <p className={`text-sm ${classes.text.secondary}`}>
                    Enter your credentials to access your account
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${classes.text.primary} mb-1`}>
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${classes.text.muted}`} />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 w-full px-3 py-2 border ${classes.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${classes.background.card} ${classes.text.primary}`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className={`block text-sm font-medium ${classes.text.primary} mb-1`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${classes.text.muted}`} />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 w-full px-3 py-2 border ${classes.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${classes.background.card} ${classes.text.primary}`}
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                <div className="text-center">
                  <Link href="/auth/signup" className="text-sm text-blue-600 hover:text-blue-500">
                    Don&apos;t have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className={`${classes.background.card} rounded-2xl shadow-xl border ${classes.border} p-8`}>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-xl font-semibold ${classes.text.primary} mb-2`}>Demo Accounts</h3>
                  <p className={`text-sm ${classes.text.secondary}`}>
                    Try the platform with these demo accounts
                  </p>
                </div>

                <div className="space-y-3">
                  {demoCredentials.map((credential, index) => (
                    <button
                      key={index}
                      onClick={() => handleDemoLogin(credential)}
                      className={`w-full p-4 border ${classes.border} rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-left group`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 text-blue-600">
                          {credential.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${classes.text.primary} group-hover:text-blue-600`}>
                            {credential.name}
                          </p>
                          <p className={`text-xs ${classes.text.secondary}`}>
                            {credential.description}
                          </p>
                          <p className={`text-xs ${classes.text.muted} mt-1`}>
                            {credential.email}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className={`p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800`}>
                  <p className={`text-xs ${classes.text.secondary}`}>
                    <strong>All demo accounts use password:</strong> demo123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
