'use client'
import React, { useState, useCallback } from 'react';
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
  Image as ImageIcon,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
      { id: 'exclusive-right', name: 'Exclusive Right of Sale Listing Agreement Commercial (FL...', pages: 4, selected: false },
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
  id: 'cc-6',
  title: 'Commercial Contract_CC-6',
  category: 'Commercial Forms',
  fileType: 'application/pdf',
  content: `ATTENTION: SELLER AND BUYER

COVENANTS TO FOREIGN BUYERS: Part III of Chapter 692, Sections 692.201 – 692.205, Florida Statutes 2023 (the "Act"), in part, limits and regulates the sale, ownership or ownership of certain Foreign ownership by certain buyers who are not United States citizens or permanent resident aliens, and requires certain disclosures in connection with certain real estate transactions. The Act requires parties to a residential real estate transaction to disclose to the Registrar of Titles, the Clerk of the Court, the Department of State, the Registrar of the State, the Registrar of Titles of the Recorder of Deeds, and the Secretary of State whether there is a time to sign or return this agreement on property in violation of the Act.

All time of purchase, Buyer must provide a signed affidavit which complies with the requirements of the Act. Seller and Buyer are advised to seek legal counsel regarding their respective obligations and liabilities under the Act.

Seller's Signature                    (Date)        Buyer's Signature                    (Date)
Joy Christopher Wagner                             Jeff Gilbert
(Buyer's Printed Name)                            (Buyer's Printed Name)

Seller's Signature                    (Date)        Buyer's Signature                    (Date)
Wanda Lynn Wagner                                  Kimberly Gilbert
(Seller's Printed Name)                           (Buyer's Printed Name)

607   MILLION square BUYER'S offer on                                    (Insert Date)

608

609                                   (Seller's Signature)               (Seller's Signature)

610                                   IDENTIFICATION OR BUSINESS AND LICENSURE

611   Listing Brokerage: Stephen Reynolds           Buyer's Brokerage: Stephen Holmes

612   Listing Licensee: Ryan McNamee                Buyer's Licensee: Faye Gilbert

613   IDENTIFICATION OF ESCROW AGENT Escrow Agent's Name: Jodi Roebuck

614   Escrow Agent Address: 8434 Bryden Unit C-1-100, Naples, FL 34105

615   Escrow Agent Telephone: (239) 594-8636                            Email:

616   THIS CONTRACT SHALL NOT MODIFY THE LISTING CONTRACT OR OTHER OFFER OR COMPENSATION MADE BY
617   SELLER OR LISTING BROKER TO BUYER'S BROKER.

© 2021 Naples Area Board of REALTORS® and Statewide Form of Real Estate Professionals, Inc. All Rights Reserved. NMBOR 10/2021E
Approved by the Real Estate Law Committee of NMBOR. Use of this form is restricted by the Association. Page 13 of 13`
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
    if (fileType?.includes('image')) return <ImageIcon className="h-4 w-4 text-green-500" />;
    if (fileType?.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    if (fileType?.includes('text') || fileType?.includes('document')) return <FileText className="h-4 w-4 text-blue-500" />;
    return <File className="h-4 w-4 text-gray-500" />;
  };

  // Handle file upload
  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Add files to the appropriate categories
    const newForms: FormItem[] = newFiles.map((file, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      name: file.name,
      pages: 1, // Default, could be calculated for PDFs
      selected: false,
      file: file,
      fileType: file.type,
      size: file.size
    }));

    // Add to "Uploaded Documents" category
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

  // Handle form preview with actual file reading
  const handlePreviewDocument = async (form: FormItem, categoryName: string) => {
    if (!form.file) {
      // Handle non-uploaded files (use sample data)
      setSelectedDocument(sampleDocumentPreview);
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
        // For other file types, try to read as text
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

  // Filter forms based on search term
  const filteredFormData = formData.map(category => ({
    ...category,
    forms: category.forms.filter(form =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.forms.length > 0);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setFormData(prev => prev.map(category =>
      category.id === categoryId
        ? { ...category, expanded: !category.expanded }
        : category
    ));
  };

  // Toggle form selection
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

  // Get selected forms count
  const getSelectedCount = () => {
    return formData.reduce((total, category) =>
      total + category.forms.filter(form => form.selected).length, 0
    );
  };

  const selectedCount = getSelectedCount();

  // Render document content based on file type
  const renderDocumentContent = (document: DocumentPreview) => {
    if (document.fileType?.includes('image')) {
      return (
        <div className="flex justify-center p-4">
          <img 
            src={document.content} 
            alt={document.title}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      );
    }

    if (document.fileType?.includes('pdf')) {
      return (
        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm min-h-[600px]">
            <div className="p-6">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                {document.content}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    // For text-based files
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
              {document.content}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar with form list */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Select Forms</h2>
          
          {/* File upload area */}
          <div className="mb-4">
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
              accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.json,.js,.css,.html,.xml,.csv"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <Upload className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Upload Documents</span>
            </label>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Navigation breadcrumbs */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 cursor-pointer hover:underline">FAR</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">NABOR MLS</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {filteredFormData.map((category) => (
              <div key={category.id} className="mb-4">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  {category.expanded ? (
                    <FolderOpen className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Folder className="h-4 w-4 text-blue-500" />
                  )}
                  <span className="font-medium text-sm">{category.name}</span>
                </div>

                {category.expanded && (
                  <div className="ml-6 mt-2 space-y-2">
                    {category.forms.map((form) => (
                      <div
                        key={form.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                      >
                        <Checkbox
                          checked={form.selected}
                          onCheckedChange={() => toggleFormSelection(category.id, form.id)}
                        />
                        {form.file ? getFileIcon(form.fileType || '') : <File className="h-4 w-4 text-gray-500 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div 
                            className="text-sm text-gray-700 truncate cursor-pointer hover:text-blue-600"
                            onClick={() => handlePreviewDocument(form, category.name)}
                          >
                            {form.name}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              {form.pages} page{form.pages !== 1 ? 's' : ''}
                              {form.size && ` • ${formatFileSize(form.size)}`}
                            </span>
                            {form.file && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadFile(form.file!);
                                }}
                              >
                                <Download className="h-3 w-3" />
                              </Button>
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
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Selected:</span>
              <Badge variant="secondary">{selectedCount}</Badge>
            </div>
          </div>
          <Button className="w-full" disabled={selectedCount === 0}>
            Select ({selectedCount})
          </Button>
        </div>
      </div>

      {/* Document preview */}
      <div className="flex-1 flex flex-col">
        {selectedDocument ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold">{selectedDocument.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{selectedDocument.category}</Badge>
                    {selectedDocument.file && (
                      <>
                        <Badge variant="secondary">{selectedDocument.fileType}</Badge>
                        <Badge variant="outline">{formatFileSize(selectedDocument.file.size)}</Badge>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedDocument.file && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(selectedDocument.file!)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="max-w-4xl mx-auto">
                {isLoading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading document...</p>
                  </div>
                ) : (
                  renderDocumentContent(selectedDocument)
                )}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
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