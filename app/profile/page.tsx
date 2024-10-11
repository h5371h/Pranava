'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {session.user?.email}</p>
      <p>Name: {session.user?.name}</p>
    </div>
  );
}