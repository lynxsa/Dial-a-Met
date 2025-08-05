'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  AlertTriangle,
  Zap,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react'

interface BidPosition {
  rank: number
  price: number
  timeline: number
  valueScore: number
  isYours: boolean
}

interface BidWarProps {
  projectId: string
  projectTitle: string
  timeRemaining: number
  totalBids: number
  yourBid?: BidPosition
  topBids: BidPosition[]
  budgetRange: { min: number; max: number }
  onImproveBid: () => void
}

export default function BidWarDashboard({
  projectId,
  projectTitle,
  timeRemaining,
  totalBids,
  yourBid,
  topBids,
  budgetRange,
  onImproveBid
}: BidWarProps) {
  const [timeLeft, setTimeLeft] = useState(timeRemaining)
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - 1000)
        setIsUrgent(newTime < 3600000) // Less than 1 hour
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTimeRemaining = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m ${seconds}s`
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getBidPositionColor = (rank: number): string => {
    switch (rank) {
      case 1: return 'bg-green-500'
      case 2: return 'bg-blue-500'
      case 3: return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getPositionIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Award className="h-4 w-4 text-yellow-500" />
      case 2: return <Target className="h-4 w-4 text-blue-500" />
      case 3: return <TrendingUp className="h-4 w-4 text-blue-500" />
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Bid War: {projectTitle}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Project ID: {projectId}
              </p>
            </div>
            <Badge 
              variant={isUrgent ? "destructive" : "secondary"}
              className="text-lg px-4 py-2"
            >
              <Clock className="h-4 w-4 mr-2" />
              {formatTimeRemaining(timeLeft)}
            </Badge>
          </div>

          {/* Time Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Auction Progress</span>
              <span>{totalBids} bids submitted</span>
            </div>
            <Progress 
              value={((259200000 - timeLeft) / 259200000) * 100} // 72 hours total
              className="h-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Position Card */}
          {yourBid && (
            <Card className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-blue-900 dark:text-blue-100">
                  {getPositionIcon(yourBid.rank)}
                  <span className="ml-2">Your Position</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getBidPositionColor(yourBid.rank)} text-white text-2xl font-bold mb-2`}>
                    #{yourBid.rank}
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(yourBid.price)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {yourBid.timeline} days delivery
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Value Score</span>
                      <span>{yourBid.valueScore}/100</span>
                    </div>
                    <Progress value={yourBid.valueScore} className="h-2" />
                  </div>

                  {yourBid.rank > 1 && (
                    <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <div className="flex items-center text-blue-800 dark:text-blue-200 mb-2">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Position Alert</span>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        You&apos;re currently in position #{yourBid.rank}. Consider improving your bid to gain competitive advantage.
                      </p>
                    </div>
                  )}

                  <Button 
                    onClick={onImproveBid}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Improve Bid
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Competition Analysis */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-slate-600" />
                Competition Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Budget Distribution Chart */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Budget Distribution
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Min: {formatCurrency(budgetRange.min)}</span>
                      <span>Max: {formatCurrency(budgetRange.max)}</span>
                    </div>
                    <div className="relative h-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      {topBids.slice(0, 5).map((bid, index) => {
                        const position = ((bid.price - budgetRange.min) / (budgetRange.max - budgetRange.min)) * 100
                        return (
                          <div
                            key={index}
                            className={`absolute w-3 h-3 rounded-full transform -translate-y-1/2 top-1/2 ${
                              bid.isYours ? 'bg-blue-500 ring-2 ring-blue-300' : getBidPositionColor(index + 1)
                            }`}
                            style={{ left: `${Math.max(2, Math.min(95, position))}%` }}
                            title={`${formatCurrency(bid.price)} - ${bid.timeline} days`}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Top Competitors */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Leading Bids
                  </h4>
                  <div className="space-y-2">
                    {topBids.slice(0, 5).map((bid, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          bid.isYours 
                            ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800' 
                            : 'bg-slate-50 dark:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full ${getBidPositionColor(bid.rank)} flex items-center justify-center text-white text-sm font-bold`}>
                            {bid.rank}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {formatCurrency(bid.price)}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {bid.timeline} days delivery
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Score: {bid.valueScore}
                          </div>
                          {bid.isYours && (
                            <Badge variant="outline" className="mt-1">
                              Your Bid
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Center */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-slate-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                <TrendingUp className="h-6 w-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Price Analysis</span>
                <span className="text-xs text-slate-500">Compare pricing</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                <Clock className="h-6 w-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Timeline Optimizer</span>
                <span className="text-xs text-slate-500">Adjust delivery</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                <Award className="h-6 w-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Value Enhancer</span>
                <span className="text-xs text-slate-500">Add services</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                <AlertTriangle className="h-6 w-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Bid Alerts</span>
                <span className="text-xs text-slate-500">Set notifications</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
