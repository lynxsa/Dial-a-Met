'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Pickaxe, 
  Plus, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign, 
  BarChart3, 
  Search,
  MapPin,
  Target,
  Activity,
  Eye,
  Flame,
  Timer,
  ChartBar,
  Star,
  Shield,
  CheckCircle2,
  LogOut
} from 'lucide-react'
import { ProtectedRoute, useAuth } from '@/components/AuthProvider'
import UniversalSidebar from '@/components/UniversalSidebar'
import { EnhancedBidDashboard } from '@/components/bidding/EnhancedBidDashboard'

// Enhanced mock data with bidding functionality
const mockProjects = [
  {
    id: 'client-project-1',
    title: 'Gold Recovery Optimization - Witwatersrand Basin',
    status: 'BIDDING',
    budget: 125000,
    bidsReceived: 12,
    shortlisted: 5,
    createdAt: '2025-01-15',
    mineralType: 'Gold',
    location: 'Johannesburg, GP',
    bidWarActive: true,
    urgency: 'HIGH',
    timeline: '4-6 weeks',
    description: 'Critical gold recovery optimization project requiring immediate expert attention. Current operations showing declining recovery rates.',
    currentBidRange: { min: 95000, max: 135000 },
    leadingBid: { amount: 98500, expertId: 'EXPERT-JHB-4521', rank: 1 },
    topBids: [
      { expertId: 'EXPERT-JHB-4521', amount: 98500, rating: 4.9, experience: 15, rank: 1 },
      { expertId: 'EXPERT-CT-7891', amount: 102000, rating: 4.7, experience: 12, rank: 2 },
      { expertId: 'EXPERT-DBN-3456', amount: 105500, rating: 4.8, experience: 18, rank: 3 },
      { expertId: 'EXPERT-PTA-9876', amount: 108000, rating: 4.6, experience: 10, rank: 4 },
      { expertId: 'EXPERT-PLK-2468', amount: 112000, rating: 4.5, experience: 8, rank: 5 }
    ],
    timeLeft: '2 days, 14 hours'
  },
  {
    id: 'client-project-2',
    title: 'Platinum Flotation Analysis - Bushveld Complex',
    status: 'IN_PROGRESS',
    budget: 185000,
    selectedBid: 165000,
    consultant: 'EXPERT-RUS-7891',
    consultantRating: 4.8,
    createdAt: '2025-01-10',
    mineralType: 'Platinum',
    location: 'Rustenburg, NW',
    bidWarActive: false,
    urgency: 'MEDIUM',
    timeline: '8-10 weeks',
    description: 'Comprehensive flotation analysis for platinum operations in the Bushveld Complex.',
    progress: 35,
    nextMilestone: 'Initial Assessment Report',
    milestoneDate: '2025-01-25'
  },
  {
    id: 'client-project-3',
    title: 'Coal Tailings Management Review - Mpumalanga',
    status: 'COMPLETED',
    budget: 95000,
    finalCost: 89000,
    consultant: 'EXPERT-MPL-5555',
    consultantRating: 4.9,
    createdAt: '2025-01-05',
    completedAt: '2025-01-14',
    mineralType: 'Coal',
    location: 'Witbank, MP',
    bidWarActive: false,
    urgency: 'LOW',
    timeline: '2-3 weeks',
    description: 'Environmental compliance review for coal tailings management systems.',
    rating: 5,
    feedback: 'Excellent work, comprehensive report, exceeded expectations.'
  }
]

const mockStats = {
  activeProjects: 2,
  totalBidsReceived: 47,
  avgTimeToSelect: 3.2,
  successfulProjects: 12,
  totalSpent: 1850000,
  avgSavings: 12.5,
  activeBidWars: 1,
  expertPool: 156
}

