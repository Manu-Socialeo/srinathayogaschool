import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useSEO } from '../../lib/useSEO';

export default function Login() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');

  useSEO({
    title: 'Sign In — Student Login',
    description: 'Sign in to your Srinatha Yoga School account.',
    canonicalPath: '/login',
    noindex: true
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
      return;
    }
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, navigate]);

  const handleLogin = (role: 'student' | 'admin') => {
    signIn(role, name || (role === 'admin' ? 'Admin' : 'Student'));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <Header isScrolled={isScrolled} />

      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-teal-500/10 border border-gray-100 overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="h-1.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"></div>

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 relative overflow-hidden rounded-2xl shadow-lg shadow-teal-500/20">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
              <p className="text-gray-500 text-sm">Select your role to continue</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <button
                onClick={() => handleLogin('student')}
                className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold hover:bg-teal-600 transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-user-line"></i>
                Login as Student
              </button>

              <button
                onClick={() => handleLogin('admin')}
                className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-admin-line"></i>
                Login as Admin
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-xs">
                <i className="ri-shield-check-line text-teal-500 mr-1"></i>
                Demo Mode - No password required
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
