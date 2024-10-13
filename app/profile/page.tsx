'use client';

import ProfileForm from '../components/ProfileForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
      <ProfileForm session={session} /> {/* ProfileForm Component */}
    </div>
  );
};

export default ProfilePage;