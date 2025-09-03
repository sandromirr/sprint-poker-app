import { Link } from 'react-router-dom';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="home-link">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
