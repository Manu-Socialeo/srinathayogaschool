import { useEffect, useRef, useState } from 'react';

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const faqs = [
    {
      question: 'What is yoga and how can it benefit me?',
      answer: 'Yoga is an ancient practice that combines physical postures, breathing techniques, and meditation to promote overall well-being. It can improve flexibility, strength, mental clarity, reduce stress, and enhance your quality of life.'
    },
    {
      question: 'Do I need prior experience to join your classes?',
      answer: 'Not at all! Our classes are designed for all levels, from complete beginners to advanced practitioners. Our experienced instructors will guide you through each session and provide modifications to suit your individual needs.'
    },
    {
      question: 'What should I bring to my first yoga class?',
      answer: 'We recommend bringing a yoga mat, comfortable clothing that allows for movement, a water bottle, and a towel. If you don\'t have a mat, we have extras available for use during your first few classes.'
    },
    {
      question: 'How often should I practice yoga?',
      answer: 'For beginners, we recommend starting with 2-3 sessions per week. As you become more comfortable, you can increase frequency. Consistency is more important than intensity, so find a schedule that works for you and stick with it.'
    },
    {
      question: 'Can yoga help with stress and anxiety?',
      answer: 'Yes! Yoga is highly effective for managing stress and anxiety. The combination of physical movement, controlled breathing, and mindfulness helps calm the nervous system, reduce cortisol levels, and promote a sense of peace and relaxation.'
    },
    {
      question: 'What types of yoga do you offer?',
      answer: 'We offer a variety of styles including Hatha, Vinyasa, Ashtanga, Yin, Restorative, Prenatal, and Hot Yoga. Each style has unique benefits, and our instructors can help you find the perfect fit for your goals and preferences.'
    }
  ];

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <h4 className="text-sm font-semibold text-teal-500 mb-3">Got Questions?</h4>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our yoga and meditation practices.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <i className={`ri-arrow-down-s-line text-2xl text-teal-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></i>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}