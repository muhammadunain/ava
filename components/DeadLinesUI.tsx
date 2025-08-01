"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

const DeadlinesUI: React.FC = () => {
  const [activeDeadlines, setActiveDeadlines] = useState<Deadline[]>([
    { id: '1', title: 'Association Application Deadline', date: 'Saturday July 26, 2025', completed: false },
    { id: '2', title: 'Effective Date', date: 'Saturday July 26, 2025', completed: false },
    { id: '3', title: 'Initial Deposit Due Date', date: 'Tuesday July 29, 2025', completed: false },
    { id: '4', title: 'Loan Application Deadline', date: 'Thursday July 31, 2025', completed: false },
    { id: '5', title: 'Additional Deposit Due Date', date: 'Sunday August 10, 2025', completed: false },
    { id: '6', title: 'Inspection Period End Date', date: 'Friday August 15, 2025', completed: false },
    { id: '7', title: 'Buyer\'s Election Deadline', date: 'Wednesday August 20, 2025', completed: false },
    { id: '8', title: 'Closing Date', date: 'Friday August 22, 2025', completed: false }
  ]);

  const [completedDeadlines, setCompletedDeadlines] = useState<Deadline[]>([
    { id: 'c1', title: 'Association Application Deadline', date: 'Saturday July 26, 2025', completed: true },
    { id: 'c2', title: 'Effective Date', date: 'Saturday July 26, 2025', completed: true }
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  const toggleDeadlineCompletion = useCallback((id: string, fromCompleted = false) => {
    if (fromCompleted) {
      const deadline = completedDeadlines.find(d => d.id === id);
      if (deadline) {
        setCompletedDeadlines(prev => prev.filter(d => d.id !== id));
        setActiveDeadlines(prev => [...prev, { ...deadline, completed: false }]);
      }
    } else {
      const deadline = activeDeadlines.find(d => d.id === id);
      if (deadline) {
        setActiveDeadlines(prev => prev.filter(d => d.id !== id));
        setCompletedDeadlines(prev => [...prev, { ...deadline, completed: true }]);
      }
    }
  }, [activeDeadlines, completedDeadlines]);

  const DeadlineItem: React.FC<{ deadline: Deadline; isCompleted?: boolean }> = ({
    deadline,
    isCompleted = false
  }) => (
    <div className="flex  items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded border border-gray-600 flex items-center justify-center cursor-pointer transition-colors ${
            isCompleted ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'
          }`}
          onClick={() => toggleDeadlineCompletion(deadline.id, isCompleted)}
        >
          {isCompleted && (
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col">
          <span className={`font-normal text-sm ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {deadline.title}
          </span>
          <span className="text-xs text-gray-500 mt-0.5">
            {deadline.date}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
          <Calendar className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
          <Edit className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50">
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-white w-full  mx-auto px-4">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-medium text-gray-900">Deadlines</h1>
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full text-white bg-blue-500 ">
              {activeDeadlines.length}
            </span>
          </div>
          <Button className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 h-auto ">
            <Plus className="w-5 h-5 mr-1" />
            New
          </Button>
        </div>

        {/* Active Deadlines */}
        <div className="w-full bg-white  overflow-hidden">
          <div className="divide-y divide-gray-100">
            {activeDeadlines.map((deadline) => (
              <div key={deadline.id} className="w-full border border-gray-200 my-2 rounded-md">
                <DeadlineItem deadline={deadline} />
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks Collapsible */}
        <div className="w-full">
          <button
            className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-50 transition"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <div className="flex items-center gap-2">
              {showCompleted ? (
                <ChevronDown className="w-4 h-4 text-gray-700" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-700" />
              )}
              <span className="text-base font-semibold text-gray-900">Completed Tasks</span>
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold text-white bg-blue-500 rounded-full">
                {completedDeadlines.length}
              </span>
            </div>
          </button>

          {showCompleted && (
            <div className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {completedDeadlines.map((deadline) => (
                  <div key={deadline.id} className="w-full">
                    <DeadlineItem deadline={deadline} isCompleted />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeadlinesUI;
