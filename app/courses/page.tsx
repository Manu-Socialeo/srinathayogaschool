import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yoga Courses | Beginner to Advanced | Srinatha Yoga Shala",
  description: "Explore our yoga programs - from 21-day beginner courses to 300h advanced teacher training. Certified courses in Ashtanga, Hatha, Pranayama & Meditation.",
  keywords: ["yoga courses", "beginner yoga", "intermediate yoga", "advanced yoga", "yoga teacher training", "200h TTC", "300h TTC", "pranayama course", "meditation course", "yoga certification"],
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, ChevronLeft, Star, Calendar, Clock, CheckCircle, Award, Download, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"

// Navigation
const navItems = [
  { name: "Home", href: "/" },
  { name: "Teachers", href: "/teachers" },
  { name: "Courses", href: "/courses" },
  { name: "Shop", href: "/shop" },
]

// All courses
const allCourses = [
  {
    title: "7 Day Chair Yoga Teacher Training",
    rating: 5.0,
    reviews: 28,
    description: "Gentle yoga teacher training using a chair for those with limited mobility. Perfect for seniors and beginners.",
    startDate: "1st Jun",
    duration: "7 Days",
    language: "English",
    price: { inr: 9999, usd: 120 },
    certified: true,
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=400&fit=crop",
    features: ["Chair Asanas", "Teaching Methods", "Certificate"],
    level: "Teacher Training",
  },
  {
    title: "7 Day Wheel Yoga Teacher Training",
    rating: 4.9,
    reviews: 15,
    description: "Yoga teacher training using yoga wheels for deeper stretches and improved flexibility.",
    startDate: "15th Jun",
    duration: "7 Days",
    language: "English",
    price: { inr: 9999, usd: 120 },
    certified: true,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    features: ["Wheel Asanas", "Teaching Methods", "Certificate"],
    level: "Teacher Training",
  },
  {
    title: "21 Days Ashtanga TTC",
    rating: 5.0,
    reviews: 42,
    description: "Intensive 21-day Ashtanga Yoga Teacher Training covering primary series and teaching methodology.",
    startDate: "1st Jul",
    duration: "21 Days",
    language: "English",
    price: { inr: 25000, usd: 300 },
    certified: true,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    features: ["Ashtanga Primary", "Teaching Skills", "Yoga Alliance Cert"],
    level: "Teacher Training",
  },
  {
    title: "21 Days Hatha TTC",
    rating: 5.0,
    reviews: 38,
    description: "Comprehensive 21-day Hatha Yoga Teacher Training with classical asanas and philosophy.",
    startDate: "22nd Jul",
    duration: "21 Days",
    language: "English",
    price: { inr: 25000, usd: 300 },
    certified: true,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    features: ["Hatha Classical", "Yoga Philosophy", "Certificate"],
    level: "Teacher Training",
  },
  {
    title: "50 Hour Yin Yoga TTC",
    rating: 4.8,
    reviews: 22,
    description: "Deep stretching and connective tissue work with Yin Yoga methodology and meridians.",
    startDate: "5th Aug",
    duration: "3 Weeks",
    language: "English",
    price: { inr: 18000, usd: 220 },
    certified: true,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
    features: ["Yin Asanas", "Meridian Theory", "RYT-50 Eligible"],
    level: "Teacher Training",
  },
  {
    title: "200 Hour Yoga TTC",
    rating: 5.0,
    reviews: 156,
    description: "Comprehensive foundation in Ashtanga & Hatha yoga with Yoga Alliance RYT-200 certification.",
    startDate: "1st Sep",
    duration: "4 Weeks",
    language: "English",
    price: { inr: 99000, usd: 1200 },
    certified: true,
    recommended: true,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
    features: ["Anatomy & Physiology", "Teaching Methodology", "Yoga Alliance RYT-200"],
    level: "Teacher Training",
  },
  {
    title: "300 Hour Yoga TTC",
    rating: 4.9,
    reviews: 45,
    description: "Advanced teacher training for experienced practitioners. Deepen your practice and teaching skills.",
    startDate: "1st Nov",
    duration: "6 Weeks",
    language: "English",
    price: { inr: 149000, usd: 1800 },
    certified: true,
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop",
    features: ["Advanced Asanas", "Pranayama Mastery", "RYT-500 Eligible"],
    level: "Teacher Training",
  },
  {
    title: "85 Hours Prenatal Postnatal Yoga TTC",
    rating: 4.8,
    reviews: 35,
    description: "Comprehensive training for teaching yoga to pregnant women and new mothers. Covers anatomy, Garbhasanskar, asanas, and safe modifications.",
    startDate: "1st Jun",
    duration: "30 Days",
    language: "English",
    price: { inr: 18500, usd: 225 },
    certified: true,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
    features: ["Prenatal & Postnatal", "Anatomy & Physiology", "Garbhasanskar"],
    level: "Teacher Training",
  },
]

