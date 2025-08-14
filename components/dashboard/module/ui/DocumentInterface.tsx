"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Calendar,
  X,
  Check,
} from "lucide-react";

const DocumentsInterface = () => {
  // Initialize with only the second item (16 Aug - Buyer Broker Agreement) open by default
  const [expandedSections, setExpandedSections] = useState({
    "Buyer Broker Agreement": true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    "Property Disclosure Statement Review": false,
    "Final Walkthrough Completion Checklist": true,
  });

  const toggleSection = (sectionId: any) =>
    // @ts-ignore
    setExpandedSections((p) => ({ ...p, [sectionId]: !p[sectionId] }));

  const toggleCheckbox = (title: string) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [title]: !prev[title as keyof typeof prev],
    }));
  };

  const DocumentRow = ({
    date,
    type,
    title,
    status,
    hasTimeline,
    timelineItems,
    onClick,
    isCheckbox,
  }: any) => {
    // @ts-ignore
    const isExpanded = expandedSections[title];
    const isChecked = checkboxStates[title as keyof typeof checkboxStates];

    return (
      <div className="border-b border-gray-100 last:border-b-0">
        {/* Row header */}
        <div
          className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 cursor-pointer"
          onClick={() => {
            if (isCheckbox) {
              toggleCheckbox(title);
            } else if (hasTimeline) {
              toggleSection(title);
            } else {
              onClick?.();
            }
          }}
        >
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 min-w-[60px]">{date}</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  type === "2d"
                    ? "bg-red-100 text-red-600"
                    : type === "3d"
                    ? "bg-blue-100 text-blue-600"
                    : type === "5d"
                    ? "bg-yellow-100 text-yellow-600"
                    : type === "6d"
                    ? "bg-green-100 text-green-600"
                    : type === "9d"
                    ? "bg-green-100 text-green-600"
                    : type === "checkbox"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {type}
              </span>
              {isCheckbox ? (
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    isChecked
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isChecked && (
                    <Check className="w-2.5 h-2.5 text-white stroke-2" />
                  )}
                </div>
              ) : (
                <FileText className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-gray-900 font-medium text-sm">{title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status === "uploaded" && (
              <span className="text-blue-600 text-sm font-medium">uploaded</span>
            )}
            {status === "use-forms" && (
              <span className="text-gray-600 text-sm font-medium">
                Use forms
              </span>
            )}
            {status === "upload" && (
              <span className="text-blue-600 text-sm font-medium">Upload</span>
            )}
            

            {!isCheckbox && (
              <>
                {hasTimeline ? (
                  isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </>
            )}
          </div>
        </div>

        {/* Timeline - Compact Design */}
        {hasTimeline && isExpanded && (
          <div className="px-6 pb-4">
            <div className="ml-12 relative">
              <div className="space-y-0">
                {timelineItems?.map((item: any, idx: any) => (
                  <div
                    key={idx}
                    className="relative flex items-start gap-3 py-2"
                  >
                    {/* Vertical line - positioned to connect through markers */}
                    {idx < timelineItems.length - 1 && (
                      <div className="absolute left-1.5 top-6 bottom-0 w-px bg-gray-200 z-0" />
                    )}

                    {/* Timeline marker */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          item.completed
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {item.completed && (
                          <Check className="w-2.5 h-2.5 text-white stroke-2" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div 
                      className={`flex-1 p-2 rounded-md border ${
                        item.completed 
                          ? "bg-blue-50 border-blue-200" 
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {item.icon === "calendar" && (
                            <Calendar
                              className={`w-3 h-3 ${
                                item.completed ? "text-blue-600" : "text-gray-500"
                              }`}
                            />
                          )}
                          {item.icon === "file" && (
                            <FileText
                              className={`w-3 h-3 ${
                                item.completed ? "text-blue-600" : "text-gray-500"
                              }`}
                            />
                          )}
                          {item.icon === "clipboard" && (
                            <FileText
                              className={`w-3 h-3 ${
                                item.completed ? "text-blue-600" : "text-gray-500"
                              }`}
                            />
                          )}
                        </div>

                        {/* Text content */}
                        <div className="flex-1">
                          <div 
                            className={`font-medium text-xs ${
                              item.completed ? "text-gray-900" : "text-gray-800"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {item.date}
                          </div>
                          {/* Type indicator */}
                          <div className="mt-1">
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                                type === "2d"
                                  ? "bg-red-100 text-red-600"
                                  : type === "3d"
                                  ? "bg-blue-100 text-blue-600"
                                  : type === "5d"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : type === "6d"
                                  ? "bg-green-100 text-green-600"
                                  : type === "9d"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FormsModal = () => (
    <div className={`fixed inset-0 z-50 ${isModalOpen ? 'flex' : 'hidden'} items-center justify-center p-4`}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={() => setIsModalOpen(false)} 
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Forms & Documents</h2>
            <p className="text-sm text-gray-600 mt-1">
              Compile your package by selecting forms and documents from your library or attaching them from your computer.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Document Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 block">
                    Buyer Broker Agreement. Property-Specific.pdf
                  </span>
                  <span className="text-xs text-gray-500">2.4 MB • PDF</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  nabor mls
                </span>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 block">
                    Buyer Broker Exclusive Agreement.pdf
                  </span>
                  <span className="text-xs text-gray-500">1.8 MB • PDF</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  nabor mls
                </span>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <div className="p-3 bg-gray-50 rounded-full w-fit mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <button className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">
                  Add more forms
                </button>
                <span className="text-gray-500">or</span>
                <button className="text-gray-600 hover:text-gray-700 font-medium underline underline-offset-2">
                  attach a document
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Drag and drop files here or click to browse
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-600 ml-2">Step 1 of 3</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const documents = [
    {
      date: "15 Aug",
      type: "2d",
      title: "Purchase agreement",
      status: "uploaded",
      hasTimeline: false,
    },
    {
      date: "16 Aug",
      type: "3d",
      title: "Buyer Broker Agreement",
      status: "uploaded",
      hasTimeline: true,
      timelineItems: [
        {
          completed: true,
          icon: "calendar",
          title: "Additional Deposit Due Date",
          date: "July 10, 2025",
        },
        {
          completed: true,
          icon: "file",
          title: "Inspection Period End Date",
          date: "July 24, 2025",
        },
        {
          completed: false,
          icon: "clipboard",
          title: "Inspection Period End Date",
          date: "July 24, 2025",
        },
      ],
    },
    {
      date: "24 Aug",
      type: "5d",
      title: "Seller Agreement",
      status: "use-forms",
      hasTimeline: false,
      onClick: () => setIsModalOpen(true),
    },
    {
      date: "27 Aug",
      type: "6d",
      title: "Purchase agreement",
      status: "use-forms",
      hasTimeline: false,
      onClick: () => setIsModalOpen(true),
    },
    {
      date: "29 Aug",
      type: "9d",
      title: "Escrow deposit receipt",
      status: "upload",
      hasTimeline: true,
      timelineItems: [
        {
          completed: true,
          icon: "calendar",
          title: "Document Upload Deadline",
          date: "Aug 30, 2025",
        },
        {
          completed: false,
          icon: "file",
          title: "Receipt Verification",
          date: "Sep 1, 2025",
        },
      ],
    },
    {
      date: "29 Aug",
      type: "9d",
      title: "Buyer Election",
      status: "upload",
      hasTimeline: true,
      timelineItems: [
        {
          completed: true,
          icon: "calendar",
          title: "Election Period Start",
          date: "Aug 29, 2025",
        },
        {
          completed: true,
          icon: "file",
          title: "Document Submission",
          date: "Sep 2, 2025",
        },
        {
          completed: false,
          icon: "file",
          title: "Final Review Period",
          date: "Sep 5, 2025",
        },
      ],
    },
    {
      date: "02 Sep",
      
      title: "Property Disclosure Statement Review",
      status: "pending",
      hasTimeline: false,
      isCheckbox: true,
    },
    {
      date: "05 Sep",
    
      title: "Final Walkthrough Completion Checklist",
      status: "pending",
      hasTimeline: false,
      isCheckbox: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white">
      <div className="rounded-lg">
        <div>
          {documents.map((doc, i) => (
            <DocumentRow key={i} {...doc} />
          ))}
        </div>
      </div>

      <FormsModal />
    </div>
  );
};

export default DocumentsInterface;