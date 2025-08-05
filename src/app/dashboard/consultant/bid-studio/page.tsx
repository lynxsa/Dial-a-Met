'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  ArrowLeft,
  DollarSign,
  Clock,
  FileText,
  Upload,
  Star,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  Target,
  Lightbulb,
  Shield,
  Zap,
  Eye,
  Send
} from 'lucide-react'
import UniversalSidebar from '@/components/UniversalSidebar'
import { ProtectedRoute } from '@/components/AuthProvider'
import Link from 'next/link'

interface BidData {
  price: string
  timeline: string
  description: string
  valueAdds: string[]
  caseStudies: string[]
}

export default function BidCreationStudio() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bidData, setBidData] = useState<BidData>({
    price: '',
    timeline: '',
    description: '',
    valueAdds: [],
    caseStudies: []
  })

  // Mock project data
  const projectData = {
    id: 'EXP#A38F2B',
    title: 'Flotation Circuit Optimization',
    description: 'Seeking expert to optimize existing flotation circuits for improved gold recovery rates. Current recovery at 87%, targeting 92%+.',
    budget: { min: 85000, max: 120000 },
    timeline: '3-4 weeks',
    urgency: '3d',
    timeRemaining: '42h 23m',
    bidCount: 12,
    maxBids: 24,
    clientRating: 4.8,
    skillTags: ['Flotation Optimization', 'Gold Recovery', 'Process Engineering'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop'
  }

  // Industry benchmarks for smart pricing
  const industryBenchmarks = {
    averageBid: 98000,
    winningRange: { min: 92000, max: 105000 },
    timelineAverage: '3.5 weeks',
    competitorCount: 11
  }

  const valueAddOptions = [
    { id: 'fast_delivery', label: 'Fast Delivery (2 weeks)', icon: <Zap className="w-4 h-4" /> },
    { id: 'additional_review', label: 'Additional Technical Review', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'training', label: 'Staff Training Included', icon: <Users className="w-4 h-4" /> },
    { id: 'warranty', label: '6-Month Performance Warranty', icon: <Shield className="w-4 h-4" /> },
    { id: 'reporting', label: 'Monthly Progress Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'consultation', label: 'Post-Project Consultation', icon: <Lightbulb className="w-4 h-4" /> }
  ]

  const steps = [
    { number: 1, title: 'Price Proposal', icon: <DollarSign className="w-5 h-5" /> },
    { number: 2, title: 'Delivery Timeline', icon: <Clock className="w-5 h-5" /> },
    { number: 3, title: 'Value-Add Options', icon: <Star className="w-5 h-5" /> },
    { number: 4, title: 'Case Studies', icon: <Award className="w-5 h-5" /> },
    { number: 5, title: 'Preview & Submit', icon: <Eye className="w-5 h-5" /> }
  ]

  const handleValueAddToggle = (valueAddId: string) => {
    setBidData(prev => ({
      ...prev,
      valueAdds: prev.valueAdds.includes(valueAddId)
        ? prev.valueAdds.filter(id => id !== valueAddId)
        : [...prev.valueAdds, valueAddId]
    }))
  }

  const getPriceRecommendation = () => {
    const price = parseInt(bidData.price.replace(/[^0-9]/g, ''))
    if (!price) return null
    
    if (price < industryBenchmarks.winningRange.min) {
      return { type: 'low', message: 'Below winning range - consider increasing' }
    } else if (price > industryBenchmarks.winningRange.max) {
      return { type: 'high', message: 'Above typical range - ensure strong justification' }
    } else {
      return { type: 'good', message: 'Within competitive range' }
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Set Your Price</h3>
              <p className="text-slate-600">Propose your fee for this project</p>
            </div>

            {/* Smart Pricing Assistant */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Smart Pricing Assistant
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700 font-medium">Average Bid:</span>
                  <span className="ml-2 text-blue-900">R{industryBenchmarks.averageBid.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Winning Range:</span>
                  <span className="ml-2 text-blue-900">
                    R{industryBenchmarks.winningRange.min.toLocaleString()} - R{industryBenchmarks.winningRange.max.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Bid Amount (ZAR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R</span>
                <input
                  type="text"
                  value={bidData.price}
                  onChange={(e) => setBidData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="95,000"
                  className="w-full pl-8 pr-4 py-4 text-xl font-semibold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Price Recommendation */}
              {bidData.price && getPriceRecommendation() && (
                <div className={`mt-3 p-3 rounded-lg flex items-center space-x-2 ${
                  getPriceRecommendation()?.type === 'good' ? 'bg-green-50 text-green-700' :
                  getPriceRecommendation()?.type === 'low' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {getPriceRecommendation()?.type === 'good' ? 
                    <CheckCircle className="w-4 h-4" /> : 
                    <AlertCircle className="w-4 h-4" />
                  }
                  <span className="text-sm font-medium">{getPriceRecommendation()?.message}</span>
                </div>
              )}
            </div>

            {/* Bid Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Brief Description
              </label>
              <textarea
                value={bidData.description}
                onChange={(e) => setBidData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your approach and expertise for this project..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Delivery Timeline</h3>
              <p className="text-slate-600">When can you complete this project?</p>
            </div>

            {/* Timeline Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: '2 weeks', label: 'Express (2 weeks)', badge: 'Fast Track', color: 'red' },
                { value: '3 weeks', label: 'Standard (3 weeks)', badge: 'Recommended', color: 'blue' },
                { value: '4 weeks', label: 'Extended (4 weeks)', badge: 'Thorough', color: 'green' },
                { value: '6 weeks', label: 'Comprehensive (6 weeks)', badge: 'Detailed', color: 'purple' }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => setBidData(prev => ({ ...prev, timeline: option.value }))}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    bidData.timeline === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">{option.label}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      option.color === 'red' ? 'bg-red-100 text-red-700' :
                      option.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      option.color === 'green' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {option.badge}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Delivery in {option.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Timeline */}
            <div className="border-t border-slate-200 pt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Custom Timeline
              </label>
              <input
                type="text"
                placeholder="e.g., 5 weeks with weekly milestones"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Value-Add Options</h3>
              <p className="text-slate-600">What additional value can you provide?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {valueAddOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleValueAddToggle(option.id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    bidData.valueAdds.includes(option.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      bidData.valueAdds.includes(option.id) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {option.icon}
                    </div>
                    <span className="font-medium text-slate-900">{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Case Study Attachments</h3>
              <p className="text-slate-600">Upload relevant case studies (anonymized)</p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-slate-900 mb-2">Upload Case Studies</h4>
              <p className="text-slate-600 mb-4">PDF, images, or documents (max 10MB each)</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Choose Files
              </button>
            </div>

            {/* Uploaded Files */}
            {bidData.caseStudies.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Uploaded Files</h4>
                {bidData.caseStudies.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-slate-500" />
                      <span className="text-sm text-slate-700">{file}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Review Your Bid</h3>
              <p className="text-slate-600">Preview how your bid will appear to the client</p>
            </div>

            {/* Bid Preview Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Your Anonymous Bid</h4>
                  <p className="text-sm text-slate-600">Consultant EXP#JHB-7891</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">R{bidData.price}</div>
                  <div className="text-sm text-slate-600">{bidData.timeline}</div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-slate-700 mb-4">{bidData.description}</p>
                
                {bidData.valueAdds.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium text-slate-900 mb-2">Value-Added Services:</h5>
                    <div className="flex flex-wrap gap-2">
                      {bidData.valueAdds.map((addId) => {
                        const option = valueAddOptions.find(opt => opt.id === addId)
                        return (
                          <span key={addId} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                            ✓ {option?.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>5.0 ★ rating • 234 projects completed</span>
                  <span>Responds within 2 hours</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
              <div className="flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Submit Bid</span>
              </div>
            </button>
          </div>
        )

      default:
        return null
    }
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
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard/consultant/discover">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                  </Link>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Bid Creation Studio</h1>
                    <p className="text-slate-600">Create your competitive bid</p>
                  </div>
                </div>
                
                {/* Countdown Widget */}
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-red-800 font-medium">Bid expires in: {projectData.timeRemaining}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Details Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sticky top-6">
                    <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={projectData.image}
                        alt={projectData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <h3 className="font-bold text-slate-900 mb-2">{projectData.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{projectData.description}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Budget Range:</span>
                        <span className="font-medium">R{projectData.budget.min.toLocaleString()} - R{projectData.budget.max.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Timeline:</span>
                        <span className="font-medium">{projectData.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Bids:</span>
                        <span className="font-medium">{projectData.bidCount}/{projectData.maxBids}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Client Rating:</span>
                        <span className="font-medium flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          {projectData.clientRating}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <h4 className="font-medium text-slate-900 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {projectData.skillTags.map((tag, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Progress Steps */}
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
                    <div className="flex items-center justify-between">
                      {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                            currentStep >= step.number 
                              ? 'bg-blue-600 border-blue-600 text-white' 
                              : 'border-slate-300 text-slate-400'
                          }`}>
                            {step.icon}
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`w-full h-0.5 mx-4 transition-colors ${
                              currentStep > step.number ? 'bg-blue-600' : 'bg-slate-300'
                            }`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {steps.map((step) => (
                        <span key={step.number} className={`text-xs font-medium ${
                          currentStep >= step.number ? 'text-blue-600' : 'text-slate-400'
                        }`}>
                          {step.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                      <button
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {currentStep < 5 && (
                        <button
                          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Next Step
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
