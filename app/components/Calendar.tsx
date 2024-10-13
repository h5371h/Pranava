'use client';

import { useTheme } from '../contexts/ThemeContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FaTrash, FaSave, FaUndo, FaEdit } from 'react-icons/fa';
import '../styles/calendar-dark-mode.css';
import { generatePastelColor } from '../utils/colors';

const PRIORITY_LEVELS = ['low', 'medium', 'high'];
const COLOR_OPTIONS = ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFDFBA'];

const Calendar = ({ events, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const { theme } = useTheme();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionDetails, setSessionDetails] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [priority, setPriority] = useState('low');
  const [allDay, setAllDay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr.split('T')[0]);
    setSelectedTime(selectInfo.startStr.split('T')[1]?.slice(0, 5) || '');
    setAllDay(selectInfo.allDay);
    setIsModalOpen(true);
    setSessionDetails('');
    setPriority('low');
    setVideoLink('');
    setSelectedEvent(null);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent(event);
    setSessionDetails(event.title);
    setPriority(event.extendedProps.priority || 'low');
    setVideoLink(event.extendedProps.videoLink || '');
    setSelectedDate(event.startStr.split('T')[0]);
    setSelectedTime(event.startStr.split('T')[1]?.slice(0, 5) || '');
    setAllDay(event.allDay || false);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = () => {
    const eventStart = allDay ? selectedDate : `${selectedDate}T${selectedTime}`;
    
    const eventData = {
      id: selectedEvent ? selectedEvent.id : String(Date.now()),
      title: sessionDetails,
      start: eventStart,
      allDay,
      extendedProps: {
        priority,
        videoLink,
      },
      backgroundColor: selectedColor,
    };

    if (selectedEvent) {
      onEditEvent(eventData);
    } else {
      onAddEvent(eventData);
    }
    setIsModalOpen(false);
  };

  const handleRemoveEvent = () => {
    if (selectedEvent && onDeleteEvent) {
      onDeleteEvent(selectedEvent.id);
    }
    setIsModalOpen(false);
  };

  const renderEventContent = (eventInfo) => {
    const priorityMarks = {
      low: '',
      medium: '❗',
      high: '❗❗❗'
    };
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <span style={{ color: 'red', marginLeft: '5px' }}>{priorityMarks[eventInfo.event.extendedProps.priority]}</span>
      </>
    );
  };

  return (
    <div className={`calendar-container ${theme === 'dark' ? 'dark-mode' : ''} h-full`}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="100%"
        themeSystem={theme === 'dark' ? 'standard' : 'bootstrap'}
        eventContent={renderEventContent}
      />
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content
          className={`fixed p-6 rounded-lg shadow-lg z-50 w-full max-w-md 
          left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        >
          <Dialog.Title className="text-xl font-semibold mb-4">Book a Session</Dialog.Title>
          <Dialog.Description className="mb-4">
            {selectedEvent ? `Editing session for ${selectedDate}` : `Booking a session for ${selectedDate}`}
          </Dialog.Description>
          
          <input 
            type="text"
            value={sessionDetails}
            onChange={(e) => setSessionDetails(e.target.value)}
            placeholder="Enter session details"
            className={`border rounded-md p-2 mb-4 w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          />

          <div className="flex items-center mb-4">
            <label className="mr-2">All Day</label>
            <input
              type="checkbox"
              checked={allDay}
              onChange={() => setAllDay(!allDay)}
            />
          </div>

          {!allDay && (
            <div className="mb-4">
              <label className="block mb-1">Time</label>
              <input 
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1">Video Link (Jitsi)</label>
            <input 
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Add a Jitsi video link"
              className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <div className="flex space-x-2">
              {PRIORITY_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setPriority(level)}
                  className={`p-2 rounded-md ${
                    priority === level ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {level === 'high' && '❗❗❗'}
                  {level === 'medium' && '❗'}
                  {level === 'low' && 'Low'}
                  {level !== 'low' && ` ${level.charAt(0).toUpperCase() + level.slice(1)}`}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Color</label>
            <div className="flex space-x-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${
                    selectedColor === color ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBookingSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <FaSave className="inline-block mr-2" />
              {selectedEvent ? 'Update' : 'Book'}
            </button>
            {selectedEvent && (
              <button
                onClick={handleRemoveEvent}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                <FaTrash className="inline-block mr-2" />
                Remove
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            >
              <FaUndo className="inline-block mr-2" />
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Calendar;
