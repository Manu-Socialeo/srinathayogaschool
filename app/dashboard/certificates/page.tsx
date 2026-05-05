import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certificates | Student Dashboard | Srinatha Yoga Shala",
  description: "View and download your yoga course completion certificates.",
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Award, Download, Share2, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const certificates = [
  {
    id: 1,
    name: "200h Yoga Teacher Training",
    issuer: "Yoga Alliance RYS 200",
    date: "15th March 2024",
    status: "Completed",
    progress: 100,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Yoga Sadhana Advanced",
    issuer: "Srinatha Yoga Shala",
    date: "Expected: June 2025",
    status: "In Progress",
    progress: 45,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Pranayama & Meditation Course",
    issuer: "Srinatha Yoga Shala",
    date: "Expected: August 2025",
    status: "In Progress",
    progress: 20,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  },
]

const achievements = [
  { title: "30-Day Streak", icon: "🔥", date: "Earned on 10th April 2024" },
  { title: "100 Hours Practiced", icon: "⏱️", date: "Earned on 25th March 2024" },
  { title: "Live Session Attendee", icon: "🎥", date: "Earned on 15th February 2024" },
  { title: "Course Completion", icon: "🎓", date: "Earned on 15th March 2024" },
]

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-[#FAF8F5] rounded-lg">
              <ChevronLeft size={24} className="text-[#264020]" />
            </Link>
            <div>
              <h1 className="font-serif text-xl text-[#264020]">Certificates</h1>
              <p className="text-[#264020]/60 text-sm">Your achievements and certifications</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Completed Certificates */}
        <div className="mb-8">
          <h2 className="font-serif text-xl text-[#264020] mb-4">Your Certificates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
              >
                <div className="relative h-40 bg-[#FAF8F5]">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover opacity-50"
                  />
                  {cert.progress === 100 && (
                    <div className="absolute top-3 right-3 bg-[#264020] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Award size={12} />
                      Completed
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#264020] mb-1">{cert.name}</h3>
                  <p className="text-sm text-[#264020]/60 mb-3">{cert.issuer}</p>
                  <div className="flex items-center justify-between text-xs text-[#264020]/60 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {cert.date}
                    </span>
                    <span className={`flex items-center gap-1 ${cert.progress === 100 ? "text-green-600" : "text-[#264020]/60"}`}>
                      {cert.progress === 100 ? <CheckCircle size={12} /> : null}
                      {cert.progress === 100 ? "Issued" : `${cert.progress}% Complete`}
                    </span>
                  </div>
                  {cert.progress === 100 ? (
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-[#264020] hover:bg-[#3a5a30] text-white">
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#264020] text-[#264020]">
                        <Share2 size={14} />
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full border-[#264020] text-[#264020]">
                      View Progress
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="font-serif text-xl text-[#264020] mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl border border-[#E5E5E5] p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-medium text-[#264020] text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-[#264020]/60">{achievement.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}