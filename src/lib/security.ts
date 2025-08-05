// Security utilities and middleware for Dial-a-Met - Edge Runtime Compatible

import { NextRequest, NextResponse } from 'next/server'

// Security headers configuration
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}

// Rate limiting in-memory store (for development)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Input validation utilities
export class InputValidator {
  static sanitizeString(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim()
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
  }

  static isValidPassword(password: string): boolean {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  static isValidSAPhoneNumber(phone: string): boolean {
    // South African phone number validation
    // Supports formats: +27123456789, 0123456789, 123456789
    const saPhoneRegex = /^(\+27|0)?[1-9]\d{8}$/
    return saPhoneRegex.test(phone.replace(/[\s-]/g, ''))
  }

  static validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)')
    }
    
    return { valid: errors.length === 0, errors }
  }

  static validateFileUpload(file: File, options?: { maxSize?: number; allowedTypes?: string[] }): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    const maxSize = options?.maxSize || 10 * 1024 * 1024 // 10MB default
    const allowedTypes = options?.allowedTypes || ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
    
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
    }
    
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`)
    }
    
    return { valid: errors.length === 0, errors }
  }

  static sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9._-]/g, '') // Only allow alphanumeric, dots, underscores, hyphens
      .substring(0, 255) // Limit length
  }
}

// Rate limiting
export class RateLimiter {
  static async checkRateLimit(
    identifier: string,
    limit: number = 100,
    windowMs: number = 15 * 60 * 1000 // 15 minutes
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now()
    const resetTime = now + windowMs

    const existing = rateLimitStore.get(identifier)
    
    if (!existing || existing.resetTime < now) {
      // Create new entry or reset expired entry
      rateLimitStore.set(identifier, { count: 1, resetTime })
      return { allowed: true, remaining: limit - 1, resetTime }
    }

    const newCount = existing.count + 1
    
    if (newCount > limit) {
      return { allowed: false, remaining: 0, resetTime: existing.resetTime }
    }

    rateLimitStore.set(identifier, { count: newCount, resetTime: existing.resetTime })
    return { allowed: true, remaining: limit - newCount, resetTime: existing.resetTime }
  }
}

// Session management
export class SessionManager {
  static generateSessionId(): string {
    // Use Web Crypto API for secure random generation
    const array = new Uint8Array(32)
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(array)
    } else if (typeof self !== 'undefined' && self.crypto) {
      self.crypto.getRandomValues(array)
    } else {
      // Fallback for environments without crypto
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256)
      }
    }
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  static async validateSession(sessionId: string): Promise<boolean> {
    // Basic session validation (replace with your actual session store)
    return sessionId.length === 64 && /^[a-f0-9]+$/.test(sessionId)
  }

  static verifySession(token: string): { sessionId: string; data: { userId: string; role: string; permissions: string[] } } | null {
    // Simple token verification - in production this would check against a session store
    if (!token || token.length < 32) {
      return null
    }
    
    // For demo purposes, create mock session data
    // In production, you'd verify the token against your session store
    return {
      sessionId: token,
      data: {
        userId: 'user_123',
        role: 'user',
        permissions: ['read', 'write']
      }
    }
  }
}

// Security logging
export class SecurityLogger {
  static log(event: string, details: unknown, severity: 'info' | 'warning' | 'error' = 'info') {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      event,
      severity,
      details: typeof details === 'object' ? JSON.stringify(details) : details
    }

    // In production, you'd send this to your logging service
    console.log(`[SECURITY:${severity.toUpperCase()}] ${timestamp} - ${event}`, logEntry)
  }

  static logFailedAttempt(identifier: string, attemptType: string, details?: unknown) {
    this.log('failed_attempt', {
      identifier,
      attemptType,
      details
    }, 'warning')
  }

  static logSecurityEvent(eventType: string, details: unknown) {
    this.log('security_event', {
      eventType,
      details
    }, 'error')
  }
}

// Request validation middleware
export function createSecurityMiddleware() {
  return async (request: NextRequest) => {
    const response = NextResponse.next()
    
    // Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Basic rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = await RateLimiter.checkRateLimit(clientIP)
    
    if (!rateLimit.allowed) {
      SecurityLogger.logFailedAttempt(clientIP, 'rate_limit_exceeded')
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
        }
      })
    }

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '100')
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString())
    response.headers.set('X-RateLimit-Reset', Math.ceil(rateLimit.resetTime / 1000).toString())

    return response
  }
}

// Content Security Policy
export function getCSPHeader(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
}
