'use client';

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { 
  ArrowLeft,
  DollarSign,
  Clock,
  FileText,
  Upload,
  CheckCircle2,
  Info,
  Target,
  Zap,
  Calendar,
  MapPin,
  Star,
  Shield,
  TrendingDown,
  Users,
  Eye,
  Award,
  Activity
} from 'lucide-react'
import Link from 'next/link'

// Mock project data
const mockProject = {
  id: 'proj-001',
  title: 'Gold Recovery Optimization Project',
  client: {
    name: 'Anonymous Mining Corp',
    rating: 4.8,
    location: 'South Africa',
    industry: 'Gold Mining',
    size: 'Large Enterprise',
    verified: true
  },
  description: 'We are experiencing declining gold recovery rates at our primary processing facility. Recovery has dropped from 92% to 78% over the past 6 months. We need an expert to identify the root cause and implement solutions to restore optimal recovery rates.',
  requirements: [
    'Minimum 10 years experience in gold processing',
    'Expertise in gravity separation and flotation',
    'Experience with process optimization',
    'Available for on-site consultation',
    'Must have relevant certifications'
  ],
  budget: {
    min: 150000,
    max: 300000,
    currency: 'USD'
  },
  timeline: {
    start: '2024-02-15',
    duration: '3 months',
    urgency: 'High'
  },
  location: 'Johannesburg, South Africa',
  deliverables: [
    'Root cause analysis report',
    'Process optimization recommendations',
    'Implementation roadmap',
    'On-site consultation (minimum 2 weeks)',
    'Final performance report'
  ],
  competitorInfo: {
    totalBids: 23,
    averageBid: 195000,
    lowBid: 165000,
    highBid: 275000,
    yourRanking: 'Not yet submitted'
  },
  aiInsights: {
    suggestedBid: 185000,
    winProbability: 75,
    competitionLevel: 'Moderate',
    recommendations: [
      'Your profile matches 95% of requirements',
      'Consider highlighting your gravity separation expertise',
      'Include case studies from similar projects',
      'Price competitively - market rate is $185k'
    ]
  }
}

