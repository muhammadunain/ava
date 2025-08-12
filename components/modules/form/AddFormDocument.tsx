'use client'
import React, { useState, useRef } from 'react';
import { Plus, X, GripVertical, FileText, Upload } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'docx';
  size?: string;
  status?: string;
}

export default function FormsAndDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Buyer Broker Agreement. Property-Specific.pdf', type: 'pdf', status: 'nabor mls' },
    { id: '2', name: 'Buyer Broker Exclusive Agreement.pdf', type: 'pdf', status: 'nabor mls' }
  ]);
  
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [isDragOverUpload, setIsDragOverUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
    dragCounter.current = 0;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    dragCounter.current++;
    setDraggedOver(id);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDraggedOver(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem !== targetId) {
      const draggedIndex = documents.findIndex(doc => doc.id === draggedItem);
      const targetIndex = documents.findIndex(doc => doc.id === targetId);
      
      const newDocuments = [...documents];
      const [draggedDoc] = newDocuments.splice(draggedIndex, 1);
      newDocuments.splice(targetIndex, 0, draggedDoc);
      
      setDocuments(newDocuments);
    }
    
    setDraggedItem(null);
    setDraggedOver(null);
    dragCounter.current = 0;
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().match(/\.(pdf|doc|docx)$/)) {
        alert(`File "${file.name}" is not supported. Please upload PDF, DOC, or DOCX files only.`);
        return;
      }

      // Check file size (limit to 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Maximum file size is 10MB.`);
        return;
      }

      const fileExtension = file.name.split('.').pop()?.toLowerCase() as 'pdf' | 'doc' | 'docx';
      const fileSizeKB = file.size / 1024;
      const fileSizeMB = fileSizeKB / 1024;
      const displaySize = fileSizeMB > 1 
        ? `${fileSizeMB.toFixed(1)} MB` 
        : `${fileSizeKB.toFixed(1)} KB`;

      const newDocument: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: fileExtension || 'pdf',
        size: displaySize
      };
      
      setDocuments(prev => [...prev, newDocument]);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddMoreForms = () => {
    // This opens the file picker for real file upload
    fileInputRef.current?.click();
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverUpload(true);
  };

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverUpload(false);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverUpload(false);
    
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Forms & Documents</h1>
        <p className="text-gray-600 mb-6">
          Compile your package by selecting forms and documents from your library or attaching them from your computer.
        </p>
        
        {/* Documents List */}
        <div className="space-y-3 mb-6">
          {documents.map((document, index) => (
            <div
              key={document.id}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, document.id)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, document.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, document.id)}
              className={`
                relative bg-gray-50 border rounded-lg transition-all duration-200 cursor-move
                ${draggedItem === document.id ? 'opacity-50 scale-95' : ''}
                ${draggedOver === document.id && draggedItem !== document.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
                hover:border-gray-300 hover:bg-gray-100
              `}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {/* Drag Handle */}
                  <div className="cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  
                  {/* Document Icon */}
                  <div className="text-gray-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  
                  {/* Document Info */}
                  <div>
                    <p className="text-gray-900 font-medium">{document.name}</p>
                    {document.size && (
                      <p className="text-xs text-gray-500 mt-1">{document.size}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Status */}
                  {document.status && (
                    <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
                      {document.status}
                    </span>
                  )}
                  
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveDocument(document.id)}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Upload Area */}
        <div
          onDragOver={handleFileDragOver}
          onDragLeave={handleFileDragLeave}
          onDrop={handleFileDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
            ${isDragOverUpload 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-500" />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddMoreForms}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Add more forms
              </button>
              
              <span className="text-gray-500">or</span>
              
              <button
                onClick={handleUploadClick}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium transition-colors"
              >
                <Upload className="w-4 h-4" />
                attach a document
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Drag and drop files here or click to browse
            </p>
          </div>
        </div>
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
        
        {/* Helper text */}
        <p className="text-sm text-gray-500 mt-4">
          💡 Drag and drop documents above to reorder them in your package
        </p>
      </div>
    </div>
  );
}