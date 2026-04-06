import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useAuth } from '../../context/AuthContext';
import { useSEO } from '../../lib/useSEO';
import { supabase } from '../../lib/supabase';
import type { Booking as BookingType, Course, Payment as PaymentType } from '../../lib/types';

interface UpcomingClass {
  id: number;
  title: string;
  date: string;
  time: string;
  instructor: string;
  type: string;
  zoomLink: string;
}

interface Activity {
  id: number;
  title: string;
  date: string;
  duration: string;
  instructor: string;
}

const upcomingClasses: UpcomingClass[] = [
  { id: 1, title: 'Ashtanga Vinyasa Flow', date: 'Apr 07, 2026', time: '6:00 AM - 7:30 AM', instructor: 'Dr. Srinatha', type: 'Intermediate', zoomLink: '#' },
  { id: 2, title: 'Hatha Yoga Basics', date: 'Apr 08, 2026', time: '7:00 AM - 8:00 AM', instructor: 'Sahana P R', type: 'Beginner', zoomLink: '#' },
  { id: 3, title: 'Iyengar Alignment', date: 'Apr 09, 2026', time: '5:30 PM - 7:00 PM', instructor: 'Dr. Srinatha', type: 'All Levels', zoomLink: '#' },
  { id: 4, title: 'Vinyasa Power Hour', date: 'Apr 10, 2026', time: '6:30 AM - 7:30 AM', instructor: 'Hrishanth', type: 'Advanced', zoomLink: '#' },
];

const recentActivity: Activity[] = [
  { id: 1, title: 'Ashtanga Primary Series', date: 'Apr 04, 2026', duration: '90 min', instructor: 'Dr. Srinatha' },
  { id: 2, title: 'Hatha Yoga for Flexibility', date: 'Apr 02, 2026', duration: '60 min', instructor: 'Sahana P R' },
  { id: 3, title: 'Meditation & Pranayama', date: 'Mar 31, 2026', duration: '45 min', instructor: 'Vinayaka Honnavar' },
  { id: 4, title: 'Vinyasa Flow', date: 'Mar 29, 2026', duration: '75 min', instructor: 'Hrishanth' },
];

