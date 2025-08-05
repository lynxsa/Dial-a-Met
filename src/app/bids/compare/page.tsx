'use client';

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Star,
  Shield,
  Award,
  Activity,
  Filter,
  Eye,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  X
} from 'lucide-react'

// Mock comparison data
const mockComparisons = [
  {
    id: 'comp-001',
    title: 'Gold vs Copper Projects Comparison',
    projects: [
      {
        id: 'proj-gold-001',
        title: 'Gold Recovery Enhancement',
        industry: 'Gold Mining',
        bidAmount: 185000,
        competitors: 12,
        yourRank: 2,
        winProbability: 75,
        averageBid: 195000,
        clientRating: 4.8,
        budget: { min: 150000, max: 250000 },
        timeline: '3 months',
        requirements: ['10+ years exp', 'Gold processing', 'On-site availability']
      },
      {
        id: 'proj-copper-001',
        title: 'Copper Mine Optimization',
        industry: 'Copper Mining',
        bidAmount: 220000,
        competitors: 8,
        yourRank: 1,
        winProbability: 85,
        averageBid: 240000,
        clientRating: 4.6,
        budget: { min: 200000, max: 300000 },
        timeline: '4 months',
        requirements: ['15+ years exp', 'Copper processing', 'Process optimization']
      }
    ],
    createdDate: '2024-02-15',
    lastModified: '2024-02-20'
  }
]

const availableProjects = [
  {
    id: 'proj-iron-001',
    title: 'Iron Ore Beneficiation Study',
    industry: 'Iron Ore',
    bidAmount: 340000,
    competitors: 15,
    yourRank: 3,
    winProbability: 60,
    averageBid: 320000,
    clientRating: 4.7,
    budget: { min: 280000, max: 400000 },
    timeline: '6 months',
    requirements: ['Iron ore expertise', 'Beneficiation experience', 'Mining engineering']
  },
  {
    id: 'proj-platinum-001',
    title: 'Platinum Processing Audit',
    industry: 'Platinum',
    bidAmount: 95000,
    competitors: 6,
    yourRank: 2,
    winProbability: 70,
    averageBid: 105000,
    clientRating: 4.9,
    budget: { min: 80000, max: 120000 },
    timeline: '2 months',
    requirements: ['Platinum processing', 'Audit experience', 'PGM knowledge']
  }
]

