// components/AddToCalendarModal.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, X } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  checked: boolean;
}

const AddToCalendarModal = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Initial Deposit Due Date',
      date: 'Tuesday July 29, 2025',
      checked: true
    },
    {
      id: '2',
      title: 'Loan Application Deadline',
      date: 'Thursday July 31, 2025',
      checked: true
    },
    {
      id: '3',
      title: 'Additional Deposit Due Date',
      date: 'Sunday August 10, 2025',
      checked: true
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const handleEventCheck = (eventId: string, checked: boolean) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, checked } : event
    ));
  };

  const handleAddToCalendar = () => {
    const selectedEvents = events.filter(event => event.checked);
    console.log('Adding to calendar:', selectedEvents);
    setIsOpen(false);
  };

  const selectedCount = events.filter(event => event.checked).length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 cursor-pointer">
          <Calendar className="h-4 w-4" />
          Add to Calendar
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Add to Calendar</h2>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
              {selectedCount}
            </div>
          </div>
        
        </div>

        {/* Events List */}
        <div className="px-6 py-6">
          {events.map((event, index) => (
            <div key={event.id}>
              <div className="flex items-start justify-between py-4">
                <div className="flex-1 pr-4">
                  <h3 className="font-medium text-gray-900 text-base mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {event.date}
                  </p>
                </div>
                <div className="flex-shrink-0 pt-0.5">
                  <Checkbox
                    checked={event.checked}
                    onCheckedChange={(checked) => handleEventCheck(event.id, checked as boolean)}
                    className="h-5 w-5 rounded border-2 border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"
                  />
                </div>
              </div>
              {index < events.length - 1 && (
                <div className="border-b border-gray-100"></div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
                <svg className="h-8 w-8" viewBox="0 0 48 48" fill="none">
                  {/* Google Calendar icon background */}
                  <rect width="48" height="48" rx="8" fill="white"/>
                  <rect width="48" height="48" rx="8" stroke="#dadce0" strokeWidth="1"/>
                  
                  {/* Calendar header (red) */}
                  <rect x="4" y="4" width="40" height="12" rx="4" fill="#ea4335"/>
                  
                  {/* Calendar body (white) */}
                  <rect x="4" y="12" width="40" height="32" fill="white"/>
                  
                  {/* Date "31" */}
                  <text x="24" y="32" textAnchor="middle" className="fill-gray-700 text-xs font-bold">31</text>
                  
                  {/* Rings at top */}
                  <circle cx="14" cy="8" r="1.5" fill="white"/>
                  <circle cx="34" cy="8" r="1.5" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Google Calendar</p>
                <p className="text-xs text-gray-500">Connected</p>
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCalendar}
              disabled={selectedCount === 0}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCalendarModal;

// Usage example in a page or component:
// 
// import AddToCalendarModal from '@/components/AddToCalendarModal';
// 
// export default function HomePage() {
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">My Application</h1>
//       <AddToCalendarModal />
//     </div>
//   );
// }

// Required shadcn/ui components to install:
// npx shadcn-ui@latest add dialog
// npx shadcn-ui@latest add button  
// npx shadcn-ui@latest add checkbox