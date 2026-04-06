import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../lib/useSEO';
import { supabase } from '../../lib/supabase';
import type { Course } from '../../lib/types';

export default function CoursesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Yoga Courses — Ashtanga, Hatha, Iyengar & Vinyasa',
    description: 'Explore our yoga courses: Ashtanga Yoga, Hatha Yoga, Iyengar Yoga, and Vinyasa Flow. Learn from certified instructors with 30+ years of experience. Book online classes today.',
    canonicalPath: '/courses',
    keywords: 'ashtanga yoga course, hatha yoga classes, iyengar yoga training, vinyasa flow yoga, online yoga courses, yoga styles, yoga workshops',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Yoga Courses at Srinatha Yoga School',
      description: 'Ashtanga, Hatha, Iyengar, and Vinyasa yoga courses offered online and in-person.',
      url: 'https://srinathayogaschool.com/courses',
      numberOfItems: courses.length,
      itemListElement: courses.map((course, idx) => ({ '@type': 'ListItem', position: idx + 1, item: { '@type': 'Course', name: course.title, description: course.description, provider: { '@type': 'Organization', name: 'Srinatha Yoga School' } } }))
    }
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .order('start_date', { ascending: true });
        
        if (error) throw error;
        if (data) setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header isScrolled={false} />
        <div className="flex items-center justify-center pt-40">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Our Yoga Courses
            </h1>
            <p className="text-xl text-teal-400 font-medium mb-8">
              Empowering your journey through the authentic science of Yoga.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/images/hero-02.jpg" 
            alt="Background" 
            className="w-full h-full object-cover" 
          />
        </div>
      </section>

      {/* Courses List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-24">
              {courses.map((course, index) => (
                <div 
                  key={course.id} 
                  id={course.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center scroll-mt-32`}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  data-aos-delay={`${index * 100}`}
                >
                  <div className="lg:w-1/2 group">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <img 
                        src={course.media_url || '/images/image-01.jpg'} 
                        alt={course.title} 
                        className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 space-y-6">
                    <div className="inline-block px-4 py-1 bg-teal-50 text-teal-700 rounded-full font-semibold text-xs tracking-widest uppercase">
                      {course.type === 'online_class' ? 'Online Class' : course.type === 'online_workshop' ? 'Workshop' : 'Course'}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {course.description}
                    </p>
                    
                    <div className="pt-4">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-teal-500"></i> Key Benefits
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-500">
                        {(course.benefits || ['Improves strength and flexibility', 'Increases stamina', 'Calms the mind', 'Reduces stress']).map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <Link 
                        to={`/booking/${course.id}`}
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all transform hover:-translate-y-1"
                      >
                        Book Now - ${course.price} <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Call to Action */}
      <section className="py-20 bg-teal-500" data-aos="zoom-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Unsure which course is right for you?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Our expert instructors are here to guide you toward the practice that best suits your goals and experience level.
          </p>
          <a 
            href="/#contact" 
            className="bg-white text-teal-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Get a Free Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
