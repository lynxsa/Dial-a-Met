'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Star,
  Zap,
  Tag,
  TrendingUp,
  Award,
  ChevronDown,
  Bookmark,
  Share2
} from 'lucide-react'
import UniversalSidebar from '@/components/UniversalSidebar'
import { ProtectedRoute } from '@/components/AuthProvider'

export default function ProjectDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    mineralType: [] as string[],
    expertiseLevel: [] as string[],
    budget: '',
    urgency: '',
    confidentiality: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [savedProjects, setSavedProjects] = useState<string[]>([])

  const mineralTypes = [
    'Gold & Precious Metals',
    'Coal',
    'Iron Ore & Manganese', 
    'Chrome',
    'Diamond',
    'Copper',
    'Platinum Group Metals',
    'Uranium',
    'Other Minerals'
  ]

  const expertiseLevels = [
    { level: 1, label: 'Entry Level', icon: '⭐' },
    { level: 2, label: 'Intermediate', icon: '⭐⭐' },
    { level: 3, label: 'Experienced', icon: '⭐⭐⭐' },
    { level: 4, label: 'Expert', icon: '⭐⭐⭐⭐' },
    { level: 5, label: 'Master', icon: '⭐⭐⭐⭐⭐' }
  ]

  const urgencyLevels = [
    { value: '24h', label: 'Ultra Urgent (24h)', color: 'red' },
    { value: '3d', label: 'Urgent (3 days)', color: 'orange' },
    { value: '1w', label: 'Standard (1 week)', color: 'blue' },
    { value: '1m', label: 'Flexible (1 month)', color: 'green' }
  ]

  const mockProjects = [
    {
      id: 'EXP#A38F2B',
      title: 'Flotation Circuit Optimization',
      description: 'Seeking expert to optimize existing flotation circuits for improved gold recovery rates. Current recovery at 87%, targeting 92%+.',
      mineralType: 'Gold & Precious Metals',
      location: 'Witwatersrand Basin, GP',
      budget: { min: 85000, max: 120000 },
      timeline: '3-4 weeks',
      urgency: '3d',
      confidentiality: 'CONFIDENTIAL',
      skillTags: ['Flotation Optimization', 'Gold Recovery', 'Process Engineering'],
      bidCount: 12,
      maxBids: 24,
      timeRemaining: '42h 23m',
      clientRating: 4.8,
      isHot: true,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop',
      expertiseRequired: 4
    },
    {
      id: 'EXP#B72K9M',
      title: 'Tailings Dam Safety Assessment',
      description: 'Environmental compliance review for existing tailings storage facility. Requires expertise in geotechnical engineering and environmental regulations.',
      mineralType: 'Environmental Compliance',
      location: 'Rustenburg, NW',
      budget: { min: 150000, max: 200000 },
      timeline: '6-8 weeks',
      urgency: '1w',
      confidentiality: 'HIGHLY_CONFIDENTIAL',
      skillTags: ['Tailings Management', 'Geotechnical', 'Environmental Compliance'],
      bidCount: 8,
      maxBids: 15,
      timeRemaining: '5d 12h',
      clientRating: 4.9,
      isHot: false,
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=200&fit=crop',
      expertiseRequired: 5
    },
    {
      id: 'EXP#C94P3X',
      title: 'Underground Mine Ventilation Design',
      description: 'Design new ventilation system for expanding underground coal mine. Must comply with latest safety regulations and optimize air flow.',
      mineralType: 'Coal',
      location: 'Mpumalanga',
      budget: { min: 200000, max: 300000 },
      timeline: '10-12 weeks',
      urgency: '24h',
      confidentiality: 'PUBLIC',
      skillTags: ['Mine Ventilation', 'Safety Systems', 'Underground Mining'],
      bidCount: 18,
      maxBids: 25,
      timeRemaining: '18h 45m',
      clientRating: 4.7,
      isHot: true,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      expertiseRequired: 4
    },
    {
      id: 'EXP#D56L8R',
      title: 'Chrome Ore Beneficiation Study',
      description: 'Feasibility study for chrome ore beneficiation plant. Need to evaluate different processing routes and recommend optimal configuration.',
      mineralType: 'Chrome',
      location: 'Bushveld Complex, LP',
      budget: { min: 95000, max: 140000 },
      timeline: '4-6 weeks',
      urgency: '1w',
      confidentiality: 'CONFIDENTIAL',
      skillTags: ['Beneficiation', 'Process Design', 'Feasibility Study'],
      bidCount: 6,
      maxBids: 20,
      timeRemaining: '3d 8h',
      clientRating: 4.6,
      isHot: false,
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=200&fit=crop',
      expertiseRequired: 3
    }
  ]

  const toggleSavedProject = (projectId: string) => {
    setSavedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const getUrgencyColor = (urgency: string) => {
    const urgencyMap = {
      '24h': 'text-red-600 bg-red-50 border-red-200',
      '3d': 'text-orange-600 bg-orange-50 border-orange-200',
      '1w': 'text-blue-600 bg-blue-50 border-blue-200',
      '1m': 'text-green-600 bg-green-50 border-green-200'
    }
    return urgencyMap[urgency as keyof typeof urgencyMap] || 'text-gray-600 bg-gray-50 border-gray-200'
  }

  const getProgressPercentage = (bidCount: number, maxBids: number) => {
    return (bidCount / maxBids) * 100
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
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Discover Projects</h1>
                  <p className="text-slate-600">Find your next mining consultancy opportunity</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-500">
                    {mockProjects.length} active projects
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Bid Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white border-b border-slate-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by keywords, skills, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-700">Filters</span>
                <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Mineral Type Filter */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Mineral Type</h4>
                    <div className="space-y-2">
                      {mineralTypes.slice(0, 5).map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedFilters.mineralType.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters(prev => ({
                                  ...prev,
                                  mineralType: [...prev.mineralType, type]
                                }))
                              } else {
                                setSelectedFilters(prev => ({
                                  ...prev,
                                  mineralType: prev.mineralType.filter(t => t !== type)
                                }))
                              }
                            }}
                          />
                          <span className="text-sm text-slate-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Expertise Level Filter */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Expertise Level</h4>
                    <div className="space-y-2">
                      {expertiseLevels.map((level) => (
                        <label key={level.level} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700">{level.icon} {level.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range Filter */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Budget Range (R)</h4>
                    <div className="space-y-2">
                      {[
                        'Under R50,000',
                        'R50,000 - R100,000',
                        'R100,000 - R200,000',
                        'R200,000 - R500,000',
                        'R500,000+'
                      ].map((range) => (
                        <label key={range} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="budget"
                            className="border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Urgency Filter */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Urgency</h4>
                    <div className="space-y-2">
                      {urgencyLevels.map((urgency) => (
                        <label key={urgency.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="urgency"
                            className="border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700">{urgency.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200">
                  <button className="text-slate-600 hover:text-slate-900 font-medium">
                    Clear All Filters
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Projects Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              {mockProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Project Image */}
                    <div className="lg:w-80 h-48 lg:h-auto relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Project ID Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {project.id}
                        </span>
                      </div>

                      {/* Hot Project Badge */}
                      {project.isHot && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>HOT</span>
                          </span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute bottom-4 right-4 flex space-x-2">
                        <button
                          onClick={() => toggleSavedProject(project.id)}
                          className={`p-2 rounded-full transition-colors ${
                            savedProjects.includes(project.id)
                              ? 'bg-blue-600 text-white'
                              : 'bg-white/90 text-slate-600 hover:bg-white'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/90 hover:bg-white text-slate-600 rounded-full transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">{project.description}</p>
                          </div>
                        </div>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skillTags.map((tag, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                              <Tag className="inline-block w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Project Meta */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">
                              R{project.budget.min.toLocaleString()} - R{project.budget.max.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">{project.timeline}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-slate-600">Client: {project.clientRating}★</span>
                          </div>
                        </div>

                        {/* Urgency and Expertise Required */}
                        <div className="flex items-center space-x-4 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(project.urgency)}`}>
                            <Clock className="inline-block w-3 h-3 mr-1" />
                            {urgencyLevels.find(u => u.value === project.urgency)?.label}
                          </span>
                          <span className="flex items-center space-x-1 text-sm text-slate-600">
                            <Award className="w-4 h-4" />
                            <span>Level {project.expertiseRequired} Required</span>
                          </span>
                        </div>

                        {/* Bidding Progress */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-slate-500" />
                              <span className="text-sm text-slate-600">
                                {project.bidCount}/{project.maxBids} bids
                              </span>
                            </div>
                            <span className="text-sm font-medium text-red-600">
                              {project.timeRemaining} remaining
                            </span>
                          </div>
                          
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(project.bidCount, project.maxBids)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto">
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                            <div className="flex items-center justify-center space-x-2">
                              <TrendingUp className="w-5 h-5" />
                              <span>Place Bid</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium transition-colors">
                Load More Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
