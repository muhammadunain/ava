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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Tasks List */}
      <div className="w-1/2 bg-white border-r border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Tasks Timeline</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
              {tasks.length}
            </Badge>
          </div>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
            <Plus className="w-4 h-4 mr-1" />
            New Task
          </Button>
        </div>

        {/* Timeline Tasks List */}
        <div className="overflow-y-auto">
          {Object.entries(groupedTasks).map(([date, dateTasks], dateIndex) => (
            <div key={date} className="relative">
              {/* Date Header */}
              <div 
                className="sticky top-0 bg-white border-b border-gray-100 p-3 cursor-pointer hover:bg-gray-50 transition-colors z-10"
                onClick={() => toggleDateCollapse(date)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <Badge variant="outline" className="font-medium text-gray-700">
                        {date}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                      {dateTasks.length} task{dateTasks.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  {collapsedDates.has(date) ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Tasks for this date */}
              {!collapsedDates.has(date) && (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {dateTasks.map((task, taskIndex) => (
                    <div key={task.id} className="relative">
                      {/* Main Task Row */}
                      <div
                        className={`relative pl-4 pr-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                          selectedTask?.id === task.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
                        }`}
                        onClick={() => {
                          setSelectedTask(task);
                          toggleTaskCollapse(task.id);
                        }}
                      >
                        {/* Timeline dot */}
                        <div className={`absolute left-6 top-5 w-3 h-3 rounded-full border-2 bg-white z-10 ${
                          selectedTask?.id === task.id ? 'border-blue-500' : 'border-gray-300'
                        }`}>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <div className="flex-1 flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{task.title}</div>
                                <div className="text-xs text-gray-500 mt-1">{task.time}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs font-medium ${getStatusColor(task.status)} flex items-center gap-1`}>
                                  {getStatusIcon(task.status)}
                                  {task.status}
                                </Badge>
                                {collapsedTasks.has(task.id) ? (
                                  <ChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Collapsible Task Details */}
                      {!collapsedTasks.has(task.id) && (
                        <div className="pl-16 pr-4 pb-3 bg-gray-50 border-b border-gray-100">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-4 text-gray-600">
                              <span>Type: <span className="font-medium text-gray-800">{task.type}</span></span>
                              <span>Assigned: <span className="font-medium text-gray-800">Dylan Sanders</span></span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                              <span>Due: <span className="font-medium text-blue-600">Sep 15, 2025</span></span>
                              <span>Priority: <span className="font-medium text-orange-600">High</span></span>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline" className="text-xs">
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs">
                                <Edit3 className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs">
                                <Mail className="w-3 h-3 mr-1" />
                                Send
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Task Details */}
      <div className="flex-1 flex flex-col">
        {selectedTask ? (
          <>
            {/* Task Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
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
                  <div className="text-sm text-gray-600 mt-2">
                    Assigned to: <span className="font-medium">Dylan Sanders</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Due: <span className="font-medium text-blue-600">Sep 15, 2025</span>
                  </div>
                </div>
                <DropdownMenu>
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
                </DropdownMenu>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>

              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  E-Sign
                </Button>
                <Button variant="outline" size="sm">
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
            <div className="flex-1 p-6 bg-white overflow-auto">
              <Card>
                <CardContent className="p-6">
                  {selectedTask.status === 'uploaded' || selectedTask.status === 'completed' ? (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Document {selectedTask.status === 'completed' ? 'Completed' : 'Uploaded'}</h3>
                      <p className="text-gray-600">
                        The {selectedTask.title} document has been {selectedTask.status === 'completed' ? 'completed and processed' : 'uploaded and is ready for review'}.
                      </p>
                      <Button className="mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        Download Document
                      </Button>
                    </div>
                  ) : selectedTask.status === 'upload' || selectedTask.status === 'pending' ? (
                    <div className="text-center py-12">
                      <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {selectedTask.status === 'pending' ? 'Action Pending' : 'Upload Required'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {selectedTask.status === 'pending' 
                          ? `The ${selectedTask.title} is pending review and approval.`
                          : `Please upload the ${selectedTask.title} document to proceed.`
                        }
                      </p>
                      {selectedTask.status === 'upload' && (
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Document
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Form Available</h3>
                        <p className="text-gray-600 mb-4">
                          Use the digital form for {selectedTask.title} to streamline the process.
                        </p>
                        <Button>
                          Use Digital Form
                        </Button>
                      </div>
                      
                      {/* Sample Form Fields */}
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buyer's Signature
                          </label>
                          <div className="border border-gray-300 rounded-md h-20 bg-gray-50"></div>
                          <p className="text-xs text-gray-500 mt-1">Date: _______</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Seller's Signature
                          </label>
                          <div className="border border-gray-300 rounded-md h-20 bg-gray-50"></div>
                          <p className="text-xs text-gray-500 mt-1">Date: _______</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buyer's Printed Name
                          </label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Seller's Printed Name
                          </label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Address
                          </label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter property address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Purchase Price
                          </label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="$0.00"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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