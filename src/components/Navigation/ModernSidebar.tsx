'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Briefcase,
  Users,
  FileText,
  Award,
  Settings,
  LogOut,
  Pickaxe,
  User,
  Bell,
  ChevronDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type NavItem = {
  href: string
  icon: React.ElementType
  label: string
  badge?: number
}

const navItemsByRole: Record<string, NavItem[]> = {
  client: [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/client/projects', icon: Briefcase, label: 'My Projects', badge: 3 },
    { href: '/dashboard/client/consultants', icon: Users, label: 'Consultants' },
    { href: '/dashboard/client/bids', icon: FileText, label: 'Bids Received' },
  ],
  consultant: [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/consultant/discover', icon: Briefcase, label: 'Discover Projects' },
    { href: '/dashboard/consultant/my-bids', icon: FileText, label: 'My Bids', badge: 5 },
    { href: '/dashboard/consultant/profile', icon: Award, label: 'My Profile' },
  ],
  admin: [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/admin/users', icon: Users, label: 'Manage Users' },
    { href: '/dashboard/admin/projects', icon: Briefcase, label: 'All Projects' },
    { href: '/dashboard/admin/reports', icon: FileText, label: 'Reports' },
  ],
}

type ModernSidebarProps = {
  userRole: 'client' | 'consultant' | 'admin'
  userName: string
  userEmail: string
  userImage?: string
}

export default function ModernSidebar({
  userRole,
  userName,
  userEmail,
  userImage,
}: ModernSidebarProps) {
  const pathname = usePathname()
  const navItems = navItemsByRole[userRole]

  return (
    <aside className="w-64 flex-shrink-0 bg-dam-dark-blue text-white flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-dam-blue">
        <Pickaxe className="h-8 w-8 text-dam-orange" />
        <h1 className="ml-3 text-2xl font-bold text-white">Dial-a-Met</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-dam-orange text-dam-dark-blue font-semibold'
                : 'hover:bg-dam-blue'
            }`}
          >
            <item.icon className="h-5 w-5 mr-4" />
            <span>{item.label}</span>
            {item.badge && (
              <Badge className="ml-auto bg-white text-dam-dark-blue">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-dam-blue">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex items-center p-2 rounded-lg hover:bg-dam-blue">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userImage} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3 text-left">
                <p className="font-semibold">{userName}</p>
                <p className="text-xs text-gray-400">{userEmail}</p>
              </div>
              <ChevronDown className="h-5 w-5 ml-auto" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
