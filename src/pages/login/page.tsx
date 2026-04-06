import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useSEO } from '../../lib/useSEO';

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useSEO({
    title: 'Sign In — Student Login',
    description: 'Sign in to your Srinatha Yoga School account to access your classes, bookings, and personal dashboard.',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <Header isScrolled={isScrolled} />

      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-teal-500/10 border border-gray-100 overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          {/* Top Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"></div>

          <div className="p-10">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 relative overflow-hidden rounded-2xl shadow-lg shadow-teal-500/20">
                <img
                  src="/logo.png"
                  alt="Srinatha Yoga School Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sign in to access your classes, bookings, and dashboard
              </p>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/10 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 group mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="group-hover:text-teal-600 transition-colors">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Secure Sign In</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Info Text */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span>We use Google Sign-In for secure, passwordless authentication</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 rounded-full">
                <svg className="w-3.5 h-3.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-teal-700 text-xs font-medium">No password registration needed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
