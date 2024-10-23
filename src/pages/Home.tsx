import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Event Management</h1>
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
