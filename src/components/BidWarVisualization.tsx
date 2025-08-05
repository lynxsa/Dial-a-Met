'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { TrendingDown, TrendingUp, Users, DollarSign, Timer } from 'lucide-react'

interface Bid {
  id: string
  anonymousId: string
  price: number
  timeline: string
  submittedAt: string
  status: 'ACTIVE' | 'LEADING' | 'OUTBID'
  rank: number
  skillHighlights: string[]
  valueAdds: string[]
}

interface BidWarVisualizationProps {
  requestId: string
  initialBids?: Bid[]
}

// Mock data for demonstration
const mockBids: Bid[] = [
  {
    id: '1',
    anonymousId: 'EXPERT-MT-4521',
    price: 12500,
    timeline: '3 weeks',
    submittedAt: '2025-01-15T10:00:00Z',
    status: 'LEADING',
    rank: 1,
    skillHighlights: ['Gold Processing', 'Flotation'],
    valueAdds: ['24/7 Support', 'Extra Review Session']
  },
  {
    id: '2',
    anonymousId: 'EXPERT-GE-7891',
    price: 13800,
    timeline: '2.5 weeks',
    submittedAt: '2025-01-15T11:30:00Z',
    status: 'ACTIVE',
    rank: 2,
    skillHighlights: ['Process Optimization', 'Cost Analysis'],
    valueAdds: ['Remote Monitoring', 'Training Materials']
  },
  {
    id: '3',
    anonymousId: 'EXPERT-PO-2341',
    price: 15200,
    timeline: '2 weeks',
    submittedAt: '2025-01-15T14:15:00Z',
    status: 'OUTBID',
    rank: 3,
    skillHighlights: ['Equipment Selection', 'Process Design'],
    valueAdds: ['On-site Visit', 'Extended Warranty']
  },
  {
    id: '4',
    anonymousId: 'EXPERT-FL-9876',
    price: 11900,
    timeline: '4 weeks',
    submittedAt: '2025-01-15T16:45:00Z',
    status: 'LEADING',
    rank: 1,
    skillHighlights: ['Advanced Flotation', 'Recovery Optimization'],
    valueAdds: ['Pilot Testing', 'Performance Guarantee']
  }
]

const generateTimeSeriesData = (bids: Bid[]) => {
  return bids.map((bid) => ({
    time: new Date(bid.submittedAt).getTime(),
    price: bid.price,
    timeline: parseFloat(bid.timeline.split(' ')[0]),
    anonymousId: bid.anonymousId,
    rank: bid.rank,
    status: bid.status
  }))
}

export default function BidWarVisualization({ initialBids = mockBids }: BidWarVisualizationProps) {
  const [bids] = useState<Bid[]>(initialBids)
  const [timeLeft] = useState('2 days 14 hours')
  const [selectedView, setSelectedView] = useState<'timeline' | 'scatter'>('timeline')

  const timeSeriesData = generateTimeSeriesData(bids)
  const leadingBid = bids.find(bid => bid.status === 'LEADING')
  const avgPrice = bids.reduce((sum, bid) => sum + bid.price, 0) / bids.length

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // This would connect to WebSocket in real implementation
      // For demo, we'll just update the time left
      // setTimeLeft(calculateTimeLeft())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => `$${price.toLocaleString()}`
  const formatTime = (timestamp: number) => new Date(timestamp).toLocaleTimeString()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LEADING':
        return '#10B981' // green
      case 'ACTIVE':
        return '#F59E0B' // yellow
      case 'OUTBID':
        return '#EF4444' // red
      default:
        return '#6B7280' // gray
    }
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Live Bid War</h2>
          <p className="text-slate-300">Real-time anonymous bidding competition</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 text-orange-400">
            <Timer className="h-5 w-5" />
            <span className="font-semibold">{timeLeft} left</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('timeline')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedView === 'timeline'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setSelectedView('scatter')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedView === 'scatter'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Price vs Time
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Bids</p>
              <p className="text-xl font-bold text-white">{bids.length}</p>
            </div>
            <Users className="h-6 w-6 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Leading Bid</p>
              <p className="text-xl font-bold text-green-400">{formatPrice(leadingBid?.price || 0)}</p>
            </div>
            <TrendingDown className="h-6 w-6 text-green-400" />
          </div>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Average Bid</p>
              <p className="text-xl font-bold text-orange-400">{formatPrice(avgPrice)}</p>
            </div>
            <DollarSign className="h-6 w-6 text-orange-400" />
          </div>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Bid Range</p>
              <p className="text-xl font-bold text-purple-400">
                {formatPrice(Math.max(...bids.map(b => b.price)) - Math.min(...bids.map(b => b.price)))}
              </p>
            </div>
            <TrendingUp className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
        <ResponsiveContainer width="100%" height={300}>
          {selectedView === 'timeline' ? (
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                type="number" 
                scale="time" 
                domain={['dataMin', 'dataMax']}
                tickFormatter={formatTime}
                stroke="#9CA3AF"
              />
              <YAxis 
                tickFormatter={formatPrice}
                stroke="#9CA3AF"
              />
              <Tooltip 
                labelFormatter={(value) => `Time: ${formatTime(value as number)}`}
                formatter={(value: number | string, name: string) => [
                  name === 'price' ? formatPrice(value as number) : value,
                  name === 'price' ? 'Bid Amount' : name
                ]}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <ScatterChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="timeline" 
                name="Timeline (weeks)"
                tickFormatter={(value) => `${value}w`}
                stroke="#9CA3AF"
              />
              <YAxis 
                dataKey="price" 
                name="Price"
                tickFormatter={formatPrice}
                stroke="#9CA3AF"
              />
              <Tooltip 
                formatter={(value: number | string, name: string) => [
                  name === 'price' ? formatPrice(value as number) : `${value} weeks`,
                  name === 'price' ? 'Bid Amount' : 'Timeline'
                ]}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Scatter 
                dataKey="price" 
                fill="#F59E0B"
              />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Bids List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Anonymous Bid Details</h3>
        <div className="space-y-3">
          {bids
            .sort((a, b) => a.price - b.price)
            .map((bid, index) => (
            <div 
              key={bid.id} 
              className={`bg-slate-700/50 border rounded-lg p-4 transition-colors ${
                bid.status === 'LEADING' 
                  ? 'border-green-500/50 bg-green-500/5' 
                  : 'border-slate-600'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-orange-400 font-mono text-sm">{bid.anonymousId}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bid.status === 'LEADING' 
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                        : bid.status === 'ACTIVE'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30'
                        : 'bg-red-500/20 text-red-400 border border-red-400/30'
                    }`}>
                      {bid.status === 'LEADING' ? `#${index + 1} Leading` : `#${index + 1} ${bid.status}`}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-slate-400 text-xs">Bid Amount</p>
                      <p className="text-white font-semibold">{formatPrice(bid.price)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Timeline</p>
                      <p className="text-white font-semibold">{bid.timeline}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Submitted</p>
                      <p className="text-white font-semibold">
                        {new Date(bid.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Skill Highlights</p>
                      <div className="flex flex-wrap gap-1">
                        {bid.skillHighlights.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs border border-blue-400/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Value Adds</p>
                      <div className="flex flex-wrap gap-1">
                        {bid.valueAdds.map((add, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-xs border border-purple-400/30">
                            {add}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {bid.status === 'LEADING' && (
                  <div className="lg:ml-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
                      Select This Bid
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Update Indicator */}
      <div className="flex items-center justify-center mt-6 space-x-2 text-slate-400">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm">Live updates active</span>
      </div>
    </div>
  )
}
