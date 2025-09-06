import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FAQ_ITEMS } from '../utils/constants';

interface FAQItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-200">
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Everything you need to know about Planning Poker</p>
        
        <div className="max-w-3xl mx-auto space-y-2">
          {FAQ_ITEMS.map((item: FAQItem, index: number) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="text-left text-lg font-medium text-gray-900 dark:text-gray-100">
                  {item.question}
                </span>
                {expandedIndex === index ? (
                  <FiMinus className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 ml-4" />
                ) : (
                  <FiPlus className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                )}
              </button>
              <div 
                id={`faq-${index}`}
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedIndex === index ? 'max-h-48 pb-4' : 'max-h-0'
                }`}
                style={{
                  opacity: expandedIndex === index ? 1 : 0,
                  transform: `translateY(${expandedIndex === index ? '0' : '-10px'})`,
                  visibility: expandedIndex === index ? 'visible' : 'hidden'
                }}
                aria-hidden={expandedIndex !== index}
              >
                <div className="pb-2 mt-5 text-gray-600 dark:text-gray-300 text-left">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
