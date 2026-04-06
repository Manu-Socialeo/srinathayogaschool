import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.02); // Extremely subtle rotation for maximum calmness
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-teal-50 to-white pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 mb-4 opacity-0 animate-fade-in-up">
              <div className="flex -space-x-2">
                <img 
                  src="/images/avatar-01.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/images/avatar-02.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/images/avatar-03.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-xs"></i>
                  ))}
                </div>
                <p className="text-xs text-gray-600">Trusted by 60K+ members worldwide. Begin your journey today.</p>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight opacity-0 animate-fade-in-up animation-delay-200">
              Discover the <span className="text-teal-500">science</span> & power of Yoga
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed opacity-0 animate-fade-in-up animation-delay-400 max-w-xl">
              Welcome to a holistic experience that will transform you from within. Dive into a soothing learning journey guided by internationally certified instructors rooted in the traditional art of Yoga.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up animation-delay-600">
              <Link to="/courses" className="bg-black text-white px-10 py-5 rounded-xl text-base font-bold hover:bg-gray-800 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-xl shadow-black/10">
                Explore Courses <i className="ri-arrow-right-up-line"></i>
              </Link>
              <Link to="/about" className="border-2 border-gray-900 text-gray-900 px-10 py-5 rounded-xl text-base font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-gray-200/50">
                About Us
              </Link>
            </div>

            <div className="flex items-start gap-3 pt-6 opacity-0 animate-fade-in-up animation-delay-800">
              <div className="w-16 h-px bg-teal-500 mt-3"></div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Founded by <strong className="text-gray-900">Dr. Balasundara Srinatha</strong>, with 30+ years of experience, trained under the legendary <strong className="text-gray-900">B.K.S Iyengar</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-6 opacity-0 animate-fade-in animation-delay-400">
            {/* Layered Image Container — Mandala spins, Dr. Srinatha stays still */}
            <div className="relative group perspective-1000 flex items-center justify-center h-[650px]">
              
              {/* Layer 1: The Mandala (Rotates on Scroll) */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-300 ease-out flex items-center justify-center overflow-hidden"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img 
                  src="/mandala-bg.png" 
                  alt="" 
                  className="w-[120%] h-[120%] object-contain opacity-80"
                />
              </div>

              {/* Layer 2: Dr. Srinatha (Static Pose) */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  src="/srinatha-pose.png" 
                  alt="Dr. Srinatha - Science of Yoga" 
                  className="max-h-full max-w-full object-contain transform scale-100 hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              </div>
              
              {/* Decorative background glow */}
              <div className="absolute inset-20 bg-teal-400/5 rounded-full blur-[100px] -z-20"></div>
            </div>

            {/* Info Badge — Centered and more premium */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/50 hover:shadow-teal-500/10 transition-all duration-500 mx-auto max-w-md">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center border border-teal-200 flex-shrink-0 shadow-inner">
                  <i className="ri-user-heart-fill text-3xl text-teal-600"></i>
                </div>
                <div className="flex-1">
                  <h6 className="font-bold text-gray-900 text-lg leading-tight">Dr. Balasundara Srinatha</h6>
                  <p className="text-sm text-teal-600 font-semibold uppercase tracking-wider">Founder & Lead Instructor</p>
                </div>
                <Link to="/courses" className="bg-teal-500 text-white p-4 rounded-2xl hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-teal-500/30 hover:scale-110 active:scale-95">
                  <i className="ri-calendar-check-line text-xl"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}