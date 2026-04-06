import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../lib/useSEO';

const articles = [
  {
    slug: 'power-of-daily-meditation',
    image: '/images/image-01.jpg',
    category: 'Meditation',
    date: 'January 15, 2025',
    title: 'The Power of Daily Meditation Practice',
    excerpt: 'Discover how just 10 minutes of daily meditation can transform your mental clarity, reduce stress, and improve overall well-being.',
    author: 'Dr. Balasundara Srinatha',
    readTime: '5 min read'
  },
  {
    slug: 'morning-yoga-routines-for-beginners',
    image: '/images/image-02.jpg',
    category: 'Yoga',
    date: 'January 12, 2025',
    title: 'Morning Yoga Routines for Beginners',
    excerpt: 'Start your day right with these simple yet effective yoga sequences designed specifically for those new to the practice.',
    author: 'Sahana P R',
    readTime: '7 min read'
  },
  {
    slug: 'breathing-techniques-for-stress-relief',
    image: '/images/image-03.jpg',
    category: 'Wellness',
    date: 'January 10, 2025',
    title: 'Breathing Techniques for Stress Relief',
    excerpt: 'Learn powerful breathing exercises that can instantly calm your nervous system and help you manage anxiety in daily life.',
    author: 'Vinayaka Honnavar',
    readTime: '6 min read'
  },
  {
    slug: 'understanding-eight-limbs-of-yoga',
    image: '/images/hero-02.jpg',
    category: 'Philosophy',
    date: 'January 8, 2025',
    title: 'Understanding the Eight Limbs of Yoga',
    excerpt: 'Explore the philosophical foundation of yoga and how these ancient principles can guide your modern practice and lifestyle.',
    author: 'Vinayaka Honnavar',
    readTime: '8 min read'
  },
  {
    slug: 'nutrition-tips-for-yoga-practitioners',
    image: '/images/image-01.jpg',
    category: 'Nutrition',
    date: 'January 5, 2025',
    title: 'Nutrition Tips for Yoga Practitioners',
    excerpt: 'Fuel your practice with the right foods. Discover what to eat before and after yoga to maximize energy and recovery.',
    author: 'Sahana P R',
    readTime: '6 min read'
  },
  {
    slug: 'benefits-of-restorative-yoga',
    image: '/images/image-02.jpg',
    category: 'Recovery',
    date: 'January 3, 2025',
    title: 'The Benefits of Restorative Yoga',
    excerpt: 'Learn how this gentle practice can help your body recover, reduce inflammation, and promote deep relaxation and healing.',
    author: 'Ravi Prabhakar',
    readTime: '5 min read'
  }
];

const categories = ['All', 'Meditation', 'Yoga', 'Wellness', 'Philosophy', 'Nutrition', 'Recovery'];

export default function BlogPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useSEO({
    title: 'Blog — Yoga Insights, Wellness Tips & Ancient Wisdom',
    description: 'Explore articles on yoga, meditation, pranayama, wellness, and Ayurvedic nutrition from the certified instructors at Srinatha Yoga School in Mysore, India.',
    canonicalPath: '/blog',
    keywords: 'yoga blog, meditation tips, pranayama techniques, wellness articles, ayurvedic nutrition, yoga philosophy, mindfulness tips',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Srinatha Yoga School Blog',
      description: 'Yoga insights, wellness tips & ancient wisdom from certified instructors.',
      url: 'https://srinathayogaschool.com/blog',
      publisher: {
        '@type': 'Organization',
        name: 'Srinatha Yoga School',
        logo: { '@type': 'ImageObject', url: 'https://srinathayogaschool.com/logo.png' }
      }
    }
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />

      {/* SEO Hero */}
      <section className="relative pt-40 pb-20 bg-gray-900 text-white overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/image-01.jpg" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-teal-400 text-xl max-w-2xl mx-auto">
            Yoga insights, wellness tips & ancient wisdom — from our instructors to you.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b bg-white sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-teal-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filtered.map((article, index) => (
              <Link key={index} to={`/blog/${article.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group"
                data-aos="fade-up"
                data-aos-delay={`${(index % 3) * 100}`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-teal-600 px-3 py-1 rounded-full text-xs font-semibold shadow">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><i className="ri-time-line"></i>{article.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-teal-600 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500">{article.author}</span>
                    <span className="text-teal-500 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <i className="ri-article-line text-5xl mb-4 block"></i>
              <p>No articles in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
