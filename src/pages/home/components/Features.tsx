export default function Features() {
  const features = [
    {
      icon: 'ri-mental-health-line',
      title: 'Mindful Practices',
      description: 'Experience the art of mindfulness through guided techniques designed to calm your mind and enhance inner peace.'
    },
    {
      icon: 'ri-sparkling-2-line',
      title: 'Spiritual Growth',
      description: 'Explore practices that connect you with your inner self, fostering balance, clarity, and spiritual awakening.'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: 'Holistic Wellness',
      description: 'Achieve harmony of body, mind, and spirit with a holistic approach to health and well-being toward wellness.'
    }
  ];

  return (
    <section className="py-20 border-b">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-full flex-shrink-0">
                <i className={`${feature.icon} text-2xl text-teal-600`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}