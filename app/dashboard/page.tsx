import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Dashboard | My Courses | Srinatha Yoga Shala",
  description: "Access your yoga courses, track progress, view certificates, and join live sessions. Continue your yoga journey with Srinatha Yoga Shala.",
  keywords: ["student dashboard", "yoga student portal", "my courses", "yoga progress", "certificate", "live yoga classes"],
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Award,
  Play,
  ChevronRight,
  Clock,
  CheckCircle,
  Circle,
  Menu,
  Home,
  LogOut,
  Bell,
  Settings
} from "lucide-react"
import { Footer } from "@/components/footer"

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuItems = [
    { icon: BookOpen, label: "My Courses", href: "/dashboard", active: true },
    { icon: Calendar, label: "Practice Calendar", href: "/dashboard/calendar", active: false },
    { icon: FileText, label: "Resources", href: "/dashboard/resources", active: false },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates", active: false },
  ]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-50 
        bg-[#264020]
        transform transition-transform duration-300
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Srinatha Yoga Shala" width={40} height={40} className="brightness-0 invert" />
            <span className="text-white font-serif text-lg">Srinatha Yoga Shala</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${
                    item.active ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <Home size={18} />
            Back to Home
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

// Top Bar
function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="bg-white border-b border-[#E5E5E5] px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 text-[#264020] hover:bg-[#FAF8F5] rounded transition-colors">
            <Menu size={24} />
          </button>
          <div>
            <h1 className="font-serif text-xl text-[#264020]">Welcome back, Student</h1>
            <p className="text-[#264020]/60 text-sm">Continue your yoga journey</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#264020]/60 hover:text-[#264020] hover:bg-[#FAF8F5] rounded transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#264020] rounded-full"></span>
          </button>
          <button className="p-2 text-[#264020]/60 hover:text-[#264020] hover:bg-[#FAF8F5] rounded transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 bg-[#264020] rounded-full flex items-center justify-center text-white font-medium">
            S
          </div>
        </div>
      </div>
    </header>
  )
}

