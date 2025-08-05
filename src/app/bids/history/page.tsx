'use client';

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Award,
  Target,
  BarChart3,
  Activity,
  Filter,
  Download,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Star,
  Users,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// Mock historical bid data
const mockBidHistory = [
  {
    id: 'bid-001',
    projectTitle: 'Copper Mine Optimization',
    client: 'Northern Mining Co.',
    submittedDate: '2024-01-15',
    amount: 185000,
    status: 'won',
    position: 1,
    totalBids: 12,
    profit: 45000,
    duration: '3 months',
    rating: 4.9,
    industry: 'Copper Mining'
  },
  {
    id: 'bid-002',
    projectTitle: 'Gold Recovery Enhancement',
    client: 'African Gold Corp',
    submittedDate: '2024-01-22',
    amount: 220000,
    status: 'lost',
    position: 3,
    totalBids: 18,
    profit: 0,
    duration: '4 months',
    rating: null,
    industry: 'Gold Mining'
  },
  {
    id: 'bid-003',
    projectTitle: 'Platinum Processing Audit',
    client: 'Elite Platinum',
    submittedDate: '2024-02-01',
    amount: 95000,
    status: 'pending',
    position: 2,
    totalBids: 8,
    profit: null,
    duration: '2 months',
    rating: null,
    industry: 'Platinum Mining'
  },
  {
    id: 'bid-004',
    projectTitle: 'Iron Ore Beneficiation',
    client: 'Steel Corp Mining',
    submittedDate: '2024-02-08',
    amount: 340000,
    status: 'won',
    position: 1,
    totalBids: 15,
    profit: 78000,
    duration: '6 months',
    rating: 4.7,
    industry: 'Iron Ore'
  },
  {
    id: 'bid-005',
    projectTitle: 'Diamond Mine Assessment',
    client: 'Luxury Diamonds Ltd',
    submittedDate: '2024-02-12',
    amount: 275000,
    status: 'lost',
    position: 4,
    totalBids: 22,
    profit: 0,
    duration: '5 months',
    rating: null,
    industry: 'Diamond Mining'
  }
]

const mockAnalytics = {
  totalBids: 47,
  wonBids: 18,
  winRate: 38.3,
  totalRevenue: 2450000,
  averageBidAmount: 195000,
  totalProfit: 524000,
  averageProfit: 29100,
  competitionStats: {
    averageCompetitors: 14,
    mostCompetitive: 'Gold Mining',
    leastCompetitive: 'Specialized Consulting'
  },
  trends: {
    bidAmountTrend: 12.5,
    winRateTrend: -3.2,
    profitTrend: 8.7
  },
  monthlyData: [
    { month: 'Sep', bids: 8, wins: 3, revenue: 425000 },
    { month: 'Oct', bids: 12, wins: 5, revenue: 687000 },
    { month: 'Nov', bids: 9, wins: 4, revenue: 523000 },
    { month: 'Dec', bids: 6, wins: 2, revenue: 298000 },
    { month: 'Jan', bids: 7, wins: 3, revenue: 367000 },
    { month: 'Feb', bids: 5, wins: 1, revenue: 150000 }
  ]
}

