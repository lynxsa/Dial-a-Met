'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Pickaxe, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Image as ImageIcon, 
  File,
  Globe,
  Lock,
  Eye,
  DollarSign,
  Calendar,
  MapPin,
  AlertCircle
} from 'lucide-react'

interface FormData {
  title: string
  description: string
  problemType: string
  mineralType: string
  location: string
  budget: string
  timeline: string
  confidentiality: string
  broadcastToSocial: boolean
  socialPlatforms: string[]
  geologicalData: {
    oreType: string
    grade: string
    tonnage: string
    recoveryRate: string
  }
  attachments: File[]
}

const problemTypes = [
  'Process Optimization',
  'Equipment Selection',
  'Recovery Analysis',
  'Feasibility Study',
  'Environmental Compliance',
  'Cost Reduction',
  'Quality Control',
  'Safety Assessment',
  'Technology Upgrade',
  'Other'
]

const mineralTypes = [
  'Gold', 'Silver', 'Copper', 'Iron Ore', 'Coal', 'Platinum', 'Zinc', 'Lead', 
  'Nickel', 'Aluminum', 'Lithium', 'Rare Earth Elements', 'Uranium', 'Other'
]

const confidentialityLevels = [
  { value: 'PUBLIC', label: 'Public', description: 'Visible to all experts and social media' },
  { value: 'CONFIDENTIAL', label: 'Confidential', description: 'Visible only to verified experts' },
  { value: 'HIGHLY_CONFIDENTIAL', label: 'Highly Confidential', description: 'Invitation-only access' }
]

