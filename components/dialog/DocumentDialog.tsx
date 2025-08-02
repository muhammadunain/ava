'use client'

import React, { useState } from 'react'
import { X, Calendar, Upload, Plus, Bell, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

const DEADLINE_OPTIONS = [
  'Closing Date',
  'Title Examination Deadline',
  'Review Test',
  'Financing Contingency Deadline',
  'Effective Date',
  'Initial Deposit Due Date',
  'Loan Application Deadline',
  'Additional Deposit Due Date',
  'Inspection Period Deadline',
  "Buyer's Election Deadline"
]

interface Reminder {
  id: string
  date: string
  time: string
}

export default function AddDocumentForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    deadline: '',
    description: ''
  })
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [showReminderForm, setShowReminderForm] = useState(false)
  const [newReminder, setNewReminder] = useState({ date: '', time: '8:00 AM' })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddReminder = () => {
    if (newReminder.date.trim()) {
      setReminders(prev => [
        ...prev,
        { 
          id: Date.now().toString(), 
          date: newReminder.date,
          time: newReminder.time
        }
      ])
      setNewReminder({ date: '', time: '8:00 AM' })
      setShowReminderForm(false) // Hide form after adding
    }
  }

  const handleShowReminderForm = () => {
    setShowReminderForm(true)
  }

  const handleCancelReminder = () => {
    setShowReminderForm(false)
    setNewReminder({ date: '', time: '8:00 AM' })
  }

  const handleRemoveReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleSave = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      return // Just return without alert
    }
    
    const documentData = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      dueDate: formData.dueDate,
      deadline: formData.deadline,
      description: formData.description.trim(),
      reminders: reminders,
      uploadedFile: uploadedFile,
      createdAt: new Date().toISOString()
    }
    
    console.log('Saving document:', documentData)
    
    // Here you would typically:
    // 1. Send to API
    // 2. Update global state/context
    // 3. Show success toast notification
    
    // Reset form and close dialog
    handleCancel()
  }

  const handleCancel = () => {
    // Reset all form data
    setFormData({ name: '', dueDate: '', deadline: '', description: '' })
    setReminders([])
    setShowReminderForm(false)
    setNewReminder({ date: '', time: '8:00 AM' })
    setUploadedFile(null)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-gray-800 text-white cursor-pointer">
          <Plus className=" h-4 w-4" />
         New
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Document to Checklist
          </DialogTitle>
        </DialogHeader>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-900">
              Name*
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full"
              placeholder=""
            />
          </div>

          {/* Due Date Field */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-sm font-medium text-gray-900">
              Due Date
            </Label>
            <div className="relative">
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="w-full pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Deadline Field */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-sm font-medium text-gray-900">
              Deadline
            </Label>
            <Select onValueChange={(value) => handleInputChange('deadline', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select deadline" />
              </SelectTrigger>
              <SelectContent>
                {DEADLINE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-900">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description of the document"
              className="w-full h-24 resize-none"
            />
          </div>

          {/* Upload File Section */}
          <div className="space-y-2">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors rounded-lg p-4"
              >
                <Upload className="text-gray-400" size={32} />
                <div className="text-sm font-medium text-gray-900">
                  Upload File
                </div>
                <div className="text-xs text-gray-500">
                  Attach a file to the document request
                </div>
              </label>
              {uploadedFile && (
                <div className="mt-2 text-sm text-green-600">
                  Uploaded: {uploadedFile.name}
                </div>
              )}
            </div>
          </div>

          {/* Reminders Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-900">
                Reminders
              </Label>
              {!showReminderForm && (
                <Button
                  onClick={handleShowReminderForm}
                  size="sm"
                  className="h-8 px-3 text-xs bg-black hover:bg-gray-800 text-white cursor-pointer border border-black rounded-md"
                >
                  <Plus size={14} className="mr-1" />
                  Add Reminder
                </Button>
              )}
            </div>
            
            {/* Add New Reminder Form - Shows only when clicked */}
            {showReminderForm && (
              <div className="space-y-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <Bell className="text-gray-400" size={16} />
                  <Input
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                    className="text-sm h-8 flex-1"
                    placeholder="08/02/2025"
                  />
                  <span className="text-sm text-gray-500">at</span>
                  <Select 
                    value={newReminder.time} 
                    onValueChange={(value) => setNewReminder(prev => ({ ...prev, time: value }))}
                  >
                    <SelectTrigger className="w-28 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i === 0 ? 12 : i > 12 ? i - 12 : i
                        const period = i < 12 ? 'AM' : 'PM'
                        const time = `${hour}:00 ${period}`
                        return (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={handleCancelReminder}
                    className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={handleCancelReminder}
                    variant="ghost"
                    size="sm"
                    className="h-7 px-3 text-xs text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddReminder}
                    size="sm"
                    className="h-7 px-3 text-xs bg-black hover:bg-gray-800 text-white cursor-pointer"
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            
            {/* Existing Reminders List */}
            {reminders.length > 0 && (
              <div className="space-y-2">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="text-gray-400" size={16} />
                      <span className="text-sm font-medium">
                        {new Date(reminder.date).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-sm text-gray-500">at</span>
                      <span className="text-sm font-medium">{reminder.time}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveReminder(reminder.id)}
                      className="text-red-400 hover:text-red-600 cursor-pointer p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-black hover:bg-gray-800 text-white px-6 cursor-pointer"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}