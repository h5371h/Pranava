import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark transition-colors duration-300">
      {/* Hero Section */}
      <header className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: 'url(/hero-image.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">Transform Your Life with Pranava Yoga</h1>
          <p className="text-2xl text-white mb-6 max-w-xl text-center drop-shadow-md">
            Achieve balance, strength, and mindfulness with our holistic yoga programs and personal coaching.
          </p>
          <div className="flex gap-4">
            <Link href="/courses" className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
              Explore Courses
            </Link>
            <Link href="/auth/signup" className="bg-white text-indigo-600 px-6 py-3 rounded-full hover:bg-gray-200 transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Programs Section */}
      <section className="flex-grow bg-gray-100 dark:bg-gray-800 py-16 transition-colors duration-300">
        <section className="container mx-auto text-center mb-16">
          <h2 className="text-5xl font-semibold text-gray-800 mb-10">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md transition transform hover:-translate-y-2">
              <Image 
                src="/images/yoga-wellness.jpg" // Local image in public/images folder
                alt="Yoga for Wellness"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Yoga for Wellness</h3>
              <p className="text-gray-600">Deepen your mind-body connection with personalized wellness-focused yoga practices.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md transition transform hover:-translate-y-2">
              <Image 
                src="/images/hatha-ashtanga.jpg" // Local image in public/images folder
                alt="Hatha & Ashtanga Yoga"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Hatha & Ashtanga Yoga</h3>
              <p className="text-gray-600">Elevate your practice with advanced poses and sequences for mastery.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md transition transform hover:-translate-y-2">
              <Image 
                src="/images/performance-coaching.jpg" // Local image in public/images folder
                alt="Performance Coaching"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Performance Coaching</h3>
              <p className="text-gray-600">Unlock your full potential with expert performance coaching.</p>
            </div>
          </div>
        </section>

        {/* Upcoming Sessions */}
        <section className="container mx-auto text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10">Upcoming Sessions</h2>
          <div className="bg-white p-10 rounded-xl shadow-md">
            <p className="text-gray-600">Check back soon for our upcoming yoga and coaching sessions.</p>
            {/* Placeholder for integrated calendar */}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <Image 
                src="/images/testimonial-1.jpg" // Local image in public/images folder
                alt="Client Testimonial"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="text-gray-600 italic">
                "Pranava Yoga has been life-changing! I feel more centered and energetic."
              </p>
              <p className="text-indigo-700 mt-4 font-semibold">– Sarah K.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <Image 
                src="/images/testimonial-2.jpg" // Local image in public/images folder
                alt="Client Testimonial"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="text-gray-600 italic">
                "The personalized performance coaching has boosted my career and mindset!"
              </p>
              <p className="text-indigo-700 mt-4 font-semibold">– John D.</p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Stay Connected</h2>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </section>
      </section>
    </div>
  );
}