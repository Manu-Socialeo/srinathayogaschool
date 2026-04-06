import { Link } from 'react-router-dom';

export default function YogaClasses() {
  const classes = [
    {
      id: 'ashtanga',
      title: 'Ashtanga Yoga',
      subtitle: 'In Mysore, India',
      description: 'Experience the traditional Ashtanga yoga method with personalized guidance. Our online course brings authentic Mysore-style practice to your home.',
      image: '/ashtanga-custom.png',
      features: ['Traditional Mysore Style', 'Individual Attention', 'Online Sessions Available'],
      level: 'All Levels'
    },
    {
      id: 'hatha',
      title: 'Hatha Yoga',
      subtitle: 'In Mysore, India',
      description: 'Master the classical Hatha yoga practice with deep focus on alignment, breath control, and meditation techniques for holistic well-being.',
      image: '/hatha-custom.png',
      features: ['Classical Techniques', 'Alignment Focus', 'Online Sessions Available'],
      level: 'All Levels'
    }
  ];

  return (
    <section id="classes" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="text-sm font-semibold text-teal-500 mb-3">Our Programs</h4>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Yoga Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn authentic yoga traditions from Mysore, India through our comprehensive online courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {classes.map((yogaClass, index) => (
            <div
              key={index}
              className="group bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={yogaClass.image}
                  alt={yogaClass.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-teal-600">
                  Online Course
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-4">
                  <span className="text-teal-500 text-sm font-medium">{yogaClass.subtitle}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{yogaClass.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {yogaClass.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {yogaClass.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="bg-white px-3 py-1.5 rounded-lg text-sm text-gray-700 border border-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Level: <span className="font-medium text-gray-900">{yogaClass.level}</span></span>
                  <Link to={`/booking/${yogaClass.id}`} className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-teal-600 transition-colors duration-300">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}