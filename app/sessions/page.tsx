'use client';

import Calendar from '../components/Calendar';

export default function Sessions() {
  return (
    <div className="container p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Available Sessions</h1>
      <Calendar />
    </div>
  );
}