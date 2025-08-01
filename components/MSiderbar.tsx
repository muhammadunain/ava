"use client";

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Archive, 
  Home, 
  Users, 
  ChevronRight,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function MSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['transactions']);

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const menuItems = [
    {
      id: 'new-transaction',
      label: 'New Transaction',
      icon: Receipt,
      hasChildren: false,
      isButton: true
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      hasChildren: false,
      isActive: true
    },
    {
      id: 'transactions',
      label: 'TRANSACTIONS',
      icon: null,
      hasChildren: true,
      isCategory: true,
      children: [
        {
          id: 'intakes',
          label: 'Intakes',
          icon: Receipt,
          badge: '1'
        },
        {
          id: 'archive',
          label: 'Archive',
          icon: Archive
        }
      ]
    },
    {
      id: 'flagship',
      label: '410 FLAGSHIP DR #501',
      icon: Home,
      hasChildren: false
    },
    {
      id: 'riverside',
      label: '85 RIVERSIDE AVE #302',
      icon: Home,
      hasChildren: false
    },
    {
      id: 'closet',
      label: 'Closet',
      icon: Archive,
      hasChildren: false
    },
    {
      id: 'void',
      label: 'Void',
      icon: X,
      hasChildren: false
    }
  ];

  const bottomItems = [
    {
      id: 'contacts',
      label: 'Contacts',
      icon: Users,
      hasChildren: false
    }
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="font-semibold text-sm">AVA</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              {item.isButton ? (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-8 px-2 text-sm font-normal bg-gray-900 text-white hover:bg-gray-800",
                    isCollapsed && "px-2"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {!isCollapsed && (
                    <>
                      <span className="ml-2">{item.label}</span>
                      <ChevronRight className="h-3 w-3 ml-auto" />
                    </>
                  )}
                </Button>
              ) : item.isCategory ? (
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(item.id)}
                    className={cn(
                      "w-full justify-start h-8 px-2 text-xs font-medium text-gray-500 hover:bg-gray-50",
                      isCollapsed && "px-2"
                    )}
                  >
                    {!isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        {expandedItems.includes(item.id) ? (
                          <ChevronDown className="h-3 w-3 ml-auto" />
                        ) : (
                          <ChevronRight className="h-3 w-3 ml-auto" />
                        )}
                      </>
                    )}
                  </Button>
                  {!isCollapsed && expandedItems.includes(item.id) && item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Button
                          key={child.id}
                          variant="ghost"
                          className="w-full justify-start h-8 px-2 text-sm font-normal hover:bg-gray-50"
                        >
                          {child.icon && <child.icon className="h-4 w-4" />}
                          <span className="ml-2">{child.label}</span>
                          {child.badge && (
                            <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                              {child.badge}
                            </span>
                          )}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-8 px-2 text-sm font-normal hover:bg-gray-50",
                    item.isActive && "bg-gray-100",
                    isCollapsed && "px-2"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {!isCollapsed && (
                    <>
                      <span className="ml-2">{item.label}</span>
                      <ChevronRight className="h-3 w-3 ml-auto" />
                    </>
                  )}
                </Button>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-2">
        <div className="mb-2">
          {!isCollapsed && (
            <div className="px-2 py-1">
              <span className="text-xs font-medium text-gray-500">MORE</span>
            </div>
          )}
        </div>
        {bottomItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start h-8 px-2 text-sm font-normal hover:bg-gray-50",
              isCollapsed && "px-2"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {!isCollapsed && (
              <>
                <span className="ml-2">{item.label}</span>
                <ChevronRight className="h-3 w-3 ml-auto" />
              </>
            )}
          </Button>
        ))}
        
        {!isCollapsed && (
          <div className="mt-4 px-2">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">D</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Dave</p>
                <p className="text-xs text-gray-500 truncate">dave@example.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}