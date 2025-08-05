'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  FolderOpen,
  Search,
  MessageSquare,
  BarChart3,
  GraduationCap,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Pickaxe,
  Plus,
  Eye,
  Star,
  Briefcase,
  Bell,
  CreditCard,
  User,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'

interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
}

interface NavigationItem {
  icon: React.ReactNode
  label: string
  href: string
  badge: string | null
  highlight?: boolean
}

export default function UniversalSidebar({ isOpen = true, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getNavigationItems = (): NavigationItem[] => {
    const baseItems = [
      {
        icon: <Home className="w-5 h-5" />,
        label: 'Dashboard',
        href: `/dashboard/${user?.role?.toLowerCase()}`,
        badge: null
      },
      {
        icon: <FolderOpen className="w-5 h-5" />,
        label: 'My Projects',
        href: `/dashboard/${user?.role?.toLowerCase()}/projects`,
        badge: user?.role === 'CLIENT' ? '3' : '7'
      }
    ]

    // Role-specific navigation
    const roleSpecificItems = {
      CLIENT: [
        {
          icon: <Plus className="w-5 h-5" />,
          label: 'Post Project',
          href: `/dashboard/client/new-request`,
          badge: null,
          highlight: true
        },
        {
          icon: <Search className="w-5 h-5" />,
          label: 'Browse Consultants',
          href: `/dashboard/client/consultants`,
          badge: null
        },
        {
          icon: <Eye className="w-5 h-5" />,
          label: 'Bid Wars',
          href: `/dashboard/client/bid-wars`,
          badge: '2'
        }
      ],
      CONSULTANT: [
        {
          icon: <Search className="w-5 h-5" />,
          label: 'Discover Work',
          href: `/dashboard/consultant/discover`,
          badge: '47'
        },
        {
          icon: <Star className="w-5 h-5" />,
          label: 'My Bids',
          href: `/dashboard/consultant/bids`,
          badge: '5'
        },
        {
          icon: <User className="w-5 h-5" />,
          label: 'Profile & Portfolio',
          href: `/dashboard/consultant/profile`,
          badge: null
        }
      ],
      TRAINER: [
        {
          icon: <GraduationCap className="w-5 h-5" />,
          label: 'My Courses',
          href: `/dashboard/trainer/courses`,
          badge: null
        },
        {
          icon: <Users className="w-5 h-5" />,
          label: 'Students',
          href: `/dashboard/trainer/students`,
          badge: '42'
        }
      ],
      JOB_SEEKER: [
        {
          icon: <Briefcase className="w-5 h-5" />,
          label: 'Job Board',
          href: `/dashboard/career/jobs`,
          badge: '23'
        },
        {
          icon: <User className="w-5 h-5" />,
          label: 'My Applications',
          href: `/dashboard/career/applications`,
          badge: '3'
        }
      ],
      ADMIN: [
        {
          icon: <BarChart3 className="w-5 h-5" />,
          label: 'Analytics',
          href: `/dashboard/admin/analytics`,
          badge: null
        },
        {
          icon: <Users className="w-5 h-5" />,
          label: 'User Management',
          href: `/dashboard/admin/users`,
          badge: null
        }
      ]
    }

    const commonItems = [
      {
        icon: <MessageSquare className="w-5 h-5" />,
        label: 'Messages',
        href: `/dashboard/messages`,
        badge: '12'
      },
      {
        icon: <BarChart3 className="w-5 h-5" />,
        label: 'Analytics',
        href: `/dashboard/analytics`,
        badge: null
      },
      {
        icon: <GraduationCap className="w-5 h-5" />,
        label: 'Training Hub',
        href: `/dashboard/training`,
        badge: null
      },
      {
        icon: <Briefcase className="w-5 h-5" />,
        label: 'Career Portal',
        href: `/dashboard/career`,
        badge: null
      }
    ]

    const userRole = user?.role as keyof typeof roleSpecificItems
    const specificItems = roleSpecificItems[userRole] || []

    return [...baseItems, ...specificItems, ...commonItems]
  }

  const navigationItems = getNavigationItems()

  const bottomItems = [
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Notifications',
      href: '/dashboard/notifications',
      badge: '5'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Billing',
      href: '/dashboard/billing',
      badge: null
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      href: '/dashboard/settings',
      badge: null
    }
  ]

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <Pickaxe className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-slate-900">Dial-a-Met</h2>
              <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()} Portal</p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        )}
      </div>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 truncate">
                {user?.name || 'Demo User'}
              </h3>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-slate-600">4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className={`
              group relative flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200
              ${isActiveRoute(item.href) 
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700' 
                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
              }
              ${item.highlight ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800' : ''}
              ${isCollapsed ? 'justify-center' : ''}
            `}>
              <div className={`
                ${isActiveRoute(item.href) ? 'text-blue-600' : ''}
                ${item.highlight ? 'text-white' : ''}
              `}>
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <>
                  <span className="flex-1 font-medium">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${isActiveRoute(item.href) 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-200 text-slate-700'
                        }
                        ${item.highlight ? 'bg-white/20 text-white' : ''}
                      `}>
                        {item.badge}
                      </span>
                    )}
                    {isActiveRoute(item.href) && (
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-200 p-4 space-y-2">
        {bottomItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className={`
              group relative flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200
              ${isActiveRoute(item.href) 
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700' 
                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
              }
              ${isCollapsed ? 'justify-center' : ''}
            `}>
              <div className={isActiveRoute(item.href) ? 'text-blue-600' : ''}>
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${isActiveRoute(item.href) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-red-100 text-red-600'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 px-1.5 py-0.5 bg-red-500 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={logout}
          className={`
            group relative w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200
            hover:bg-red-50 text-slate-600 hover:text-red-600
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="flex-1 text-sm font-medium">Sign Out</span>}
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Sign Out
            </div>
          )}
        </button>
      </div>

      {/* Expand Button for Collapsed State */}
      {isCollapsed && (
        <div className="p-2 border-t border-slate-200">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-full p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
          >
            <Menu className="w-5 h-5 mx-auto" />
          </button>
        </div>
      )}
    </div>
  )

  // Mobile sidebar (overlay)
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-slate-900/50" onClick={onToggle} />
            <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl">
              <SidebarContent />
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className={`
      hidden lg:flex flex-col bg-white border-r border-slate-200 shadow-lg transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-80'}
    `}>
      <SidebarContent />
    </div>
  )
}
