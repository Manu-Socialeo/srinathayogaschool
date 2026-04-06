import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          {/* Right: Language + Book Now + Hamburger */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher isScrolled={isScrolled} />
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
          <div className="pt-4 border-t border-gray-100 mt-2">
            <Link to="/courses" className="block w-full text-center bg-teal-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}