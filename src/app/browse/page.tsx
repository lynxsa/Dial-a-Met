'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { 
  Search,
  MapPin,
  DollarSign,
  Users,
  Star,
  Clock,
  Eye,
  Grid,
  List,
  SlidersHorizontal
} from 'lucide-react'
import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'

interface Consultant {
  id: string
  name: string
  title: string
  rating: number
  reviews: number
  completedProjects: number
  hourlyRate: number
  location: string
  specializations: string[]
  availability: 'Available' | 'Busy' | 'Unavailable'
  verified: boolean
  responseTime: string
  successRate: number
  description: string
  recentProjects: string[]
}

const mockConsultants: Consultant[] = [
  {
    id: 'EXP#JHB001',
    name: 'Dr. Sarah Mitchell',
    title: 'Senior Mining Engineer & Metallurgist',
    rating: 4.9,
    reviews: 127,
    completedProjects: 234,
    hourlyRate: 185,
    location: 'Johannesburg, South Africa',
    specializations: ['Hydrometallurgy', 'Gold Recovery', 'Process Optimization'],
    availability: 'Available',
    verified: true,
    responseTime: '< 1 hour',
    successRate: 98,
    description: '15+ years in gold mining operations with expertise in cyanide leaching, carbon-in-pulp processes, and environmental compliance.',
    recentProjects: ['Anglo American Gold Mine Optimization', 'Harmony Gold Process Improvement', 'Sibanye-Stillwater Metallurgy Review']
  },
  {
    id: 'EXP#PER002',
    name: 'Marcus Chen',
    title: 'Mining Geologist & Resource Evaluation Specialist',
    rating: 4.8,
    reviews: 89,
    completedProjects: 156,
    hourlyRate: 165,
    location: 'Perth, Australia',
    specializations: ['Resource Modeling', 'Geostatistics', 'Mine Planning'],
    availability: 'Available',
    verified: true,
    responseTime: '< 2 hours',
    successRate: 95,
    description: 'Specialist in iron ore and lithium deposits with advanced skills in Leapfrog, Vulcan, and Whittle optimization.',
    recentProjects: ['BHP Iron Ore Resource Update', 'Pilbara Minerals Lithium Assessment', 'Fortescue Exploration Program']
  },
  {
    id: 'EXP#VAN003',
    name: 'Elena Rodriguez',
    title: 'Environmental Mining Consultant',
    rating: 4.9,
    reviews: 156,
    completedProjects: 198,
    hourlyRate: 145,
    location: 'Vancouver, Canada',
    specializations: ['Tailings Management', 'Environmental Impact', 'Sustainability'],
    availability: 'Busy',
    verified: true,
    responseTime: '< 4 hours',
    successRate: 97,
    description: 'Expert in sustainable mining practices, tailings storage facility design, and environmental remediation strategies.',
    recentProjects: ['Teck Resources Sustainability Review', 'Vale Tailings Management Plan', 'Barrick Environmental Assessment']
  },
  {
    id: 'EXP#LON004',
    name: 'Prof. James Harrison',
    title: 'Mining Equipment & Automation Specialist',
    rating: 4.7,
    reviews: 203,
    completedProjects: 312,
    hourlyRate: 220,
    location: 'London, United Kingdom',
    specializations: ['Mining Automation', 'Equipment Selection', 'Digital Mining'],
    availability: 'Available',
    verified: true,
    responseTime: '< 3 hours',
    successRate: 96,
    description: 'Leading expert in autonomous mining systems, equipment optimization, and Industry 4.0 implementation in mining operations.',
    recentProjects: ['Rio Tinto Automation Project', 'Caterpillar Equipment Assessment', 'Anglo American Digital Strategy']
  }
]

const categories = [
  'All Categories',
  'Geological Assessment',
  'Mine Planning',
  'Mineral Processing',
  'Environmental Compliance',
  'Equipment Selection',
  'Safety & Risk Management',
  'Automation & Technology',
  'Sustainability',
  'Financial Analysis'
]

const locations = [
  'All Locations',
  'South Africa',
  'Australia',
  'Canada',
  'United States',
  'Chile',
  'Peru',
  'United Kingdom',
  'Germany'
]

export default function BrowseConsultantsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Busy': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
  }

  const ConsultantCard = ({ consultant }: { consultant: Consultant }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <OptimizedImage
                src={`https://images.unsplash.com/photo-${consultant.id === 'EXP#JHB001' ? '1494790108755-2616b612b977' : consultant.id === 'EXP#PER002' ? '1507003211169-0a1dd7228f2d' : consultant.id === 'EXP#VAN003' ? '1580489944761-15a19d654956' : '1472099645785-5658abf4ff4e'}?w=64&h=64&fit=crop&crop=face`}
                alt={consultant.name}
                width={64}
                height={64}
                className="rounded-full border-2 border-slate-200 dark:border-slate-600"
              />
              {consultant.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{consultant.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{consultant.title}</p>
              <div className="flex items-center mt-1">
                <MapPin className="w-3 h-3 text-slate-400 mr-1" />
                <span className="text-xs text-slate-500 dark:text-slate-400">{consultant.location}</span>
              </div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(consultant.availability)}`}>
            {consultant.availability}
          </span>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-slate-900 dark:text-white ml-1">{consultant.rating}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">({consultant.reviews} reviews)</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-slate-400 mr-1" />
            <span className="text-sm text-slate-600 dark:text-slate-300">{consultant.completedProjects} projects</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {consultant.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {consultant.specializations.slice(0, 3).map((spec, index) => (
            <span key={index} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs">
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">${consultant.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-xs text-slate-500 dark:text-slate-400">{consultant.responseTime}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <Link href={`/dashboard/mine_client/consultant/${consultant.id}`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Browse Mining Consultants</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Find verified experts for your mining projects</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search consultants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="experience">Sort by Experience</option>
              <option value="availability">Sort by Availability</option>
            </select>
          </div>

          {showFilters && (
            <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hourly Rate Range</label>
                  <div className="flex items-center space-x-2">
                    <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                    <span className="text-slate-500">-</span>
                    <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Min Rating</label>
                  <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Availability</label>
                  <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option value="">Any Availability</option>
                    <option value="Available">Available Now</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600 dark:text-slate-400">
              Showing {mockConsultants.length} consultants
            </p>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Updated 2 minutes ago
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
            {mockConsultants.map(consultant => (
              <ConsultantCard key={consultant.id} consultant={consultant} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
