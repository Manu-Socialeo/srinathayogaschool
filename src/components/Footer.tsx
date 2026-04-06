import { Link } from 'react-router-dom';

export default function Footer() {
  const waMessage = encodeURIComponent("Hi! I'm interested in learning more about Srinatha Yoga School's online classes.");
  const waLink = `https://wa.me/919886512083?text=${waMessage}`;

  return (
    <footer id="contact" className="bg-[#1a1f2c] text-white pt-20 pb-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Column 1: Logo & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 relative overflow-hidden rounded-lg">
                <img src="/logo.png" alt="Srinatha Yoga School Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight leading-tight">
                Srinatha<br />yoga school
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rooted in tradition, accessible to the world. We are dedicated to sharing the authentic science of Yoga to transform lives from within.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/yogawithsrinatha/" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-teal-500 transition-all duration-300">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="https://www.instagram.com/yogawithsrinatha/" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-teal-500 transition-all duration-300">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCtIfvwek8n3BKexg-hpWxlA" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-teal-500 transition-all duration-300">
                <i className="ri-youtube-fill text-lg"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links — Matches Header Flow */}
          <div>
            <h4 className="text-base font-bold mb-6 pb-2 border-b-2 border-teal-500 inline-block">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400 mt-2">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-teal-400 transition-colors">Courses</Link></li>
              <li><Link to="/events" className="hover:text-teal-400 transition-colors">Calendar Events</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
              <li><a href="/#faq" className="hover:text-teal-400 transition-colors">FAQ</a></li>
              <li><Link to="/terms" className="hover:text-teal-400 transition-colors">Terms & Conditions</Link></li>
              <li><a href="/#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Our Courses */}
          <div>
            <h4 className="text-base font-bold mb-6 pb-2 border-b-2 border-teal-500 inline-block">Our Courses</h4>
            <ul className="space-y-3 text-sm text-gray-400 mt-2">
              <li><Link to="/courses#ashtanga" className="hover:text-teal-400 transition-colors">Ashtanga Yoga</Link></li>
              <li><Link to="/courses#hatha" className="hover:text-teal-400 transition-colors">Hatha Yoga</Link></li>
              <li><Link to="/courses#iyengar" className="hover:text-teal-400 transition-colors">Iyengar Yoga</Link></li>
              <li><Link to="/courses#vinyasa" className="hover:text-teal-400 transition-colors">Vinyasa Yoga</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-base font-bold mb-6 pb-2 border-b-2 border-teal-500 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-400 mt-2">
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-2-line text-teal-400 text-xl mt-0.5 flex-shrink-0"></i>
                <span>14, Contour Rd, Gokulam 3rd Stage, Gokulam, Mysuru – 570002</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-phone-line text-teal-400 text-xl flex-shrink-0"></i>
                <a href="tel:+919886512083" className="hover:text-teal-400 transition-colors">+91 98865 12083</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-mail-line text-teal-400 text-xl flex-shrink-0"></i>
                <a href="mailto:help@srinathayogaschool.com" className="hover:text-teal-400 transition-colors break-all">help@srinathayogaschool.com</a>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <i className="ri-time-line text-teal-400 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <p>Mon–Sat: 5:30 AM – 7:00 PM</p>
                  <p className="text-red-400">Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar — Centered Copyright + Right Aligned T&C */}
        <div className="border-t border-gray-800 py-8 relative">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <p className="text-xs text-gray-500 whitespace-nowrap">
              Copyright © {new Date().getFullYear()} YogaWithSrinatha. All Rights Reserved. 
              <span className="mx-2 text-gray-700">|</span>
              Powered By 
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-teal-400 font-semibold hover:text-teal-300 hover:underline transition-all duration-200 cursor-pointer"
              >
                Socialeo
              </a>
            </p>
            
            {/* T&C Absolute on Desktop, Flow on Mobile */}
            <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
              <Link to="/terms" className="text-xs text-gray-500 hover:text-teal-400 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
