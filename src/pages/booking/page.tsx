import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useSEO } from '../../lib/useSEO';

const sampleCourses = [
  { id: 'ashtanga', title: 'Ashtanga Yoga', type: 'Online Class', price: 150, currency: 'USD', depositPercent: 10, description: 'Traditional Mysore-style Ashtanga practice with personalized guidance.', startDate: '2026-04-15', endDate: '2026-06-15', seatsBooked: 12, seatLimit: 30, image: '/images/image-01.jpg' },
  { id: 'hatha', title: 'Hatha Yoga', type: 'Online Class', price: 120, currency: 'USD', depositPercent: 10, description: 'Classical Hatha yoga with focus on alignment, breath control, and meditation.', startDate: '2026-04-20', endDate: '2026-07-20', seatsBooked: 8, seatLimit: 25, image: '/images/image-02.jpg' },
  { id: 'iyengar', title: 'Iyengar Yoga', type: 'Online Workshop', price: 200, currency: 'USD', depositPercent: 10, description: 'Precision-based practice focusing on alignment and use of props.', startDate: '2026-05-01', endDate: '2026-05-03', seatsBooked: 5, seatLimit: 20, image: '/images/image-03.jpg' },
  { id: 'vinyasa', title: 'Vinyasa Flow', type: 'Online Course', price: 180, currency: 'USD', depositPercent: 10, description: 'Dynamic flow yoga connecting breath with movement.', startDate: '2026-05-10', endDate: '2026-07-10', seatsBooked: 15, seatLimit: 35, image: '/images/hero-01.jpg' },
];

const countries = ['India', 'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Canada', 'Netherlands', 'Sweden', 'Italy', 'Spain', 'Brazil', 'Russia', 'South Korea', 'China', 'UAE', 'Singapore', 'Other'];
const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

