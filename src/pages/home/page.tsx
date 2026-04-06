import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import YogaClasses from './components/YogaClasses';
import Pricing from './components/Pricing';
import Instructors from './components/Instructors';
import ClassSchedule from './components/ClassSchedule';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import ContactSection from './components/ContactSection';
import { useSEO } from '../../lib/useSEO';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useSEO({
    title: 'Online Yoga Classes from Mysore, India',
    description: 'Learn authentic Ashtanga, Hatha, Iyengar & Vinyasa yoga online with Dr. Balasundara Srinatha. RYS 500 certified school offering live classes, workshops & retreats from Mysore, India.',
    canonicalPath: '/',
    keywords: 'online yoga classes, yoga classes mysore, ashtanga yoga online, hatha yoga, iyengar yoga, vinyasa flow, yoga teacher training, mysore yoga tradition',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Srinatha Yoga School — Online Yoga Classes',
      description: 'Internationally certified yoga school offering online yoga classes, workshops, and retreats from Mysore, India.',
      url: 'https://srinathayogaschool.com/',
      mainEntity: {
        '@type': 'Organization',
        name: 'Srinatha Yoga School',
        url: 'https://srinathayogaschool.com',
        logo: 'https://srinathayogaschool.com/logo.png',
        telephone: '+919886512083',
        email: 'help@srinathayogaschool.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '14, Contour Rd, Gokulam 3rd Stage',
          addressLocality: 'Mysuru',
          addressRegion: 'Karnataka',
          postalCode: '570002',
          addressCountry: 'IN'
        },
        sameAs: [
          'https://www.facebook.com/yogawithsrinatha/',
          'https://www.instagram.com/yogawithsrinatha/',
          'https://www.youtube.com/channel/UCtIfvwek8n3BKexg-hpWxlA'
        ]
      }
    }
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      <Hero />
      <Features />
      <About />
      <YogaClasses />
      <Pricing />
      <Instructors />
      <ClassSchedule />
      <Testimonials />
      <FAQ />
      <Blog />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
