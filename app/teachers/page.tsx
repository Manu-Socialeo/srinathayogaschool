import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Team | Meet the Yoga Teachers | Srinatha Yoga Shala",
  description: "Meet our expert yoga teachers and instructors. Learn from certified professionals with 10+ years of experience in Mysore, Ashtanga, and traditional yoga.",
  keywords: ["yoga teachers", "yoga instructors", "yoga team", "Srinatha yoga teachers", "yoga educators", "Ashtanga teacher", "yoga acharya"],
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Full team roster matching the reference design
const teamMembers = [
  // Row 1
  {
    name: "Subah Saraf",
    role: "Co-founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=top",
    bgColor: "#8B9D83",
  },
  {
    name: "Harshvardhan Saraf",
    role: "Co-founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=top",
    bgColor: "#7BA3A8",
  },
  {
    name: "Radhika Gupta",
    role: "Co-Leader of Yoga Wing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=top",
    bgColor: "#C4A484",
  },
  {
    name: "Akshay Jain",
    role: "Co-Leader of Yoga Wing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=top",
    bgColor: "#8B8B6B",
  },
  {
    name: "Rajat Jadon",
    role: "Host of 5AM Challenge & Co-Leader of the Youth Wing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=top",
    bgColor: "#A89F91",
  },
  // Row 2
  {
    name: "Himadri Pareek",
    role: "Co-Leader of the Youth Wing",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=top",
    bgColor: "#9DB4C0",
  },
  {
    name: "Mini Gupta",
    role: "Co-Host of the Satvic Food Challenge",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=top",
    bgColor: "#A3B18A",
  },
  {
    name: "Pankaj Kumar",
    role: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=top",
    bgColor: "#7BA3A8",
  },
  {
    name: "Harsha Gharat",
    role: "Lead Graphic Designer",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=top",
    bgColor: "#C4A484",
  },
  {
    name: "Tanvi Dhane",
    role: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=top",
    bgColor: "#A89F91",
  },
  // Row 3
  {
    name: "Pallavi Rai",
    role: "Graphic Designer for Yoga Wing",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=top",
    bgColor: "#9DB4C0",
  },
  {
    name: "Riddhi Patel",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&crop=top",
    bgColor: "#E8837A",
  },
  {
    name: "Bharti Saraswat",
    role: "Post-production Supervisor",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=top",
    bgColor: "#7DB9B6",
  },
  {
    name: "Manish Panicker",
    role: "Cinematographer & Video Editor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=top",
    bgColor: "#7BA3A8",
  },
  {
    name: "Vinod Parishwad",
    role: "Senior Video Editor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=top",
    bgColor: "#C9D77E",
  },
  // Row 4
  {
    name: "Abhijeet Singh",
    role: "Videographer",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop&crop=top",
    bgColor: "#C49A6C",
  },
  {
    name: "Ankita Bhasin",
    role: "Creative Writer",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=top",
    bgColor: "#8B9D83",
  },
  {
    name: "Swati Singh",
    role: "Post-production Supervisor",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop&crop=top",
    bgColor: "#6B8F71",
  },
  {
    name: "Hari Shukla",
    role: "Senior Video Editor",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=500&fit=crop&crop=top",
    bgColor: "#8B8B6B",
  },
  {
    name: "Ramaskanda",
    role: "Video Producer",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=500&fit=crop&crop=top",
    bgColor: "#E8A44A",
  },
]

