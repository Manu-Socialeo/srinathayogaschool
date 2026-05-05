import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources | Student Dashboard | Srinatha Yoga Shala",
  description: "Access study materials, asana manuals, chanting guides, and more.",
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, FileText, Download, BookOpen, Headphones, Video, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const resources = [
  {
    category: "Asana Manuals",
    items: [
      { name: "Primary Series Chart", type: "PDF", size: "2.4 MB", downloads: 1245 },
      { name: "Secondary Series Overview", type: "PDF", size: "1.8 MB", downloads: 892 },
      { name: "Asana Alignment Guide", type: "PDF", size: "5.2 MB", downloads: 2103 },
    ],
  },
  {
    category: "Chanting Guides",
    items: [
      { name: "Mantra Chanting Audio", type: "Audio", size: "45 MB", downloads: 567 },
      { name: "Sanskrit Pronunciation", type: "PDF", size: "1.2 MB", downloads: 789 },
      { name: "Chandana Namavali", type: "PDF", size: "0.5 MB", downloads: 432 },
    ],
  },
  {
    category: "Philosophy",
    items: [
      { name: "Yoga Sutras - Complete", type: "PDF", size: "3.1 MB", downloads: 1876 },
      { name: "Bhagavad Gita Notes", type: "PDF", size: "2.8 MB", downloads: 1567 },
      { name: "Patanjali 8 Limbs", type: "PDF", size: "1.5 MB", downloads: 1432 },
    ],
  },
  {
    category: "Anatomy & Physiology",
    items: [
      { name: "Human Anatomy for Yoga", type: "PDF", size: "8.5 MB", downloads: 987 },
      { name: "Chakra System Guide", type: "PDF", size: "4.2 MB", downloads: 2341 },
      { name: "Pranayama & Nadi System", type: "PDF", size: "2.1 MB", downloads: 1123 },
    ],
  },
  {
    category: "Teaching Materials",
    items: [
      { name: " Sequencing Guide", type: "PDF", size: "1.9 MB", downloads: 654 },
      { name: "Adjustments Manual", type: "PDF", size: "12.4 MB", downloads: 823 },
      { name: "Teaching Ethics", type: "PDF", size: "0.8 MB", downloads: 345 },
    ],
  },
]

export default function ResourcesPage() {
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
              <h1 className="font-serif text-xl text-[#264020]">Resources</h1>
              <p className="text-[#264020]/60 text-sm">Study materials and downloads</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#264020]/40" size={18} />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-[#264020] focus:outline-none focus:border-[#264020] w-64"
            />
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["All Resources", "PDFs", "Audio", "Video"].map((filter, idx) => (
            <button
              key={filter}
              className={`p-4 rounded-xl text-center transition-colors ${
                idx === 0 ? "bg-[#264020] text-white" : "bg-white border border-[#E5E5E5] text-[#264020] hover:bg-[#FAF8F5]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Resource Categories */}
        <div className="space-y-6">
          {resources.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
            >
              <div className="bg-[#FAF8F5] px-6 py-4 border-b border-[#E5E5E5]">
                <h3 className="font-serif text-lg text-[#264020]">{category.category}</h3>
              </div>
              <div className="divide-y divide-[#E5E5E5]">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between px-6 py-4 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#FAF8F5] rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-[#264020]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#264020]">{item.name}</h4>
                        <p className="text-xs text-[#264020]/60">
                          {item.type} • {item.size} • {item.downloads.toLocaleString()} downloads
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#264020] text-[#264020]">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}