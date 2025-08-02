'use client'
import React, { useState } from 'react';
import { Bell, Check, X, FileText, UserPlus, Clock, AlertCircle, Save, Trash2 } from 'lucide-react';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'note_created',
      title: 'New note created',
      description: 'Transaction Note #1247 has been successfully saved',
      time: '5 min ago',
      read: false,
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'contact_added',
      title: 'Contact added',
      description: 'John Smith has been added to your contacts',
      time: '15 min ago',
      read: false,
      icon: UserPlus,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Transaction deadline approaching',
      description: 'Property closing scheduled for tomorrow at 3:00 PM',
      time: '1 hour ago',
      read: true,
      icon: Clock,
      color: 'text-orange-500'
    },
    {
      id: 4,
      type: 'error',
      title: 'Failed to save note',
      description: 'Unable to save Transaction Note #1246. Please try again.',
      time: '2 hours ago',
      read: true,
      icon: AlertCircle,
      color: 'text-red-500'
    },
    {
      id: 5,
      type: 'auto_save',
      title: 'Note auto-saved',
      description: 'Your draft has been automatically saved',
      time: '3 hours ago',
      read: false,
      icon: Save,
      color: 'text-purple-500'
    },
    {
      id: 6,
      type: 'note_deleted',
      title: 'Note deleted',
      description: 'Transaction Note #1245 has been moved to trash',
      time: '1 day ago',
      read: true,
      icon: Trash2,
      color: 'text-gray-500'
    },
    {
      id: 7,
      type: 'contact_updated',
      title: 'Contact information updated',
      description: 'Sarah Johnson\'s phone number has been updated',
      time: '2 days ago',
      read: false,
      icon: UserPlus,
      color: 'text-blue-500'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: any) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: any) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                App Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                  <Bell className="w-12 h-12 mb-2 text-gray-300" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                        !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 ${notification.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex space-x-1">
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-1 text-gray-400 hover:text-green-600 rounded cursor-pointer"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                            title="Remove notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1 cursor-pointer">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;