'use client';

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { EnhancedBidDashboard } from '@/components/bidding/EnhancedBidDashboard'
import { useBidding } from '@/hooks/useBidding'
import { 
  Target, 
  Flame, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Eye,
  Search,
  MapPin,
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
  RefreshCw
} from 'lucide-react'

// Enhanced bid studio data
const liveOpportunities = [
  {
    id: 'studio-project-1',
    title: 'Real-Time Gold Recovery Optimization Challenge',
    description: 'Active bidding war! Critical gold recovery project with immediate deadline. Show your expertise in real-time competitive bidding.',
    budget: 150000,
    currentBidRange: { min: 125000, max: 165000 },
    leadingBid: { amount: 128500, expertId: 'EXPERT-***-4521', timestamp: '2 mins ago' },
    totalBids: 15,
    timeLeft: '4 hours, 23 minutes',
    urgency: 'CRITICAL',
    complexity: 'HIGH',
    bidWarActive: true,
    liveParticipants: 8,
    yourCurrentBid: null,
    suggestedBid: 127000,
    winProbability: 76,
    skills: ['Gold Processing', 'Flotation', 'Recovery Optimization']
  },
  {
    id: 'studio-project-2',
    title: 'Copper Flotation Innovation Lab',
    description: 'Competitive environment for copper processing experts. Real-time collaboration and bidding platform.',
    budget: 220000,
    currentBidRange: { min: 180000, max: 240000 },
    leadingBid: { amount: 195000, expertId: 'EXPERT-***-7891', timestamp: '5 mins ago' },
    totalBids: 22,
    timeLeft: '1 day, 12 hours',
    urgency: 'HIGH',
    complexity: 'MEDIUM',
    bidWarActive: true,
    liveParticipants: 12,
    yourCurrentBid: 198000,
    suggestedBid: 192000,
    winProbability: 45,
    skills: ['Copper Processing', 'Flotation', 'Process Innovation']
  }
]

const studioStats = {
  liveSessions: 3,
  activeBidders: 47,
  totalBidsToday: 156,
  winRateToday: 72,
  avgResponseTime: '2.3 mins',
  creditsEarned: 340,
  streakDays: 5,
  rankingPosition: 12
}

export default function BidStudio() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [liveMode, setLiveMode] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [quickBidAmount, setQuickBidAmount] = useState<{[key: string]: number}>({})
  
  const biddingData = useBidding({ projectId: selectedProject || 'studio-overview' })
  const { 
    actions: { submitBid, withdrawBid },
    bids,
    isLoading
  } = biddingData

  // Simulate real-time updates
  useEffect(() => {
    if (autoRefresh && liveMode) {
      const interval = setInterval(() => {
        // Simulate bid updates
        console.log('Refreshing live bid data...')
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, liveMode])

  const handleQuickBid = async (projectId: string, amount: number) => {
    try {
      await submitBid({ 
        projectId: projectId, 
        consultantId: 'studio-user',
        price: amount
      })
    } catch (error) {
      console.error('Failed to place bid:', error)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL':
        return 'bg-red-500 text-white border-red-600 animate-pulse'
      case 'HIGH':
        return 'bg-orange-500 text-white border-orange-600'
      case 'MEDIUM':
        return 'bg-blue-500 text-white border-blue-600'
      default:
        return 'bg-slate-500 text-white border-slate-600'
    }
  }

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'HIGH':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'MEDIUM':
        return <Zap className="h-4 w-4 text-orange-500" />
      default:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
    }
  }

  if (selectedProject) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Bid Studio - Live Session</h1>
            <button
              onClick={() => setSelectedProject(null)}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Back to Studio
            </button>
          </div>
          <EnhancedBidDashboard projectId={selectedProject} userRole="consultant" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Studio Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dial-a-Met Bid Studio</h1>
              <p className="text-purple-100">Real-time competitive bidding environment for mining experts</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{studioStats.liveSessions}</div>
                <div className="text-xs text-purple-200">Live Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{studioStats.activeBidders}</div>
                <div className="text-xs text-purple-200">Active Bidders</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${liveMode ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="font-medium">{liveMode ? 'LIVE MODE ACTIVE' : 'OFFLINE MODE'}</span>
            </div>
            
            <button
              onClick={() => setLiveMode(!liveMode)}
              className="flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              {liveMode ? <StopCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
              <span>{liveMode ? 'Stop Live' : 'Start Live'}</span>
            </button>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto Refresh</span>
            </button>
          </div>
        </div>

        {/* Studio Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Live Sessions</div>
            <div className="text-xl font-bold text-slate-900">{studioStats.liveSessions}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Active Bidders</div>
            <div className="text-xl font-bold text-slate-900">{studioStats.activeBidders}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Bids Today</div>
            <div className="text-xl font-bold text-slate-900">{studioStats.totalBidsToday}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-orange-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Win Rate</div>
            <div className="text-xl font-bold text-slate-900">{studioStats.winRateToday}%</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-cyan-100 rounded-full">
                <Clock className="h-5 w-5 text-cyan-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Response Time</div>
            <div className="text-xl font-bold text-slate-900">{studioStats.avgResponseTime}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Credits Earned</div>
            <div className="text-xl font-bold text-slate-900">{studioStats.creditsEarned}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-red-100 rounded-full">
                <Flame className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Streak Days</div>
            <div className="text-xl font-bold text-slate-900">{studioStats.streakDays}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-indigo-100 rounded-full">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <div className="text-xs text-slate-600 mb-1">Rank Position</div>
            <div className="text-xl font-bold text-slate-900">#{studioStats.rankingPosition}</div>
          </div>
        </div>

        {/* Live Opportunities */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-slate-900">Live Bidding Opportunities</h2>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">LIVE BID WARS</span>
                </div>
              </div>
              
              <div className="text-sm text-slate-600">
                Last updated: <span className="font-medium">2 seconds ago</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {liveOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border-2 border-red-200 rounded-xl p-6 bg-gradient-to-r from-red-50 to-orange-50 hover:shadow-xl transition-all relative overflow-hidden">
                {/* Live Indicator */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  <Activity className="h-3 w-3 inline mr-1 animate-pulse" />
                  LIVE BID WAR
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{opportunity.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(opportunity.urgency)}`}>
                        {opportunity.urgency}
                      </span>
                      {getComplexityIcon(opportunity.complexity)}
                    </div>
                    
                    <p className="text-slate-700 mb-4 leading-relaxed">{opportunity.description}</p>
                    
                    {/* Live Bidding Stats */}
                    <div className="bg-white/80 rounded-lg p-4 mb-4 border border-orange-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Leading Bid</div>
                          <div className="text-lg font-bold text-green-600">
                            ${opportunity.leadingBid.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">{opportunity.leadingBid.timestamp}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Total Bids</div>
                          <div className="text-lg font-bold text-blue-600">{opportunity.totalBids}</div>
                          <div className="text-xs text-slate-500">Live participants: {opportunity.liveParticipants}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Time Left</div>
                          <div className="text-lg font-bold text-orange-600">{opportunity.timeLeft.split(',')[0]}</div>
                          <div className="text-xs text-slate-500">{opportunity.timeLeft.split(',')[1]}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-slate-600">Win Probability</div>
                          <div className="text-lg font-bold text-purple-600">{opportunity.winProbability}%</div>
                          <div className="text-xs text-slate-500">Suggested: ${opportunity.suggestedBid.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      {opportunity.yourCurrentBid && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-700 font-medium">Your Current Bid</span>
                            <span className="text-blue-900 font-bold">${opportunity.yourCurrentBid.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 min-w-[250px]">
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Project Budget</div>
                      <div className="text-2xl font-bold text-slate-900">${opportunity.budget.toLocaleString()}</div>
                    </div>
                    
                    {/* Quick Bid Controls */}
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="text-sm font-medium text-slate-700 mb-2">Quick Bid</div>
                      <input
                        type="number"
                        placeholder="Enter bid amount"
                        value={quickBidAmount[opportunity.id] || ''}
                        onChange={(e) => setQuickBidAmount({...quickBidAmount, [opportunity.id]: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-3"
                        min={opportunity.currentBidRange.min}
                        max={opportunity.budget}
                      />
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <button 
                          onClick={() => setQuickBidAmount({...quickBidAmount, [opportunity.id]: opportunity.suggestedBid})}
                          className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-colors"
                        >
                          Suggested
                        </button>
                        <button 
                          onClick={() => setQuickBidAmount({...quickBidAmount, [opportunity.id]: opportunity.leadingBid.amount - 1000})}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                        >
                          Beat Leader
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleQuickBid(opportunity.id, quickBidAmount[opportunity.id] || opportunity.suggestedBid)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
                        disabled={isLoading}
                      >
                        <Target className="h-4 w-4 inline mr-2" />
                        {isLoading ? 'Placing Bid...' : 'Place Live Bid'}
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setSelectedProject(opportunity.id)}
                      className="w-full px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                    >
                      <ChartBar className="h-4 w-4 inline mr-2" />
                      Advanced Analytics
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
