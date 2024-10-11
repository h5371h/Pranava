'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/sessions">Sessions</Link></li>
        <li><Link href="/video-call">Video Call</Link></li>
      </ul>

      {session?.user ? (
        <div style={{ marginTop: '1rem' }}>
          <p>Welcome, {session.user.name || session.user.email}</p>
          <button onClick={() => signOut()} style={{ background: '#f00', color: '#fff', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      ) : (
        <p style={{ marginTop: '1rem' }}>You are not signed in</p>
      )}
    </nav>
  );
}