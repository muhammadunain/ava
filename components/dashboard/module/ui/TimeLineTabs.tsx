import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, ChevronDown, ChevronUp, Clock, AlertTriangle, User, FileText, DollarSign, Home } from 'lucide-react';

export const TimelineTab = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Inspection Period Deadline",
      dueDate: "2025-08-10",
      priority: "High",
      completed: false,
      description: "Property inspection period ends",
      assignedTo: "John Smith",
      category: "Inspection",
      estimatedHours: 4
    },
    {
      id: 2,
      title: "Buyer's Election Deadline",
      dueDate: "2025-08-15",
      priority: "Critical",
      completed: false,
      description: "Final decision on purchase terms",
      assignedTo: "Sarah Johnson",
      category: "Legal",
      estimatedHours: 2
    },
    {
      id: 3,
      title: "Closing Date",
      dueDate: "2025-08-25",
      priority: "Critical",
      completed: false,
      description: "Final transaction completion",
      assignedTo: "Michael Brown",
      category: "Financial",
      estimatedHours: 8
    },
    {
      id: 4,
      title: "Title Examination Deadline",
      dueDate: "2025-08-20",
      priority: "Medium",
      completed: false,
      description: "Title search and verification",
      assignedTo: "Emily Davis",
      category: "Legal",
      estimatedHours: 6
    },
    {
      id: 5,
      title: "Loan Application Submission",
      dueDate: "2025-08-05",
      priority: "High",
      completed: false,
      description: "Submit complete loan application package",
      assignedTo: "David Wilson",
      category: "Financial",
      estimatedHours: 3
    },
    {
      id: 6,
      title: "Property Appraisal",
      dueDate: "2025-08-12",
      priority: "Medium",
      completed: false,
      description: "Professional property valuation",
      assignedTo: "Lisa Anderson",
      category: "Appraisal",
      estimatedHours: 4
    },
    {
      id: 7,
      title: "Insurance Verification",
      dueDate: "2025-08-18",
      priority: "High",
      completed: false,
      description: "Confirm property insurance coverage",
      assignedTo: "Robert Taylor",
      category: "Insurance",
      estimatedHours: 2
    },
    {
      id: 8,
      title: "Final Walk-through",
      dueDate: "2025-08-24",
      priority: "Medium",
      completed: false,
      description: "Final property inspection before closing",
      assignedTo: "Jennifer Martinez",
      category: "Inspection",
      estimatedHours: 3
    }
  ]);

  const [showCompleted, setShowCompleted] = useState(false);

  const toggleTask = (taskId:any) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  const sortedPendingTasks = [...pendingTasks].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const getDaysUntil = (dueDate:any) => {
    const today = new Date() as any;
    const due = new Date(dueDate) as any;
    const diffTime = due - today as any;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority:any) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-blue-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-400';
    }
  };

  const getPriorityBadgeColor = (priority:any) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getUrgencyColor = (days:any) => {
    if (days < 0) return 'text-red-600 bg-red-50';
    if (days <= 3) return 'text-red-500 bg-red-50';
    if (days <= 7) return 'text-orange-500 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getCategoryIcon = (category:any) => {
    switch (category.toLowerCase()) {
      case 'legal': return <FileText className="w-4 h-4" />;
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'inspection': return <Home className="w-4 h-4" />;
      case 'appraisal': return <Home className="w-4 h-4" />;
      case 'insurance': return <FileText className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Transaction Timeline</h1>
        </div>
        <p className="text-gray-600 text-sm">Track all tasks and milestones for your real estate transaction</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending</p>
              <p className="text-xl font-semibold text-gray-900">{pendingTasks.length}</p>
            </div>
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed</p>
              <p className="text-xl font-semibold text-green-600">{completedTasks.length}</p>
            </div>
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Progress</p>
              <p className="text-xl font-semibold text-purple-600">
                {Math.round((completedTasks.length / tasks.length) * 100)}%
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-xs">
                {Math.round((completedTasks.length / tasks.length) * 100)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Hours</p>
              <p className="text-xl font-semibold text-indigo-600">
                {tasks.reduce((sum, task) => sum + task.estimatedHours, 0)}h
              </p>
            </div>
            <AlertTriangle className="w-6 h-6 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Pending Tasks Timeline */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Upcoming Deadlines
        </h2>
        
        <div className="space-y-3">
          {sortedPendingTasks.map((task, index) => {
            const daysUntil = getDaysUntil(task.dueDate);
            const isOverdue = daysUntil < 0;
            const isUrgent = daysUntil <= 3 && daysUntil >= 0;
            
            return (
              <div
                key={task.id}
                className={`bg-white rounded-lg border-l-4 ${getPriorityColor(task.priority)} 
                           border-r border-t border-b border-gray-200 hover:border-gray-300 
                           transition-all duration-200`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-1 hover:scale-105 transition-transform duration-150"
                    >
                      <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                    </button>
                    
                    {/* Task Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{task.title}</h3>
                          <p className="text-gray-600 text-sm">{task.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityBadgeColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      {/* Task Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(task.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{task.assignedTo}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {getCategoryIcon(task.category)}
                          <span>{task.category} • {task.estimatedHours}h</span>
                        </div>
                      </div>
                      
                      {/* Urgency Badge */}
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getUrgencyColor(daysUntil)}`}>
                        {(isOverdue || isUrgent) && <AlertTriangle className="w-3 h-3" />}
                        <span>
                          {isOverdue 
                            ? `${Math.abs(daysUntil)} days overdue`
                            : daysUntil === 0 
                            ? 'Due today'
                            : `${daysUntil} days remaining`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Tasks Accordion */}
      {completedTasks.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 
                       transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h2 className="text-base font-semibold text-gray-800">
                Completed Tasks ({completedTasks.length})
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                {showCompleted ? 'Hide' : 'Show'}
              </span>
              {showCompleted ? (
                <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              )}
            </div>
          </button>

          {/* Completed Tasks List */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showCompleted ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:bg-gray-100 
                           transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-1 hover:scale-105 transition-transform duration-150"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-medium text-gray-600 line-through">{task.title}</h3>
                          <p className="text-gray-500 text-xs mt-1">{task.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border opacity-60 ${getPriorityBadgeColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(task.category)}
                          <span>{task.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};