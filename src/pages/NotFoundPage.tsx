import { Link } from 'react-router-dom';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-200">
      <div className="text-center max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-colors duration-200">
        <div className="mb-6">
          <div className="text-9xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 transition-colors duration-200">404</div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you're looking for seems to have gone on a little adventure. 🗺️
          </p>
        </div>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
        >
          🏠 Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
