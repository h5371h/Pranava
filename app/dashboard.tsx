'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');  // Redirect if not signed in
    }
  }, [status]);

  const [events, setEvents] = useState([
    { title: 'Yoga Class', start: '2024-10-12' },
    { title: 'Performance Coaching', start: '2024-10-13' },
  ]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {session?.user?.email}</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default Dashboard;