export default function Dashboard() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'payments'>('upcoming');
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useSEO({
    title: 'My Dashboard — Student Portal',
    description: 'Access your upcoming yoga classes, booking history, payment records, and personal account settings.',
    canonicalPath: '/dashboard',
    noindex: true
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoadingData(true);
      try {
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select('*, course:courses(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        const { data: coursesData } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .order('start_date', { ascending: true });
        
        if (bookingsData) setBookings(bookingsData);
        if (coursesData) setCourses(coursesData);
        
        const { data: paymentsData } = await supabase
          .from('payments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (paymentsData) setPayments(paymentsData);
      } catch (error) {
        console.log('Using demo data (Supabase not connected)');
      } finally {
        setLoadingData(false);
      }
    };
    
    if (user) fetchData();
  }, [user]);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-lock-line text-4xl text-gray-400"></i>
          </div>
          <h1 className="text-2xl font-bold mb-3">Sign In Required</h1>
          <p className="text-gray-500 mb-8">Please sign in to access your dashboard, bookings, and class history.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all">
              Sign In
            </Link>
            <Link to="/" className="border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-teal-500 transition-all">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isScrolled={isScrolled} />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 text-white py-16 pt-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">My Dashboard</h1>
              <p className="text-teal-100 text-lg">Welcome back, {user.name || 'Student'}! Ready for your next practice?</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {(user.name || 'S').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-lg">{user.name || 'Student'}</p>
                <p className="text-teal-100 text-sm">{user.email}</p>
                {isAdmin && <span className="text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full font-bold mt-1 inline-block">Admin</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100 hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up" data-aos-delay="0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <i className="ri-calendar-event-line text-teal-600 text-2xl"></i>
              </div>
              <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">This Week</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
            <p className="text-gray-500 text-sm mt-1">Total Bookings</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100 hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-cyan-600 text-2xl"></i>
              </div>
              <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">${payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + Number(p.amount), 0)}</p>
            <p className="text-gray-500 text-sm mt-1">Total Spent</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100 hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <i className="ri-book-open-line text-emerald-600 text-2xl"></i>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Active</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
            <p className="text-gray-500 text-sm mt-1">Available Courses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100 hover:-translate-y-1 transition-transform duration-300" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-video-line text-orange-600 text-2xl"></i>
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Next</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{courses[0] ? new Date(courses[0].start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}</p>
            <p className="text-gray-500 text-sm mt-1">Next Course Start</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-2 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 w-fit">
          {[
            { key: 'upcoming' as const, label: 'Upcoming', icon: 'ri-calendar-check-line' },
            { key: 'history' as const, label: 'History', icon: 'ri-history-line' },
            { key: 'payments' as const, label: 'Payments', icon: 'ri-bank-card-line' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">

              {/* Upcoming Classes */}
              {activeTab === 'upcoming' && (
                <>
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                        <i className="ri-calendar-check-line text-teal-600 text-xl"></i>
                      </div>
                      Upcoming Classes
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {upcomingClasses.map((cls) => (
                      <div key={cls.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                              <i className="ri-leaf-line text-white text-xl"></i>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> {cls.date}</span>
                                <span className="flex items-center gap-1"><i className="ri-time-line"></i> {cls.time}</span>
                                <span className="flex items-center gap-1"><i className="ri-user-line"></i> {cls.instructor}</span>
                              </div>
                              <span className="inline-block mt-2 text-xs font-medium bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">{cls.type}</span>
                            </div>
                          </div>
                          <a href={cls.zoomLink} className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-teal-500/20 flex-shrink-0">
                            <i className="ri-video-line"></i> Join Zoom
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* History */}
              {activeTab === 'history' && (
                <>
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                        <i className="ri-history-line text-cyan-600 text-xl"></i>
                      </div>
                      Class History
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {recentActivity.map((a) => (
                      <div key={a.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i className="ri-check-line text-green-600 text-lg"></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{a.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> {a.date}</span>
                              <span className="flex items-center gap-1"><i className="ri-time-line"></i> {a.duration}</span>
                              <span className="flex items-center gap-1"><i className="ri-user-line"></i> {a.instructor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Payments */}
              {activeTab === 'payments' && (
                <>
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <i className="ri-bank-card-line text-emerald-600 text-xl"></i>
                      </div>
                      Payment History
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {payments.length > 0 ? payments.map((p) => (
                      <div key={p.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{p.id}</h3>
                            <div className="flex items-center gap-x-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> {new Date(p.created_at).toLocaleDateString()}</span>
                              <span className="flex items-center gap-1"><i className="ri-bank-card-line"></i> {p.method}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">${p.amount} {p.currency}</p>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                              {p.status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="px-6 py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="ri-bank-card-line text-3xl text-gray-400"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">No payments yet</h3>
                        <p className="text-gray-500 text-sm mb-4">Book a course to see your payment history here.</p>
                        <Link to="/courses" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-teal-600 transition-all">
                          Browse Courses
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6" data-aos="fade-left">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <i className="ri-flashlight-line text-teal-600 text-xl"></i>
                </div>
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/courses" className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl py-4 px-3 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <i className="ri-calendar-check-line text-2xl"></i>
                  <span className="text-xs font-semibold">Book a Class</span>
                </Link>
                <Link to="/events" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl py-4 px-3 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <i className="ri-calendar-line text-2xl"></i>
                  <span className="text-xs font-semibold">View Calendar</span>
                </Link>
                <button onClick={() => setActiveTab('payments')} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-4 px-3 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <i className="ri-bank-card-line text-2xl"></i>
                  <span className="text-xs font-semibold">Payments</span>
                </button>
                {isAdmin && (
                  <Link to="/admin" className="bg-gray-800 hover:bg-gray-900 text-white rounded-xl py-4 px-3 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <i className="ri-settings-3-line text-2xl"></i>
                    <span className="text-xs font-semibold">Admin Panel</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Account */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6" data-aos="fade-left" data-aos-delay="100">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <i className="ri-user-settings-line text-gray-600 text-xl"></i>
                </div>
                Account
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-medium">{user.email}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Role</span><span className="font-medium capitalize">{user.role}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Member since</span><span className="font-medium">{new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span></div>
              </div>
              <button onClick={async () => { await signOut(); navigate('/'); }} className="w-full mt-6 py-3 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all text-sm">
                <i className="ri-logout-box-line mr-1"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
