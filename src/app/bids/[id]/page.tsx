'use client';

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { 
  ArrowLeft,
  Target, 
  Flame, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Star,
  Users2,
  ChartBar,
  AlertTriangle,
  CheckCircle2,
  Timer,
  Award,
  Download,
  RefreshCw,
  Bell,
  History,
  MessageSquare,
  FileText,
  Eye,
  Shield,
  Zap
} from 'lucide-react'

interface BidDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

// Mock detailed bid data
const mockBidDetails = {
  id: 'bid-001',
  projectId: 'proj-gold-001',
  projectTitle: 'Gold Recovery Optimization - Witwatersrand Basin',
  projectDescription: 'Critical gold recovery optimization project requiring immediate expert attention. Current operations showing declining recovery rates from 85% to 78% over the past 6 months. Need comprehensive analysis and implementation strategy.',
  clientInfo: {
    companyName: 'Witwatersrand Mining Corp',
    location: 'Johannesburg, South Africa',
    rating: 4.8,
    projectsCompleted: 23,
    paymentHistory: 'Excellent',
    responseTime: '2.3 hours'
  },
  bidDetails: {
    yourBid: 125000,
    currency: 'USD',
    submittedAt: '2025-01-15T10:30:00Z',
    lastUpdated: '2025-01-16T15:45:00Z',
    status: 'ACTIVE',
    currentRank: 2,
    winProbability: 78,
    estimatedDecision: '2025-01-18T16:00:00Z',
    timeLeft: '2 days, 14 hours'
  },
  competition: {
    totalBids: 15,
    leadingBid: 118000,
    bidRange: { min: 115000, max: 145000 },
    averageBid: 128500,
    medianBid: 127000,
    bidDistribution: [
      { range: '115k-120k', count: 3, percentage: 20 },
      { range: '120k-125k', count: 5, percentage: 33 },
      { range: '125k-130k', count: 4, percentage: 27 },
      { range: '130k-135k', count: 2, percentage: 13 },
      { range: '135k+', count: 1, percentage: 7 }
    ],
    topBids: [
      { rank: 1, amount: 118000, anonymousId: 'EXPERT-***-7891', experience: 18, rating: 4.9, timestamp: '1 hour ago' },
      { rank: 2, amount: 125000, anonymousId: 'YOUR BID', experience: 15, rating: 4.8, timestamp: '6 hours ago' },
      { rank: 3, amount: 126500, anonymousId: 'EXPERT-***-3456', experience: 12, rating: 4.7, timestamp: '3 hours ago' },
      { rank: 4, amount: 128000, anonymousId: 'EXPERT-***-9876', experience: 20, rating: 4.6, timestamp: '4 hours ago' },
      { rank: 5, amount: 129500, anonymousId: 'EXPERT-***-2468', experience: 8, rating: 4.5, timestamp: '2 hours ago' }
    ]
  },
  analytics: {
    bidHistory: [
      { timestamp: '2025-01-15T10:30:00Z', amount: 130000, action: 'SUBMITTED', rank: 3 },
      { timestamp: '2025-01-15T14:20:00Z', amount: 127000, action: 'UPDATED', rank: 2 },
      { timestamp: '2025-01-16T09:15:00Z', amount: 125000, action: 'UPDATED', rank: 2 }
    ],
    competitorActivity: [
      { timestamp: '2025-01-16T15:45:00Z', action: 'New bid submitted', amount: 118000, impact: 'Moved to rank 1' },
      { timestamp: '2025-01-16T12:30:00Z', action: 'Bid updated', amount: 126500, impact: 'Competitor moved to rank 3' },
      { timestamp: '2025-01-16T09:15:00Z', action: 'Your bid updated', amount: 125000, impact: 'Maintained rank 2' }
    ],
    insights: [
      { type: 'OPPORTUNITY', message: 'You can likely win with a bid of $117,000 or lower', confidence: 85 },
      { type: 'WARNING', message: 'Competitor activity has increased 40% in the last 24 hours', confidence: 92 },
      { type: 'INFO', message: 'Client typically responds within 2-3 days of bid deadline', confidence: 78 }
    ]
  },
  projectDetails: {
    timeline: '4-6 weeks',
    budget: 150000,
    urgency: 'HIGH',
    complexity: 'HIGH',
    skills: ['Gold Processing', 'Flotation', 'Recovery Optimization', 'Process Engineering'],
    deliverables: [
      'Current state assessment and analysis',
      'Root cause analysis of recovery decline',
      'Optimization strategy and implementation plan',
      'Training and knowledge transfer',
      'Performance monitoring setup'
    ],
    requirements: [
      'Minimum 10 years experience in gold processing',
      'Proven track record in flotation optimization',
      'Available for on-site work in South Africa',
      'Experience with similar recovery challenges'
    ]
  }
}

