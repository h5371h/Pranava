'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: 'Yoga Class', start: '2024-10-15T10:00:00' },
    { title: 'Performance Coaching', start: '2024-10-16T14:00:00' },
  ]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
      />
    </div>
  );
};

export default Calendar;