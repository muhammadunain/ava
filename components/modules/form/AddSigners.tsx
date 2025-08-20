'use client'
import React, { useState, useRef } from 'react';
import { Plus, X, ChevronDown, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Party {
  id: string;
  name: string;
  role: string;
  type: 'fixed' | 'dropdown' | 'removable';
  email?: string;
}

const roleOptions = [
  'Seller',
  'Buyer', 
  
];

export default function SignersAndOtherParties() {
  const [parties, setParties] = useState<Party[]>([
    { id: '1', name: 'Broker', role: 'Broker', type: 'fixed' },
    { id: '2', name: 'Daniel Summers', role: 'buyer #1', type: 'removable' },
    { id: '3', name: 'Buyer #2', role: 'Buyer', type: 'dropdown' }
  ]);
  
  const [assignSignerOrder, setAssignSignerOrder] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  
  // Dialog form state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Buyer',
    sendIntroEmail: false
  });

  const dragCounter = useRef(0);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    if (!assignSignerOrder) return;
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
    dragCounter.current = 0;
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!assignSignerOrder) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, id: string) => {
    if (!assignSignerOrder) return;
    e.preventDefault();
    dragCounter.current++;
    setDraggedOver(id);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!assignSignerOrder) return;
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDraggedOver(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    if (!assignSignerOrder || !draggedItem) return;
    e.preventDefault();
    
    if (draggedItem !== targetId) {
      const draggedIndex = parties.findIndex(p => p.id === draggedItem);
      const targetIndex = parties.findIndex(p => p.id === targetId);
      
      const newParties = [...parties];
      const [draggedParty] = newParties.splice(draggedIndex, 1);
      newParties.splice(targetIndex, 0, draggedParty);
      
      setParties(newParties);
    }
    
    setDraggedItem(null);
    setDraggedOver(null);
    dragCounter.current = 0;
  };

  const handleRemoveParty = (id: string) => {
    setParties(parties.filter(party => party.id !== id));
  };

  const handleRoleChange = (id: string, newRole: string) => {
    setParties(parties.map(party => 
      party.id === id ? { ...party, role: newRole } : party
    ));
    setOpenDropdowns({ ...openDropdowns, [id]: false });
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdowns({ 
      ...openDropdowns, 
      [id]: !openDropdowns[id] 
    });
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddPerson = () => {
    if (formData.fullName.trim() === '') return;
    
    const newParty: Party = {
      id: Date.now().toString(),
      name: formData.fullName,
      role: formData.role,
      email: formData.email,
      type: 'removable'
    };
    
    setParties([...parties, newParty]);
    
    // Reset form and close dialog
    setFormData({
      fullName: '',
      email: '',
      role: 'Buyer',
      sendIntroEmail: false
    });
    setDialogOpen(false);
  };

  return (
    <div className="w-full mx-auto bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Signers & Other Parties</h1>
        <p className="text-gray-600 mb-6">
          Select people you expect to sign the package and other parties to populate their contact information. Review and adjust if needed.
        </p>
        
        {/* Parties List */}
        <div className="space-y-3 mb-6">
          {parties.map((party, index) => (
            <div
              key={party.id}
              draggable={assignSignerOrder}
              onDragStart={(e) => handleDragStart(e, party.id)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, party.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, party.id)}
              className={`
                relative border rounded-lg transition-all duration-200
                ${assignSignerOrder ? 'cursor-move' : ''}
                ${draggedItem === party.id ? 'opacity-50 scale-95' : ''}
                ${draggedOver === party.id && draggedItem !== party.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
                ${assignSignerOrder ? 'hover:border-gray-300' : ''}
              `}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {/* Drag Handle - only show when assign signer order is checked */}
                  {assignSignerOrder && (
                    <div className="cursor-move text-gray-400 hover:text-gray-600">
                      <GripVertical className="w-5 h-5" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-gray-900 font-medium">{party.name}</span>
                    {party.type === 'removable' && (
                      <span className="text-gray-500 text-sm">- {party.role}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Remove button for removable items */}
                  {party.type === 'removable' && (
                    <button
                      onClick={() => handleRemoveParty(party.id)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Assign Signer Order Checkbox and Add Signer Button */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={assignSignerOrder}
              onChange={(e) => setAssignSignerOrder(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-900">Assign signer order</span>
          </label>
          
          {/* Add Person Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Add signer
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader className="text-left">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg font-semibold text-gray-900">
                    Add Person
                  </DialogTitle>
                </div>
                <DialogDescription className="text-sm text-gray-600 mt-2">
                  Anyone you add won't see anything until you share something. Only name and role are required.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FULL NAME
                  </label>
                  <Input
                    type="text"
                    placeholder="ADD FULL NAME"
                    value={formData.fullName}
                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMAIL
                  </label>
                  <Input
                    type="email"
                    placeholder="ADD EMAIL"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ROLE
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleFormChange('role', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Send intro email checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="sendIntroEmail"
                    checked={formData.sendIntroEmail}
                    onChange={(e) => handleFormChange('sendIntroEmail', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="sendIntroEmail" className="text-sm text-gray-700">
                    Send intro email
                  </label>
                </div>
              </div>
              
              {/* Add Person Button */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddPerson}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
                  disabled={!formData.fullName.trim()}
                >
                  ADD PERSON
                </Button>
                
                <div className="text-center">
                  <span className="text-xs text-gray-500">
                    AVA respects your privacy. 
                    <button className="text-blue-600 hover:underline ml-1">
                      Privacy Policy
                    </button>
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}