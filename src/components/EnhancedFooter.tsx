'use client'

import Link from 'next/link'
import { 
  Pickaxe, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  TrendingUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EnhancedFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    'For Clients': [
      { label: 'Post a Project', href: '/auth/signin' },
      { label: 'Browse Consultants', href: '/consultants' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Pricing', href: '/pricing' },
    ],
    'For Consultants': [
      { label: 'Find Work', href: '/auth/signin' },
      { label: 'Become Verified', href: '/verification' },
      { label: 'Consultant Guide', href: '/consultant-guide' },
      { label: 'Community', href: '/community' },
      { label: 'Resources', href: '/resources' },
    ],
    'Categories': [
      { label: 'Mineral Processing', href: '/categories/processing' },
      { label: 'Mine Planning', href: '/categories/planning' },
      { label: 'Environmental', href: '/categories/environmental' },
      { label: 'Safety & Compliance', href: '/categories/safety' },
      { label: 'All Categories', href: '/categories' },
    ],
    'Support': [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ]
  }

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  ]

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: 'support@dial-a-met.com' },
    { icon: <Phone className="w-4 h-4" />, text: '+27 11 123 4567' },
    { icon: <MapPin className="w-4 h-4" />, text: 'Johannesburg, South Africa' },
  ]

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="bg-blue-500 rounded-full w-2 h-2 opacity-20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Pickaxe className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-bold">Dial-a-Met</span>
              </div>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                The world&apos;s largest marketplace for mining expertise. Connect with verified 
                consultants worldwide and get competitive bids on your mining projects with 
                complete anonymity and security.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-slate-400">
                    <div className="p-1 bg-slate-800 rounded">
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all duration-200 transform hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg font-semibold mb-6 text-white">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                <p className="text-slate-400">
                  Get the latest mining industry insights and project opportunities delivered to your inbox.
                </p>
              </div>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-slate-400 text-sm">
                <span>&copy; 2025 Dial-a-Met. All rights reserved.</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>Trusted by 15,000+ professionals</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-slate-400 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>2,500+ Expert Consultants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>98% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  )
}
