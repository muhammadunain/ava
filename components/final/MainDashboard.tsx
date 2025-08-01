"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Clock, CheckCircle2, ChevronDown, Filter } from 'lucide-react';
import DashboardStats from '../DashboardStacs';

interface Task {
  id: string;
  title: string;
  address: string;
  date: string;
  label: string;
  labelColor: 'blue' | 'red' | 'gray' | 'orange';
  completed: boolean;
}

interface Deadline {
  id: string;
  title: string;
  address: string;
  date: string;
  label: string;
  labelColor: 'red' | 'orange';
  completed: boolean;
}

interface Closing {
  id: string;
  address: string;
  label: string;
  labelColor: 'red' | 'orange';
  progress: number;
  status: string;
  deadline: string;
}

export default function MainDashboard() {
  function getBadgeStyle(color: string) {
  switch (color) {
    case "red":
      return "bg-red-100 text-red-500";
    case "yellow":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Ensure Loan Application is...',
      address: '410 FLAGSHIP DR #501',
      date: 'Today',
      label: 'Loan Application Deadline',
      labelColor: 'blue',
      completed: false
    },
    {
      id: '2',
      title: 'Coordinate Home Inspection',
      address: '410 FLAGSHIP DR #501',
      date: 'Today',
      label: 'Additional Deposit Deadline',
      labelColor: 'blue',
      completed: false
    },
    {
      id: '3',
      title: 'Prepare and Submit Buyer\'s Election...',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: 'Inspection Period End Date',
      labelColor: 'gray',
      completed: false
    },
    {
      id: '4',
      title: 'Obtain Flood Insurance Disclosure',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: 'Additional Deposit Deadline',
      labelColor: 'gray',
      completed: false
    },
    {
      id: '5',
      title: 'Prepare Bill of Sale',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: 'Additional Deposit Deadline',
      labelColor: 'gray',
      completed: false
    }
  ]);

  const [deadlines] = useState<Deadline[]>([
    {
      id: '1',
      title: 'Additional Deposit Due Date',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: '2d',
      labelColor: 'red',
      completed: false
    },
    {
      id: '2',
      title: 'Inspection Period End Date',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: '2d',
      labelColor: 'red',
      completed: false
    },
    {
      id: '3',
      title: 'Buyer\'s Election Deadline',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: '2d',
      labelColor: 'red',
      completed: false
    },
    {
      id: '4',
      title: 'Seller\'s Response Deadline',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: '6d',
      labelColor: 'orange',
      completed: false
    },
    {
      id: '5',
      title: 'Financing Contingency Deadline',
      address: '410 FLAGSHIP DR #501',
      date: '08/10/2025',
      label: '6d',
      labelColor: 'orange',
      completed: false
    }
  ]);

  const [closings] = useState<Closing[]>([
    {
      id: '1',
      address: '410 FLAGSHIP DR #501',
      label: '2d',
      labelColor: 'red',
      progress: 58,
      status: '58% to closing',
      deadline: 'Loan Application Deadline'
    },
    {
      id: '2',
      address: '85 RIVERSIDE AVE #302',
      label: '5d',
      labelColor: 'orange',
      progress: 13,
      status: '13% to closing',
      deadline: 'Loan Application Deadline'
    }
  ]);

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getBadgeVariant = (color: string) => {
    switch (color) {
      case 'red': 
        return 'bg-red-50 text-red-600 border-red-200';
      case 'blue': 
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'orange': 
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'gray':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      default: 
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className=" mx-auto">
        {/* Header */}
       <DashboardStats/>

        {/* Stats Cards */}
    

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* My Tasks */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                  My Tasks
                </CardTitle>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 h-10">
                  <TabsTrigger value="upcoming" className="text-sm">Upcoming</TabsTrigger>
                  <TabsTrigger value="overdue" className="text-sm">Overdue</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h4>
                          <span className="text-xs text-blue-600 font-medium ml-4 flex-shrink-0">
                            {task.date}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{task.address}</p>
                        <Badge variant="outline" className={`text-xs ${getBadgeVariant(task.labelColor)}`}>
                          {task.label}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="overdue">
                  <div className="text-center py-8 text-gray-500">
                    No overdue tasks
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* My Deadlines */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  My Deadlines
                </CardTitle>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 h-10">
                  <TabsTrigger value="upcoming" className="text-sm">Upcoming</TabsTrigger>
                  <TabsTrigger value="overdue" className="text-sm relative">
                    Overdue
                    <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-red-500 text-white hover:bg-red-500 flex items-center justify-center rounded-full">
                      18
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4">
                  {deadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                      <Checkbox className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">{deadline.title}</h4>
                          <span className="text-xs text-gray-500 ml-4 flex-shrink-0">{deadline.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{deadline.address}</p>
                        <Badge variant="outline" className={`text-xs ${getBadgeVariant(deadline.labelColor)}`}>
                          {deadline.label}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="overdue">
                  <div className="text-center py-8 text-gray-500">
                    18 overdue items
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Closings */}
  <div className="bg-white border border-gray-200 shadow-sm">
  <CardHeader className="pb-2">
    <div className="flex items-center justify-between">
      <CardTitle className="text-base font-semibold flex items-center">
        <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2" />
        Upcoming Closings
      </CardTitle>
      <Filter className="h-4 w-4 text-blue-600" />
    </div>
  </CardHeader>

  <CardContent className="pt-0">
    <div className="space-y-3">
      {closings.map((closing) => (
        <div
          key={closing.id}
          className="rounded-md px-4 py-3 bg-white border border-gray-100 shadow-sm"
        >
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {closing.address}
          </h4>

          {/* Deadline + Days badge */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs text-gray-500">
              Loan Application Deadline
            </span>
            <span
              className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${getBadgeStyle(
                closing.labelColor
              )}`}
            >
              {closing.label}
            </span>
          </div>

          {/* Progress + Percent + Today - ALL IN ONE ROW */}
          <div className="flex items-center space-x-3">
            {/* Progress bar and percent */}
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 bg-blue-600 rounded-full"
                  style={{ width: `${closing.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                {closing.progress}% to closing
              </p>
            </div>

            {/* Today aligned at the right end */}
            <span className="text-xs text-blue-600 font-medium whitespace-nowrap">
              Today
            </span>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</div>





      </div>
    </div>
  );
}