// Resume Practice Card
function ResumePracticeCard() {
  return (
    <div className="bg-white rounded border border-[#E5E5E5] overflow-hidden">
      <div className="p-6 border-b border-[#E5E5E5]">
        <h2 className="font-serif text-lg text-[#264020] mb-1">Resume Practice</h2>
        <p className="text-[#264020]/60 text-sm">Continue where you left off</p>
      </div>
      
      <div className="relative aspect-video bg-[#264020]">
        <Image
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
          alt="Yoga Practice"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group">
            <Play size={32} className="text-[#264020] ml-1 group-hover:text-[#3a5a30] transition-colors" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/60 backdrop-blur-sm rounded p-3">
            <h3 className="text-white font-medium text-sm mb-1">Module 3: Sun Salutation B</h3>
            <p className="text-white/70 text-xs">200h TTC - Week 2</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-[#FAF8F5]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#264020]/60 text-sm">Progress</span>
          <span className="text-[#264020] text-sm font-medium">45%</span>
        </div>
        <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
          <div className="h-full bg-[#264020] rounded-full" style={{ width: "45%" }}></div>
        </div>
      </div>
    </div>
  )
}

// Course Progress Tracker
function CourseProgressTracker() {
  const modules = [
    { name: "Introduction to Ashtanga", completed: true, duration: "2h 30m" },
    { name: "Yoga Philosophy & History", completed: true, duration: "3h 15m" },
    { name: "Sun Salutation Series", completed: false, current: true, duration: "4h 00m" },
    { name: "Standing Sequence", completed: false, duration: "5h 30m" },
    { name: "Seated Postures", completed: false, duration: "6h 00m" },
    { name: "Finishing Sequence", completed: false, duration: "3h 45m" },
    { name: "Pranayama Fundamentals", completed: false, duration: "4h 00m" },
    { name: "Teaching Methodology", completed: false, duration: "8h 00m" },
  ]

  return (
    <div className="bg-white rounded border border-[#E5E5E5]">
      <div className="p-6 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-lg text-[#264020]">200h Teacher Training</h2>
            <p className="text-[#264020]/60 text-sm">Ashtanga & Hatha Foundation</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-serif text-[#264020]">2/8</div>
            <div className="text-[#264020]/60 text-xs">Modules Complete</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
            <div className="h-full bg-[#264020] rounded-full" style={{ width: "25%" }}></div>
          </div>
          <span className="text-[#264020] text-sm font-medium">25%</span>
        </div>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto">
        <ul className="space-y-2">
          {modules.map((module, idx) => (
            <li 
              key={idx}
              className={`flex items-center gap-3 p-3 rounded transition-colors ${
                module.current ? "bg-[#264020]/10 border border-[#264020]" : "hover:bg-[#FAF8F5]"
              }`}
            >
              {module.completed ? (
                <CheckCircle size={20} className="text-[#264020] shrink-0" />
              ) : module.current ? (
                <div className="w-5 h-5 border-2 border-[#264020] rounded-full flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-[#264020] rounded-full"></div>
                </div>
              ) : (
                <Circle size={20} className="text-[#E5E5E5] shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className={`text-sm ${module.completed || module.current ? "text-[#264020]" : "text-[#264020]/60"}`}>
                  {module.name}
                </div>
                <div className="text-[#264020]/60 text-xs flex items-center gap-1">
                  <Clock size={10} />
                  {module.duration}
                </div>
              </div>
              {module.current && (
                <span className="text-[#264020] text-xs font-medium px-2 py-1 bg-[#264020]/10 rounded">
                  In Progress
                </span>
              )}
              <ChevronRight size={16} className="text-[#264020]/60 shrink-0" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Upcoming Classes
function UpcomingClasses() {
  const classes = [
    { name: "Live Ashtanga Primary", time: "Tomorrow, 6:00 AM IST", type: "Live" },
    { name: "Pranayama Session", time: "Tomorrow, 7:30 AM IST", type: "Live" },
    { name: "Q&A with Dr. Srinatha", time: "Friday, 7:30 AM IST", type: "Live" },
  ]

  return (
    <div className="bg-white rounded border border-[#E5E5E5]">
      <div className="p-6 border-b border-[#E5E5E5]">
        <h2 className="font-serif text-lg text-[#264020]">Upcoming Classes</h2>
      </div>
      <div className="p-4">
        <ul className="space-y-3">
          {classes.map((cls, idx) => (
            <li key={idx} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded">
              <div>
                <div className="text-sm text-[#264020] font-medium">{cls.name}</div>
                <div className="text-[#264020]/60 text-xs flex items-center gap-1 mt-1">
                  <Clock size={10} />
                  {cls.time}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#264020] text-xs font-medium px-2 py-1 bg-[#264020]/10 rounded flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#264020] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#264020]"></span>
                  </span>
                  {cls.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/dashboard/calendar" className="block mt-4 text-center text-[#264020] text-sm hover:underline">
          View Full Calendar
        </Link>
      </div>
    </div>
  )
}

// Quick Stats
function QuickStats() {
  const stats = [
    { label: "Hours Practiced", value: "24h", icon: Clock },
    { label: "Classes Attended", value: "18", icon: BookOpen },
    { label: "Current Streak", value: "7 days", icon: Calendar },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded border border-[#E5E5E5] p-4 text-center">
          <stat.icon className="w-6 h-6 text-[#264020] mx-auto mb-2" />
          <div className="text-xl font-serif text-[#264020]">{stat.value}</div>
          <div className="text-[#264020]/60 text-xs">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Main Dashboard
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 lg:p-8">
          <div className="mb-6">
            <QuickStats />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ResumePracticeCard />
              <CourseProgressTracker />
            </div>

            <div className="space-y-6">
              <UpcomingClasses />
              
              {/* Resources */}
              <div className="bg-white rounded border border-[#E5E5E5]">
                <div className="p-6 border-b border-[#E5E5E5]">
                  <h2 className="font-serif text-lg text-[#264020]">Resources</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="flex items-center gap-3 p-3 hover:bg-[#FAF8F5] rounded transition-colors">
                        <FileText size={18} className="text-[#264020]" />
                        <span className="text-sm text-[#264020]">Asana Manual PDF</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="flex items-center gap-3 p-3 hover:bg-[#FAF8F5] rounded transition-colors">
                        <FileText size={18} className="text-[#264020]" />
                        <span className="text-sm text-[#264020]">Sanskrit Chanting Guide</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="flex items-center gap-3 p-3 hover:bg-[#FAF8F5] rounded transition-colors">
                        <FileText size={18} className="text-[#264020]" />
                        <span className="text-sm text-[#264020]">Anatomy Reference</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className="bg-[#264020] rounded p-6 text-white">
                <Award className="w-8 h-8 mb-4 text-white/80" />
                <h3 className="font-serif text-lg mb-2">Your Certificate Awaits</h3>
                <p className="text-white/70 text-sm mb-4">
                  Complete your 200h TTC to receive your Yoga Alliance certified certificate.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <span className="text-sm">25%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
