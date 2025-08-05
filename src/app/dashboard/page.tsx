'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'

export default function DashboardRedirect() {
  const router = useRouter()
  const { classes } = useThemeClasses()

  useEffect(() => {
    // In a real app, this would come from authentication/session
    // For now, we'll detect the role from localStorage or default to consultant
    const userRole = localStorage.getItem('userRole') || 'consultant'
    
    switch (userRole) {
      case 'MINE_CLIENT':
        router.replace('/dashboard/mine_client')
        break
      case 'CONSULTANT':
        router.replace('/dashboard/consultant')
        break
      case 'ADMIN':
        router.replace('/dashboard/admin')
        break
      case 'JOB_SEEKER':
        router.replace('/dashboard/career')
        break
      case 'TRAINER':
        router.replace('/dashboard/training')
        break
      default:
        router.replace('/dashboard/consultant')
    }
  }, [router])

  return (
    <div className={`min-h-screen ${classes.background.page} flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className={classes.text.secondary}>Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
