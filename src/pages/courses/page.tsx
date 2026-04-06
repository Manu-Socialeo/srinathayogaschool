import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../lib/useSEO';

const courses = [
  {
    id: 'ashtanga',
    title: 'Ashtanga Yoga',
    description: 'A dynamic and physically demanding style of yoga that follows a specific sequence of postures. It focuses on synchronizing breath with movement to produce internal heat and detoxify the body.',
    benefits: ['Improves strength and flexibility', 'Increases stamina', 'Calms the mind', 'Detoxifies through heat'],
    image: '/images/image-01.jpg'
  },
  {
    id: 'hatha',
    title: 'Hatha Yoga',
    description: 'A foundational practice that focuses on physical postures (asanas) and breathing techniques (pranayama). It is typically practiced at a slower pace, making it perfect for beginners and those seeking balance.',
    benefits: ['Enhances physical vitality', 'Promotes mental clarity', 'Reduces stress', 'Improves body awareness'],
    image: '/images/image-02.jpg'
  },
  {
    id: 'iyengar',
    title: 'Iyengar Yoga',
    description: 'Known for its emphasis on detail, precision, and alignment in the performance of postures. This style often uses props such as belts, blocks, and blankets to help students perform postures correctly.',
    benefits: ['Corrects posture and alignment', 'Safe for injury recovery', 'Builds deep strength', 'Develops focus and discipline'],
    image: '/images/image-03.jpg'
  },
  {
    id: 'vinyasa',
    title: 'Vinyasa Yoga',
    description: 'A style of yoga characterized by stringing postures together so that you move from one to another, seamlessly, using breath. It is often referred to as "flow" yoga due to smooth transitions.',
    benefits: ['Cardiovascular workout', 'Creative movement patterns', 'Relieves anxiety', 'Strengthens the whole body'],
    image: '/images/hero-01.jpg'
  }
];

export default function CoursesPage() {
  const [isScrolled, setIsScrolled] = useState(false);

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
      numberOfItems: 4,
      itemListElement: [
        { '@type': 'ListItem', position: 1, item: { '@type': 'Course', name: 'Ashtanga Yoga', description: 'Dynamic and physically demanding style following specific sequences', provider: { '@type': 'Organization', name: 'Srinatha Yoga School' } } },
        { '@type': 'ListItem', position: 2, item: { '@type': 'Course', name: 'Hatha Yoga', description: 'Foundational practice focusing on physical postures and breathing techniques', provider: { '@type': 'Organization', name: 'Srinatha Yoga School' } } },
        { '@type': 'ListItem', position: 3, item: { '@type': 'Course', name: 'Iyengar Yoga', description: 'Precision and alignment-focused practice using props', provider: { '@type': 'Organization', name: 'Srinatha Yoga School' } } },
        { '@type': 'ListItem', position: 4, item: { '@type': 'Course', name: 'Vinyasa Yoga', description: 'Flow yoga with seamless breath-to-movement transitions', provider: { '@type': 'Organization', name: 'Srinatha Yoga School' } } }
      ]
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
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-1 bg-teal-50 text-teal-700 rounded-full font-semibold text-xs tracking-widest uppercase">
                    Yoga Style
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
                      {course.benefits.map((benefit, i) => (
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
                    Book a Class <i className="ri-arrow-right-line"></i>
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
