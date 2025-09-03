import React from 'react';

interface FooterProps {
  appName: string;
}

const Footer: React.FC<FooterProps> = ({ appName = 'App' }) => {
  return (
    <footer className="mt-16 text-center text-gray-500 text-sm">
      <p>{appName} © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
