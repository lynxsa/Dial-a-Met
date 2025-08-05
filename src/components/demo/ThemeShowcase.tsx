'use client'

import { useState } from 'react'
import { useDialAMetTheme, useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { EnhancedThemeToggle } from '@/components/theme/EnhancedThemeToggle'
import { EnhancedBidDashboard } from '@/components/bidding/EnhancedBidDashboard'
import { 
  Palette, 
  Zap, 
  CheckCircle2, 
  Settings, 
  Monitor,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  HardHat,
  Trophy
} from 'lucide-react'

export function ThemeShowcase() {
  const { isDark, isMining, setMiningMode } = useDialAMetTheme()
  const { classes } = useThemeClasses()
  const [activeDemo, setActiveDemo] = useState<'theme' | 'bidding' | 'components'>('theme')

  const FeatureCard = ({ 
    title, 
    description, 
    icon, 
    status = 'completed',
    demo
  }: {
    title: string
    description: string
    icon: React.ReactNode
    status?: 'completed' | 'in-progress' | 'planned'
    demo?: React.ReactNode
  }) => (
    <div className={`${classes.card} p-6 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start space-x-4">
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          ${status === 'completed' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
            : status === 'in-progress'
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }
        `}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className={`text-lg font-semibold ${classes.text.primary}`}>{title}</h3>
            {status === 'completed' && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
          <p className={`${classes.text.secondary} mb-4`}>{description}</p>
          {demo && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              {demo}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const ColorPalette = () => (
    <div className="grid grid-cols-8 gap-2">
      {[
        { name: 'Primary 500', class: 'bg-blue-500' },
        { name: 'Primary 600', class: 'bg-blue-600' },
        { name: 'Primary 700', class: 'bg-blue-700' },
        { name: 'Gold', class: 'bg-yellow-500' },
        { name: 'Success', class: 'bg-green-500' },
        { name: 'Warning', class: 'bg-orange-500' },
        { name: 'Error', class: 'bg-red-500' },
        { name: 'Info', class: 'bg-cyan-500' },
      ].map((color, index) => (
        <div key={index} className="text-center">
          <div className={`w-12 h-12 rounded-lg ${color.class} mb-2 shadow-sm`}></div>
          <span className="text-xs text-slate-600 dark:text-slate-400">{color.name}</span>
        </div>
      ))}
    </div>
  )

  const ResponsiveTest = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Monitor className="w-5 h-5 text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-400">Desktop</span>
      </div>
      <div className="flex items-center space-x-2">
        <Tablet className="w-5 h-5 text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-400">Tablet</span>
      </div>
      <div className="flex items-center space-x-2">
        <Smartphone className="w-5 h-5 text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-400">Mobile</span>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${classes.background.page} p-6`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${classes.text.primary}`}>
            Dial-a-Met Theme System
          </h1>
          <p className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}>
            A comprehensive design system with dark mode, mining mode, and responsive bidding components
          </p>
          
          {/* Theme Controls */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <EnhancedThemeToggle showLabels />
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm ${classes.text.secondary}`}>Theme Status:</span>
              <div className="flex items-center space-x-2">
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className={classes.text.primary}>{isDark ? 'Dark' : 'Light'}</span>
              </div>
              {isMining && (
                <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
                  <HardHat className="w-4 h-4" />
                  <span>Mining Mode</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex space-x-1">
            {[
              { id: 'theme', label: 'Theme System', icon: <Palette className="w-4 h-4" /> },
              { id: 'bidding', label: 'Bidding Engine', icon: <Trophy className="w-4 h-4" /> },
              { id: 'components', label: 'Components', icon: <Settings className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id as 'theme' | 'bidding' | 'components')}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeDemo === tab.id 
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : `${classes.text.secondary} hover:text-blue-600 dark:hover:text-blue-400`
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeDemo === 'theme' && (
          <div className="grid gap-8">
            <FeatureCard
              title="Multi-Theme System"
              description="Seamless switching between light, dark, and system themes with mining industry enhancements"
              icon={<Palette className="w-6 h-6" />}
              demo={<ColorPalette />}
            />
            
            <FeatureCard
              title="Mining Mode Enhancement"
              description="Industry-specific visual enhancements with gold accents and specialized UI elements"
              icon={<HardHat className="w-6 h-6" />}
              demo={
                <button
                  onClick={() => setMiningMode(!isMining)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isMining 
                      ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }
                  `}
                >
                  {isMining ? 'Disable Mining Mode' : 'Enable Mining Mode'}
                </button>
              }
            />
            
            <FeatureCard
              title="Responsive Design"
              description="Optimized for all screen sizes with adaptive layouts and touch-friendly interactions"
              icon={<Monitor className="w-6 h-6" />}
              demo={<ResponsiveTest />}
            />
          </div>
        )}

        {activeDemo === 'bidding' && (
          <div className="space-y-8">
            <div className={`${classes.card} p-6`}>
              <h2 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>
                Enhanced Bidding System
              </h2>
              <p className={`${classes.text.secondary} mb-6`}>
                Real-time bidding dashboard with anonymous bidding, smart ranking, and comprehensive analytics.
              </p>
              
              <EnhancedBidDashboard 
                projectId="proj-001" 
                userRole="consultant" 
                compact={false}
              />
            </div>
          </div>
        )}

        {activeDemo === 'components' && (
          <div className="grid gap-6">
            <FeatureCard
              title="Consistent Component Library"
              description="Unified design language across all UI components with theme-aware styling"
              icon={<Settings className="w-6 h-6" />}
              demo={
                <div className="flex items-center space-x-3">
                  <button className={classes.button.primary}>Primary Button</button>
                  <button className={classes.button.secondary}>Secondary Button</button>
                  <button className={classes.button.ghost}>Ghost Button</button>
                </div>
              }
            />
            
            <FeatureCard
              title="Smart Animations"
              description="Performant animations that enhance UX without compromising accessibility"
              icon={<Zap className="w-6 h-6" />}
              demo={
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg animate-pulse"></div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg animate-bounce"></div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg animate-spin"></div>
                </div>
              }
            />
          </div>
        )}

        {/* Footer */}
        <div className={`${classes.card} p-8 text-center`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h3 className={`text-xl font-bold ${classes.text.primary}`}>
              Implementation Complete
            </h3>
          </div>
          <p className={`${classes.text.secondary} max-w-2xl mx-auto`}>
            The Dial-a-Met platform now features a complete theme system with light/dark mode support, 
            mining industry enhancements, unified bidding architecture, and consistent component styling 
            across all pages and user roles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
              <div className={`text-sm ${classes.text.secondary}`}>Theme Consistency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</div>
              <div className={`text-sm ${classes.text.secondary}`}>Dashboard Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Real-time</div>
              <div className={`text-sm ${classes.text.secondary}`}>Bidding System</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
