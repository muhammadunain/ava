'use client'
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  LayoutDashboard, 
  ArrowUpCircle, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Users, 
  Menu,
  X,
  Search,
  Bell,
  PanelRightOpen,
  PanelRightOpenIcon,
  Funnel,
  GitBranch,
  FileText,
  BarChart3,
  BookOpen,
  Activity,
  List,
  Settings,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import TransactionTypeDialog from '../dialogbox';
import NotificationDropdown from '../dashboard/module/ui/Notify';
import TransactionModalComponent from './UploadPDF';

export const TopNavbar = () => {
  return (
    <div className="bg-white relative border-b border-gray-200 px-6 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search any task, deadline, transactions"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <NotificationDropdown/>

          {/* User Avatar */}
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">A</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('intakes');
  const [expandedSections, setExpandedSections] = useState({
    transactions: true,
    active: true
  });

  const toggleSection = (section: any) => {
    setExpandedSections(prev => ({
      ...prev,
      // @ts-ignore
      [section]: !prev[section]
    }));
  };

  return (
    <>
    
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
        
      {/* Header */}
      
      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <div className="font-semibold text-sm">AVA</div>
                <div className="text-xs text-gray-500">Real Estate</div>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isCollapsed ? <Menu size={16} /> : <PanelRightOpenIcon size={16} />}
          </button>
        </div>
      </div>

      {/* New Transaction Button */}
      {!isCollapsed && (
        <div className="p-4 flex-shrink-0">
         {/* <TransactionTypeDialog/> */}
         <TransactionModalComponent/>
        </div>
      )}

      {/* Navigation - Scrollable Area */}
      <div className="flex-1 px-2 overflow-y-auto">
        
        {/* OVERVIEW Section */}
        {!isCollapsed && (
          <div className="mb-4">
            <div className="px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                OVERVIEW
              </span>
            </div>

            {/* Dashboard */}
            <Link href={'/'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'dashboard' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('dashboard')}>
                <div className="flex items-center space-x-3">
                  <LayoutDashboard size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
              </div>
            </Link>

            {/* Pipeline */}
            <Link href={'/pipeline'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'pipeline' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('pipeline')}>
                <div className="flex items-center space-x-3">
                  <GitBranch size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Pipeline</span>
                </div>
              </div>
            </Link>

            {/* Transactions */}
            <Link href={'/transactions'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'transactions' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('transactions')}>
                <div className="flex items-center space-x-3">
                  <FileText size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Transactions</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Transactions Section */}
        {!isCollapsed && (
          <div className="mb-4">
            
            {/* Intakes */}
            <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
              activeSection === 'intakes' ? 'bg-gray-50' : ''
            }`}
            onClick={() => setActiveSection('intakes')}>
              <div className="flex items-center space-x-3">
                <div className="ml-6">
                  <ArrowUpCircle size={18} className="text-gray-600" />
                </div>
                <span className="text-sm font-medium">Intakes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Active */}
            <div className="mb-2">
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'active' ? 'bg-gray-50' : ''
              }`}
              onClick={() => {
                setActiveSection('active');
                toggleSection('active');
              }}>
                <div className="flex items-center space-x-3">
                  <div className="ml-6">
                    <CheckCircle size={18} className="text-gray-600" />
                  </div>
                  <span className="text-sm font-medium">Active</span>
                </div>
                {expandedSections.active ? 
                  <ChevronDown size={16} className="text-gray-400" /> : 
                  <ChevronRight size={16} className="text-gray-400" />
                }
              </div>
              
              {expandedSections.active && (
                <div className="ml-12 mt-1 space-y-1">
                  <Link href={'/transactions'}>
                    <div className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
                      410 FL ACSSP (PI 950)
                    </div>
                  </Link>
                  <Link href={'/transactions'}>
                    <div className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
                      410 FL ACSSP (PI 950)
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Closed */}
            <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
              activeSection === 'closed' ? 'bg-gray-50' : ''
            }`}
            onClick={() => setActiveSection('closed')}>
              <div className="flex items-center space-x-3">
                <div className="ml-6">
                  <XCircle size={18} className="text-gray-600" />
                </div>
                <span className="text-sm font-medium">Closed</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>

            {/* Void */}
            <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
              activeSection === 'void' ? 'bg-gray-50' : ''
            }`}
            onClick={() => setActiveSection('void')}>
              <div className="flex items-center space-x-3">
                <div className="ml-6">
                  <Trash2 size={18} className="text-gray-600" />
                </div>
                <span className="text-sm font-medium">Void</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>

            {/* Contacts */}
            <Link href={'/contact'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'contacts' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('contacts')}>
                <div className="flex items-center space-x-3">
                  <Users size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Contacts</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </Link>

            {/* Reports */}
            <Link href={'/reports'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'reports' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('reports')}>
                <div className="flex items-center space-x-3">
                  <BarChart3 size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Reports</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </Link>

            {/* Library */}
            <Link href={'/library'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'library' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('library')}>
                <div className="flex items-center space-x-3">
                  <BookOpen size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Library</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </Link>
          </div>
        )}

        {/* TO DO Section */}
        {!isCollapsed && (
          <div className="mb-4">
            <div className="px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                TO DO
              </span>
            </div>

            {/* Activity */}
            <Link href={'/activity'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'activity' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('activity')}>
                <div className="flex items-center space-x-3">
                  <Activity size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Activity</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* SETTINGS Section */}
        {!isCollapsed && (
          <div className="mb-4">
            <div className="px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                SETTINGS
              </span>
            </div>

            {/* Checklists */}
            <Link href={'/checklists'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'checklists' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('checklists')}>
                <div className="flex items-center space-x-3">
                  <List size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Checklists</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* USER Section */}
        {!isCollapsed && (
          <div className="mb-4">
            <div className="px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                USER
              </span>
            </div>

            {/* Notifications */}
            <Link href={'/notifications'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'notifications' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('notifications')}>
                <div className="flex items-center space-x-3">
                  <Bell size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Notifications</span>
                </div>
              </div>
            </Link>

            {/* Add-ons */}
            <Link href={'/add-ons'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'add-ons' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('add-ons')}>
                <div className="flex items-center space-x-3">
                  <Settings size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Add-ons</span>
                </div>
              </div>
            </Link>

            {/* Sign out */}
            <Link href={'/signout'}>
              <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                activeSection === 'signout' ? 'bg-gray-50' : ''
              }`}
              onClick={() => setActiveSection('signout')}>
                <div className="flex items-center space-x-3">
                  <LogOut size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Sign out</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Collapsed Icons Only */}
        {isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <LayoutDashboard size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <GitBranch size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer relative">
              <ArrowUpCircle size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <CheckCircle size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <XCircle size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Trash2 size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Users size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <BarChart3 size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <BookOpen size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Activity size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <List size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Bell size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Settings size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <LogOut size={18} className="text-gray-600" />
            </div>
          </div>
        )}
      </div>

      {/* User Profile at Bottom - Fixed Position */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">D</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Dave</div>
              <div className="text-xs text-gray-500">dave@example.com</div>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        ) : (
          <div className="flex items-center justify-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">D</span>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};