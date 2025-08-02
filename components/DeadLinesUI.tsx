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
  FileText,
  Edit3
} from 'lucide-react';
import DeadLineDialog from './dialog/DeadLinesDialog';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

const DeadlinesUI: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Association Application Deadline', dueDate: 'Saturday July 26, 2025', completed: false },
    { id: '2', title: 'Effective Date', dueDate: 'Saturday July 26, 2025', completed: false },
    { id: '3', title: 'Initial Deposit Due Date', dueDate: 'Tuesday July 29, 2025', completed: false },
    { id: '4', title: 'Loan Application Deadline', dueDate: 'Thursday July 31, 2025', completed: false },
    { id: '5', title: 'Additional Deposit Due Date', dueDate: 'Sunday August 10, 2025', completed: false },
    { id: '6', title: 'Inspection Period End Date', dueDate: 'Friday August 15, 2025', completed: false },
    { id: '7', title: 'Buyer\'s Election Deadline', dueDate: 'Wednesday August 20, 2025', completed: false },
    { id: '8', title: 'Closing Date', dueDate: 'Friday August 22, 2025', completed: false }
  ]);

  const [completedTasks, setCompletedTasks] = useState<Task[]>([
    { id: 'c1', title: 'Association Application Deadline', dueDate: 'Saturday July 26, 2025', completed: true },
    { id: 'c2', title: 'Effective Date', dueDate: 'Saturday July 26, 2025', completed: true }
  ]);

  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);

  const toggleTask = useCallback((id: string, fromCompleted: boolean) => {
    if (fromCompleted) {
      const task = completedTasks.find(t => t.id === id);
      if (task) {
        setCompletedTasks(prev => prev.filter(t => t.id !== id));
        setTasks(prev => [...prev, { ...task, completed: false }]);
      }
    } else {
      const task = tasks.find(t => t.id === id);
      if (task) {
        setTasks(prev => prev.filter(t => t.id !== id));
        setCompletedTasks(prev => [...prev, { ...task, completed: true }]);
      }
    }
  }, [tasks, completedTasks]);

  return (
    <div className="bg-white w-full ">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
           Deadlines
            <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </h2>
        <DeadLineDialog/>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id, false)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                  <div className="text-xs text-gray-500">{task.dueDate}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <FileText className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIsCompletedCollapsed(!isCompletedCollapsed)}
            className="flex items-center text-lg font-medium text-gray-900 hover:text-gray-700"
          >
            {isCompletedCollapsed ? (
              <ChevronRight className="w-5 h-5 mr-1" />
            ) : (
              <ChevronDown className="w-5 h-5 mr-1" />
            )}
            Completed Tasks
            <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </button>
        </div>

        {!isCompletedCollapsed && (
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-100">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, true)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 line-through">{task.title}</div>
                    <div className="text-xs text-gray-500">{task.dueDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeadlinesUI;
