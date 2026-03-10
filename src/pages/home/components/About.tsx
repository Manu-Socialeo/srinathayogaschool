export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h4 className="text-sm font-semibold text-teal-500 mb-3">Discover More</h4>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Increases flexibility, strength, calmness and peace</h2>
          </div>
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Lism konlogi elektrotris hypovis. Dir pock till åjohusade trir. Depod mipibeska pohet bening runs. Vining soning: leliling äv. Mavire prengen den lal astrodiktisk kvasimatisk.Stenotreninade kosk medelcentrism.
            </p>
            <a href="#classes" className="inline-flex items-center gap-2 text-teal-500 font-medium hover:gap-3 transition-all cursor-pointer">
              Discover More <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-96">
              <img 
                src="/demos/themes/medit/wp-content/uploads/2024/12/image-04.jpg"
                alt="Pregnant Yoga"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Pregnant Yoga</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Discover gentle poses and breathing techniques designed specifically for expecting mothers, promoting relaxation and overall well-being during pregnancy.
              </p>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-4">
                <img 
                  src="/demos/themes/medit/wp-content/uploads/2024/12/trainer-avatar-01.jpg"
                  alt="Katherine Harisson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h6 className="font-semibold text-sm">Katherine Harisson</h6>
                  <p className="text-xs text-gray-500">Yoga Trainer</p>
                </div>
                <a href="#book" className="bg-black text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap">
                  Discover More
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-96">
              <img 
                src="/demos/themes/medit/wp-content/uploads/2024/12/image-05.jpg"
                alt="Ashtanga Yoga"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">Ashtanga Yoga</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Embrace the dynamic flow of Ashtanga Yoga to build strength, flexibility, and mental clarity through structured and powerful sequences.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl mb-4">
                <img 
                  src="/demos/themes/medit/wp-content/uploads/2024/12/trainer-avatar-03.jpg"
                  alt="Gunnel Ellenson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h6 className="font-semibold text-sm text-gray-900">Gunnel Ellenson</h6>
                  <p className="text-xs text-gray-500">Yoga Trainer</p>
                </div>
                <a href="#book" className="bg-black text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap">
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-white rounded-2xl">
          <h4 className="text-sm font-semibold text-teal-500 mb-3 text-center">Who We Are ?</h4>
          <h2 className="text-4xl font-bold mb-12 text-center tracking-tight">Do yoga properly with our skilled instructor</h2>
          
          <div className="grid lg:grid-cols-12 gap-8 px-8">
            <div className="lg:col-span-3 space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                Embrace a holistic approach to your well-being. Discover techniques that nurture both your mind and body, promoting a balanced and fulfilling lifestyle.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Redefine your wellness journey with mindful practices. Strengthen your body, calm your mind, and find the harmony you've been searching for.
              </p>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg"
                  alt="Wellness"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-xl overflow-hidden mb-6">
                <img 
                  src="/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg"
                  alt="Ashtanga Yoga"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute bottom-8 right-8 bg-white rounded-xl p-6 shadow-xl max-w-sm">
                <div className="flex items-start gap-4">
                  <img 
                    src="/demos/themes/medit/wp-content/themes/medit/assets/img/customer-avatar-01.jpg"
                    alt="Customer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill text-xs"></i>
                      ))}
                    </div>
                    <h5 className="font-semibold text-sm mb-2">Matilda Håkansson</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      The sessions completely transformed my mindset. I've never felt this balanced and at peace in my daily life. Highly recommended!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg"
                  alt="Practice"
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our personalized lessons are designed to inspire growth, balance, and harmony in every step you take.
              </p>
              <div>
                <h4 className="text-4xl font-bold mb-1">750+</h4>
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Lesson Conducted</h5>
                <p className="text-xs text-gray-500">Empowering over 750+ individuals on their wellness journey.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <div className="flex items-center gap-12 animate-scroll">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-12 opacity-50">
                <img src="/demos/themes/medit/wp-content/uploads/2025/01/logo-01.png" alt="Partner" className="h-8 grayscale" />
                <img src="/demos/themes/medit/wp-content/uploads/2025/01/logo-02.png" alt="Partner" className="h-8 grayscale" />
                <img src="/demos/themes/medit/wp-content/uploads/2025/01/logo-03.png" alt="Partner" className="h-8 grayscale" />
                <img src="/demos/themes/medit/wp-content/uploads/2025/01/logo-04.png" alt="Partner" className="h-8 grayscale" />
                <img src="/demos/themes/medit/wp-content/uploads/2025/01/logo-05.png" alt="Partner" className="h-8 grayscale" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}