'use client'

import React, { useState } from 'react'
import { 
  Plus, 
  X,
  ChevronDown,
  Check,
  CheckIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

interface Contact {
  id: string
  name: string
  roles: string[]
  phone: string
  email: string
  address: string
}

const roleOptions = [
  'Buyer',
  'Seller', 
  'Buyer Agent',
  'Seller Agent',
  'Agent',
  'Buyer Brokerage'
]

export default function AddContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    roles: [] as string[],
    phone: '',
    email: '',
    address: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }))
  }

  const handleSave = () => {
    if (formData.name.trim()) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: formData.name,
        roles: formData.roles,
        phone: formData.phone,
        email: formData.email,
        address: formData.address
      }
      
      setContacts(prev => [newContact, ...prev])
      
      // Reset form
      setFormData({
        name: '',
        roles: [],
        phone: '',
        email: '',
        address: ''
      })
      setIsOpen(false)
      setIsDropdownOpen(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      roles: [],
      phone: '',
      email: '',
      address: ''
    })
    setIsOpen(false)
    setIsDropdownOpen(false)
  }

  const getRolesDisplayText = () => {
    if (formData.roles.length === 0) return 'Select party roles'
    if (formData.roles.length === 1) return formData.roles[0]
    return `${formData.roles.length} roles selected`
  }

  return (
    <div className="w-full  ">
      {/* Trigger Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black hover:bg-gray-800 text-white cursor-pointer ">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </DialogTrigger>
        
        <DialogContent className=" w-full p-0 ">
          <DialogHeader className="p-6 pb-4 ">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Add Contact
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 space-y-4 ">
            {/* Name Field */}
            <div >
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter party name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Roles Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Roles
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full min-h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent text-left bg-white flex items-center justify-between cursor-pointer"
                >
                  <div className="flex flex-wrap gap-2 items-center flex-1">
                    {formData.roles.length > 0 ? (
                      <>
                        {formData.roles.map((role) => (
                          <span
                            key={role}
                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border"
                          >
                            {role}
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRoleToggle(role)
                              }}
                              className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                              <X size={14} />
                            </span>
                          </span>
                        ))}
                        <span className="text-gray-400 text-sm">Select party roles</span>
                      </>
                    ) : (
                      <span className="text-gray-400">Select party roles</span>
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {roleOptions.map((role) => (
                      <label
                        key={role}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center mr-3">
                          {formData.roles.includes(role) ? (
                            <div className="h-4 w-4  text-gray-600 rounded flex items-center justify-center">
                             <CheckIcon className='font-bold' />
                            </div>
                          ) : (
                            <div className="h-4 w-4 border border-gray-300 rounded"></div>
                          )}
                        </div>
                        <span 
                          className="text-gray-700 cursor-pointer flex-1"
                          onClick={() => handleRoleToggle(role)}
                        >
                          {role}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone
              </label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Address
              </label>
              <Input
                type="text"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          <DialogFooter className="p-6 pt-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 border-gray-300 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-black hover:bg-gray-800 text-white px-6 cursor-pointer ml-3"
              disabled={!formData.name.trim()}
            >
              Add Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}