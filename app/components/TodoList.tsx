'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaExclamation } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { generatePastelColor } from '../utils/colors';

const TodoList = ({ events, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const extractedTodos = events
      .filter(event => event.extendedProps?.isTodo)
      .map(event => ({
        id: event.id,
        text: event.title,
        completed: event.extendedProps?.completed || false,
        date: event.start,
        color: event.extendedProps?.color || generatePastelColor()
      }));
    setTodos(extractedTodos);
  }, [events]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const color = generatePastelColor();
      onAddEvent({ title: newTodo, extendedProps: { color, isTodo: true } });
      setNewTodo('');
    }
  };

  const handleEditTodo = (id, newText) => {
    onEditEvent({ id, title: newText });
    setEditingTodo(null);
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    onEditEvent({ id, title: todo.text, extendedProps: { ...todo.extendedProps, completed: !todo.completed } });
  };

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} h-full overflow-y-auto`}>
      <h3 className="text-xl font-semibold mb-4">To-Do List</h3>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New task"
          className={`flex-grow border rounded-l-md p-2 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {events.map(event => (
          <li 
            key={event.id} 
            className="flex items-center justify-between p-2 rounded-md" 
            style={{ backgroundColor: event.backgroundColor }}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={event.extendedProps?.completed}
                onChange={() => onEditEvent({...event, extendedProps: {...event.extendedProps, completed: !event.extendedProps?.completed}})}
                className="mr-2"
              />
              <span className={event.extendedProps?.completed ? 'line-through' : ''}>
                {event.title}
                {event.extendedProps?.importance === 'high' && <FaExclamation className="inline ml-1 text-red-500" />}
              </span>
            </div>
            <div className="flex items-center">
              {event.extendedProps?.tags?.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-1">
                  {tag}
                </span>
              ))}
              <button
                onClick={() => {/* implement edit functionality */}}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteEvent(event.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;