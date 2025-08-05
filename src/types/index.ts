import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    role: string
  }

  interface Session {
    user: {
      id: string
      role: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export interface FormData {
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

export interface Request {
  id: string
  title: string
  description: string
  problemType: string
  mineralType: string
  location: string
  budget?: number
  timeline?: string
  confidentiality: string
  status: string
  createdAt: string
  updatedAt: string
  aiMatchingScore: number
  clientId: string
  broadcastToSocial: boolean
  socialPlatforms: string[]
  geologicalData: {
    oreType: string
    grade: string
    tonnage: string
    recoveryRate: string
  }
  attachmentUrls: string[]
  bids: Bid[]
  _count: {
    bids: number
  }
}

export interface Bid {
  id: string
  amount: number
  status: string
  createdAt: string
  updatedAt: string
  consultantId: string
  requestId: string
  proposal: string
  timeline: string
  deliverables: string[]
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'MINE_CLIENT' | 'CONSULTANT' | 'JOB_SEEKER' | 'TRAINER' | 'ADMIN'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ConsultantProfile {
  id: string
  userId: string
  anonymousId: string
  specializations: string[]
  experience: number
  successRate: number
  certifications: string[]
  rating: number
  completedProjects: number
  isVerified: boolean
}

export interface Project {
  id: string
  requestId: string
  consultantId: string
  clientId: string
  status: string
  startDate: string
  endDate?: string
  budget: number
  deliverables: string[]
  milestones: {
    id: string
    title: string
    description: string
    dueDate: string
    status: string
    amount: number
  }[]
}
