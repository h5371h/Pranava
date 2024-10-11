'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container flex justify-between items-center">
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
          <li><Link href="/profile" className="hover:underline">Profile</Link></li>
          <li><Link href="/sessions" className="hover:underline">Sessions</Link></li>
          <li><Link href="/video-call" className="hover:underline">Video Call</Link></li>
        </ul>
        {session?.user ? (
          <div className="flex items-center space-x-4">
            <p className="text-sm">Welcome, {session.user.name || session.user.email}</p>
            <button 
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p className="text-sm">Not signed in</p>
        )}
      </div>
    </nav>
  );
}