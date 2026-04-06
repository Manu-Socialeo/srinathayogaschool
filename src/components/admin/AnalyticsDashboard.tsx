import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface AnalyticsData {
  totalStudents: number;
  totalRevenue: number;
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  totalCourses: number;
  activeCourses: number;
  recentBookings: any[];
  revenueByDay: { date: string; amount: number }[];
  bookingsByDay: { date: string; count: number }[];
  topCourses: { title: string; bookings: number; revenue: number }[];
}

interface Props {
  isAdminView?: boolean;
}

export default function AnalyticsDashboard({ isAdminView = true }: Props) {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom'>('month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    totalStudents: 0,
    totalRevenue: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalCourses: 0,
    activeCourses: 0,
    recentBookings: [],
    revenueByDay: [],
    bookingsByDay: [],
    topCourses: [],
  });

  const getDateRange = () => {
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case 'today':
        startDate = now;
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'custom':
        if (customStart && customEnd) {
          return { start: new Date(customStart), end: new Date(customEnd) };
        }
        startDate.setMonth(now.getMonth() - 1);
        break;
    }
    return { start: startDate, end: now };
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange, customStart, customEnd]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { start, end } = getDateRange();
      
      const bookingsPromise = supabase
        .from('bookings')
        .select('*, course:courses(title, price)')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      const paymentsPromise = supabase
        .from('payments')
        .select('*')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .eq('status', 'paid');

      const coursesPromise = supabase
        .from('courses')
        .select('*');

      const usersPromise = supabase
        .from('users')
        .select('id, created_at');

      const [bookingsRes, paymentsRes, coursesRes, usersRes] = await Promise.all([
        bookingsPromise,
        paymentsPromise,
        coursesPromise,
        usersPromise
      ]);

      const bookings = bookingsRes.data || [];
      const payments = paymentsRes.data || [];
      const courses = coursesRes.data || [];
      const users = usersRes.data || [];

      const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
      const pendingBookings = bookings.filter(b => b.status === 'pending');
      const activeCourses = courses.filter(c => c.is_active);

      const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

      const revenueByDay: { [key: string]: number } = {};
      const bookingsByDay: { [key: string]: number } = {};
      
      payments.forEach(p => {
        const date = new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        revenueByDay[date] = (revenueByDay[date] || 0) + Number(p.amount);
      });

      bookings.forEach(b => {
        const date = new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        bookingsByDay[date] = (bookingsByDay[date] || 0) + 1;
      });

      const courseBookings: { [key: string]: { bookings: number; revenue: number } } = {};
      confirmedBookings.forEach(b => {
        const title = b.course?.title || 'Unknown';
        if (!courseBookings[title]) {
          courseBookings[title] = { bookings: 0, revenue: 0 };
        }
        courseBookings[title].bookings += 1;
        courseBookings[title].revenue += Number(b.course?.price || 0);
      });

      const topCourses = Object.entries(courseBookings)
        .map(([title, data]) => ({ title, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      setData({
        totalStudents: users.length,
        totalRevenue,
        totalBookings: bookings.length,
        confirmedBookings: confirmedBookings.length,
        pendingBookings: pendingBookings.length,
        totalCourses: courses.length,
        activeCourses: activeCourses.length,
        recentBookings: bookings.slice(0, 10),
        revenueByDay: Object.entries(revenueByDay).map(([date, amount]) => ({ date, amount })),
        bookingsByDay: Object.entries(bookingsByDay).map(([date, count]) => ({ date, count })),
        topCourses,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = Math.max(...data.revenueByDay.map(d => d.amount), 100);
  const maxBookings = Math.max(...data.bookingsByDay.map(d => d.count), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Track students, revenue, and bookings</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-teal-500 outline-none"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            
            {timeRange === 'custom' && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-teal-500 outline-none"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-teal-500 outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" data-aos="fade-up">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <i className="ri-user-smile-line text-teal-600 text-2xl"></i>
            </div>
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.totalStudents}</p>
          <p className="text-gray-500 text-sm mt-1">Total Students</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-green-600 text-2xl"></i>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Revenue</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${data.totalRevenue.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="ri-calendar-check-line text-blue-600 text-2xl"></i>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Bookings</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.confirmedBookings}</p>
          <p className="text-gray-500 text-sm mt-1">Confirmed Bookings</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <i className="ri-time-line text-amber-600 text-2xl"></i>
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Pending</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.pendingBookings}</p>
          <p className="text-gray-500 text-sm mt-1">Pending Bookings</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Over Time</h3>
          {data.revenueByDay.length > 0 ? (
            <div className="space-y-3">
              {data.revenueByDay.slice(-7).map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-20">{item.date}</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${(item.amount / maxRevenue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-20 text-right">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <i className="ri-line-chart-line text-4xl mb-2 block"></i>
              <p>No revenue data for this period</p>
            </div>
          )}
        </div>

        {/* Bookings Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Bookings Over Time</h3>
          {data.bookingsByDay.length > 0 ? (
            <div className="space-y-3">
              {data.bookingsByDay.slice(-7).map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-20">{item.date}</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / maxBookings) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-10 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <i className="ri-bar-chart-line text-4xl mb-2 block"></i>
              <p>No booking data for this period</p>
            </div>
          )}
        </div>
      </div>

      {/* Top Courses & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Top Performing Courses</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {data.topCourses.length > 0 ? data.topCourses.map((course, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' :
                    idx === 1 ? 'bg-gray-100 text-gray-700' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-teal-50 text-teal-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.bookings} bookings</p>
                  </div>
                </div>
                <p className="font-bold text-teal-600">${course.revenue.toLocaleString()}</p>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-400">
                <i className="ri-book-open-line text-3xl mb-2 block"></i>
                <p>No course data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {data.recentBookings.length > 0 ? data.recentBookings.map((booking, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{booking.full_name}</p>
                  <p className="text-sm text-gray-500">{booking.course?.title || 'Unknown Course'}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-400">
                <i className="ri-calendar-event-line text-3xl mb-2 block"></i>
                <p>No recent bookings</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{data.totalCourses}</p>
            <p className="text-gray-500 text-sm">Total Courses</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-teal-600">{data.activeCourses}</p>
            <p className="text-gray-500 text-sm">Active Courses</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{data.totalBookings}</p>
            <p className="text-gray-500 text-sm">Total Bookings</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">${data.totalBookings > 0 ? (data.totalRevenue / data.totalBookings).toFixed(0) : 0}</p>
            <p className="text-gray-500 text-sm">Avg. Booking Value</p>
          </div>
        </div>
      </div>
    </div>
  );
}
