import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What are the main benefits of practicing yoga?',
      answer: 'Yoga offers numerous physical, mental, and emotional benefits. Physically, it improves flexibility, strength, and posture while reducing the risk of injuries. Mentally, it helps reduce stress and anxiety by promoting relaxation and mindfulness. Emotionally, yoga can enhance self-awareness and boost overall well-being by fostering a deeper connection between mind and body.'
    },
    {
      question: 'How often should I meditate for optimal results?',
      answer: 'The frequency of meditation depends on your goals and lifestyle. Beginners can start with 5-10 minutes daily and gradually increase the duration as they become more comfortable. Ideally, meditating 20-30 minutes daily or 3-5 times a week can bring noticeable improvements in focus, stress reduction, and emotional balance.'
    },
    {
      question: 'Can yoga and meditation be combined in one session?',
      answer: 'Yes, yoga and meditation complement each other perfectly and can be combined in a single session. Yoga prepares the body and mind for meditation by releasing physical tension and calming the mind. After a yoga practice, you can seamlessly transition into meditation to deepen relaxation and enhance mindfulness.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <h4 className="text-sm font-semibold text-teal-500 mb-3">Discover More</h4>
            <h2 className="text-4xl font-bold tracking-tight">FAQs</h2>
          </div>
          <p className="text-gray-600 lg:max-w-md">
            Your common questions answered in one place. Find quick solutions and detailed explanations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/demos/themes/medit/wp-content/themes/medit/assets/img/image-13.jpg"
                alt="Yoga Teacher"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <img 
                    src="/demos/themes/medit/wp-content/themes/medit/assets/img/trainer-avatar-02.jpg"
                    alt="Hanna Andersson"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h6 className="font-semibold text-sm mb-1">Hanna Andersson</h6>
                    <p className="text-xs text-gray-500">Yoga Teacher</p>
                  </div>
                  <a href="#book" className="bg-teal-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="mb-8">
              <h4 className="text-sm font-bold text-teal-500 mb-3">Frequently Asked Questions</h4>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">A disciplined method for attaining a goal</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Your common questions answered in one place. Find quick solutions and detailed explanations to help you along your journey.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm text-gray-900 pr-4">{faq.question}</span>
                    <i className={`ri-${openIndex === index ? 'subtract' : 'add'}-line text-xl text-gray-600 flex-shrink-0`}></i>
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}