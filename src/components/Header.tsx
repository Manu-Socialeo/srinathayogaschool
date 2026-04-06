import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { label: 'Home', to: '/', type: 'link' },
    { label: 'Courses', to: '/courses', type: 'link' },
    { label: 'Events', to: '/events', type: 'link' },
    { label: 'About', to: '/about', type: 'link' },
    { label: 'Blog', to: '/blog', type: 'link' },
    { label: 'Contact', to: '/contact', type: 'link' },
  ];

  const textColor = isScrolled ? 'text-gray-900' : 'text-white';
  const borderColor = isScrolled ? 'border-gray-300' : 'border-white/30';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/logo.png"
                alt="Srinatha Yoga School Logo"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
              />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors hidden sm:block ${textColor}`}>
              Srinatha yoga school
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              const cls = `text-sm font-medium transition-colors hover:text-teal-500 whitespace-nowrap ${textColor} ${isActive ? '!text-teal-500' : ''}`;
              if (link.type === 'link') {
                return <Link key={link.label} to={link.to} className={cls}>{link.label}</Link>;
              }
              if (link.type === 'link-hash') {
                return <a key={link.label} href={link.to} className={cls}>{link.label}</a>;
              }
              return <a key={link.label} href={link.to} className={cls}>{link.label}</a>;
            })}
          </nav>

          {/* Right: Language + User/Login + Book Now + Hamburger */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher isScrolled={isScrolled} />
            
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className={`hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm font-medium ${borderColor} ${textColor} hover:bg-white/10`}
                >
                  <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">Dashboard</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className={`hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm font-medium ${borderColor} ${textColor} hover:bg-white/10`}
                  title="Sign out"
                >
                  <i className="ri-logout-box-line"></i>
                  <span className="hidden lg:block">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`hidden xl:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium ${borderColor} ${textColor} hover:bg-white/10`}
              >
                <i className="ri-user-line"></i>
                <span>Sign In</span>
              </Link>
            )}

            <Link
              to="/courses"
              className="hidden xl:inline-block bg-teal-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 transform"
            >
              Book Now
            </Link>
            <button
              className={`xl:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <i className={`text-2xl transition-all ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'} ${textColor}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`xl:hidden bg-white border-t border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-4 py-6 gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const cls = `text-sm font-medium text-gray-700 hover:text-teal-500 hover:bg-teal-50 px-4 py-3 rounded-lg transition-colors ${isActive ? 'text-teal-600 bg-teal-50' : ''}`;
            if (link.type === 'link') {
              return <Link key={link.label} to={link.to} className={cls} onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>;
            }
            return <a key={link.label} href={link.to} className={cls} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>;
          })}
          
          {/* Mobile User Section */}
          <div className="pt-4 border-t border-gray-100 mt-2 space-y-2">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">Dashboard</span>
                </Link>
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full text-left">
                  <i className="ri-logout-box-line"></i>
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                <i className="ri-user-line"></i>
                <span className="font-medium">Sign In</span>
              </Link>
            )}
            <Link to="/courses" className="block w-full text-center bg-teal-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
