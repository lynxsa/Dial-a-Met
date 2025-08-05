// API utilities and base handlers for Dial-a-Met

import { NextRequest, NextResponse } from 'next/server'
import { SecurityLogger, InputValidator, SessionManager } from '@/lib/security'

// Standard API response format
export interface APIResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  meta?: {
    timestamp: string
    requestId: string
    version: string
  }
}

// API error codes
export const API_ERRORS = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
  AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INVALID_REQUEST: 'INVALID_REQUEST',
  CSRF_TOKEN_INVALID: 'CSRF_TOKEN_INVALID',
} as const

type APIErrorCode = typeof API_ERRORS[keyof typeof API_ERRORS]

// Create standardized API response
export function createAPIResponse<T>(
  success: boolean,
  data?: T,
  error?: { code: APIErrorCode; message: string; details?: unknown },
  requestId?: string
): APIResponse<T> {
  return {
    success,
    data: success ? data : undefined,
    error: success ? undefined : error,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: requestId || crypto.randomUUID(),
      version: process.env.API_VERSION || '1.0.0',
    },
  }
}

// Create error response
export function createErrorResponse(
  code: APIErrorCode,
  message: string,
  status: number = 400,
  details?: unknown,
  requestId?: string
): NextResponse {
  const response = createAPIResponse(false, undefined, { code, message, details }, requestId)
  return NextResponse.json(response, { status })
}

// Create success response
export function createSuccessResponse<T>(
  data: T,
  status: number = 200,
  requestId?: string
): NextResponse {
  const response = createAPIResponse(true, data, undefined, requestId)
  return NextResponse.json(response, { status })
}

// Authentication middleware for API routes
export async function requireAuth(request: NextRequest): Promise<{ userId: string; sessionData: Record<string, unknown> } | NextResponse> {
  try {
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('auth-token')?.value
    
    const token = authHeader?.replace('Bearer ', '') || cookieToken
    
    if (!token) {
      SecurityLogger.log('authentication_required', {
        type: 'authentication',
        severity: 'low',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || '',
        details: { reason: 'no_token_provided' },
      }, 'warning')
      
      return createErrorResponse(
        API_ERRORS.AUTHENTICATION_REQUIRED,
        'Authentication token required',
        401
      )
    }
    
    // Verify session token
    const sessionData = SessionManager.verifySession(token)
    if (!sessionData) {
      SecurityLogger.log('authentication_invalid_token', {
        type: 'authentication',
        severity: 'medium',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || '',
        details: { reason: 'invalid_token' },
      }, 'warning')
      
      return createErrorResponse(
        API_ERRORS.AUTHENTICATION_REQUIRED,
        'Invalid or expired authentication token',
        401
      )
    }
    
    return {
      userId: sessionData.sessionId,
      sessionData: sessionData.data,
    }
  } catch (error) {
    SecurityLogger.log('authentication_service_error', {
      type: 'authentication',
      severity: 'high',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || '',
      details: { error: String(error) },
    }, 'error')
    
    return createErrorResponse(
      API_ERRORS.INTERNAL_ERROR,
      'Authentication service error',
      500
    )
  }
}

// Role-based authorization
export function requireRole(allowedRoles: string[]) {
  return (sessionData: Record<string, unknown>): boolean => {
    const userRole = sessionData.role as string
    return allowedRoles.includes(userRole)
  }
}

// Validate request body against schema
export async function validateRequestBody<T>(
  request: NextRequest,
  validator: (data: unknown) => { valid: boolean; errors: string[]; data?: T }
): Promise<{ data: T } | NextResponse> {
  try {
    let body: unknown
    
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      body = await request.json()
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      body = Object.fromEntries(formData.entries())
    } else {
      return createErrorResponse(
        API_ERRORS.INVALID_REQUEST,
        'Unsupported content type. Expected application/json or application/x-www-form-urlencoded',
        415
      )
    }
    
    const validation = validator(body)
    
    if (!validation.valid) {
      SecurityLogger.log('input_validation_failed', {
        type: 'input_validation',
        severity: 'low',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || '',
        details: { errors: validation.errors, body },
      }, 'warning')
      
      return createErrorResponse(
        API_ERRORS.VALIDATION_ERROR,
        'Request validation failed',
        400,
        { validationErrors: validation.errors }
      )
    }
    
    return { data: validation.data! }
  } catch (error) {
    return createErrorResponse(
      API_ERRORS.INVALID_REQUEST,
      'Invalid request body format',
      400,
      { error: String(error) }
    )
  }
}

// Get client IP address
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0] || realIp || 'unknown'
}

// API route wrapper with error handling
export function withErrorHandling(
  handler: (request: NextRequest, context?: { params: Record<string, string> }) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: { params: Record<string, string> }): Promise<NextResponse> => {
    const requestId = crypto.randomUUID()
    
    try {
      // Add request ID to headers for tracking
      request.headers.set('x-request-id', requestId)
      
      const response = await handler(request, context)
      
      // Add request ID to response headers
      response.headers.set('x-request-id', requestId)
      
      return response
    } catch (error) {
      console.error(`API Error [${requestId}]:`, error)
      
      SecurityLogger.log('api_error_caught', {
        type: 'suspicious_activity',
        severity: 'high',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || '',
        details: {
          error: String(error),
          requestId,
          path: request.nextUrl.pathname,
          method: request.method,
        },
      }, 'error')
      
      return createErrorResponse(
        API_ERRORS.INTERNAL_ERROR,
        'An internal server error occurred',
        500,
        process.env.NODE_ENV === 'development' ? { error: String(error) } : undefined,
        requestId
      )
    }
  }
}

// Common validation schemas
export const validationSchemas = {
  email: (email: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!email) {
      errors.push('Email is required')
    } else if (!InputValidator.isValidEmail(email)) {
      errors.push('Invalid email format')
    }
    
    return { valid: errors.length === 0, errors }
  },
  
  saPhoneNumber: (phone: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!phone) {
      errors.push('Phone number is required')
    } else if (!InputValidator.isValidSAPhoneNumber(phone)) {
      errors.push('Invalid South African phone number format')
    }
    
    return { valid: errors.length === 0, errors }
  },
  
  password: (password: string): { valid: boolean; errors: string[] } => {
    return InputValidator.validatePassword(password)
  },
  
  fileUpload: (file: File, options?: Parameters<typeof InputValidator.validateFileUpload>[1]): { valid: boolean; errors: string[] } => {
    return InputValidator.validateFileUpload(file, options)
  },
}

// Database connection helper
export async function withDatabase<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    // Here you would typically initialize your database connection
    // For now, we'll just execute the operation
    return await operation()
  } catch (error) {
    console.error('Database operation failed:', error)
    throw new Error('Database operation failed')
  }
}

// Cache helper for API responses
export class APICache {
  private static cache = new Map<string, { data: unknown; expiry: number }>()
  
  static get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry || Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }
    return entry.data as T
  }
  
  static set(key: string, data: unknown, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + (ttlSeconds * 1000),
    })
  }
  
  static delete(key: string): void {
    this.cache.delete(key)
  }
  
  static clear(): void {
    this.cache.clear()
  }
  
  static generateKey(prefix: string, ...params: (string | number)[]): string {
    return `${prefix}:${params.join(':')}`
  }
}
