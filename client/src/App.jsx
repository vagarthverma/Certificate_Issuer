import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/SignupModal';
import UserDashboard from './components/UserDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
