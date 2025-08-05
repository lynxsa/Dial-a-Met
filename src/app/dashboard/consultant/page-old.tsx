'use client';

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { EnhancedBidDashboard } from '@/components/bidding/EnhancedBidDashboard'
import { useBidding } from '@/hooks/useBidding'
import { useDialAMetTheme } from '@/components/theme/DialAMetThemeProvider'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  DollarSign, 
  BarChart3, 
  Eye,
  Search,
  MapPin,
  Award,
  Star,
  Users2,
  Flame,
  Shield,
  Zap,
  ChartBar,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

// Enhanced mock data with real bidding functionality
const mockOpportunities = [
  {
    id: 'project-1',
    title: 'Gold Recovery Optimization - Rio Grande Mine',
    description: 'Critical optimization needed for gold recovery rates from sulfide ores using flotation techniques. Current recovery is at 78%, targeting 85%+. Time-sensitive project requiring immediate expertise.',
    budget: 15000,
    timeline: '3-4 weeks',
    mineralType: 'Gold',
    location: 'Nevada, USA',
    urgency: 'HIGH',
    matchScore: 94,
    bidsCount: 7,
    timeLeft: '2 days',
    skills: ['Flotation', 'Gold Processing', 'Process Optimization'],
    postedAt: '2025-01-15',
    bidWarActive: true,
    currentBidRange: { min: 12000, max: 16500 },
    leadingBid: 13200,
    yourCurrentBid: null,
    clientRating: 4.8,
    projectComplexity: 'HIGH',
  },
  {
    id: 'project-2',
    title: 'Copper Leaching Process Review - Andean Operations',
    description: 'Comprehensive analysis of heap leaching operations and recommendations for efficiency improvements. Multi-site assessment covering 3 operations with focus on cost reduction and environmental impact.',
    budget: 25000,
    timeline: '6-8 weeks',
    mineralType: 'Copper',
    location: 'Chile',
    urgency: 'MEDIUM',
    matchScore: 87,
    bidsCount: 12,
    timeLeft: '5 days',
    skills: ['Heap Leaching', 'Copper Processing', 'Process Engineering'],
    postedAt: '2025-01-12',
    bidWarActive: false,
    currentBidRange: { min: 20000, max: 28000 },
    leadingBid: 22500,
    yourCurrentBid: 24000,
    clientRating: 4.6,
    projectComplexity: 'MEDIUM',
  },
  {
    id: 'project-3',
    title: 'Emergency Mine Safety Assessment - Underground Ops',
    description: 'URGENT: Comprehensive safety audit and immediate recommendations for underground mining operations following recent incident. Requires certified safety expert with underground experience.',
    budget: 18000,
    timeline: '2-3 weeks',
    mineralType: 'Various',
    location: 'Australia',
    urgency: 'CRITICAL',
    matchScore: 78,
    bidsCount: 5,
    timeLeft: '18 hours',
    skills: ['Mine Safety', 'Risk Assessment', 'Compliance'],
    postedAt: '2025-01-16',
    bidWarActive: true,
    currentBidRange: { min: 15000, max: 19500 },
    leadingBid: 16800,
    yourCurrentBid: null,
    clientRating: 4.9,
    projectComplexity: 'CRITICAL',
  }
]

const mockProfile = {
  anonymousId: 'EXPERT-MT-4521',
  realName: 'Dr. Sarah Mitchell',
  specializations: ['Gold Processing', 'Flotation', 'Process Optimization'],
  yearsExperience: 15,
  successRate: 96,
  averageRating: 4.8,
  totalProjects: 47,
  totalEarnings: 485000,
  isVerified: true,
  rankingScore: 892,
  expertLevel: 'PLATINUM'
}

const mockStats = {
  activeBids: 3,
  winRate: 68,
  avgBidRank: 2.1,
  loyaltyCredits: 1850,
  pendingPayouts: 45000,
  thisMonthEarnings: 12500,
  bidWarsWon: 12,
  quickBidBonus: 340,
  streakDays: 7,
}

