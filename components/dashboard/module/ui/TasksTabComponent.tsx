"use client"

import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Edit,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Check,
  ArrowRight
} from 'lucide-react'

export const TasksTab = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Inspection Period Deadline', dueDate: '2025-08-10', priority: 'high', completed: false, category: 'Property', assignedTo: 'John Smith' },
    { id: 2, title: "Buyer's Election Deadline", dueDate: '2025-08-15', priority: 'high', completed: false, category: 'Legal', assignedTo: 'Sarah Johnson' },
    { id: 3, title: 'Title Examination Deadline', dueDate: '2025-08-20', priority: 'medium', completed: true, category: 'Legal', assignedTo: 'Michael Brown' },
    { id: 4, title: 'Final Walk-through', dueDate: '2025-08-24', priority: 'medium', completed: false, category: 'Property', assignedTo: 'Emily Davis' },
    { id: 5, title: 'Closing Date Preparation', dueDate: '2025-08-25', priority: 'high', completed: false, category: 'Financial', assignedTo: 'David Wilson' },
    { id: 6, title: 'Insurance Documentation', dueDate: '2025-08-18', priority: 'medium', completed: false, category: 'Insurance', assignedTo: 'Lisa Anderson' },
    { id: 7, title: 'Loan Application Review', dueDate: '2025-08-12', priority: 'high', completed: true, category: 'Financial', assignedTo: 'Robert Taylor' },
    { id: 8, title: 'Property Appraisal Report', dueDate: '2025-08-08', priority: 'medium', completed: false, category: 'Appraisal', assignedTo: 'Jennifer Martinez' }
  ])

  const toggleTask = (taskId:any) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getRemainingDays = (dueDate:any) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const formatRemainingDays = (days:any) => {
    if (days < 0) return `${Math.abs(days)} days overdue`
    if (days === 0) return 'Due today'
    if (days === 1) return '1 day left'
    return `${days} days left`
  }

  const getRemainingDaysColor = (days:any) => {
    if (days < 0) return 'text-red-600 bg-red-50'
    if (days === 0) return 'text-orange-600 bg-orange-50'
    if (days <= 3) return 'text-yellow-600 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  const getPriorityColor = (priority:any) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-700 bg-green-50 border-green-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const overdueTasks = tasks.filter(task => !task.completed && getRemainingDays(task.dueDate) < 0).length
  const dueTodayTasks = tasks.filter(task => !task.completed && getRemainingDays(task.dueDate) === 0).length

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-gray-100 ">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[{ label: 'Total Tasks', value: totalTasks, icon: <TrendingUp className="h-5 w-5 text-gray-600" />, color: 'gray' },
              { label: 'Completed', value: completedTasks, icon: <CheckCircle2 className="h-5 w-5 text-green-600" />, color: 'green' },
              { label: 'Due Today', value: dueTodayTasks, icon: <Clock className="h-5 w-5 text-orange-600" />, color: 'orange' },
              { label: 'Overdue', value: overdueTasks, icon: <AlertCircle className="h-5 w-5 text-red-600" />, color: 'red' }]
              .map(({ label, value, icon, color }, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                      <p className="text-2xl font-bold text-black">{value}</p>
                    </div>
                    <div className={`p-3 bg-${color}-50 rounded-lg`}>{icon}</div>
                  </div>
                </div>
              ))}
          </div>

          {/* Search & Progress Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
            <div className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="w-full max-w-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {completedTasks} of {totalTasks} tasks
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((completedTasks / totalTasks) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-black transition-all duration-500" style={{ width: `${(completedTasks / totalTasks) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">No tasks found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by creating your first task.'}
              </p>
            </div>
          ) : (
            filteredTasks.map(task => {
              const remainingDays = getRemainingDays(task.dueDate)
              return (
                <div key={task.id} className={`group bg-white border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-200 ${task.completed ? 'bg-gray-50/50' : ''}`}>
                  <div className="flex items-start gap-4">
                    <button onClick={() => toggleTask(task.id)} className="flex-shrink-0 mt-1 p-1 hover:bg-gray-50 rounded-lg transition-colors">
                      {task.completed ? (
                        <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full hover:border-gray-400 transition-colors"></div>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>{task.title}</h3>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Edit className="h-4 w-4 text-gray-500" /></button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><MoreHorizontal className="h-4 w-4 text-gray-500" /></button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                          <Calendar className="h-4 w-4" />
                          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        {!task.completed && (
                          <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg font-medium ${getRemainingDaysColor(remainingDays)}`}>
                            <Clock className="h-4 w-4" />{formatRemainingDays(remainingDays)}
                          </div>
                        )}
                        <div className={`text-xs font-medium px-3 py-2 rounded-lg border ${getPriorityColor(task.priority)}`}>{task.priority.toUpperCase()}</div>
                        <div className="text-sm text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg">{task.category}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">{task.assignedTo.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                          </div>
                          <span>{task.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
