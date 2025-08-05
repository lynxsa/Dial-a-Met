'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Pickaxe, 
  Plus, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign, 
  BarChart3, 
  FileText,
  Search,
  MapPin,
  LogOut
} from 'lucide-react'
import { ProtectedRoute, useAuth } from '@/components/AuthProvider'
import UniversalSidebar from '@/components/UniversalSidebar'

// Mock data for demonstration with South African context
const mockProjects = [
  {
    id: '1',
    title: 'Gold Recovery Optimization - Witwatersrand',
    status: 'BIDDING',
    budget: 125000, // R125,000
    bidsReceived: 7,
    shortlisted: 3,
    createdAt: '2025-01-15',
    mineralType: 'Gold',
    location: 'Johannesburg, GP'
  },
  {
    id: '2',
    title: 'Platinum Flotation Analysis - Bushveld Complex',
    status: 'IN_PROGRESS',
    budget: 185000, // R185,000
    selectedBid: 165000, // R165,000
    consultant: 'Expert #JHB-7891',
    createdAt: '2025-01-10',
    mineralType: 'Platinum',
    location: 'Rustenburg, NW'
  },
  {
    id: '3',
    title: 'Coal Tailings Management Review - Mpumalanga',
    status: 'COMPLETED',
    budget: 95000, // R95,000
    finalCost: 89000, // R89,000
    savings: 6000, // R6,000
    createdAt: '2024-12-20',
    mineralType: 'Coal',
    location: 'Witbank, MP'
  }
]

const mockStats = {
  totalProjects: 12,
  activeProjects: 3,
  totalSpent: 1250000, // R1,250,000
  loyaltyCredits: 18750, // R18,750 credits
  avgResponse: '14 hours',
  satisfactionRate: 4.8
}

export default function ClientDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/signin'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BIDDING':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'IN_PROGRESS':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'COMPLETED':
        return 'bg-green-50 text-green-700 border-green-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.mineralType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <UniversalSidebar />
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Top Navigation */}
          <nav className="bg-white border-b border-slate-200 shadow-sm">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Client Dashboard</h1>
                  <p className="text-slate-600">Manage your mining projects and consultations</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-600">Welcome back, {user?.name || 'Client'}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.[0] || 'C'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Projects</p>
                    <p className="text-2xl font-bold text-slate-900">{mockStats.totalProjects}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Active Projects</p>
                    <p className="text-2xl font-bold text-slate-900">{mockStats.activeProjects}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Investment</p>
                    <p className="text-2xl font-bold text-slate-900">R{mockStats.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Satisfaction Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{mockStats.satisfactionRate}★</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/dashboard/client/new-request">
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Plus className="h-5 w-5" />
                  <span>Post New Project</span>
                </button>
              </Link>
              <button className="flex items-center space-x-2 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors">
                <BarChart3 className="h-5 w-5" />
                <span>View Analytics</span>
              </button>
              <button className="flex items-center space-x-2 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors">
                <Users className="h-5 w-5" />
                <span>Browse Experts</span>
              </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search projects by title, location, or mineral type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="ALL">All Status</option>
                    <option value="BIDDING">Bidding</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Your Projects</h2>
                <p className="text-slate-600 text-sm">Track and manage your mining consultation projects</p>
              </div>
              
              <div className="divide-y divide-slate-200">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div key={project.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-slate-900">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>Budget: R{project.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Pickaxe className="h-4 w-4" />
                          <span>{project.mineralType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Posted {project.createdAt}</span>
                        </div>
                      </div>

                      {project.status === 'BIDDING' && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">
                            <span className="font-medium">{project.bidsReceived}</span> bids received • 
                            <span className="font-medium ml-1">{project.shortlisted}</span> shortlisted
                          </div>
                          <Link href={`/dashboard/client/requests/${project.id}`}>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                              View Bids →
                            </button>
                          </Link>
                        </div>
                      )}

                      {project.status === 'IN_PROGRESS' && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">
                            Working with <span className="font-medium">{project.consultant}</span> • 
                            Selected bid: <span className="font-medium">R{project.selectedBid?.toLocaleString()}</span>
                          </div>
                          <Link href={`/dashboard/client/requests/${project.id}`}>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                              View Progress →
                            </button>
                          </Link>
                        </div>
                      )}

                      {project.status === 'COMPLETED' && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">
                            Final cost: <span className="font-medium">R{project.finalCost?.toLocaleString()}</span> • 
                            Saved: <span className="font-medium text-green-600">R{project.savings?.toLocaleString()}</span>
                          </div>
                          <Link href={`/dashboard/client/requests/${project.id}`}>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                              View Details →
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No projects found</h3>
                    <p className="text-slate-600 mb-6">
                      {searchTerm || statusFilter !== 'ALL' 
                        ? 'Try adjusting your search or filter criteria'
                        : 'Start by posting your first mining consultation project'
                      }
                    </p>
                    {!searchTerm && statusFilter === 'ALL' && (
                      <Link href="/dashboard/client/new-request">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                          Post Your First Project
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
