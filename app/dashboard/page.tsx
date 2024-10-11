'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');  // Redirect if not signed in
    }
  }, [status]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You're logged in as {session?.user?.email}</p>
    </div>
  );
};

export default Dashboard;