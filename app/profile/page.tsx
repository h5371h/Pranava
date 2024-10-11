'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  const saveChanges = () => {
    alert(`Name: ${name}\nEmail: ${email}`);
    setIsEditing(false);
  };

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  if (!session) return <p className="text-center">Loading...</p>;

  return (
    <div className="container p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Name:</label>
        {isEditing ? (
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        ) : (
          <p>{name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Email:</label>
        <p>{email}</p> {/* Email is read-only */}
      </div>

      {isEditing ? (
        <button 
          onClick={saveChanges}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Save Changes
        </button>
      ) : (
        <button 
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}