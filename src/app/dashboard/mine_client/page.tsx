'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { 
  FolderOpen, 
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Eye,
  Edit,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  BarChart3,
  Download,
  Bell,
  Star,
  Award,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  location: string
  budget: number
  timeline: string
  status: 'Active' | 'Pending' | 'Completed' | 'On Hold'
  applicants: number
  createdDate: string
  category: string
  priority: 'Low' | 'Medium' | 'High'
  bids: number
  avgBid: number
  deadline: string
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Copper Mine Geological Survey',
    description: 'Comprehensive geological analysis of copper deposits in Northern Queensland mining site',
    location: 'Queensland, Australia',
    budget: 75000,
    timeline: '3 months',
    status: 'Active',
    applicants: 12,
    createdDate: '2024-02-15',
    category: 'Geological Survey',
    priority: 'High',
    bids: 12,
    avgBid: 65000,
    deadline: '2024-05-15'
  },
  {
    id: '2',
    title: 'Iron Ore Extraction Optimization',
    description: 'Optimize extraction processes and improve yield efficiency for existing iron ore operations',
    location: 'Western Australia',
    budget: 120000,
    timeline: '6 months',
    status: 'Active',
    applicants: 8,
    createdDate: '2024-01-20',
    category: 'Process Optimization',
    priority: 'Medium',
    bids: 8,
    avgBid: 105000,
    deadline: '2024-07-20'
  },
  {
    id: '3',
    title: 'Environmental Impact Assessment',
    description: 'Complete environmental impact study for proposed gold mining expansion',
    location: 'Nevada, USA',
    budget: 95000,
    timeline: '4 months',
    status: 'Completed',
    applicants: 15,
    createdDate: '2023-12-10',
    category: 'Environmental',
    priority: 'High',
    bids: 15,
    avgBid: 88000,
    deadline: '2024-04-10'
  },
  {
    id: '4',
    title: 'Coal Quality Analysis',
    description: 'Detailed quality assessment and grading of coal reserves for export planning',
    location: 'Hunter Valley, Australia',
    budget: 45000,
    timeline: '2 months',
    status: 'On Hold',
    applicants: 6,
    createdDate: '2024-02-01',
    category: 'Quality Assessment',
    priority: 'Low',
    bids: 6,
    avgBid: 42000,
    deadline: '2024-04-01'
  }
]

export default function MineClientProjectsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { classes } = useThemeClasses()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'On Hold':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4" />
      case 'Pending':
        return <Clock className="w-4 h-4" />
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />
      case 'On Hold':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Mining Projects</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage and track your mining project requests</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{mockProjects.length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {mockProjects.filter(p => p.status === 'Active').length}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {mockProjects.reduce((sum, p) => sum + p.applicants, 0)}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Applicants</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${mockProjects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Budget</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      <span>{project.priority}</span>
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{project.description}</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">{project.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">{project.timeline}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">${project.budget.toLocaleString()}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">{project.applicants} applicants</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span>{project.status}</span>
                  </span>
                  <span className="text-xs text-slate-500">Created {new Date(project.createdDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {searchQuery || statusFilter !== 'All' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating your first mining project'
              }
            </p>
            {!searchQuery && statusFilter === 'All' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Your First Project
              </button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
