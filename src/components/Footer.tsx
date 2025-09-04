import React from 'react';

interface FooterProps {
  appName: string;
}

const Footer: React.FC<FooterProps> = ({ appName = 'App' }) => {
  return (
    <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
      <p>{appName} © {new Date().getFullYear()}</p>
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        Switch between light and dark mode using the toggle in the top right
      </p>
    </footer>
  );
};

export default Footer;
