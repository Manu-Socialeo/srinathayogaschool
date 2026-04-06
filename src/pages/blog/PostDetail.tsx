import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useSEO } from '../../lib/useSEO';

interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  content: string[];
  relatedPosts: { slug: string; title: string; image: string; category: string }[];
}

const articles: Record<string, Article> = {
  'power-of-daily-meditation': {
    slug: 'power-of-daily-meditation',
    title: 'The Power of Daily Meditation Practice',
    category: 'Meditation',
    date: 'January 15, 2025',
    author: 'Dr. Balasundara Srinatha',
    readTime: '5 min read',
    image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg',
    content: [
      'In the ancient tradition of yoga, meditation (Dhyana) is considered the seventh limb of the eightfold path. It is the bridge between the external practices and the innermost state of pure awareness. Yet, in our modern world, many people struggle to find even ten minutes for this transformative practice.',
      'The beauty of daily meditation lies not in its complexity but in its simplicity. When you sit quietly and observe your breath, you begin to notice the patterns of your mind — the endless stream of thoughts, the emotional reactions, the habitual responses that govern your life.',
      'Research has consistently shown that regular meditation practice can reduce cortisol levels, lower blood pressure, improve focus, and enhance overall well-being. But beyond the scientific benefits, meditation offers something far more profound: a direct experience of who you are beyond the thinking mind.',
      'At Srinatha Yoga School, we begin every class with a brief meditation session. This is not an afterthought — it is the foundation upon which all other practices rest. When the mind is calm and focused, the body responds differently to asanas, the breath flows more naturally, and the entire practice deepens.',
      'If you are new to meditation, start with just five minutes a day. Sit comfortably, close your eyes, and simply watch your breath. Don\'t try to control it or change it — just observe. When your mind wanders (and it will), gently bring your attention back to the breath. That gentle return is the practice.',
      'Over time, you will notice changes. You may find yourself responding rather than reacting to stressful situations. You may sleep better, feel more energized, and experience a deeper sense of connection to yourself and others. These are not promises — they are the natural fruits of a consistent practice.'
    ],
    relatedPosts: [
      { slug: 'breathing-techniques-for-stress-relief', title: 'Breathing Techniques for Stress Relief', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg', category: 'Wellness' },
      { slug: 'understanding-eight-limbs-of-yoga', title: 'Understanding the Eight Limbs of Yoga', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/hero-02.jpg', category: 'Philosophy' },
      { slug: 'benefits-of-restorative-yoga', title: 'The Benefits of Restorative Yoga', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg', category: 'Recovery' }
    ]
  },
  'morning-yoga-routines-for-beginners': {
    slug: 'morning-yoga-routines-for-beginners',
    title: 'Morning Yoga Routines for Beginners',
    category: 'Yoga',
    date: 'January 12, 2025',
    author: 'Sahana P R',
    readTime: '7 min read',
    image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg',
    content: [
      'There is something magical about practicing yoga in the early morning hours. The world is quiet, the mind is fresh, and the body is ready to be awakened. For beginners, establishing a morning yoga routine can be the most powerful step toward building a sustainable practice.',
      'The key to a successful morning practice is to start gently. Your body has been still for hours, and your muscles need time to warm up. Begin with a few minutes of conscious breathing, then move through some simple stretches to awaken the spine.',
      'A great sequence for beginners includes: Cat-Cow stretches to mobilize the spine, Downward-Facing Dog to stretch the entire back body, Warrior I and II to build strength and confidence, and finally, a few minutes of Savasana to integrate the practice.',
      'Remember, yoga is not about perfection. It is about showing up on your mat, breathing, and being present with whatever arises. Some mornings you will feel energized and flexible. Other mornings, your body will feel stiff and resistant. Both are perfect.',
      'At our school, we recommend starting with just 15-20 minutes each morning. Consistency matters far more than duration. A short daily practice will transform you more than a long weekly one.',
      'Join our online morning sessions where Dr. Srinatha guides beginners through gentle, effective sequences designed to build strength, flexibility, and confidence from day one.'
    ],
    relatedPosts: [
      { slug: 'power-of-daily-meditation', title: 'The Power of Daily Meditation Practice', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg', category: 'Meditation' },
      { slug: 'nutrition-tips-for-yoga-practitioners', title: 'Nutrition Tips for Yoga Practitioners', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg', category: 'Nutrition' },
      { slug: 'breathing-techniques-for-stress-relief', title: 'Breathing Techniques for Stress Relief', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg', category: 'Wellness' }
    ]
  },
  'breathing-techniques-for-stress-relief': {
    slug: 'breathing-techniques-for-stress-relief',
    title: 'Breathing Techniques for Stress Relief',
    category: 'Wellness',
    date: 'January 10, 2025',
    author: 'Vinayaka Honnavar',
    readTime: '6 min read',
    image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg',
    content: [
      'Pranayama, or breath control, is one of the most powerful tools in the yogic toolkit for managing stress and anxiety. Unlike many other stress-relief techniques, pranayama can be practiced anywhere, at any time, with no equipment needed.',
      'The connection between breath and the nervous system is well-documented. When you are stressed, your breathing becomes shallow and rapid. By consciously slowing and deepening your breath, you send a signal to your nervous system that it is safe to relax.',
      'Three techniques we teach at Srinatha Yoga School are particularly effective: Nadi Shodhana (alternate nostril breathing) for balancing the mind, Bhramari (bee breath) for calming anxiety, and Dirga Pranayama (three-part breath) for deep relaxation.',
      'Nadi Shodhana involves alternating the breath between nostrils using the fingers of the right hand. This practice balances the left and right hemispheres of the brain and creates a profound sense of inner calm. Practice for 5-10 minutes whenever you feel overwhelmed.',
      'Bhramari is remarkably simple: close your eyes, place your index fingers on the cartilage between your cheek and ear, and exhale while making a humming sound like a bee. The vibration is incredibly soothing to the nervous system.',
      'These ancient techniques have been practiced for thousands of years for good reason. They work. And in our modern world of constant stimulation, they are more relevant than ever.'
    ],
    relatedPosts: [
      { slug: 'power-of-daily-meditation', title: 'The Power of Daily Meditation Practice', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg', category: 'Meditation' },
      { slug: 'understanding-eight-limbs-of-yoga', title: 'Understanding the Eight Limbs of Yoga', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/hero-02.jpg', category: 'Philosophy' },
      { slug: 'morning-yoga-routines-for-beginners', title: 'Morning Yoga Routines for Beginners', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg', category: 'Yoga' }
    ]
  },
  'understanding-eight-limbs-of-yoga': {
    slug: 'understanding-eight-limbs-of-yoga',
    title: 'Understanding the Eight Limbs of Yoga',
    category: 'Philosophy',
    date: 'January 8, 2025',
    author: 'Vinayaka Honnavar',
    readTime: '8 min read',
    image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/hero-02.jpg',
    content: [
      'When most people think of yoga, they think of physical postures. But asanas are just one of the eight limbs described by the sage Patanjali in the Yoga Sutras, written over 2,000 years ago. Understanding all eight limbs provides a complete framework for living a meaningful and purposeful life.',
      'The eight limbs are: Yama (ethical disciplines), Niyama (self-observances), Asana (physical postures), Pranayama (breath control), Pratyahara (withdrawal of senses), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption or enlightenment).',
      'Each limb builds upon the previous one. Without a foundation of ethical living (Yama) and self-discipline (Niyama), the physical practice becomes mere exercise. Without breath control, meditation remains elusive. This is why at Srinatha Yoga School, we teach yoga as a holistic practice.',
      'The Yamas include non-violence (Ahimsa), truthfulness (Satya), non-stealing (Asteya), moderation (Brahmacharya), and non-possessiveness (Aparigraha). These are not commandments but observations about what leads to suffering and what leads to freedom.',
      'The Niyamas include purity (Saucha), contentment (Santosha), discipline (Tapas), self-study (Svadhyaya), and surrender (Ishvara Pranidhana). Together, these eight limbs form a complete path from the outer world to the innermost self.',
      'In our philosophy classes, we explore each limb in depth, connecting ancient wisdom to modern life. Whether you are a complete beginner or an experienced practitioner, there is always more to discover in these timeless teachings.'
    ],
    relatedPosts: [
      { slug: 'power-of-daily-meditation', title: 'The Power of Daily Meditation Practice', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg', category: 'Meditation' },
      { slug: 'breathing-techniques-for-stress-relief', title: 'Breathing Techniques for Stress Relief', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg', category: 'Wellness' },
      { slug: 'nutrition-tips-for-yoga-practitioners', title: 'Nutrition Tips for Yoga Practitioners', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg', category: 'Nutrition' }
    ]
  },
  'nutrition-tips-for-yoga-practitioners': {
    slug: 'nutrition-tips-for-yoga-practitioners',
    title: 'Nutrition Tips for Yoga Practitioners',
    category: 'Nutrition',
    date: 'January 5, 2025',
    author: 'Sahana P R',
    readTime: '6 min read',
    image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg',
    content: [
      'In the yogic tradition, food is classified into three categories: Sattvic (pure and balanced), Rajasic (stimulating and aggressive), and Tamasic (dull and heavy). What you eat directly affects your mind, your practice, and your overall well-being.',
      'A Sattvic diet emphasizes fresh fruits, vegetables, whole grains, legumes, nuts, and seeds. These foods are light, nourishing, and promote clarity of mind. They are the foundation of a yogic diet and support both physical health and spiritual practice.',
      'Before your yoga practice, it is best to have a light stomach. If you need to eat, choose something easily digestible like a banana or a handful of almonds at least 30 minutes before practice. After practice, wait 20-30 minutes before eating a full meal.',
      'Hydration is equally important. Drink plenty of water throughout the day, but avoid drinking large amounts during your practice. Warm water with lemon in the morning is an excellent way to start the day and support digestion.',
      'In Ayurveda, which is the sister science of yoga, food is also medicine. Eating according to your dosha (body constitution) can help balance your energy, improve digestion, and prevent disease. Our Ayurveda teacher Charanya offers personalized guidance on this topic.',
      'Remember, the goal is not perfection. It is awareness. Pay attention to how different foods make you feel — in your body, your mind, and your practice. Let that awareness guide your choices.'
    ],
    relatedPosts: [
      { slug: 'morning-yoga-routines-for-beginners', title: 'Morning Yoga Routines for Beginners', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg', category: 'Yoga' },
      { slug: 'benefits-of-restorative-yoga', title: 'The Benefits of Restorative Yoga', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg', category: 'Recovery' },
      { slug: 'breathing-techniques-for-stress-relief', title: 'Breathing Techniques for Stress Relief', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg', category: 'Wellness' }
    ]
  },
  'benefits-of-restorative-yoga': {
    slug: 'benefits-of-restorative-yoga',
    title: 'The Benefits of Restorative Yoga',
    category: 'Recovery',
    date: 'January 3, 2025',
    author: 'Ravi Prabhakar',
    readTime: '5 min read',
    image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg',
    content: [
      'In a culture that glorifies busyness and intensity, restorative yoga is a radical act of self-care. This gentle practice uses props — bolsters, blankets, blocks — to fully support the body in comfortable positions held for 5-20 minutes each.',
      'The purpose is not to stretch or strengthen but to activate the parasympathetic nervous system — the body\'s rest-and-digest response. In our modern world of chronic stress, this activation is not a luxury; it is a necessity.',
      'Restorative yoga has been shown to reduce cortisol levels, lower blood pressure, improve sleep quality, boost immune function, and reduce symptoms of anxiety and depression. It is particularly beneficial for people recovering from illness, injury, or burnout.',
      'A typical restorative session might include just 4-6 poses: Supported Child\'s Pose, Legs-Up-The-Wall, Supported Bridge, and Reclining Bound Angle. Each pose is held for several minutes with complete support, allowing the body to release tension on its own timeline.',
      'At Srinatha Yoga School, we include restorative elements in every class, even the more vigorous ones. We believe that effort and ease must be balanced. Without rest, there is no recovery. Without recovery, there is no growth.',
      'If you have never tried restorative yoga, we invite you to join one of our sessions. You may be surprised at how challenging it is to simply be still — and how deeply rewarding that stillness can be.'
    ],
    relatedPosts: [
      { slug: 'breathing-techniques-for-stress-relief', title: 'Breathing Techniques for Stress Relief', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg', category: 'Wellness' },
      { slug: 'power-of-daily-meditation', title: 'The Power of Daily Meditation Practice', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg', category: 'Meditation' },
      { slug: 'nutrition-tips-for-yoga-practitioners', title: 'Nutrition Tips for Yoga Practitioners', image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg', category: 'Nutrition' }
    ]
  }
};

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const article = slug ? articles[slug] : undefined;

  useSEO(article ? {
    title: article.title,
    description: article.content[0].substring(0, 160),
    canonicalPath: `/blog/${slug}`,
    keywords: `${article.category.toLowerCase()}, yoga blog, ${article.author.toLowerCase()}`,
    ogImage: article.image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.content[0],
      image: `https://srinathayogaschool.com${article.image}`,
      author: { '@type': 'Person', name: article.author },
      publisher: { '@type': 'Organization', name: 'Srinatha Yoga School', logo: { '@type': 'ImageObject', url: 'https://srinathayogaschool.com/logo.png' } },
      datePublished: article.date,
      dateModified: article.date,
      mainEntityOfPage: `https://srinathayogaschool.com/blog/${slug}`
    }
  } : {
    title: 'Article Not Found',
    description: 'The article you are looking for does not exist.',
    canonicalPath: '/blog',
    noindex: true
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all">
            <i className="ri-arrow-left-line"></i> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gray-900 text-white overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-30">
          <img src={article.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="inline-block bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">{article.category}</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1"><i className="ri-user-line"></i>{article.author}</span>
            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{article.date}</span>
            <span className="flex items-center gap-1"><i className="ri-time-line"></i>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-6">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg" data-aos="fade-up" data-aos-delay={`${i * 50}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Card */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8 flex items-center gap-6" data-aos="fade-up">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {article.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{article.author}</h4>
              <p className="text-gray-500 text-sm">Certified Instructor at Srinatha Yoga School</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal-500 rounded-2xl p-10 text-center text-white" data-aos="zoom-in">
            <h3 className="text-2xl font-bold mb-3">Ready to deepen your practice?</h3>
            <p className="text-white/90 mb-6">Join our online classes and learn directly from experienced instructors in Mysore, India.</p>
            <Link to="/courses" className="inline-block bg-white text-teal-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
              Explore Courses
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {article.relatedPosts.map((post, i) => (
              <Link key={i} to={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1" data-aos="fade-up" data-aos-delay={`${i * 100}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-white text-teal-600 px-3 py-1 rounded-full text-xs font-semibold shadow">{post.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors leading-snug">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
