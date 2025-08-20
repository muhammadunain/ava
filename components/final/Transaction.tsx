'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, FileText, Edit3, Trash2, MessageSquare, Clock, Users, FileCheck, StickyNote, History, PenTool, Mail, Phone, ListTodo, MessageCircle, Info, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import DeadlinesUI from '../DeadLinesUI';
import { PropertyDetailsSection } from '../PropertyDetails';
import DocumentList from '../DocumentsSection';
import FullScreenChatbot from '../chat/ChatModal';
import TaskDialogMain from '../dialog/TaskDialog';
import NotesApp from '../dialog/NoteDialog';
import TaskManagementUI from '../dashboard/module/ui/NewTask';
import CRMInterface from '../modules/form/FollowUp';
import ActivityFeed from '../modules/form/Activity';

const ProjectManagementUI = () => {
  const [activeTab, setActiveTab] = useState('Tasks');
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Submit Condominium Association Application',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    },
    {
      id: 2,
      title: 'Confirm Execution of Sales Contract',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    },
    {
      id: 3,
      title: 'Submit Initial Escrow Deposit',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    },
    {
      id: 4,
      title: 'Ensure Loan Application is Submitted',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    },
    {
      id: 5,
      title: 'Prepare and Submit Buyer\'s Election Notice',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    },
    {
      id: 6,
      title: 'Order Utility Estoppel/Payoff Statement',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    },
    {
      id: 7,
      title: 'Issue Owner\'s Title Policy and Record Deed',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    },
    {
      id: 8,
      title: 'Finalize Closing Documents',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: false
    }
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 9,
      title: 'Collect Lead-Based Paint Disclosure (if required)',
      dueDate: '4TH FLAGSHIP DR #501',
      completed: true
    }
  ]);

 const tabs = [
    { name: 'Tasks', icon: ListTodo },
    { name: 'Add to Calendar', icon: Calendar },
    { name: 'Follow up', icon: MessageCircle },
    { name: 'Details', icon: Info },
    { name: 'Documents', icon: FileText },
    { name: 'Activity', icon: StickyNote },
    { name: 'History', icon: History },
  ];
  const totalTasks = tasks.length + completedTasks.length;
  const completedCount = completedTasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const toggleTask = (taskId:any, isCompleted:any) => {
    if (isCompleted) {
      const task:any = completedTasks.find(t => t.id === taskId);
      setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
      setTasks([...tasks, { ...task, completed: false }]);
    } else {
      const task:any = tasks.find(t => t.id === taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
      setCompletedTasks([...completedTasks, { ...task, completed: true }]);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">410 FLAGSHIP DR #501</h1>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              OPEN
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">{progressPercentage}% to closing</div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded">
              <span className="text-sm text-gray-700">Active</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-300 px-6 bg-gray-100 rounded-md">
        <nav className="flex   items-center justify-between p-1  ">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`py-2  px-2 flex items-center gap-1 cursor-pointer justify-center  text-xs font-medium w-full ${
                activeTab === name
                  ? 'bg-white shadow-sm rounded-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      <div className="px-6 py-6">
        {activeTab === 'Tasks' && (
          // <>
          
          //   <div className="mb-8">
          //     <div className="flex items-center justify-between mb-4">
          //       <h2 className="text-lg font-medium text-gray-900 flex items-center">
          //         Tasks 
          //         <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          //           {tasks.length}
          //         </span>
          //       </h2>
          //       <TaskDialogMain/>
          //     </div>

          //     <div className="space-y-2">
          //       {tasks.map((task) => (
          //         <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
          //           <div className="flex items-center space-x-3">
          //             <input
          //               type="checkbox"
          //               checked={task.completed}
          //               onChange={() => toggleTask(task.id, false)}
          //               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          //             />
          //             <div>
          //               <div className="text-sm font-medium text-gray-900">{task.title}</div>
          //               <div className="text-xs text-gray-500">{task.dueDate}</div>
          //             </div>
          //           </div>
          //           <div className="flex items-center space-x-2">
          //             <button className="p-1 text-gray-400 hover:text-gray-600">
          //               <FileText className="w-4 h-4" />
          //             </button>
          //             <button className="p-1 text-gray-400 hover:text-gray-600">
          //               <Edit3 className="w-4 h-4" />
          //             </button>
          //             <button className="p-1 text-gray-400 hover:text-red-600">
          //               <Trash2 className="w-4 h-4" />
          //             </button>
          //           </div>
          //         </div>
          //       ))}
          //     </div>
          //   </div>

   
          //   <div>
          //     <div className="flex items-center justify-between mb-4">
          //       <button
          //         onClick={() => setIsCompletedCollapsed(!isCompletedCollapsed)}
          //         className="flex items-center text-lg font-medium text-gray-900 hover:text-gray-700"
          //       >
          //         {isCompletedCollapsed ? (
          //           <ChevronRight className="w-5 h-5 mr-1" />
          //         ) : (
          //           <ChevronDown className="w-5 h-5 mr-1" />
          //         )}
          //         Completed Tasks
          //         <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          //           {completedTasks.length}
          //         </span>
          //       </button>
          //     </div>

          //     {!isCompletedCollapsed && (
          //       <div className="space-y-2">{completedTasks.map((task) => (
          //         <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-100">
          //           <div className="flex items-center space-x-3">
          //             <input
          //               type="checkbox"
          //               checked={task.completed}
          //               onChange={() => toggleTask(task.id, true)}
          //               className="w-4 h-4 text-blue-600 border-gray-300 rounded "
          //             />
          //             <div>
          //               <div className="text-sm font-medium text-gray-900 line-through">{task.title}</div>
          //               <div className="text-xs text-gray-500">{task.dueDate}</div>
          //             </div>
          //           </div>
          //           <div className="flex items-center space-x-2">
          //             <button className="p-1 text-gray-400 hover:text-gray-600">
          //               <FileText className="w-4 h-4" />
          //             </button>
          //             <button className="p-1 text-gray-400 hover:text-gray-600">
          //               <Edit3 className="w-4 h-4" />
          //             </button>
          //             <button className="p-1 text-gray-400 hover:text-red-600">
          //               <Trash2 className="w-4 h-4" />
          //             </button>
          //           </div>
          //         </div>
          //       ))}
          //       </div>
          //     )}
          //   </div>
          // </>
                <TaskManagementUI/>

        )}

        {activeTab === 'Add to Calendar' && (
          <DeadlinesUI/>
          
        )}

        {activeTab === 'Follow up' && (
         <CRMInterface/>
        )}

        {activeTab === 'Details' && (
          <PropertyDetailsSection/>
        )}

        {activeTab === 'Documents' && (
         <DocumentList/>
        )}

        {activeTab === 'Activity' && (
          <ActivityFeed/>
        )}

        {activeTab === 'History' && (
          <div className="text-center py-12">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">History</h3>
            <p className="text-gray-600">View project activity and changes</p>
          </div>
        )}
      </div>

      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-6 right-6">
       <FullScreenChatbot/>
      </div>
    </div>
  );
};

export default ProjectManagementUI;