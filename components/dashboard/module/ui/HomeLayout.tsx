'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Star, 
  TrendingUp,
  AlertCircle,
  FileText,
  DollarSign,
  Users,
  BarChart3,
  Home,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Loader2Icon,
  Loader
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  deadline: string;
  type: 'loan' | 'deposit' | 'inspection';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface ClosingItem {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  deadline: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: 'Ensure Loan Application is Complete',
      subtitle: '410 FLAGSHIP DR #501',
      deadline: 'Today',
      type: 'loan',
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Ensure Loan Application is Processed',
      subtitle: '410 FLAGSHIP DR #501',
      deadline: 'Today',
      type: 'deposit',
      completed: false,
      priority: 'high'
    },
    {
      id: '3',
      title: 'Ensure Loan Application is Reviewed',
      subtitle: '410 FLAGSHIP DR #501',
      deadline: '08/10/2025',
      type: 'inspection',
      completed: false,
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Ensure Loan Application is Verified',
      subtitle: '410 FLAGSHIP DR #501',
      deadline: '08/10/2025',
      type: 'deposit',
      completed: false,
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Ensure Loan Application is Finalized',
      subtitle: '410 FLAGSHIP DR #501',
      deadline: '08/10/2025',
      type: 'deposit',
      completed: false,
      priority: 'low'
    }
  ]);

  const [closings] = useState<ClosingItem[]>([
    {
      id: '1',
      title: '410 FLAGSHIP DR #501',
      subtitle: 'Loan Application Deadline',
      progress: 58,
      deadline: 'Today'
    },
    {
      id: '2',
      title: '410 FLAGSHIP DR #501',
      subtitle: 'Loan Application Deadline',
      progress: 13,
      deadline: 'Today'
    }
  ]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const upcomingTasks = tasks.filter(task => !task.completed && task.deadline !== 'Today');
  const overdueTasks = tasks.filter(task => task.deadline === 'Today' && !task.completed);
  const upcomingDeadlines = tasks.filter(task => task.deadline !== 'Today');
  const overdueDeadlines = tasks.filter(task => task.deadline === 'Today');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="text-sm text-gray-500 mb-1">Thursday, July 31</div>
          <h1 className="text-3xl font-bold text-gray-900">Good afternoon, <span className="text-blue-600">Dave</span></h1>
        </div>
      </div>

      <div className=" mx-auto px-6 py-1">
        {/* Simple Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Loader className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">{tasks.filter(task => !task.completed).length}</div>
                  <div className="text-sm text-gray-500">Tasks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">{tasks.length}</div>
                  <div className="text-sm text-gray-500">Deadlines</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">{closings.length}</div>
                  <div className="text-sm text-gray-500">Closings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* My Tasks */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">My Tasks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-50">
                  <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <div className="flex items-center space-x-2">
                      <span>Upcoming</span>
                      {upcomingTasks.length > 0 && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                          {upcomingTasks.length}
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="overdue" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <div className="flex items-center space-x-2">
                      <span>Overdue</span>
                      {overdueTasks.length > 0 && (
                        <Badge variant="destructive" className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                          {overdueTasks.length}
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingTasks.length > 0 ? upcomingTasks.map((task, index) => (
                    <div 
                      key={task.id} 
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                      style={{ 
                        animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{task.subtitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {task.type === 'loan' ? 'Loan Application Deadline' : 
                             task.type === 'deposit' ? 'Additional Deposit Deadline' : 
                             'Inspection Period End Date'}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No upcoming tasks
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="overdue" className="space-y-4">
                  {overdueTasks.length > 0 ? overdueTasks.map((task, index) => (
                    <div 
                      key={task.id} 
                      className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-100"
                      style={{ 
                        animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{task.subtitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-red-500">
                            {task.type === 'loan' ? 'Loan Application Deadline' : 
                             task.type === 'deposit' ? 'Additional Deposit Deadline' : 
                             'Inspection Period End Date'}
                          </span>
                          <span className="text-xs font-medium text-red-600">{task.deadline}</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No overdue tasks
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* My Deadlines */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">My Deadlines</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-50">
                  <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <div className="flex items-center space-x-2">
                      <span>Upcoming</span>
                      {upcomingDeadlines.length > 0 && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                          {upcomingDeadlines.length}
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="overdue" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <div className="flex items-center space-x-2">
                      <span>Overdue</span>
                      {overdueDeadlines.length > 0 && (
                        <Badge variant="destructive" className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                          {overdueDeadlines.length}
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingDeadlines.length > 0 ? upcomingDeadlines.map((task, index) => (
                    <div 
                      key={task.id} 
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                      style={{ 
                        animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <Checkbox className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{task.subtitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {task.type === 'loan' ? 'Loan Application Deadline' : 
                             task.type === 'deposit' ? 'Additional Deposit Deadline' : 
                             'Inspection Period End Date'}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No upcoming deadlines
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="overdue" className="space-y-4">
                  {overdueDeadlines.length > 0 ? overdueDeadlines.map((task, index) => (
                    <div 
                      key={task.id} 
                      className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-100"
                      style={{ 
                        animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <Checkbox className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{task.subtitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-red-500">
                            {task.type === 'loan' ? 'Loan Application Deadline' : 
                             task.type === 'deposit' ? 'Additional Deposit Deadline' : 
                             'Inspection Period End Date'}
                          </span>
                          <span className="text-xs font-medium text-red-600">{task.deadline}</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No overdue deadlines
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Closings */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Closings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {closings.map((closing, index) => (
                <div 
                  key={closing.id} 
                  className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
                  style={{ 
                    animation: `fadeInUp 0.4s ease-out ${index * 0.2}s both`
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base mb-1">{closing.title}</h3>
                      <p className="text-sm text-gray-500">{closing.subtitle}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {closing.deadline}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-blue-600">{closing.progress}% to closing</span>
                    </div>
                    <Progress 
                      value={closing.progress} 
                      className="h-2 bg-gray-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;