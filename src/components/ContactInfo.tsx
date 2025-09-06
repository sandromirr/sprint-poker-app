import React from 'react';

interface ContactInfoProps {
  title: string;
  description: string;
  buttonText: string;
  email: string;
  emailText: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  title = "Still have questions?",
  description = "Our support team is here to help you get the most out of Planning Poker.",
  buttonText = "Contact Support",
  email = "support@planningpoker.com",
  emailText = "Or email us at"
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 px-8 py-12 text-center text-white mt-10 rounded-2xl">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-indigo-100 dark:text-indigo-200 text-lg mb-8">{description}</p>
        <button className="px-8 py-3 bg-white dark:bg-indigo-100 text-indigo-600 dark:text-indigo-800 font-medium rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-white transition-colors mb-6">
          {buttonText}
        </button>
        <p className="text-sm text-indigo-200 dark:text-indigo-300">
          {emailText} <a href={`mailto:${email}`} className="underline hover:text-white dark:hover:text-indigo-100">{email}</a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
