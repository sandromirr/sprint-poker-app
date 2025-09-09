import React from 'react';

interface CardValuesPreviewProps {
  values: string[];
}

const CardValuesPreview: React.FC<CardValuesPreviewProps> = ({ values }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mt-12 mb-12">Available Card Values</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 w-full">
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
