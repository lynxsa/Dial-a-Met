'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { EnhancedBidDashboard } from '@/components/bidding/EnhancedBidDashboard'
import { 
  Building2, 
  Plus, 
  FileText, 
  Users, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Eye,
  MessageSquare,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Target,
  Zap,
  Award,
  Gavel,
  Timer,
  Crown,
  Shield,
  Pickaxe,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
  Activity,
  Briefcase,
  Globe,
  TrendingDown,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Archive,
  Hash,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Layers,
  Compass,
  Sparkles,
  TrendingDownIcon
} from 'lucide-react'

export default function MiningCompanyDashboard() {
  const { classes } = useThemeClasses()
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedBidFilter, setSelectedBidFilter] = useState('all')

  // Mock data - Enhanced for Operation Finding Gold
  const stats = [
    { 
      icon: FileText, 
      label: 'Active Projects', 
      value: '12', 
      change: '+3 this month', 
      trend: 'up',
      detail: '2 urgent, 5 in bidding'
    },
    { 
      icon: Target, 
      label: 'Anonymous Bidders', 
      value: '47', 
      change: '+12 this week', 
      trend: 'up',
      detail: 'Across all projects'
    },
    { 
      icon: DollarSign, 
      label: 'Total Investment', 
      value: '$2.4M', 
      change: '+15% this quarter', 
      trend: 'up',
      detail: 'Budget utilization: 78%'
    },
    { 
      icon: TrendingUp, 
      label: 'Success Rate', 
      value: '94%', 
      change: '+3% improvement', 
      trend: 'up',
      detail: 'Project completion rate'
    }
  ]

  const anonymousBidders = [
    {
      id: 'ANB-001',
      codeName: 'GoldDigger-Alpha',
      expertise: 'Ore Processing & Metallurgy',
      bidCount: 12,
      successRate: 95,
      avgBidAmount: '$125K',
      lastActive: '2 hours ago',
      rating: 4.9,
      location: 'North America',
      verifiedExpertise: ['Gold Processing', 'Heap Leaching', 'Cyanidation'],
      projectTypes: ['Gold Mining', 'Precious Metals'],
      availability: 'Available',
      responseTime: '< 2 hours'
    },
    {
      id: 'ANB-002',
      codeName: 'CopperKing-Beta',
      expertise: 'Open Pit Mining Operations',
      bidCount: 8,
      successRate: 88,
      avgBidAmount: '$95K',
      lastActive: '4 hours ago',
      rating: 4.7,
      location: 'South America',
      verifiedExpertise: ['Open Pit Design', 'Mine Planning', 'Equipment Selection'],
      projectTypes: ['Copper Mining', 'Large Scale Operations'],
      availability: 'Busy',
      responseTime: '< 6 hours'
    },
    {
      id: 'ANB-003',
      codeName: 'DiamondHawk-Gamma',
      expertise: 'Underground Mining & Safety',
      bidCount: 15,
      successRate: 92,
      avgBidAmount: '$180K',
      lastActive: '1 hour ago',
      rating: 4.8,
      location: 'Africa',
      verifiedExpertise: ['Underground Operations', 'Safety Protocols', 'Ventilation'],
      projectTypes: ['Diamond Mining', 'Deep Mining'],
      availability: 'Available',
      responseTime: '< 1 hour'
    }
  ]

  const recentBids = [
    {
      id: 'BID-001',
      projectName: 'Gold Mine Expansion Phase 2',
      bidderCodeName: 'GoldDigger-Alpha',
      bidAmount: '$850K',
      timeline: '18 months',
      submittedAt: '2 hours ago',
      status: 'Under Review',
      confidence: 94,
      valueProps: ['15% efficiency increase', 'Proven track record', '24/7 support'],
      riskFactors: ['Weather dependent', 'Equipment availability'],
      methodology: 'Heap leaching with enhanced recovery'
    },
    {
      id: 'BID-002',
      projectName: 'Environmental Assessment',
      bidderCodeName: 'EcoMiner-Delta',
      bidAmount: '$290K',
      timeline: '8 months',
      submittedAt: '5 hours ago',
      status: 'Shortlisted',
      confidence: 87,
      valueProps: ['ISO certified', 'Local expertise', 'Fast delivery'],
      riskFactors: ['Regulatory changes'],
      methodology: 'Comprehensive environmental impact analysis'
    }
  ]

  const liveBidWars = [
    {
      projectId: 'PROJ-001',
      projectName: 'Copper Extraction Optimization',
      currentBidders: 5,
      topBid: '$620K',
      timeRemaining: '2d 14h',
      status: 'Active',
      bidHistory: [
        { amount: '$580K', time: '2 hours ago', bidder: 'CopperKing-Beta' },
        { amount: '$620K', time: '1 hour ago', bidder: 'MetalMaster-Epsilon' }
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Create New Project',
      description: 'Launch a new mining project and invite anonymous bidders',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      href: '/dashboard/mine/projects/new',
      badge: 'New'
    },
    {
      title: 'Browse Anonymous Bidders',
      description: 'Explore verified consultants available for bidding',
      icon: Users,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      href: '/dashboard/mine/bidders',
      badge: '47 Available'
    },
    {
      title: 'Live Bid Wars',
      description: 'Monitor active bidding competitions in real-time',
      icon: Zap,
      color: 'bg-purple-600 hover:bg-purple-700',
      href: '/dashboard/mine/bid-wars',
      badge: '3 Live'
    },
    {
      title: 'Analytics & Reports',
      description: 'View detailed project analytics and bidding insights',
      icon: BarChart3,
      color: 'bg-orange-600 hover:bg-orange-700',
      href: '/dashboard/mine/analytics',
      badge: 'Updated'
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Operation Finding Gold Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${classes.text.primary} flex items-center gap-3`}>
              <Crown className="h-7 w-7 text-yellow-500" />
              Operation Finding Gold
              <Badge variant="secondary" className="ml-2 text-xs">Mine Control Center</Badge>
            </h1>
            <p className={`text-sm ${classes.text.secondary} mt-1`}>
              Advanced anonymous bidding platform • Full project control • Real-time bid tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="text-xs"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh Data
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs"
              onClick={() => window.location.href = '/dashboard/mine/projects/new'}
            >
              <Plus className="h-4 w-4 mr-1" />
              Launch Project
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div 
                key={index} 
                className={`${classes.background.card} rounded-lg p-4 border ${classes.border} shadow-sm hover:shadow-md transition-all group cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`text-xl font-bold ${classes.text.primary} mb-1`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${classes.text.secondary} mb-1`}>
                  {stat.label}
                </div>
                <div className={`text-xs ${classes.text.muted}`}>
                  {stat.detail}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className={`text-lg font-semibold ${classes.text.primary} mb-4`}>Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Link key={index} href={action.href}>
                  <div className={`${classes.background.card} rounded-lg p-4 border ${classes.border} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      {action.badge && (
                        <Badge variant="secondary" className="text-xs">{action.badge}</Badge>
                      )}
                    </div>
                    <h3 className={`text-sm font-semibold ${classes.text.primary} mb-1`}>
                      {action.title}
                    </h3>
                    <p className={`text-xs ${classes.text.secondary}`}>
                      {action.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Live Bid Wars Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${classes.text.primary} flex items-center gap-2`}>
              <Zap className="h-5 w-5 text-yellow-500" />
              Live Bid Wars
            </h2>
            <Link href="/dashboard/mine/bid-wars" className="text-blue-600 hover:text-blue-700 text-xs font-medium">
              View All Wars →
            </Link>
          </div>
          
          <div className="space-y-3">
            {liveBidWars.map((war, index) => (
              <div key={index} className={`${classes.background.card} rounded-lg p-4 border ${classes.border} shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-semibold ${classes.text.primary}`}>{war.projectName}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{war.currentBidders} Bidders</Badge>
                    <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {war.timeRemaining} left
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className={`text-xs ${classes.text.secondary}`}>Current Top Bid</p>
                      <p className={`text-lg font-bold ${classes.text.primary}`}>{war.topBid}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
                    <div>
                      <p className={`text-xs ${classes.text.secondary}`}>Recent Activity</p>
                      <p className={`text-xs ${classes.text.primary}`}>+$40K increase (1h ago)</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>  const recentProjects = [
    {
      id: 1,
      title: 'Gold Ore Processing Optimization',
      category: 'Metallurgy',
      budget: 'R150,000 - R250,000',
      bids: 8,
      status: 'Active',
      location: 'Witwatersrand Basin',
      deadline: '2025-02-15',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Mine Safety Assessment & Compliance',
      category: 'Safety & Compliance',
      budget: 'R80,000 - R120,000',
      bids: 12,
      status: 'Review',
      location: 'Mpumalanga',
      deadline: '2025-01-30',
      priority: 'Critical'
    },
    {
      id: 3,
      title: 'Coal Beneficiation Plant Design',
      category: 'Engineering',
      budget: 'R300,000 - R500,000',
      bids: 5,
      status: 'Draft',
      location: 'KwaZulu-Natal',
      deadline: '2025-03-01',
      priority: 'Medium'
    }
  ]

  const quickActions = [
    {
      title: 'Post New Project',
      description: 'Create a new project request and receive bids',
      icon: <Plus className="w-8 h-8 text-white" />,
      href: '/projects/create',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      title: 'Browse Consultants',
      description: 'Find and invite specific consultants',
      icon: <Search className="w-8 h-8 text-white" />,
      href: '/browse',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'View Reports',
      description: 'Access project analytics and reports',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      href: '/reports',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Manage Team',
      description: 'Add team members and set permissions',
      icon: <Users className="w-8 h-8 text-white" />,
      href: '/team',
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-100'
      case 'High': return 'text-orange-600 bg-orange-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100'
      case 'Review': return 'text-blue-600 bg-blue-100'
      case 'Draft': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
      return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Acme Mining Corp
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your projects, find consultants, and track your operations from your dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FileText, label: 'Active Projects', value: '12', change: '+2 this month', trend: 'up' },
            { icon: Users, label: 'Consultants Hired', value: '8', change: '+1 this week', trend: 'up' },
            { icon: DollarSign, label: 'Total Investment', value: '$2.4M', change: '+15% this quarter', trend: 'up' },
            { icon: TrendingUp, label: 'Success Rate', value: '94%', change: '+3% improvement', trend: 'up' }
          ].map((stat, index) => {
            const IconComponent = stat.icon
            return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {stat.label}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
      {/* Header */}
      <header className={`${classes.background.card} border-b ${classes.border} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <Pickaxe className="h-8 w-8 text-blue-600" />
                <span className={`text-2xl font-bold ${classes.text.primary}`}>Dial-a-Met</span>
              </Link>
              <div className="hidden md:block">
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  Mining Company Dashboard
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className={`p-2 ${classes.text.muted} hover:${classes.text.primary} transition-colors relative`}>
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className={`p-2 ${classes.text.muted} hover:${classes.text.primary} transition-colors`}>
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className={`text-sm font-medium ${classes.text.primary}`}>Acme Mining Corp</div>
                  <div className={`text-xs ${classes.text.muted}`}>Premium Account</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${classes.text.primary} mb-2`}>
            Welcome back, Acme Mining Corp
          </h1>
          <p className={`${classes.text.secondary}`}>
            Manage your projects, review bids, and connect with top mining consultants
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div key={index} className={`${classes.background.card} rounded-xl p-6 border ${classes.border} shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {stat.icon}
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className={`text-2xl font-bold ${classes.text.primary} mb-1`}>
                {stat.value}
              </div>
              <div className={`text-sm ${classes.text.secondary} mb-2`}>
                {stat.title}
              </div>
              <div className="text-xs text-green-600 font-medium">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold ${classes.text.primary} mb-6`}>Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className={`group ${action.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}>
                  <div className="mb-4">
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className={`${classes.background.card} rounded-xl border ${classes.border} shadow-sm`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className={`text-xl font-bold ${classes.text.primary}`}>Recent Projects</h2>
              <div className="flex space-x-2">
                <button className={`px-4 py-2 ${classes.text.secondary} hover:${classes.text.primary} border ${classes.border} rounded-lg transition-colors`}>
                  <Filter className="w-4 h-4 mr-2 inline" />
                  Filter
                </button>
                <Link href="/projects">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View All
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${classes.background.page}`}>
                <tr>
                  <th className={`text-left py-3 px-6 text-sm font-medium ${classes.text.secondary}`}>Project</th>
                  <th className={`text-left py-3 px-6 text-sm font-medium ${classes.text.secondary}`}>Category</th>
                  <th className={`text-left py-3 px-6 text-sm font-medium ${classes.text.secondary}`}>Budget</th>
                  <th className={`text-left py-3 px-6 text-sm font-medium ${classes.text.secondary}`}>Bids</th>
                  <th className={`text-left py-3 px-6 text-sm font-medium ${classes.text.secondary}`}>Status</th>
                  <th className={`text-left py-3 px-6 text-sm font-medium ${classes.text.secondary}`}>Deadline</th>
                  <th className={`text-left py-3 px-6 text-sm font-medium ${classes.text.secondary}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id} className={`border-t ${classes.border} hover:${classes.background.page} transition-colors`}>
                    <td className="py-4 px-6">
                      <div>
                        <div className={`font-medium ${classes.text.primary}`}>{project.title}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {project.location}
                        </div>
                        <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                    </td>
                    <td className={`py-4 px-6 ${classes.text.secondary}`}>{project.category}</td>
                    <td className={`py-4 px-6 ${classes.text.secondary}`}>{project.budget}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className={`font-medium ${classes.text.primary}`}>{project.bids}</span>
                        <span className={`ml-1 text-sm ${classes.text.muted}`}>bids</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className={`p-2 ${classes.text.muted} hover:text-blue-600 transition-colors`}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className={`p-2 ${classes.text.muted} hover:text-green-600 transition-colors`}>
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
