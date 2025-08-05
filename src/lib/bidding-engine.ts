/**
 * Unified Bidding System Architecture
 * Senior Architect Pattern: Centralized bidding logic with composable components
 */

export interface Bid {
  id: string
  anonymousId: string
  projectId: string
  consultantId: string
  price: number
  timeline: string
  description: string
  valueAdds: string[]
  caseStudies: CaseStudy[]
  submittedAt: Date
  updatedAt: Date
  status: BidStatus
  rank: number
  confidence: number
  skillHighlights: string[]
  attachments: BidAttachment[]
}

export interface CaseStudy {
  id: string
  title: string
  description: string
  outcome: string
  industry: string
  imageUrl?: string
  tags: string[]
}

export interface BidAttachment {
  id: string
  name: string
  url: string
  type: 'document' | 'image' | 'video' | 'other'
  size: number
  uploadedAt: Date
}

export interface Project {
  id: string
  title: string
  description: string
  budget: {
    min: number
    max: number
    currency: string
  }
  timeline: string
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: ProjectStatus
  clientId: string
  skillsRequired: string[]
  bids: Bid[]
  createdAt: Date
  deadline: Date
  maxBids: number
}

export type BidStatus = 
  | 'DRAFT'
  | 'SUBMITTED' 
  | 'UNDER_REVIEW'
  | 'LEADING'
  | 'OUTBID'
  | 'WITHDRAWN'
  | 'ACCEPTED'
  | 'REJECTED'

export type ProjectStatus = 
  | 'OPEN'
  | 'IN_REVIEW'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export interface BidUpdate {
  type: 'NEW_BID' | 'BID_UPDATE' | 'BID_WITHDRAWN' | 'RANKING_CHANGE'
  bid: Bid
  project: Project
  timestamp: Date
}

// Bidding Engine Core Logic
export class BiddingEngine {
  private static instance: BiddingEngine
  private websocket: WebSocket | null = null
  private subscribers: Map<string, Set<(data: BidUpdate) => void>> = new Map()

  static getInstance(): BiddingEngine {
    if (!BiddingEngine.instance) {
      BiddingEngine.instance = new BiddingEngine()
    }
    return BiddingEngine.instance
  }

  // Real-time bid monitoring
  subscribeToProject(projectId: string, callback: (data: BidUpdate) => void): () => void {
    if (!this.subscribers.has(projectId)) {
      this.subscribers.set(projectId, new Set())
    }
    
    this.subscribers.get(projectId)!.add(callback)
    
    // Return unsubscribe function
    return () => {
      const projectSubscribers = this.subscribers.get(projectId)
      if (projectSubscribers) {
        projectSubscribers.delete(callback)
        if (projectSubscribers.size === 0) {
          this.subscribers.delete(projectId)
        }
      }
    }
  }

  // Calculate bid ranking
  calculateBidRank(bid: Bid, project: Project): number {
    const priceScore = this.calculatePriceScore(bid.price, project.budget)
    const timelineScore = this.calculateTimelineScore(bid.timeline, project.timeline)
    const valueScore = this.calculateValueScore(bid.valueAdds, bid.caseStudies)
    
    // Weighted scoring system
    return (priceScore * 0.4) + (timelineScore * 0.3) + (valueScore * 0.3)
  }

  private calculatePriceScore(bidPrice: number, budget: { min: number; max: number }): number {
    const midpoint = (budget.min + budget.max) / 2
    const range = budget.max - budget.min
    
    if (bidPrice <= budget.min) return 1
    if (bidPrice >= budget.max) return 0.1
    
    // Linear interpolation with preference for lower prices
    const distance = Math.abs(bidPrice - midpoint) / range
    return Math.max(0.1, 1 - distance)
  }

  private calculateTimelineScore(bidTimeline: string, projectTimeline: string): number {
    // Parse timeline strings (e.g., "3 weeks", "2 months")
    const bidWeeks = this.parseTimelineToWeeks(bidTimeline)
    const projectWeeks = this.parseTimelineToWeeks(projectTimeline)
    
    if (bidWeeks <= projectWeeks) return 1
    
    // Penalty for exceeding timeline
    const excess = (bidWeeks - projectWeeks) / projectWeeks
    return Math.max(0.1, 1 - excess)
  }