// 7 Core Values matching the reference screenshot
const coreValues = [
  {
    number: "1",
    title: "Service Before The Self",
    description:
      "We put the needs of our community before our own needs. We put service to the community before profits. We never take decisions based on how much money, fame or benefit we will gain. We make decisions based on how much impact we'll create in the lives for our community.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    imageLeft: true,
  },
  {
    number: "2",
    title: "Simplicity In Delivery",
    description:
      "Our knowledge is communicated with such clarity that even a five-year-old can grasp it effortlessly. We consciously avoid complex jargon and overly technical language. Whether it's our videos, books, social media, even work structure, or clothing, we always strive for simplicity.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop",
    imageLeft: false,
  },
  {
    number: "3",
    title: "Profoundness Of Wisdom",
    description:
      "Our teachings are deeply profound, rooted in the Vedas and the ancient scriptures. Yet, we also use modern scientific insights to back it up. We do not share anything based on our personal opinions or trends.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    imageLeft: true,
  },
  {
    number: "4",
    title: "Practicality Of Teachings",
    description:
      "We don't just share 'why' to do something, or 'what' to do. We also always share the 'how'. At the end of any theory, we tell people how to exactly bring it into implementation the very next day. In other words, we lay out a detailed path to follow any teaching in one's day-to-day, everyday life.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    imageLeft: false,
  },
  {
    number: "5",
    title: "Under Promising, But Over Delivering",
    description:
      "We strive to over deliver in everything we do. Whether we create a design, shoot a video, create a workshop or organise an event, it is done in the highest possible quality, and we strive to do more than what is expected. We never do 'kaam chalau' work.\n\nWe use the best quality equipment. There are never any grammatical errors in our writing. There are no ordinary workshops we create. Satvic Movement is known for always going over and above and no one compromises it.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    imageLeft: true,
  },
  {
    number: "6",
    title: "Empowerment, Not Dependency",
    description:
      "We help our community break free from dependencies. Whether it's the dependency on pills, on addictive substances, on people, or even the dependency on us. Rather, we teach them how to stand on their own feet.\n\nWe don't just give them a diet plan. We teach them how to craft a diet plan so in the future, they can do it for themselves, even without us. We don't just tell someone to do a certain action. We tell them exactly WHY to do it, so they can become their own health guide, and be fully self-sufficient.",
    image: "https://images.unsplash.com/photo-1609825488888-3a766db05542?w=600&h=400&fit=crop",
    imageLeft: false,
  },
  {
    number: "7",
    title: "A Spirit Of Joy",
    description:
      "Satvic Movement is a happy place where joy is constant. Whatever we do, we have fun while doing it. In our courses, we add fun elements so the overall vibe is youthful and joyful, and there are no dull moments (kirtans, team dances, quizzes, surprises, gifts, etc). We like to celebrate small achievements. We like to mark milestones. We love celebrating life!",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    imageLeft: true,
  },
]

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-[#FAF8F5] py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-[#264020]/60 hover:text-[#264020] mb-6 transition-colors">
              <ChevronLeft size={20} />
              <span>Back to Home</span>
            </Link>
            <h1 className="font-serif text-4xl lg:text-5xl text-[#264020] mb-6">Meet the Team</h1>
            <p className="text-[#264020]/70 max-w-2xl mx-auto text-lg leading-relaxed">
              The Srinatha team consists of 40 passionate individuals spread across India.
              Though we work mostly remotely, we&apos;re closely connected by the shared purpose
              of creating a Satvic World.
            </p>
          </div>
        </section>

        {/* Team Grid — Satvic-style cards */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-16">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index % 5) * 0.07 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  {/* Card: colored rounded box with photo overflowing the top */}
                  <div className="relative w-full" style={{ paddingTop: "24px" }}>
                    {/* Colored background box */}
                    <div
                      className="w-full rounded-2xl"
                      style={{ backgroundColor: member.bgColor, height: "160px" }}
                    />
                    {/* Photo — overflows the top of the box */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: 0, width: "90%", height: "190px" }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mt-3 px-1">
                    <h3 className="font-sans font-semibold text-[#1a1a1a] text-sm leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-[#555] text-xs leading-snug mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our 7 Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1a1a] mb-2">Our 7 Core Values</h2>
            </div>

            <div className="space-y-16">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${value.imageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
                >
                  {/* Image */}
                  <div className="w-full md:w-2/5 shrink-0">
                    <div className="relative w-full h-60 md:h-52 rounded-2xl overflow-hidden shadow-sm">
                      <Image
                        src={value.image}
                        alt={value.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="w-full md:w-3/5">
                    <h3 className="font-sans font-semibold text-[#1a1a1a] text-lg mb-3">
                      {value.number}. {value.title}
                    </h3>
                    {value.description.split("\n\n").map((para, i) => (
                      <p key={i} className="text-[#444] text-sm leading-relaxed mb-3 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-20 bg-[#264020]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-4">Join Our Team</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              If you want to help others on this Satvic Journey, reach out to us.
              Even if we don&apos;t have an open role for you, we&apos;d love to hear about you.
            </p>
            <Button className="bg-white text-[#264020] hover:bg-white/90 px-8 py-6 text-lg">
              Fill The Form
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
