import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function ClassSchedule() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
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

  const schedule = [
    {
      day: 'Monday',
      classes: [
        { time: '06:00 - 07:30', name: 'Ashtanga Primary Series', instructor: 'Dr. Balasundara Srinatha', level: 'Intermediate', color: 'bg-teal-100 text-teal-700' },
        { time: '10:00 - 11:00', name: 'Hatha Yoga Basics', instructor: 'Sahana P R', level: 'Beginner', color: 'bg-purple-100 text-purple-700' },
        { time: '17:00 - 18:00', name: 'Pranayama & Meditation', instructor: 'Charanya', level: 'All Levels', color: 'bg-blue-100 text-blue-700' }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '06:00 - 07:30', name: 'Ashtanga Intermediate', instructor: 'Dr. Balasundara Srinatha', level: 'Advanced', color: 'bg-teal-100 text-teal-700' },
        { time: '11:00 - 12:00', name: 'Iyengar Alignment', instructor: 'Dr. Balasundara Srinatha', level: 'All Levels', color: 'bg-orange-100 text-orange-700' },
        { time: '18:00 - 19:00', name: 'Yoga Philosophy', instructor: 'Vinayaka Honnavar', level: 'All Levels', color: 'bg-amber-100 text-amber-700' }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '06:00 - 07:30', name: 'Ashtanga Primary Series', instructor: 'Dr. Balasundara Srinatha', level: 'Intermediate', color: 'bg-teal-100 text-teal-700' },
        { time: '10:00 - 11:00', name: 'Prenatal Yoga', instructor: 'Sahana P R', level: 'Beginner', color: 'bg-pink-100 text-pink-700' },
        { time: '17:00 - 18:30', name: 'Vinyasa Flow', instructor: 'Hrishanth', level: 'Intermediate', color: 'bg-indigo-100 text-indigo-700' }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { time: '06:00 - 07:30', name: 'Ashtanga Intermediate', instructor: 'Dr. Balasundara Srinatha', level: 'Advanced', color: 'bg-teal-100 text-teal-700' },
        { time: '11:00 - 12:00', name: 'Anatomy for Yogis', instructor: 'Ravi Prabhakar', level: 'All Levels', color: 'bg-green-100 text-green-700' },
        { time: '17:00 - 18:00', name: 'Sound Healing', instructor: 'Vinayaka Honnavar', level: 'All Levels', color: 'bg-purple-100 text-purple-700' }
      ]
    },
    {
      day: 'Friday',
      classes: [
        { time: '06:00 - 07:30', name: 'Ashtanga Primary Series', instructor: 'Dr. Balasundara Srinatha', level: 'Intermediate', color: 'bg-teal-100 text-teal-700' },
        { time: '10:00 - 11:00', name: 'Ayurveda Basics', instructor: 'Charanya', level: 'All Levels', color: 'bg-amber-100 text-amber-700' },
        { time: '17:00 - 18:00', name: 'Yin Yoga', instructor: 'Sahana P R', level: 'All Levels', color: 'bg-pink-100 text-pink-700' }
      ]
    },
    {
      day: 'Saturday',
      classes: [
        { time: '07:00 - 09:00', name: 'Ashtanga Led Primary', instructor: 'Dr. Balasundara Srinatha', level: 'All Levels', color: 'bg-teal-100 text-teal-700' },
        { time: '10:00 - 11:30', name: 'Yoga Therapy', instructor: 'Hrishanth', level: 'All Levels', color: 'bg-green-100 text-green-700' },
        { time: '16:00 - 17:00', name: 'Meditation & Pranayama', instructor: 'Vinayaka Honnavar', level: 'All Levels', color: 'bg-blue-100 text-blue-700' }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="schedule" className="py-24 bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <h4 className="text-sm font-semibold text-teal-500 mb-3 uppercase tracking-widest">Weekly Timetable</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Class Schedule</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our live online sessions conducted by certified instructors from Mysore, India. All times are IST (UTC+5:30).
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {schedule.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeDay === index
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-600 border border-gray-200'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Classes for Active Day */}
        <div className="max-w-3xl mx-auto space-y-4">
          {schedule[activeDay].classes.map((classItem, classIndex) => (
            <div
              key={classIndex}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${classIndex * 150}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-teal-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-teal-600">{classItem.time.split(' - ')[0]}</span>
                    <span className="text-[10px] text-teal-400">to</span>
                    <span className="text-xs font-bold text-teal-600">{classItem.time.split(' - ')[1]}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-500">with <span className="font-semibold text-teal-600">{classItem.instructor}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classItem.color}`}>
                    {classItem.level}
                  </span>
                  <Link
                    to="/booking/ashtanga"
                    className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-teal-600 transition-all"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            <i className="ri-information-line mr-1"></i>
            Sunday is a rest day. All sessions are conducted live via Zoom.
          </p>
        </div>
      </div>
    </section>
  );
}
