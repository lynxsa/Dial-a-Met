'use client'

import { useState } from 'react'
import { 
  Pickaxe, 
  Star, 
  Smartphone, 
  Download, 
  Menu,
  Bot,
  Eye,
  Lock,
  ChevronRight,
  Globe,
  Users,
  TrendingUp,
  Plus
} from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/OptimizedImage"
import { MINING_IMAGES, getCategoryImage, getConsultantAvatar } from "@/lib/images"
import { ThemeToggle } from '@/components/ThemeToggle'

// Temporary fallback for theme classes while we fix the provider
'use client'

import { useState } from 'react'
import { 
  Pickaxe, 
  Star, 
  Smartphone, 
  Download, 
  Menu,
  Bot,
  Eye,
  Lock,
  ChevronRight,
  Globe,
  Users,
  TrendingUp,
  Plus,
  Building2,
  UserCheck,
  Briefcase,
  Shield,
  BookOpen,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/OptimizedImage"
import { MINING_IMAGES, getCategoryImage, getConsultantAvatar } from "@/lib/images"
import { ThemeToggle } from '@/components/ThemeToggle'

// Temporary fallback for theme classes
const useThemeClasses = () => {
  return {
    classes: {
      background: {
        page: 'bg-white dark:bg-gray-900',
        card: 'bg-white dark:bg-gray-800'
      },
      border: 'border-gray-200 dark:border-gray-700',
      text: {
        primary: 'text-gray-900 dark:text-white',
        secondary: 'text-gray-600 dark:text-gray-300',
        muted: 'text-gray-500 dark:text-gray-400'
      }
    }
  }
}

export default function EnhancedDialAMetHomePage() {
  const { classes } = useThemeClasses()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // User roles for South African mining context
  const userRoles = [
    {
      id: 'mine',
      title: 'Mining Company',
      subtitle: 'I need expert consultants',
      description: 'Post projects, review bids, and hire the best mining consultants in South Africa',
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
      href: '/auth/signup?role=mine',
      features: ['Post Mining Projects', 'Review Anonymous Bids', 'Hire Top Consultants', 'Track Project Progress'],
      buttonText: 'Post a Project',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'consultant',
      title: 'Mining Consultant',
      subtitle: 'I provide expert services',
      description: 'Browse projects, submit competitive bids, and grow your consulting business',
      icon: <UserCheck className="w-12 h-12 text-green-600" />,
      href: '/auth/signup?role=consultant',
      features: ['Browse Available Projects', 'Submit Competitive Bids', 'Build Your Profile', 'Earn Premium Income'],
      buttonText: 'Find Projects',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'job_seeker',
      title: 'Job Seeker',
      subtitle: 'I want mining opportunities',
      description: 'Access training, find employment opportunities, and advance your mining career',
      icon: <Briefcase className="w-12 h-12 text-purple-600" />,
      href: '/auth/signup?role=job_seeker',
      features: ['Access Training Modules', 'Find Job Opportunities', 'Career Development', 'Skills Certification'],
      buttonText: 'Start Learning',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'trainer',
      title: 'Training Provider',
      subtitle: 'I offer mining education',
      description: 'Create training content, teach skills, and help develop mining talent',
      icon: <BookOpen className="w-12 h-12 text-orange-600" />,
      href: '/auth/signup?role=trainer',
      features: ['Create Training Content', 'Manage Virtual Classrooms', 'Issue Certifications', 'Track Student Progress'],
      buttonText: 'Start Teaching',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  // South African mining categories
  const miningCategories = [
    {
      title: "Gold Mining Operations",
      description: "Expert consultation for gold extraction, processing, and refining operations",
      tags: ["Witwatersrand", "Deep Level", "Reef Mining"],
      projects: "250+ active projects",
      price: "From R3,500/day",
      expertise: "Johannesburg-based specialists"
    },
    {
      title: "Platinum & PGM Processing",
      description: "Specialized services for platinum group metals extraction and beneficiation",
      tags: ["Bushveld Complex", "Smelting", "Refining"],
      projects: "180+ active projects", 
      price: "From R4,200/day",
      expertise: "Rustenburg & Pretoria experts"
    },
    {
      title: "Coal Mining & Logistics",
      description: "Comprehensive coal mining operations and export logistics management",
      tags: ["Highveld", "Mpumalanga", "Export Terminals"],
      projects: "320+ active projects",
      price: "From R3,800/day", 
      expertise: "Mpumalanga & KZN specialists"
    },
    {
      title: "Diamond Mining Technology",
      description: "Advanced diamond extraction, processing, and beneficiation technologies",
      tags: ["Kimberley", "Marine Diamonds", "Alluvial"],
      projects: "95+ active projects",
      price: "From R5,000/day",
      expertise: "Northern Cape & Coastal experts"
    },
    {
      title: "Chrome & Ferrochrome",
      description: "Chrome ore mining and ferrochrome production optimization",
      tags: ["Bushveld", "Smelting", "Export"],
      projects: "140+ active projects",
      price: "From R4,000/day",
      expertise: "Limpopo & North West specialists"
    },
    {
      title: "Mine Safety & Compliance",
      description: "Regulatory compliance, safety systems, and risk management",
      tags: ["DMRE", "MHSA", "ISO Standards"],
      projects: "400+ active projects",
      price: "From R2,800/day",
      expertise: "Nationwide compliance experts"
    }
  ]

  // Success metrics for South African context
  const successMetrics = [
    { value: "2,500+", label: "Active SA Mining Experts", description: "Verified professionals across all provinces" },
    { value: "R850M+", label: "Projects Completed", description: "Total value delivered to SA mining companies" },
    { value: "98%", label: "Client Satisfaction", description: "Average satisfaction rating from mining companies" },
    { value: "24hrs", label: "Average Response", description: "Time to receive first consultant bid" }
  ]

  return (
    <div className={`min-h-screen ${classes.background.page}`}>
      {/* Enhanced Navigation */}
      <nav className={`${classes.background.card}/90 backdrop-blur-md border-b ${classes.border} shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Pickaxe className="h-8 w-8 text-blue-600" />
              <span className={`text-2xl font-bold ${classes.text.primary}`}>Dial-a-Met</span>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                South Africa
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`${classes.text.secondary} hover:text-blue-600 font-medium transition-colors`}>
                Home
              </Link>
              <Link href="#how-it-works" className={`${classes.text.secondary} hover:text-cyan-600 font-medium transition-colors`}>
                How It Works
              </Link>
              <Link href="#categories" className={`${classes.text.secondary} hover:text-blue-600 font-medium transition-colors`}>
                Mining Categories
              </Link>
              <Link href="/browse" className={`${classes.text.secondary} hover:text-cyan-600 font-medium transition-colors`}>
                Browse Experts
              </Link>
              <Link href="/pricing" className={`${classes.text.secondary} hover:text-blue-600 font-medium transition-colors`}>
                Pricing
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/signin">
                <button className={`${classes.text.secondary} hover:${classes.text.primary} px-4 py-2 font-medium transition-colors`}>
                  Sign In
                </button>
              </Link>
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className={`h-6 w-6 ${classes.text.secondary}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${classes.background.card} border-t ${classes.border}`}>
            <div className="px-4 py-2 space-y-2">
              <Link href="/" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Home</Link>
              <Link href="#how-it-works" className={`block py-2 ${classes.text.secondary} hover:text-cyan-600`}>How It Works</Link>
              <Link href="#categories" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Mining Categories</Link>
              <Link href="/browse" className={`block py-2 ${classes.text.secondary} hover:text-cyan-600`}>Browse Experts</Link>
              <Link href="/pricing" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Pricing</Link>
              <div className={`border-t ${classes.border} pt-2 mt-2`}>
                <Link href="/auth/signin" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Sign In</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Role Selection */}
      <section className={`relative py-20 ${classes.background.page}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              South Africa's Premier Mining Marketplace
            </div>
            
            {/* Main Headlines */}
            <h1 className={`text-4xl md:text-6xl font-bold ${classes.text.primary} mb-6 leading-tight`}>
              Connect Mining 
              <span className="text-blue-600"> Expertise</span> with
              <span className="text-green-600"> Opportunity</span>
            </h1>
            
            <p className={`text-xl ${classes.text.secondary} mb-12 max-w-4xl mx-auto leading-relaxed`}>
              The free-market platform where South African mines find the best consultants, 
              and mining professionals discover their next opportunity. Built for fairness, 
              transparency, and results.
            </p>

            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {successMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${classes.text.primary} mb-1`}>
                    {metric.value}
                  </div>
                  <div className={`text-sm font-medium ${classes.text.secondary} mb-1`}>
                    {metric.label}
                  </div>
                  <div className={`text-xs ${classes.text.muted}`}>
                    {metric.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="mb-20">
            <h2 className={`text-3xl font-bold ${classes.text.primary} text-center mb-4`}>
              Choose Your Role
            </h2>
            <p className={`text-lg ${classes.text.secondary} text-center mb-12 max-w-3xl mx-auto`}>
              Get started with the experience that matches your needs in the South African mining industry
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userRoles.map((role, index) => (
                <div key={index} className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${classes.border} overflow-hidden`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                      {role.icon}
                    </div>
                    
                    <h3 className={`text-xl font-bold ${classes.text.primary} mb-2 group-hover:text-blue-600 transition-colors`}>
                      {role.title}
                    </h3>
                    
                    <p className={`text-sm font-medium ${classes.text.secondary} mb-3`}>
                      {role.subtitle}
                    </p>
                    
                    <p className={`text-sm ${classes.text.muted} mb-6 leading-relaxed`}>
                      {role.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {role.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className={classes.text.secondary}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <Link href={role.href}>
                      <button className={`w-full bg-gradient-to-r ${role.gradient} text-white py-3 px-4 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 shadow-lg hover:shadow-xl`}>
                        {role.buttonText}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

export default function EnhancedHomePage() {
  const { classes } = useThemeClasses()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Enhanced mining categories with Unsplash images
  const miningCategories = [
    {
      title: "Mineral Processing",
      description: "Flotation, leaching, and extraction optimization",
      projects: "3,247 projects",
      price: "From R2,500",
      tags: ["Flotation", "Hydrometallurgy", "Pyrometallurgy"]
    },
    {
      title: "Mine Planning",
      description: "Strategic mine design and operation planning",
      projects: "2,156 projects", 
      price: "From R4,200",
      tags: ["Resource Modeling", "Scheduling", "Optimization"]
    },
    {
      title: "Tailings Management", 
      description: "Environmental compliance and waste management",
      projects: "1,892 projects",
      price: "From R3,800",
      tags: ["TSF Design", "Rehabilitation", "Monitoring"]
    },
    {
      title: "Geological Assessment",
      description: "Resource evaluation and exploration geology",
      projects: "2,934 projects",
      price: "From R3,500",
      tags: ["Resource Estimation", "Exploration", "Sampling"]
    },
    {
      title: "Equipment Selection",
      description: "Mining machinery and technology optimization",
      projects: "1,743 projects",
      price: "From R5,500",
      tags: ["Machinery", "Automation", "Efficiency"]
    },
    {
      title: "Safety & Compliance",
      description: "Mining safety protocols and regulatory compliance",
      projects: "2,234 projects",
      price: "From R2,800",
      tags: ["Safety Systems", "Regulations", "Risk Assessment"]
    }
  ]

  const topConsultants = [
    {
      id: "EXP#JHB001",
      name: "Gold Recovery Specialist",
      rating: 4.9,
      completedProjects: 234,
      specialization: "Hydrometallurgy",
      price: "From R3,500/day",
      badges: ["Top Rated", "Fast Delivery"]
    },
    {
      id: "EXP#CPT002", 
      name: "Mine Planning Expert",
      rating: 4.8,
      completedProjects: 189,
      specialization: "Resource Modeling",
      price: "From R4,200/day",
      badges: ["Verified", "Top Seller"]
    },
    {
      id: "EXP#DBN003",
      name: "Environmental Consultant",
      rating: 4.9,
      completedProjects: 156,
      specialization: "Tailings Management",
      price: "From R3,800/day",
      badges: ["Expert Level", "Quick Response"]
    }
  ]

  const valueProps = [
    {
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: "AI-Matched Experts",
      description: "Our advanced AI algorithm matches you with the perfect mining consultant based on your specific project requirements and budget.",
      stat: "97% match accuracy"
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-600" />,
      title: "Blind Merit-Based Bidding",
      description: "Anonymous bidding ensures fair competition and prevents bias, focusing purely on expertise and value proposition.",
      stat: "100% anonymous"
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: "End-to-End Project Security",
      description: "Enterprise-grade security with encrypted communications, secure file sharing, and escrow payment protection.",
      stat: "Bank-level security"
    }
  ]

  return (
    <div className={`min-h-screen ${classes.background.page}`}>
      {/* Enhanced Navigation */}
      <nav className={`${classes.background.card}/90 backdrop-blur-md border-b ${classes.border} shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Pickaxe className="h-8 w-8 text-blue-600" />
              <span className={`text-2xl font-bold ${classes.text.primary}`}>Dial-a-Met</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`${classes.text.secondary} hover:text-blue-600 font-medium transition-colors`}>
                Home
              </Link>
              <Link href="#how-it-works" className={`${classes.text.secondary} hover:text-cyan-600 font-medium transition-colors`}>
                How It Works
              </Link>
              <Link href="#categories" className={`${classes.text.secondary} hover:text-blue-600 font-medium transition-colors`}>
                Categories
              </Link>
              <Link href="/browse" className={`${classes.text.secondary} hover:text-cyan-600 font-medium transition-colors`}>
                Browse Experts
              </Link>
              <Link href="/dashboard/support" className={`${classes.text.secondary} hover:text-blue-600 font-medium transition-colors`}>
                Support
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/signin">
                <button className={`${classes.text.secondary} hover:${classes.text.primary} px-4 py-2 font-medium transition-colors`}>
                  Sign In
                </button>
              </Link>
              <Link href="/dashboard/mine_client">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className={`h-6 w-6 ${classes.text.secondary}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${classes.background.card} border-t ${classes.border}`}>
            <div className="px-4 py-2 space-y-2">
              <Link href="/" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Home</Link>
              <Link href="#how-it-works" className={`block py-2 ${classes.text.secondary} hover:text-cyan-600`}>How It Works</Link>
              <Link href="#categories" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Categories</Link>
              <Link href="/browse" className={`block py-2 ${classes.text.secondary} hover:text-cyan-600`}>Browse Experts</Link>
              <Link href="/dashboard/support" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Support</Link>
              <div className={`border-t ${classes.border} pt-2 mt-2`}>
                <Link href="/auth/signin" className={`block py-2 ${classes.text.secondary} hover:text-blue-600`}>Sign In</Link>
                <Link href="/dashboard/mine_client" className="block py-2 text-blue-600 font-semibold">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modern Compact Hero Section - Fiverr Style */}
      <section className={`relative py-16 ${classes.background.page}`}>
        {/* Compact Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Compact Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                AI-Powered Mining Expertise
              </div>
              
              {/* Compact Headlines */}
              <h1 className={`text-2xl md:text-3xl font-bold ${classes.text.primary} mb-3 leading-tight`}>
                Find Mining Experts
                <span className="text-blue-600"> On-Demand</span>
              </h1>
              
              <p className={`text-base ${classes.text.secondary} mb-6 leading-relaxed`}>
                Anonymous bidding • AI matching • Expert consultants ready to solve your mining challenges
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/dashboard/mine_client" className="inline-block">
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 shadow-lg">
                    Post Your Request
                  </button>
                </Link>
                <Link href="/browse" className="inline-block">
                  <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-lg font-semibold text-sm transition-all">
                    Browse Experts
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className={`flex items-center space-x-6 text-sm ${classes.text.muted}`}>
                <div className="flex items-center">
                  <span className={`font-semibold ${classes.text.primary}`}>2,500+</span>
                  <span className="ml-1">experts</span>
                </div>
                <div className="flex items-center">
                  <span className={`font-semibold ${classes.text.primary}`}>98%</span>
                  <span className="ml-1">satisfaction</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-slate-900">24hr</span>
                  <span className="ml-1">response</span>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Live Bidding</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <span className="font-medium text-blue-900">EXPERT-MT-4521</span>
                        <div className="text-sm text-blue-600">Gold Recovery Specialist</div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">$3,500</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <span className="font-medium text-slate-700">EXPERT-GE-2890</span>
                        <div className="text-sm text-slate-500">Process Engineer</div>
                      </div>
                      <span className="text-lg font-bold text-slate-600">$4,200</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <span className="font-medium text-slate-700">EXPERT-HY-1567</span>
                        <div className="text-sm text-slate-500">Hydrometallurgy Expert</div>
                      </div>
                      <span className="text-lg font-bold text-slate-600">$3,800</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="text-xs text-slate-500 mb-2">Time remaining: 2h 45m</div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated Elements */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Value Proposition Cards */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              Why Choose Dial-a-Met
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
              Revolutionary Mining Marketplace
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Advanced features designed specifically for the global mining industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 text-blue-600 group-hover:text-cyan-600 transition-colors">
                      {prop.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {prop.description}
                  </p>
                  <div className="inline-flex items-center text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full group-hover:bg-blue-100 transition-colors">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {prop.stat}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Expertise Categories Carousel */}
      <section id="categories" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trending Expertise Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore specialized mining services from verified experts
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {miningCategories.map((category, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={getCategoryImage(category.title)}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">{category.projects}</span>
                    <Link href="/browse">
                      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Consultants Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Top-Rated Mining Consultants
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Work with industry leaders who deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topConsultants.map((consultant, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                <div className="text-center mb-6">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <OptimizedImage
                      src={getConsultantAvatar(index)}
                      alt={consultant.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {consultant.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">
                    {consultant.specialization}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-slate-700">
                      {consultant.rating}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({consultant.completedProjects} projects)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4 justify-center">
                  {consultant.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {consultant.price}
                  </div>
                  <Link href="/browse">
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-medium transition-colors">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
            {/* Mobile App Promotion */}
      <section id="resources" className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Mining Expertise In Your Pocket
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Access the world&apos;s largest mining consultancy marketplace from anywhere. 
                Post projects, manage bids, and collaborate with experts on the go.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex items-center justify-center space-x-3 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl transition-colors">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center justify-center space-x-3 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl transition-colors">
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-blue-200 text-sm">App Downloads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-blue-200 text-sm">App Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-blue-200 text-sm">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <OptimizedImage
                  src={MINING_IMAGES.mobileApp}
                  alt="Mobile App Interface"
                  width={400}
                  height={600}
                  className="mx-auto rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Pickaxe className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Dial-a-Met</span>
              </div>
              <p className="text-slate-400 mb-6">
                The world&apos;s largest marketplace for mining expertise. 
                Connect with verified consultants worldwide.
              </p>
              <div className="flex space-x-4">
                <Globe className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                <Users className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                <TrendingUp className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">For Clients</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/dashboard/mine_client" className="hover:text-white transition-colors">Post a Project</Link></li>
                <li><Link href="/dashboard/consultant" className="hover:text-white transition-colors">Browse Consultants</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/dashboard/testimonials" className="hover:text-white transition-colors">Success Stories</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">For Consultants</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/dashboard/consultant" className="hover:text-white transition-colors">Find Work</Link></li>
                <li><Link href="/dashboard/verification" className="hover:text-white transition-colors">Become Verified</Link></li>
                <li><Link href="/dashboard/training" className="hover:text-white transition-colors">Consultant Guide</Link></li>
                <li><Link href="/dashboard/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/dashboard/support" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Dial-a-Met. All rights reserved. | Mining expertise marketplace trusted by professionals worldwide.</p>
          </div>
        </div>
      </footer>

      {/* Floating Post Project Button */}
      <Link href="/dashboard/mine_client">
        <button className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-110 z-50 group">
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Post Project
          </span>
        </button>
      </Link>
    </div>
  )
}
