import React from 'react';
import { Sparkles, Clock, CheckCircle2, Loader } from 'lucide-react';

const DashboardStats = () => {
  return (
  <div className="w-full ">
      <div className="mb-10">
        {/* Date */}
        <div className="text-sm text-gray-500 mb-1">Thursday, July 31</div>
        
        {/* Greeting */}
        <div className="text-3xl font-semibold text-gray-900 mb-8">
          Good afternoon, <span className="text-blue-500">Dave</span>
        </div>
        
        {/* Stats Cards */}
        <div className="flex flex-row items-center justify-start gap-6">
          {/* Tasks Card */}
          <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm w-50">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <Loader className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <div className="text-[1.4rem] font-mono font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-500">Tasks</div>
              </div>
            </div>
          </div>
                   
          {/* Deadlines Card */}
          <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm w-50">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <div className="text-[1.4rem] font-mono font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-500">Deadlines</div>
              </div>
            </div>
          </div>
                   
          {/* Closings Card */}
          <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm w-50">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle2 className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <div className="text-[1.4rem] font-mono font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-500">Closings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;