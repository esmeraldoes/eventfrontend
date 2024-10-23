import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-blue-600">Event Management</h1>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Events
          </Link>
          <Link
            to="/profile"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Profile
          </Link>
          <Link
            to="/logout"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
