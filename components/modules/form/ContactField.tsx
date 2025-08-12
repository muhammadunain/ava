'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

const roleOptions = [
  'Seller',
  'Buyer', 
  'Listing agent',
  'Buyer\'s agent',
  'Transaction coordinator',
  'Office administrator',
  'Manager',
  'Broker',
  'Owner',
  'Loan officer',
  'Escrow officer',
  'Title office',
  'Buyer\'s attorney',
  'Seller\'s attorney',
  'Landlord',
  'Tenant',
  'Marketing manager',
  'Accountant',
  'Attorney',
  'Home inspector',
  'Termite inspector',
  'Other'
];

export default function ContactsInput() {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = roleOptions.filter(role =>
        role.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredRoles(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredRoles(roleOptions);
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
    if (!inputValue.trim()) {
      setFilteredRoles(roleOptions);
    }
  };

  const handleRoleSelect = (role: string) => {
    setInputValue(role);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacts</h2>
        
        
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="No contacts added yet"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          
          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {filteredRoles.map((role, index) => (
                <button
                  key={index}
                  onClick={() => handleRoleSelect(role)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                >
                  {role}
                </button>
              ))}
              {filteredRoles.length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No roles found
                </div>
              )}
            </div>
          )}
        </div>
        
        <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium text-sm mt-4 transition-colors">
          <Plus className="w-4 h-4" />
          Add new contact
        </button>
      </div>
    </div>
  );
}