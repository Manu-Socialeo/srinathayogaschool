import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
            <Link to="/" className="flex items-center">
              <img 
                src={isScrolled ? "/demos/themes/medit/wp-content/themes/medit/assets/img/logo-dark.png" : "/demos/themes/medit/wp-content/themes/medit/assets/img/logo-light.png"}
                alt="Medit"
                className="h-8"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <a href="#home" className={`text-sm font-medium transition-colors hover:text-teal-500 whitespace-nowrap ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Home</a>
            <a href="#classes" className={`text-sm font-medium transition-colors hover:text-teal-500 whitespace-nowrap ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Classes</a>
            <a href="#instructors" className={`text-sm font-medium transition-colors hover:text-teal-500 whitespace-nowrap ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Instructors</a>
            <a href="#about" className={`text-sm font-medium transition-colors hover:text-teal-500 whitespace-nowrap ${isScrolled ? 'text-gray-900' : 'text-white'}`}>About Us</a>
            <a href="#blog" className={`text-sm font-medium transition-colors hover:text-teal-500 whitespace-nowrap ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Blog</a>
            <a href="#contact" className={`text-sm font-medium transition-colors hover:text-teal-500 whitespace-nowrap ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <i className={`ri-search-line text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}></i>
            </button>
            <a href="#book" className="hidden lg:inline-block bg-teal-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer">
              Book Now
            </a>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="flex flex-col p-4 gap-4">
            <a href="#home" className="text-sm font-medium text-gray-900 hover:text-teal-500 py-2">Home</a>
            <a href="#classes" className="text-sm font-medium text-gray-900 hover:text-teal-500 py-2">Classes</a>
            <a href="#instructors" className="text-sm font-medium text-gray-900 hover:text-teal-500 py-2">Instructors</a>
            <a href="#about" className="text-sm font-medium text-gray-900 hover:text-teal-500 py-2">About Us</a>
            <a href="#blog" className="text-sm font-medium text-gray-900 hover:text-teal-500 py-2">Blog</a>
            <a href="#contact" className="text-sm font-medium text-gray-900 hover:text-teal-500 py-2">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}