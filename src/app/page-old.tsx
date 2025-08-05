import { Pickaxe, Shield, Award, Search, CheckCircle, Star, Smartphone, Download, Menu } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const miningCategories = [
    {
      title: "Gold & Precious Metals",
      description: "Expert consultants for gold, platinum, and precious metal operations",
      projects: "2,847 projects",
      image: "/mining-gold.jpg",
      price: "From R2,500"
    },
    {
      title: "Coal Mining",
      description: "Specialists in coal extraction, processing, and compliance",
      projects: "1,923 projects", 
      image: "/mining-coal.jpg",
      price: "From R3,200"
    },
    {
      title: "Iron Ore & Manganese",
      description: "Iron ore and manganese mining expertise",
      projects: "1,156 projects",
      image: "/mining-iron.jpg", 
      price: "From R4,100"
    },
    {
      title: "Chrome Mining",
      description: "Chrome ore extraction and beneficiation specialists",
      projects: "892 projects",
      image: "/mining-chrome.jpg",
      price: "From R3,800"
    },
    {
      title: "Diamond Mining",
      description: "Diamond extraction and processing consultancy",
      projects: "743 projects",
      image: "/mining-diamond.jpg",
      price: "From R5,500"
    },
    {
      title: "Environmental Compliance",
      description: "Mining environmental impact and rehabilitation",
      projects: "2,234 projects",
      image: "/mining-environment.jpg",
      price: "From R2,800"
    }
  ]

  const topConsultants = [
    {
      name: "Thabo M.",
      specialty: "Gold Processing Expert",
      rating: 4.9,
      projects: 156,
      location: "Johannesburg",
      price: "R4,500/project",
      image: "/consultant-1.jpg"
    },
    {
      name: "Sarah K.", 
      specialty: "Environmental Compliance",
      rating: 4.8,
      projects: 203,
      location: "Cape Town", 
      price: "R3,200/project",
      image: "/consultant-2.jpg"
    },
    {
      name: "Mandla N.",
      specialty: "Coal Mine Optimization", 
      rating: 5.0,
      projects: 89,
      location: "Witbank",
      price: "R5,800/project", 
      image: "/consultant-3.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Pickaxe className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">Dial-a-Met</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-200">
                South Africa
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#categories" className="text-slate-600 hover:text-slate-900">Browse</Link>
              <Link href="#app" className="text-slate-600 hover:text-slate-900">Mobile App</Link>
              <Link href="#business" className="text-slate-600 hover:text-slate-900">For Business</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <button className="text-slate-600 hover:text-slate-900 px-4 py-2">
                  Sign In
                </button>
              </Link>
              <Link href="/auth/signin">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Join
                </button>
              </Link>
              <button className="md:hidden">
                <Menu className="h-6 w-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find the perfect{' '}
                <span className="text-blue-200">mining consultant</span>{' '}
                for your project
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Connect with South Africa&apos;s top mining experts. From gold processing to environmental compliance, get expert help for any mining challenge.
              </p>
              
              {/* Search Bar */}
              <div className="bg-white rounded-lg p-2 flex items-center space-x-2 mb-6">
                <Search className="h-5 w-5 text-slate-400 ml-3" />
                <input
                  type="text"
                  placeholder="What mining service do you need?"
                  className="flex-1 px-3 py-3 text-slate-900 placeholder-slate-500 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                  Search
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Verified experts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Popular mining services</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Gold ore processing</span>
                    <span className="text-blue-200">From R4,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Environmental impact assessment</span>
                    <span className="text-blue-200">From R3,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mine safety auditing</span>
                    <span className="text-blue-200">From R2,800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Geological surveying</span>
                    <span className="text-blue-200">From R5,100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mining Categories */}
      <section id="categories" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular mining services</h2>
            <p className="text-lg text-slate-600">Expert consultants for every mining challenge in South Africa</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {miningCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Pickaxe className="h-16 w-16 text-slate-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{category.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{category.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{category.projects}</span>
                    <span className="font-medium text-slate-900">{category.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Consultants */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Top-rated mining consultants</h2>
            <p className="text-lg text-slate-600">Meet our verified experts from across South Africa</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topConsultants.map((consultant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{consultant.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{consultant.name}</h3>
                    <p className="text-slate-600 text-sm">{consultant.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{consultant.rating}</span>
                  </div>
                  <span>{consultant.projects} projects</span>
                  <span>{consultant.location}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-900">{consultant.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section id="app" className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Take Dial-a-Met with you anywhere
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Manage your mining projects on the go. Connect with experts, track bids, and get work done from anywhere in South Africa.
              </p>
              
              <div className="flex space-x-4 mb-8">
                <button className="flex items-center space-x-3 bg-black hover:bg-gray-900 px-6 py-3 rounded-lg transition-colors">
                  <Download className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs text-slate-300">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 bg-black hover:bg-gray-900 px-6 py-3 rounded-lg transition-colors">
                  <Download className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs text-slate-300">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-slate-300">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Mobile optimized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Secure & reliable</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="flex items-center justify-center h-64">
                  <Smartphone className="h-32 w-32 text-white/20" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Mining expertise at your fingertips</h3>
                  <p className="text-slate-300 text-sm">
                    Post projects, receive bids, and manage consultations - all from your mobile device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to grow your mining business?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of mining companies and consultants who trust Dial-a-Met for their project needs across South Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                Start as a Client
              </button>
            </Link>
            <Link href="/auth/signin">
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Become a Consultant
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Pickaxe className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Dial-a-Met</span>
              </div>
              <p className="text-slate-400 text-sm">
                South Africa&apos;s premier mining consultancy marketplace. Connecting expertise with opportunity.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Clients</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white">How it works</Link></li>
                <li><Link href="#" className="hover:text-white">Post a project</Link></li>
                <li><Link href="#" className="hover:text-white">Browse consultants</Link></li>
                <li><Link href="#" className="hover:text-white">Enterprise solutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Consultants</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white">Find work</Link></li>
                <li><Link href="#" className="hover:text-white">How to bid</Link></li>
                <li><Link href="#" className="hover:text-white">Success stories</Link></li>
                <li><Link href="#" className="hover:text-white">Consultant resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white">About us</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Press</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 Dial-a-Met. All rights reserved. Proudly South African.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
