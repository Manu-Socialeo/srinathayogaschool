
export default function Blog() {
  const posts = [
    {
      image: '/demos/themes/medit/wp-content/uploads/2024/12/blog-post-14-1024x887.jpg',
      category: 'Mental Health',
      title: 'Guided Meditations for Deep Relaxation',
      author: 'Charlotta Isaksson',
      date: 'December 24, 2024'
    },
    {
      image: '/demos/themes/medit/wp-content/uploads/2024/12/blog-post-13-1024x887.jpg',
      category: 'Mental Health',
      title: 'The Science of Meditation: How It Transforms Your Brain',
      author: 'Charlotta Isaksson',
      date: 'December 24, 2024'
    },
    {
      image: '/demos/themes/medit/wp-content/uploads/2024/12/blog-post-12-1024x887.jpg',
      category: 'Mindfulness',
      title: '10-Minute Meditation Techniques for Busy Lives',
      author: 'Charlotta Isaksson',
      date: 'December 24, 2024'
    },
    {
      image: '/demos/themes/medit/wp-content/uploads/2024/12/blog-post-11-1024x887.jpg',
      category: 'Yoga',
      // Fixed: escaped the apostrophe in the title string
      title: "Finding Peace: A Beginner's Guide to Meditation",
      author: 'Charlotta Isaksson',
      date: 'December 24, 2024'
    },
    {
      image: '/demos/themes/medit/wp-content/uploads/2024/12/blog-post-10-1024x887.jpg',
      category: 'Yoga',
      title: 'Yoga for Better Sleep: Unwind and Relax',
      author: 'Charlotta Isaksson',
      date: 'December 24, 2024'
    },
    {
      image: '/demos/themes/medit/wp-content/uploads/2024/12/blog-post-09-1024x887.jpg',
      category: 'Fitness & Health',
      title: 'The Morning Energy Boost: Yoga to Start Your Day Right',
      author: 'Charlotta Isaksson',
      date: 'December 24, 2024'
    }
  ];

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <h4 className="text-sm font-semibold text-teal-500 mb-3">Discover More</h4>
            <h2 className="text-4xl font-bold tracking-tight">Our Journal</h2>
          </div>
          <p className="text-gray-600 lg:max-w-md">
            Dive into our comprehensive journal to discover the essence of yoga. From beginner-friendly tips
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-teal-500 font-medium mb-3">{post.category}</div>
                <h3 className="text-lg font-bold mb-4 leading-tight hover:text-teal-500 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>by {post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
