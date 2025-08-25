'use client'
import ProjectManagementUI from '@/components/final/Transaction'
import { Button } from '@/components/ui/button';
import { CheckCircle, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const page = () => {
   const searchParams = useSearchParams();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  useEffect(() => {
    // Check if coming from successful onboarding
    const success = searchParams.get('success');
    if (success === 'true') {
      setShowSuccessAlert(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);
  const handleDismissAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <>
    {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 animate-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Transaction Setup Complete! 🎉
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Your transaction has been successfully created and is ready to manage. 
                  All deadlines, tasks, and milestones have been set up for you.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    View Transaction
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDismissAlert}
                  >
                    Got it
                  </Button>
                </div>
              </div>
              <button
                onClick={handleDismissAlert}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    <ProjectManagementUI/>
      
    </>
  )
}

export default page
