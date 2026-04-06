import { useState, useEffect } from 'react';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../lib/useSEO';

const sections = [
  {
    title: 'Certification',
    content: `The Teacher's Training Certificates are awarded to students on the basis of their performance and attendance throughout the training. All students should get a minimum of 60% to pass the assessment. Also, unless you have a serious illness or medical emergency you are expected not to miss any class. You must have a minimum 80% attendance. If you do not meet the standard then you will be awarded a certificate of attendance or participation instead of completion.`
  },
  {
    title: 'Unscheduled Changes',
    content: `Although it is very unlikely, in case of any changes in the scheduled Teacher's Training Course (TTC) dates, the venue or other events, you shall be informed at the earliest possible.`
  },
  {
    title: 'Discounts / Concessions',
    content: `At our discretion we reserve the right to offer discounts and concessions for groups or individuals based on several factors. This may not necessarily hold good for other students and might not be challenged.`
  },
  {
    title: 'Exclusions',
    content: `We do not accept responsibility or liability for cancellations, delays, changes or losses caused by acts of God, war, and threat of war, closure of airports, civil strife, natural disasters, accidents or any other events beyond our control. The same applies to injuries, illnesses, medical or psychiatric conditions developed during or subsequent to the holiday, as well as loss of /or damage to personal property of students.`
  },
  {
    title: 'Punctuality',
    content: `In respect for the group and the teachings we request that students arrive in ample time before the beginning of every class. Any late arrivals may find that they are not admitted into the class.`
  },
  {
    title: 'Accommodation',
    content: `Both Twin share and Single rooms are available for students. Single rooms are limited in number and charged additional. Rooms are very clean and comfortable. There are fans in all rooms. Accommodation and food for yoga students are provided within the school campus.\n\nInclusions:\n• Twin sharing basis (Included)\n• Water purifier (Mineral Water)\n• Running Hot and Cold Water round the clock\n• Wi-Fi (Free access)\n• Private Terrace / Sit-out in all rooms\n• Laundry and Dry Cleaning (washing machine)`
  },
  {
    title: 'Behavior',
    content: `If any student is continually disruptive or fails to comply with the terms and conditions we reserve the right to dismiss that person from the training and ask them to leave the venue. Silence should be maintained in asanas classes in the morning. It is proven that practices of silence allows students to assimilate the morning practice better.`
  },
  {
    title: 'Feedback',
    content: `We understand and respect your concerns. So as a part of our continuous improvement policy we'd be glad to address any of your concerns at the earliest possible. Every month we create a group in Whatsapp with all students in it for easy communication. You can also send your feedback to our email and we'd reply to it as soon as possible.`
  },
  {
    title: 'Consent and Indemnity Form',
    content: `I, hereby declare that I am enrolling myself in the Yoga With Srinatha TTC on my own free will and volition. I am aware of the possible risks involved while practicing Yoga TTC and in consideration of being permitted by Yoga with Srinatha to enroll in the above mentioned course and hereby for myself, my successors, personal representatives and assigns:\n\n(a) Do hereby absolve, acquit and discharge Yoga with Srinatha and its teachers, servants, employees, agents or volunteers from all or any responsibility, actions, causes of action, claims, demands and obligations whatsoever arising from any loss or damage (including, without limitation, physical injury, loss of life or property damage) caused by or sustained as a result of my participation in the course.\n\n(b) Will NOT hold Yoga with Srinatha and its teachers, servants, employees, agents or volunteers against all losses, claims, demands, actions, proceedings, damages, costs or expenses, including legal fees, and any other liability arising in any way from my participation in the above mentioned course.\n\n(c) I agree to follow the direction of the instructors strictly and understand that the instructors have the right to ask me to leave the class in case my behavior is found unacceptable or in case of me not following the instructions as specified.\n\n(d) I agree to follow the mutually agreed training schedule strictly and in case of my not keeping the schedule as discussed I will notify the school 24 hours prior to such default failing which I accept to pay an additional charge for every such instance.\n\n(e) I have read through the conditions for the availing of accommodation at the school and agree to abide by them.\n\n(f) I understand that, the fee for my training course is not refundable under any circumstances.`
  },
  {
    title: 'Disclaimer',
    content: `The training is not suitable for pregnant women or for anyone on medication for serious physical or mental conditions unless covered by a doctor's note.\n\nOn arrival to the training one of the things we request is that all students sign a disclaimer stating that they are fit and healthy both mentally and physically and they are prepared for intensive practices that may lead to emotional and physical releases.\n\nUltimately we ask that each person takes responsibility for themselves. This means resting when needing to or 'backing off' when ones feels about to move beyond any personal limitation (physical or mental).\n\nIf a trainee experiences any kind of crisis we are there to help and be supportive, however it must be recognized that we are not doctors or trained councilors. We have connections with local professionals, doctors, therapists and spiritual councilors (Indian and western) so if you need to see a professional it can be arranged.`
  },
  {
    title: 'Refund Policy',
    content: `Please go through the schedule carefully and decide whether you are physically and mentally prepared to take up the course as it could be intensive and challenging for some. Refund is not entertained either in part or full at any time during the course.\n\n1) If an applicant is accepted on a training the $400 deposit sent on application automatically becomes non-refundable. If an applicant is not accepted then the deposit will be immediately refunded.\n\n2) The balance of the course fee must be paid at the time of enrolment.\n\n3) In the unlikely event that the training is cancelled we will refund 100% of your payment or offer an alternative placement. Yoga With Srinatha is not to be held liable for flight costs or any other expenses.\n\n4) If a student withdraws from the course the deposit is non-refundable but can be transferred to another date.\n\nWhen you enroll to our teacher training course, you affirm that you are at least 18 years of age, and agree to abide and comply with these Terms & Conditions.`
  }
];

export default function TermsPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useSEO({
    title: 'Terms & Conditions',
    description: 'Terms and conditions for Srinatha Yoga School courses, teacher training, refunds, certifications, and student policies.',
    canonicalPath: '/terms',
    noindex: true
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      <section className="pt-40 pb-12 bg-gray-900 text-white" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Please read these terms carefully before enrolling in any of our programs.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i} className="border-b border-gray-100 pb-10"
                data-aos="fade-up"
                data-aos-delay={`${i * 60}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="pl-12">
                  {section.content.split('\n').map((line, j) => (
                    line.trim() ? (
                      <p key={j} className="text-gray-600 leading-relaxed mb-3">{line}</p>
                    ) : null
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-teal-50 rounded-2xl p-8 text-center">
            <p className="text-gray-600 mb-4">Have questions about our terms? We're here to help.</p>
            <a href="mailto:help@srinathayogaschool.com" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors">
              <i className="ri-mail-line"></i> Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
