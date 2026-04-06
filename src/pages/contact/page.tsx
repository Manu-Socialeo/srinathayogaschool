import { useState, useEffect } from 'react';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useSEO } from '../../lib/useSEO';

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    experience: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: 'Contact Us — Get in Touch with Srinatha Yoga School',
    description: 'Contact Srinatha Yoga School in Mysore, India. Phone: +91 98865 12083, Email: help@srinathayogaschool.com. Located in Gokulam, the yoga capital of the world.',
    canonicalPath: '/contact',
    keywords: 'contact yoga school, yoga classes mysore contact, yoga school india, yoga school phone number, yoga school email',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Srinatha Yoga School',
      description: 'Get in touch with Srinatha Yoga School for classes, workshops, and retreats.',
      url: 'https://srinathayogaschool.com/contact',
      mainEntity: {
        '@type': 'Organization',
        name: 'Srinatha Yoga School',
        telephone: '+919886512083',
        email: 'help@srinathayogaschool.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '14, Contour Rd, Gokulam 3rd Stage',
          addressLocality: 'Mysuru',
          addressRegion: 'Karnataka',
          postalCode: '570002',
          addressCountry: 'IN'
        },
        openingHours: 'Mo-Sa 05:30-19:00'
      }
    }
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', country: '', experience: '', message: '' });
  };

  const countries = ['India', 'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Canada', 'Netherlands', 'Sweden', 'Italy', 'Spain', 'Brazil', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-gray-900 text-white overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-20">
          <img src="/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-sm font-medium mb-6">
            <i className="ri-mail-send-line"></i> Get in Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Have questions about our classes, workshops, or retreats? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8" data-aos="fade-right">
                <h3 className="text-xl font-bold mb-6">Reach Out</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-2-line text-xl text-teal-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600 text-sm">14, Contour Rd, Gokulam 3rd Stage, Mysuru – 570002, Karnataka, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-phone-line text-xl text-teal-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <a href="tel:+919886512083" className="text-teal-600 text-sm hover:underline">+91 98865 12083</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-xl text-teal-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:help@srinathayogaschool.com" className="text-teal-600 text-sm hover:underline break-all">help@srinathayogaschool.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-whatsapp-line text-xl text-green-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                      <a href="https://wa.me/919886512083" target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm hover:underline">Chat with us directly</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8" data-aos="fade-right" data-aos-delay="100">
                <h3 className="text-xl font-bold mb-4">Class Hours (IST)</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday – Saturday</span>
                    <span className="font-semibold text-gray-900">5:30 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8" data-aos="fade-right" data-aos-delay="200">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/yogawithsrinatha/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-white rounded-lg hover:bg-teal-500 hover:text-white text-gray-600 transition-all duration-300 shadow-sm">
                    <i className="ri-facebook-fill text-lg"></i>
                  </a>
                  <a href="https://www.instagram.com/yogawithsrinatha/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-white rounded-lg hover:bg-teal-500 hover:text-white text-gray-600 transition-all duration-300 shadow-sm">
                    <i className="ri-instagram-fill text-lg"></i>
                  </a>
                  <a href="https://www.youtube.com/channel/UCtIfvwek8n3BKexg-hpWxlA" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-white rounded-lg hover:bg-teal-500 hover:text-white text-gray-600 transition-all duration-300 shadow-sm">
                    <i className="ri-youtube-fill text-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3" data-aos="fade-left">
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="ri-check-line text-4xl text-green-600"></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <a href="/" className="text-teal-600 font-semibold hover:underline">← Back to Home</a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                    <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll respond promptly.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        >
                          <option value="">Select country</option>
                          {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      >
                        <option value="">Select your level</option>
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your yoga goals, questions, or what you'd like to learn..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-0.5"
                    >
                      Send Message <i className="ri-send-plane-fill ml-2"></i>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Find Us in Mysore</h2>
            <p className="text-gray-500">Located in the heart of Gokulam, the yoga capital of the world.</p>
          </div>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.3!2d76.63!3d12.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE3JzI0LjAiTiA3NsKwMzcnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Srinatha Yoga School Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 mb-10">Quick answers before you reach out.</p>
          <div className="space-y-4 text-left">
            {[
              { q: 'Do I need prior yoga experience?', a: 'No! Our classes welcome all levels from complete beginners to advanced practitioners.' },
              { q: 'How do online classes work?', a: 'All sessions are conducted live via Zoom. You\'ll receive the link after booking.' },
              { q: 'What timezone are classes in?', a: 'All class times are in IST (UTC+5:30). We offer sessions at various times to accommodate global students.' },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" data-aos-delay={`${i * 100}`}>
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a href="/#faq" className="text-teal-600 font-semibold hover:underline">View all FAQs →</a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
