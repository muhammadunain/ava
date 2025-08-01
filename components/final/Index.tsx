'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Edit, 
  Trash2, 
  Plus, 
  ChevronDown, 
  ChevronRight,
  PenTool,
  Mail,
  MessageSquare,
  Phone,
  CheckSquare,
  Clock,
  RotateCcw,
  Info,
  FileText,
  StickyNote,
  History
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [isCompletedTasksOpen, setIsCompletedTasksOpen] = useState(false);
  const [isCompletedDeadlinesOpen, setIsCompletedDeadlinesOpen] = useState(false);

  const [activeTasks, setActiveTasks] = useState([
    { id: 1, title: "Submit Condominium Association Application", subtitle: "410 FLAGSHIP DR #501", completed: false },
    { id: 2, title: "Confirm Execution of Sales Contract", subtitle: "410 FLAGSHIP DR #501", completed: false },
    { id: 3, title: "Submit Initial Escrow Deposit", subtitle: "410 FLAGSHIP DR #501", completed: false },
    { id: 4, title: "Ensure Loan Application is Submitted", subtitle: "410 FLAGSHIP DR #501", completed: false },
    { id: 5, title: "Prepare and Submit Buyer's Election Notice", subtitle: "410 FLAGSHIP DR #501", completed: false },
    { id: 6, title: "Order Utility Estoppel/Payoff Statement", subtitle: "410 FLAGSHIP DR #501", completed: false },
    { id: 7, title: "Issue Owner's Title Policy and Record Deed", subtitle: "410 FLAGSHIP DR #501", completed: false },
    { id: 8, title: "Finalize Closing Documents", subtitle: "410 FLAGSHIP DR #501", completed: false }
  ]);

  const [completedTasksList, setCompletedTasksList] = useState([
    { id: 9, title: "Collect Lead-Based Paint Disclosure (if required)", subtitle: "410 FLAGSHIP DR #501", completed: true }
  ]);

  const [activeDeadlines, setActiveDeadlines] = useState([
    { id: 1, title: "Association Application Deadline", date: "Saturday July 26, 2025", completed: false },
    { id: 2, title: "Effective Date", date: "Saturday July 26, 2025", completed: false },
    { id: 3, title: "Initial Deposit Due Date", date: "Tuesday July 29, 2025", completed: false },
    { id: 4, title: "Loan Application Deadline", date: "Thursday July 31, 2025", completed: false },
    { id: 5, title: "Additional Deposit Due Date", date: "Sunday August 10, 2025", completed: false },
    { id: 6, title: "Inspection Period End Date", date: "Friday August 15, 2025", completed: false },
    { id: 7, title: "Buyer's Election Deadline", date: "Wednesday August 20, 2025", completed: false },
    { id: 8, title: "Closing Date", date: "Friday August 22, 2025", completed: false }
  ]);

  const [completedDeadlinesList, setCompletedDeadlinesList] = useState([
    { id: 9, title: "Association Application Deadline", date: "Saturday July 26, 2025", completed: true },
    { id: 10, title: "Effective Date", date: "Saturday July 26, 2025", completed: true }
  ]);

  const tabs = [
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "followup", label: "Follow up", icon: RotateCcw },
    { id: "details", label: "Details", icon: Info },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "history", label: "History", icon: History }
  ];

  // Calculate progress based on completed tasks and deadlines
  const totalItems = activeTasks.length + completedTasksList.length + activeDeadlines.length + completedDeadlinesList.length;
  const completedItems = completedTasksList.length + completedDeadlinesList.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleTaskToggle = (taskId: number) => {
    // Find task in active tasks
    const activeTask = activeTasks.find(t => t.id === taskId);
    if (activeTask) {
      // Move from active to completed
      setActiveTasks(activeTasks.filter(t => t.id !== taskId));
      setCompletedTasksList([...completedTasksList, { ...activeTask, completed: true }]);
      return;
    }

    // Find task in completed tasks
    const completedTask = completedTasksList.find(t => t.id === taskId);
    if (completedTask) {
      // Move from completed to active
      setCompletedTasksList(completedTasksList.filter(t => t.id !== taskId));
      setActiveTasks([...activeTasks, { ...completedTask, completed: false }]);
    }
  };

  const handleDeadlineToggle = (deadlineId: number) => {
    // Find deadline in active deadlines
    const activeDeadline = activeDeadlines.find(d => d.id === deadlineId);
    if (activeDeadline) {
      // Move from active to completed
      setActiveDeadlines(activeDeadlines.filter(d => d.id !== deadlineId));
      setCompletedDeadlinesList([...completedDeadlinesList, { ...activeDeadline, completed: true }]);
      return;
    }

    // Find deadline in completed deadlines
    const completedDeadline = completedDeadlinesList.find(d => d.id === deadlineId);
    if (completedDeadline) {
      // Move from completed to active
      setCompletedDeadlinesList(completedDeadlinesList.filter(d => d.id !== deadlineId));
      setActiveDeadlines([...activeDeadlines, { ...completedDeadline, completed: false }]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-medium text-gray-900">410 FLAGSHIP DR #501</h1>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs px-2 py-1">
              BOTH
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{progress}% to closing</span>
              <Progress value={progress} className="w-24" />
            </div>
            <Badge variant="outline" className="text-xs px-3 py-1">
              Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-gray-50">
        <div className="flex px-6">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeTab === "tasks" && (
          <div>
            {/* Tasks Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Tasks</h3>
                <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">{activeTasks.length}</span>
              </div>
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>

            {/* Tasks List */}
            <div>
              {activeTasks.map((task) => (
                <div key={task.id} className="flex border items-center gap-3 px-6 py-3 hover:bg-gray-50 group">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                    <p className="text-xs text-gray-500">{task.subtitle}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Completed Tasks */}
            <div className="border-t">
              <button
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                onClick={() => setIsCompletedTasksOpen(!isCompletedTasksOpen)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Completed Tasks</h3>
                  <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">{completedTasksList.length}</span>
                </div>
                {isCompletedTasksOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              
              {isCompletedTasksOpen && (
                <div>
                  {completedTasksList.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 group">
                      <div 
                        className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center cursor-pointer"
                        onClick={() => handleTaskToggle(task.id)}
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-500 line-through">{task.title}</h4>
                        <p className="text-xs text-gray-400">{task.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "deadlines" && (
          <div>
            {/* Deadlines Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Deadlines</h3>
                <span className="bg-orange-500 text-white rounded-full px-2 py-0.5 text-xs">{activeDeadlines.length}</span>
              </div>
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>

            {/* Deadlines List */}
            <div>
              {activeDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 group">
                  <Checkbox 
                    checked={deadline.completed}
                    onCheckedChange={() => handleDeadlineToggle(deadline.id)}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{deadline.title}</h4>
                    <p className="text-xs text-gray-500">{deadline.date}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Completed Deadlines */}
            <div className="border-t">
              <button
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                onClick={() => setIsCompletedDeadlinesOpen(!isCompletedDeadlinesOpen)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Completed Deadlines</h3>
                  <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">{completedDeadlinesList.length}</span>
                </div>
                {isCompletedDeadlinesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              
              {isCompletedDeadlinesOpen && (
                <div>
                  {completedDeadlinesList.map((deadline) => (
                    <div key={deadline.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 group">
                      <div 
                        className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center cursor-pointer"
                        onClick={() => handleDeadlineToggle(deadline.id)}
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-500 line-through">{deadline.title}</h4>
                        <p className="text-xs text-gray-400">{deadline.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "followup" && (
          <div className="p-6">
            {/* Action Buttons */}
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                Create Note
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Text
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-blue-600">
                <Phone className="h-4 w-4" />
                Log Call
              </Button>
              <Button size="sm" className="ml-auto">
                How it works
              </Button>
            </div>

            {/* Text Area */}
            <Textarea 
              placeholder="Add call notes..." 
              className="mb-4 min-h-[100px] resize-none"
            />

            {/* Call Options */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm">No Answer</span>
              <span className="text-sm">Left Voicemail</span>
              <span className="text-sm">Bad Number</span>
            </div>

            {/* Phone Input */}
            <div className="flex gap-2 mb-6">
              <Input 
                value="(500) 535-1063 (mobile)" 
                className="flex-1"
                readOnly
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Log Call
              </Button>
            </div>

            {/* Filter Options */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>All</span>
              <span className="flex items-center gap-1">
                <span>0</span>
                <span>📧</span>
              </span>
              <span className="flex items-center gap-1">
                <span>2</span>
                <span>📞</span>
              </span>
              <span>1</span>
            </div>

            {/* Communication Log */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                  JS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Jane Sema</span>
                    <span className="text-xs text-gray-500">Evelyn Alvatt</span>
                    <span className="text-xs text-gray-500 ml-auto">20 days ago</span>
                  </div>
                  <p className="text-sm text-gray-700">Hi Evelyn, just checking in to see what's new. Give a shout if you want to look at any homes this weekend!</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                  JS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Jane Sema</span>
                    <span className="text-xs text-gray-500">Evelyn Alvatt</span>
                    <span className="text-xs text-gray-500 ml-auto">20 days ago</span>
                  </div>
                  <p className="text-sm text-gray-700">Looking forward to connecting!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty states for other tabs */}
        {!["tasks", "deadlines", "followup"].includes(activeTab) && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              <p className="text-gray-500">Content for this tab will be added soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;