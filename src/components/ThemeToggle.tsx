'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'light'
            ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        title="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'dark'
            ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        title="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'system'
            ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        title="System mode"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  )
}
