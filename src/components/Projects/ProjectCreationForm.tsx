'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Users,
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

interface ProjectFormData {
  title: string
  category: string
  mineral: string
  location: {
    province: string
    city: string
    coordinates?: { lat: number; lng: number }
  }
  budget: {
    min: number
    max: number
    currency: 'ZAR'
  }
  timeline: {
    duration: number
    unit: 'days' | 'weeks' | 'months'
    urgency: 'low' | 'medium' | 'high'
  }
  requirements: {
    expertise: string[]
    certifications: string[]
    experience: number
  }
  description: string
  attachments: File[]
  biddingSetup: {
    duration: number // hours
    maxBidders: number
    anonymousMode: boolean
    autoShortlist: boolean
  }
}

const SOUTH_AFRICAN_PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape'
]

const MINING_CATEGORIES = [
  'Exploration & Surveying',
  'Extraction & Mining',
  'Mineral Processing',
  'Metallurgy & Smelting',
  'Environmental Compliance',
  'Mine Safety & Engineering',
  'Geological Analysis',
  'Resource Evaluation',
  'Mine Planning & Design',
  'Rehabilitation & Closure'
]

const MINERAL_TYPES = [
  'Gold',
  'Platinum',
  'Palladium',
  'Coal',
  'Iron Ore',
  'Copper',
  'Diamonds',
  'Chrome',
  'Manganese',
  'Uranium',
  'Vanadium',
  'Titanium',
  'Zinc',
  'Lead',
  'Other'
]

const EXPERTISE_AREAS = [
  'Geological Engineering',
  'Mining Engineering',
  'Metallurgical Engineering',
  'Environmental Engineering',
  'Chemical Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Process Engineering',
  'Safety Engineering',
  'Survey Engineering',
  'Geotechnical Engineering',
  'Hydrogeology'
]