export default function ClientDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [showBidDashboard, setShowBidDashboard] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  
  const auth = useAuth()
  
  // const biddingData = useBidding({ projectId: selectedProject || 'client-overview' })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BIDDING':
        return 'bg-blue-100 text-blue-700 border border-blue-200'
      case 'IN_PROGRESS':
        return 'bg-orange-100 text-orange-700 border border-orange-200'
      case 'COMPLETED':
        return 'bg-green-100 text-green-700 border border-green-200'
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'HIGH':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'MEDIUM':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'LOW':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  if (showBidDashboard && selectedProject) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50 flex">
          <UniversalSidebar />
          <div className="flex-1 ml-64">
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Project Bidding Dashboard</h1>
                <button
                  onClick={() => setShowBidDashboard(false)}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Back to Projects
                </button>
              </div>
              <EnhancedBidDashboard projectId={selectedProject} userRole="client" />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 flex">
        <UniversalSidebar />
        
        <div className="flex-1 ml-64">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Pickaxe className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Mining Client Dashboard</h1>
                  <p className="text-slate-600">Manage your mining consultancy projects and bids</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/projects/new"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Link>
                
                <button
                  onClick={() => window.location.href = '/login'}
                  className="flex items-center px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Real-time Bidding Status */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-semibold">Live Bidding Active</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div>
                      <span className="text-blue-900 font-semibold">Anonymous Expert Pool: {mockStats.expertPool} verified consultants</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Active Bid Wars</div>
                    <div className="text-lg font-bold text-red-600">{mockStats.activeBidWars}</div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject('client-project-1')
                      setShowBidDashboard(true)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <ChartBar className="h-4 w-4 inline mr-2" />
                    View Bid Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Active Projects</div>
                <div className="text-xl font-bold text-slate-900">{mockStats.activeProjects}</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Total Bids</div>
                <div className="text-xl font-bold text-slate-900">{mockStats.totalBidsReceived}</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Avg Selection</div>
                <div className="text-xl font-bold text-slate-900">{mockStats.avgTimeToSelect}d</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Completed</div>
                <div className="text-xl font-bold text-slate-900">{mockStats.successfulProjects}</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Total Spent</div>
                <div className="text-xl font-bold text-slate-900">R{(mockStats.totalSpent / 1000).toFixed(0)}k</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-cyan-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-cyan-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Avg Savings</div>
                <div className="text-xl font-bold text-slate-900">{mockStats.avgSavings}%</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Flame className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Bid Wars</div>
                <div className="text-xl font-bold text-slate-900">{mockStats.activeBidWars}</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 mb-1">Expert Pool</div>
                <div className="text-xl font-bold text-slate-900">{mockStats.expertPool}</div>
              </div>
            </div>

            {/* Projects with Enhanced Bidding Features */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-bold text-slate-900">Your Mining Projects</h2>
                    <div className="flex items-center space-x-2 text-sm">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-medium">{mockStats.activeBidWars} Active Bid War</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="All Status">All Status</option>
                      <option value="BIDDING">Bidding</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {mockProjects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all relative overflow-hidden">
                    {/* Bid War Indicator */}
                    {project.bidWarActive && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                        <Flame className="h-3 w-3 inline mr-1" />
                        BID WAR ACTIVE
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(project.urgency)}`}>
                            {project.urgency}
                          </span>
                        </div>
                        
                        <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                        
                        {/* Enhanced Project Information */}
                        {project.status === 'BIDDING' && project.topBids && (
                          <div className="bg-slate-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-700">Top Bids Received</span>
                              <span className="text-sm text-slate-600">{project.bidsReceived} total bids</span>
                            </div>
                            
                            <div className="space-y-2">
                              {project.topBids.slice(0, 3).map((bid, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-xs font-bold text-slate-500">#{bid.rank}</span>
                                    <span className="text-sm font-medium text-slate-900">{bid.expertId}</span>
                                    <div className="flex items-center space-x-1">
                                      <Star className="h-3 w-3 text-yellow-400" />
                                      <span className="text-xs text-slate-600">{bid.rating}</span>
                                    </div>
                                    <span className="text-xs text-slate-500">{bid.experience}y exp</span>
                                  </div>
                                  <div className="text-sm font-bold text-green-600">
                                    R{bid.amount.toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600">Bid Range</span>
                                <span className="font-semibold">
                                  R{project.currentBidRange?.min.toLocaleString()} - R{project.currentBidRange?.max.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {project.status === 'IN_PROGRESS' && (
                          <div className="bg-orange-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-orange-700">Project Progress</span>
                              <span className="text-sm text-orange-600">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-orange-200 rounded-full h-2 mb-3">
                              <div 
                                className="bg-orange-600 h-2 rounded-full transition-all" 
                                style={{width: `${project.progress}%`}}
                              ></div>
                            </div>
                            <div className="text-sm text-orange-700">
                              Next: {project.nextMilestone} by {project.milestoneDate}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {project.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {project.timeline}
                          </div>
                          {project.timeLeft && (
                            <div className="flex items-center text-orange-600 font-medium">
                              <Timer className="h-4 w-4 mr-1" />
                              {project.timeLeft} left
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-3 min-w-[200px]">
                        <div className="text-right">
                          <div className="text-sm text-slate-500">Budget</div>
                          <div className="text-2xl font-bold text-slate-900">R{project.budget.toLocaleString()}</div>
                        </div>
                        
                        {project.status === 'BIDDING' && (
                          <div className="w-full space-y-2">
                            <button 
                              onClick={() => {
                                setSelectedProject(project.id)
                                setShowBidDashboard(true)
                              }}
                              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              <BarChart3 className="h-4 w-4 inline mr-2" />
                              View Live Bids
                            </button>
                            
                            <button className="w-full px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                              <Target className="h-4 w-4 inline mr-2" />
                              Select Winner
                            </button>
                          </div>
                        )}
                        
                        {project.status === 'IN_PROGRESS' && (
                          <div className="w-full space-y-2">
                            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                              View Progress
                            </button>
                            
                            <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                              Contact Expert
                            </button>
                          </div>
                        )}
                        
                        {project.status === 'COMPLETED' && (
                          <div className="w-full">
                            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                              View Report
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
