'use client'

import { useState, useEffect } from 'react'
import { 
  Pickaxe, 
  Clock, 
  DollarSign, 
  MapPin, 
  Eye, 
  Lock, 
  Globe,
  Users,
  TrendingUp,
  FileText,
  MessageSquare,
  Award
} from 'lucide-react'
import Link from 'next/link'

interface Request {
  id: string
  title: string
  description: string
  problemType: string
  mineralType: string
  location: string
  budget?: number
  timeline?: string
  confidentiality: string
  status: string
  createdAt: string
  aiMatchingScore: number
  bids: Bid[]
  _count: {
    bids: number
  }
}

interface Bid {
  id: string
  amount: number
  status: string
  createdAt: string
  consultantId: string
}

export default function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return
    
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`/api/requests/${resolvedParams.id}`)
        if (response.ok) {
          const data = await response.json()
          setRequest(data.request)
        }
      } catch (error) {
        console.error('Error fetching request details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequestDetails()
  }, [resolvedParams])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-600'
      case 'IN_PROGRESS': return 'bg-blue-600'
      case 'COMPLETED': return 'bg-gray-600'
      case 'CANCELLED': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getConfidentialityIcon = (level: string) => {
    switch (level) {
      case 'PUBLIC': return <Globe className="h-4 w-4 text-green-400" />
      case 'CONFIDENTIAL': return <Eye className="h-4 w-4 text-orange-400" />
      case 'HIGHLY_CONFIDENTIAL': return <Lock className="h-4 w-4 text-red-400" />
      default: return <Eye className="h-4 w-4 text-orange-400" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Request Not Found</h1>
            <Link href="/dashboard/client">
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard/client">
                <Pickaxe className="h-8 w-8 text-orange-500 hover:text-orange-400 cursor-pointer" />
              </Link>
              <span className="text-xl font-bold text-white">Request Details</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{request.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>Posted {new Date(request.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  {getConfidentialityIcon(request.confidentiality)}
                  <span className="capitalize">{request.confidentiality.toLowerCase()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(request.status)}`}>
                {request.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Bids</p>
                <p className="text-2xl font-bold text-white">{request._count.bids}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">AI Match Score</p>
                <p className="text-2xl font-bold text-white">{request.aiMatchingScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-orange-400" />
              <div>
                <p className="text-slate-400 text-sm">Budget</p>
                <p className="text-2xl font-bold text-white">
                  {request.budget ? `$${request.budget.toLocaleString()}` : 'TBD'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-slate-400 text-sm">Timeline</p>
                <p className="text-2xl font-bold text-white">{request.timeline || 'Flexible'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Description */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Project Description</h2>
              <p className="text-slate-300 leading-relaxed">{request.description}</p>
            </div>

            {/* Project Details */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">Problem Type</label>
                  <p className="text-white font-medium">{request.problemType}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Mineral Type</label>
                  <p className="text-white font-medium">{request.mineralType}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Location</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <p className="text-white font-medium">{request.location}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Status</label>
                  <p className="text-white font-medium">{request.status.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Bids Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Received Bids</h2>
                <span className="text-sm text-slate-400">{request._count.bids} bids received</span>
              </div>
              
              {request.bids.length > 0 ? (
                <div className="space-y-4">
                  {request.bids.map((bid) => (
                    <div key={bid.id} className="border border-slate-600 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Anonymous Expert #{bid.consultantId.slice(-4)}</p>
                            <p className="text-sm text-slate-400">Submitted {new Date(bid.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">${bid.amount.toLocaleString()}</p>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            bid.status === 'PENDING' ? 'bg-yellow-600 text-yellow-100' :
                            bid.status === 'ACCEPTED' ? 'bg-green-600 text-green-100' :
                            'bg-red-600 text-red-100'
                          }`}>
                            {bid.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-400 mb-2">No bids yet</h3>
                  <p className="text-slate-500">Experts are reviewing your request. Bids typically arrive within 48 hours.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                  Edit Request
                </button>
                <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  Share Request
                </button>
                <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Cancel Request
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">AI Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Match Accuracy</span>
                  <span className="text-white font-medium">{request.aiMatchingScore}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" 
                    style={{ width: `${request.aiMatchingScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-400">
                  High-quality experts have been matched to your request based on experience and success rate.
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-slate-700/50 rounded-lg">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-300">Project Specifications.pdf</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-slate-700/50 rounded-lg">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-300">Geological Survey.xlsx</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