export default function BookingPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentOption, setPaymentOption] = useState<'deposit' | 'full'>('full');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    experienceLevel: '',
    medicalConditions: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const course = sampleCourses.find(c => c.id === courseId) || sampleCourses[0];
  const seatsLeft = (course.seatLimit || 0) - course.seatsBooked;

  useSEO({
    title: `Book ${course.title} — Online Yoga Class`,
    description: `Book your spot in ${course.title} at Srinatha Yoga School. ${course.description} Starting ${new Date(course.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`,
    canonicalPath: `/booking/${courseId}`,
    keywords: `book ${course.title.toLowerCase()}, online yoga class booking, yoga class registration, ${course.title.toLowerCase()} mysore`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: course.title,
      description: course.description,
      brand: { '@type': 'Brand', name: 'Srinatha Yoga School' },
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.currency,
        availability: seatsLeft > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `https://srinathayogaschool.com/booking/${courseId}`
      }
    }
  });

  const depositAmount = course.price * (course.depositPercent / 100);
  const payNow = paymentOption === 'deposit' ? depositAmount : course.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleConfirmBooking = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/dashboard'), 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md" data-aos="fade-up">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="ri-check-line text-5xl text-green-600"></i>
          </div>
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you, {formData.fullName}.</p>
          <p className="text-gray-500 mb-8">Your booking for <strong>{course.title}</strong> has been confirmed. You'll receive a confirmation email shortly with all details and the Zoom link.</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <p className="text-sm text-gray-600 mb-2"><strong>Amount:</strong> ${payNow.toFixed(2)} {paymentOption === 'deposit' ? `(Deposit — $${(course.price - depositAmount).toFixed(2)} due before class)` : '(Full Payment)'}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {new Date(course.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-sm text-gray-600"><strong>Next Step:</strong> Redirecting to your dashboard...</p>
          </div>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all">
            Go to Dashboard <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isScrolled={isScrolled} />

      {/* Hero */}
      <section className="relative pt-40 pb-16 bg-gray-900 text-white overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-20">
          <img src={course.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <Link to="/courses" className="text-teal-400 text-sm hover:underline mb-4 inline-block">← Back to Courses</Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Book: {course.title}</h1>
          <p className="text-gray-300 text-lg">{course.description}</p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Registration' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Confirmation' }
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s.num ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > s.num ? <i className="ri-check-line"></i> : s.num}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${step >= s.num ? 'text-teal-600' : 'text-gray-400'}`}>{s.label}</span>
                {i < 2 && <div className={`w-12 h-0.5 ${step > s.num ? 'bg-teal-500' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 1: Registration Form */}
      {step === 1 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3" data-aos="fade-right">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">Registration Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                        <select required value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                          <option value="">Select</option>
                          {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level *</label>
                        <select required value={formData.experienceLevel} onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                          <option value="">Select</option>
                          {experienceLevels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Medical Conditions (Optional)</label>
                      <textarea rows={3} value={formData.medicalConditions} onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none" placeholder="Any conditions we should know about..." />
                    </div>
                    <button type="submit" className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-0.5">
                      Continue to Payment <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </form>
                </div>
              </div>

              {/* Course Summary */}
              <div className="lg:col-span-2" data-aos="fade-left">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                  <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{course.type}</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-semibold">{new Date(course.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-semibold">{course.type === 'Online Workshop' ? 'Multi-day' : course.type === 'Online Course' ? 'Multi-week' : 'Ongoing'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Seats Left</span><span className={`font-semibold ${seatsLeft < 10 ? 'text-red-500' : 'text-green-600'}`}>{seatsLeft} / {course.seatLimit}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Price</span><span className="font-bold text-lg">${course.price}</span></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="ri-shield-check-line text-teal-500"></i>
                      <span>Secure booking • Zoom link sent via email</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Payment Selection */}
      {step === 2 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-2xl" data-aos="fade-up">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-2">Choose Payment Option</h2>
              <p className="text-gray-500 mb-8">Select how you'd like to pay for {course.title}.</p>

              {/* Payment Options */}
              <div className="space-y-4 mb-8">
                <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentOption === 'full' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="full" checked={paymentOption === 'full'} onChange={() => setPaymentOption('full')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentOption === 'full' ? 'border-teal-500' : 'border-gray-300'}`}>
                    {paymentOption === 'full' && <div className="w-3 h-3 bg-teal-500 rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Pay Full Amount</h4>
                    <p className="text-sm text-gray-500">One-time payment of ${course.price}</p>
                  </div>
                  <span className="text-xl font-bold text-gray-900">${course.price}</span>
                </label>

                <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentOption === 'deposit' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="deposit" checked={paymentOption === 'deposit'} onChange={() => setPaymentOption('deposit')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentOption === 'deposit' ? 'border-teal-500' : 'border-gray-300'}`}>
                    {paymentOption === 'deposit' && <div className="w-3 h-3 bg-teal-500 rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Pay {course.depositPercent}% Deposit Now</h4>
                    <p className="text-sm text-gray-500">Pay ${depositAmount} now, remaining ${(course.price - depositAmount).toFixed(2)} due before class</p>
                  </div>
                  <span className="text-xl font-bold text-gray-900">${depositAmount.toFixed(2)}</span>
                </label>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-teal-500 bg-teal-50 font-semibold text-teal-700">
                    <i className="ri-paypal-line text-xl"></i> PayPal
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-teal-500 font-semibold text-gray-700 transition-all">
                    <i className="ri-bank-card-line text-xl"></i> Razorpay
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Course</span><span className="font-semibold">{course.title}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Student</span><span className="font-semibold">{formData.fullName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-semibold">{formData.email}</span></div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between text-lg"><span className="font-bold">Amount Due Now</span><span className="font-bold text-teal-600">${payNow.toFixed(2)}</span></div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:border-gray-300 transition-all">
                  ← Back
                </button>
                <button onClick={handleConfirmBooking} className="flex-1 bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20">
                  Confirm & Pay ${payNow.toFixed(2)} <i className="ri-lock-line ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
