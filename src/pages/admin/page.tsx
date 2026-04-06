import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useAuth } from '../../context/AuthContext';
import { useSEO } from '../../lib/useSEO';

const sampleBookings = [
  { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Ashtanga Yoga', date: 'Apr 15, 2026', status: 'confirmed', amount: '$150.00', method: 'PayPal', country: 'United States' },
  { id: 2, name: 'Yuki Tanaka', email: 'yuki@example.com', course: 'Hatha Yoga', date: 'Apr 20, 2026', status: 'pending', amount: '$12.00', method: 'Razorpay', country: 'Japan' },
  { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', course: 'Iyengar Workshop', date: 'May 01, 2026', status: 'confirmed', amount: '$200.00', method: 'PayPal', country: 'United States' },
  { id: 4, name: 'Marco Rossi', email: 'marco@example.com', course: 'Vinyasa Flow', date: 'May 10, 2026', status: 'pending', amount: '$18.00', method: 'PayPal', country: 'Italy' },
  { id: 5, name: 'James Mitchell', email: 'james@example.com', course: 'Ashtanga Yoga', date: 'Apr 15, 2026', status: 'confirmed', amount: '$150.00', method: 'Razorpay', country: 'United Kingdom' },
  { id: 6, name: 'Matilda Håkansson', email: 'matilda@example.com', course: 'Hatha Yoga', date: 'Apr 20, 2026', status: 'cancelled', amount: '$120.00', method: 'PayPal', country: 'Sweden' },
];

const samplePayments = [
  { id: 1, booking: '#BK-001', name: 'John Doe', amount: '$150.00', method: 'PayPal', type: 'full', status: 'paid', date: 'Apr 01, 2026' },
  { id: 2, booking: '#BK-002', name: 'Yuki Tanaka', amount: '$12.00', method: 'Razorpay', type: 'deposit', status: 'paid', date: 'Apr 03, 2026' },
  { id: 3, booking: '#BK-003', name: 'Sarah Williams', amount: '$200.00', method: 'PayPal', type: 'full', status: 'paid', date: 'Apr 05, 2026' },
  { id: 4, booking: '#BK-004', name: 'Marco Rossi', amount: '$18.00', method: 'PayPal', type: 'deposit', status: 'pending', date: 'Apr 06, 2026' },
];

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'payments' | 'courses' | 'users' | 'blog'>('overview');

  useSEO({
    title: 'Admin Panel — Management Dashboard',
    description: 'Manage bookings, payments, courses, users, and blog content for Srinatha Yoga School.',
    canonicalPath: '/admin',
    noindex: true
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isScrolled={isScrolled} />

      {/* Admin Hero */}
      <section className="bg-gray-900 text-white py-12 pt-28">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Admin</span>
                <span className="text-gray-400 text-sm">Dashboard</span>
              </div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
              <i className="ri-external-link-line mr-1"></i> View Site
            </Link>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
            {[
              { key: 'overview' as const, label: 'Overview', icon: 'ri-dashboard-line' },
              { key: 'bookings' as const, label: 'Bookings', icon: 'ri-calendar-check-line' },
              { key: 'payments' as const, label: 'Payments', icon: 'ri-bank-card-line' },
              { key: 'courses' as const, label: 'Courses', icon: 'ri-book-open-line' },
              { key: 'users' as const, label: 'Users', icon: 'ri-group-line' },
              { key: 'blog' as const, label: 'Blog', icon: 'ri-article-line' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Bookings', value: '156', icon: 'ri-calendar-check-line', color: 'bg-teal-100 text-teal-600', trend: '+12% this month' },
                { label: 'Revenue', value: '$23,450', icon: 'ri-money-dollar-circle-line', color: 'bg-green-100 text-green-600', trend: '+8% this month' },
                { label: 'Active Students', value: '89', icon: 'ri-user-smile-line', color: 'bg-blue-100 text-blue-600', trend: '+5 new this week' },
                { label: 'Pending Payments', value: '$1,240', icon: 'ri-time-line', color: 'bg-amber-100 text-amber-600', trend: '4 pending' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <i className={`${stat.icon} text-2xl`}></i>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                  <p className="text-xs text-teal-600 mt-2 font-medium">{stat.trend}</p>
                </div>
              ))}
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-aos="fade-up">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                <button onClick={() => setActiveTab('bookings')} className="text-teal-600 text-sm font-semibold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium">Student</th>
                      <th className="text-left px-6 py-3 font-medium">Course</th>
                      <th className="text-left px-6 py-3 font-medium">Date</th>
                      <th className="text-left px-6 py-3 font-medium">Status</th>
                      <th className="text-left px-6 py-3 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sampleBookings.slice(0, 5).map(b => (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4"><p className="font-medium text-gray-900">{b.name}</p><p className="text-gray-500 text-xs">{b.email}</p></td>
                        <td className="px-6 py-4 text-gray-700">{b.course}</td>
                        <td className="px-6 py-4 text-gray-500">{b.date}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{b.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-aos="fade-up">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">All Bookings ({sampleBookings.length})</h2>
              <div className="flex gap-2">
                <input type="text" placeholder="Search bookings..." className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-teal-500 outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Student</th>
                    <th className="text-left px-6 py-3 font-medium">Course</th>
                    <th className="text-left px-6 py-3 font-medium">Country</th>
                    <th className="text-left px-6 py-3 font-medium">Date</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-left px-6 py-3 font-medium">Amount</th>
                    <th className="text-left px-6 py-3 font-medium">Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleBookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4"><p className="font-medium text-gray-900">{b.name}</p><p className="text-gray-500 text-xs">{b.email}</p></td>
                      <td className="px-6 py-4 text-gray-700">{b.course}</td>
                      <td className="px-6 py-4 text-gray-500">{b.country}</td>
                      <td className="px-6 py-4 text-gray-500">{b.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{b.amount}</td>
                      <td className="px-6 py-4 text-gray-500">{b.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-aos="fade-up">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Payment Records</h2>
              <span className="text-sm text-gray-500">Total: $380.00</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Booking ID</th>
                    <th className="text-left px-6 py-3 font-medium">Student</th>
                    <th className="text-left px-6 py-3 font-medium">Amount</th>
                    <th className="text-left px-6 py-3 font-medium">Type</th>
                    <th className="text-left px-6 py-3 font-medium">Method</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-left px-6 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {samplePayments.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-xs text-teal-600">{p.booking}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{p.amount}</td>
                      <td className="px-6 py-4"><span className={`text-xs px-2 py-0.5 rounded-full ${p.type === 'full' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{p.type}</span></td>
                      <td className="px-6 py-4 text-gray-500">{p.method}</td>
                      <td className="px-6 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span></td>
                      <td className="px-6 py-4 text-gray-500">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Manage Courses</h2>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-all">
                <i className="ri-add-line mr-1"></i> Add Course
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { id: 'ashtanga', title: 'Ashtanga Yoga Primary Series', type: 'Online Class', price: '$150', enrolled: '12/30', status: 'Active' },
                { id: 'hatha', title: 'Hatha Yoga Foundations', type: 'Online Class', price: '$120', enrolled: '8/25', status: 'Active' },
                { id: 'iyengar', title: 'Iyengar Alignment Workshop', type: 'Online Workshop', price: '$200', enrolled: '5/20', status: 'Active' },
                { id: 'vinyasa', title: 'Vinyasa Flow Course', type: 'Online Course', price: '$180', enrolled: '15/35', status: 'Active' },
              ].map((course, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.type}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">{course.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Price: <strong className="text-gray-900">{course.price}</strong></span>
                    <span className="text-gray-500">Enrolled: <strong className="text-gray-900">{course.enrolled}</strong></span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">Edit</button>
                    <button className="flex-1 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-all">View Bookings</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-aos="fade-up">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Students ({sampleBookings.length})</h2>
              <input type="text" placeholder="Search students..." className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-teal-500 outline-none" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Name</th>
                    <th className="text-left px-6 py-3 font-medium">Email</th>
                    <th className="text-left px-6 py-3 font-medium">Country</th>
                    <th className="text-left px-6 py-3 font-medium">Bookings</th>
                    <th className="text-left px-6 py-3 font-medium">Total Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleBookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{b.name}</td>
                      <td className="px-6 py-4 text-gray-500">{b.email}</td>
                      <td className="px-6 py-4 text-gray-500">{b.country}</td>
                      <td className="px-6 py-4"><span className="bg-teal-50 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full">1</span></td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Blog Management</h2>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-all">
                <i className="ri-add-line mr-1"></i> New Post
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'The Power of Daily Meditation Practice', status: 'published', date: 'Jan 15, 2025', views: '1.2k' },
                { title: 'Morning Yoga Routines for Beginners', status: 'published', date: 'Jan 12, 2025', views: '980' },
                { title: 'Breathing Techniques for Stress Relief', status: 'published', date: 'Jan 10, 2025', views: '856' },
                { title: 'Understanding the Eight Limbs of Yoga', status: 'published', date: 'Jan 8, 2025', views: '1.5k' },
                { title: 'Nutrition Tips for Yoga Practitioners', status: 'draft', date: 'Jan 5, 2025', views: '—' },
                { title: 'The Benefits of Restorative Yoga', status: 'draft', date: 'Jan 3, 2025', views: '—' },
              ].map((post, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay={i * 50}>
                  <div>
                    <h3 className="font-bold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{post.date} · {post.views} views</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{post.status}</span>
                    <button className="text-gray-400 hover:text-teal-600 transition-colors"><i className="ri-edit-line"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
