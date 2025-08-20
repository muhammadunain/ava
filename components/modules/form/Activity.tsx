'use client'
import React, { useState } from 'react';
import { FileText } from 'lucide-react';

const ActivityFeed = () => {
  const [activeFilter, setActiveFilter] = useState('All events');

  const filters = [
    { name: 'All events', count: 3 },
    { name: 'Checklist added', count: 1 },
    { name: 'Transaction updated', count: 1 },
    { name: 'Document uploaded', count: 1 }
  ];

  const activities = [
    {
      id: 1,
      user: 'Dylan Sanders',
      initials: 'DS',
      action: 'added checklist "Buying" Transaction: "9103 Vanderbilt FL 34108"',
      timestamp: 'Aug 14, 2025 02:45:33 pm',
      type: 'checklist'
    },
    {
      id: 2,
      user: 'Dylan Sanders',
      initials: 'DS',
      action: 'updated transaction "9103 Vanderbilt FL 34108"',
      timestamp: 'Aug 16, 2025 02:44:45 pm',
      type: 'transaction',
      details: [
        { field: 'Acceptance date', from: '""', to: '"Aug 14, 2022"' },
        { field: 'Closing date', from: '""', to: '"Aug 30, 2022"' }
      ]
    },
    {
      id: 3,
      user: 'Aaron Russell',
      initials: 'DS',
      action: 'uploaded document',
      timestamp: 'Aug 17, 2025 02:43:24 pm',
      type: 'document',
      document: {
        name: 'TransactionNoticeBuyerElectionandSellerResponse.pdf',
        folder: 'Imported documents folder Transaction: "9103 Vanderbilt Dr #2-208, Naples, FL 34108"'
      }
    }
  ];

  // Filter activities based on selected filter
  const getFilteredActivities = () => {
    if (activeFilter === 'All events') {
      return activities;
    } else if (activeFilter === 'Checklist added') {
      return activities.filter(activity => activity.type === 'checklist');
    } else if (activeFilter === 'Transaction updated') {
      return activities.filter(activity => activity.type === 'transaction');
    } else if (activeFilter === 'Document uploaded') {
      return activities.filter(activity => activity.type === 'document');
    }
    return activities;
  };

  const filteredActivities = getFilteredActivities();

 


  const getInitialsColor = (initials: any) => {
    return 'bg-blue-500 text-white';
  };

  return (
    <div className="flex bg-white min-h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-white p-6 border-r border-gray-200">
        <div className="mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-3">
            Activity
            <span className="bg-blue-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center font-medium">
              3
            </span>
          </h2>
        </div>

        <div className="space-y-1">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-colors text-sm ${
                activeFilter === filter.name
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-normal">{filter.name}</span>
              <span
                className={`text-sm px-2 py-0.5 rounded-full font-normal ${
                  activeFilter === filter.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 ">
        <div>
          {/* Dynamic Header Content */}
       

          {/* Activity Content */}
          {filteredActivities.length > 0 ? (
            <div className="space-y-4">
              {filteredActivities.map((activity, index) => (
                <div key={activity.id} className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex uppercase items-center justify-center text-xs font-semibold text-blue-500 bg-gray-100`}>
                      {activity.initials}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <span className="font-semibold text-gray-900">{activity.user}</span>
                        <span className="text-gray-700 ml-1">{activity.action}</span>
                      </div>

                      {/* Transaction Update Details */}
                      {activity.details && (
                        <div className="mb-3 space-y-1 ml-4">
                          {activity.details.map((detail, idx) => (
                            <div key={idx} className="text-sm text-gray-600">
                              <span className="font-normal">{detail.field} changed from {detail.from} to {detail.to}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Document Details */}
                      {activity.document && (
                        <div className="mb-3 ml-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {activity.document.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            in {activity.document.folder}
                          </div>
                        </div>
                      )}

                      <div className="text-sm text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
              <div className="text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-900 mb-2">No activities found</p>
                <p className="text-sm">No activities match the selected filter.</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
  );
};

export default ActivityFeed;