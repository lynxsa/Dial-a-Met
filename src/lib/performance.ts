// Performance monitoring and analytics for Dial-a-Met

export interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  timeToInteractive: number
}

export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private observer: PerformanceObserver | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMetrics()
    }
  }

  private initializeMetrics() {
    // Measure Core Web Vitals
    this.measureWebVitals()
    
    // Measure custom metrics
    this.measurePageLoad()
    
    // Monitor long tasks
    this.monitorLongTasks()
  }

  private measureWebVitals() {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.largestContentfulPaint = lastEntry.startTime
      })
      this.observer.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming
          this.metrics.firstInputDelay = fidEntry.processingStart - fidEntry.startTime
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean }
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value
          }
        })
        this.metrics.cumulativeLayoutShift = clsValue
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }

  private measurePageLoad() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          
          this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
          this.metrics.firstContentfulPaint = this.getFirstContentfulPaint()
          this.metrics.timeToInteractive = this.getTimeToInteractive()
          
          this.reportMetrics()
        }, 0)
      })
    }
  }

  private getFirstContentfulPaint(): number {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
    return fcpEntry ? fcpEntry.startTime : 0
  }

  private getTimeToInteractive(): number {
    // Simplified TTI calculation
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    return navigation.domInteractive - navigation.fetchStart
  }

  private monitorLongTasks() {
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          // Log long tasks that block the main thread
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`, entry)
          }
        })
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    }
  }

  private reportMetrics() {
    // In production, send metrics to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(this.metrics)
    } else {
      console.log('Performance Metrics:', this.metrics)
    }
  }

  private sendToAnalytics(metrics: Partial<PerformanceMetrics>) {
    // Implementation for sending metrics to analytics service
    // e.g., Google Analytics, DataDog, New Relic, etc.
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metrics,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch(console.error)
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

// Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
}

// Performance scoring
export function getPerformanceScore(metrics: Partial<PerformanceMetrics>): number {
  let score = 0
  let count = 0

  if (metrics.largestContentfulPaint) {
    score += metrics.largestContentfulPaint <= WEB_VITALS_THRESHOLDS.LCP.good ? 100 :
             metrics.largestContentfulPaint <= WEB_VITALS_THRESHOLDS.LCP.needsImprovement ? 50 : 0
    count++
  }

  if (metrics.firstInputDelay) {
    score += metrics.firstInputDelay <= WEB_VITALS_THRESHOLDS.FID.good ? 100 :
             metrics.firstInputDelay <= WEB_VITALS_THRESHOLDS.FID.needsImprovement ? 50 : 0
    count++
  }

  if (metrics.cumulativeLayoutShift !== undefined) {
    score += metrics.cumulativeLayoutShift <= WEB_VITALS_THRESHOLDS.CLS.good ? 100 :
             metrics.cumulativeLayoutShift <= WEB_VITALS_THRESHOLDS.CLS.needsImprovement ? 50 : 0
    count++
  }

  return count > 0 ? Math.round(score / count) : 0
}

// Initialize performance monitoring
export function initializePerformanceMonitoring(): PerformanceMonitor {
  return new PerformanceMonitor()
}
