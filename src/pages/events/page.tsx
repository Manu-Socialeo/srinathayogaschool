import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ClassSchedule from '../home/components/ClassSchedule';
import { useSEO } from '../../lib/useSEO';

const events = [
  {
    month: 'MAR',
    day: '22',
    title: 'Ashtanga Intensive Weekend',
    type: 'Workshop',
    location: 'Mysore, India',
    time: '6:00 AM – 8:00 AM',
    days: 'Sat & Sun',
    seats: 12,
    color: 'bg-teal-500'
  },
  {
    month: 'APR',
    day: '05',
    title: 'Spring Yoga & Wellness Retreat',
    type: 'Retreat',
    location: 'Rishikesh, India',
    time: 'Full Day',
    days: '5 Days',
    seats: 20,
    color: 'bg-amber-500'
  },
  {
    month: 'APR',
    day: '19',
    title: 'Pranayama & Breathwork Masterclass',
    type: 'Masterclass',
    location: 'Online (Zoom)',
    time: '7:00 AM – 9:00 AM',
    days: 'Saturday',
    seats: 30,
    color: 'bg-purple-500'
  },
  {
    month: 'MAY',
    day: '10',
    title: 'Iyengar Yoga Alignment Workshop',
    type: 'Workshop',
    location: 'Bangalore, India',
    time: '9:00 AM – 12:00 PM',
    days: 'Sunday',
    seats: 15,
    color: 'bg-teal-500'
  },
  {
    month: 'MAY',
    day: '24',
    title: 'Hatha Yoga for Beginners — Open Day',
    type: 'Open Day',
    location: 'Mysore, India',
    time: '8:00 AM – 10:00 AM',
    days: 'Saturday',
    seats: 50,
    color: 'bg-green-500'
  },
  {
    month: 'JUN',
    day: '21',
    title: 'International Yoga Day Celebration',
    type: 'Special Event',
    location: 'Mysore, India',
    time: '5:30 AM – 7:00 PM',
    days: 'Saturday (World Yoga Day)',
    seats: 100,
    color: 'bg-red-500'
  },
];

const typeColors: Record<string, string> = {
  'Workshop': 'bg-teal-50 text-teal-700',
  'Retreat': 'bg-amber-50 text-amber-700',
  'Masterclass': 'bg-purple-50 text-purple-700',
  'Open Day': 'bg-green-50 text-green-700',
  'Special Event': 'bg-red-50 text-red-700',
};

export default function EventsPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useSEO({
    title: 'Yoga Events, Workshops & Retreats — Calendar 2025',
    description: 'Upcoming yoga workshops, retreats, masterclasses and special events. Join us in Mysore, Rishikesh, Bangalore or online for transformative yoga experiences.',
    canonicalPath: '/events',
    keywords: 'yoga workshops, yoga retreats, yoga events, yoga masterclass, yoga open day, international yoga day, yoga calendar 2025',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Srinatha Yoga School Events & Workshops',
      description: 'Yoga workshops, retreats, and special events throughout the year.',
      url: 'https://srinathayogaschool.com/events',
      organizer: { '@type': 'Organization', name: 'Srinatha Yoga School', url: 'https://srinathayogaschool.com' }
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

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-gray-900 text-white overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/image-03.jpg" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-sm font-medium mb-6">
            <i className="ri-calendar-event-line"></i> Upcoming Events
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Calendar & Events</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Workshops, retreats, open days and special events — join us for a transformative experience.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-6">
            {events.map((event, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                data-aos="fade-up"
                data-aos-delay={`${i * 80}`}
              >
                {/* Date Block */}
                <div className={`flex-shrink-0 w-20 h-20 ${event.color} rounded-xl flex flex-col items-center justify-center text-white shadow-lg`}>
                  <span className="text-xs font-bold tracking-widest uppercase">{event.month}</span>
                  <span className="text-3xl font-black leading-none">{event.day}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${typeColors[event.type] || 'bg-gray-100 text-gray-600'}`}>
                      {event.type}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <i className="ri-map-pin-line text-teal-500"></i>{event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-time-line text-teal-500"></i>{event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-calendar-line text-teal-500"></i>{event.days}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-group-line text-teal-500"></i>{event.seats} seats available
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center flex-shrink-0">
                  <Link to="/booking/ashtanga" className="hidden sm:inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-all">
                    Register <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <ClassSchedule />
          </div>

          {/* CTA Banner */}
          <div className="mt-16 bg-teal-500 rounded-3xl p-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Don't see an event that fits your schedule?</h2>
            <p className="text-white/90 mb-6">Contact us to arrange a private workshop or custom retreat for your group.</p>
            <a href="/#contact" className="inline-block bg-white text-teal-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
