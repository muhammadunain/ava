'use client'
import React, { useState } from 'react';
import { Check, FileText, Users, ChevronRight } from 'lucide-react';

const DocumentList = () => {
  const [selectedDocs, setSelectedDocs] = useState(new Set());
  
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

  const handleSelectDoc = (docId:any) => {
    const newSelected = new Set(selectedDocs);
    if (newSelected.has(docId)) {
      newSelected.delete(docId);
    } else {
      newSelected.add(docId);
    }
    setSelectedDocs(newSelected);
  };

  const getActionColor = (action:any) => {
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
    <div className=" mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium text-black">All Documents</h1>
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center font-medium">
            10
          </span>
        </div>
      </div>

      {/* Document List */}
      <div className="divide-y divide-gray-100">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center px-4 py-3 hover:bg-gray-50">
            {/* Checkbox */}
            <div className="mr-4">
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
            </div>

            {/* Date */}
            <div className="text-sm text-gray-500 w-14 mr-4 flex-shrink-0">
              {doc.date}
            </div>

            {/* Document Icon */}
            <div className="mr-3 flex-shrink-0">
              <FileText className="w-4 h-4 text-gray-400" />
            </div>

            {/* Document Title */}
            <div className="flex-1 min-w-0">
              <span className="text-sm text-black font-normal">{doc.title}</span>
            </div>

            {/* Status and Action */}
            <div className="flex items-center gap-4 mr-4">
              <span className="text-sm text-gray-500 font-medium">
                {doc.status}
              </span>
              <span className={`text-sm font-normal text-blue-500`}>
                {doc.action}
              </span>
            </div>

            {/* User Icons */}
            <div className="flex items-center mr-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-1">
                <Users className="w-3 h-3 text-gray-600" />
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