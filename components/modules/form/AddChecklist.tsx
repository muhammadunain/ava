'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

const checklistOptions = [
  'buying',
  'listing'
];

export default function ChecklistSettings() {
  const [selectedChecklist, setSelectedChecklist] = useState('buying');
  const [showChecklistDropdown, setShowChecklistDropdown] = useState(false);
  const [acceptanceDate, setAcceptanceDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [showAcceptancePicker, setShowAcceptancePicker] = useState(false);
  const [showClosingPicker, setShowClosingPicker] = useState(false);
  
  const checklistDropdownRef = useRef<HTMLDivElement>(null);
  const acceptancePickerRef = useRef<HTMLDivElement>(null);
  const closingPickerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (checklistDropdownRef.current && !checklistDropdownRef.current.contains(event.target as Node)) {
        setShowChecklistDropdown(false);
      }
      if (acceptancePickerRef.current && !acceptancePickerRef.current.contains(event.target as Node)) {
        setShowAcceptancePicker(false);
      }
      if (closingPickerRef.current && !closingPickerRef.current.contains(event.target as Node)) {
        setShowClosingPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChecklistSelect = (checklist: string) => {
    setSelectedChecklist(checklist);
    setShowChecklistDropdown(false);
  };

  const handleDateChange = (dateStr: string, type: 'acceptance' | 'closing') => {
    if (type === 'acceptance') {
      setAcceptanceDate(dateStr);
    } else {
      setClosingDate(dateStr);
    }
  };

  const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Checklist Settings</h1>
        <p className="text-gray-600 mb-6">
          You can apply one or more checklists or proceed without them.
        </p>
        
        {/* Checklist Dropdown */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-900 font-medium">Checklist:</span>
            <div className="relative" ref={checklistDropdownRef}>
              <button
                onClick={() => setShowChecklistDropdown(!showChecklistDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {selectedChecklist}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showChecklistDropdown && (
                <div className="absolute top-full left-0 z-10 w-40 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {checklistOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleChecklistSelect(option)}
                      className={`
                        w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                        ${selectedChecklist === option ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Date Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Acceptance Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Acceptance Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={acceptanceDate}
                onChange={(e) => handleDateChange(e.target.value, 'acceptance')}
                className="w-full px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Select acceptance date"
              />
            
            </div>
          </div>
          
          {/* Closing Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Closing Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={closingDate}
                onChange={(e) => handleDateChange(e.target.value, 'closing')}
                className="w-full px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Select closing date"
              />
             
            </div>
          </div>
        </div>
        
        {/* Summary - only show if data is entered */}
        {(acceptanceDate || closingDate) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Selected Configuration:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Checklist Type: <span className="font-medium text-blue-600">{selectedChecklist}</span></li>
              {acceptanceDate && (
                <li>• Acceptance Date: <span className="font-medium">{formatDisplayDate(acceptanceDate)}</span></li>
              )}
              {closingDate && (
                <li>• Closing Date: <span className="font-medium">{formatDisplayDate(closingDate)}</span></li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}