'use client'

import React, { useState } from 'react'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { useBidding } from '@/hooks/useBidding'
import type { Bid } from '@/lib/bidding-engine'
import { 
  Clock, 
  Users, 
  TrendingUp,
  Eye,
  AlertCircle,
  Timer,
  Target,
  Award,
  ArrowUp,
  ArrowDown,
  Zap
} from 'lucide-react'

interface EnhancedBidDashboardProps {
  projectId: string
  userRole: 'client' | 'consultant'
  compact?: boolean
}

export function EnhancedBidDashboard({ 
  projectId, 
  userRole, 
  compact = false 
}: EnhancedBidDashboardProps) {
  const { classes } = useThemeClasses()
  const [viewMode, setViewMode] = useState<'timeline' | 'ranking' | 'analytics'>('timeline')
  
  const { 
    bids, 
    project, 
    isLoading, 
    error, 
    userBid, 
    leadingBid, 
    timeRemaining, 
    canBid,
    actions 
  } = useBidding({ projectId, autoRefresh: true })

  if (isLoading) {
    return (
      <div className={`${classes.card} p-8`}>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className={`ml-3 ${classes.text.secondary}`}>Loading bidding data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${classes.card} p-8`}>
        <div className="flex items-center text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 mr-3" />
          <span>Error loading bids: {error}</span>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getBidStatusColor = (status: string) => {
    switch (status) {
      case 'LEADING': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'OUTBID': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'ACTIVE': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
    }
  }

  const BidStatsCard = ({ 
    title, 
    value, 
    icon, 
    trend, 
    trendDirection 
  }: {
    title: string
    value: string | number
    icon: React.ReactNode
    trend?: string
    trendDirection?: 'up' | 'down' | 'neutral'
  }) => (
    <div className={`${classes.card} p-4 ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs font-medium ${classes.text.secondary} uppercase tracking-wider`}>
            {title}
          </p>
          <p className={`${compact ? 'text-lg' : 'text-2xl'} font-bold ${classes.text.primary} mt-1`}>
            {value}
          </p>
          {trend && (
            <div className={`flex items-center mt-1 text-xs ${
              trendDirection === 'up' 
                ? 'text-green-600 dark:text-green-400'
                : trendDirection === 'down'
                ? 'text-red-600 dark:text-red-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}>
              {trendDirection === 'up' && <ArrowUp className="w-3 h-3 mr-1" />}
              {trendDirection === 'down' && <ArrowDown className="w-3 h-3 mr-1" />}
              {trend}
            </div>
          )}
        </div>
        <div className={`
          ${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg flex items-center justify-center
          bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
        `}>
          {icon}
        </div>
      </div>
    </div>
  )

  const BidCard = ({ bid, rank }: { bid: Bid; rank: number }) => (
    <div className={`
      ${classes.card} p-4 border-l-4 transition-all duration-200 hover:shadow-lg
      ${bid.status === 'LEADING' 
        ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' 
        : bid.status === 'OUTBID'
        ? 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10'
        : 'border-l-blue-500'
      }
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
            ${bid.status === 'LEADING' 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }
          `}>
            #{rank}
          </div>
          <div>
            <p className={`font-medium ${classes.text.primary}`}>
              {bid.anonymousId}
            </p>
            <p className={`text-sm ${classes.text.secondary}`}>
              Submitted {new Date(bid.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`text-lg font-bold ${classes.text.primary}`}>
            {formatCurrency(bid.price)}
          </p>
          <span className={`
            text-xs px-2 py-1 rounded-full font-medium
            ${getBidStatusColor(bid.status)}
          `}>
            {bid.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-slate-400" />
          <span className={classes.text.secondary}>Timeline: {bid.timeline}</span>
        </div>
        <div className="flex items-center">
          <Target className="w-4 h-4 mr-2 text-slate-400" />
          <span className={classes.text.secondary}>
            Confidence: {Math.round(bid.confidence * 100)}%
          </span>
        </div>
      </div>

      {bid.skillHighlights && bid.skillHighlights.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {bid.skillHighlights.slice(0, 3).map((skill: string, index: number) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full"
            >
              {skill}
            </span>
          ))}
          {bid.skillHighlights.length > 3 && (
            <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
              +{bid.skillHighlights.length - 3} more
            </span>
          )}
        </div>
      )}

      {userRole === 'client' && bid.valueAdds && bid.valueAdds.length > 0 && (
        <div className="mt-3 border-t pt-3">
          <p className={`text-xs font-medium ${classes.text.secondary} mb-2`}>VALUE-ADDS:</p>
          <div className="flex flex-wrap gap-1">
            {bid.valueAdds.map((valueAdd: string, index: number) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full"
              >
                {valueAdd}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const averagePrice = bids.length > 0 ? bids.reduce((sum, bid) => sum + bid.price, 0) / bids.length : 0
  const priceRange = bids.length > 0 ? {
    min: Math.min(...bids.map(b => b.price)),
    max: Math.max(...bids.map(b => b.price))
  } : { min: 0, max: 0 }

  return (
    <div className="space-y-6">
      {/* Header with Project Info */}
      {project && (
        <div className={`${classes.card} p-6`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-xl font-bold ${classes.text.primary}`}>
                {project.title}
              </h3>
              <p className={`${classes.text.secondary} mt-1`}>
                Budget: {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
              </p>
            </div>
            <div className="text-right">
              <div className={`flex items-center text-sm ${
                timeRemaining.includes('Expired') 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-orange-600 dark:text-orange-400'
              }`}>
                <Timer className="w-4 h-4 mr-2" />
                {timeRemaining}
              </div>
              <p className={`text-sm ${classes.text.secondary} mt-1`}>
                {bids.length} of {project.maxBids} bids received
              </p>
            </div>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(bids.length / project.maxBids) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Bidding Statistics */}
      <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
        <BidStatsCard
          title="Total Bids"
          value={bids.length}
          icon={<Users className={compact ? "w-4 h-4" : "w-5 h-5"} />}
          trend="+2 since yesterday"
          trendDirection="up"
        />
        <BidStatsCard
          title="Leading Bid"
          value={leadingBid ? formatCurrency(leadingBid.price) : 'N/A'}
          icon={<Award className={compact ? "w-4 h-4" : "w-5 h-5"} />}
          trend={leadingBid ? "Best value" : undefined}
        />
        <BidStatsCard
          title="Average Bid"
          value={averagePrice > 0 ? formatCurrency(averagePrice) : 'N/A'}
          icon={<TrendingUp className={compact ? "w-4 h-4" : "w-5 h-5"} />}
          trend={`Range: ${formatCurrency(priceRange.min)} - ${formatCurrency(priceRange.max)}`}
        />
        <BidStatsCard
          title="Competition"
          value={project ? `${Math.round((bids.length / project.maxBids) * 100)}%` : 'N/A'}
          icon={<Zap className={compact ? "w-4 h-4" : "w-5 h-5"} />}
          trend={bids.length > 5 ? "High interest" : "Moderate interest"}
          trendDirection={bids.length > 5 ? "up" : "neutral"}
        />
      </div>

      {/* User's Bid Status (for consultants) */}
      {userRole === 'consultant' && userBid && (
        <div className={`${classes.card} p-4 border-l-4 border-l-blue-500`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${classes.text.primary}`}>Your Bid</h4>
              <p className={`text-sm ${classes.text.secondary}`}>
                {formatCurrency(userBid.price)} • {userBid.timeline}
              </p>
            </div>
            <div className="text-right">
              <span className={`
                text-sm px-3 py-1 rounded-full font-medium
                ${getBidStatusColor(userBid.status)}
              `}>
                {userBid.status}
              </span>
              <p className={`text-xs ${classes.text.secondary} mt-1`}>
                Rank #{userBid.rank}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Toggle */}
      <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
        {['timeline', 'ranking', 'analytics'].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as 'timeline' | 'ranking' | 'analytics')}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md transition-colors
              ${viewMode === mode 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : `${classes.text.secondary} hover:text-blue-600 dark:hover:text-blue-400`
              }
            `}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Bids List */}
      <div className="space-y-4">
        {bids.length > 0 ? (
          bids
            .sort((a, b) => {
              if (viewMode === 'ranking') return a.rank - b.rank
              return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
            })
            .map((bid, index) => (
              <BidCard 
                key={bid.id} 
                bid={bid} 
                rank={viewMode === 'ranking' ? bid.rank : index + 1}
              />
            ))
        ) : (
          <div className={`${classes.card} p-8 text-center`}>
            <Eye className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className={`text-lg font-medium ${classes.text.primary}`}>
              No bids yet
            </p>
            <p className={`${classes.text.secondary} mt-1`}>
              {userRole === 'client' 
                ? 'Consultants will start submitting bids soon.'
                : canBid 
                ? 'Be the first to submit a bid for this project!'
                : 'Bidding is currently closed for this project.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
