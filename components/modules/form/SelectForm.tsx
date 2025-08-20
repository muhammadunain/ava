'use client'
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { 
  ChevronDown, 
  ChevronRight, 
  File, 
  Folder, 
  FolderOpen,
  Search,
  ArrowLeft,
  X,
  Upload,
  FileText,
  Download
} from 'lucide-react';

// Types
interface FormItem {
  id: string;
  name: string;
  pages: number;
  selected: boolean;
  file?: File;
  fileType?: string;
  size?: number;
}

interface FormCategory {
  id: string;
  name: string;
  expanded: boolean;
  forms: FormItem[];
}

interface DocumentPreview {
  id: string;
  title: string;
  category: string;
  content: string;
  fileType: string;
  file?: File;
}

// Sample data
const initialFormData: FormCategory[] = [
  {
    id: 'commercial',
    name: 'Commercial Forms',
    expanded: true,
    forms: [
      { id: 'cc-optional', name: 'Commercial Contract - Optional Clauses (CC-6)', pages: 3, selected: false },
      { id: 'cc-6', name: 'Commercial Contract_CC-6', pages: 8, selected: true },
      { id: 'cna-1', name: 'Confidentiality and Non-Disclosure Agreement (CNA-1)', pages: 1, selected: false },
      { id: 'ds-5', name: 'Designated Sales Associate (DS-5)', pages: 1, selected: false },
      { id: 'exclusive-right', name: 'Exclusive Right of Sale Listing Agreement Commercial (ER...', pages: 4, selected: false },
      { id: 'exclusive-lease', name: 'Exclusive Right to Lease - Commercial_ERLC-1x', pages: 3, selected: false },
      { id: 'tenant-brokerage', name: 'Exclusive Tenant Brokerage Agreement - Commercial_ET...', pages: 3, selected: false },
      { id: 'vacant-land', name: 'Vacant Land Contract_VLC-14xxxx', pages: 8, selected: false },
    ]
  },
  {
    id: 'disclosures',
    name: 'Disclosures',
    expanded: false,
    forms: [
      { id: 'disclosure-1', name: 'Property Disclosure Statement', pages: 2, selected: false },
      { id: 'disclosure-2', name: 'Lead Paint Disclosure', pages: 1, selected: false },
      { id: 'disclosure-3', name: 'Flood Zone Disclosure', pages: 1, selected: false },
    ]
  },
  {
    id: 'escrow',
    name: 'Escrow forms',
    expanded: false,
    forms: [
      { id: 'escrow-1', name: 'Escrow Instructions', pages: 4, selected: false },
      { id: 'escrow-2', name: 'Escrow Amendment', pages: 2, selected: false },
    ]
  },
  {
    id: 'mars',
    name: 'Mars forms',
    expanded: false,
    forms: [
      { id: 'mars-1', name: 'Mars Transfer Disclosure', pages: 3, selected: false },
      { id: 'mars-2', name: 'Mars Addendum', pages: 2, selected: false },
    ]
  },
  {
    id: 'misc',
    name: 'Miscellaneous',
    expanded: false,
    forms: [
      { id: 'misc-1', name: 'General Release Form', pages: 1, selected: false },
      { id: 'misc-2', name: 'Power of Attorney', pages: 2, selected: false },
      { id: 'misc-3', name: 'Affidavit of Title', pages: 1, selected: false },
    ]
  },
  {
    id: 'leases',
    name: 'Leases and contract',
    expanded: false,
    forms: [
      { id: 'lease-1', name: 'Residential Lease Agreement', pages: 6, selected: false },
      { id: 'lease-2', name: 'Commercial Lease Agreement', pages: 12, selected: false },
      { id: 'lease-3', name: 'Lease Amendment', pages: 2, selected: false },
    ]
  }
];

const sampleDocumentPreview: DocumentPreview = {
  id: 'default-image',
  title: 'Commercial Contract_CC-6',
  category: 'Commercial Forms',
  fileType: 'image/png',
  content: '/image.png'
};

