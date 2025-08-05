'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useThemeClasses } from '@/components/theme/DialAMetThemeProvider'
import { 
  GraduationCap, 
  Play,
  BookOpen,
  Clock,
  Star,
  Award,
  Search,
  Bookmark,
  TrendingUp,
  CheckCircle,
  Trophy,
  Target,
  Zap
} from 'lucide-react'

interface Course {
  id: string
  title: string
  instructor: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  lessons: number
  enrolled: number
  rating: number
  price: number
  thumbnail: string
  progress?: number
  isEnrolled?: boolean
  skillTags: string[]
  certificationType: 'Standard' | 'Professional' | 'Expert'
}

interface TrainingStats {
  coursesCompleted: number
  hoursLearned: number
  certificatesEarned: number
  skillsAcquired: number
  currentStreak: number
  totalPoints: number
}

const mockTrainingStats: TrainingStats = {
  coursesCompleted: 12,
  hoursLearned: 248,
  certificatesEarned: 8,
  skillsAcquired: 24,
  currentStreak: 7,
  totalPoints: 1850
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Mining Safety Fundamentals',
    instructor: 'Dr. Sarah Johnson',
    category: 'Safety & Compliance',
    level: 'Beginner',
    duration: '8 hours',
    lessons: 12,
    enrolled: 1247,
    rating: 4.8,
    price: 199,
    thumbnail: '/api/placeholder/300/200',
    progress: 65,
    isEnrolled: true,
    skillTags: ['MSHA Compliance', 'Risk Assessment', 'Emergency Procedures'],
    certificationType: 'Professional'
  },
  {
    id: '2',
    title: 'Advanced Flotation Techniques',
    instructor: 'Prof. Michael Chen',
    category: 'Process Engineering',
    level: 'Advanced',
    duration: '15 hours',
    lessons: 24,
    enrolled: 892,
    rating: 4.9,
    price: 399,
    thumbnail: '/api/placeholder/300/200',
    progress: 30,
    isEnrolled: true,
    skillTags: ['Flotation Optimization', 'Process Control', 'Equipment Design'],
    certificationType: 'Expert'
  },
  {
    id: '3',
    title: 'Sustainable Mining Practices',
    instructor: 'Dr. Emma Rodriguez',
    category: 'Environmental',
    level: 'Intermediate',
    duration: '12 hours',
    lessons: 18,
    enrolled: 1534,
    rating: 4.7,
    price: 299,
    thumbnail: '/api/placeholder/300/200',
    skillTags: ['Environmental Impact', 'Green Technology', 'Regulatory Compliance'],
    certificationType: 'Professional'
  }
]

const categories = ['All Courses', 'Safety & Compliance', 'Process Engineering', 'Environmental']
const skillLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

export default function TrainingDashboard() {
  const { classes } = useThemeClasses()
  const [selectedCategory, setSelectedCategory] = useState('All Courses')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesLevel && matchesSearch
  })

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    trend, 
    color = 'blue' 
  }: { 
    title: string
    value: string | number
    icon: React.ReactNode
    trend?: string
    color?: string
  }) => (
    <div className={`${classes.card} p-6 hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${classes.text.secondary}`}>{title}</p>
          <p className={`text-2xl font-bold ${classes.text.primary} mt-1`}>{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm text-green-600 dark:text-green-400`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </div>
          )}
        </div>
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
        `}>
          {icon}
        </div>
      </div>
    </div>
  )

  const CourseCard = ({ course }: { course: Course }) => (
    <div className={`${classes.card} overflow-hidden hover:shadow-xl transition-all duration-300`}>
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-800/30 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${course.isEnrolled ? 'bg-green-500 dark:bg-green-600' : 'bg-blue-500 dark:bg-blue-600'}
          `}>
            {course.isEnrolled ? <CheckCircle className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
          </div>
        </div>
        {course.isEnrolled && course.progress && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2">
            <div className="flex items-center justify-between text-xs">
              <span className={classes.text.secondary}>Progress</span>
              <span className={classes.text.primary}>{course.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className={`font-semibold ${classes.text.primary}`}>{course.title}</h3>
            <p className={`text-sm ${classes.text.secondary} mt-1`}>by {course.instructor}</p>
          </div>
          <button className={`p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 ${classes.text.secondary}`}>
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {course.lessons} lessons
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
            {course.rating}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-lg font-bold ${classes.text.primary}`}>
            ${course.price}
          </span>
          
          <button className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${course.isEnrolled 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }
          `}>
            {course.isEnrolled ? 'Continue' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout 
      title="Training Center" 
      subtitle="Enhance your mining expertise with professional courses"
      userRole="consultant"
      userName="John Expert"
    >
      <div className="space-y-8">
        {/* Training Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <StatCard
            title="Completed"
            value={mockTrainingStats.coursesCompleted}
            icon={<GraduationCap className="w-6 h-6" />}
            trend="+2 this month"
          />
          <StatCard
            title="Hours"
            value={mockTrainingStats.hoursLearned}
            icon={<Clock className="w-6 h-6" />}
            trend="+18 this week"
          />
          <StatCard
            title="Certificates"
            value={mockTrainingStats.certificatesEarned}
            icon={<Award className="w-6 h-6" />}
            trend="+1 new"
          />
          <StatCard
            title="Skills"
            value={mockTrainingStats.skillsAcquired}
            icon={<Target className="w-6 h-6" />}
            trend="+3 this month"
          />
          <StatCard
            title="Streak"
            value={`${mockTrainingStats.currentStreak} days`}
            icon={<Zap className="w-6 h-6" />}
            trend="Keep it up!"
          />
          <StatCard
            title="Points"
            value={mockTrainingStats.totalPoints}
            icon={<Trophy className="w-6 h-6" />}
            trend="+125 this week"
          />
        </div>

        {/* Course Catalog */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${classes.text.primary}`}>Available Courses</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border text-sm ${classes.input}`}
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 rounded-lg border text-sm ${classes.input}`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={`px-4 py-2 rounded-lg border text-sm ${classes.input}`}
              >
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className={`text-center py-12 ${classes.text.secondary}`}>
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
