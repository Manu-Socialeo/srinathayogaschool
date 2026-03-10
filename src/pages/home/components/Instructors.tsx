export default function Instructors() {
  return (
    <section id="instructors" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <h4 className="text-sm font-semibold text-teal-500 mb-3">Meet Our Team</h4>
            <h2 className="text-4xl font-bold tracking-tight">Expert Instructors</h2>
          </div>
          <p className="text-gray-600 lg:max-w-md">
            Learn from certified professionals dedicated to your wellness journey.
          </p>
        </div>
      </div>
    </section>
  );
}