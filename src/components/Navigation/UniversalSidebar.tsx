'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { 
  Home,
  Search,
  Briefcase,
  MessageSquare,
  BarChart3,
  GraduationCap,
  Users,
  Settings,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Award,
  Target,
  DollarSign,
  User,
  LogOut,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  children?: NavigationItem[]
}

interface UniversalSidebarProps {
  userRole: 'client' | 'consultant' | 'admin'
  userName: string
  notifications: number
  onCreateProject?: () => void
  onCreateBid?: () => void
}

export default function UniversalSidebar({
  userRole,
  userName,
  notifications,
  onCreateProject,
  onCreateBid
}: UniversalSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  
  // Auto-expand bid menu if on any bid-related page
  const [expandedItems, setExpandedItems] = useState<string[]>(
    pathname.startsWith('/bid') ? ['/bids'] : []
  )

  const handleLogout = () => {
    logout()
    router.push('/auth/signin')
  }

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = []

    // Role-specific navigation
    if (userRole === 'client') {
      baseItems.push(
        {
          title: 'Dashboard',
          href: '/dashboard/mine',
          icon: Home,
        },
        {
          title: 'My Projects',
          href: '/dashboard/mine/projects',
          icon: Briefcase,
          badge: 4,
        },
        {
          title: 'Browse Consultants',
          href: '/browse',
          icon: Search,
        },
        {
          title: 'Bid Wars',
          href: '/dashboard/mine/bid-wars',
          icon: Zap,
          badge: 2,
        },
        {
          title: 'Messages',
          href: '/dashboard/messages',
          icon: MessageSquare,
          badge: 7,
        },
        {
          title: 'Analytics',
          href: '/dashboard/mine/analytics',
          icon: BarChart3,
        },
        {
          title: 'Billing',
          href: '/dashboard/billing',
          icon: DollarSign,
        }
      )
    } else if (userRole === 'consultant') {
      baseItems.push(
        {
          title: 'Dashboard', 
          href: '/dashboard/consultant',
          icon: Home,
        },
        {
          title: 'Discover Work',
          href: '/browse-opportunities',
          icon: Search,
          badge: 12,
        },
        {
          title: 'My Bids',
          href: '/dashboard/consultant/bids',
          icon: Target,
          badge: 6,
          children: [
            {
              title: 'Active Bids',
              href: '/dashboard/consultant/bids/active',
              icon: Target,
            },
            {
              title: 'Bid Studio',
              href: '/dashboard/consultant/bid-studio', 
              icon: Plus,
            },
            {
              title: 'Bid History',
              href: '/dashboard/consultant/bids/history',
              icon: BarChart3,
            },
            {
              title: 'Live Bid Wars',
              href: '/dashboard/consultant/bid-wars',
              icon: Zap,
            }
          ]
        },
        {
          title: 'Active Projects',
          href: '/dashboard/consultant/projects',
          icon: Briefcase,
          badge: 3,
        },
        {
          title: 'Messages',
          href: '/dashboard/messages',
          icon: MessageSquare,
          badge: 5,
        },
        {
          title: 'Earnings',
          href: '/dashboard/consultant/earnings',
          icon: DollarSign,
        },
        {
          title: 'Profile',
          href: '/dashboard/consultant/profile',
          icon: User,
        }
      )
    } else if (userRole === 'admin') {
      baseItems.push(
        {
          title: 'Dashboard',
          href: '/dashboard/admin',
          icon: Home,
        },
        {
          title: 'User Management',
          href: '/dashboard/admin/users',
          icon: Users,
          badge: 15,
        },
        {
          title: 'Bid Monitoring',
          href: '/dashboard/admin/bids',
          icon: Target,
        },
        {
          title: 'Analytics',
          href: '/dashboard/admin/analytics',
          icon: BarChart3,
        },
        {
          title: 'Reports',
          href: '/dashboard/admin/reports',
          icon: BarChart3,
        }
      )
    }

    // Common items for all roles
    baseItems.push(
      {
        title: 'Training Hub',
        href: '/dashboard/training',
        icon: GraduationCap,
      },
      {
        title: 'Career Portal',
        href: '/dashboard/career',
        icon: Users,
      },
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
      }
    )

    return baseItems
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const getQuickAction = () => {
    if (userRole === 'client') {
      return {
        label: 'Post New Project',
        icon: Plus,
        action: onCreateProject,
        color: 'bg-blue-600 hover:bg-blue-700',
        href: '/dashboard/mine/new-project'
      }
    } else if (userRole === 'consultant') {
      return {
        label: 'Create New Bid',
        icon: Target,
        action: onCreateBid,
        color: 'bg-green-600 hover:bg-green-700',
        href: '/dashboard/consultant/bid-studio'
      }
    } else if (userRole === 'admin') {
      return {
        label: 'Admin Panel',
        icon: Settings,
        action: () => window.location.href = '/dashboard/admin',
        color: 'bg-purple-600 hover:bg-purple-700',
        href: '/dashboard/admin'
      }
    }
    return null
  }

  const quickAction = getQuickAction()

  const getRoleDisplayInfo = () => {
    const roleInfo = {
      client: {
        title: 'Mining Company',
        subtitle: 'Project Manager',
        color: 'bg-blue-500',
        icon: DollarSign
      },
      consultant: {
        title: 'Mining Consultant',
        subtitle: 'Expert Professional',
        color: 'bg-green-500',
        icon: Award
      },
      admin: {
        title: 'Administrator',
        subtitle: 'Platform Manager',
        color: 'bg-purple-500',
        icon: Settings
      }
    }
    return roleInfo[userRole]
  }

  const roleInfo = getRoleDisplayInfo()

  return (
    <div className={`${
      isCollapsed ? 'w-16' : 'w-64'
    } h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col`}>
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DM</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Dial-a-Met
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Mining Marketplace
                </p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-600 dark:text-slate-300"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Enhanced User Profile */}
        {!isCollapsed && (
          <div className="mt-4 relative">
            <div 
              className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className={`w-10 h-10 ${roleInfo.color} rounded-full flex items-center justify-center text-white shadow-sm`}>
                <roleInfo.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {userName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {roleInfo.subtitle}
                </p>
              </div>
              {notifications > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {notifications}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>

            {/* Enhanced User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-600 mb-2">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {roleInfo.title}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 w-full p-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex items-center space-x-2 w-full p-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                    {notifications > 0 && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {notifications}
                      </Badge>
                    )}
                  </Link>
                  <hr className="my-2 border-slate-200 dark:border-slate-600" />
                  <button
                    className="flex items-center space-x-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    onClick={() => {
                      setShowUserMenu(false)
                      handleLogout()
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Quick Action Button */}
        {quickAction && !isCollapsed && (
          <div className="mt-4 space-y-2">
            <Button
              onClick={quickAction.action}
              className={`w-full ${quickAction.color} text-white flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <quickAction.icon className="h-4 w-4" />
              <span>{quickAction.label}</span>
            </Button>
            
            {/* Secondary Action */}
            {userRole === 'consultant' && (
              <Button
                onClick={() => window.location.href = '/browse-opportunities'}
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Search className="h-4 w-4 mr-2" />
                Find Work
              </Button>
            )}
            
            {userRole === 'client' && (
              <Button
                onClick={() => window.location.href = '/browse'}
                variant="outline" 
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Search className="h-4 w-4 mr-2" />
                Find Experts
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {getNavigationItems().map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItems.includes(item.href)
            
            return (
              <div key={item.href}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpanded(item.href)}
                    className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      active
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${
                      isCollapsed ? 'mx-auto' : 'mr-3'
                    } ${
                      active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
                    }`} />
                    
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <div className="flex items-center space-x-1">
                          {item.badge && item.badge > 0 && (
                            <Badge 
                              variant={active ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      active
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${
                      isCollapsed ? 'mx-auto' : 'mr-3'
                    } ${
                      active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
                    }`} />
                    
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {item.badge && item.badge > 0 && (
                          <Badge 
                            variant={active ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )}
                
                {/* Sub-menu items */}
                {hasChildren && isExpanded && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon
                      const childActive = isActive(child.href)
                      
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`group flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            childActive
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          }`}
                        >
                          <ChildIcon className={`h-4 w-4 mr-2 ${
                            childActive ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                          }`} />
                          <span>{child.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Enhanced Footer with Theme Toggle */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
        {!isCollapsed && (
          <>
            {/* Theme Controls */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Display Mode
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => document.documentElement.classList.remove('dark')}
                    className="p-2 rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Light mode"
                  >
                    <Sun className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => document.documentElement.classList.add('dark')}
                    className="p-2 rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Dark mode"
                  >
                    <Moon className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        document.documentElement.classList.add('dark')
                      } else {
                        document.documentElement.classList.remove('dark')
                      }
                    }}
                    className="p-2 rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="System mode"
                  >
                    <Monitor className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Version Info */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Dial-a-Met v2.0
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Mining Marketplace
              </p>
            </div>
          </>
        )}
        
        {/* Collapsed state theme toggle */}
        {isCollapsed && (
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-2 rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              title="Toggle theme"
            >
              <Sun className="w-4 h-4 block dark:hidden" />
              <Moon className="w-4 h-4 hidden dark:block" />
            </button>
          </div>
        )}
      </div>

      {/* Click outside handler for user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  )
}
