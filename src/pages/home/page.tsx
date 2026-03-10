import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import YogaClasses from './components/YogaClasses';
import Pricing from './components/Pricing';
import Instructors from './components/Instructors';
import ClassSchedule from './components/ClassSchedule';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
      <FAQ />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  );
}