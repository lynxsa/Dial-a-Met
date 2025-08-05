'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Clock,
  DollarSign,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Target,
  Crown,
  Activity,
  MapPin
} from 'lucide-react'
import UniversalSidebar from '@/components/UniversalSidebar'
import { ProtectedRoute } from '@/components/AuthProvider'

interface BidData {
  id: string
  anonymousId: string
  price: number
  timeline: string
  position: number
  submittedAt: string
  valueAdds: string[]
  rating: number
  completedProjects: number
  responseTime: string
  isTop3: boolean
  changeDirection?: 'up' | 'down' | 'new'
}

export default function BidWarDashboard() {
  const [bids, setBids] = useState<BidData[]>([])
  const [timeRemaining] = useState('23h 45m 12s')
  const [isLive, setIsLive] = useState(true)

  // Mock project data
  const projectData = {
    id: 'EXP#A38F2B',
    title: 'Flotation Circuit Optimization',
    description: 'Seeking expert to optimize existing flotation circuits for improved gold recovery rates. Current recovery at 87%, targeting 92%+.',
    budget: { min: 85000, max: 120000 },
    location: 'Witwatersrand Basin, GP',
    mineralType: 'Gold & Precious Metals',
    urgency: 'High Priority',
    skillTags: ['Flotation Optimization', 'Gold Recovery', 'Process Engineering'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    maxBids: 24,
    currentBids: 18,
    clientRating: 4.8
  }

  useEffect(() => {
    // Mock bid data with South African context
    const mockBids: BidData[] = [
      {
        id: '1',
        anonymousId: 'EXP#JHB-7891',
        price: 92000,
        timeline: '3 weeks',
        position: 1,
        submittedAt: '2 hours ago',
        valueAdds: ['Fast Delivery', 'Additional Review', 'Staff Training'],
        rating: 4.9,
        completedProjects: 234,
        responseTime: '< 2 hours',
        isTop3: true,
        changeDirection: 'up'
      },
      {
        id: '2',
        anonymousId: 'EXP#CPT-5643',
        price: 95000,
        timeline: '3.5 weeks',
        position: 2,
        submittedAt: '4 hours ago',
        valueAdds: ['Performance Warranty', 'Monthly Reports'],
        rating: 4.8,
        completedProjects: 189,
        responseTime: '< 4 hours',
        isTop3: true,
        changeDirection: 'down'
      },
      {
        id: '3',
        anonymousId: 'EXP#DBN-2156',
        price: 98000,
        timeline: '2.5 weeks',
        position: 3,
        submittedAt: '1 hour ago',
        valueAdds: ['Express Delivery', 'Post-Project Consultation'],
        rating: 4.9,
        completedProjects: 156,
        responseTime: '< 1 hour',
        isTop3: true,
        changeDirection: 'new'
      },
      {
        id: '4',
        anonymousId: 'EXP#PTA-8923',
        price: 103000,
        timeline: '4 weeks',
        position: 4,
        submittedAt: '6 hours ago',
        valueAdds: ['Detailed Analysis', 'Extended Support'],
        rating: 4.7,
        completedProjects: 298,
        responseTime: '< 3 hours',
        isTop3: false
      },
      {
        id: '5',
        anonymousId: 'EXP#PLK-4567',
        price: 107000,
        timeline: '3 weeks',
        position: 5,
        submittedAt: '8 hours ago',
        valueAdds: ['Premium Service', 'Priority Support'],
        rating: 4.8,
        completedProjects: 167,
        responseTime: '< 6 hours',
        isTop3: false
      }
    ]
    
    setBids(mockBids)
    
    // Simulate live updates every 30 seconds
    const interval = setInterval(() => {
      if (isLive) {
        // Simulate position changes
        setBids(prev => prev.map(bid => ({
          ...bid,
          changeDirection: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : undefined
        })))
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isLive])

  const getPositionIcon = (changeDirection?: string) => {
    switch (changeDirection) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-600" />
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-600" />
      case 'new':
        return <Zap className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const getProgressPercentage = () => {
    return (projectData.currentBids / projectData.maxBids) * 100
  }

  const handleSelectWinner = (bidId: string) => {
    // Handle winner selection logic
    console.log('Selected winner:', bidId)
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50">
        <UniversalSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 shadow-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Bid War Dashboard</h1>
                    <p className="text-slate-600">{projectData.title}</p>
                  </div>
                </div>
                
                {/* Live Status & Timer */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-red-800 font-medium">Ends in: {timeRemaining}</span>
                  </div>
                  <button 
                    onClick={() => setIsLive(!isLive)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isLive 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    }`}
                  >
                    {isLive ? 'Live' : 'Paused'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              <div className="grid lg:grid-cols-4 gap-6">
                
                {/* Left Panel - Project Details */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Project Card */}
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="relative h-40">
                      <Image
                        src={projectData.image}
                        alt={projectData.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="bg-blue-600 px-2 py-1 rounded text-sm font-medium">
                          {projectData.id}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-slate-900 mb-2">{projectData.title}</h3>
                      <p className="text-sm text-slate-600 mb-4">{projectData.description}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-700">{projectData.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-700">
                            R{projectData.budget.min.toLocaleString()} - R{projectData.budget.max.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-slate-700">Client: {projectData.clientRating}★</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex flex-wrap gap-1">
                          {projectData.skillTags.map((tag, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top 3 Merit Badges */}
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                      <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                      Top 3 Shortlist
                    </h4>
                    <div className="space-y-3">
                      {bids.filter(bid => bid.isTop3).map((bid, index) => (
                        <div key={bid.id} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{bid.anonymousId}</div>
                            <div className="text-sm text-slate-600">R{bid.price.toLocaleString()}</div>
                          </div>
                          {getPositionIcon(bid.changeDirection)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bidding Progress */}
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                      <Activity className="w-5 h-5 text-blue-500 mr-2" />
                      Bidding Progress
                    </h4>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">{projectData.currentBids}/{projectData.maxBids} bids</span>
                        <span className="font-medium text-slate-900">{Math.round(getProgressPercentage())}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage()}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      {projectData.maxBids - projectData.currentBids} slots remaining
                    </div>
                  </div>
                </div>

                {/* Center Stage - Live Bidding Graph */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Price vs Timeline Chart */}
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-900">Live Bidding Visualization</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600">Live Updates</span>
                      </div>
                    </div>

                    {/* Simplified Chart Visualization */}
                    <div className="relative h-80 bg-slate-50 rounded-lg p-4">
                      <div className="absolute inset-4 border-l-2 border-b-2 border-slate-300">
                        {/* Y-axis labels (Price) */}
                        <div className="absolute -left-12 top-0 text-xs text-slate-600">R120k</div>
                        <div className="absolute -left-12 top-1/4 text-xs text-slate-600">R110k</div>
                        <div className="absolute -left-12 top-2/4 text-xs text-slate-600">R100k</div>
                        <div className="absolute -left-12 top-3/4 text-xs text-slate-600">R90k</div>
                        <div className="absolute -left-12 bottom-0 text-xs text-slate-600">R80k</div>

                        {/* X-axis labels (Timeline) */}
                        <div className="absolute -bottom-6 left-0 text-xs text-slate-600">2w</div>
                        <div className="absolute -bottom-6 left-1/4 text-xs text-slate-600">3w</div>
                        <div className="absolute -bottom-6 left-2/4 text-xs text-slate-600">4w</div>
                        <div className="absolute -bottom-6 left-3/4 text-xs text-slate-600">5w</div>
                        <div className="absolute -bottom-6 right-0 text-xs text-slate-600">6w</div>

                        {/* Bid Points */}
                        {bids.slice(0, 5).map((bid) => {
                          const timelineWeeks = parseFloat(bid.timeline.split(' ')[0])
                          const x = ((timelineWeeks - 2) / 4) * 100
                          const y = ((120000 - bid.price) / 40000) * 100
                          
                          return (
                            <div
                              key={bid.id}
                              className={`absolute w-4 h-4 rounded-full border-2 border-white transform -translate-x-2 -translate-y-2 cursor-pointer transition-all hover:scale-125 ${
                                bid.isTop3 ? 'bg-blue-600' : 'bg-slate-400'
                              }`}
                              style={{ left: `${x}%`, top: `${y}%` }}
                              title={`${bid.anonymousId}: R${bid.price.toLocaleString()} in ${bid.timeline}`}
                            >
                              {bid.position <= 3 && (
                                <div className="absolute -top-6 -left-1 bg-slate-900 text-white text-xs px-1 py-0.5 rounded">
                                  #{bid.position}
                                </div>
                              )}
                            </div>
                          )
                        })}

                        {/* Trend Lines */}
                        <svg className="absolute inset-0 w-full h-full">
                          <defs>
                            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0,60 Q 25,45 50,50 T 100,40"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        </svg>
                      </div>

                      {/* Chart Labels */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-slate-700">
                        Timeline (weeks)
                      </div>
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-slate-700">
                        Price (ZAR)
                      </div>
                    </div>
                  </div>

                  {/* Selection Controls */}
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">Selection Controls</h3>
                      <span className="text-sm text-slate-600">24h cooling period required</span>
                    </div>
                    
                    <button 
                      disabled
                      className="w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>Select Winner (Available in 23h 45m)</span>
                      </div>
                    </button>
                    
                    <p className="text-xs text-slate-500 mt-2 text-center">
                      Winner selection unlocks after the 24-hour review period
                    </p>
                  </div>
                </div>

                {/* Right Panel - Bid Comparator */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center">
                        <Target className="w-5 h-5 text-blue-500 mr-2" />
                        Bid Comparator
                      </h3>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {bids.map((bid) => (
                        <div key={bid.id} className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          bid.isTop3 ? 'bg-blue-50' : ''
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                bid.position === 1 ? 'bg-yellow-500 text-white' :
                                bid.position === 2 ? 'bg-gray-400 text-white' :
                                bid.position === 3 ? 'bg-orange-400 text-white' :
                                'bg-slate-200 text-slate-700'
                              }`}>
                                {bid.position}
                              </span>
                              <span className="font-medium text-slate-900">{bid.anonymousId}</span>
                              {getPositionIcon(bid.changeDirection)}
                            </div>
                            {bid.isTop3 && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Price:</span>
                              <span className="font-medium">R{bid.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Timeline:</span>
                              <span className="font-medium">{bid.timeline}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Rating:</span>
                              <span className="font-medium">{bid.rating}★ ({bid.completedProjects})</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Response:</span>
                              <span className="font-medium text-green-600">{bid.responseTime}</span>
                            </div>
                          </div>

                          {bid.valueAdds.length > 0 && (
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-1">
                                {bid.valueAdds.slice(0, 2).map((valueAdd, vIndex) => (
                                  <span key={vIndex} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                                    ✓ {valueAdd}
                                  </span>
                                ))}
                                {bid.valueAdds.length > 2 && (
                                  <span className="text-xs text-slate-500">+{bid.valueAdds.length - 2} more</span>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="mt-2 text-xs text-slate-500">
                            Submitted {bid.submittedAt}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
