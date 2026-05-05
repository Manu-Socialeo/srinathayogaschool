import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Srinatha Yoga Shala | Traditional Mysore Yoga Online | Yoga Teacher Training",
  description: "Transform your life with traditional Mysore yoga online. Join 200k+ students in certified yoga teacher training, meditation, and pranayama courses. Yoga Alliance accredited.",
  keywords: ["yoga teacher training", "online yoga", "Mysore yoga", "Ashtanga yoga", "Hatha yoga", "yoga certification", "200h TTC", "300h TTC", "pranayama", "meditation", "yoga Alliance RYS"],
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Star, Clock, Calendar, Globe, ArrowUp, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Stats
const stats = [
  { value: "200k+", label: "Lives Transformed" },
  { value: "1 Million+", label: "People Participated" },
  { value: "10 Years+", label: "Teaching Experience" },
]

// Courses - Satvic horizontal card style
const courses = [
  {
    title: "Yoga Sadhana Beginner",
    description: "Learn yoga philosophy, asanas and meditations to take charge of your joy!",
    startDate: "22nd Jun",
    startsIn: 4,
    duration: "21 Days",
    language: "Multiple",
    price: 790,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
  {
    title: "Yoga Sadhana Intermediate",
    description: "Deepen your yoga with intermediate asanas and meditations, you are ready to be a yogi!",
    startDate: "18th May",
    startsIn: 2,
    duration: "14 Days",
    language: "English",
    price: 990,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  },
  {
    title: "Yoga Sadhana Advanced",
    description: "Dive deeper into your Pranamayakosha and understand the science of Chakras.",
    startDate: "22nd Jun",
    startsIn: 4,
    duration: "10 Days",
    language: "English",
    price: 1490,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
  },
]

// Educators with colored backgrounds (matching Satvic style)
const educators = [
  {
    name: "Subah Saraf",
    role: "Co-founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=top",
    bgColor: "#8B9D83", // Sage green
  },
  {
    name: "Harshvardhan Saraf",
    role: "Co-founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=top",
    bgColor: "#7BA3A8", // Teal
  },
  {
    name: "Radhika Gupta",
    role: "Co-Leader of Yoga Wing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=top",
    bgColor: "#C4A484", // Tan
  },
  {
    name: "Akshay Jain",
    role: "Co-Leader of Yoga Wing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=top",
    bgColor: "#8B8B6B", // Olive
  },
  {
    name: "Rajat Jadon",
    role: "Host of 5AM Challenge & Co-Leader of the Youth Wing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=top",
    bgColor: "#A89F91", // Khaki
  },
]

// Instagram posts
const instagramPosts = [
  { title: "Boost Manipura Chakra for Self confidence", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop" },
  { title: "Improve your Gut health", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=300&fit=crop" },
  { title: "Benefits of Cold Shower", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&h=300&fit=crop" },
  { title: "How to balance Chakras", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=300&h=300&fit=crop" },
]

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-[#FAF8F5] pt-20">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29547?w=1920&h=1080&fit=crop"
              alt="Yoga practice"
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#264020] font-medium mb-4 tracking-wide text-sm">
                THE YOGA WING OF SRINATHA MOVEMENT
              </p>
              
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="mx-auto mb-8"
              />
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#264020] leading-tight mb-6 text-balance">
                Traditional Mysore Yoga, Taught Online for the Modern World
              </h1>
              
              <p className="text-lg text-[#264020]/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                At Srinatha Yoga Shala, we bring ancient yogic wisdom into your modern lifestyle. 
                Apart from sharing Yogic Philosophy, we focus on four essential practices: 
                asanas, breath-work, chanting, and dhyana which we call the ABCD of Yoga.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/courses">
                  <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white px-8 py-6 text-lg">
                    Explore Programs
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/teachers">
                  <Button
                    variant="outline"
                    className="border-[#264020] text-[#264020] hover:bg-[#264020] hover:text-white px-8 py-6 text-lg"
                  >
                    Meet The Guru
                  </Button>
                </Link>
              </div>

              {/* Certification Badges */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow-sm border border-[#E5E5E5]">
                  <Award className="w-5 h-5 text-[#264020]" />
                  <span className="text-sm font-medium text-[#264020]">Yoga Alliance RYS</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow-sm border border-[#E5E5E5]">
                  <CheckCircle className="w-5 h-5 text-[#264020]" />
                  <span className="text-sm font-medium text-[#264020]">YACP Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p className="font-serif text-4xl lg:text-5xl text-[#264020] font-bold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[#264020]/60 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Programs - Satvic Horizontal Cards */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl text-[#264020] mb-4">
                Upcoming Yoga Programs
              </h2>
              <p className="text-[#264020]/60 max-w-2xl mx-auto">
                Deepen your learnings over 3 levels
              </p>
            </div>

            <div className="space-y-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E5E5] flex flex-col md:flex-row"
                >
                  {/* Image Section */}
                  <div className="relative md:w-2/5 h-64 md:h-auto">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    {/* Starts in Badge */}
                    <div className="absolute top-4 left-4 bg-white rounded shadow-sm px-3 py-2">
                      <p className="text-[#264020]/60 text-xs">Starts in</p>
                      <p className="text-[#264020] font-bold">{course.startsIn} Days</p>
                    </div>
                    {/* Small preview images */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <div className="w-16 h-12 bg-[#264020]/20 rounded overflow-hidden">
                        <Image
                          src={course.image}
                          alt="Preview"
                          width={64}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="font-serif text-2xl text-[#264020] mb-3 italic">
                      {course.title}
                    </h3>
                    
                    <p className="text-[#264020]/70 mb-6 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Pills */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] px-4 py-2 rounded-full">
                        <Calendar className="w-4 h-4 text-[#264020]/60" />
                        <span className="text-[#264020] text-sm">{course.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] px-4 py-2 rounded-full">
                        <Clock className="w-4 h-4 text-[#264020]/60" />
                        <span className="text-[#264020] text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] px-4 py-2 rounded-full">
                        <Globe className="w-4 h-4 text-[#264020]/60" />
                        <span className="text-[#264020] text-sm">{course.language}</span>
                      </div>
                    </div>

                    {/* Register Button */}
                    <div>
                      <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white px-8 py-5 text-base">
                        Register Now <span className="ml-2">&#8377;{course.price}</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/courses">
                <Button variant="outline" className="border-[#264020] text-[#264020] hover:bg-[#264020] hover:text-white">
                  View All Programs
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#264020] font-serif text-2xl mb-2">&#x0930;&#x0902;</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-[#264020] mb-4">
                Srinatha Yoga On Instagram
              </h2>
              <p className="text-[#264020]/60">For daily yogic wisdom and inspiration</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {instagramPosts.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative aspect-square rounded overflow-hidden cursor-pointer group"
                >
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-[#264020]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <p className="text-white text-sm text-center font-medium">{post.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <a href="https://www.instagram.com/yogawithsrinatha/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#264020] hover:bg-[#3a5a30] text-white">
                  Visit The Instagram Page
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Meet The Educators - Colored Boxes with Heads Popping Out */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl text-[#264020] mb-4">
                Meet The Educators
              </h2>
              <p className="text-[#264020]/60">Leading Srinatha Movement&apos;s Yoga Wing</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {educators.map((educator, index) => (
                <motion.div
                  key={educator.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center w-40 md:w-48 bg-white rounded-2xl p-4"
                >
                  {/* Colored box with head popping out */}
                  <div className="relative mb-4">
                    {/* Colored background box */}
                    <div 
                      className="w-36 h-48 md:w-44 md:h-56 rounded-lg"
                      style={{ backgroundColor: educator.bgColor }}
                    />
                    {/* Image positioned to pop out above the box */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-56 md:w-40 md:h-64">
                      <Image
                        src={educator.image}
                        alt={educator.name}
                        fill
                        className="object-cover object-top"
                        style={{ objectPosition: "top" }}
                      />
                    </div>
                  </div>
                  
                  {/* Name and role */}
                  <h3 className="font-serif text-[#264020] font-medium text-center">
                    {educator.name}
                  </h3>
                  <p className="text-[#264020]/60 text-xs text-center leading-relaxed mt-1">
                    {educator.role}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/teachers">
                <Button variant="outline" className="border-[#264020] text-[#264020] hover:bg-[#264020] hover:text-white">
                  Meet The Full Team
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        
      </main>

      <Footer />

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#264020] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#3a5a30] transition-colors z-50"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      {/* WhatsApp Widget */}
      <a
        href="https://wa.me/919886512083"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors z-50"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  )
}
