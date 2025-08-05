import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function generateAnonymousId(): string {
  const prefixes = ['MT', 'GE', 'PO', 'FL', 'EP', 'MC', 'HS', 'DR', 'PX', 'VM']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const number = Math.floor(Math.random() * 9000) + 1000
  return `EXPERT-${prefix}-${number}`
}

export function calculateMatchScore(
  consultantSkills: string[],
  requestSkills: string[],
  consultantExperience: number,
  requestComplexity: number
): number {
  // Skill matching (60% weight)
  const skillMatch = consultantSkills.filter(skill => 
    requestSkills.some(reqSkill => 
      skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
      reqSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ).length / requestSkills.length

  // Experience matching (40% weight)
  const experienceMatch = Math.min(consultantExperience / (requestComplexity * 2), 1)

  return Math.round((skillMatch * 0.6 + experienceMatch * 0.4) * 100)
}

export function getTimeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  
  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365

  if (diffInMs < minute) {
    return 'just now'
  } else if (diffInMs < hour) {
    const minutes = Math.floor(diffInMs / minute)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInMs < day) {
    const hours = Math.floor(diffInMs / hour)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInMs < week) {
    const days = Math.floor(diffInMs / day)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (diffInMs < month) {
    const weeks = Math.floor(diffInMs / week)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else if (diffInMs < year) {
    const months = Math.floor(diffInMs / month)
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else {
    const years = Math.floor(diffInMs / year)
    return `${years} year${years > 1 ? 's' : ''} ago`
  }
}
