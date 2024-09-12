import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full p-4 z-10">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          Welcome to the Certificate Retrieval System
        </h1>
        <div className="flex justify-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/register" className="bg-purple-900 text-white p-2 rounded">
                Register
              </Link>
              <Link to="/login" className="bg-purple-900 text-white p-2 rounded">
                Login
              </Link>
            </>
          ) : (
            <Link to="/" className="bg-gray-500 text-white p-2 rounded">
              Home
            </Link>
          )}
        </div>
      </div>

      {/* Spline 3D Model */}
      <Spline
        scene="https://prod.spline.design/poX3RvMKMzXygXow/scene.splinecode"
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  );
};

export default Home;
