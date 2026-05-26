'use client'

import { useState, useCallback, useEffect } from 'react'
import { BottomNav } from '@/components/app/bottom-nav'
import { AppHeader } from '@/components/app/app-header'
import { HomeScreen } from '@/components/app/screens/home-screen'
import { LearnScreen } from '@/components/app/screens/learn-screen'
import { WorkshopsScreen } from '@/components/app/screens/workshops-screen'
import { StoreScreen } from '@/components/app/screens/store-screen'
import { ProfileScreen } from '@/components/app/screens/profile-screen'
import { getCurrentProfile } from '@/lib/auth'
import type { Profile } from '@/lib/supabase-types'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    getCurrentProfile().then(setProfile)
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    if (tab === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tab)
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 150)
  }, [activeTab])

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />
      case 'learn':
        return <LearnScreen />
      case 'workshops':
        return <WorkshopsScreen />
      case 'store':
        return <StoreScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto app-container no-overscroll">
      <AppHeader userName={profile?.name ?? 'User'} avatarUrl={profile?.avatar_url ?? '/placeholder-user.jpg'} />

      <main
        className={`pb-20 transition-opacity duration-150 ${
          isTransitioning ? 'opacity-50' : 'opacity-100'
        } ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
      >
        {renderScreen()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
