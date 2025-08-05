'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Home, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Award,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from './AuthProvider'

interface SidebarProps {
  userRole: string
}

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
  roles: string[]
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['ALL'] },
  { name: 'My Projects', href: '/dashboard/client', icon: FileText, roles: ['MINE_CLIENT'] },
  { name: 'New Request', href: '/dashboard/client/new-request', icon: FileText, roles: ['MINE_CLIENT'] },
  { name: 'Opportunities', href: '/dashboard/consultant', icon: Briefcase, roles: ['CONSULTANT'] },
  { name: 'My Bids', href: '/dashboard/consultant/bids', icon: TrendingUp, roles: ['CONSULTANT'] },
  { name: 'Job Search', href: '/dashboard/career', icon: Users, roles: ['JOB_SEEKER'] },
  { name: 'Applications', href: '/dashboard/career/applications', icon: FileText, roles: ['JOB_SEEKER'] },
  { name: 'Training Center', href: '/dashboard/training', icon: GraduationCap, roles: ['TRAINER', 'JOB_SEEKER'] },
  { name: 'My Courses', href: '/dashboard/training/courses', icon: Award, roles: ['TRAINER'] },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, roles: ['MINE_CLIENT', 'CONSULTANT', 'ADMIN'] },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare, roles: ['ALL'] },
  { name: 'Admin Panel', href: '/dashboard/admin', icon: Shield, roles: ['ADMIN'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['ALL'] }
]

export default function Sidebar({ userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/signin')
  }

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes('ALL') || item.roles.includes(userRole)
  )

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-slate-800 border-r border-slate-700 flex flex-col`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-white font-semibold text-lg">Dial-a-Met</h2>
              <p className="text-slate-400 text-sm">Mining Marketplace</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors group"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Link
          href="/dashboard/profile"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">U</span>
          </div>
          {!collapsed && (
            <span className="font-medium">Profile</span>
          )}
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-red-600/20 transition-colors w-full"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  )
}
