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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-4xl font-bold ${classes.text.primary} mb-6`}>
              How Dial-a-Met Works
            </h2>
            <p className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}>
              A simple, transparent process designed for the South African mining industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Post Your Project",
                description: "Mining companies describe their challenge, requirements, and budget range",
                icon: <Plus className="w-8 h-8 text-blue-600" />
              },
              {
                step: "02", 
                title: "Receive Anonymous Bids",
                description: "Qualified consultants submit competitive, merit-based proposals",
                icon: <Eye className="w-8 h-8 text-green-600" />
              },
              {
                step: "03",
                title: "Choose & Collaborate",
                description: "Select the best proposal and work directly with your chosen expert",
                icon: <UserCheck className="w-8 h-8 text-purple-600" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {step.icon}
                </div>
                <div className={`text-sm font-bold ${classes.text.muted} mb-2`}>
                  STEP {step.step}
                </div>
                <h3 className={`text-xl font-bold ${classes.text.primary} mb-4`}>
                  {step.title}
                </h3>
                <p className={`${classes.text.secondary} leading-relaxed`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mining Categories Section */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${classes.text.primary} mb-4`}>
              South African Mining Expertise
            </h2>
            <p className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}>
              Specialized services for South Africa's diverse mining sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {miningCategories.map((category, index) => (
              <div key={index} className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border ${classes.border}`}>
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                    {category.title}
                  </h3>
                  <p className={`${classes.text.secondary} mb-4`}>
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className={classes.text.muted}>{category.projects}</span>
                    <span className={`font-semibold ${classes.text.primary}`}>{category.price}</span>
                  </div>
                  
                  <div className={`text-xs ${classes.text.muted} mb-4`}>
                    {category.expertise}
                  </div>
                  
                  <Link href="/browse">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 shadow-lg">
                      Find Experts
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Built for Trust & Transparency
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Enterprise-grade security and compliance for South Africa's mining industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-blue-400" />,
                title: "Anonymous Bidding",
                description: "Completely anonymous bidding process ensures fair competition based purely on merit and expertise",
                features: ["No bias", "Merit-based", "Fair pricing"]
              },
              {
                icon: <Lock className="w-12 h-12 text-green-400" />,
                title: "Secure Payments",
                description: "Escrow protection, encrypted transactions, and compliance with South African financial regulations",
                features: ["POPI compliant", "Bank-level security", "Escrow protection"]
              },
              {
                icon: <UserCheck className="w-12 h-12 text-purple-400" />,
                title: "Verified Experts",
                description: "All consultants undergo strict verification including qualifications, experience, and references",
                features: ["ECSA verified", "Reference checked", "Portfolio reviewed"]
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-6 p-4 bg-white/10 rounded-2xl w-fit mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {feature.features.map((item, itemIndex) => (
                    <span key={itemIndex} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Mining Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join South Africa's leading mining marketplace today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup?role=mine">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
                Post Your First Project
              </button>
            </Link>
            <Link href="/auth/signup?role=consultant">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
                Start Consulting
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Pickaxe className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Dial-a-Met</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                South Africa's premier mining marketplace. Connecting expertise with opportunity 
                across the continent's most diverse mining landscape.
              </p>
              <div className="flex space-x-4">
                <Globe className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Users className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Mining Companies</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/auth/signup?role=mine" className="hover:text-white transition-colors">Post Projects</Link></li>
                <li><Link href="/browse" className="hover:text-white transition-colors">Find Consultants</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Consultants</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/auth/signup?role=consultant" className="hover:text-white transition-colors">Find Projects</Link></li>
                <li><Link href="/consultant-resources" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 Dial-a-Met. All rights reserved. Built for South African mining excellence.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