export default function ProjectCreationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category: '',
    mineral: '',
    location: { province: '', city: '' },
    budget: { min: 0, max: 0, currency: 'ZAR' },
    timeline: { duration: 0, unit: 'days', urgency: 'medium' },
    requirements: { expertise: [], certifications: [], experience: 0 },
    description: '',
    attachments: [],
    biddingSetup: {
      duration: 72,
      maxBidders: 10,
      anonymousMode: true,
      autoShortlist: true
    }
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({})

  const steps = [
    { number: 1, title: 'Project Details', icon: FileText },
    { number: 2, title: 'Technical Specifications', icon: Target },
    { number: 3, title: 'Bidding Setup', icon: Users },
    { number: 4, title: 'Review & Submit', icon: CheckCircle2 }
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof ProjectFormData, string>> = {}

    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = 'Project title is required'
        if (!formData.category) newErrors.category = 'Category is required'
        if (!formData.mineral) newErrors.mineral = 'Mineral type is required'
        if (!formData.location.province) newErrors.location = 'Province is required'
        break
      case 2:
        if (formData.budget.min <= 0) newErrors.budget = 'Minimum budget is required'
        if (formData.budget.max <= formData.budget.min) newErrors.budget = 'Maximum budget must be greater than minimum'
        if (formData.timeline.duration <= 0) newErrors.timeline = 'Timeline duration is required'
        if (formData.requirements.expertise.length === 0) newErrors.requirements = 'At least one expertise area is required'
        break
      case 3:
        if (formData.biddingSetup.duration < 24) newErrors.biddingSetup = 'Minimum bidding duration is 24 hours'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(4, prev + 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Submitting project:', formData)
      // Here you would submit to your API
      alert('Project submitted successfully!')
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                placeholder="e.g., Gold Recovery Optimization - Witwatersrand Basin"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Select category</option>
                  {MINING_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mineral Type *
                </label>
                <select
                  value={formData.mineral}
                  onChange={(e) => setFormData({...formData, mineral: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Select mineral</option>
                  {MINERAL_TYPES.map(mineral => (
                    <option key={mineral} value={mineral}>{mineral}</option>
                  ))}
                </select>
                {errors.mineral && <p className="text-red-500 text-sm mt-1">{errors.mineral}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Province *
                </label>
                <select
                  value={formData.location.province}
                  onChange={(e) => setFormData({
                    ...formData, 
                    location: {...formData.location, province: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Select province</option>
                  {SOUTH_AFRICAN_PROVINCES.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  City/Area
                </label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData, 
                    location: {...formData.location, city: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  placeholder="e.g., Johannesburg, Rustenburg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Project Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                placeholder="Describe your mining project requirements, objectives, and scope..."
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Budget & Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Minimum Budget (ZAR) *
                  </label>
                  <input
                    type="number"
                    value={formData.budget.min}
                    onChange={(e) => setFormData({
                      ...formData, 
                      budget: {...formData.budget, min: Number(e.target.value)}
                    })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Maximum Budget (ZAR) *
                  </label>
                  <input
                    type="number"
                    value={formData.budget.max}
                    onChange={(e) => setFormData({
                      ...formData, 
                      budget: {...formData.budget, max: Number(e.target.value)}
                    })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                    placeholder="200000"
                  />
                </div>
              </div>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
              
              {formData.budget.min > 0 && formData.budget.max > 0 && (
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Budget Range: {formatCurrency(formData.budget.min)} - {formatCurrency(formData.budget.max)}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Required Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {EXPERTISE_AREAS.map(expertise => (
                  <label key={expertise} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requirements.expertise.includes(expertise)}
                      onChange={(e) => {
                        const newExpertise = e.target.checked
                          ? [...formData.requirements.expertise, expertise]
                          : formData.requirements.expertise.filter(exp => exp !== expertise)
                        setFormData({
                          ...formData,
                          requirements: {...formData.requirements, expertise: newExpertise}
                        })
                      }}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{expertise}</span>
                  </label>
                ))}
              </div>
              {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Minimum Experience Required (years)
              </label>
              <input
                type="number"
                value={formData.requirements.experience}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: {...formData.requirements, experience: Number(e.target.value)}
                })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                min="0"
                max="50"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Bidding Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Bidding Duration (hours) *
                  </label>
                  <select
                    value={formData.biddingSetup.duration}
                    onChange={(e) => setFormData({
                      ...formData,
                      biddingSetup: {...formData.biddingSetup, duration: Number(e.target.value)}
                    })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value={24}>24 hours</option>
                    <option value={48}>48 hours</option>
                    <option value={72}>72 hours (Recommended)</option>
                    <option value={96}>96 hours</option>
                    <option value={168}>1 week</option>
                  </select>
                  {errors.biddingSetup && <p className="text-red-500 text-sm mt-1">{errors.biddingSetup}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Maximum Bidders
                  </label>
                  <input
                    type="number"
                    value={formData.biddingSetup.maxBidders}
                    onChange={(e) => setFormData({
                      ...formData,
                      biddingSetup: {...formData.biddingSetup, maxBidders: Number(e.target.value)}
                    })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                    min="3"
                    max="20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.biddingSetup.anonymousMode}
                  onChange={(e) => setFormData({
                    ...formData,
                    biddingSetup: {...formData.biddingSetup, anonymousMode: e.target.checked}
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="anonymous" className="text-sm text-slate-700 dark:text-slate-300">
                  Anonymous bidding (Recommended for unbiased selection)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoShortlist"
                  checked={formData.biddingSetup.autoShortlist}
                  onChange={(e) => setFormData({
                    ...formData,
                    biddingSetup: {...formData.biddingSetup, autoShortlist: e.target.checked}
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="autoShortlist" className="text-sm text-slate-700 dark:text-slate-300">
                  Auto-shortlist top 3 bids for final review
                </label>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Bidding Process Overview
                  </h4>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                    <li>• AI matches qualified consultants to your project</li>
                    <li>• {formData.biddingSetup.duration} hour competitive bidding period</li>
                    <li>• Real-time bid tracking and position updates</li>
                    <li>• {formData.biddingSetup.anonymousMode ? 'Anonymous' : 'Open'} consultant profiles during bidding</li>
                    <li>• Final selection and contract award</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Project Summary
            </h3>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">Project Details</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Title:</strong> {formData.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Category:</strong> {formData.category}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Mineral:</strong> {formData.mineral}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Location:</strong> {formData.location.city ? `${formData.location.city}, ` : ''}{formData.location.province}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">Budget & Requirements</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Budget:</strong> {formatCurrency(formData.budget.min)} - {formatCurrency(formData.budget.max)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Experience:</strong> {formData.requirements.experience}+ years
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Expertise:</strong> {formData.requirements.expertise.length} areas
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Bidding Setup</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{formData.biddingSetup.duration} hours</Badge>
                  <Badge variant="outline">Max {formData.biddingSetup.maxBidders} bidders</Badge>
                  {formData.biddingSetup.anonymousMode && <Badge variant="outline">Anonymous</Badge>}
                  {formData.biddingSetup.autoShortlist && <Badge variant="outline">Auto-shortlist</Badge>}
                </div>
              </div>

              {formData.requirements.expertise.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">Required Expertise</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.requirements.expertise.map(exp => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="text-sm font-medium text-green-900 dark:text-green-100">
                    Ready to Launch
                  </h4>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Your project will go live immediately and qualified consultants will be notified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : isCompleted 
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive || isCompleted 
                        ? 'text-slate-900 dark:text-white' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Create New Mining Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep} className="flex items-center">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex items-center bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Submit Project
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
