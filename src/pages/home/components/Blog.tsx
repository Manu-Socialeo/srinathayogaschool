import { Link } from 'react-router-dom';

export default function Blog() {
  const previews = [
    {
      slug: 'power-of-daily-meditation',
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-01.jpg',
      category: 'Meditation',
      title: 'The Power of Daily Meditation Practice',
      excerpt: 'Discover how just 10 minutes of daily meditation can transform your mental clarity and reduce stress.',
    },
    {
      slug: 'morning-yoga-routines-for-beginners',
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-02.jpg',
      category: 'Yoga',
      title: 'Morning Yoga Routines for Beginners',
      excerpt: 'Start your day right with these simple yet effective yoga sequences designed for those new to the practice.',
    },
    {
      slug: 'breathing-techniques-for-stress-relief',
      image: '/pixelperfectthemes.com/demos/themes/medit/wp-content/themes/medit/assets/img/image-03.jpg',
      category: 'Wellness',
      title: 'Breathing Techniques for Stress Relief',
      excerpt: 'Learn powerful pranayama exercises that instantly calm your nervous system and manage anxiety.',
    },
  ];

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h4 className="text-sm font-semibold text-teal-500 mb-3 uppercase tracking-widest">Latest Insights</h4>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Blog</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore articles, tips, and insights to deepen your yoga and meditation practice.
          </p>
        </div>

        {/* 3 preview cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {previews.map((post, i) => (
            <Link key={i} to={`/blog/${post.slug}`} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white text-teal-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {post.category}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-teal-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            View All Articles <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}