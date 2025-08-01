'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  AlertCircle,
  Calendar,
  FileText,
  Plus,
  X,
  Clock
} from 'lucide-react'

interface Task {
  id: number
  title: string
  dueDate: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category: string
  description?: string
}

interface TaskFormData {
  name: string
  description: string
  deadline: string
  documentRequest: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
}

interface FormErrors {
  name?: string
  dueDate?: string
}

interface AddTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (task: Task) => void
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ isOpen, onClose, onAddTask }) => {
  const [taskData, setTaskData] = useState<TaskFormData>({
    name: '',
    description: '',
    deadline: '',
    documentRequest: '',
    dueDate: '',
    priority: 'medium'
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = (field: keyof TaskFormData, value: string) => {
    setTaskData(prev => ({ ...prev, [field]: value }))
    // @ts-ignore
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!taskData.name.trim()) newErrors.name = 'Task name is required'
    if (!taskData.dueDate) newErrors.dueDate = 'Due date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const newTask: Task = {
      id: Date.now(),
      title: taskData.name,
      dueDate: taskData.dueDate,
      completed: false,
      priority: taskData.priority,
      category: 'custom',
      description: taskData.description
    }

    onAddTask(newTask)
    setTaskData({
      name: '',
      description: '',
      deadline: '',
      documentRequest: '',
      dueDate: '',
      priority: 'medium'
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 bg-white">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg">
                <Plus className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-black">Add New Task</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Create a new task for this transaction
                </DialogDescription>
              </div>
            </div>
          
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Task Name*</label>
            <Input
              placeholder="Task name"
              value={taskData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-red-500 bg-red-50' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={taskData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              rows={3}
              placeholder="Task description"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-black resize-none"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium text-gray-700">Deadline</label>
            <div className="relative">
              <select
                value={taskData.deadline}
                onChange={e => handleInputChange('deadline', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select a deadline</option>
                <option value="contract-signing">Contract Signing</option>
                <option value="inspection">Inspection Period</option>
                <option value="appraisal">Appraisal</option>
                <option value="financing">Financing Contingency</option>
                <option value="closing">Closing Date</option>
              </select>
            </div>
          </div>

          {/* Document Request */}
          <div>
            <label className="text-sm font-medium text-gray-700">Document Request</label>
            <div className="relative">
              <select
                value={taskData.documentRequest}
                onChange={e => handleInputChange('documentRequest', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select a document</option>
                <option value="sales-contract">Sales Contract</option>
                <option value="property-disclosure">Property Disclosure</option>
                <option value="title-report">Title Report</option>
                <option value="inspection-report">Inspection Report</option>
                <option value="appraisal-report">Appraisal Report</option>
                <option value="loan-documents">Loan Documents</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">Due Date*</label>
            <div className="relative">
              <Input
                type="date"
                value={taskData.dueDate}
                onChange={e => handleInputChange('dueDate', e.target.value)}
                className={errors.dueDate ? 'border-red-500 bg-red-50' : ''}
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.dueDate && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.dueDate}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select
              value={taskData.priority}
              onChange={e =>
                handleInputChange('priority', e.target.value as 'high' | 'medium' | 'low')
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-black text-white hover:bg-gray-900 px-6 py-2 rounded-lg font-medium shadow transition-all duration-200"
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskDialog
