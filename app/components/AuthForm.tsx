'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the sign-in function
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      console.error('Login failed:', res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-md"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-md"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  );
};

export default AuthForm;