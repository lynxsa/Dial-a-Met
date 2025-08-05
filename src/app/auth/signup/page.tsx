'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pickaxe, User, Building, GraduationCap, Briefcase, Shield } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'

function SignUpForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { login } = useAuth()
  const initialRole = searchParams.get('role') || ''
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: initialRole,
    companyName: '',
    acceptTerms: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const roles = [
    {
      id: 'mine',
      title: 'Mining Company',
      description: 'Post projects and hire expert consultants',
      icon: Building,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'consultant',
      title: 'Mining Consultant',
      description: 'Offer expertise and bid on projects',
      icon: User,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'trainer',
      title: 'Training Provider',
      description: 'Provide training and certification courses',
      icon: GraduationCap,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'job_seeker',
      title: 'Job Seeker',
      description: 'Find career opportunities in mining',
      icon: Briefcase,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Route to appropriate dashboard based on role
    const roleRoutes = {
      mine: '/dashboard/mine',
      consultant: '/dashboard/consultant', 
      trainer: '/dashboard/training',
      job_seeker: '/dashboard/career'
    }
    
    const route = roleRoutes[formData.role as keyof typeof roleRoutes] || '/dashboard'
    
    // For demo purposes, simulate signup and redirect
    console.log('Signup:', formData)
    window.location.href = route
  }

  const handleRoleSelect = (roleId: string) => {
    setFormData(prev => ({ ...prev, role: roleId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms || isSubmitting) return

    setIsSubmitting(true)

    try {
      // Demo implementation - in production, this would be an API call
      const newUser = {
        id: `user_${Date.now()}`,
        email: formData.email,
        name: formData.name,
        role: formData.role.toUpperCase()
      }

      // Login the user
      login(newUser)

      // Redirect based on role
      const roleRoutes = {
        mine: '/dashboard/mine',
        consultant: '/dashboard/consultant', 
        trainer: '/dashboard/training',
        job_seeker: '/dashboard/career',
        admin: '/dashboard/admin'
      }

      const redirectRoute = roleRoutes[formData.role as keyof typeof roleRoutes] || '/dashboard'
      router.push(redirectRoute)
    } catch (error) {
      console.error('Signup error:', error)
      alert('An error occurred during signup. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Pickaxe className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-white">Dial-a-Met</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join the Mining Expertise Network</h1>
          <p className="text-slate-300">Choose your role and start connecting with industry professionals</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            {!formData.role && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Select Your Role</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role) => {
                    const IconComponent = role.icon
                    const colorClasses = {
                      blue: 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20',
                      green: 'border-green-500 bg-green-500/10 hover:bg-green-500/20',
                      purple: 'border-purple-500 bg-purple-500/10 hover:bg-purple-500/20'
                    }
                    
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleSelect(role.id)}
                        className={`p-4 border-2 rounded-lg transition-all duration-200 text-left ${colorClasses[role.color as keyof typeof colorClasses]}`}
                      >
                        <div className="flex items-start space-x-3">
                          <IconComponent className={`h-6 w-6 text-${role.color}-400 mt-1`} />
                          <div>
                            <h4 className="font-semibold text-white">{role.title}</h4>
                            <p className="text-sm text-slate-300">{role.description}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Form Fields */}
            {formData.role && (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-slate-400">Selected role:</span>
                  <span className="text-white font-semibold">
                    {roles.find(r => r.id === formData.role)?.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: '' }))}
                    className="text-blue-400 hover:text-blue-300 text-sm underline ml-2"
                  >
                    Change
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                {(formData.role === 'CLIENT' || formData.role === 'TRAINER') && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company/Organization Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your company name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a secure password"
                  />
                </div>

                {/* OAuth Options */}
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </button>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      required
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                      className="mt-1 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-300">
                      I agree to the{' '}
                      <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!formData.acceptTerms || isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-slate-400">Already have an account? </span>
                  <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300">
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center mt-6 space-x-2 text-slate-400">
          <Shield className="h-4 w-4" />
          <span className="text-sm">Secured with enterprise-grade encryption</span>
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  )
}
