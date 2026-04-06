import { useEffect, useRef, useState } from 'react';

export default function Features() {
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
    <section ref={sectionRef} className="py-16 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className={`${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-12">Internationally Accredited & Certified By</p>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {[
              { label: 'RYS 200', sub: 'Yoga Alliance', color: 'border-red-700' },
              { label: 'RYS 300', sub: 'Yoga Alliance', color: 'border-gray-800' },
              { label: 'RYS 500', sub: 'Yoga Alliance', color: 'border-gray-800' },
            ].map((badge) => (
              <div key={badge.label} className={`flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 ${badge.color} shadow-sm hover:scale-110 transition-all duration-300 bg-white group`}>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-gray-600">Registered</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-gray-600">Yoga School</span>
                <span className="text-2xl font-black text-gray-900 leading-none my-1">{badge.label}</span>
                <span className="text-[10px] font-bold text-red-700 tracking-wide">yoga</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-800">ALLIANCE</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}