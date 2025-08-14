'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Eye, Trash2, Check, FileText, Upload, FormInput, MoreHorizontal } from "lucide-react";
import Image from 'next/image';

// Mock data based on the image
const mockDocuments = [
  {
    id: 1,
    date: "AUG 06",
    name: "Listing agreement",
    status: "uploaded",
    type: "uploaded",
    assignedTo: "Ryan Schwartz",
    dueDate: "Aug 06, 2025"
  },
  {
    id: 2,
    date: "AUG 06",
    name: "Estimate of sellers costs",
    status: "pending",
    type: "upload",
    assignedTo: "",
    dueDate: ""
  },
  {
    id: 3,
    date: "AUG 07",
    name: "Lock box authorization",
    status: "pending",
    type: "upload",
    assignedTo: "",
    dueDate: ""
  },
  {
    id: 4,
    date: "AUG 15",
    name: "Buyer Broker Agreement",
    status: "pending",
    type: "form",
    assignedTo: "",
    dueDate: ""
  },
  {
    id: 5,
    date: "AUG 15",
    name: "Purchase agreement",
    status: "pending",
    type: "form",
    assignedTo: "",
    dueDate: ""
  },
  {
    id: 6,
    date: "AUG 16",
    name: "Earthquake disclosure report",
    status: "pending",
    type: "upload",
    assignedTo: "",
    dueDate: ""
  },
  {
    id: 7,
    date: "AUG 16",
    name: "Environmental hazards booklet",
    status: "pending",
    type: "upload",
    assignedTo: "",
    dueDate: ""
  },
  {
    id: 8,
    date: "AUG 16",
    name: "Natural hazards report",
    status: "pending",
    type: "upload",
    assignedTo: "",
    dueDate: ""
  },
  {
    id: 9,
    date: "AUG 16",
    name: "Property tax disclosure",
    status: "pending",
    type: "upload",
    assignedTo: "",
    dueDate: ""
  },
  


];

export function DocumentsSection() {
  const [selectedDocument, setSelectedDocument] = useState(mockDocuments[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status:any, type:any) => {
    if (status === "uploaded") {
      return <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        <Check className="h-3 w-3 text-white" />
      </div>;
    }
    return <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
      <FileText className="h-3 w-3 text-gray-500" />
    </div>;
  };

  const getActionButton = (type:any) => {
    if (type === "form") {
      return (
        <Button variant="outline" size="sm" className="text-xs">
          Use forms
        </Button>
      );
    }
    return (
      <Button variant="outline" size="sm" className="text-xs">
        Upload
      </Button>
    );
  };

  const getDateStyle = (status:any) => {
    if (status === "uploaded") {
      return "bg-blue-100 text-blue-700 border border-blue-200";
    }
    return "bg-red-100 text-red-700 border border-red-200";
  };

  return (
    <div className="flex h-screen ">
      {/* Left Panel - Document List */}
      <div className="w-2/3 bg-white border-r">
        {/* Header */}
        <div className="p-4 border-b ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-gray-600 text-white text-sm rounded">
                AUG 14
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-blue-500">ALL</span>
                
                <span className="text-lg font-medium text-gray-700">DOCUMENTS</span>
                <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">?</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white">
                Action ▼
              </Button>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="overflow-y-auto">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className={`flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer ${
                selectedDocument?.id === doc.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => setSelectedDocument(doc)}
            >
              <div className="flex items-center gap-4">
                <div className={`px-2 py-1 text-xs rounded ${getDateStyle(doc.status)}`}>
                  {doc.date}
                </div>
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status, doc.type)}
                  <span className={`font-medium ${doc.status === 'uploaded' ? 'text-gray-900' : 'text-gray-700'}`}>
                    {doc.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {doc.status === 'uploaded' ? (
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    uploaded
                  </span>
                ) : (
                  getActionButton(doc.type)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Document Details */}
      <div className="w-1/3 bg-white">
        {selectedDocument && (
          <div className="p-6">
            {/* Document Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedDocument.name}
                </h2>
              </div>
              {selectedDocument.assignedTo && (
                <div className="text-sm text-gray-600 mb-1">
                  Assigned to: {selectedDocument.assignedTo}
                </div>
              )}
              {selectedDocument.dueDate && (
                <div className="text-sm text-gray-600">
                  Due: {selectedDocument.dueDate}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 cursor-pointer">
                 E-Sign
                </Button>
                <Button variant="outline" className="flex-1 cursor-pointer">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 cursor-pointer">
                  Email
                </Button>
                <Button variant="outline" className="flex-1 cursor-pointer">
                  Edit task
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 cursor-pointer">
                  Delete ▼
                </Button>
                <Button variant="outline" className="flex-1 cursor-pointer">
                  Unassign
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span>▶</span>
                <span className="text-sm font-medium">COMMENTS & ACTIVITY (2)</span>
              </div>
            </div>

            {/* Document Preview */}
          <div className="mt-6 w-full">                              
  <div className="border border-t-0 w-full rounded-b p-0 bg-gray-50">               
    <Image                               
      src={"/image.png"}                               
      width={800}                               
      height={800}                               
      alt="image"                               
      className="w-full h-72 object-cover rounded-b"                             
    />               
  </div>             
</div>

            {/* Help Button */}
            <div className="fixed bottom-6 right-6">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 p-0">
                <div className="text-center">
                  <div className="text-xs">NEED</div>
                  <div className="text-xs">HELP?</div>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}