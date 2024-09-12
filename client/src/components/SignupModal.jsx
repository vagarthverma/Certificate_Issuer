import React, { useState } from 'react';
import axios from 'axios';

const RegisterModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      setMessage('User registered successfully');
    } catch (err) {
      setMessage('Error registering user');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
