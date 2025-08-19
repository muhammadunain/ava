'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  Type,
  DollarSign,
  PenTool,
  CheckSquare,
  FileSignature,
  Link,
  Edit3,
  Calendar,
  Save,
  ChevronDown,
  Send,
  Download,
  Printer,
  Trash2,
  Upload,
  X,
  MousePointer
} from 'lucide-react';

interface FormElement {
  id: string;
  type: 'text' | 'money' | 'checkbox' | 'signature' | 'initials' | 'date';
  x: number;
  y: number;
  value: string | boolean;
  isEditing?: boolean;
}

const PDFormedit: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [pdfFile, setPdfFile] = useState<string>('/sales.pdf');
  const [activeElements, setActiveElements] = useState<FormElement[]>([]);
  const [elementCounter, setElementCounter] = useState(0);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false); // Toggle between PDF interaction and form editing
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'money', icon: DollarSign, label: 'Money' },
    { id: 'stroke', icon: PenTool, label: 'Stroke' },
    { id: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
    { id: 'signature', icon: FileSignature, label: 'Signature' },
    { id: 'initials', icon: Link, label: 'Initials' },
    { id: 'edit', icon: Edit3, label: 'Edit' },
    { id: 'date', icon: Calendar, label: 'Date/Time' },
  ];

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 ${
      type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);
      setActiveElements([]);
      showToast('PDF uploaded successfully!');
    } else {
      showToast('Please upload a PDF file only', 'error');
    }
  }, []);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Toggle between PDF interaction and form editing modes
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedTool(''); // Clear selected tool when toggling
    showToast(editMode ? 'PDF interaction enabled' : 'Form editing enabled', 'info');
  };

  const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks when in edit mode and a tool is selected
    if (!editMode || !selectedTool || draggedElement) return;
    
    const target = event.target as HTMLElement;
    if (target.closest('.form-element')) return;
    
    if (['text', 'money', 'signature', 'initials', 'date', 'checkbox'].includes(selectedTool)) {
      event.preventDefault();
      event.stopPropagation();
      
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newElement: FormElement = {
        id: `element-${elementCounter}`,
        type: selectedTool as FormElement['type'],
        x,
        y,
        value: getDefaultValue(selectedTool),
        isEditing: selectedTool !== 'checkbox'
      };

      setActiveElements(prev => [...prev, newElement]);
      setElementCounter(prev => prev + 1);
      showToast(`${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} field added!`);
    }
  }, [editMode, selectedTool, draggedElement, elementCounter]);

  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    if (!editMode) return;
    e.stopPropagation();
    const element = activeElements.find(el => el.id === elementId);
    if (!element) return;

    setDraggedElement(elementId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [editMode, activeElements]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode || !draggedElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setActiveElements(prev => prev.map(el =>
      el.id === draggedElement ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) } : el
    ));
  }, [editMode, draggedElement, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedElement(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const getDefaultValue = (type: string): string => {
    switch(type) {
      case 'text': return 'Text here';
      case 'money': return '$0.00';
      case 'signature': return 'Your Signature';
      case 'initials': return 'AB';
      case 'date': return new Date().toLocaleDateString();
      case 'checkbox': return 'false';
      default: return '';
    }
  };

  const updateElement = useCallback((id: string, value: string) => {
    setActiveElements(prev => prev.map(el =>
      el.id === id ? { ...el, value, isEditing: false } : el
    ));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setActiveElements(prev => prev.filter(el => el.id !== id));
    showToast('Element deleted');
  }, []);

  const toggleCheckbox = useCallback((id: string) => {
    setActiveElements(prev => prev.map(el =>
      el.id === id ? { ...el, value: el.value === 'true' ? 'false' : 'true' } : el
    ));
  }, []);

  const handleSaveAction = async (action: string) => {
    setShowSaveMenu(false);
    
    switch(action) {
      case 'esign':
        showToast('Preparing for E-sign...', 'info');
        break;
        
      case 'download':
        await downloadFilledPDF();
        break;
        
      case 'print':
        window.print();
        showToast('Opening print dialog...', 'info');
        break;
        
      case 'discard':
        setActiveElements([]);
        setSelectedTool('');
        showToast('Changes discarded');
        break;
    }
  };

  const downloadFilledPDF = async () => {
    try {
      setIsLoading(true);
      showToast('Preparing PDF download...', 'info');
      
      const formData = activeElements.map(el => 
        `${el.type.toUpperCase()}: ${el.value} (Position: ${Math.round(el.x)}, ${Math.round(el.y)})`
      ).join('\n');
      
      const content = `PDF Form Data\n${'='.repeat(20)}\n\n${formData || 'No form fields added'}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'form-data.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Form data downloaded!');
    } catch (error) {
      console.error('Error downloading:', error);
      showToast('Failed to download. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderElement = (element: FormElement) => {
    if (!editMode) return null; // Hide overlay elements when not in edit mode
    
    const commonClasses = "form-element absolute border border-blue-300 bg-white bg-opacity-90 backdrop-blur-sm rounded px-2 py-1 text-sm shadow-lg cursor-move select-none z-10";
    const isDragging = draggedElement === element.id;

    const baseStyle = {
      left: element.x,
      top: element.y,
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      transition: isDragging ? 'none' : 'transform 0.1s ease'
    };

    switch(element.type) {
      case 'text':
        return element.isEditing ? (
          <input
            key={element.id}
            type="text"
            defaultValue={element.value as string}
            className="absolute border-2 border-blue-500 bg-white rounded px-2 py-1 text-sm shadow-lg z-20 min-w-20"
            style={baseStyle}
            onBlur={(e) => updateElement(element.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateElement(element.id, (e.target as HTMLInputElement).value);
              } else if (e.key === 'Escape') {
                updateElement(element.id, element.value as string);
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-blue-500 hover:shadow-xl`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(prev => prev.map(el =>
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value || 'Text'}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );

      case 'money':
        return element.isEditing ? (
          <input
            key={element.id}
            type="text"
            defaultValue={element.value as string}
            className="absolute border-2 border-green-500 bg-white rounded px-2 py-1 text-sm shadow-lg z-20 min-w-20"
            style={baseStyle}
            onBlur={(e) => {
              let value = e.target.value;
              if (!value.startsWith('$')) value = '$' + value;
              updateElement(element.id, value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                let value = (e.target as HTMLInputElement).value;
                if (!value.startsWith('$')) value = '$' + value;
                updateElement(element.id, value);
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-green-500 text-green-700 font-semibold hover:shadow-xl`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(prev => prev.map(el =>
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value || '$0.00'}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );

      case 'checkbox':
        return (
          <div
            key={element.id}
            className={`${commonClasses} group flex items-center hover:border-gray-500 hover:shadow-xl w-auto`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            <div
              className={`w-5 h-5 border-2 border-gray-400 rounded mr-2 flex items-center justify-center cursor-pointer transition-all ${
                element.value === 'true' ? 'bg-blue-500 border-blue-500' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={(e) => { e.stopPropagation(); toggleCheckbox(element.id); }}
            >
              {element.value === 'true' && <span className="text-white text-sm font-bold">✓</span>}
            </div>
            <span className="text-xs font-medium">Check</span>
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );

      case 'signature':
        return element.isEditing ? (
          <input
            key={element.id}
            type="text"
            defaultValue={element.value as string}
            className="absolute border-2 border-purple-500 bg-white rounded px-2 py-1 text-sm shadow-lg z-20 italic min-w-32"
            style={baseStyle}
            onBlur={(e) => updateElement(element.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateElement(element.id, (e.target as HTMLInputElement).value);
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
            placeholder="Enter signature"
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-purple-500 italic font-medium text-purple-700 hover:shadow-xl min-w-32 text-center`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(prev => prev.map(el =>
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value || 'Signature'}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );

      case 'initials':
        return element.isEditing ? (
          <input
            key={element.id}
            type="text"
            defaultValue={element.value as string}
            className="absolute border-2 border-orange-500 bg-white rounded px-2 py-1 text-sm shadow-lg z-20 w-16 text-center font-bold"
            style={baseStyle}
            onBlur={(e) => updateElement(element.id, e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateElement(element.id, (e.target as HTMLInputElement).value.toUpperCase());
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
            maxLength={4}
            placeholder="AB"
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-orange-500 w-16 text-center font-bold text-orange-700 hover:shadow-xl`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(prev => prev.map(el =>
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value || 'AB'}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );

      case 'date':
        return element.isEditing ? (
          <input
            key={element.id}
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="absolute border-2 border-teal-500 bg-white rounded px-2 py-1 text-sm shadow-lg z-20"
            style={baseStyle}
            onBlur={(e) => updateElement(element.id, new Date(e.target.value).toLocaleDateString())}
            onChange={(e) => updateElement(element.id, new Date(e.target.value).toLocaleDateString())}
            autoFocus
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-teal-500 text-teal-700 font-medium hover:shadow-xl`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(prev => prev.map(el =>
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value || new Date().toLocaleDateString()}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Professional Toolbar */}
      <div className="bg-white border-b border-gray-300 px-6 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-6">
          <button
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => window.history.back()}
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Mode Toggle Button */}
          <button
            onClick={toggleEditMode}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 font-medium transition-all ${
              editMode
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={editMode ? 'Switch to PDF interaction' : 'Switch to form editing'}
          >
            <MousePointer className="w-4 h-4" />
            <span>{editMode ? 'Edit Mode' : 'PDF Mode'}</span>
          </button>

          {/* Tools - Only show when in edit mode */}
          {editMode && (
            <div className="flex items-center space-x-0 bg-gray-100 rounded-lg p-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(selectedTool === tool.id ? '' : tool.id)}
                  className={`px-3 py-2 rounded-md flex flex-col items-center min-w-[64px] text-xs font-medium transition-all ${
                    selectedTool === tool.id
                      ? 'bg-white shadow-md text-gray-900 border border-gray-200'
                      : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                  }`}
                  title={`Add ${tool.label} field`}
                >
                  <tool.icon className="w-4 h-4 mb-1" />
                  <span>{tool.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={triggerFileUpload}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Upload New PDF"
          >
            <Upload className="w-5 h-5 text-gray-600" />
          </button>

          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors" title="Help">
            <span className="text-sm font-medium text-blue-700">?</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSaveMenu(!showSaveMenu)}
              className="bg-black text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition-colors text-sm font-medium"
              disabled={isLoading}
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Processing...' : 'save & close'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSaveMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                <button
                  onClick={() => handleSaveAction('esign')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors text-sm"
                >
                  <Send className="w-4 h-4 text-gray-500" />
                  <span>Send for eSign</span>
                </button>
                <button
                  onClick={() => handleSaveAction('download')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors text-sm"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => handleSaveAction('print')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors text-sm"
                >
                  <Printer className="w-4 h-4 text-gray-500" />
                  <span>Print</span>
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={() => handleSaveAction('discard')}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-3 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Discard Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - PDF Viewer */}
      <div className="flex-1 p-2 flex justify-center">
        <div className="w-full">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Status Bar */}
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  editMode ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {editMode ? 'Form Editing Mode' : 'PDF Interaction Mode'}
                </div>
                {activeElements.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {activeElements.length} field{activeElements.length !== 1 ? 's' : ''} added
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {editMode ? 
                  (selectedTool ? `Selected: ${selectedTool}` : 'Select a tool to add fields') : 
                  'Click and type in PDF form fields'
                }
              </div>
            </div>

            {/* PDF Container */}
            <div
              ref={pdfContainerRef}
              className="relative bg-white min-h-[800px] overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* PDF Embed */}
              <iframe
                src={`${pdfFile}#toolbar=0&navpanes=0&scrollbar=0&zoom=100`}
                className={`w-full h-full min-h-[800px] ${editMode ? 'pointer-events-none' : 'pointer-events-auto'}`}
                style={{ border: 'none' }}
                title="PDF Document"
              />

              {/* Overlay for form editing - only active in edit mode */}
              {editMode && (
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="w-full h-full pointer-events-auto" 
                    style={{ 
                      background: 'transparent',
                      cursor: selectedTool && ['text', 'money', 'signature', 'initials', 'date', 'checkbox'].includes(selectedTool) 
                        ? 'crosshair' 
                        : draggedElement ? 'grabbing' : 'default'
                    }}
                    onClick={handleOverlayClick}
                  >
                    {/* Render active elements */}
                    {activeElements.map(renderElement)}
                  </div>
                </div>
              )}

              {/* Helper text when tool is selected */}
              {editMode && selectedTool && ['text', 'money', 'signature', 'initials', 'date', 'checkbox'].includes(selectedTool) && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-30 pointer-events-none">
                  Click to place {selectedTool} field
                </div>
              )}
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Backdrop for closing menus */}
      {showSaveMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSaveMenu(false)}
        />
      )}

      {/* Instructions */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-500 text-center">
            <strong>Instructions:</strong> 
            {editMode ? (
              <>Select a tool from the toolbar, then click on the PDF to place fields. Double-click fields to edit, drag to move, or click × to delete.</>
            ) : (
              <>Click and type directly in the PDF's fillable form fields. Toggle to "Edit Mode" to add custom overlay fields.</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFormedit;