'use client'

import { ReactNode } from 'react'
import UniversalSidebar from '@/components/Navigation/UniversalSidebar'
import { EnhancedThemeToggle } from '@/components/theme/EnhancedThemeToggle'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { useAuth } from '@/components/AuthProvider'
import { Button } from '@/components/ui/button'
import { Bell, Search, Plus, MessageSquare } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  quickAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function DashboardLayout({ 
  children, 
  title, 
  subtitle,
  quickAction
}: DashboardLayoutProps) {
  const { classes } = useThemeClasses()
  const { user } = useAuth()

  // Map user roles to sidebar format
  const getSidebarRole = (role: string): 'client' | 'consultant' | 'admin' => {
    const roleMap: Record<string, 'client' | 'consultant' | 'admin'> = {
      'MINE': 'client',
      'MINE_CLIENT': 'client', 
      'CONSULTANT': 'consultant',
      'ADMIN': 'admin',
      'JOB_SEEKER': 'consultant',
      'TRAINER': 'consultant'
    }
    return roleMap[role] || 'consultant'
  }

  const sidebarRole = user ? getSidebarRole(user.role) : 'consultant'
  const userName = user?.name || 'User'

  // Quick action handlers
  const handleCreateProject = () => {
    window.location.href = '/dashboard/mine/new-project'
  }

  const handleCreateBid = () => {
    window.location.href = '/dashboard/consultant/bid-studio'
  }

  return (
    <div className={classes.background.page}>
      <div className="flex min-h-screen">
        {/* Enhanced Universal Sidebar */}
        <UniversalSidebar 
          userRole={sidebarRole}
          userName={userName}
          notifications={5}
          onCreateProject={handleCreateProject}
          onCreateBid={handleCreateBid}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className={`
            border-b backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-sm
            ${classes.background.card} ${classes.border}
            sticky top-0 z-40 shadow-sm
          `}>
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-6">
                <div>
                  {title && (
                    <h1 className={`text-2xl font-bold ${classes.text.primary}`}>
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className={`text-sm ${classes.text.secondary}`}>
                      {subtitle}
                    </p>
                  )}
                </div>
                
                {quickAction && (
                  <Button 
                    onClick={quickAction.onClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {quickAction.label}
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`pl-10 pr-4 py-2 w-64 rounded-lg border ${classes.border} bg-transparent ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                
                {/* Messages */}
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0 relative">
                  <MessageSquare className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
                </Button>
                
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0 relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                
                {/* Enhanced Theme Toggle */}
                <EnhancedThemeToggle variant="compact" />
              </div>
            </div>
          </header>
          
          {/* Page Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
