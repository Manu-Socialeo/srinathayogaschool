import { useEffect, useRef, useState } from 'react';

interface Instructor {
  name: string;
  role: string;
  specialization: string;
  description: string;
  image: string;
  isFounder?: boolean;
}

export default function Instructors() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  const instructors: Instructor[] = [
    // ... instructors array stays the same ...
    {
      name: 'Dr. Balasundara Srinatha',
      role: 'Founder & Director',
      specialization: 'Hatha, Ashtanga, Iyengar & Vinyasa Yoga',
      description: 'Founder of Yoga With Srinatha, trained under B.K.S Iyengar with over 30 years of global teaching experience.',
      image: '/dr-srinatha.png',
      isFounder: true
    },
    {
      name: 'Charanya',
      role: 'Ayurveda, Philosophy & Pranayama Teacher',
      specialization: 'Ayurveda, Philosophy & Pranayama',
      description: "Bringing the ancient wisdom of Ayurveda and yogic philosophy to enrich students' holistic understanding and practice.",
      image: '/charanya.jpg'
    },
    {
      name: 'Ravi Prabhakar',
      role: 'Student Accommodation Manager',
      specialization: 'Methodology, Anatomy & Physiology',
      description: 'Dedicated to providing comprehensive yoga education with focus on anatomical understanding and teaching methodology.',
      image: '/ravi.jpg'
    },
    {
      name: 'Vinayaka Honnavar',
      role: 'Yoga Philosophy Teacher',
      specialization: 'Meditation & Sound Healing',
      description: 'Bringing ancient wisdom and healing practices to modern practitioners through profound philosophical teachings.',
      image: '/vinayaka.png'
    },
    {
      name: 'Sahana P R',
      role: "Women's Wellness Specialist",
      specialization: 'Yin Yoga, Prenatal & Postnatal Yoga',
      description: "Specializing in restorative practices and women's wellness, guiding students through transformative healing journeys.",
      image: '/sahana.png'
    },
    {
      name: 'Anulasha Ram',
      role: 'Creative Director & Aerial Yoga Expert',
      specialization: 'Aerial Yoga & Studio Operations',
      description: "Combining creative excellence with aerial yoga expertise to elevate the studio's digital presence and student experience.",
      image: 'https://via.placeholder.com/400x500?text=Instructor'
    },
    {
      name: 'Hrishanth',
      role: 'Therapeutic Yoga Specialist',
      specialization: 'Yoga Therapy & Ashtanga Yoga',
      description: 'Expert in therapeutic applications of yoga and traditional Ashtanga practice, helping students achieve healing and strength.',
      image: '/hrishanth.png'
    },
    {
      name: 'Kumar B R',
      role: 'Accommodation Manager & Djembe Instructor',
      specialization: 'Djembe & Hospitality Management',
      description: 'Ensuring student comfort while sharing the rhythmic art of Djembe to enhance the overall yoga retreat experience.',
      image: 'https://via.placeholder.com/400x500?text=Instructor'
    }
  ];

  return (
    <section ref={sectionRef} id="instructors" className="py-24 bg-gradient-to-b from-teal-50 to-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`mb-16 text-center ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <h4 className="text-sm font-semibold text-teal-500 mb-2 uppercase tracking-widest">Our Team</h4>
          <h2 className="text-5xl font-bold tracking-tight text-gray-900">Expert Instructors</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Learn from certified professionals dedicated to your wellness journey.</p>
        </div>

        {/* Carousel Container with Absolute Arrows */}
        <div className="relative group/carousel">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 lg:-left-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-teal-500 text-teal-600 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg hover:bg-teal-500 hover:text-white active:scale-90 active:bg-teal-600 transition-all duration-200 hidden md:flex"
            aria-label="Scroll left"
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 lg:-right-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-teal-500 text-teal-600 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg hover:bg-teal-500 hover:text-white active:scale-90 active:bg-teal-600 transition-all duration-200 hidden md:flex"
            aria-label="Scroll right"
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>

          {/* Scrollable Carousel — shows 3.5 photos */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-8 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[240px] md:w-[260px] lg:w-[280px] group ${isVisible ? `opacity-0 animate-fade-in-up` : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-5 shadow-sm hover:shadow-xl transition-all duration-500">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {instructor.isFounder && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Founder</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{instructor.name}</h3>
                  <p className="text-teal-600 text-[13px] font-bold mb-1">{instructor.specialization}</p>
                  <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2">{instructor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
