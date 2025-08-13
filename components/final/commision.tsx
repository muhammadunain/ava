import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const AgentsCommissions = () => {
  return (
    <div className=" bg-white ">
      <h1 className="text-2xl font-semibold mb-5 text-black">Agents & Commissions</h1>
      
      <div className="space-y-6 drop-shadow-xl shadow-gray-50 rounded-2xl bg-white  p-8 ">
        
        {/* First Row */}
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <div className="flex">
              <Input 
                defaultValue="0" 
                type='number'
                className="w-36 h-10 border  border-gray-300 rounded-r-none border-r-0 px-3"
              />
              <Select defaultValue="%">
                <SelectTrigger className="w-16 h-10 py-[1.2rem] border border-gray-300 rounded-l-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="$">$</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-gray-500 text-sm">OF PRICE SOLD</span>
          </div>
          <span className="text-gray-800 ">Total gross commission</span>
        </div>

        {/* LISTING SIDE */}
        <div className="flex items-center gap-3">
          <span className="text-black  ">LISTING SIDE:</span>
          <Select defaultValue="select">
            <SelectTrigger className="w-auto border-none bg-white text-blue-500  h-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select">select</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Second Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex">
             <Input 
                defaultValue="0" 
                type='number'
                className="w-36 h-10 border  border-gray-300 rounded-r-none border-r-0 px-3"
              />
              <Select defaultValue="%">
                <SelectTrigger className="w-16 h-10 py-[1.2rem] border border-gray-300 rounded-l-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="$">$</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-gray-500 text-sm">OF PRICE SOLD</span>
          </div>
          <span className="text-gray-400">Award distribution</span>
        </div>

        {/* BUYING SIDE */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-black ">BUYING SIDE:</span>
            <span className="text-blue-500">Naples Homes</span>
          </div>
          <Button variant="ghost" className="text-blue-500 hover:bg-blue-50 p-0 h-auto">
            <Plus className="w-4 h-4 mr-1" />
            Add Agent / Commission
          </Button>
        </div>

        {/* Third Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex">
             <Input 
                defaultValue="0" 
                type='number'
                className="w-36 h-10 border  border-gray-300 rounded-r-none border-r-0 px-3"
              />
              <Select defaultValue="%">
                <SelectTrigger className="w-16 h-10 py-[1.2rem] border border-gray-300 rounded-l-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="$">$</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-gray-500 text-sm">OF PRICE SOLD</span>
          </div>
          <span className="text-gray-400">Award distribution</span>
        </div>

      </div>
    </div>
  );
};

export default AgentsCommissions;