export default function BidDetails({ params }: BidDetailsPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bidId, setBidId] = useState<string>('')
  
  useEffect(() => {
    // Handle the Promise params in Next.js 15
    params.then(resolvedParams => {
      setBidId(resolvedParams.id)
    })
  }, [params])
  const [activeTab, setActiveTab] = useState('overview')
  const [showUpdateBid, setShowUpdateBid] = useState(false)
  const [newBidAmount, setNewBidAmount] = useState(mockBidDetails.bidDetails.yourBid)

  const bid = mockBidDetails

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-700 border border-blue-200'
      case 'LEADING':
        return 'bg-green-100 text-green-700 border border-green-200'
      case 'WON':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      case 'LOST':
        return 'bg-red-100 text-red-700 border border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'OPPORTUNITY':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Target className="h-4 w-4 text-blue-500" />
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Bid Performance */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Bid Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-1">Your Bid</div>
            <div className="text-2xl font-bold text-blue-600">${bid.bidDetails.yourBid.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Rank #{bid.bidDetails.currentRank}</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-1">Leading Bid</div>
            <div className="text-2xl font-bold text-green-600">${bid.competition.leadingBid.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Gap: ${(bid.bidDetails.yourBid - bid.competition.leadingBid).toLocaleString()}</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-1">Win Probability</div>
            <div className={`text-2xl font-bold ${bid.bidDetails.winProbability > 70 ? 'text-green-600' : 'text-orange-600'}`}>
              {bid.bidDetails.winProbability}%
            </div>
            <div className="text-xs text-slate-500">Based on current position</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-1">Time Left</div>
            <div className="text-2xl font-bold text-orange-600">{bid.bidDetails.timeLeft.split(',')[0]}</div>
            <div className="text-xs text-slate-500">{bid.bidDetails.timeLeft.split(',')[1]}</div>
          </div>
        </div>
      </div>

      {/* Top Bids Leaderboard */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Competition Leaderboard</h3>
        <div className="space-y-3">
          {bid.competition.topBids.map((competitorBid, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
              competitorBid.anonymousId === 'YOUR BID' ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {competitorBid.rank === 1 && <Award className="h-5 w-5 text-yellow-500" />}
                  {competitorBid.rank === 2 && <Award className="h-5 w-5 text-slate-400" />}
                  {competitorBid.rank === 3 && <Award className="h-5 w-5 text-orange-600" />}
                  <span className="font-bold text-slate-700">#{competitorBid.rank}</span>
                </div>
                
                <div>
                  <div className={`font-medium ${competitorBid.anonymousId === 'YOUR BID' ? 'text-blue-700' : 'text-slate-900'}`}>
                    {competitorBid.anonymousId}
                  </div>
                  <div className="text-sm text-slate-500">
                    {competitorBid.experience}y exp • {competitorBid.rating}/5.0 • {competitorBid.timestamp}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-slate-900">${competitorBid.amount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">AI Insights & Recommendations</h3>
        <div className="space-y-3">
          {bid.analytics.insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              {getInsightIcon(insight.type)}
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">{insight.message}</div>
                <div className="text-xs text-slate-500">Confidence: {insight.confidence}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Bid Distribution Chart */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Bid Distribution Analysis</h3>
        <div className="space-y-4">
          {bid.competition.bidDistribution.map((range, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-slate-700 w-20">{range.range}</span>
                <div className="w-64 bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all" 
                    style={{width: `${range.percentage}%`}}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                {range.count} bids ({range.percentage}%)
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="text-center">
            <div className="text-sm text-slate-600">Average Bid</div>
            <div className="text-lg font-bold text-slate-900">${bid.competition.averageBid.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-600">Median Bid</div>
            <div className="text-lg font-bold text-slate-900">${bid.competition.medianBid.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-600">Bid Range</div>
            <div className="text-lg font-bold text-slate-900">
              ${bid.competition.bidRange.min.toLocaleString()} - ${bid.competition.bidRange.max.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Bid History */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Your Bid History</h3>
        <div className="space-y-3">
          {bid.analytics.bidHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-slate-900">
                  {entry.action === 'SUBMITTED' ? 'Initial Bid' : 'Bid Updated'}
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-slate-900">${entry.amount.toLocaleString()}</span>
                <span className="text-sm text-slate-600">Rank #{entry.rank}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Activity */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Competitor Activity</h3>
        <div className="space-y-3">
          {bid.analytics.competitorActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">{activity.action}</div>
                <div className="text-xs text-slate-500">{activity.impact}</div>
                <div className="text-xs text-slate-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </div>
              {activity.amount && (
                <div className="text-sm font-bold text-slate-700">${activity.amount.toLocaleString()}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProjectTab = () => (
    <div className="space-y-6">
      {/* Project Overview */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Project Details</h3>
        <div className="prose max-w-none">
          <p className="text-slate-600 leading-relaxed">{bid.projectDescription}</p>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-slate-600">Timeline</div>
            <div className="text-lg font-medium text-slate-900">{bid.projectDetails.timeline}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Budget</div>
            <div className="text-lg font-medium text-slate-900">${bid.projectDetails.budget.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Urgency</div>
            <div className="text-lg font-medium text-slate-900">{bid.projectDetails.urgency}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Complexity</div>
            <div className="text-lg font-medium text-slate-900">{bid.projectDetails.complexity}</div>
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {bid.projectDetails.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Key Deliverables</h3>
        <ul className="space-y-2">
          {bid.projectDetails.deliverables.map((deliverable, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700">{deliverable}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Requirements</h3>
        <ul className="space-y-2">
          {bid.projectDetails.requirements.map((requirement, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Client Information */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Client Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-slate-600">Company</div>
            <div className="text-lg font-medium text-slate-900">{bid.clientInfo.companyName}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Location</div>
            <div className="text-lg font-medium text-slate-900">{bid.clientInfo.location}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Rating</div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-lg font-medium text-slate-900">{bid.clientInfo.rating}/5.0</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Projects Completed</div>
            <div className="text-lg font-medium text-slate-900">{bid.clientInfo.projectsCompleted}</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{bid.projectTitle}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.bidDetails.status)}`}>
                  {bid.bidDetails.status}
                </span>
                <span className="text-sm text-slate-600">
                  Submitted {new Date(bid.bidDetails.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            
            <button 
              onClick={() => setShowUpdateBid(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Target className="h-4 w-4 mr-2" />
              Update Bid
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="text-sm text-slate-600">Current Rank</div>
            <div className="text-2xl font-bold text-slate-900">#{bid.bidDetails.currentRank}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="text-sm text-slate-600">Your Bid</div>
            <div className="text-2xl font-bold text-blue-600">${bid.bidDetails.yourBid.toLocaleString()}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="text-sm text-slate-600">Leading Bid</div>
            <div className="text-2xl font-bold text-green-600">${bid.competition.leadingBid.toLocaleString()}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="text-sm text-slate-600">Win Probability</div>
            <div className="text-2xl font-bold text-orange-600">{bid.bidDetails.winProbability}%</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="text-sm text-slate-600">Total Bids</div>
            <div className="text-2xl font-bold text-slate-900">{bid.competition.totalBids}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <div className="text-sm text-slate-600">Time Left</div>
            <div className="text-2xl font-bold text-red-600">{bid.bidDetails.timeLeft.split(',')[0]}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Overview & Competition
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Analytics & History
              </button>
              
              <button
                onClick={() => setActiveTab('project')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'project'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Project Details
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'analytics' && renderAnalyticsTab()}
            {activeTab === 'project' && renderProjectTab()}
          </div>
        </div>

        {/* Update Bid Modal */}
        {showUpdateBid && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Update Your Bid</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New Bid Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={newBidAmount}
                    onChange={(e) => setNewBidAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={bid.competition.bidRange.min}
                    max={bid.projectDetails.budget}
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    Range: ${bid.competition.bidRange.min.toLocaleString()} - ${bid.projectDetails.budget.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-700">
                    <strong>Impact Prediction:</strong>
                    {newBidAmount < bid.competition.leadingBid ? (
                      <span className="text-green-600"> This bid would likely move you to rank #1</span>
                    ) : (
                      <span className="text-orange-600"> This bid would maintain your current rank</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowUpdateBid(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle bid update
                    setShowUpdateBid(false)
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Bid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
