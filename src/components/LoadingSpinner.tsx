'use client'

import { Pickaxe } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  showIcon?: boolean
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  showIcon = true,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {showIcon && (
        <div className="relative">
          {/* Mining-themed animated loader */}
          <Pickaxe className={`${sizeClasses[size]} text-blue-600 animate-bounce`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        </div>
      )}
      
      {text && (
        <p className={`${textSizeClasses[size]} text-slate-600 font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  )
}

// Full page loading component
export function PageLoader({ text = 'Loading Dial-a-Met...' }: { text?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Pickaxe className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-slate-900">Dial-a-Met</span>
        </div>
        
        <LoadingSpinner size="lg" text={text} showIcon={false} />
        
        <div className="mt-8 grid grid-cols-3 gap-2 max-w-xs mx-auto">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 bg-blue-200 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Card skeleton loader
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse"></div>
              <div className="h-6 bg-slate-200 rounded-full w-20 animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
              <div className="h-8 bg-slate-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