export default function ConsultantDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUrgency, setFilterUrgency] = useState('All Urgency')
  const [showBidDashboard, setShowBidDashboard] = useState(false)
  
  const biddingData = useBidding({ projectId: 'consultant-dashboard' })
  const { 
    actions: { submitBid, withdrawBid },
    bids: activeBids,
    isLoading,
    project,
    userBid
  } = biddingData
  
  // Mock additional data for the page
  const bidHistory = activeBids || []
  const rankings = []
  const realTimeData = {}

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL':
        return 'bg-red-500 text-white border-red-600 animate-pulse'
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

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 font-bold'
    if (score >= 80) return 'text-orange-600 font-semibold'
    return 'text-slate-600'
  }

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'CRITICAL':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'HIGH':
        return <Flame className="h-4 w-4 text-orange-500" />
      case 'MEDIUM':
        return <Zap className="h-4 w-4 text-blue-500" />
      default:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
    }
  }

  const handlePlaceBid = async (projectId: string, amount: number) => {
    try {
      await submitBid({ 
        projectId, 
        price: amount, 
        consultantId: 'consultant-user'
      })
    } catch (error) {
      console.error('Failed to place bid:', error)
    }
  }

  if (showBidDashboard) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Advanced Bidding Dashboard</h1>
            <button
              onClick={() => setShowBidDashboard(false)}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Back to Overview
            </button>
          </div>
          <EnhancedBidDashboard projectId="all-projects" userRole="consultant" />
        </div>
      </DashboardLayout>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'draft':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Anonymous Mode Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Eye className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-blue-900 font-semibold">Anonymous Bidding Mode Active</h3>
              <p className="text-blue-700 text-sm">
                Clients see only your anonymous ID ({mockProfile.anonymousId}) and qualifications. Your identity remains protected.
              </p>
            </div>
          </div>
        </div>

        {/* Advanced Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Active Bids</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.activeBids}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Win Rate</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.winRate}%</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Avg Bid Rank</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.avgBidRank}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Loyalty Credits</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.loyaltyCredits}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-cyan-100 rounded-full">
                <Clock className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Pending Payouts</div>
            <div className="text-2xl font-bold text-slate-900">${mockStats.pendingPayouts.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-emerald-100 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">This Month</div>
            <div className="text-2xl font-bold text-slate-900">${mockStats.thisMonthEarnings.toLocaleString()}</div>
          </div>
        </div>

        {/* Your Anonymous Profile Preview */}
        <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Your Anonymous Profile Preview</h2>
          
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-orange-400 mb-2">{mockProfile.anonymousId}</h3>
                <p className="text-blue-200">Verified Mining Expert</p>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-lg font-bold">{mockProfile.averageRating}</span>
                <span className="text-slate-300 ml-1">({mockProfile.totalProjects} projects)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-slate-300 text-sm mb-1">Experience</div>
                <div className="text-xl font-bold">{mockProfile.yearsExperience} years</div>
              </div>
              <div>
                <div className="text-slate-300 text-sm mb-1">Success Rate</div>
                <div className="text-xl font-bold">{mockProfile.successRate}%</div>
              </div>
              <div>
                <div className="text-slate-300 text-sm mb-1">Total Earnings</div>
                <div className="text-xl font-bold">${mockProfile.totalEarnings.toLocaleString()}</div>
              </div>
            </div>
            
            <div>
              <div className="text-slate-300 text-sm mb-3">Specializations</div>
              <div className="flex flex-wrap gap-2">
                {mockProfile.specializations.map((spec, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI-Matched Opportunities */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-xl font-bold text-slate-900">AI-Matched Opportunities</h2>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All Urgency">All Urgency</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {mockOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{opportunity.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(opportunity.urgency)}`}>
                        {opportunity.urgency}
                      </span>
                      <div className={`text-sm font-bold ${getMatchColor(opportunity.matchScore)}`}>
                        {opportunity.matchScore}% Match
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">{opportunity.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {opportunity.timeline}
                      </div>
                      <div className="flex items-center">
                        <Users2 className="h-4 w-4 mr-1" />
                        {opportunity.bidsCount} bids
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {opportunity.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Budget</div>
                      <div className="text-2xl font-bold text-slate-900">${opportunity.budget.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Time Left</div>
                      <div className="text-sm font-semibold text-orange-600">{opportunity.timeLeft}</div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Place Bid
                      </button>
                    </div>
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