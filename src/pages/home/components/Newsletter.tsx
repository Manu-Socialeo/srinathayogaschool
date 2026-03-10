export default function Newsletter() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:max-w-md">
            <h3 className="text-3xl font-bold mb-3">Subscribe For News</h3>
            <p className="text-gray-300 leading-relaxed">
              Supratömyss monocentrism, och emvision ambivision det homor. Spening neskade tösm i sospest hyning homopare. Båmida tel så fan i spemårtad heterosam.
            </p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-[400px]">
            <form className="flex gap-3">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button 
                type="submit"
                className="bg-teal-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">By signing up, I agree with the data protection policy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}