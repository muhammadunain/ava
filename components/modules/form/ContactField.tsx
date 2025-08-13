'use client'
import React, { useState, useRef, useEffect, JSX } from 'react';
import { Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Contact {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
}

interface FormData {
  fullName: string;
  email: string;
  role: string;
}

const roleOptions: string[] = [
  'Seller',
  'Buyer', 

];

export default function ContactsInput(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    role: 'Buyer'
  });
  const [selectedRole, setSelectedRole] = useState<string>('Buyer');
  const [showRoleDropdown, setShowRoleDropdown] = useState<boolean>(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleChange = (role: string): void => {
    setSelectedRole(role);
  };

  const handleRemoveContact = (contactId: number): void => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleAddContact = (): void => {
    if (formData.fullName && selectedRole) {
      const newContact: Contact = {
        ...formData,
        roles: [selectedRole],
        id: Date.now()
      };
      setContacts(prev => [...prev, newContact]);
      setFormData({ fullName: '', email: '', role: 'Buyer' });
      setSelectedRole('Buyer');
      setOpen(false);
    }
  };

  const resetForm = (): void => {
    setFormData({ fullName: '', email: '', role: 'Buyer' });
    setSelectedRole('Buyer');
    setShowRoleDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowRoleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contacts</h2>
        
        {/* Contacts Display Area */}
        {contacts.length === 0 ? (
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="text-gray-500">No contacts added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map(contact => (
              <div key={contact.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
                <div className=" text-gray-600">{contact.fullName}</div>
                <div className="text-gray-600">{contact.roles.join(', ')}</div>
                <button 
                  onClick={() => handleRemoveContact(contact.id)}
                  className="text-gray-400 hover:text-gray-600 ml-4"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetForm();
        }}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 cursor-pointer text-blue-500 hover:text-blue-600 font-medium text-sm mt-4 transition-colors">
              <Plus className="w-4 h-4" />
              Add new contacts
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Person</DialogTitle>
              <DialogDescription>
                Anyone you add won't see anything until you share something. Only name and role are required.
              </DialogDescription>
            </DialogHeader>
            
            {/* Form */}
            <div className="space-y-4 py-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('fullName', e.target.value)}
                  placeholder="ADD FULL NAME"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                  placeholder="ADD EMAIL"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
              </div>

              {/* Role */}
              <div >
                <label className="block text-sm font-medium  mb-2">
                  ROLE
                </label>
                <Select value={selectedRole}   onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent >
                    {roleOptions.map((role: string) => (
                      <SelectItem key={role} value={role} className="flex items-center space-x-2 ">
                        <div className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={selectedRole === role}
                            onCheckedChange={() => handleRoleChange(role)}
                          />
                          <span>{role}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddContact}
              disabled={!formData.fullName || !selectedRole}
              className="w-full py-3 bg-black text-white cursor-pointer font-medium rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              ADD PERSON
            </button>

            {/* Privacy Notice */}
            <p className="text-center text-xs text-gray-500 mt-4">
              AVA respects your privacy. <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}