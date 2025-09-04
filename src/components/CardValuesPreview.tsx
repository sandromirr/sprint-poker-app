import React from 'react';

interface CardValuesPreviewProps {
  values: string[];
}

const CardValuesPreview: React.FC<CardValuesPreviewProps> = ({ values }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Available Card Values</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 max-w-4xl mx-auto">
        {values.map((value) => (
          <div 
            key={value}
            className="aspect-[2/3] flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
          >
            <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardValuesPreview;