export default function BidHistory() {
  const { classes } = useThemeClasses()
  const [filterStatus, setFilterStatus] = useState<'all' | 'won' | 'lost' | 'pending'>('all')
  const [filterIndustry, setFilterIndustry] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date')
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list')

  const filteredBids = mockBidHistory.filter(bid => {
    const matchesStatus = filterStatus === 'all' || bid.status === filterStatus
    const matchesIndustry = filterIndustry === 'all' || bid.industry === filterIndustry
    const matchesSearch = bid.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.client.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesIndustry && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-100 text-green-800'
      case 'lost':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <CheckCircle2 className="h-4 w-4" />
      case 'lost':
        return <XCircle className="h-4 w-4" />
      case 'pending':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />
    } else if (trend < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />
    }
    return <Activity className="h-4 w-4 text-slate-500" />
  }

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600'
    if (trend < 0) return 'text-red-600'
    return 'text-slate-600'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${classes.text.primary}`}>Bid History & Analytics</h1>
            <p className={classes.text.secondary}>Track your bidding performance and analyze trends</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'analytics' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Analytics
              </button>
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {viewMode === 'analytics' ? (
          /* Analytics View */
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Bids</p>
                    <p className="text-2xl font-bold text-slate-900">{mockAnalytics.totalBids}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {getTrendIcon(mockAnalytics.trends.bidAmountTrend)}
                  <span className={`text-sm ml-1 ${getTrendColor(mockAnalytics.trends.bidAmountTrend)}`}>
                    {Math.abs(mockAnalytics.trends.bidAmountTrend)}% vs last period
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Win Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{mockAnalytics.winRate}%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {getTrendIcon(mockAnalytics.trends.winRateTrend)}
                  <span className={`text-sm ml-1 ${getTrendColor(mockAnalytics.trends.winRateTrend)}`}>
                    {Math.abs(mockAnalytics.trends.winRateTrend)}% vs last period
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-slate-900">${(mockAnalytics.totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {getTrendIcon(mockAnalytics.trends.profitTrend)}
                  <span className={`text-sm ml-1 ${getTrendColor(mockAnalytics.trends.profitTrend)}`}>
                    {Math.abs(mockAnalytics.trends.profitTrend)}% vs last period
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Avg. Profit</p>
                    <p className="text-2xl font-bold text-slate-900">${(mockAnalytics.averageProfit / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-slate-500">Per winning project</span>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Performance */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Monthly Performance</h3>
                <div className="space-y-4">
                  {mockAnalytics.monthlyData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 text-center">
                          <span className="text-sm font-medium text-slate-600">{month.month}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 text-sm text-slate-900">
                            <span>{month.bids} bids</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-green-600">{month.wins} wins</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(month.wins / month.bids) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">
                          ${(month.revenue / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competition Analysis */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Competition Analysis</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">Average Competitors</span>
                    <span className="font-bold text-slate-900">{mockAnalytics.competitionStats.averageCompetitors}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm text-slate-600">Most Competitive</span>
                    <span className="font-bold text-red-700">{mockAnalytics.competitionStats.mostCompetitive}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-slate-600">Least Competitive</span>
                    <span className="font-bold text-green-700">{mockAnalytics.competitionStats.leastCompetitive}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Win Rate by Industry</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Gold Mining</span>
                        <span className="font-medium text-slate-900">42%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Copper Mining</span>
                        <span className="font-medium text-slate-900">38%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Iron Ore</span>
                        <span className="font-medium text-slate-900">35%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'won' | 'lost' | 'pending')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                  <option value="pending">Pending</option>
                </select>
                
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Industries</option>
                  <option value="Gold Mining">Gold Mining</option>
                  <option value="Copper Mining">Copper Mining</option>
                  <option value="Iron Ore">Iron Ore</option>
                  <option value="Diamond Mining">Diamond Mining</option>
                  <option value="Platinum Mining">Platinum Mining</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'status')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
            </div>

            {/* Bid List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Recent Bids</h3>
              </div>
              
              <div className="divide-y divide-slate-200">
                {filteredBids.map((bid) => (
                  <div key={bid.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-slate-900">{bid.projectTitle}</h4>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                            {getStatusIcon(bid.status)}
                            <span className="capitalize">{bid.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Client:</span>
                            <div className="font-medium text-slate-900">{bid.client}</div>
                          </div>
                          
                          <div>
                            <span className="text-slate-600">Industry:</span>
                            <div className="font-medium text-slate-900">{bid.industry}</div>
                          </div>
                          
                          <div>
                            <span className="text-slate-600">Duration:</span>
                            <div className="font-medium text-slate-900">{bid.duration}</div>
                          </div>
                          
                          <div>
                            <span className="text-slate-600">Position:</span>
                            <div className="font-medium text-slate-900">#{bid.position} of {bid.totalBids}</div>
                          </div>
                        </div>
                        
                        {bid.status === 'won' && bid.rating && (
                          <div className="flex items-center space-x-1 mt-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-medium text-slate-900">{bid.rating}/5.0</span>
                            <span className="text-sm text-slate-600">Client Rating</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">${bid.amount.toLocaleString()}</div>
                        {bid.profit !== null && bid.profit > 0 && (
                          <div className="text-sm text-green-600 font-medium">
                            +${bid.profit.toLocaleString()} profit
                          </div>
                        )}
                        <div className="text-sm text-slate-500 mt-1">{bid.submittedDate}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
