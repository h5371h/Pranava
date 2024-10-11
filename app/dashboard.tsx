import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <p>You're logged in as {session?.user?.email}</p>
    </div>
  );
};

export default Dashboard;