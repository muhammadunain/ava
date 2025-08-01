import React, { useState } from 'react';
import { X, Plus, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const IntegrationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectedServices, setConnectedServices] = useState(new Set());

  const integrations = [
    {
      id: 'gmail',
      name: 'Gmail',
      image: '/icons8-drive.svg',
      description: 'Connect your Gmail to sync emails.',
      color: 'bg-red-50 text-red-600 border-red-200',
      hoverColor: 'hover:bg-red-100',
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      image: '/calendar.svg',
      description: 'Connect your Google Calendar to sync events and meetings.',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      hoverColor: 'hover:bg-blue-100',
    }
  ];

  const handleConnect = (integrationId:any) => {
    setConnectedServices(prev => new Set([...prev, integrationId]));
  };

  const isConnected = (integrationId:any) => connectedServices.has(integrationId);

  return (
    <div className="p-8 flex items-center justify-center">
      <div className="relative">
        <Button
          onClick={() => setIsOpen(true)}
          className="group flex items-center  border border-slate-400 bg-gradient-to-r text-black text-sm   hover:shadow-xl hover:border-slate-500 hover:bg-slate-600 hover:text-white  transition-all duration-300  backdrop-blur-sm"
        >
          {/* Icons Container with Stacked Effect */}
          <div className="flex items-center -space-x-2">
            <div className="relative w-8 h-8 rounded-full   flex items-center justify-center overflow-hidden group-hover:rotate-3 transition-transform duration-300">
              <Image 
                src="/icons8-drive.svg" 
                width={20} 
                height={20} 
                alt="Drive"
                className="object-contain "
              />
            </div>
            
            <div className="relative w-8 h-8 rounded-full  flex items-center justify-center overflow-hidden group-hover:-rotate-3 transition-transform duration-300">
              <Image 
                src="/calendar.svg" 
                width={20} 
                height={20} 
                alt="Calendar"
                className="object-contain filter drop-shadow-sm"
              />
            </div>
          </div>

          {/* Enhanced Text */}
          <span className="text-sm  bg-clip-text font-bold tracking-wide">
            Connect Integrations
          </span>
          
          {/* Enhanced X Icon */}
          <X className="w-5 h-5 text-slate-600 group-hover:rotate-90 group-hover:text-slate-700 transition-all duration-300" />
        </Button>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Add Integration</h2>
                  <p className="text-gray-500 mt-1">Connect your favorite tools to streamline your workflow</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {integrations.map((integration) => {
                    const connected = isConnected(integration.id);

                    return (
                      <div
                        key={integration.id}
                        className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 rounded-xl ${integration.color} transition-colors ${integration.hoverColor}`}>
                            <Image src={integration.image} width={28} height={28} alt={integration.name} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {integration.name}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {integration.description}
                            </p>
                          </div>
                        </div>

                        <div className="mb-6 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                            <span>Real-time synchronization</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                            <span>Secure OAuth connection</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                            <span>Two-way sync support</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleConnect(integration.id)}
                          disabled={connected}
                          className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            connected
                              ? 'bg-teal-50 text-slate-700 border border-slate-200 cursor-pointer'
                              : 'bg-slate-600 text-white hover:bg-slate-700 shadow-sm hover:shadow-md active:scale-[0.98]'
                          }`}
                        >
                          {connected ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Connected</span>
                            </>
                          ) : (
                            <>
                              <span>Connect</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </button>

                        {connected && (
                          <div className="absolute top-4 right-4">
                            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Plus className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Need more integrations?</h4>
                      <p className="text-sm text-gray-600">
                        We're constantly adding new integrations. Contact support to request specific tools or services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Your data is encrypted and secure
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationDialog;