import { useEffect } from 'react';
import AOS from 'aos';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useSEO } from '../../lib/useSEO';

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useSEO({
    title: 'About Srinatha Yoga School — Dr. Balasundara Srinatha',
    description: 'Learn about Dr. Balasundara Srinatha, founder of Srinatha Yoga School. 30+ years of experience, trained under B.K.S Iyengar & Sri Gopaljeeyar. RYS 500 certified yoga school from Mysore, India.',
    canonicalPath: '/about',
    keywords: 'about srinatha yoga school, dr balasundara srinatha, yoga teacher mysore, bk iyengar student, yoga guru india, certified yoga school',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Srinatha Yoga School',
      description: 'Dr. Balasundara Srinatha — 30+ years of yoga teaching experience, founder of Srinatha Yoga School, Mysore.',
      url: 'https://srinathayogaschool.com/about',
      mainEntity: {
        '@type': 'Person',
        name: 'Dr. Balasundara Srinatha',
        jobTitle: 'Founder & Lead Yoga Instructor',
        description: 'Internationally certified yoga teacher with 30+ years of experience, trained under B.K.S Iyengar and Sri Gopaljeeyar.',
        worksFor: {
          '@type': 'Organization',
          name: 'Srinatha Yoga School'
        }
      }
    }
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50/50 to-white overflow-hidden">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-teal-600 font-medium mb-8">
              Discover Your Inner Balance & Take Your Yoga to The Peak
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Welcome to a holistic experience that will transform you from within. Dive into a soothing learning experience by engaging with the science and power of Yoga.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* Founders & Philosophy */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative group" data-aos="fade-right">
              <div className="absolute -inset-4 bg-teal-50 rounded-2xl -rotate-2 transition-transform group-hover:rotate-0 duration-500"></div>
              <img 
                src="/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/hero-02.jpg" 
                alt="Dr. Balasundara Srinatha" 
                className="relative rounded-xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-black text-white p-8 rounded-2xl shadow-xl max-w-xs">
                <p className="text-2xl font-bold mb-1">Dr. Srinatha</p>
                <p className="text-teal-400 font-medium">Founder</p>
              </div>
            </div>

            <div className="space-y-8" data-aos="fade-left">
              <div className="inline-block px-4 py-2 bg-teal-50 text-teal-700 rounded-full font-semibold text-sm tracking-wider uppercase">
                Our Founder
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Rooted in Tradition, Accessible to the World
              </h2>
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-teal-500 pl-6 text-xl">
                "Yoga is not a work-out it is a work-in, and this is the point of spiritual practice to make us teachable to open up our hearts and focus our awareness so that we can know what we already know and be who we already are."
              </p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Yoga With Srinatha – An Internationally Certified Yoga School is founded by Dr. Balasundara Srinatha to make the traditional and correct form of Yoga accessible to all, around the world.
                </p>
                <p>
                  Dr. Srinatha is blessed and privileged to learn and practice with B.K.S Iyengar, Sri Gopaljeeyar and other senior Yoga Gurus of India. His experience of more than 30 Years in teaching Yoga worldwide enables him to understand the mind and body of the students.
                </p>
                <p>
                  He has designed specific sets of series and sequences of yoga to make all levels of practitioners feel easy, effective, prepared and safe in his classes without restricting their mind with any fear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="0">
              <div className="text-4xl md:text-5xl font-bold text-teal-400">25+</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Yoga Styles</div>
            </div>
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
              <div className="text-4xl md:text-5xl font-bold text-teal-400">60k+</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Happy Members</div>
            </div>
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl md:text-5xl font-bold text-teal-400">30+</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Years Experience</div>
            </div>
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="300">
              <div className="text-4xl md:text-5xl font-bold text-teal-400">30+</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">Certified Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
                <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                  <i className="ri-award-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">Certified Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our yoga programs are led by highly certified and experienced instructors who bring years of practice, teaching expertise, and wellness knowledge.
                </p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
                <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                  <i className="ri-mickey-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">Holistic Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  We believe yoga goes far beyond physical postures. Our curriculum integrates mindfulness, breathwork, meditation, and lifestyle wellness.
                </p>
              </div>
            </div>

            <div className="mt-20 text-center" data-aos="fade-up">
              <h2 className="text-3xl font-bold mb-8 italic text-gray-800">
                Meet the amazing Yogis who nurture the minds of seeking transcendence.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                This Yoga Alliance Certified Yoga School is established with the vision to create a sacred place for serious yoga practitioners to develop their yoga practice – physically, mentally and spiritually. Our team of Yoga masters from Mysore and other parts of India, believe in a dedicated and in-depth step-by-step approach.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Hatha Yoga', 'Ashtanga Yoga', 'Iyengar Yoga', 'Meditation', 'Pranayama', 'Yoga Philosophy'].map((style) => (
                  <span key={style} className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600">
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities/Services */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4">The Srinatha Experience</h2>
            <p className="text-gray-500">Beyond the mat, a journey of total wellness.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group" data-aos="fade-up" data-aos-delay="0">
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <img src="/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg" alt="Retreat" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <h4 className="text-xl font-bold mb-3">The Retreat Experience</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Many years of experience in hosting retreats. Professional approach with dedicated facilities to support growth, learning and relaxation.
              </p>
            </div>

            <div className="group" data-aos="fade-up" data-aos-delay="100">
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <img src="/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg" alt="Wellness" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <h4 className="text-xl font-bold mb-3">Wellness & Spa</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Excellent wellness centre offering detox programs and wonderful spa services and treatments to rejuvenate your spirit.
              </p>
            </div>

            <div className="group" data-aos="fade-up" data-aos-delay="200">
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <img src="/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg" alt="Food" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <h4 className="text-xl font-bold mb-3">Delicious Food</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fresh, tasty buffet food prepared daily with care. Something for everyone including all dietary requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12" data-aos="fade-up">Our Global Presence</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="0">
              <div className="text-teal-400 font-bold text-xl uppercase tracking-widest">Mysore, India</div>
              <p className="text-gray-400 max-w-xs mx-auto">Headquarters in the Ashtanga Yoga capital of the world.</p>
            </div>
            <div className="w-px h-20 bg-gray-800 hidden md:block"></div>
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
              <div className="text-teal-400 font-bold text-xl uppercase tracking-widest">Bangalore</div>
              <p className="text-gray-400 max-w-xs mx-auto">Serving the urban seeking peace and fitness.</p>
            </div>
            <div className="w-px h-20 bg-gray-800 hidden md:block"></div>
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
              <div className="text-teal-400 font-bold text-xl uppercase tracking-widest">Rishikesh</div>
              <p className="text-gray-400 max-w-xs mx-auto">Immersive experiences in the lap of the Himalayas.</p>
            </div>
          </div>
          
          <div className="mt-20" data-aos="fade-up">
            <a href="/#contact" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-teal-500/20">
              Join Our Community <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
