'use client'
import React, { useState } from 'react';
import { Check, FileText, Users, ChevronRight, SlidersHorizontal, MessageSquare } from 'lucide-react';

const DocumentList = () => {
  const [selectedDocs, setSelectedDocs] = useState(new Set());
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(new Set(['all']));
  
  const documents = [
    {
      id: 1,
      date: '19 Aug',
      title: 'Buyer broker agreement',
      status: 'share',
      action: 'waiting on others'
    },
    {
      id: 2,
      date: '19 Aug',
      title: 'Purchase agreement',
      status: 'share',
      action: 'signed'
    },
    {
      id: 3,
      date: '17 Aug',
      title: 'Escrow deposit receipt',
      status: 'share',
      action: 'signed'
    },
    {
      id: 4,
      date: '20 Aug',
      title: 'Schedule home inspection',
      status: 'share',
      action: 'waiting on others'
    },
    {
      id: 5,
      date: '24 Aug',
      title: 'Receives disclosures',
      status: 'share',
      action: 'viewed'
    },
    {
      id: 6,
      date: '26 Aug',
      title: 'Review disclosures',
      status: 'share',
      action: 'waiting on others'
    },
    {
      id: 7,
      date: '29 Aug',
      title: 'Buyer election',
      status: 'share',
      action: 'viewed'
    },
    {
      id: 8,
      date: '31 Aug',
      title: 'Remove contingencies',
      status: 'share',
      action: 'signed'
    },
    {
      id: 9,
      date: '31 Aug',
      title: 'HUD',
      status: 'share',
      action: 'waiting on others'
    },
    {
      id: 10,
      date: '03 Sep',
      title: 'Obtain homeowner\'s insurance',
      status: 'share',
      action: 'signed'
    }
  ];

  const handleSelectDoc = (docId: any) => {
    const newSelected = new Set(selectedDocs);
    if (newSelected.has(docId)) {
      newSelected.delete(docId);
    } else {
      newSelected.add(docId);
    }
    setSelectedDocs(newSelected);
  };

  const handleFilterChange = (filter: string) => {
    const newFilters = new Set(selectedFilters);
    
    if (filter === 'all') {
      if (selectedFilters.has('all')) {
        newFilters.clear();
      } else {
        newFilters.clear();
        newFilters.add('all');
      }
    } else {
      newFilters.delete('all');
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      
      if (newFilters.size === 0) {
        newFilters.add('all');
      }
    }
    
    setSelectedFilters(newFilters);
  };

  const filteredDocuments = documents.filter(doc => {
    if (selectedFilters.has('all')) return true;
    return selectedFilters.has(doc.action);
  });

  const getActionColor = (action: any) => {
    switch (action) {
      case 'waiting on others':
        return 'text-blue-500';
      case 'signed':
        return 'text-gray-600';
      case 'viewed':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="mx-auto bg-white" onClick={() => setShowFilterDropdown(false)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium text-black">All Documents</h1>
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center font-medium">
            10
          </span>
        </div>
        
        {/* Filter/Sort Icon */}
        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <SlidersHorizontal className="w-5 h-5 text-blue-500" />
          </button>
          
          {/* Filter Dropdown */}
          {showFilterDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by status</h3>
                <div className="space-y-2">
                  {/* All */}
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedFilters.has('all')}
                        onChange={() => handleFilterChange('all')}
                      />
                      <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                        selectedFilters.has('all') ? 'bg-black border-black' : 'bg-white'
                      }`}>
                        {selectedFilters.has('all') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700">All</span>
                  </label>
                  
                  {/* Signed */}
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedFilters.has('signed')}
                        onChange={() => handleFilterChange('signed')}
                      />
                      <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                        selectedFilters.has('signed') ? 'bg-black border-black' : 'bg-white'
                      }`}>
                        {selectedFilters.has('signed') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700">Signed</span>
                  </label>
                  
                  {/* Viewed */}
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedFilters.has('viewed')}
                        onChange={() => handleFilterChange('viewed')}
                      />
                      <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                        selectedFilters.has('viewed') ? 'bg-black border-black' : 'bg-white'
                      }`}>
                        {selectedFilters.has('viewed') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700">Viewed</span>
                  </label>
                  
                  {/* Waiting on others */}
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedFilters.has('waiting on others')}
                        onChange={() => handleFilterChange('waiting on others')}
                      />
                      <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                        selectedFilters.has('waiting on others') ? 'bg-black border-black' : 'bg-white'
                      }`}>
                        {selectedFilters.has('waiting on others') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700">Waiting on others</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document List */}
      <div className="divide-y divide-gray-100">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center px-4 py-3 hover:bg-gray-50">
            {/* Checkbox */}
            {/* <div className="mr-4">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedDocs.has(doc.id)}
                  onChange={() => handleSelectDoc(doc.id)}
                />
                <div 
                  onClick={() => handleSelectDoc(doc.id)}
                  className={`w-4 h-4 border border-gray-300 rounded cursor-pointer flex items-center justify-center ${
                    selectedDocs.has(doc.id) ? 'bg-blue-500 border-blue-500' : 'bg-white hover:border-gray-400'
                  }`}
                >
                  {selectedDocs.has(doc.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </div> */}

            {/* Date */}
            <div className="text-xs text-gray-500 w-14 flex-shrink-0">
              {doc.date}
            </div>

            {/* Document Icon */}
            <div className="mr-3 flex-shrink-0">
              <FileText className="w-4 h-4 text-gray-500" />
            </div>

            {/* Document Title */}
            <div className="flex-1 min-w-0">
              <span className="text-sm text-black font-normal">{doc.title}</span>
            </div>

            {/* Status and Action */}
            <div className="flex items-center gap-4 mr-2">
              <span className="text-sm text-gray-500 font-medium">
                {doc.status}
              </span>
              <span className={`text-sm font-normal text-blue-500`}>
                {doc.action}
              </span>
            </div>

            {/* User Icons */}
            <div className="flex items-center ">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-1">
                <Users className="w-4 h-4 text-gray-900" />
              </div>
            </div>
 <div className="flex items-center ">
              <div className="w-6 h-6 rounded-full  flex items-center justify-center mr-1">
                <MessageSquare className="w-4 h-4 text-gray-900" />
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;