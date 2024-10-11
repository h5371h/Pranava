'use client';  // This marks the component as a client-side component

import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import Image from 'next/image';

export default function SignIn() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-sage-100 bg-opacity-50 relative">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-sage-200 transform -skew-y-12"></div>
        <div className="absolute inset-0 bg-sage-300 transform skew-x-12"></div>
        <div className="absolute inset-0 bg-sage-400 rounded-full scale-150 translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <main className="flex flex-col items-center w-full max-w-sm z-10">
        <div className="bg-white p-10 rounded-3xl shadow-lg w-full text-center">
          <Image
            src="/pranava-logo.png"
            alt="Pranava Logo"
            width={180}
            height={180}
            className="mx-auto mb-10"
          />
          <button
            onClick={() => signIn('google')}
            className="w-full bg-sage-300 text-sage-800 font-medium py-4 px-6 rounded-full shadow-md hover:bg-sage-400 transition duration-300 ease-in-out flex items-center justify-center text-lg"
          >
            <FaGoogle className="mr-3" />
            Sign in
          </button>
        </div>
      </main>
      <footer className="mt-8 flex gap-6 flex-wrap items-center justify-center text-sage-800 z-10">
        <a
          className="hover:text-sage-900 transition-colors"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
        <a
          className="hover:text-sage-900 transition-colors"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Classes
        </a>
        <a
          className="hover:text-sage-900 transition-colors"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}