import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Practice Calendar | Student Dashboard | Srinatha Yoga Shala",
  description: "View your upcoming yoga classes, practice sessions, and live events.",
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Video, Clock, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const schedule = [
  { day: 1, date: 5, events: [{ time: "6:00 AM", title: "Morning Ashtanga", type: "Live" }] },
  { day: 2, date: 6, events: [{ time: "7:00 AM", title: "Hatha Yoga", type: "Live" }, { time: "5:00 PM", title: "Pranayama", type: "Recording" }] },
  { day: 3, date: 7, events: [{ time: "6:00 AM", title: "Ashtanga Primary", type: "Live" }] },
  { day: 4, date: 8, events: [{ time: "7:30 AM", title: "Meditation", type: "Live" }] },
  { day: 5, date: 9, events: [{ time: "6:00 AM", title: "Vinyasa Flow", type: "Live" }, { time: "6:00 PM", title: "Yoga Philosophy", type: "Live" }] },
  { day: 6, date: 10, events: [] },
  { day: 0, date: 11, events: [{ time: "8:00 AM", title: "Restorative Yoga", type: "Live" }] },
]

const upcomingClasses = [
  { title: "Morning Ashtanga", time: "Tomorrow, 6:00 AM", duration: "90 min", instructor: "Radhika Ma&apos;am", spots: 25 },
  { title: "Hatha Yoga", time: "Wed, 7:00 AM", duration: "60 min", instructor: "Akshay Sir", spots: 30 },
  { title: "Pranayama Session", time: "Fri, 5:00 PM", duration: "45 min", instructor: "Dr. Srinatha", spots: 20 },
]

export default function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(0)

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-[#FAF8F5] rounded-lg transition-colors">
              <ChevronLeft size={24} className="text-[#264020]" />
            </Link>
            <div>
              <h1 className="font-serif text-xl text-[#264020]">Practice Calendar</h1>
              <p className="text-[#264020]/60 text-sm">Your weekly yoga schedule</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-[#264020] text-[#264020]">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Add to Google Calendar
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Week Navigation */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentWeek(currentWeek - 1)} className="p-2 hover:bg-[#FAF8F5] rounded-lg">
              <ChevronLeft size={20} className="text-[#264020]" />
            </button>
            <h2 className="font-serif text-lg text-[#264020]">May 2025</h2>
            <button onClick={() => setCurrentWeek(currentWeek + 1)} className="p-2 hover:bg-[#FAF8F5] rounded-lg">
              <ChevronRight size={20} className="text-[#264020]" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, idx) => (
              <div key={day} className="text-center py-2">
                <span className="text-xs font-medium text-[#264020]/60">{day}</span>
              </div>
            ))}
            {schedule.map((day, idx) => (
              <div key={idx} className={`min-h-[80px] p-2 rounded-lg ${day.events.length > 0 ? "bg-[#FAF8F5]" : ""}`}>
                <span className="text-sm text-[#264020]">{day.date}</span>
                {day.events.map((event, i) => (
                  <div key={i} className="mt-1 p-1 bg-[#264020]/10 rounded text-xs">
                    <span className="text-[#264020] font-medium">{event.time}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-serif text-lg text-[#264020] mb-4">Upcoming Classes</h3>
            <div className="space-y-4">
              {upcomingClasses.map((cls, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-[#FAF8F5] rounded-xl"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-[#264020]">{cls.title}</h4>
                    <span className="flex items-center gap-1 text-xs text-[#264020]/60">
                      <Video size={12} />
                      {cls.type || "Live"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#264020]/60 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {cls.time}
                    </span>
                    <span>{cls.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#264020]/60">Instructor: {cls.instructor}</span>
                    <Button size="sm" className="bg-[#264020] hover:bg-[#3a5a30] text-white">
                      Join Class
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-serif text-lg text-[#264020] mb-4">This Week Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl text-center">
                <div className="text-2xl font-serif text-[#264020] mb-1">5</div>
                <div className="text-xs text-[#264020]/60">Classes Attended</div>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl text-center">
                <div className="text-2xl font-serif text-[#264020] mb-1">6h</div>
                <div className="text-xs text-[#264020]/60">Practice Time</div>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl text-center">
                <div className="text-2xl font-serif text-[#264020] mb-1">4</div>
                <div className="text-xs text-[#264020]/60">Live Sessions</div>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl text-center">
                <div className="text-2xl font-serif text-[#264020] mb-1">12</div>
                <div className="text-xs text-[#264020]/60">Recordings Watched</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}