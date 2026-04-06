import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        {/* Experience of Yoga Section — Redesigned */}
        <div className={`mb-24 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h4 className="text-sm font-semibold text-teal-500 mb-3 uppercase tracking-widest">Our Mission</h4>
            <h2 className="text-5xl font-bold mb-6 tracking-tight text-gray-900">Experience of Yoga</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed italic">
              "Yoga Fit is where you can find balance, harmony and energy renewal amidst the hectic bustle of everyday pressures and deadlines. Relax & enjoy a personalized yoga experience in our comfortable sanctuary."
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side Benefits */}
            <div className="space-y-12">
              <div className="flex gap-6 items-start text-right transition-transform hover:-translate-x-2 duration-300">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">Physical Fitness and Flexibility</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Yoga enhances strength, flexibility, and balance, leading to better posture, increased muscle tone, and a more flexible body.
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-teal-100">
                  <i className="ri-body-scan-line text-2xl text-teal-600"></i>
                </div>
              </div>

              <div className="flex gap-6 items-start text-right transition-transform hover:-translate-x-2 duration-300">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">Mental Clarity and Focus</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Yoga promotes mindfulness and concentration, improving clarity of thought and enhancing cognitive functions.
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-teal-100">
                  <i className="ri-mind-map text-2xl text-teal-600"></i>
                </div>
              </div>

              <div className="flex gap-6 items-start text-right transition-transform hover:-translate-x-2 duration-300">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">Stress Relief and Relaxation</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Yoga reduces stress through deep breathing, meditation and restorative poses, promoting relaxation and reducing anxiety.
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-teal-100">
                  <i className="ri-windy-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>

            {/* Central Image — Well Integrated */}
            <div className="relative px-4">
              <div className="absolute inset-0 bg-teal-500/5 rounded-full blur-[80px]"></div>
              <img 
                src="/dr-srinatha-experience.png" 
                alt="Dr. Srinatha - Experience of Yoga" 
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-lg transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Right Side Benefits */}
            <div className="space-y-12">
              <div className="flex gap-6 items-start transition-transform hover:translate-x-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-teal-100">
                  <i className="ri-heart-pulse-line text-2xl text-teal-600"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">Emotional Well-being</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Yoga fosters emotional balance, self-awareness, and acceptance, improving mood and resilience for a more positive outlook.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start transition-transform hover:translate-x-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-teal-100">
                  <i className="ri-eye-line text-2xl text-teal-600"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">Spiritual Growth</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Yoga is a spiritual journey that promotes introspection, self-discovery, and a deeper connection to the world around you.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start transition-transform hover:translate-x-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-teal-100">
                  <i className="ri-team-line text-2xl text-teal-600"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">Community and Connection</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Practicing yoga in a group fosters a sense of community and belonging, connecting with others in a supportive environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`py-16 bg-white rounded-2xl ${isVisible ? 'opacity-0 animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
          <h4 className="text-sm font-semibold text-teal-500 mb-3 text-center">Who We Are ?</h4>
          <h2 className="text-4xl font-bold mb-12 text-center tracking-tight">Do yoga properly with our skilled instructor</h2>
          
          <div className="grid lg:grid-cols-12 gap-8 px-8">
            <div className="lg:col-span-3 space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                Embrace a holistic approach to your well-being. Discover techniques that nurture both your mind and body, promoting a balanced and fulfilling lifestyle.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Redefine your wellness journey with mindful practices. Strengthen your body, calm your mind, and find the harmony you\'ve been searching for.
              </p>
              <div className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="/about-adjustment-1.png"
                  alt="Yoga Adjustment"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-xl overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300">
                <img 
                  src="/about-wall-yoga.png"
                  alt="Ashtanga Yoga Wall Practice"
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-8 right-8 bg-white rounded-xl p-6 shadow-xl max-w-sm hover:shadow-2xl transition-shadow duration-300 animate-float">
                <div className="flex items-start gap-4">
                  <img 
                    src="/images/customer-avatar-01.jpg"
                    alt="Customer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill text-xs"></i>
                      ))}
                    </div>
                    <h5 className="font-semibold text-sm mb-2">Matilda Håkansson</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      The sessions completely transformed my mindset. I\'ve never felt this balanced and at peace in my daily life. Highly recommended!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="/about-adjustment-2.png"
                  alt="Yoga Practice and Theory"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our personalized lessons are designed to inspire growth, balance, and harmony in every step you take.
              </p>
              <div>
                <h4 className="text-4xl font-bold mb-1">750+</h4>
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Lesson Conducted</h5>
                <p className="text-xs text-gray-500">Empowering over 750+ individuals on their wellness journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
