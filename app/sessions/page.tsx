'use client';

import { useState } from 'react';
import Calendar from '../components/Calendar';
import TodoList from '../components/TodoList';
import { useTheme } from '../contexts/ThemeContext';

const SessionsPage = () => {
  const { theme } = useTheme();
  const [events, setEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleDeleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-semibold p-4">Book a Session</h1>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-2/3 h-[calc(100vh-200px)] md:h-[calc(100vh-100px)]">
          <Calendar 
            events={events}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
        <div className="w-full md:w-1/3">
          <TodoList
            events={events.filter(event => event.extendedProps?.isTodo)}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
