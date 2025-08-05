import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';

const PropertyProcessingLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Identifying property details...",
    "The property is located in New Jersey, USA...",
    "Confirming type of property as Single-Family Home...",
    "Identifying key parties and representation...",
    "Buyer identified for further processing...",
    "Seller identified for further processing...",
    "Checking purchase price structure...",
    "Purchase price set as specified in agreement...",
    "Analyzing earnest money terms...",
    "Earnest money amount defined in contract...",
    "Confirming buyer financing contingency period...",
    "Buyer to provide loan approval by specified date...",
    "Reviewing seller's default and remedies...",
    "Seller's remedies for buyer's default identified...",
    "Examining mediation and arbitration clauses...",
    "Mediation required before litigation...",
    "Identifying critical dates and deadlines..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500); // Each step takes 1.5 seconds

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 transition-all duration-500 ${
              index <= currentStep ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="flex-shrink-0">
              {index < currentStep ? (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : index === currentStep ? (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Loader2 className="w-3 h-3 text-white animate-spin" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
            <div
              className={`text-sm transition-colors duration-300 ${
                index < currentStep
                  ? 'text-green-700 font-medium'
                  : index === currentStep
                  ? 'text-blue-700 font-medium'
                  : 'text-gray-500'
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
      
      {currentStep === steps.length - 1 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Property processing completed successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyProcessingLoader;