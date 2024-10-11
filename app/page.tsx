import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-sage-100">
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <div className="mb-12">
          <Image
            src="/pranava-logo.png"
            alt="Pranava Logo"
            width={180}
            height={180}
            priority
            className="mx-auto"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-sage-800 mb-6">
          WELCOME
        </h1>
        <p className="text-xl text-sage-700 mb-12 max-w-md">
          Discover balance through online yoga
        </p>
        <Link
          href="/auth"
          className="bg-sage-300 text-sage-800 font-medium py-3 px-8 text-lg transition-colors hover:bg-sage-400 rounded-md shadow-md"
        >
          Begin Your Journey
        </Link>
      </main>
      <footer className="text-center text-sage-700 text-sm mt-12">
        <p>© 2024 pranava.life</p>
      </footer>
    </div>
  );
}
