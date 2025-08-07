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
  Upload
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
  status: 'uploaded' | 'use forms' | 'upload';
  assignedTo?: string;
  dueDate?: string;
  type: 'addendum' | 'agreement' | 'receipt' | 'election' | 'hud';
}

const TaskManagementUI = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      date: 'AUG 04',
      title: 'Addendum',
      status: 'uploaded',
      type: 'addendum'
    },
    {
      id: '2',
      date: '',
      title: 'Buyer Broker Agreement',
      status: 'use forms',
      type: 'agreement'
    },
    {
      id: '3',
      date: 'AUG 06',
      title: 'Purchase agreement',
      status: 'use forms',
      type: 'agreement'
    },
    {
      id: '4',
      date: 'AUG 08',
      title: 'Escrow deposit receipt',
      status: 'upload',
      type: 'receipt'
    },
    {
      id: '5',
      date: '',
      title: 'Buyer Election',
      status: 'use forms',
      type: 'election'
    },
    {
      id: '6',
      date: '',
      title: 'HUD',
      status: 'upload',
      type: 'hud'
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks[0]);
  const [showComments, setShowComments] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'text-blue-600';
      case 'use forms':
        return 'text-gray-600';
      case 'upload':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
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
            <h1 className="text-lg font-semibold">Tasks</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
              6
            </Badge>
          </div>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>

        {/* Tasks List */}
        <div className="overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedTask?.id === task.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
              }`}
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 font-medium min-w-[50px]">
                    {task.date}
                  </span>
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{task.title}</span>
                </div>
                <span className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
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
                  </div>
                  <div className="text-sm text-gray-600">
                    Assigned to: <span className="font-medium">Dylan Sanders</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Due: <span className="font-medium text-blue-600">Aug 27, 2026</span>
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
                      Edit / eSign
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
                  Edit / eSign
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
                  {selectedTask.status === 'uploaded' ? (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Document Uploaded</h3>
                      <p className="text-gray-600">
                        The {selectedTask.title} document has been uploaded and is ready for review.
                      </p>
                      <Button className="mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        Download Document
                      </Button>
                    </div>
                  ) : selectedTask.status === 'upload' ? (
                    <div className="text-center py-12">
                      <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Required</h3>
                      <p className="text-gray-600 mb-4">
                        Please upload the {selectedTask.title} document to proceed.
                      </p>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
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
              <p className="text-gray-600">Choose a task from the list to view its details.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementUI;