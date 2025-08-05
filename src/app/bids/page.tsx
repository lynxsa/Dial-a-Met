'use client';

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useBidding } from '@/hooks/useBidding'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { 
  Target, 
  Flame, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Eye,
  Search,
  Filter,
  Star,
  Users2,
  Zap,
  ChartBar,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Timer,
  Award,
  Shield,
  PlayCircle,
  StopCircle,
  RefreshCw,
  TrendingDown,
  Bell,
  Settings,
  History,
  Download
} from 'lucide-react'

// Mock bidding data
const mockBids = [
  {
    id: 'bid-001',
    projectId: 'proj-gold-001',
    projectTitle: 'Gold Recovery Optimization - Witwatersrand',
    status: 'ACTIVE',
    bidAmount: 125000,
    currentRank: 2,
    totalBids: 15,
    leadingBid: 118000,
    yourBid: 125000,
    timeLeft: '2 days, 14 hours',
    winProbability: 78,
    submittedAt: '2025-01-15T10:30:00Z',
    lastUpdate: '2025-01-16T15:45:00Z',
    clientRating: 4.8,
    urgency: 'HIGH',
    bidWarActive: true,
    notifications: 3,
    estimatedDecision: '2025-01-18',
    competitorCount: 14,
    skills: ['Gold Processing', 'Flotation', 'Recovery Optimization']
  },
  {
    id: 'bid-002',
    projectId: 'proj-copper-002',
    projectTitle: 'Copper Leaching Process Review - Andean Operations',
    status: 'LEADING',
    bidAmount: 185000,
    currentRank: 1,
    totalBids: 22,
    leadingBid: 185000,
    yourBid: 185000,
    timeLeft: '5 days, 8 hours',
    winProbability: 92,
    submittedAt: '2025-01-12T09:15:00Z',
    lastUpdate: '2025-01-16T12:30:00Z',
    clientRating: 4.6,
    urgency: 'MEDIUM',
    bidWarActive: false,
    notifications: 1,
    estimatedDecision: '2025-01-20',
    competitorCount: 21,
    skills: ['Copper Processing', 'Heap Leaching', 'Process Engineering']
  },
  {
    id: 'bid-003',
    projectId: 'proj-safety-003',
    projectTitle: 'Emergency Mine Safety Assessment - Underground Ops',
    status: 'WON',
    bidAmount: 95000,
    currentRank: 1,
    totalBids: 8,
    leadingBid: 95000,
    yourBid: 95000,
    timeLeft: 'Completed',
    winProbability: 100,
    submittedAt: '2025-01-10T14:20:00Z',
    lastUpdate: '2025-01-14T16:00:00Z',
    clientRating: 4.9,
    urgency: 'CRITICAL',
    bidWarActive: false,
    notifications: 0,
    estimatedDecision: '2025-01-14',
    competitorCount: 7,
    skills: ['Mine Safety', 'Risk Assessment', 'Emergency Response'],
    wonAt: '2025-01-14T16:00:00Z',
    projectValue: 95000
  },
  {
    id: 'bid-004',
    projectId: 'proj-platinum-004',
    projectTitle: 'Platinum Recovery Enhancement Study',
    status: 'LOST',
    bidAmount: 145000,
    currentRank: 4,
    totalBids: 12,
    leadingBid: 128000,
    yourBid: 145000,
    timeLeft: 'Completed',
    winProbability: 0,
    submittedAt: '2025-01-08T11:45:00Z',
    lastUpdate: '2025-01-12T09:30:00Z',
    clientRating: 4.7,
    urgency: 'MEDIUM',
    bidWarActive: false,
    notifications: 0,
    estimatedDecision: '2025-01-12',
    competitorCount: 11,
    skills: ['Platinum Processing', 'Recovery Enhancement', 'Process Design'],
    lostAt: '2025-01-12T09:30:00Z',
    winningBid: 128000,
    feedback: 'Strong technical proposal but pricing was not competitive'
  }
]

const bidStats = {
  totalActiveBids: 2,
  totalWonBids: 15,
  totalLostBids: 8,
  winRate: 65.2,
  averageBidAmount: 135000,
  totalEarnings: 1850000,
  currentMonthEarnings: 285000,
  pendingDecisions: 2,
  activeBidWars: 1,
  rankingPosition: 12,
  responseRate: 94,
  averageResponseTime: '2.4 hours'
}

export default function BidManagement() {
  const { classes } = useThemeClasses()
  const [selectedTab, setSelectedTab] = useState('active')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState('timeLeft')
  const [showNotifications, setShowNotifications] = useState(false)
  
  const biddingData = useBidding({ projectId: 'bid-management' })

  const filteredBids = mockBids.filter(bid => {
    const matchesSearch = bid.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'ALL' || bid.status === statusFilter
    const matchesTab = 
      (selectedTab === 'active' && ['ACTIVE', 'LEADING'].includes(bid.status)) ||
      (selectedTab === 'completed' && ['WON', 'LOST'].includes(bid.status)) ||
      (selectedTab === 'all')
    
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700'
      case 'LEADING':
        return 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700'
      case 'WON':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
      case 'LOST':
        return 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-600'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL':
        return 'bg-red-500 text-white border-red-600 animate-pulse dark:bg-red-600 dark:border-red-700'
      case 'HIGH':
        return 'bg-orange-500 text-white border-orange-600 dark:bg-orange-600 dark:border-orange-700'
      case 'MEDIUM':
        return 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-700'
      default:
        return 'bg-slate-500 text-white border-slate-600 dark:bg-slate-600 dark:border-slate-700'
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Award className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Award className="h-4 w-4 text-slate-400" />
      case 3:
        return <Award className="h-4 w-4 text-orange-600" />
      default:
        return <Target className="h-4 w-4 text-slate-400" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${classes.text.primary}`}>Bid Management</h1>
            <p className={classes.text.secondary}>Track and manage all your project bids</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 ${classes.background.card} ${classes.border} rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors`}
            >
              <Bell className={`h-5 w-5 ${classes.text.secondary}`} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                4
              </span>
            </button>
            
            <button className={`flex items-center px-4 py-2 ${classes.button.primary} rounded-lg transition-colors`}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className={`${classes.background.card} rounded-xl p-6 ${classes.border} text-center hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className={`text-sm ${classes.text.secondary} mb-1`}>Active Bids</div>
            <div className={`text-2xl font-bold ${classes.text.primary}`}>{bidStats.totalActiveBids}</div>
          </div>

          <div className={`${classes.background.card} rounded-xl p-6 ${classes.border} text-center hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className={`text-sm ${classes.text.secondary} mb-1`}>Win Rate</div>
            <div className={`text-2xl font-bold ${classes.text.primary}`}>{bidStats.winRate}%</div>
          </div>

          <div className={`${classes.background.card} rounded-xl p-6 ${classes.border} text-center hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className={`text-sm ${classes.text.secondary} mb-1`}>Won Bids</div>
            <div className={`text-2xl font-bold ${classes.text.primary}`}>{bidStats.totalWonBids}</div>
          </div>

          <div className={`${classes.background.card} rounded-xl p-6 ${classes.border} text-center hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className={`text-sm ${classes.text.secondary} mb-1`}>Total Earnings</div>
            <div className={`text-2xl font-bold ${classes.text.primary}`}>${(bidStats.totalEarnings / 1000).toFixed(0)}k</div>
          </div>

          <div className={`${classes.background.card} rounded-xl p-6 ${classes.border} text-center hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className={`text-sm ${classes.text.secondary} mb-1`}>Ranking</div>
            <div className={`text-2xl font-bold ${classes.text.primary}`}>#{bidStats.rankingPosition}</div>
          </div>

          <div className={`${classes.background.card} rounded-xl p-6 ${classes.border} text-center hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-full">
                <Clock className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <div className={`text-sm ${classes.text.secondary} mb-1`}>Response Time</div>
            <div className={`text-2xl font-bold ${classes.text.primary}`}>{bidStats.averageResponseTime}</div>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Tabs */}
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setSelectedTab('active')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === 'active' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Active Bids ({mockBids.filter(b => ['ACTIVE', 'LEADING'].includes(b.status)).length})
                </button>
                <button
                  onClick={() => setSelectedTab('completed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === 'completed' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Completed ({mockBids.filter(b => ['WON', 'LOST'].includes(b.status)).length})
                </button>
                <button
                  onClick={() => setSelectedTab('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === 'all' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Bids ({mockBids.length})
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search bids..."
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
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="LEADING">Leading</option>
                  <option value="WON">Won</option>
                  <option value="LOST">Lost</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="timeLeft">Time Left</option>
                  <option value="bidAmount">Bid Amount</option>
                  <option value="winProbability">Win Probability</option>
                  <option value="submittedAt">Submitted Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bids List */}
          <div className="p-6 space-y-6">
            {filteredBids.map((bid) => (
              <div key={bid.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all relative overflow-hidden">
                {/* Bid War Indicator */}
                {bid.bidWarActive && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    <Flame className="h-3 w-3 inline mr-1" />
                    BID WAR ACTIVE
                  </div>
                )}

                {/* Notifications Badge */}
                {bid.notifications > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {bid.notifications}
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{bid.projectTitle}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                        {bid.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(bid.urgency)}`}>
                        {bid.urgency}
                      </span>
                      <div className="flex items-center space-x-1">
                        {getRankIcon(bid.currentRank)}
                        <span className="text-sm font-medium">Rank #{bid.currentRank}</span>
                      </div>
                    </div>
                    
                    {/* Bid Performance Metrics */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Your Bid</div>
                          <div className="text-lg font-bold text-blue-600">${bid.yourBid.toLocaleString()}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Leading Bid</div>
                          <div className="text-lg font-bold text-green-600">${bid.leadingBid.toLocaleString()}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Win Probability</div>
                          <div className={`text-lg font-bold ${bid.winProbability > 70 ? 'text-green-600' : bid.winProbability > 40 ? 'text-orange-600' : 'text-red-600'}`}>
                            {bid.winProbability}%
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Competitors</div>
                          <div className="text-lg font-bold text-slate-700">{bid.competitorCount}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {bid.timeLeft}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Client: {bid.clientRating}/5.0
                      </div>
                      <div className="flex items-center">
                        <Users2 className="h-4 w-4 mr-1" />
                        {bid.totalBids} total bids
                      </div>
                      <div className="flex items-center">
                        <Timer className="h-4 w-4 mr-1" />
                        Decision: {new Date(bid.estimatedDecision).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {bid.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Status-specific Information */}
                    {bid.status === 'WON' && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center text-green-700">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          <span className="font-medium">Congratulations! You won this project.</span>
                        </div>
                        <div className="text-sm text-green-600 mt-1">
                          Won on {new Date(bid.wonAt!).toLocaleDateString()} • Project Value: ${bid.projectValue!.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {bid.status === 'LOST' && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center text-red-700">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span className="font-medium">This bid was not successful.</span>
                        </div>
                        <div className="text-sm text-red-600 mt-1">
                          Winning bid: ${bid.winningBid!.toLocaleString()} • {bid.feedback}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-3 min-w-[200px]">
                    {(bid.status === 'ACTIVE' || bid.status === 'LEADING') && (
                      <>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          <Target className="h-4 w-4 inline mr-2" />
                          Update Bid
                        </button>
                        
                        <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                          <StopCircle className="h-4 w-4 inline mr-2" />
                          Withdraw Bid
                        </button>
                      </>
                    )}
                    
                    <button 
                      onClick={() => window.location.href = `/bids/${bid.id}`}
                      className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                    >
                      <ChartBar className="h-4 w-4 inline mr-2" />
                      View Analytics
                    </button>
                    
                    <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                      <History className="h-4 w-4 inline mr-2" />
                      Bid History
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