// Educators
const educators = [
  {
    name: "Radhika Gupta",
    bio: "Radhika was trained by Dr. Balasundra Srinatha and BNS Iyengar in Mysore in 2017. She has an Honours degree in Psychology from Lady Shree Ram College, Delhi. She combines the tools of modern science and ancient scriptures to help you grow better.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Akshay Jain",
    bio: "Akshay, an inner-work teacher at Srinatha Yoga Shala, discovered his passion for yoga at the age of 20. He has trained as a Yoga Acharya under Swami Prabhod in Mysore in the philosophy and practices of Meditation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
]

export default function CoursesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Beginner", "Intermediate", "Teacher Training", "Specialized"]

  const filteredCourses = activeFilter === "All" 
    ? allCourses 
    : allCourses.filter(course => course.level === activeFilter)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm" : "bg-white/80 backdrop-blur-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Srinatha Yoga Shala" width={48} height={48} className="h-12 w-auto" />
              <span className="font-serif text-xl font-semibold text-[#264020]">Srinatha Yoga Shala</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className={`font-medium transition-colors ${item.href === "/courses" ? "text-[#264020]" : "text-[#264020]/60 hover:text-[#264020]"}`}>
                  {item.name}
                </Link>
              ))}
              <Link href="/dashboard">
                <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white px-6">Student Login</Button>
              </Link>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#264020]" aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#FAF8F5] py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-[#264020]/60 hover:text-[#264020] mb-6 transition-colors">
              <ChevronLeft size={20} />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
            </div>
            
            <h1 className="font-serif text-4xl lg:text-5xl text-[#264020] mb-4">Satvic Yoga</h1>
            <p className="text-[#264020]/60 mb-6">The Yoga Wing of Srinatha Movement</p>
            
            <p className="text-[#264020]/70 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
              At Satvic Yoga, we bring ancient yogic wisdom into your modern lifestyle. 
              Apart from sharing Yogic Philosophy, we focus on four essential practices: 
              asanas, breath-work, chanting, and dhyana which we call the ABCD of Yoga.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <p className="font-serif text-3xl text-[#264020] font-bold">200k+</p>
                <p className="text-[#264020]/60 text-sm">Lives Transformed</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-[#264020] font-bold">1 Million+</p>
                <p className="text-[#264020]/60 text-sm">People Participated</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-[#264020] font-bold">10 Years+</p>
                <p className="text-[#264020]/60 text-sm">Teaching Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Badges */}
        <section className="py-6 bg-white border-y border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 bg-[#FAF8F5] px-4 py-2 rounded border border-[#E5E5E5]">
              <Award className="w-5 h-5 text-[#264020]" />
              <span className="text-sm font-medium text-[#264020]">Yoga Alliance RYS Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF8F5] px-4 py-2 rounded border border-[#E5E5E5]">
              <CheckCircle className="w-5 h-5 text-[#264020]" />
              <span className="text-sm font-medium text-[#264020]">YACP Accredited</span>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-[#264020] text-white"
                      : "bg-[#FAF8F5] text-[#264020] hover:bg-[#264020]/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl text-[#264020]">Upcoming Yoga Programs</h2>
              <p className="text-[#264020]/60">Deepen your learnings over 3 levels</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="satvic-card bg-white rounded overflow-hidden shadow-sm border border-[#E5E5E5]"
                >
                  <div className="relative h-48">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                    {course.recommended && (
                      <div className="absolute top-3 right-3 bg-[#264020] text-white text-xs px-3 py-1 rounded">
                        Highly Recommended
                      </div>
                    )}
                    {course.certified && (
                      <div className="absolute top-3 left-3 bg-white text-[#264020] text-xs px-3 py-1 rounded flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Yoga Alliance
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-[#264020]/80 text-white text-xs px-2 py-1 rounded">
                      {course.level}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-xl text-[#264020] mb-2">{course.title}</h3>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#264020] text-[#264020]" />
                      ))}
                      <span className="text-sm text-[#264020]/60 ml-1">
                        ({course.rating}) {course.reviews} Reviews
                      </span>
                    </div>

                    <p className="text-[#264020]/70 text-sm mb-4 leading-relaxed">{course.description}</p>

                    <div className="flex items-center gap-3 text-sm text-[#264020]/60 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {course.startDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-1 mb-4">
                      {course.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#264020]/60">
                          <CheckCircle className="w-3 h-3 text-[#264020]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                      <div>
                        <span className="text-[#264020] font-bold text-lg">₹{course.price.inr.toLocaleString()}</span>
                        <span className="text-[#264020]/50 text-sm ml-2">/ ${course.price.usd}</span>
                      </div>
                      <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white text-sm">
                        Register Now
                      </Button>
                    </div>

                    {/* Download Syllabus */}
                    <button className="w-full mt-3 flex items-center justify-center gap-2 text-[#264020] text-sm hover:underline">
                      <Download className="w-4 h-4" />
                      Download Syllabus
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet The Educators */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-[#264020] mb-4">Meet The Educators</h2>
              <p className="text-[#264020]/60">Leading Srinatha Movement&apos;s Yoga Wing</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {educators.map((educator, index) => (
                <motion.div
                  key={educator.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#FAF8F5] rounded p-6 border border-[#E5E5E5]"
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 shrink-0">
                      <Image src={educator.image} alt={educator.name} fill className="object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#264020] mb-1">{educator.name}</h3>
                      <p className="text-[#264020]/60 text-sm leading-relaxed">{educator.bio}</p>
                      <button className="text-[#264020] font-medium text-sm mt-2 hover:underline">Read more</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-16 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#264020] font-serif text-2xl mb-2">रं</p>
            <h2 className="font-serif text-2xl text-[#264020] mb-4">Satvic Yoga On Instagram</h2>
            <p className="text-[#264020]/60 mb-6">For daily yogic wisdom and inspiration</p>
            <a href="https://www.instagram.com/yogawithsrinatha/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white">
                <Instagram className="mr-2 h-4 w-4" />
                Visit The Instagram Page
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