export default function BidSubmission() {
  const { classes } = useThemeClasses()
  const [bidAmount, setBidAmount] = useState(185000)
  const [proposal, setProposal] = useState('')
  const [timeline, setTimeline] = useState('12')
  const [attachments, setAttachments] = useState<File[]>([])
  const [showAiAssistant, setShowAiAssistant] = useState(true)
  const [bidStrategy, setBidStrategy] = useState<'competitive' | 'premium' | 'aggressive'>('competitive')
  const [guarantees, setGuarantees] = useState({
    performance: false,
    timeline: false,
    budget: false
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const getWinProbability = () => {
    const marketAverage = mockProject.competitorInfo.averageBid
    const difference = ((bidAmount - marketAverage) / marketAverage) * 100
    
    if (difference < -20) return { probability: 85, color: 'text-green-600', label: 'Very High' }
    if (difference < -10) return { probability: 75, color: 'text-green-600', label: 'High' }
    if (difference < 10) return { probability: 65, color: 'text-blue-600', label: 'Good' }
    if (difference < 25) return { probability: 45, color: 'text-orange-600', label: 'Moderate' }
    return { probability: 25, color: 'text-red-600', label: 'Low' }
  }

  const winProb = getWinProbability()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/projects" 
              className={`p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors`}
            >
              <ArrowLeft className={`h-5 w-5 ${classes.text.secondary}`} />
            </Link>
            <div>
              <h1 className={`text-2xl font-bold ${classes.text.primary}`}>Submit Bid</h1>
              <p className={classes.text.secondary}>{mockProject.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-blue-600">Anonymous Bidding</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Bid Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <div className={`${classes.background.card} rounded-xl border ${classes.border} p-6`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Project Overview</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className={`text-sm ${classes.text.secondary}`}>Client</div>
                    <div className={`font-medium ${classes.text.primary} flex items-center space-x-1`}>
                      <span>{mockProject.client.name}</span>
                      {mockProject.client.verified && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className={`flex items-center space-x-1 text-xs ${classes.text.muted}`}>
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span>{mockProject.client.rating}/5.0</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className={`text-sm ${classes.text.secondary}`}>Location</div>
                    <div className={`font-medium ${classes.text.primary} flex items-center space-x-1`}>
                      <MapPin className={`h-4 w-4 ${classes.text.muted}`} />
                      <span>{mockProject.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className={`text-sm ${classes.text.secondary}`}>Timeline</div>
                    <div className={`font-medium ${classes.text.primary} flex items-center space-x-1`}>
                      <Calendar className={`h-4 w-4 ${classes.text.muted}`} />
                      <span>{mockProject.timeline.duration}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className={`text-sm ${classes.text.secondary}`}>Budget Range</div>
                    <div className={`font-medium ${classes.text.primary}`}>
                      ${mockProject.budget.min.toLocaleString()} - ${mockProject.budget.max.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className={`text-sm ${classes.text.secondary} mb-2`}>Description</div>
                  <p className={classes.text.primary}>{mockProject.description}</p>
                </div>
                
                <div>
                  <div className={`text-sm ${classes.text.secondary} mb-2`}>Key Requirements</div>
                  <ul className="space-y-1">
                    {mockProject.requirements.map((req, index) => (
                      <li key={index} className={`flex items-start space-x-2 text-sm ${classes.text.primary}`}>
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bid Strategy */}
            <div className={`${classes.background.card} rounded-xl border ${classes.border} p-6`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Bid Strategy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setBidStrategy('aggressive')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    bidStrategy === 'aggressive' 
                      ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600' 
                      : `border ${classes.border} hover:border-red-200 dark:hover:border-red-700`
                  }`}
                >
                  <Target className="h-6 w-6 text-red-500 mb-2" />
                  <div className={`font-medium ${classes.text.primary}`}>Aggressive</div>
                  <div className={`text-sm ${classes.text.secondary}`}>Low price, high risk</div>
                </button>
                
                <button
                  onClick={() => setBidStrategy('competitive')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    bidStrategy === 'competitive' 
                      ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-600' 
                      : `border ${classes.border} hover:border-green-200 dark:hover:border-green-700`
                  }`}
                >
                  <Activity className="h-6 w-6 text-green-500 mb-2" />
                  <div className={`font-medium ${classes.text.primary}`}>Competitive</div>
                  <div className={`text-sm ${classes.text.secondary}`}>Market rate pricing</div>
                </button>
                
                <button
                  onClick={() => setBidStrategy('premium')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    bidStrategy === 'premium' 
                      ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600' 
                      : `border ${classes.border} hover:border-blue-200 dark:hover:border-blue-700`
                  }`}
                >
                  <Award className="h-6 w-6 text-blue-500 mb-2" />
                  <div className={`font-medium ${classes.text.primary}`}>Premium</div>
                  <div className={`text-sm ${classes.text.secondary}`}>High value, premium price</div>
                </button>
              </div>
            </div>

            {/* Bid Amount */}
            <div className={`${classes.background.card} rounded-xl border ${classes.border} p-6`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Your Bid</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Bid Amount (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${classes.text.muted}`} />
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
                      className={`w-full pl-10 pr-4 py-3 border ${classes.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${classes.background.card} ${classes.text.primary}`}
                      min={mockProject.budget.min}
                      max={mockProject.budget.max}
                    />
                  </div>
                  <div className={`mt-2 text-sm ${classes.text.secondary}`}>
                    Range: ${mockProject.budget.min.toLocaleString()} - ${mockProject.budget.max.toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Project Timeline (weeks)
                  </label>
                  <div className="relative">
                    <Clock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${classes.text.muted}`} />
                    <input
                      type="number"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border ${classes.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${classes.background.card} ${classes.text.primary}`}
                      min={8}
                      max={24}
                    />
                  </div>
                  <div className={`mt-2 text-sm ${classes.text.secondary}`}>
                    Estimated completion time
                  </div>
                </div>
              </div>
              
              {/* Win Probability Indicator */}
              <div className={`mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${classes.text.primary}`}>Win Probability</span>
                  <span className={`text-sm font-bold ${winProb.color}`}>{winProb.label}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      winProb.probability >= 70 ? 'bg-green-500' :
                      winProb.probability >= 50 ? 'bg-blue-500' :
                      winProb.probability >= 30 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${winProb.probability}%` }}
                  ></div>
                </div>
                <div className={`flex justify-between text-xs ${classes.text.muted} mt-1`}>
                  <span>0%</span>
                  <span>{winProb.probability}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Proposal */}
            <div className={`${classes.background.card} rounded-xl border ${classes.border} p-6`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Your Proposal</h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Project Approach & Methodology
                  </label>
                  <textarea
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    rows={8}
                    className={`w-full px-3 py-2 border ${classes.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${classes.background.card} ${classes.text.primary}`}
                    placeholder="Describe your approach to solving this problem, methodology, timeline, and expected outcomes..."
                  />
                  <div className={`mt-2 text-sm ${classes.text.muted}`}>
                    {proposal.length}/2000 characters
                  </div>
                </div>

                {/* Guarantees */}
                <div>
                  <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Performance Guarantees
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={guarantees.performance}
                        onChange={(e) => setGuarantees(prev => ({ ...prev, performance: e.target.checked }))}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${classes.text.primary}`}>Performance guarantee (results or partial refund)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={guarantees.timeline}
                        onChange={(e) => setGuarantees(prev => ({ ...prev, timeline: e.target.checked }))}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${classes.text.primary}`}>Timeline guarantee (on-time delivery or penalty)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={guarantees.budget}
                        onChange={(e) => setGuarantees(prev => ({ ...prev, budget: e.target.checked }))}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${classes.text.primary}`}>Budget guarantee (no cost overruns)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className={`${classes.background.card} rounded-xl border ${classes.border} p-6`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Supporting Documents</h3>
              
              <div className="space-y-4">
                <div className={`border-2 border-dashed ${classes.border} rounded-lg p-6 text-center`}>
                  <Upload className={`h-8 w-8 ${classes.text.muted} mx-auto mb-2`} />
                  <p className={`text-sm ${classes.text.secondary} mb-2`}>
                    Upload case studies, certifications, or relevant documents
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                  >
                    Choose Files
                  </label>
                </div>
                
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className={`flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg`}>
                        <div className="flex items-center space-x-2">
                          <FileText className={`h-4 w-4 ${classes.text.muted}`} />
                          <span className={`text-sm ${classes.text.primary}`}>{file.name}</span>
                        </div>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Bid
              </button>
              <button
                className={`px-6 py-3 border ${classes.border} ${classes.text.primary} rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors`}
              >
                Save Draft
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Competition Analysis */}
            <div className={`${classes.background.card} rounded-xl border ${classes.border} p-6`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Competition Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${classes.text.secondary}`}>Total Bids</span>
                  <span className={`font-bold ${classes.text.primary}`}>{mockProject.competitorInfo.totalBids}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${classes.text.secondary}`}>Average Bid</span>
                  <span className={`font-bold ${classes.text.primary}`}>${mockProject.competitorInfo.averageBid.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${classes.text.secondary}`}>Lowest Bid</span>
                  <span className="font-bold text-green-600">${mockProject.competitorInfo.lowBid.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${classes.text.secondary}`}>Highest Bid</span>
                  <span className="font-bold text-red-600">${mockProject.competitorInfo.highBid.toLocaleString()}</span>
                </div>
                
                <div className={`pt-2 border-t ${classes.border}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${classes.text.secondary}`}>Your Position</span>
                    <span className="font-bold text-blue-600">{mockProject.competitorInfo.yourRanking}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            {showAiAssistant && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <h3 className={`text-lg font-bold ${classes.text.primary}`}>AI Assistant</h3>
                  </div>
                  <button
                    onClick={() => setShowAiAssistant(false)}
                    className={`${classes.text.muted} hover:${classes.text.secondary}`}
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className={`${classes.background.card} p-3 rounded-lg`}>
                    <div className="text-sm font-medium text-purple-700 mb-1">Suggested Bid</div>
                    <div className={`text-lg font-bold ${classes.text.primary}`}>${mockProject.aiInsights.suggestedBid.toLocaleString()}</div>
                  </div>
                  
                  <div>
                    <div className={`text-sm font-medium ${classes.text.primary} mb-2`}>Recommendations</div>
                    <ul className="space-y-1">
                      {mockProject.aiInsights.recommendations.map((rec, index) => (
                        <li key={index} className={`flex items-start space-x-2 text-xs ${classes.text.secondary}`}>
                          <Info className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className={`${classes.background.card} rounded-xl border ${classes.border} p-6`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Quick Stats</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className={`h-4 w-4 ${classes.text.muted}`} />
                    <span className={`text-sm ${classes.text.secondary}`}>Active Bidders</span>
                  </div>
                  <span className={`font-medium ${classes.text.primary}`}>18</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className={`h-4 w-4 ${classes.text.muted}`} />
                    <span className={`text-sm ${classes.text.secondary}`}>Project Views</span>
                  </div>
                  <span className={`font-medium ${classes.text.primary}`}>247</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className={`h-4 w-4 ${classes.text.muted}`} />
                    <span className={`text-sm ${classes.text.secondary}`}>Time Left</span>
                  </div>
                  <span className="font-medium text-orange-600">3 days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-green-500" />
                    <span className={`text-sm ${classes.text.secondary}`}>Price Trend</span>
                  </div>
                  <span className="font-medium text-green-600">Decreasing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
