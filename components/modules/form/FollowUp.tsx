'use client'
import React, { useState } from 'react';
import { PenTool, Mail, MessageSquare, Phone, ChevronDown, MoreHorizontal, HelpCircle } from 'lucide-react';

const CRMInterface = () => {
  const [callNotes, setCallNotes] = useState('');

  return (
    <div className=" mx-auto bg-white ">
      {/* Header Notification */}
      <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-start gap-2">
        <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center mt-0.5">
          <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 text-sm">Escrow deposit receipt received</h3>
            <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full text-nowrap">410 ELDERSHIP DR LN</span>
          </div>
          <p className="text-xs text-gray-600">Hi Dave, you've received the escrow deposit receipt. It's now saved and added to your timeline.</p>
        </div>
        <div className="text-xs text-gray-500 whitespace-nowrap ml-2">July 10, 2025</div>
        <MoreHorizontal className="h-4 w-4 text-gray-400 ml-1" />
      </div>

      {/* Action Buttons Row */}
      <div className="flex gap-2 mb-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
          <PenTool className="h-3.5 w-3.5" />
          Create Note
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
          <Mail className="h-3.5 w-3.5" />
          Send Email
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
          <MessageSquare className="h-3.5 w-3.5" />
          Text
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-300 rounded text-xs text-blue-600 bg-blue-50 hover:bg-blue-100">
          <Phone className="h-3.5 w-3.5" />
          Log Call
        </button>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
          <HelpCircle className="h-3.5 w-3.5" />
          How it works
        </button>
      </div>

      {/* Call Notes Textarea */}
      <div className="mb-4">
        <textarea
          value={callNotes}
          onChange={(e) => setCallNotes(e.target.value)}
          placeholder="Add call notes..."
          className="w-full h-24 p-3 border border-gray-300 rounded text-xs resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-500"
        />
      </div>

      {/* Call Outcome Options */}
      <div className="flex gap-4 mb-4 text-xs text-gray-600">
        <span className="cursor-pointer hover:text-gray-800">No Answer</span>
        <span className="cursor-pointer hover:text-gray-800">Left Voicemail</span>
        <span className="cursor-pointer hover:text-gray-800">Bad Number</span>
      </div>

      {/* Phone Input and Log Call Button */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <select className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-700 text-xs appearance-none">
            <option>(500) 535-1063 (mobile)</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
          Log Call
        </button>
      </div>

      {/* Filter Stats and Options */}
      <div className="flex items-center gap-4 text-xs mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <span className="text-gray-700">All</span>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </div>
        <div className="flex items-center gap-1">
          <Mail className="h-3 w-3 text-gray-400" />
          <span className="text-gray-600">0</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3 text-gray-400" />
          <span className="text-gray-600">2</span>
        </div>
        <span className="text-gray-600">1</span>
        <div className="ml-auto">
          <button className="text-blue-500 text-xs hover:text-blue-600">Filters</button>
        </div>
      </div>

      {/* Communication History */}
      <div className="space-y-0">
        {/* Phone Call Entry */}
        <div className="flex items-start gap-3 py-3 border-b border-gray-100">
          <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-gray-900">Jane Sema</span>
              <span className="text-xs text-gray-500">Evelyn Alvatt</span>
              <span className="text-xs text-gray-500 ml-auto">20 days ago</span>
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">Hi Evelyn, just checking in to see what's new. Give a shout if you want to look at any homes this weekend!</p>
          </div>
        </div>

        {/* Text Message Entry */}
        <div className="flex items-start gap-3 py-3">
          <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-gray-900">Jane Sema</span>
              <span className="text-xs text-gray-500">Evelyn Alvatt</span>
              <span className="text-xs text-gray-500 ml-auto">20 days ago</span>
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">Looking forward to connecting!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMInterface;