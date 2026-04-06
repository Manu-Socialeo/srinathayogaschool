import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials: Testimonial[] = [
    {
      name: 'Matilda Håkansson',
      location: 'Stockholm, Sweden',
      text: 'The sessions completely transformed my mindset. Dr. Srinatha\'s teaching is rooted in authentic tradition yet incredibly accessible. I\'ve never felt this balanced and at peace in my daily life.',
      rating: 5,
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/customer-avatar-01.jpg'
    },
    {
      name: 'James Mitchell',
      location: 'London, UK',
      text: 'After 6 months of online classes, my flexibility and strength have improved dramatically. The personalized attention in virtual sessions is remarkable. Highly recommend for anyone serious about yoga.',
      rating: 5,
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/avatar-02.jpg'
    },
    {
      name: 'Yuki Tanaka',
      location: 'Tokyo, Japan',
      text: 'Learning Ashtanga yoga from Mysore through online classes seemed impossible, but Dr. Srinatha makes it feel like I\'m right there in his shala. The depth of knowledge and patience is extraordinary.',
      rating: 5,
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/avatar-03.jpg'
    },
    {
      name: 'Sarah Williams',
      location: 'New York, USA',
      text: 'The workshop on pranayama was a life-changing experience. I came in as a skeptic and left as a believer. The breathing techniques have helped me manage anxiety in ways I never thought possible.',
      rating: 5,
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/avatar-01.jpg'
    },
    {
      name: 'Marco Rossi',
      location: 'Milan, Italy',
      text: 'I\'ve practiced yoga for 10 years across multiple studios worldwide. Nothing compares to the authenticity and depth of teaching at Srinatha Yoga School. It\'s the real deal from the source.',
      rating: 5,
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/avatar-02.jpg'
    }
  ];

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <h4 className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-widest">Student Stories</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Students Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real experiences from students around the world who transformed their practice with us.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/10">
            <div className="absolute top-6 left-8 text-8xl text-teal-500/20 font-serif leading-none">"</div>
            
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 italic">
                {testimonials[active].text}
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[active].image}
                  alt={testimonials[active].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
                />
                <div>
                  <h4 className="text-white font-bold text-lg">{testimonials[active].name}</h4>
                  <p className="text-teal-400 text-sm">{testimonials[active].location}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400"></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                active === index ? 'bg-teal-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
