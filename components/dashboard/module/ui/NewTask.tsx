'use client'
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Mail, 
  Edit3, 
  Trash2, 
  MessageCircle, 
  Activity,
  ChevronRight,
  Plus,
  Upload,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import DocumentsInterface from './DocumentInterface';
import Link from 'next/link';
import Image from 'next/image';

interface Task {
  id: string;
  date: string;
  title: string;
  status: 'uploaded' | 'use forms' | 'upload' | 'completed' | 'pending';
  assignedTo?: string;
  dueDate?: string;
  type: 'addendum' | 'agreement' | 'receipt' | 'election' | 'hud';
  time?: string;
}

interface DateGroup {
  date: string;
  tasks: Task[];
  isExpanded: boolean;
}

const TaskManagementUI = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      date: 'Jan 15, 2025',
      title: 'Addendum',
      status: 'uploaded',
      type: 'addendum',
      time: '10:30 AM'
    },
    {
      id: '2',
      date: 'Jan 15, 2025',
      title: 'Property Inspection Report',
      status: 'completed',
      type: 'agreement',
      time: '02:15 PM'
    },
    {
      id: '3',
      date: 'Feb 22, 2025',
      title: 'Purchase Agreement',
      status: 'use forms',
      type: 'agreement',
      time: '09:00 AM'
    },
    {
      id: '4',
      date: 'Mar 18, 2025',
      title: 'Escrow Deposit Receipt',
      status: 'upload',
      type: 'receipt',
      time: '11:45 AM'
    },
    {
      id: '5',
      date: 'Apr 10, 2025',
      title: 'Buyer Election',
      status: 'use forms',
      type: 'election',
      time: '03:30 PM'
    },
    {
      id: '6',
      date: 'May 05, 2025',
      title: 'HUD Settlement Statement',
      status: 'pending',
      type: 'hud',
      time: '01:00 PM'
    },
    {
      id: '7',
      date: 'Jun 12, 2025',
      title: 'Title Insurance Policy',
      status: 'upload',
      type: 'agreement',
      time: '04:20 PM'
    },
    {
      id: '8',
      date: 'Jul 28, 2025',
      title: 'Final Walkthrough Report',
      status: 'completed',
      type: 'agreement',
      time: '10:00 AM'
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks[0]);
  const [showComments, setShowComments] = useState(false);
  const [collapsedDates, setCollapsedDates] = useState<Set<string>>(new Set());
  const [collapsedTasks, setCollapsedTasks] = useState<Set<string>>(new Set());
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    taskName: '',
    description: '',
    deadline: '',
    requireDocuments: false
  });

  // Group tasks by date
  const groupedTasks = tasks.reduce((groups: { [key: string]: Task[] }, task) => {
    const date = task.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {});

  const toggleTaskCollapse = (taskId: string) => {
    const newCollapsed = new Set(collapsedTasks);
    if (newCollapsed.has(taskId)) {
      newCollapsed.delete(taskId);
    } else {
      newCollapsed.add(taskId);
    }
    setCollapsedTasks(newCollapsed);
  };

  const toggleDateCollapse = (date: string) => {
    const newCollapsed = new Set(collapsedDates);
    if (newCollapsed.has(date)) {
      newCollapsed.delete(date);
    } else {
      newCollapsed.add(date);
    }
    setCollapsedDates(newCollapsed);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'use forms':
        return 'bg-purple-100 text-purple-800';
      case 'upload':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <FileText className="w-3 h-3" />;
      case 'completed':
        return <Activity className="w-3 h-3" />;
      case 'use forms':
        return <Edit3 className="w-3 h-3" />;
      case 'upload':
        return <Upload className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleSaveTask = () => {
    // Handle save logic here
    console.log('Task saved:', taskForm);
    setIsNewTaskOpen(false);
    setIsEditTaskOpen(false);
    // Reset form
    setTaskForm({
      taskName: '',
      description: '',
      deadline: '',
      requireDocuments: false
    });
  };

  const handleEditTask = () => {
    if (selectedTask) {
      setTaskForm({
        taskName: selectedTask.title,
        description: '',
        deadline: selectedTask.dueDate || '',
        requireDocuments: false
      });
      setIsEditTaskOpen(true);
    }
  };

  const TaskDialog = ({ isEdit = false }: { isEdit?: boolean }) => (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Edit Task' : 'New Task'}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="taskName">Task Name</Label>
          <Input
            id="taskName"
            value={taskForm.taskName}
            onChange={(e) => setTaskForm({ ...taskForm, taskName: e.target.value })}
            placeholder="Enter task name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            placeholder="Enter task description"
            rows={3}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={taskForm.deadline}
            onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="requireDocuments"
            checked={taskForm.requireDocuments}
            onCheckedChange={(checked) => 
              setTaskForm({ ...taskForm, requireDocuments: checked as boolean })
            }
          />
          <Label htmlFor="requireDocuments">Required documents to be attached</Label>
        </div>
        <Button onClick={handleSaveTask} className="w-full">
          Save
        </Button>
      </div>
    </DialogContent>
  );

  return (
    <div className="flex h-screen ">
      {/* Left Sidebar - Tasks List */}
      <div className="w-1/2 bg-white border-r border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <Badge variant="secondary" className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
              {tasks.length}
            </Badge>
          </div>
        </div>

        {/* Timeline Tasks List */}
        <DocumentsInterface/>
      </div>

      {/* Right Panel - Task Details */}
      <div className="flex-1 flex flex-col">
        {selectedTask ? (
          <>
            <div className='flex flex-row items-end justify-end gap-2 p-4'>
              <Button className='cursor-pointer' variant={'outline'}>Download All</Button>
              <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
                <DialogTrigger asChild>
                  <Button className='cursor-pointer'>New</Button>
                </DialogTrigger>
                <TaskDialog />
              </Dialog>
            </div>
            {/* Task Header */}
            <div className="p-6 rounded-lg border-b border-gray-200 bg-gray-50 ">
              <div className="flex items-start justify-between mb-4 ">
                <div>
                  <div className="flex items-center gap-2 mb-2 ">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h2>
                    <Badge className={`text-xs font-medium ${getStatusColor(selectedTask.status)} flex items-center gap-1`}>
                      {getStatusIcon(selectedTask.status)}
                      {selectedTask.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedTask.date}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {selectedTask.time}
                      </Badge>
                    </div>
                  </div>
               <div className="flex justify-between items-center w-full">
  <div className="text-sm text-gray-600">
    Assigned to: <span className="text-gray-900">Dylan Sanders</span>
  </div>
  <div className="text-sm text-gray-600 ml-32">
    Due: <span className="text-blue-600">Aug 27, 2025</span>
  </div>
</div>
                </div>
                <div className="flex gap-2">
                 
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit3 className="w-4 h-4 mr-2" />
                        E-Sign
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Unassign
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => deleteTask(selectedTask.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className='cursor-pointer' variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className='cursor-pointer' variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
               
                  <Button    onClick={handleEditTask} className='cursor-pointer' variant="outline" size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                
              </div>

              <div className="flex gap-2 mt-2">
                <Link href={'/pdfviewer'}>
                  <Button className='cursor-pointer' variant="outline" size="sm">
                    E-Sign
                  </Button>
                </Link>
                <Button className='cursor-pointer' variant="outline" size="sm">
                  Unassign
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => deleteTask(selectedTask.id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            {/* Comments & Activity Section */}
            <div className="border-b border-gray-200 bg-white">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => setShowComments(!showComments)}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">Comments & Activity</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
                    5
                  </Badge>
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${showComments ? 'rotate-90' : ''}`} />
              </button>
              
              {showComments && (
                <div className="px-4 pb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Comments and activity will appear here...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Document Preview/Form Area */}
            <div className="flex-1 p-6 bg-white ">
           <Image src={'/image.png'} width={500} height={500} alt='image' className='w-full'/>
            </div>

            {/* Edit Task Dialog */}
            <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
              <TaskDialog isEdit={true} />
            </Dialog>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Task</h3>
              <p className="text-gray-600">Choose a task from the timeline to view its details.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementUI;