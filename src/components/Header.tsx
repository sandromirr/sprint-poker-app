import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">{title}</h1>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </header>
  );
};

export default Header;
