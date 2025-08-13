'use client'
import React, { useState, useRef } from 'react';
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
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const PDFViewerEditor = () => {
  const [selectedTool, setSelectedTool] = useState('');
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showDocument, setShowDocument] = useState(true); // Show document by default
  const [activeElements, setActiveElements] = useState<Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    value: string;
    isEditing: boolean;
  }>>([]);
  const [elementCounter, setElementCounter] = useState(0);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setShowDocument(true);
    } else {
      alert('Please upload a PDF file only');
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDocumentClick = (event: React.MouseEvent) => {
    if (draggedElement) return; // Don't add elements while dragging
    
    if (selectedTool && (selectedTool === 'text' || selectedTool === 'money' || selectedTool === 'signature' || selectedTool === 'initials' || selectedTool === 'date' || selectedTool === 'checkbox')) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newElement = {
        id: `element-${elementCounter}`,
        type: selectedTool,
        x,
        y,
        value: getDefaultValue(selectedTool),
        isEditing: selectedTool !== 'checkbox'
      };
      
      setActiveElements([...activeElements, newElement]);
      setElementCounter(elementCounter + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    const element = activeElements.find(el => el.id === elementId);
    if (!element) return;

    setDraggedElement(elementId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setActiveElements(activeElements.map(el => 
      el.id === draggedElement ? { ...el, x: newX, y: newY } : el
    ));
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const getDefaultValue = (type: string) => {
    switch(type) {
      case 'text': return 'Text here';
      case 'money': return '$0.00';
      case 'signature': return 'Your Signature';
      case 'initials': return 'AB';
      case 'date': return new Date().toLocaleDateString();
      default: return '';
    }
  };

  const updateElement = (id: string, value: string) => {
    setActiveElements(activeElements.map(el => 
      el.id === id ? { ...el, value, isEditing: false } : el
    ));
  };

  const deleteElement = (id: string) => {
    setActiveElements(activeElements.filter(el => el.id !== id));
  };

  const toggleCheckbox = (id: string) => {
    setActiveElements(activeElements.map(el => 
      el.id === id ? { ...el, value: el.value === 'true' ? 'false' : 'true' } : el
    ));
  };

  const handleSaveAction = (action: string) => {
    setShowSaveMenu(false);
    switch(action) {
      case 'esign':
        toast.success('Sending for E-sign')
      router.push('/')
        break;
      case 'download':
        alert('Downloading document...');
        break;
      case 'print':
        window.print();
        break;
      case 'discard':
        setActiveElements([]);
        break;
    }
  };

  const renderElement = (element: any) => {
    const commonClasses = "absolute border border-blue-300 bg-white rounded px-2 py-1 text-sm shadow-sm cursor-move select-none";
    const isDragging = draggedElement === element.id;
    
    switch(element.type) {
      case 'text':
        return element.isEditing ? (
          <input
            key={element.id}
            type="text"
            defaultValue={element.value}
            className="absolute border border-blue-500 bg-white rounded px-2 py-1 text-sm shadow-md z-10"
            style={{ left: element.x, top: element.y }}
            onBlur={(e) => updateElement(element.id, e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && updateElement(element.id, (e.target as HTMLInputElement).value)}
            autoFocus
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-blue-500 ${isDragging ? 'shadow-lg z-20' : ''}`}
            style={{ left: element.x, top: element.y }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(activeElements.map(el => 
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
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
            defaultValue={element.value}
            className="absolute border border-green-500 bg-white rounded px-2 py-1 text-sm shadow-md z-10"
            style={{ left: element.x, top: element.y }}
            onBlur={(e) => updateElement(element.id, e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && updateElement(element.id, (e.target as HTMLInputElement).value)}
            autoFocus
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-green-500 text-green-700 font-semibold ${isDragging ? 'shadow-lg z-20' : ''}`}
            style={{ left: element.x, top: element.y }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(activeElements.map(el => 
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      
      case 'checkbox':
        return (
          <div
            key={element.id}
            className={`${commonClasses} group flex items-center hover:border-gray-500 ${isDragging ? 'shadow-lg z-20' : ''}`}
            style={{ left: element.x, top: element.y }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            <div 
              className={`w-4 h-4 border border-gray-400 rounded mr-2 flex items-center justify-center cursor-pointer ${
                element.value === 'true' ? 'bg-blue-500 border-blue-500' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={(e) => { e.stopPropagation(); toggleCheckbox(element.id); }}
            >
              {element.value === 'true' && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <span className="text-xs">Check</span>
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
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
            defaultValue={element.value}
            className="absolute border border-purple-500 bg-white rounded px-2 py-1 text-sm shadow-md z-10 italic"
            style={{ left: element.x, top: element.y }}
            onBlur={(e) => updateElement(element.id, e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && updateElement(element.id, (e.target as HTMLInputElement).value)}
            autoFocus
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-purple-500 italic font-script text-purple-700 ${isDragging ? 'shadow-lg z-20' : ''}`}
            style={{ left: element.x, top: element.y }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(activeElements.map(el => 
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
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
            defaultValue={element.value}
            className="absolute border border-orange-500 bg-white rounded px-2 py-1 text-sm shadow-md z-10 w-16 text-center"
            style={{ left: element.x, top: element.y }}
            onBlur={(e) => updateElement(element.id, e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && updateElement(element.id, (e.target as HTMLInputElement).value)}
            autoFocus
            maxLength={3}
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-orange-500 w-16 text-center font-bold text-orange-700 ${isDragging ? 'shadow-lg z-20' : ''}`}
            style={{ left: element.x, top: element.y }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(activeElements.map(el => 
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
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
            className="absolute border border-teal-500 bg-white rounded px-2 py-1 text-sm shadow-md z-10"
            style={{ left: element.x, top: element.y }}
            onBlur={(e) => updateElement(element.id, new Date(e.target.value).toLocaleDateString())}
            autoFocus
          />
        ) : (
          <div
            key={element.id}
            className={`${commonClasses} group hover:border-teal-500 text-teal-700 ${isDragging ? 'shadow-lg z-20' : ''}`}
            style={{ left: element.x, top: element.y }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => setActiveElements(activeElements.map(el => 
              el.id === element.id ? { ...el, isEditing: true } : el
            ))}
          >
            {element.value}
            <button
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
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
      {/* Header - Matching exact design */}
      <div className="bg-white border-b border-gray-300 px-6 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-6">
          <button 
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Tools - Exact spacing and styling */}
          <div className="flex items-center space-x-0 bg-gray-100 rounded-md p-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(selectedTool === tool.id ? '' : tool.id)}
                className={`px-3 py-2 rounded-sm flex flex-col items-center min-w-[64px] text-xs font-medium transition-all ${
                  selectedTool === tool.id 
                    ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                <tool.icon className="w-4 h-4 mb-1" />
                <span>{tool.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={triggerFileUpload}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Upload PDF"
          >
            <Upload className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-sm font-medium text-gray-700">?</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowSaveMenu(!showSaveMenu)}
              className="bg-black text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              <span>save & close</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showSaveMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
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

      {/* Main Content - Shows document by default */}
      <div className="flex-1 bg-gray-100 p-8 flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Document Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Buyer - Broker Agreement, property specific</h2>
              <p className="text-sm text-gray-500 mt-1">3 pages</p>
            </div>

            {/* Document Content */}
            <div 
              className="p-8 space-y-3 text-sm leading-relaxed relative bg-white min-h-[800px]"
              onClick={handleDocumentClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ cursor: selectedTool ? 'crosshair' : 'default' }}
            >
              {/* Render active elements */}
              {activeElements.map(renderElement)}

              <div className="space-y-3 text-gray-800">
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">529</span>
                  <p className="flex-1">to SELLER's obligation to vacate the Property and give access and possession to BUYER once the closing agent has confirmed in writing that the closing agent has initiated the disbursement of SELLER's proceeds and officially declared the transaction closed.</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">530</span>
                  <p className="flex-1"><strong>STANDARD S—FinCEN GTO REPORTING OBLIGATION.</strong> If the closing agent is required to comply with a U.S. Treasury Department's</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">531</span>
                  <p className="flex-1">Financial Crimes Enforcement Network ("FinCEN") Geographic Targeting Order ("GTO"), then BUYER shall provide the closing agent with such</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">532</span>
                  <p className="flex-1">information and documentation related to BUYER and its Beneficial Owners, including photo identification, which are requested by the closing</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">533</span>
                  <p className="flex-1">agent to prepare and submit the FinCEN Beneficial Ownership Information Report. BUYER consents to the closing agent's collection and reporting of such</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">534</span>
                  <p className="flex-1">information to the IRS.</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">535</span>
                  <p className="flex-1"><strong>STANDARD T—NEGOTIATED TERMS; REPRESENTATIONS.</strong> Any and all terms negotiated between the parties must be written into this</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">536</span>
                  <p className="flex-1">Contract. BUYER's decision to buy was based upon BUYER's own investigations of the Property. BUYER holds the broker(s) harmless from all</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">537</span>
                  <p className="flex-1">liability or loss caused by SELLER's failure to disclose any material fact in accordance with this Contract, or SELLER's representations regarding</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">538</span>
                  <p className="flex-1">the Property's condition, or from broker's referral, recommendation, or retention of any vendor. The parties agree that assistance to a party by a</p>
                </div>
                
                <div className="flex">
                  <span className="w-8 text-gray-400 text-xs">539</span>
                  <p className="flex-1">broker does not, and will not, make the broker a party to this Contract or result in legal performance.</p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex">
                    <span className="w-8 text-gray-400 text-xs">553</span>
                    <p className="flex-1"><strong>OTHER TERMS AND CONDITIONS:</strong></p>
                  </div>
                  
                  <div className="flex">
                    <span className="w-8 text-gray-400 text-xs">554</span>
                    <div className="flex-1">
                      <p className="border-b border-gray-300 pb-1">This contract includes Boat Slip #45 and Garage #153.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <span className="w-8 text-gray-400 text-xs">555</span>
                    <div className="flex-1">
                      <div className="border-b border-gray-300 h-4"></div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <span className="w-8 text-gray-400 text-xs">556</span>
                    <div className="flex-1">
                      <p className="border-b border-gray-300 pb-1">Total realtor fee will be 2.5% paid to Naples Homes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Click outside to close save menu */}
      {showSaveMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowSaveMenu(false)}
        />
      )}
    </div>
  );
};

export default PDFViewerEditor;