const DocumentFormSelector: React.FC = () => {
  const [formData, setFormData] = useState<FormCategory[]>(initialFormData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<DocumentPreview | null>(sampleDocumentPreview);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // File reading utility functions
  const readFileAsText = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const readFileAsDataURL = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType?.includes('image')) return <FileText className="h-4 w-4 text-green-500" />;
    if (fileType?.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    if (fileType?.includes('text') || fileType?.includes('document')) return <FileText className="h-4 w-4 text-blue-500" />;
    return <File className="h-4 w-4 text-gray-500" />;
  };

  // Handle file upload
  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);

    const newForms: FormItem[] = newFiles.map((file, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      name: file.name,
      pages: 1,
      selected: false,
      file: file,
      fileType: file.type,
      size: file.size
    }));

    setFormData(prev => {
      const existingUploadedCategory = prev.find(cat => cat.id === 'uploaded');
      
      if (existingUploadedCategory) {
        return prev.map(cat => 
          cat.id === 'uploaded' 
            ? { ...cat, forms: [...cat.forms, ...newForms], expanded: true }
            : cat
        );
      } else {
        return [{
          id: 'uploaded',
          name: 'Uploaded Documents',
          expanded: true,
          forms: newForms
        }, ...prev];
      }
    });
  }, []);

  const handlePreviewDocument = async (form: FormItem, categoryName: string) => {
    if (!form.file) {
      // Show default image when no file is selected
      setSelectedDocument({
        id: 'default-image',
        title: 'Default Preview',
        category: 'Preview',
        fileType: 'image/png',
        content: '/image.png'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      let content = '';
      const fileType = form.file.type;

      if (fileType.includes('text') || fileType.includes('javascript') || fileType.includes('json') || fileType.includes('css') || fileType.includes('html')) {
        content = await readFileAsText(form.file);
      } else if (fileType.includes('image')) {
        content = await readFileAsDataURL(form.file);
      } else if (fileType.includes('pdf')) {
        content = 'PDF preview not available. Please download to view the full document.';
      } else {
        try {
          content = await readFileAsText(form.file);
        } catch {
          content = `File type: ${fileType}\nSize: ${(form.file.size / 1024).toFixed(2)} KB\n\nPreview not available for this file type. Please download to view the content.`;
        }
      }

      setSelectedDocument({
        id: form.id,
        title: form.name,
        category: categoryName,
        content: content,
        fileType: fileType,
        file: form.file
      });
    } catch (error) {
      console.error('Error reading file:', error);
      setSelectedDocument({
        id: form.id,
        title: form.name,
        category: categoryName,
        content: 'Error reading file content.',
        fileType: form.file.type,
        file: form.file
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFormData = formData.map(category => ({
    ...category,
    forms: category.forms.filter(form =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.forms.length > 0);

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => prev.map(category =>
      category.id === categoryId
        ? { ...category, expanded: !category.expanded }
        : category
    ));
  };

  const toggleFormSelection = (categoryId: string, formId: string) => {
    setFormData(prev => prev.map(category =>
      category.id === categoryId
        ? {
          ...category,
          forms: category.forms.map(form =>
            form.id === formId
              ? { ...form, selected: !form.selected }
              : form
          )
        }
        : category
    ));
  };

  const getSelectedCount = () => {
    return formData.reduce((total, category) =>
      total + category.forms.filter(form => form.selected).length, 0
    );
  };

  const selectedCount = getSelectedCount();

  const renderDocumentContent = (document: DocumentPreview) => {
    if (document.fileType?.includes('image') || document.content === '/image.png') {
      return (
        <div className="flex justify-center p-4 w-full h-auto">
          <Image 
            src={document.content} 
            width={800} 
            height={800} 
            className='object-cover w-lg' 
            alt='image'
          />
        </div>
      );
    }

    return (
      <div className="p-4">
        <div className=" shadow-sm   mx-auto">
          <div className="p-6 text-sm leading-6 font-mono">
            <pre className="whitespace-pre-wrap">
              {document.content}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen ">
      {/* Left Sidebar */}
      <div className="w-2xl bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between  ">
            <h2 className="text-xl font-semibold text-gray-800">Select Forms</h2>
           
         <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
          </div>
          
          {/* Upload Area */}

          {/* Search */}
         
        </div>

        {/* Breadcrumbs */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 cursor-pointer hover:underline font-medium">FAR</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">NABOR MLS</span>
          </div>
        </div>

        {/* Form List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {filteredFormData.map((category) => (
              <div key={category.id} className="mb-2">
                {/* Category Header */}
                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.expanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  )}
                  {category.expanded ? (
                    <FolderOpen className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Folder className="h-4 w-4 text-blue-500" />
                  )}
                  <span className="font-medium text-sm text-gray-700">{category.name}</span>
                </div>

                {/* Form Items */}
                {category.expanded && (
                  <div className="ml-6 mt-1">
                    {category.forms.map((form) => (
                      <div
                        key={form.id}
                        className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={form.selected}
                          onChange={() => toggleFormSelection(category.id, form.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        
                        {form.file ? getFileIcon(form.fileType || '') : 
                          <File className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        }
                        
                        <div className="flex-1 min-w-0">
                          <div 
                            className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors truncate"
                            onClick={() => handlePreviewDocument(form, category.name)}
                            title={form.name}
                          >
                            {form.name}
                          </div>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-xs text-gray-500">
                              {form.pages} page{form.pages !== 1 ? 's' : ''}
                              {form.size && ` • ${formatFileSize(form.size)}`}
                            </span>
                            {form.file && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadFile(form.file!);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                              >
                                <Download className="h-3 w-3 text-gray-500" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Selected:</span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {selectedCount}
              </span>
            </div>
          </div>
          <button 
            className={`w-full py-2 px-4 rounded font-medium transition-colors ${
              selectedCount === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={selectedCount === 0}
          >
            Select ({selectedCount})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ">
        {selectedDocument ? (
          <>
            {/* Document Header */}
            <div className=" border-b border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 mb-1">
                    {selectedDocument.title}
                  </h1>
                  <div className="flex items-center ">
                    <FolderOpen className='w-5 h-5 text-gray-400'/>
                    <span className=" text-gray-500 text-sm px-2 py-1 font-medium">
                      {selectedDocument.category}
                    </span>
                    {selectedDocument.file && (
                      <>
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {selectedDocument.fileType}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {formatFileSize(selectedDocument.file.size)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedDocument.file && (
                    <button
                      onClick={() => downloadFile(selectedDocument.file!)}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading document...</p>
                  </div>
                </div>
              ) : (
                renderDocumentContent(selectedDocument)
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Document Selected</h3>
              <p className="text-gray-500">Select a document from the left panel to preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentFormSelector;