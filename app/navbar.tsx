'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes, FaVideo } from 'react-icons/fa';
import { useTheme } from './contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      firstFocusableElement.current = focusableElements[0];
      lastFocusableElement.current = focusableElements[focusableElements.length - 1];
      firstFocusableElement.current?.focus();
    }
  }, [showMobileMenu]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowMobileMenu(false);
    }
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement.current) {
          event.preventDefault();
          lastFocusableElement.current?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement.current) {
          event.preventDefault();
          firstFocusableElement.current?.focus();
        }
      }
    }
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const startVideoCall = () => {
    router.push('/video-call');
  };

  return (
    <nav className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md fixed w-full z-50`}>
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/pranava-logo.png" alt="Logo" width={40} height={40} />
        <Link href="/" className="text-lg font-semibold">Pranava</Link>
      </div>

      {/* Links for desktop */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/dashboard" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Dashboard</Link>
        <Link href="/sessions" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Calendar</Link>
        <Link href="/profile" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Profile</Link>
        <button
          onClick={startVideoCall}
          className={`${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded-md flex items-center`}
        >
          <FaVideo className="mr-2" /> Video Call
        </button>
        {session ? (
          <div className="flex items-center space-x-4">
            <span>{session.user.name || session.user.email}</span>
            <button
              onClick={() => signOut()}
              className={`${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white px-3 py-1 rounded-md`}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/auth" className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-md`}>
            Sign In / Sign Up
          </Link>
        )}
      </div>

      {/* Mobile hamburger icon */}
      <button
        className="md:hidden text-xl"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        aria-label={showMobileMenu ? "Close menu" : "Open menu"}
      >
        {showMobileMenu ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} z-50 md:hidden flex flex-col items-center justify-center`}
          onKeyDown={handleKeyDown}
        >
          <button
            className="absolute top-4 right-4 text-xl"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <div className="flex flex-col items-center space-y-6 text-xl">
            <Link href="/dashboard" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} onClick={closeMobileMenu}>Dashboard</Link>
            <Link href="/sessions" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} onClick={closeMobileMenu}>Calendar</Link>
            <Link href="/profile" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} onClick={closeMobileMenu}>Profile</Link>
            <button
              onClick={() => {
                startVideoCall();
                closeMobileMenu();
              }}
              className={`${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded-md flex items-center`}
            >
              <FaVideo className="mr-2" /> Video Call
            </button>
            {session ? (
              <>
                <span>{session.user.name || session.user.email}</span>
                <button
                  onClick={() => {
                    signOut();
                    closeMobileMenu();
                  }}
                  className={`${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded-md`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth" className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-md`} onClick={closeMobileMenu}>
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
