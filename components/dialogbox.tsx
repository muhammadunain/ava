import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const TransactionTypeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const transactionTypes = [
    { id: 'listing-sale', label: 'Listing for Sale' },
    { id: 'listing-lease', label: 'Listing for Lease' },
    { id: 'purchase', label: 'Purchase' },
    { id: 'lease', label: 'Lease' }
  ];

  const handleTypeSelect = (typeId:any) => {
    setSelectedType(typeId);
  };

  const handleStartTransaction = () => {
    if (selectedType) {
      console.log('Starting transaction:', selectedType);
      // Add your transaction start logic here
      setIsOpen(false);
      setSelectedType('');
    }
  };

  return (
    <>
      {/* New Transaction Button */}
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gray-900 hover:bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
      >
        <span className="text-lg">+</span>
        <span>New Transaction</span>
      </Button>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-xl border-0 p-0">
          {/* Header */}
          <div className="flex justify-between items-start p-6 pb-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">Ready for your next transaction, Dave?</p>
              <h2 className="text-xl font-semibold text-gray-900">Choose your transaction type</h2>
            </div>
            
          </div>

          {/* Transaction Type Options */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {transactionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center font-medium ${
                    selectedType === type.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Start Transaction Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleStartTransaction}
                disabled={!selectedType}
                className={`px-6 py-2 rounded-md cursor-pointer font-medium transition-all ${
                  selectedType
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Start Transaction
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionTypeDialog;