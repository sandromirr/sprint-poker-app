import React from 'react';

interface CardValuesPreviewProps {
  values: string[];
}

const CardValuesPreview: React.FC<CardValuesPreviewProps> = ({ values }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Available Card Values</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 max-w-4xl mx-auto">
        {values.map((value) => (
          <div 
            key={value}
            className="aspect-[2/3] flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          >
            <span className="text-2xl font-bold text-indigo-700">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardValuesPreview;