  private calculateValueScore(valueAdds: string[], caseStudies: CaseStudy[]): number {
    const valueAddScore = Math.min(1, valueAdds.length * 0.15) // Cap at 100%
    const caseStudyScore = Math.min(1, caseStudies.length * 0.25) // Up to 4 studies for full score
    
    return (valueAddScore + caseStudyScore) / 2
  }

  private parseTimelineToWeeks(timeline: string): number {
    const match = timeline.match(/(\d+(?:\.\d+)?)\s*(week|month|day)s?/i)
    if (!match) return 0
    
    const value = parseFloat(match[1])
    const unit = match[2].toLowerCase()
    
    switch (unit) {
      case 'day': return value / 7
      case 'week': return value
      case 'month': return value * 4.33
      default: return value
    }
  }

  // Bid validation
  validateBid(bid: Partial<Bid>, project: Project): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!bid.price || bid.price <= 0) {
      errors.push('Price must be greater than 0')
    }

    if (bid.price && (bid.price < project.budget.min || bid.price > project.budget.max)) {
      errors.push(`Price must be between ${project.budget.min} and ${project.budget.max}`)
    }

    if (!bid.timeline) {
      errors.push('Timeline is required')
    }

    if (!bid.description || bid.description.length < 50) {
      errors.push('Description must be at least 50 characters')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Anonymous ID generation
  generateAnonymousId(consultantId: string, projectId: string): string {
    // Create deterministic but anonymous ID
    const expertise = this.getConsultantExpertise(consultantId)
    const hash = this.simpleHash(consultantId + projectId)
    
    return `EXPERT-${expertise}-${hash.toString().slice(-4)}`
  }

  private getConsultantExpertise(consultantId: string): string {
    // This would come from consultant profile in real implementation
    const expertiseMap: Record<string, string> = {
      '1': 'MT', // Mining Technology
      '2': 'GE', // Geological Engineering
      '3': 'PO', // Process Optimization
      '4': 'FL', // Flotation
      '5': 'SA', // Safety Analysis
    }
    
    return expertiseMap[consultantId] || 'GE'
  }

  private simpleHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }
}

// React Hooks for Bidding
export interface UseBiddingOptions {
  projectId: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export interface BiddingState {
  bids: Bid[]
  project: Project | null
  isLoading: boolean
  error: string | null
  userBid: Bid | null
  leadingBid: Bid | null
  timeRemaining: string
  canBid: boolean
}

// Mock data for development
export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    title: 'Flotation Circuit Optimization',
    description: 'Optimize existing flotation circuits for improved gold recovery rates. Current recovery at 87%, targeting 92%+.',
    budget: { min: 85000, max: 120000, currency: 'USD' },
    timeline: '3-4 weeks',
    urgency: 'HIGH',
    status: 'OPEN',
    clientId: 'client-001',
    skillsRequired: ['Flotation Optimization', 'Gold Recovery', 'Process Engineering'],
    bids: [],
    createdAt: new Date('2025-01-15'),
    deadline: new Date('2025-02-15'),
    maxBids: 24
  },
  {
    id: 'proj-002',
    title: 'Mine Safety Assessment',
    description: 'Comprehensive safety audit of underground mining operations including risk assessment and compliance review.',
    budget: { min: 45000, max: 75000, currency: 'USD' },
    timeline: '2-3 weeks',
    urgency: 'CRITICAL',
    status: 'OPEN',
    clientId: 'client-002',
    skillsRequired: ['Mine Safety', 'Risk Assessment', 'Compliance'],
    bids: [],
    createdAt: new Date('2025-01-10'),
    deadline: new Date('2025-02-01'),
    maxBids: 15
  }
]

export const mockBids: Bid[] = [
  {
    id: 'bid-001',
    anonymousId: 'EXPERT-MT-4521',
    projectId: 'proj-001',
    consultantId: 'consultant-001',
    price: 95000,
    timeline: '3 weeks',
    description: 'Comprehensive flotation optimization with advanced modeling techniques...',
    valueAdds: ['24/7 Support', 'Performance Guarantee', 'Training Included'],
    caseStudies: [],
    submittedAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-16'),
    status: 'LEADING',
    rank: 1,
    confidence: 0.92,
    skillHighlights: ['Gold Processing', 'Flotation Design', 'Recovery Optimization'],
    attachments: []
  }
]
