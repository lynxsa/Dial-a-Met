'use client'

import { useState, useEffect, useCallback } from 'react'
import { BiddingEngine, type Bid, type Project, type BiddingState, type UseBiddingOptions } from '@/lib/bidding-engine'

export function useBidding({ projectId, autoRefresh = true, refreshInterval = 30000 }: UseBiddingOptions) {
  const [state, setState] = useState<BiddingState>({
    bids: [],
    project: null,
    isLoading: true,
    error: null,
    userBid: null,
    leadingBid: null,
    timeRemaining: '',
    canBid: false,
  })

  const biddingEngine = BiddingEngine.getInstance()

  // Fetch project and bids data
  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      // In a real app, these would be API calls
      const project = await mockFetchProject(projectId)
      const bids = await mockFetchBids(projectId)
      const userBid = bids.find(bid => bid.consultantId === getCurrentUserId()) || null
      const leadingBid = bids.find(bid => bid.status === 'LEADING') || null
      
      setState(prev => ({
        ...prev,
        project,
        bids,
        userBid,
        leadingBid,
        isLoading: false,
        canBid: project ? canUserBid(project, userBid) : false,
        timeRemaining: project ? calculateTimeRemaining(project.deadline) : '',
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
        isLoading: false,
      }))
    }
  }, [projectId])

  // Submit or update a bid
  const submitBid = useCallback(async (bidData: Partial<Bid>) => {
    if (!state.project) return { success: false, error: 'No project loaded' }

    try {
      setState(prev => ({ ...prev, isLoading: true }))

      const validation = biddingEngine.validateBid(bidData, state.project)
      if (!validation.isValid) {
        return { success: false, error: validation.errors.join(', ') }
      }

      // In a real app, this would be an API call
      const result = await mockSubmitBid(projectId, bidData)
      
      if (result.success) {
        await fetchData() // Refresh data
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to submit bid',
        isLoading: false 
      }))
      return { success: false, error: 'Failed to submit bid' }
    }
  }, [projectId, state.project, biddingEngine, fetchData])

  // Withdraw a bid
  const withdrawBid = useCallback(async () => {
    if (!state.userBid) return { success: false, error: 'No bid to withdraw' }

    try {
      setState(prev => ({ ...prev, isLoading: true }))
      
      // In a real app, this would be an API call
      const result = await mockWithdrawBid(state.userBid.id)
      
      if (result.success) {
        await fetchData() // Refresh data
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch {
      return { success: false, error: 'Failed to withdraw bid' }
    }
  }, [state.userBid, fetchData])

  // Calculate bid ranking
  const calculateRanking = useCallback((bid: Bid) => {
    if (!state.project) return 0
    return biddingEngine.calculateBidRank(bid, state.project)
  }, [state.project, biddingEngine])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchData])

  // Real-time updates subscription
  useEffect(() => {
    const unsubscribe = biddingEngine.subscribeToProject(projectId, (update) => {
      setState(prev => {
        const updatedBids = prev.bids.map(bid => 
          bid.id === update.bid.id ? update.bid : bid
        )
        
        if (!updatedBids.find(bid => bid.id === update.bid.id)) {
          updatedBids.push(update.bid)
        }

        const leadingBid = updatedBids.find(bid => bid.status === 'LEADING') || null
        const userBid = updatedBids.find(bid => bid.consultantId === getCurrentUserId()) || null

        return {
          ...prev,
          bids: updatedBids,
          leadingBid,
          userBid,
          project: update.project,
        }
      })
    })

    return unsubscribe
  }, [projectId, biddingEngine])

  return {
    ...state,
    actions: {
      submitBid,
      withdrawBid,
      refresh: fetchData,
      calculateRanking,
    },
  }
}

// Utility functions
function canUserBid(project: Project, userBid: Bid | null): boolean {
  if (project.status !== 'OPEN') return false
  if (new Date() > project.deadline) return false
  if (project.bids.length >= project.maxBids) return false
  if (userBid && userBid.status === 'ACCEPTED') return false
  
  return true
}

function calculateTimeRemaining(deadline: Date): string {
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()
  
  if (diff <= 0) return 'Expired'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

function getCurrentUserId(): string {
  // In a real app, this would come from authentication context
  return 'consultant-001'
}

// Mock API functions (replace with real API calls)
async function mockFetchProject(projectId: string): Promise<Project | null> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  
  const { mockProjects } = await import('@/lib/bidding-engine')
  return mockProjects.find(p => p.id === projectId) || null
}

async function mockFetchBids(projectId: string): Promise<Bid[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { mockBids } = await import('@/lib/bidding-engine')
  return mockBids.filter(bid => bid.projectId === projectId)
}

async function mockSubmitBid(_projectId: string, _bidData: Partial<Bid>): Promise<{ success: boolean; error?: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate random success/failure for demo
  if (Math.random() > 0.9) {
    return { success: false, error: 'Network error occurred' }
  }
  
  return { success: true }
}

async function mockWithdrawBid(_bidId: string): Promise<{ success: boolean; error?: string }> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// Export types for use in components
export type { BiddingState, UseBiddingOptions }
