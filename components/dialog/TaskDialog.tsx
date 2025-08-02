'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Plus } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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
];

export default function TaskDialogMain() {
  const [open, setOpen] = React.useState(false);
  const [selectedDeadline, setSelectedDeadline] = React.useState('');
  const [selectedDocument, setSelectedDocument] = React.useState('');
  const [dueDate, setDueDate] = React.useState<Date | undefined>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>New</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="taskName">Name*</Label>
            <Input id="taskName" placeholder="Enter name of the task" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Enter description of the task" />
          </div>

          <div className="space-y-1 ">
            <Label>Deadline</Label>
            <Select  onValueChange={setSelectedDeadline}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Select a deadline the task is tied to" />
              </SelectTrigger>
              <SelectContent>
                {DEADLINE_OPTIONS.map((d, i) => (
                  <SelectItem key={i} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Document Request</Label>
            <Select onValueChange={setSelectedDocument}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Select a related document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doc1">Document A</SelectItem>
                <SelectItem value="doc2">Document B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !dueDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, 'PPP') : 'Pick a due date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Reminders</Label>
            <Button variant="outline" className="text-sm cursor-pointer text-green-600 border-green-600 hover:bg-green-50">
              + Add Reminder
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" className='cursor-pointer' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
            className='cursor-pointer'
              onClick={() => {
                // You can add form validation and saving logic here
                setOpen(false);
              }}
            >
              Add Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
