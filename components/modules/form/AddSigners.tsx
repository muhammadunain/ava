'use client'
import React, { useState, useRef } from 'react';
import { Plus, X, ChevronDown, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Party {
  id: string;
  name: string;
  role: string;
  type: 'fixed' | 'dropdown' | 'removable';
}

const roleOptions = [
  'Seller',
  'Buyer', 
  'Listing agent',
  'Buyer\'s agent',
  'Transaction coordinator',
  'Office administrator',
  'Manager',
  'Broker',
  'Owner',
  'Loan officer',
  'Escrow officer',
  'Title office',
  'Buyer\'s attorney',
  'Seller\'s attorney',
  'Landlord',
  'Tenant',
  'Marketing manager',
  'Accountant',
  'Attorney',
  'Home inspector',
  'Termite inspector',
  'Other'
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

  const [showAddSignerModal, setShowAddSignerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableContacts] = useState([
    { id: 'c1', name: 'Olivia Davis', role: 'buyer #2' },
    { id: 'c2', name: 'Nathan Scott', role: 'seller #1' },
    { id: 'c3', name: 'William Carter', role: 'buyer #2' },
    { id: 'c4', name: 'Tyler Reynolds', role: 'seller #1' },
    { id: 'c5', name: 'Sarah Johnson', role: 'listing agent' },
    { id: 'c6', name: 'Mike Chen', role: 'buyer\'s agent' },
  ]);

  const filteredContacts = availableContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSigner = () => {
    setShowAddSignerModal(true);
    setSearchTerm('');
  };

  const handleSelectContact = (contact: { id: string; name: string; role: string }) => {
    const newParty: Party = {
      id: Date.now().toString(),
      name: contact.name,
      role: contact.role,
      type: 'removable'
    };
    setParties([...parties, newParty]);
    setShowAddSignerModal(false);
    setSearchTerm('');
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

  return (
    <div className="w-full  mx-auto p-6 bg-white">
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
                relative  border rounded-lg transition-all duration-200
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
                  {/* Dropdown for role selection */}
                  {/* {party.type === 'dropdown' && (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(party.id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm  rounded hover:bg-gray-50 cursor-pointer"
                      >
                        {party.role}
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {openDropdowns[party.id] && (
                        <div className="absolute right-0 z-10 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                          {roleOptions.map((role) => (
                            <button
                              key={role}
                              onClick={() => handleRoleChange(party.id, role)}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )} */}
                  
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
        
        {/* Assign Signer Order Checkbox */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <Input
              type="checkbox"
              checked={assignSignerOrder}
              onChange={(e) => setAssignSignerOrder(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-900">Assign signer order</span>
          </label>
          
          <div className="relative">
            <button
              onClick={handleAddSigner}
              className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add signer
            </button>

            {/* Add Signer Modal/Dropdown */}
            {showAddSignerModal && (
              <div className="absolute right-0 top-8 z-20 w-80 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">add parties name</h3>
                    <button
                      onClick={() => setShowAddSignerModal(false)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    {/* Available Contacts */}
                    {filteredContacts.slice(0, 2).map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => handleSelectContact(contact)}
                        className="w-full flex items-center cursor-pointer justify-between px-3 py-2 hover:bg-gray-50 rounded text-left"
                      >
                        <span className="font-medium text-gray-900">{contact.name}</span>
                        <span className="text-gray-500 text-sm">- {contact.role}</span>
                      </button>
                    ))}
                    
                    {/* Search Input */}
                    <div className="pt-2 border-t border-gray-100">
                      <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="type here to search more"
                        className="w-full px-3 py-2 text-sm text-gray-500 bg-transparent border-none focus:outline-none placeholder-gray-400"
                      />
                      
                      {/* Filtered Results */}
                      {searchTerm && (
                        <div className="mt-1 space-y-1">
                          {filteredContacts.filter((_, index) => index >= 2).map((contact) => (
                            <button
                              key={contact.id}
                              onClick={() => handleSelectContact(contact)}
                              className="w-full cursor-pointer flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded text-left"
                            >
                              <span className="font-medium text-gray-900">{contact.name}</span>
                              <span className="text-gray-500 text-sm">- {contact.role}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">add signers</p>
                    {searchTerm && filteredContacts.length > 2 && (
                      <div className="mt-2 space-y-1">
                        {filteredContacts.filter((_, index) => index >= 2).slice(0, 2).map((contact) => (
                          <button
                            key={contact.id}
                            onClick={() => handleSelectContact(contact)}
                            className="w-full flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50 rounded text-left"
                          >
                            <span className="font-medium text-gray-900">{contact.name}</span>
                            <span className="text-gray-500 text-sm">- {contact.role}</span>
                          </button>
                        ))}
                        
                        <Input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="type here to search more"
                          className="w-full px-3 py-2 text-sm text-gray-500 bg-transparent border-none focus:outline-none placeholder-gray-400"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
       
      </div>
    </div>
  );
}