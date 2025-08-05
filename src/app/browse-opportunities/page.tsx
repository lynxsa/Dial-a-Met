'use client'

import { useState } from 'react'
import { 
  Search,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  Grid,
  List,
  SlidersHorizontal,
  Briefcase,
  Calendar,
  Star,
  Building,
  Users,
  LogIn,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

interface Project {
  id: string
  title: string
  companyName: string
  location: string
  budget: {
    min: number
    max: number
  }
  duration: string
  category: string
  urgency: 'Low' | 'Medium' | 'High' | 'Critical'
  description: string
  requirements: string[]
  bidsCount: number
  postedDate: string
  deadline: string
  verified: boolean
  mineType: string
  commodities: string[]
}

const mockProjects: Project[] = [
  {
    id: 'PRJ-2024-001',
    title: 'Gold Mine Processing Plant Optimization',
    companyName: 'Harmony Gold Mining',
    location: 'Johannesburg, South Africa',
    budget: { min: 150000, max: 250000 },
    duration: '4-6 months',
    category: 'Metallurgy & Processing',
    urgency: 'High',
    description: 'Seeking experienced metallurgist to optimize gold recovery processes and reduce operating costs at our main processing facility.',
    requirements: ['Metallurgy degree', '10+ years experience', 'CIP/CIL expertise', 'MHSA compliance'],
    bidsCount: 12,
    postedDate: '2024-08-03',
    deadline: '2024-08-15',
    verified: true,
    mineType: 'Underground Gold Mine',
    commodities: ['Gold', 'Silver']
  },
  {
    id: 'PRJ-2024-002', 
    title: 'Platinum Mine Ventilation System Design',
    companyName: 'Anglo American Platinum',
    location: 'Rustenburg, South Africa',
    budget: { min: 80000, max: 120000 },
    duration: '3-4 months',
    category: 'Mine Engineering',
    urgency: 'Medium',
    description: 'Design and implement improved ventilation system for underground platinum operations to enhance safety and efficiency.',
    requirements: ['Mining Engineering', 'Ventilation design', 'DMRE certification', 'Underground experience'],
    bidsCount: 8,
    postedDate: '2024-08-02',
    deadline: '2024-08-20',
    verified: true,
    mineType: 'Underground Platinum Mine',
    commodities: ['Platinum', 'Palladium', 'Rhodium']
  },
  {
    id: 'PRJ-2024-003',
    title: 'Iron Ore Resource Evaluation & Modeling',
    companyName: 'Kumba Iron Ore',
    location: 'Northern Cape, South Africa',
    budget: { min: 60000, max: 100000 },
    duration: '2-3 months',
    category: 'Geology & Resource Modeling',
    urgency: 'Medium',
    description: 'Comprehensive resource evaluation and 3D geological modeling for new iron ore deposit exploration.',
    requirements: ['Geology degree', 'Leapfrog expertise', 'JORC compliance', 'Iron ore experience'],
    bidsCount: 15,
    postedDate: '2024-08-01',
    deadline: '2024-08-18',
    verified: true,
    mineType: 'Open Pit Iron Ore',
    commodities: ['Iron Ore', 'Manganese']
  },
  {
    id: 'PRJ-2024-004',
    title: 'Coal Mine Environmental Impact Assessment',
    companyName: 'Exxaro Resources',
    location: 'Mpumalanga, South Africa',
    budget: { min: 45000, max: 75000 },
    duration: '6-8 weeks',
    category: 'Environmental Compliance',
    urgency: 'Critical',
    description: 'Urgent environmental impact assessment for coal mining expansion project to meet regulatory deadlines.',
    requirements: ['Environmental Science', 'EIA experience', 'NEMA compliance', 'Coal mining knowledge'],
    bidsCount: 6,
    postedDate: '2024-08-04',
    deadline: '2024-08-10',
    verified: true,
    mineType: 'Open Pit Coal Mine',
    commodities: ['Thermal Coal', 'Coking Coal']
  }
]

const categories = [
  'All Categories',
  'Metallurgy & Processing',
  'Mine Engineering', 
  'Geology & Resource Modeling',
  'Environmental Compliance',
  'Safety & Risk Management',
  'Equipment & Automation',
  'Mine Planning & Design',
  'Financial Analysis'
]

const locations = [
  'All Locations',
  'Gauteng',
  'Mpumalanga', 
  'Limpopo',
  'North West',
  'Northern Cape',
  'Free State',
  'KwaZulu-Natal'
]

export default function BrowseOpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [sortBy, setSortBy] = useState('urgency')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const { user } = useAuth()

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              {project.verified && (
                <div className="bg-blue-600 rounded-full p-1">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 space-x-4 mb-2">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                <span>{project.companyName}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{project.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(project.urgency)}`}>
                {project.urgency} Priority
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-sm text-slate-600 dark:text-slate-300">{project.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-sm text-slate-600 dark:text-slate-300">{project.bidsCount} bids</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Deadline: {new Date(project.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.requirements.slice(0, 3).map((req, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full"
            >
              {req}
            </span>
          ))}
          {project.requirements.length > 3 && (
            <span className="px-2 py-1 text-slate-500 dark:text-slate-400 text-xs">
              +{project.requirements.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Posted {new Date(project.postedDate).toLocaleDateString()}
          </div>
          
          {user ? (
            <Link
              href={`/dashboard/consultant/projects/${project.id}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              View & Bid
            </Link>
          ) : (
            <div className="flex space-x-2">
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-3 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-medium rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign In
              </Link>
              <Link
                href="/auth/signup?role=consultant"
                className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">Dial-a-Met</span>
              </Link>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Browse Mining Opportunities
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Discover high-value projects from leading South African mining companies
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Welcome back,</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup?role=consultant"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join as Consultant
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Projects</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{mockProjects.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Value</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">R2.1M+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg. Bid Value</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">R125K</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Bidders</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">41</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 md:mr-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search projects by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="border-t border-slate-200 dark:border-slate-600 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Budget Range (ZAR)</label>
                  <div className="flex items-center space-x-2">
                    <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                    <span className="text-slate-500">-</span>
                    <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Urgency Level</label>
                  <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option value="">Any Urgency</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Duration</label>
                  <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option value="">Any Duration</option>
                    <option value="short">1-3 months</option>
                    <option value="medium">3-6 months</option>
                    <option value="long">6+ months</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Available Opportunities
              </h2>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                {mockProjects.length} projects
              </span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Updated 5 minutes ago
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6' : 'space-y-4'}>
            {mockProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {!user && (
            <div className="mt-8 text-center py-8 border-t border-slate-200 dark:border-slate-700">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Ready to Start Bidding?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Join Dial-a-Met today and access exclusive mining opportunities from top South African companies.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <Link
                    href="/auth/signup?role=consultant"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up as Consultant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
