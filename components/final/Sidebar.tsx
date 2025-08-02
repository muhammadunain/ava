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
  Funnel
} from 'lucide-react';
import Link from 'next/link';
import TransactionTypeDialog from '../dialogbox';
import NotificationDropdown from '../dashboard/module/ui/Notify';

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
         <TransactionTypeDialog/>
        </div>
      )}

      {/* Navigation - Scrollable Area */}
      <div className="flex-1 px-2 overflow-y-auto">
        {/* Dashboard */}
        <div className="mb-6">
            <Link href={'/'}>
          <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
            activeSection === 'dashboard' ? 'bg-gray-50' : ''
          }`}
          onClick={() => setActiveSection('dashboard')}>
            <div className="flex items-center space-x-3">
              <LayoutDashboard size={18} className="text-gray-600" />
              {!isCollapsed && <span className="text-sm font-medium">Dashboard</span>}
            </div>
            {!isCollapsed && <ChevronDown size={16} className="text-gray-400" />}
          </div>
          </Link>
        </div>

        {/* Transactions Section */}
        {!isCollapsed && (
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                TRANSACTIONS
              </span>
              <div className="w-4 h-4 text-blue-500 rounded flex items-center justify-center">
              <Funnel/>
              </div>
            </div>

            {/* Intakes */}
            <div className={`flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
              activeSection === 'intakes' ? 'bg-gray-50' : ''
            }`}
            onClick={() => setActiveSection('intakes')}>
              <div className="flex items-center space-x-3">
                <ArrowUpCircle size={18} className="text-gray-600" />
                <span className="text-sm font-medium">Intakes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
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
                  <CheckCircle size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                {expandedSections.active ? 
                  <ChevronDown size={16} className="text-gray-400" /> : 
                  <ChevronRight size={16} className="text-gray-400" />
                }
              </div>
              
              {expandedSections.active && (
                <div className="ml-9 mt-1 space-y-1">
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
                <XCircle size={18} className="text-gray-600" />
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
                <Trash2 size={18} className="text-gray-600" />
                <span className="text-sm font-medium">Void</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        )}

        {/* More Section */}
        {!isCollapsed && (
          <div>
            <div className="px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                MORE
              </span>
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
          </div>
        )}

        {/* Collapsed Icons Only */}
        {isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <LayoutDashboard size={18} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer relative">
              <ArrowUpCircle size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
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