'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor, HardHat } from 'lucide-react'
import { useDialAMetTheme } from '@/components/theme/DialAMetThemeProvider'

interface EnhancedThemeToggleProps {
  variant?: 'default' | 'compact' | 'sidebar'
  showLabels?: boolean
}

export function EnhancedThemeToggle({ 
  variant = 'default', 
  showLabels = false 
}: EnhancedThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, isMining, setMiningMode } = useDialAMetTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getButtonClass = (isActive: boolean, themeType?: string) => {
    const base = "p-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    
    if (isActive) {
      if (themeType === 'mining') {
        return `${base} bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30`
      }
      return `${base} bg-blue-500 text-white shadow-sm`
    }
    
    return `${base} text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800`
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={getButtonClass(false)}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        <button
          onClick={() => setMiningMode(!isMining)}
          className={getButtonClass(isMining, 'mining')}
          title={isMining ? 'Disable Mine Mode' : 'Enable Mine Mode'}
        >
          <HardHat className="w-4 h-4" />
        </button>
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className="space-y-2">
        {showLabels && (
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">
            Display
          </div>
        )}
        
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setTheme('light')}
              className={getButtonClass(theme === 'light')}
              title="Light mode"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={getButtonClass(theme === 'dark')}
              title="Dark mode"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={getButtonClass(theme === 'system')}
              title="System mode"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setMiningMode(!isMining)}
            className={`${getButtonClass(isMining, 'mining')} w-full flex items-center justify-center space-x-2`}
            title={isMining ? 'Disable Mine Mode' : 'Enable Mine Mode'}
          >
            <HardHat className="w-4 h-4" />
            {showLabels && (
              <span className="text-xs font-medium">
                {isMining ? 'Mine Mode' : 'Standard'}
              </span>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="flex items-center space-x-3">
      {/* Theme Selection */}
      <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
        <button
          onClick={() => setTheme('light')}
          className={getButtonClass(theme === 'light')}
          title="Light mode"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={getButtonClass(theme === 'dark')}
          title="Dark mode"
        >
          <Moon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTheme('system')}
          className={getButtonClass(theme === 'system')}
          title="System mode"
        >
          <Monitor className="w-4 h-4" />
        </button>
      </div>

      {/* Mining Mode Toggle */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setMiningMode(!isMining)}
          className={getButtonClass(isMining, 'mining')}
          title={isMining ? 'Disable Mine Mode' : 'Enable Mine Mode'}
        >
          <HardHat className="w-4 h-4" />
        </button>
        
        {showLabels && (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {isMining ? 'Mine Mode' : 'Standard Mode'}
          </span>
        )}
      </div>
    </div>
  )
}

// Utility component for just the mining mode toggle
export function MiningModeToggle() {
  const { isMining, setMiningMode } = useDialAMetTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setMiningMode(!isMining)}
      className={`
        p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${isMining 
          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400'
        }
      `}
      title={isMining ? 'Disable Mine Mode' : 'Enable Mine Mode'}
    >
      <HardHat className="w-4 h-4" />
    </button>
  )
}
