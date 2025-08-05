'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  Award,
  Zap,
  Target
} from 'lucide-react'

// Mock data for admin dashboard
const mockPlatformStats = {
  totalUsers: 12547,
  activeProjects: 1834,
  totalRevenue: 2847500,
  bidsToday: 156,
  completionRate: 94,
  platformGrowth: 23
}

const mockUserBreakdown = {
  clients: 4523,
  consultants: 6890,
  jobSeekers: 1134,
  admins: 15
}

const mockRecentActivity = [
  {
    id: '1',
    type: 'project_created',
    user: 'MineCorpInc',
    action: 'Posted new project: Copper Processing Optimization',
    timestamp: '2 minutes ago',
    status: 'active'
  },
  {
    id: '2',
    type: 'bid_placed',
    user: 'EXPERT-MT-4521',
    action: 'Placed bid on Gold Recovery Project',
    timestamp: '5 minutes ago',
    status: 'active'
  },
  {
    id: '3',
    type: 'project_completed',
    user: 'Anglo Mining Ltd',
    action: 'Completed Safety Assessment Project',
    timestamp: '12 minutes ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'user_registered',
    user: 'Dr. Sarah Chen',
    action: 'Registered as Mining Consultant',
    timestamp: '18 minutes ago',
    status: 'pending'
  },
  {
    id: '5',
    type: 'payment_processed',
    user: 'RioTinto Projects',
    action: 'Payment processed: $25,000',
    timestamp: '25 minutes ago',
    status: 'completed'
  }
]

const mockAuditAlerts = [
  {
    id: '1',
    type: 'bias_detection',
    severity: 'medium',
    message: 'Potential geographic bias detected in consultant selection',
    timestamp: '1 hour ago',
    status: 'investigating'
  },
  {
    id: '2',
    type: 'unusual_activity',
    severity: 'high',
    message: 'Unusual bidding pattern detected for project #4521',
    timestamp: '3 hours ago',
    status: 'resolved'
  },
  {
    id: '3',
    type: 'compliance_check',
    severity: 'low',
    message: 'Weekly compliance review completed successfully',
    timestamp: '1 day ago',
    status: 'completed'
  }
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('24h')

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_created':
        return <Target className="h-4 w-4 text-blue-600" />
      case 'bid_placed':
        return <Zap className="h-4 w-4 text-orange-600" />
      case 'project_completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'user_registered':
        return <Users className="h-4 w-4 text-purple-600" />
      case 'payment_processed':
        return <DollarSign className="h-4 w-4 text-emerald-600" />
      default:
        return <Activity className="h-4 w-4 text-slate-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'investigating':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Platform Overview */}
        <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Platform Overview</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-sm text-blue-600 mb-1">Total Users</div>
              <div className="text-2xl font-bold text-blue-900">{mockPlatformStats.totalUsers.toLocaleString()}</div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-sm text-green-600 mb-1">Active Projects</div>
              <div className="text-2xl font-bold text-green-900">{mockPlatformStats.activeProjects.toLocaleString()}</div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="text-sm text-emerald-600 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-emerald-900">${mockPlatformStats.totalRevenue.toLocaleString()}</div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="text-sm text-orange-600 mb-1">Bids Today</div>
              <div className="text-2xl font-bold text-orange-900">{mockPlatformStats.bidsToday}</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="text-sm text-purple-600 mb-1">Completion Rate</div>
              <div className="text-2xl font-bold text-purple-900">{mockPlatformStats.completionRate}%</div>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-cyan-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
              <div className="text-sm text-cyan-600 mb-1">Growth Rate</div>
              <div className="text-2xl font-bold text-cyan-900">+{mockPlatformStats.platformGrowth}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">User Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900">Mine Clients</div>
                    <div className="text-sm text-blue-700">Companies posting projects</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-900">{mockUserBreakdown.clients.toLocaleString()}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-900">Consultants</div>
                    <div className="text-sm text-green-700">Expert service providers</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-900">{mockUserBreakdown.consultants.toLocaleString()}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-purple-900">Job Seekers</div>
                    <div className="text-sm text-purple-700">Career opportunities</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-900">{mockUserBreakdown.jobSeekers.toLocaleString()}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Administrators</div>
                    <div className="text-sm text-slate-700">Platform management</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">{mockUserBreakdown.admins}</div>
              </div>
            </div>
          </div>

          {/* Audit Alerts */}
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Security & Compliance Alerts</h3>
            <div className="space-y-4">
              {mockAuditAlerts.map((alert) => (
                <div key={alert.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAlertSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-slate-900 font-medium mb-1">{alert.message}</p>
                  <p className="text-sm text-slate-500">{alert.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Platform Activity */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Recent Platform Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900">{activity.user}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-slate-600">{activity.action}</p>
                    <p className="text-sm text-slate-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