export default function BidComparison() {
  const [selectedComparison, setSelectedComparison] = useState(mockComparisons[0])
  const [showAddProject, setShowAddProject] = useState(false)
  const [comparisonProjects, setComparisonProjects] = useState(selectedComparison.projects)
  const [selectedMetrics, setSelectedMetrics] = useState({
    bidAmount: true,
    winProbability: true,
    competition: true,
    timeline: false,
    clientRating: false,
    budget: false
  })

  const addProjectToComparison = (project: typeof availableProjects[0]) => {
    if (comparisonProjects.length < 4) {
      setComparisonProjects(prev => [...prev, project])
      setShowAddProject(false)
    }
  }

  const removeProjectFromComparison = (projectId: string) => {
    setComparisonProjects(prev => prev.filter(p => p.id !== projectId))
  }

  const getCompetitivenessColor = (competitors: number) => {
    if (competitors >= 15) return 'text-red-600'
    if (competitors >= 10) return 'text-orange-600'
    if (competitors >= 5) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getWinProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600'
    if (probability >= 60) return 'text-blue-600'
    if (probability >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-green-600'
    if (rank <= 3) return 'text-blue-600'
    if (rank <= 5) return 'text-orange-600'
    return 'text-red-600'
  }

  const calculateRecommendation = (project: typeof comparisonProjects[0]) => {
    let score = 0
    const factors = []

    // Win probability factor
    if (project.winProbability >= 80) {
      score += 30
      factors.push('High win probability')
    } else if (project.winProbability >= 60) {
      score += 20
    }

    // Competition factor
    if (project.competitors <= 8) {
      score += 25
      factors.push('Low competition')
    } else if (project.competitors <= 12) {
      score += 15
    }

    // Current rank factor
    if (project.yourRank === 1) {
      score += 20
      factors.push('Leading position')
    } else if (project.yourRank <= 3) {
      score += 15
      factors.push('Strong position')
    }

    // Budget alignment
    const budgetMid = (project.budget.min + project.budget.max) / 2
    if (project.bidAmount <= budgetMid * 0.9) {
      score += 15
      factors.push('Competitive pricing')
    } else if (project.bidAmount <= budgetMid) {
      score += 10
    }

    // Client rating
    if (project.clientRating >= 4.7) {
      score += 10
      factors.push('High-rated client')
    }

    return { score, factors }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Bid Comparison Tool</h1>
            <p className="text-slate-600">Compare multiple bids side-by-side to make informed decisions</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddProject(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Metric Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Comparison Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(selectedMetrics).map(([metric, enabled]) => (
              <label key={metric} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setSelectedMetrics(prev => ({ ...prev, [metric]: e.target.checked }))}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 capitalize">
                  {metric.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Project Comparison</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Project
                  </th>
                  {comparisonProjects.map((project) => (
                    <th key={project.id} className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider min-w-48">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="truncate">{project.title}</span>
                        <button
                          onClick={() => removeProjectFromComparison(project.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-slate-200">
                {/* Industry */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    Industry
                  </td>
                  {comparisonProjects.map((project) => (
                    <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                      {project.industry}
                    </td>
                  ))}
                </tr>

                {/* Bid Amount */}
                {selectedMetrics.bidAmount && (
                  <tr className="bg-slate-25">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Your Bid
                    </td>
                    {comparisonProjects.map((project) => (
                      <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="font-bold text-slate-900">${project.bidAmount.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">
                          vs avg ${project.averageBid.toLocaleString()}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* Current Rank */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    Current Rank
                  </td>
                  {comparisonProjects.map((project) => (
                    <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className={`font-bold ${getRankColor(project.yourRank)}`}>
                        #{project.yourRank}
                      </div>
                      <div className="text-xs text-slate-500">
                        of {project.competitors} bidders
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Win Probability */}
                {selectedMetrics.winProbability && (
                  <tr className="bg-slate-25">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Win Probability
                    </td>
                    {comparisonProjects.map((project) => (
                      <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className={`font-bold ${getWinProbabilityColor(project.winProbability)}`}>
                          {project.winProbability}%
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              project.winProbability >= 80 ? 'bg-green-500' :
                              project.winProbability >= 60 ? 'bg-blue-500' :
                              project.winProbability >= 40 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${project.winProbability}%` }}
                          ></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* Competition Level */}
                {selectedMetrics.competition && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Competition
                    </td>
                    {comparisonProjects.map((project) => (
                      <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className={`font-bold ${getCompetitivenessColor(project.competitors)}`}>
                          {project.competitors} bidders
                        </div>
                        <div className="text-xs text-slate-500">
                          {project.competitors >= 15 ? 'High' :
                           project.competitors >= 10 ? 'Medium' :
                           project.competitors >= 5 ? 'Low' : 'Very Low'}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* Timeline */}
                {selectedMetrics.timeline && (
                  <tr className="bg-slate-25">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Timeline
                    </td>
                    {comparisonProjects.map((project) => (
                      <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                        {project.timeline}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Client Rating */}
                {selectedMetrics.clientRating && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Client Rating
                    </td>
                    {comparisonProjects.map((project) => (
                      <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="font-medium text-slate-900">{project.clientRating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* Budget Range */}
                {selectedMetrics.budget && (
                  <tr className="bg-slate-25">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Budget Range
                    </td>
                    {comparisonProjects.map((project) => (
                      <td key={project.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                        <div>${project.budget.min.toLocaleString()}</div>
                        <div>- ${project.budget.max.toLocaleString()}</div>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {comparisonProjects.map((project) => {
            const recommendation = calculateRecommendation(project)
            return (
              <div key={project.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 truncate">{project.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-600">AI Score</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Recommendation Score</span>
                    <span className="text-lg font-bold text-slate-900">{recommendation.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        recommendation.score >= 80 ? 'bg-green-500' :
                        recommendation.score >= 60 ? 'bg-blue-500' :
                        recommendation.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${recommendation.score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700">Key Factors:</div>
                  {recommendation.factors.length > 0 ? (
                    <ul className="space-y-1">
                      {recommendation.factors.map((factor, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">Consider improving your position</p>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className={`text-sm font-medium ${
                    recommendation.score >= 70 ? 'text-green-600' :
                    recommendation.score >= 50 ? 'text-blue-600' :
                    recommendation.score >= 30 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {recommendation.score >= 70 ? '🎯 Highly Recommended' :
                     recommendation.score >= 50 ? '👍 Good Opportunity' :
                     recommendation.score >= 30 ? '⚠️ Consider Carefully' : '🚫 High Risk'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add Project Modal */}
        {showAddProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Add Project to Comparison</h3>
                <button
                  onClick={() => setShowAddProject(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {availableProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                    onClick={() => addProjectToComparison(project)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-900">{project.title}</h4>
                        <p className="text-sm text-slate-600">{project.industry}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">${project.bidAmount.toLocaleString()}</div>
                        <div className="text-sm text-slate-500">Rank #{project.yourRank}</div>
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
