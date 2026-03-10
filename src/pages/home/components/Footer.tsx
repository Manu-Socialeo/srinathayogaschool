export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full flex-shrink-0">
                <i className="ri-phone-line text-xl text-teal-500"></i>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  <a href="tel:+14232195624" className="hover:text-teal-500 transition-colors">+1 (423) 2195 - 6241</a>
                </h3>
                <p className="text-sm text-gray-400">contact us with phone</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full flex-shrink-0">
                <i className="ri-mail-line text-xl text-teal-500"></i>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  <a href="mailto:help@medit.com" className="hover:text-teal-500 transition-colors">help@medit.com</a>
                </h3>
                <p className="text-sm text-gray-400">contact us with mail</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full flex-shrink-0">
                <i className="ri-map-pin-line text-xl text-teal-500"></i>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Los Angeles</h3>
                <p className="text-sm text-gray-400">1116 Wilshire Blvd, Santa Monica</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <img 
              src="/demos/themes/medit/wp-content/themes/medit/assets/img/logo-light.png"
              alt="Medit"
              className="h-8 mb-6"
            />
            <p className="text-gray-400 leading-relaxed mb-6">
              Our mission at Medit is to unlock human performance. When you choose to partner with us, we'll do everything we can to help you find your inner potential.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-teal-500 transition-colors cursor-pointer">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-teal-500 transition-colors cursor-pointer">
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-teal-500 transition-colors cursor-pointer">
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-teal-500 transition-colors cursor-pointer">
                <i className="ri-youtube-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-teal-500 transition-colors cursor-pointer">
                <i className="ri-linkedin-fill"></i>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">How We Work</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Product Archive</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Find a Retail Store</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">The Medit Foundation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Online Store</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">FAQs</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Terms & Conditions</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Cookie Policy</a></li>
                </ul>
                <h4 className="font-semibold mb-4 mt-8">Partner</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Become a Affiliate</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Partner With Medit</a></li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Member Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Order Status</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Member Login</a></li>
                </ul>
                <h4 className="font-semibold mb-4 mt-8">Connect</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Customer Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Press Center</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-gray-400 text-center">
            Medit Yoga © 2025 - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}