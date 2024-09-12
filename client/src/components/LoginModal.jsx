import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      // Admin login
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login/admin', { username, password });
        localStorage.setItem('token', response.data.token);
        login('admin');
        navigate('/admin/dashboard');
      } catch (err) {
        setError('Invalid admin credentials');
      }
    } else {
      // User login
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
        login('user');
        navigate('/user/dashboard');
      } catch (err) {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
