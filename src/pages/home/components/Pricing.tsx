export default function Pricing() {
  const plans = [
    {
      name: 'Basic Plan',
      price: '$100',
      description: 'Start your journey with essential yoga and meditation sessions designed for beginners.',
      features: [
        'Access to beginner-level yoga and meditation classes.',
        'Weekly guided sessions (up to 5 sessions).',
        'Email support for questions and guidance.',
        'Community forum access for sharing experiences.',
        'Mobile app access for practice tracking.'
      ],
      featured: false
    },
    {
      name: 'Plus Plan',
      price: '$200',
      description: 'Elevate your practice with unlimited classes, exclusive live sessions, and expert guidance.',
      features: [
        'Everything in the Basic Plan, plus:',
        'Unlimited yoga and meditation sessions.',
        'Access to exclusive live classes with expert instructors.',
        'Downloadable guided meditation and yoga videos.',
        'Priority email support and dedicated Q&A sessions.'
      ],
      featured: true
    },
    {
      name: 'Pro Plan',
      price: '$300',
      description: 'Achieve your wellness goals with personalized plans, one-on-one sessions, and advanced features.',
      features: [
        'Everything in the Premium Plan, plus:',
        'Personalized meditation plans tailored to your goals.',
        'One-on-one sessions with expert instructors.',
        'Early access to workshops and events.',
        'Monthly progress reports and wellness tips.'
      ],
      featured: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <h4 className="text-sm font-semibold text-teal-500 mb-3">Discover More</h4>
            <h2 className="text-4xl font-bold tracking-tight">Pricing</h2>
          </div>
          <p className="text-gray-600 lg:max-w-md">
            Choose the plan that suits your needs. Affordable options designed for everyone to begin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-8 ${plan.featured ? 'bg-teal-500 text-white transform lg:-translate-y-4' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all`}
            >
              <h3 className={`text-2xl font-bold mb-3 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 leading-relaxed ${plan.featured ? 'text-teal-50' : 'text-gray-600'}`}>{plan.description}</p>
              
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.featured ? 'text-teal-50' : 'text-gray-500'}`}> / month</span>
                <p className={`text-xs mt-2 ${plan.featured ? 'text-teal-50' : 'text-gray-500'}`}>Price for first 100 users, more?</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <i className={`ri-check-line text-lg flex-shrink-0 mt-0.5 ${plan.featured ? 'text-white' : 'text-teal-500'}`}></i>
                    <span className={`text-sm leading-relaxed ${plan.featured ? 'text-teal-50' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#book" 
                className={`block text-center px-6 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  plan.featured 
                    ? 'bg-white text-teal-500 hover:bg-gray-100' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}