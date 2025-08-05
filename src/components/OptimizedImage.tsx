'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getOptimizedImageUrl, MINING_IMAGES } from '@/lib/images'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  priority?: boolean
  quality?: number
  fill?: boolean
  sizes?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackSrc = MINING_IMAGES.defaultMining,
  priority = false,
  quality = 80,
  fill = false,
  sizes,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const optimizedSrc = width && height && !fill 
    ? getOptimizedImageUrl(currentSrc, width, height, quality)
    : currentSrc

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
    } else {
      setHasError(true)
      setIsLoading(false)
    }
  }

  // Loading placeholder
  if (isLoading) {
    return (
      <div className={`bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse flex items-center justify-center ${className}`}>
        <div className="text-slate-400">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        <Image
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className="opacity-0 absolute"
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          fill={fill}
          sizes={sizes}
          style={fill ? { objectFit } : undefined}
        />
      </div>
    )
  }

  // Error state
  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-slate-500">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    )
  }

  // Successfully loaded image
  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      priority={priority}
      fill={fill}
      sizes={sizes}
      style={fill ? { objectFit } : undefined}
    />
  )
}
