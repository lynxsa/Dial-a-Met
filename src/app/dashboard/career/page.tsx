'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { 
  Clock, 
  Target, 
  DollarSign, 
  BarChart3, 
  Eye,
  Search,
  MapPin,
  Users2,
  Briefcase,
  Building,
  CheckCircle
} from 'lucide-react'

// Mock data for job seeker
const mockJobs = [
  {
    id: '1',
    title: 'Senior Mining Engineer',
    company: 'Goldcorp Mining Ltd.',
    location: 'Perth, Australia',
    salary: '150,000 - 180,000',
    type: 'Full-time',
    experience: '5+ years',
    postedDate: '2025-01-15',
    description: 'Leading mining operations and implementing innovative extraction technologies.',
    skills: ['Mine Planning', 'AutoCAD', 'Geostatistics', 'Safety Management'],
    matchScore: 95,
    status: 'Applied'
  },
  {
    id: '2',
    title: 'Metallurgical Engineer',
    company: 'Anglo American',
    location: 'Johannesburg, South Africa',
    salary: '120,000 - 140,000',
    type: 'Full-time',
    experience: '3+ years',
    postedDate: '2025-01-12',
    description: 'Process optimization and mineral processing plant management.',
    skills: ['Metallurgy', 'Process Design', 'Python', 'Six Sigma'],
    matchScore: 88,
    status: 'Interview'
  },
  {
    id: '3',
    title: 'Geological Consultant',
    company: 'Rio Tinto',
    location: 'Remote',
    salary: '80,000 - 100,000',
    type: 'Contract',
    experience: '7+ years',
    postedDate: '2025-01-10',
    description: 'Resource estimation and geological modeling for exploration projects.',
    skills: ['Geology', 'GIS', 'Resource Modeling', 'Field Work'],
    matchScore: 82,
    status: 'New'
  }
]

const mockProfile = {
  name: 'Michael Chen',
  title: 'Mining Engineer',
  experience: '8 years',
  location: 'Toronto, Canada',
  skills: ['Mine Planning', 'Metallurgy', 'Safety Management', 'AutoCAD', 'Python'],
  education: 'MSc Mining Engineering, University of Toronto',
  certifications: ['PEng', 'CIM Member', 'Safety Leadership Certificate']
}

const mockStats = {
  applicationsSubmitted: 15,
  interviewsScheduled: 4,
  profileViews: 89,
  skillMatchRate: 92,
  responseRate: 68,
  avgSalaryTarget: 145000
}

export default function CareerDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All Types')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Interview':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'New':
        return 'bg-slate-100 text-slate-700 border-slate-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-orange-600'
    return 'text-slate-600'
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Profile Summary */}
        <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Career Profile</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">MC</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{mockProfile.name}</h3>
                  <p className="text-blue-600 font-semibold">{mockProfile.title}</p>
                  <p className="text-slate-600">{mockProfile.experience} • {mockProfile.location}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Education</h4>
                  <p className="text-slate-600">{mockProfile.education}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.certifications.map((cert, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Career Insights</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-900 font-semibold">Profile Strength</div>
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-blue-700">Above industry average</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-900 font-semibold">Skill Match Rate</div>
                  <div className="text-2xl font-bold text-green-600">{mockStats.skillMatchRate}%</div>
                  <div className="text-sm text-green-700">High compatibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Applications</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.applicationsSubmitted}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Users2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Interviews</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.interviewsScheduled}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Profile Views</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.profileViews}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Response Rate</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.responseRate}%</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-cyan-100 rounded-full">
                <Target className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Match Rate</div>
            <div className="text-2xl font-bold text-slate-900">{mockStats.skillMatchRate}%</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-emerald-100 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600 mb-1">Target Salary</div>
            <div className="text-xl font-bold text-slate-900">${mockStats.avgSalaryTarget.toLocaleString()}</div>
          </div>
        </div>

        {/* AI-Matched Job Opportunities */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-xl font-bold text-slate-900">AI-Matched Opportunities</h2>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All Types">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {mockJobs.map((job) => (
              <div key={job.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <div className={`text-sm font-bold ${getMatchColor(job.matchScore)}`}>
                        {job.matchScore}% Match
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center text-slate-600">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Salary Range</div>
                      <div className="text-lg font-bold text-slate-900">${job.salary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Experience</div>
                      <div className="text-sm font-semibold text-slate-700">{job.experience}</div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
