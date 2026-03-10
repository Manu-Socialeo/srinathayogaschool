export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-teal-50 to-white pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <img 
                  src="/demos/themes/medit/wp-content/themes/medit/assets/img/avatar-01.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/demos/themes/medit/wp-content/themes/medit/assets/img/avatar-02.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/demos/themes/medit/wp-content/themes/medit/assets/img/avatar-03.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-xs"></i>
                  ))}
                </div>
                <p className="text-xs text-gray-600">Trusted by 7.3K users. Join us and make your life colourful</p>
              </div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Explorer the <span className="text-teal-500">wonders</span> of innerpeace of mind
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Discover the perfect balance between body, mind, and soul. Whether you're a yoga enthusiast, a fitness lover, or seeking inner peace through meditation, our practices are tailored to guide you towards a healthier and happier lifestyle.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#pricing" className="bg-black text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap">
                Get Started <i className="ri-arrow-right-up-line"></i>
              </a>
              <a href="#about" className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                Subscribe Now
              </a>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <div className="w-16 h-px bg-gray-300 mt-3"></div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                Our yoga teacher <strong>Anette Lundberg</strong>, who is an expert in his profession, has won an award in yoga. Him course will start on <strong>August 29th</strong>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/demos/themes/medit/wp-content/themes/medit/assets/img/hero-02.jpg"
                alt="Yoga Practice"
                className="w-full h-[600px] object-cover"
              />
            </div>

            <div className="absolute bottom-8 left-0 right-0 px-4">
              <div className="text-right text-xs text-gray-600 mb-2">Mon - Thu. 09:00 - 17:00</div>
              <div className="bg-white rounded-2xl p-5 shadow-xl max-w-md ml-auto">
                <div className="flex items-center gap-4">
                  <img 
                    src="/demos/themes/medit/wp-content/themes/medit/assets/img/trainer-avatar-01.jpg"
                    alt="Gunnel Eliasson"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h6 className="font-semibold text-sm mb-1">Gunnel Eliasson</h6>
                    <p className="text-xs text-gray-500">Lead Trainer</p>
                  </div>
                  <a href="#book" className="bg-teal-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold">Barbro Forsberg</h4>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-xs"></i>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                The sessions completely transformed my mindset. I've never felt this balanced and at peace in my daily life. Highly recommended!
              </p>
              <div className="pt-4">
                <h4 className="text-4xl font-bold mb-1">3000+</h4>
                <span className="text-xs text-gray-500">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}