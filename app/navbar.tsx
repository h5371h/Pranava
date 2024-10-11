'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

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
        <p style={{ marginTop: '1rem' }}>Welcome, {session.user.name || session.user.email}</p>
      ) : (
        <p style={{ marginTop: '1rem' }}>You are not signed in</p>
      )}
    </nav>
  );
}