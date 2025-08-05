'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { themeConfig, cssVariables, type ThemeConfig } from '@/lib/theme-config'

interface ThemeContextType {
  theme: string | undefined
  setTheme: (theme: string) => void
  resolvedTheme: string | undefined
  themeConfig: ThemeConfig
  isDark: boolean
  isMining: boolean
  setMiningMode: (enabled: boolean) => void
  applyThemeVariables: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface DialAMetThemeProviderProps {
  children: React.ReactNode
}

export function DialAMetThemeProvider({ children }: DialAMetThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [isMiningMode, setIsMiningMode] = useState(false)
  
  // Always call useTheme hook - never conditionally
  const themeHookResult = useTheme()
  const { theme, setTheme, resolvedTheme } = themeHookResult

  // Provide safe defaults when theme isn't ready
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    setMounted(true)
    // Check if mining mode was previously enabled
    try {
      const savedMiningMode = localStorage.getItem('dial-a-met-mining-mode')
      if (savedMiningMode === 'true') {
        setIsMiningMode(true)
      }
    } catch (error) {
      console.warn('Could not access localStorage:', error)
    }
  }, [])

  const setMiningMode = (enabled: boolean) => {
    setIsMiningMode(enabled)
    try {
      localStorage.setItem('dial-a-met-mining-mode', enabled.toString())
    } catch (error) {
      console.warn('Could not save mining mode to localStorage:', error)
    }
    applyThemeVariables()
  }

  const applyThemeVariables = React.useCallback(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const variables = isDark ? cssVariables.dark : cssVariables.light

    // Apply base theme variables
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Apply mining mode enhancements
    if (isMiningMode) {
      root.style.setProperty('--color-mining-active', themeConfig.colors.mining.gold)
      root.style.setProperty('--mining-contrast', isDark ? '1.2' : '1.1')
      root.classList.add('mining-mode')
    } else {
      root.classList.remove('mining-mode')
    }
  }, [isDark, isMiningMode])

  useEffect(() => {
    if (mounted) {
      applyThemeVariables()
    }
  }, [mounted, applyThemeVariables])

  const contextValue: ThemeContextType = {
    theme: theme || 'light', // Provide default theme
    setTheme: setTheme || (() => {}), // Provide no-op fallback
    resolvedTheme: resolvedTheme || theme || 'light', // Provide default resolved theme
    themeConfig,
    isDark,
    isMining: isMiningMode,
    setMiningMode,
    applyThemeVariables,
  }

  // Always provide the context, even when not mounted
  // This prevents the "must be used within provider" error
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useDialAMetTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Better error handling with more context
    const error = new Error('useDialAMetTheme must be used within a DialAMetThemeProvider')
    console.error('Theme context error:', {
      context,
      location: 'useDialAMetTheme hook',
      suggestion: 'Make sure your component is wrapped with DialAMetThemeProvider'
    })
    throw error
  }
  return context
}

// Hook for component-level theme utilities
export function useThemeClasses() {
  const { isDark, isMining, themeConfig } = useDialAMetTheme()

  const getVariantClass = (component: keyof typeof themeConfig.components, variant: string) => {
    return themeConfig.components[component]?.[variant as keyof typeof themeConfig.components[typeof component]] || ''
  }

  const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return {
    isDark,
    isMining,
    themeConfig,
    getVariantClass,
    cn,
    // Commonly used class combinations
    classes: {
      card: cn(
        getVariantClass('card', 'default'),
        isMining && 'ring-1 ring-yellow-400/20'
      ),
      cardElevated: cn(
        getVariantClass('card', 'elevated'),
        isMining && 'ring-1 ring-yellow-400/30'
      ),
      button: {
        primary: cn(
          getVariantClass('button', 'primary'),
          isMining && 'shadow-lg shadow-blue-500/25'
        ),
        secondary: getVariantClass('button', 'secondary'),
        ghost: getVariantClass('button', 'ghost'),
        mining: getVariantClass('button', 'mining'),
      },
      input: cn(
        getVariantClass('input', 'default'),
        getVariantClass('input', 'focus'),
        isMining && 'ring-offset-2 ring-offset-yellow-400/10'
      ),
      text: {
        primary: cn(
          'text-slate-900 dark:text-white',
          isMining && 'contrast-110'
        ),
        secondary: cn(
          'text-slate-600 dark:text-slate-400',
          isMining && 'contrast-105'
        ),
        muted: 'text-slate-500 dark:text-slate-500',
        accent: 'text-blue-600 dark:text-blue-400',
        mining: 'text-yellow-600 dark:text-yellow-400',
      },
      background: {
        page: cn(
          'bg-slate-50 dark:bg-slate-900',
          isMining && 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-800'
        ),
        card: cn(
          'bg-white dark:bg-slate-800',
          isMining && 'bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-850'
        ),
        sidebar: cn(
          'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg',
          isMining && 'bg-gradient-to-b from-slate-50/90 to-blue-50/90 dark:from-slate-900/90 dark:to-slate-800/90'
        ),
      },
      border: cn(
        'border-slate-200 dark:border-slate-700',
        isMining && 'border-blue-200/60 dark:border-blue-800/60'
      ),
    },
  }
}
