import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-extrabold text-blue-600 mb-6">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          We can't seem to find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Home
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <Search className="h-5 w-5 mr-2" />
            Browse Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;