'use client';

import Link from "next/link";
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4 transition-colors duration-300 relative">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">© 2024 Pranava Yoga & Wellness. All rights reserved.</p>
        <div className="mt-2 text-xs">
          <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-100 mr-4">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900 dark:hover:text-gray-100">Terms of Service</Link>
        </div>
      </div>
      <button 
        onClick={toggleTheme} 
        className="absolute bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </footer>
  );
}
