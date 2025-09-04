import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="relative text-center mb-12">
      <div className="absolute top-0 right-0 p-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
    </header>
  );
};

export default Header;
