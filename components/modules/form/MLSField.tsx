'use client'

import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const MLSSearchForm = () => {
  const [mlsNumber, setMlsNumber] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [selectedMLS, setSelectedMLS] = useState('');

  const mlsSuggestions = [
    { id: 'MLS001234', address: '2153 Asti Ct, Naples FL 34105', agent: 'James Craft', price: '$3,545,000.00' },
    { id: 'MLS005678', address: '1234 Ocean Dr, Naples FL 34102', agent: 'Sarah Johnson', price: '$2,850,000.00' },
    { id: 'MLS009012', address: '5678 Bay St, Naples FL 34108', agent: 'Mike Wilson', price: '$4,200,000.00' },
    { id: 'MLS003456', address: '9012 Gulf Shore Blvd, Naples FL 34103', agent: 'Lisa Davis', price: '$5,750,000.00' },
    { id: 'MLS007890', address: '3456 Pine Ridge Rd, Naples FL 34109', agent: 'David Brown', price: '$1,950,000.00' }
  ];

  const handleInputChange = (value: string) => {
    setMlsNumber(value);
    setShowDropdown(value.length > 0);
  };

  const selectMLS = (mls: any) => {
    setSelectedMLS(mls);
    setMlsNumber(mls.id);
    setShowDropdown(false);
    setShowImportDialog(true);
  };

  const handleImportData = () => {
    // Handle import logic here
    console.log('Importing data for:', selectedMLS);
    setShowImportDialog(false);
    // You can add your import logic here
  };

  const handleCancel = () => {
    setShowImportDialog(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className='flex my-3 text-2xl font-semibold'>
        <h2>Create New Transaction</h2>
      </div>
      
      <div className='mb-5'>
        <p className='text-gray-500'>How would you like to enter data in your documents?</p>
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
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
            {mlsSuggestions
              .filter(mls => mls.id.toLowerCase().includes(mlsNumber.toLowerCase()))
              .map((mls, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  onClick={() => selectMLS(mls)}
                >
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-medium">{mls.id}</span>
                    <span className="text-sm text-gray-600">{mls.address}</span>
                    <span className="text-sm text-gray-500">Listed by {mls.agent} - {mls.price}</span>
                  </div>
                </div>
              ))
            }
            {mlsSuggestions.filter(mls => mls.id.toLowerCase().includes(mlsNumber.toLowerCase())).length === 0 && (
              <div className="p-4 text-gray-500 text-center">
                No matching MLS numbers found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Import Data Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Import Data</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-700 mb-4">
              Would you like to import the listing details from Naples Area Board of Realtors?
            </p>
            
            <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 mb-4">
              Auto-populated information is provided solely for your convenience and does not disclaims any representation as to the accuracy or completeness of all information entered into dotloop, including auto-populated information.
            </div>
            
            {selectedMLS && (
              <div className="space-y-1">
                {/* @ts-ignore */}
                <p className="font-medium text-sm">{selectedMLS.address}</p>
                <p className="text-sm text-gray-600">
                {/* @ts-ignore */}
                  Listed by {selectedMLS.agent} - {selectedMLS.price}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleImportData}
              className="flex-1 bg-black text-white hover:bg-gray-800"
            >
              Import Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MLSSearchForm;