import React, { useState, useCallback } from 'react';
import { Upload, X, File, Trash2 } from 'lucide-react';

// shadcn/ui components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  type: string;
  file?: File; // Optional for demo purposes
}

const UploadDocumentsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
 const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    // Demo file for display
    {
      id: 1,
      name: 'Sales Contract (Residential Improved Property)',
      size: 534000, // ~534 KB
      type: 'application/pdf'
    }
  ]);  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Handle file selection
  const handleFileSelect = (files:any) => {
    const newFiles:any = Array.from(files).map((file:any, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  // Format file size
  const formatFileSize = (bytes:any) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Handle drag events
  const handleDragOver = useCallback((e:any) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e:any) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e:any) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, []);

  // Handle file input change
  const handleInputChange = (e:any) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  // Remove file
  const removeFile = (fileId:any) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Get file icon based on type
  const getFileIcon = (type:any) => {
    return <File className="w-4 h-4 text-blue-500" />;
  };

  const resetModal = () => {
    setUploadedFiles([]);
    setIsDragOver(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetModal();
  };

  return (
    <div  >
      {/* Demo button to open modal */}
      <Button variant={'ghost'} className='text-gray-900  bg-[#f4f4f599] rounded-sm text-sm font-medium  cursor-pointer' onClick={() => setIsOpen(true)}>
         Upload 
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-full">
          <DialogHeader className="flex flex-row items-center justify-between w-full ">
            <DialogTitle className='font-bold text-2xl'>Upload Documents</DialogTitle>
          
          </DialogHeader>

          <div className="space-y-4">
            {/* Upload Area */}
            <div
              className={`
                relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png,.gif"
              />
              
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-sm text-blue-600 font-medium cursor-pointer">
                  Click to Upload or drag and drop
                </div>
                <div className="text-xs text-gray-500">
                  (Max File Size: 25MB)
                </div>
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          534 KB
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
             
              <Button
                onClick={() => {
                  // Handle upload logic here
                  console.log('Uploading files:', uploadedFiles);
                  handleClose();
                }}
                disabled={uploadedFiles.length === 0}
              >
                Next →
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadDocumentsModal;