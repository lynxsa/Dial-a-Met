'use client';

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { 
  Flame, 
  Target, 
  TrendingDown,
  Eye,
  Zap,
  AlertTriangle,
  Activity,
  Bell,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Award,
  Star,
  RefreshCw
} from 'lucide-react'

// Mock live bidding data
const mockLiveBidWar = {
  projectId: 'live-war-001',
  title: 'URGENT: Gold Recovery Crisis - Immediate Expert Needed',
  description: 'Critical situation at major gold mine. Recovery rates dropped 15% overnight. Need immediate expert intervention. This is a live bidding war with real-time updates.',
  client: {
    name: 'African Gold Corp',
    rating: 4.9,
    urgency: 'CRITICAL',
    location: 'Ghana'
  },
  budget: 200000,
  timeLeft: {
    hours: 2,
    minutes: 47,
    seconds: 23
  },
  currentLeader: {
    anonymousId: 'EXPERT-***-7891',
    amount: 145000,
    timestamp: '23 seconds ago',
    streak: 3
  },
  yourBid: {
    amount: 148000,
    rank: 2,
    timestamp: '2 minutes ago'
  },
  liveParticipants: 12,
  totalBids: 47,
  averageBid: 155000,
  bidHistory: [
    { timestamp: '23 seconds ago', amount: 145000, bidder: 'EXPERT-***-7891', action: 'NEW_LEADER', rank: 1 },
    { timestamp: '45 seconds ago', amount: 146500, bidder: 'EXPERT-***-3456', action: 'BID_PLACED', rank: 3 },
    { timestamp: '1 minute ago', amount: 147000, bidder: 'EXPERT-***-9876', action: 'BID_PLACED', rank: 4 },
    { timestamp: '2 minutes ago', amount: 148000, bidder: 'YOU', action: 'BID_PLACED', rank: 2 },
    { timestamp: '3 minutes ago', amount: 150000, bidder: 'EXPERT-***-2468', action: 'BID_PLACED', rank: 5 },
    { timestamp: '4 minutes ago', amount: 149000, bidder: 'EXPERT-***-1357', action: 'BID_UPDATED', rank: 6 }
  ],
  topBidders: [
    { rank: 1, anonymousId: 'EXPERT-***-7891', amount: 145000, experience: 18, rating: 4.9, streak: 3, status: 'LEADING' },
    { rank: 2, anonymousId: 'YOU', amount: 148000, experience: 15, rating: 4.8, streak: 1, status: 'ACTIVE' },
    { rank: 3, anonymousId: 'EXPERT-***-3456', amount: 146500, experience: 12, rating: 4.7, streak: 0, status: 'ACTIVE' },
    { rank: 4, anonymousId: 'EXPERT-***-9876', amount: 147000, experience: 20, rating: 4.6, streak: 0, status: 'ACTIVE' },
    { rank: 5, anonymousId: 'EXPERT-***-2468', amount: 150000, experience: 8, rating: 4.5, streak: 0, status: 'FALLING' }
  ],
  marketActivity: {
    bidFrequency: '3.2 bids/minute',
    priceVolatility: 'HIGH',
    momentum: 'AGGRESSIVE_DOWN',
    predictedRange: { min: 140000, max: 155000 }
  }
}

export default function LiveBidWar() {
  const { classes } = useThemeClasses()
  const [timeLeft, setTimeLeft] = useState(mockLiveBidWar.timeLeft)
  const [isPlaying, setIsPlaying] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [quickBidAmount, setQuickBidAmount] = useState(144000)
  const [showBidModal, setShowBidModal] = useState(false)
  const [bidHistory, setBidHistory] = useState(mockLiveBidWar.bidHistory)
  const [notifications, setNotifications] = useState<string[]>([])
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Countdown timer
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying])

  // Simulate live bid updates
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      // Simulate new bid
      const shouldAddBid = Math.random() > 0.7
      if (shouldAddBid) {
        const newBid = {
          timestamp: 'Just now',
          amount: Math.floor(Math.random() * 10000) + 140000,
          bidder: `EXPERT-***-${Math.floor(Math.random() * 9999)}`,
          action: 'BID_PLACED' as const,
          rank: Math.floor(Math.random() * 5) + 1
        }
        
        setBidHistory(prev => [newBid, ...prev.slice(0, 9)])
        
        if (soundEnabled) {
          // Would play notification sound
          console.log('🔔 New bid notification')
        }

        setNotifications(prev => [...prev, `New bid: $${newBid.amount.toLocaleString()}`])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh, soundEnabled])

  const handleQuickBid = (amount: number) => {
    setShowBidModal(true)
    setQuickBidAmount(amount)
  }

  const submitBid = () => {
    // Handle bid submission
    const newBid = {
      timestamp: 'Just now',
      amount: quickBidAmount,
      bidder: 'YOU',
      action: 'BID_UPDATED' as const,
      rank: quickBidAmount < mockLiveBidWar.currentLeader.amount ? 1 : 2
    }
    
    setBidHistory(prev => [newBid, ...prev.slice(0, 9)])
    setShowBidModal(false)
    
    if (quickBidAmount < mockLiveBidWar.currentLeader.amount) {
      setNotifications(prev => [...prev, '🎉 You are now leading!'])
    }
  }

  const getTimeColor = () => {
    const totalMinutes = timeLeft.hours * 60 + timeLeft.minutes
    if (totalMinutes < 30) return 'text-red-500'
    if (totalMinutes < 60) return 'text-orange-500'
    return 'text-green-500'
  }

  const getMomentumColor = (momentum: string) => {
    switch (momentum) {
      case 'AGGRESSIVE_DOWN':
        return 'text-green-500'
      case 'MODERATE_DOWN':
        return 'text-blue-500'
      case 'STABLE':
        return 'text-slate-500'
      case 'MODERATE_UP':
        return 'text-orange-500'
      case 'AGGRESSIVE_UP':
        return 'text-red-500'
      default:
        return 'text-slate-500'
    }
  }

  const getBidderStatusColor = (status: string) => {
    switch (status) {
      case 'LEADING':
        return 'text-green-600 bg-green-50'
      case 'ACTIVE':
        return 'text-blue-600 bg-blue-50'
      case 'FALLING':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-slate-600 bg-slate-50'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Live War Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Flame className="h-6 w-6 animate-pulse" />
                  <span className="text-xl font-bold">LIVE BID WAR</span>
                </div>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{mockLiveBidWar.title}</h1>
            <p className="text-white/90 mb-4">{mockLiveBidWar.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-white/80 text-sm">Time Left</div>
                <div className={`text-2xl font-bold ${getTimeColor()}`}>
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-white/80 text-sm">Current Leader</div>
                <div className="text-lg font-bold">${mockLiveBidWar.currentLeader.amount.toLocaleString()}</div>
                <div className="text-xs text-white/70">{mockLiveBidWar.currentLeader.timestamp}</div>
              </div>
              
              <div className="text-center">
                <div className="text-white/80 text-sm">Your Position</div>
                <div className="text-lg font-bold">#{mockLiveBidWar.yourBid.rank}</div>
                <div className="text-xs text-white/70">${mockLiveBidWar.yourBid.amount.toLocaleString()}</div>
              </div>
              
              <div className="text-center">
                <div className="text-white/80 text-sm">Live Bidders</div>
                <div className="text-lg font-bold">{mockLiveBidWar.liveParticipants}</div>
                <div className="text-xs text-white/70">{mockLiveBidWar.totalBids} total bids</div>
              </div>
              
              <div className="text-center">
                <div className="text-white/80 text-sm">Bid Frequency</div>
                <div className="text-lg font-bold">{mockLiveBidWar.marketActivity.bidFrequency}</div>
                <div className="text-xs text-white/70">Very Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleQuickBid(mockLiveBidWar.currentLeader.amount - 1000)}
            className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="h-5 w-5" />
              <span className="font-bold">BEAT LEADER</span>
            </div>
            <div className="text-2xl font-bold">${(mockLiveBidWar.currentLeader.amount - 1000).toLocaleString()}</div>
            <div className="text-sm opacity-90">Instant bid to take the lead</div>
          </button>
          
          <button
            onClick={() => handleQuickBid(Math.floor(mockLiveBidWar.averageBid * 0.95))}
            className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingDown className="h-5 w-5" />
              <span className="font-bold">STRATEGIC BID</span>
            </div>
            <div className="text-2xl font-bold">${Math.floor(mockLiveBidWar.averageBid * 0.95).toLocaleString()}</div>
            <div className="text-sm opacity-90">5% below average</div>
          </button>
          
          <button
            onClick={() => handleQuickBid(mockLiveBidWar.marketActivity.predictedRange.min)}
            className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="h-5 w-5" />
              <span className="font-bold">AI RECOMMENDED</span>
            </div>
            <div className="text-2xl font-bold">${mockLiveBidWar.marketActivity.predictedRange.min.toLocaleString()}</div>
            <div className="text-sm opacity-90">Predicted winning range</div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Leaderboard */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Live Leaderboard</h3>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Real-time updates</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {mockLiveBidWar.topBidders.map((bidder, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  bidder.anonymousId === 'YOU' ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {bidder.rank === 1 && <Award className="h-5 w-5 text-yellow-500" />}
                      <span className="font-bold text-slate-700">#{bidder.rank}</span>
                    </div>
                    
                    <div>
                      <div className={`font-medium ${bidder.anonymousId === 'YOU' ? 'text-blue-700' : 'text-slate-900'}`}>
                        {bidder.anonymousId}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <span>{bidder.experience}y exp</span>
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span>{bidder.rating}/5.0</span>
                        {bidder.streak > 0 && (
                          <span className="text-orange-600">🔥 {bidder.streak} streak</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">${bidder.amount.toLocaleString()}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getBidderStatusColor(bidder.status)}`}>
                      {bidder.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Live Activity</h3>
              <Bell className="h-4 w-4 text-slate-400" />
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {bidHistory.map((bid, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    bid.action === 'NEW_LEADER' ? 'bg-yellow-500' :
                    bid.bidder === 'YOU' ? 'bg-blue-500' : 'bg-slate-400'
                  }`}></div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900">
                      {bid.bidder === 'YOU' ? 'You' : bid.bidder}
                      {bid.action === 'NEW_LEADER' && ' 👑 took the lead!'}
                      {bid.action === 'BID_PLACED' && ' placed a bid'}
                      {bid.action === 'BID_UPDATED' && ' updated their bid'}
                    </div>
                    <div className="text-sm text-slate-600">${bid.amount.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">{bid.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Intelligence */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Market Intelligence</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-slate-600">Price Momentum</div>
              <div className={`text-lg font-bold ${getMomentumColor(mockLiveBidWar.marketActivity.momentum)}`}>
                {mockLiveBidWar.marketActivity.momentum.replace('_', ' ')}
              </div>
              <TrendingDown className="h-5 w-5 text-green-500 mx-auto mt-1" />
            </div>
            
            <div className="text-center">
              <div className="text-sm text-slate-600">Volatility</div>
              <div className="text-lg font-bold text-orange-600">{mockLiveBidWar.marketActivity.priceVolatility}</div>
              <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto mt-1" />
            </div>
            
            <div className="text-center">
              <div className="text-sm text-slate-600">Predicted Range</div>
              <div className="text-lg font-bold text-slate-900">
                ${mockLiveBidWar.marketActivity.predictedRange.min.toLocaleString()} - ${mockLiveBidWar.marketActivity.predictedRange.max.toLocaleString()}
              </div>
              <Eye className="h-5 w-5 text-blue-500 mx-auto mt-1" />
            </div>
            
            <div className="text-center">
              <div className="text-sm text-slate-600">Bid Frequency</div>
              <div className="text-lg font-bold text-slate-900">{mockLiveBidWar.marketActivity.bidFrequency}</div>
              <Activity className="h-5 w-5 text-green-500 mx-auto mt-1" />
            </div>
          </div>
        </div>

        {/* Bid Modal */}
        {showBidModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Place Your Bid</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bid Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={quickBidAmount}
                    onChange={(e) => setQuickBidAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={100000}
                    max={mockLiveBidWar.budget}
                  />
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-700">
                    <strong>Impact:</strong>
                    {quickBidAmount < mockLiveBidWar.currentLeader.amount ? (
                      <span className="text-green-600"> This bid would make you the leader! 👑</span>
                    ) : (
                      <span className="text-orange-600"> You would be in position #{mockLiveBidWar.yourBid.rank}</span>
                    )}
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="text-sm text-yellow-700">
                    <AlertTriangle className="h-4 w-4 inline mr-1" />
                    <strong>Warning:</strong> This is a live bid war. Prices are changing rapidly.
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowBidModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitBid}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="fixed top-4 right-4 space-y-2 z-40">
            {notifications.slice(-3).map((notification, index) => (
              <div key={index} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right">
                {notification}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
