"use client";

import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search any task, deadline, transactions"
              className="pl-10 h-9 bg-gray-50 border-gray-200 text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5 text-gray-400" />
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}