export default function NewRequestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    problemType: '',
    mineralType: '',
    location: '',
    budget: '',
    timeline: '',
    confidentiality: 'CONFIDENTIAL',
    broadcastToSocial: false,
    socialPlatforms: [],
    geologicalData: {
      oreType: '',
      grade: '',
      tonnage: '',
      recoveryRate: ''
    },
    attachments: []
  })

  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGeologicalDataChange = (field: keyof FormData['geologicalData'], value: string) => {
    setFormData(prev => ({
      ...prev,
      geologicalData: { ...prev.geologicalData, [field]: value }
    }))
  }

  const handleFileUpload = (files: FileList | File[]) => {
    const newFiles = Array.from(files).filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.ms-excel']
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024 // 50MB limit
    })
    
    setFormData(prev => ({ 
      ...prev, 
      attachments: [...prev.attachments, ...newFiles].slice(0, 10) // Max 10 files
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // For now, we'll handle file uploads separately
          // In a real app, you'd upload files to cloud storage first
          attachmentUrls: formData.attachments.map(file => file.name)
        }),
      })

      if (response.ok) {
        const result = await response.json()
        // Redirect to request details or dashboard
        window.location.href = `/dashboard/client/requests/${result.request.id}`
      } else {
        const error = await response.json()
        console.error('Error submitting request:', error)
        // Show error message to user
        alert('Error submitting request. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Error submitting request. Please try again.')
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.includes('image')) return <ImageIcon className="h-5 w-5" />
    if (file.type.includes('pdf')) return <FileText className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard/client">
                <Pickaxe className="h-8 w-8 text-blue-600 hover:text-blue-700 cursor-pointer" />
              </Link>
              <span className="text-xl font-bold text-slate-900">New Project Request</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/client">
                <button className="text-slate-600 hover:text-slate-900 px-4 py-2">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step ? 'bg-orange-600' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 text-center text-sm">
            <div className={currentStep >= 1 ? 'text-orange-400' : 'text-slate-400'}>Project Details</div>
            <div className={currentStep >= 2 ? 'text-orange-400' : 'text-slate-400'}>Technical Data</div>
            <div className={currentStep >= 3 ? 'text-orange-400' : 'text-slate-400'}>Files & Privacy</div>
            <div className={currentStep >= 4 ? 'text-orange-400' : 'text-slate-400'}>Review & Submit</div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur-sm">
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Project Details</h2>
                <p className="text-slate-400">Tell us about your mining challenge</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Gold Recovery Optimization for Sulfide Ores"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Describe your challenge, current processes, expected outcomes, and any specific requirements..."
                />
                <p className="text-xs text-slate-400 mt-1">Be specific to attract the right experts</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Problem Type *
                  </label>
                  <select
                    required
                    value={formData.problemType}
                    onChange={(e) => handleInputChange('problemType', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select problem type</option>
                    {problemTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mineral Type *
                  </label>
                  <select
                    required
                    value={formData.mineralType}
                    onChange={(e) => handleInputChange('mineralType', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select mineral</option>
                    {mineralTypes.map(mineral => (
                      <option key={mineral} value={mineral}>{mineral}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Budget (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="15000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="3-4 weeks">3-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Technical Data */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Technical Information</h2>
                <p className="text-slate-400">Provide geological and operational data</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Ore Type
                  </label>
                  <input
                    type="text"
                    value={formData.geologicalData.oreType}
                    onChange={(e) => handleGeologicalDataChange('oreType', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Sulfide, Oxide, Mixed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Grade (%)
                  </label>
                  <input
                    type="text"
                    value={formData.geologicalData.grade}
                    onChange={(e) => handleGeologicalDataChange('grade', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 2.5% Au"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tonnage (per day/month)
                  </label>
                  <input
                    type="text"
                    value={formData.geologicalData.tonnage}
                    onChange={(e) => handleGeologicalDataChange('tonnage', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 1000 tpd"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Current Recovery Rate (%)
                  </label>
                  <input
                    type="text"
                    value={formData.geologicalData.recoveryRate}
                    onChange={(e) => handleGeologicalDataChange('recoveryRate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 85%"
                  />
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Data Privacy</h4>
                    <p className="text-slate-300 text-sm">
                      All technical data is encrypted and only shared with verified experts who sign NDAs. 
                      You can control access levels in the next step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Files & Privacy */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Files & Privacy Settings</h2>
                <p className="text-slate-400">Upload supporting documents and set access controls</p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Supporting Documents
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 mb-2">Drop files here or click to upload</p>
                  <p className="text-sm text-slate-400 mb-4">
                    Supports: PDF, Images, CSV, Excel • Max 50MB per file • Up to 10 files
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.csv,.xls,.xlsx"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors"
                  >
                    Choose Files
                  </label>
                </div>

                {/* Uploaded Files */}
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="text-white text-sm">{file.name}</p>
                            <p className="text-slate-400 text-xs">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Privacy Settings */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  Privacy & Access Level *
                </label>
                <div className="space-y-3">
                  {confidentialityLevels.map((level) => (
                    <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="confidentiality"
                        value={level.value}
                        checked={formData.confidentiality === level.value}
                        onChange={(e) => handleInputChange('confidentiality', e.target.value)}
                        className="mt-1 text-orange-600 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {level.value === 'PUBLIC' && <Globe className="h-4 w-4 text-green-400" />}
                          {level.value === 'CONFIDENTIAL' && <Eye className="h-4 w-4 text-orange-400" />}
                          {level.value === 'HIGHLY_CONFIDENTIAL' && <Lock className="h-4 w-4 text-red-400" />}
                          <span className="text-white font-medium">{level.label}</span>
                        </div>
                        <p className="text-sm text-slate-400">{level.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Social Media Broadcasting */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.broadcastToSocial}
                    onChange={(e) => handleInputChange('broadcastToSocial', e.target.checked)}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <div>
                    <span className="text-white font-medium">Broadcast to Social Media</span>
                    <p className="text-sm text-slate-400">
                      Share your request on LinkedIn and Twitter to reach more experts
                    </p>
                  </div>
                </label>

                {formData.broadcastToSocial && (
                  <div className="mt-4 ml-6 space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.socialPlatforms.includes('linkedin')}
                        onChange={(e) => {
                          const platforms = e.target.checked 
                            ? [...formData.socialPlatforms, 'linkedin']
                            : formData.socialPlatforms.filter(p => p !== 'linkedin')
                          handleInputChange('socialPlatforms', platforms)
                        }}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-300">LinkedIn</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.socialPlatforms.includes('twitter')}
                        onChange={(e) => {
                          const platforms = e.target.checked 
                            ? [...formData.socialPlatforms, 'twitter']
                            : formData.socialPlatforms.filter(p => p !== 'twitter')
                          handleInputChange('socialPlatforms', platforms)
                        }}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-300">Twitter</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Review Your Request</h2>
                <p className="text-slate-400">Please review all details before submitting</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Project Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-400">Title:</span> <span className="text-white">{formData.title}</span></div>
                    <div><span className="text-slate-400">Problem Type:</span> <span className="text-white">{formData.problemType}</span></div>
                    <div><span className="text-slate-400">Mineral:</span> <span className="text-white">{formData.mineralType}</span></div>
                    <div><span className="text-slate-400">Location:</span> <span className="text-white">{formData.location}</span></div>
                    <div><span className="text-slate-400">Budget:</span> <span className="text-white">${formData.budget}</span></div>
                    <div><span className="text-slate-400">Timeline:</span> <span className="text-white">{formData.timeline}</span></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Description</h4>
                  <p className="text-slate-300 text-sm">{formData.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Privacy Settings</h4>
                  <div className="flex items-center space-x-2">
                    {formData.confidentiality === 'PUBLIC' && <Globe className="h-4 w-4 text-green-400" />}
                    {formData.confidentiality === 'CONFIDENTIAL' && <Eye className="h-4 w-4 text-orange-400" />}
                    {formData.confidentiality === 'HIGHLY_CONFIDENTIAL' && <Lock className="h-4 w-4 text-red-400" />}
                    <span className="text-white text-sm">
                      {confidentialityLevels.find(l => l.value === formData.confidentiality)?.label}
                    </span>
                  </div>
                </div>

                {formData.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-white mb-2">Attachments ({formData.attachments.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.attachments.map((file, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs">
                          {file.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-medium mb-2">What happens next?</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• AI will match your project with top 3 experts within 2 hours</li>
                  <li>• Experts will submit anonymous bids within 48 hours</li>
                  <li>• You&apos;ll receive real-time notifications about new bids</li>
                  <li>• Choose the best expert based on merit and value</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-600">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>Submit Request</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
