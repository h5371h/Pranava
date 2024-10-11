'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  // Mock function for saving changes (to be replaced with actual API calls)
  const saveChanges = () => {
    alert(`Name: ${name}\nEmail: ${email}`);
    setIsEditing(false); // Stop editing after saving
  };

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  if (!session) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Profile</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Name: </label>
        {isEditing ? (
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        ) : (
          <p>{name}</p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Email: </label>
        <p>{email}</p> {/* Email should be read-only */}
      </div>

      {isEditing ? (
        <button onClick={saveChanges} style={{ padding: '0.5rem', background: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Save Changes
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} style={{ padding: '0.5rem', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Edit Profile
        </button>
      )}
    </div>
  );
}