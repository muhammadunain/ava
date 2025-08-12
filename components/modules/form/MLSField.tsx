'use client'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const MLSSearchForm = () => {
  const [mlsNumber, setMlsNumber] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const mlsSuggestions = [
    'MLS001234',
    'MLS005678',
    'MLS009012',
    'MLS003456',
    'MLS007890'
  ];

  const handleInputChange = (value:any) => {
    setMlsNumber(value);
    setShowDropdown(value.length > 0);
  };

  const selectMLS = (mls:any) => {
    setMlsNumber(mls);
    setShowDropdown(false);
  };

  return (
    <div className="max-w-4xl mx-auto  bg-white">
<div className='flex my-5 text-2xl font-semibold'>
  <h2>New Transcation</h2>
</div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter your MLS# here"
          value={mlsNumber}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full p-6 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {showDropdown && (
          <div className="absolute top-full  left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
            {mlsSuggestions
              .filter(mls => mls.toLowerCase().includes(mlsNumber.toLowerCase()))
              .map((mls, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  onClick={() => selectMLS(mls)}
                >
                  <span className="text-gray-900 font-medium">{mls}</span>
                </div>
              ))
            }
            {mlsSuggestions.filter(mls => mls.toLowerCase().includes(mlsNumber.toLowerCase())).length === 0 && (
              <div className="p-4 text-gray-500 text-center">
                No matching MLS numbers found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MLSSearchForm;