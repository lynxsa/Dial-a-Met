/**
 * Centralized Theme Configuration
 * Senior Architect Pattern: Single Source of Truth for all theme-related values
 */

export const themeConfig = {
  // Color System - Mining Industry Inspired
  colors: {
    primary: {
      50: 'rgb(239, 246, 255)',   // Very light blue
      100: 'rgb(219, 234, 254)',  // Light blue
      200: 'rgb(191, 219, 254)',  // Blue-200
      300: 'rgb(147, 197, 253)',  // Blue-300
      400: 'rgb(96, 165, 250)',   // Blue-400
      500: 'rgb(59, 130, 246)',   // Primary blue
      600: 'rgb(37, 99, 235)',    // Blue-600
      700: 'rgb(29, 78, 216)',    // Blue-700
      800: 'rgb(30, 64, 175)',    // Blue-800
      900: 'rgb(30, 58, 138)',    // Dark blue
    },
    
    // Mining-specific colors
    mining: {
      gold: 'rgb(251, 191, 36)',      // Gold accent
      copper: 'rgb(194, 84, 57)',     // Copper red
      steel: 'rgb(71, 85, 105)',      // Steel gray
      coal: 'rgb(15, 23, 42)',        // Coal black
      earth: 'rgb(120, 113, 108)',    // Earth brown
    },
    
    // Semantic colors
    success: 'rgb(34, 197, 94)',
    warning: 'rgb(251, 146, 60)',
    error: 'rgb(239, 68, 68)',
    info: 'rgb(59, 130, 246)',
  },
  
  // Spacing System
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  
  // Component Variants
  components: {
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600',
      secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white',
      ghost: 'hover:bg-slate-100 text-slate-700 dark:hover:bg-slate-800 dark:text-slate-300',
      mining: 'bg-gradient-to-r from-slate-800 to-blue-900 hover:from-slate-700 hover:to-blue-800 text-white',
    },
    
    card: {
      default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm',
      elevated: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg',
      mining: 'bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-blue-200 dark:border-blue-800',
    },
    
    input: {
      default: 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400',
      focus: 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400',
    },
  },
  
  // Animation System
  animations: {
    fadeIn: 'fade-in 0.2s ease-out',
    slideIn: 'slide-in 0.3s ease-out',
    bounce: 'bounce 1s infinite',
    pulse: 'pulse 2s infinite',
  },
  
  // Layout Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index Scale
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    tooltip: 1100,
    notification: 1200,
  },
} as const

// Theme Utility Functions
export const getThemeColor = (path: string, opacity?: number): string => {
  const keys = path.split('.')
  let value: unknown = themeConfig.colors
  
  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key]
    }
  }
  
  if (opacity && typeof value === 'string' && value.startsWith('rgb(')) {
    return value.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`)
  }
  
  return typeof value === 'string' ? value : ''
}

export const getMiningThemeClass = (variant: 'light' | 'dark' = 'light') => {
  const base = 'transition-colors duration-200'
  
  if (variant === 'dark') {
    return `${base} bg-slate-900 text-slate-100 border-slate-700`
  }
  
  return `${base} bg-slate-50 text-slate-900 border-slate-200`
}

// CSS-in-JS Theme Variables (for dynamic theming)
export const cssVariables = {
  light: {
    '--color-primary': themeConfig.colors.primary[600],
    '--color-background': 'rgb(255, 255, 255)',
    '--color-foreground': 'rgb(15, 23, 42)',
    '--color-border': 'rgb(226, 232, 240)',
    '--color-mining-accent': themeConfig.colors.mining.gold,
  },
  dark: {
    '--color-primary': themeConfig.colors.primary[500],
    '--color-background': 'rgb(15, 23, 42)',
    '--color-foreground': 'rgb(248, 250, 252)',
    '--color-border': 'rgb(51, 65, 85)',
    '--color-mining-accent': themeConfig.colors.mining.gold,
  },
}

export type ThemeConfig = typeof themeConfig
export type ThemeColors = typeof themeConfig.colors
