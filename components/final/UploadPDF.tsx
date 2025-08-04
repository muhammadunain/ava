import React, { useState, useCallback } from 'react'
import { X, Upload, FileText, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

type TransactionSide = 'buying' | 'listing' | 'both'

interface UploadedFile {
  name: string
  size: string
}

export default function TransactionModalComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSide, setSelectedSide] = useState<TransactionSide>('both')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>({
    name: "Sales Contract (Residential Improved Property)",
    size: "0.34 MB"
  })
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      })
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      })
    }
  }, [])

  const removeFile = () => {
    setUploadedFile(null)
  }

  const handleStartIntake = () => {
    console.log('Starting intake with:', { selectedSide, uploadedFile })
    setIsModalOpen(false)
    // alert(`Starting intake for ${selectedSide} transaction with file: ${uploadedFile?.name || 'No file'}`)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="">
      {/* New Transaction Button */}
      <div className="text-center">
        <Button 
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-900 hover:bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
      >
        <span className="text-lg">+</span>
        <span>New Transaction</span>
      </Button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative max-w-2xl w-full mx-4 bg-white rounded-lg shadow-xl border-0 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome back, Dave! Ready for your next transaction?
              </h2>
              <button
                onClick={closeModal}
                className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Step 1 */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-sm font-medium text-gray-600 mt-0.5">1.</span>
                  <p className="text-sm text-gray-600">
                    Tell me which side you represent (buying, listing, or both)
                  </p>
                </div>

                {/* Transaction Type Buttons */}
                <div className="flex space-x-3 ml-5">
                  <button
                    onClick={() => setSelectedSide('buying')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedSide === 'buying'
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    Buying
                  </button>
                  <button
                    onClick={() => setSelectedSide('listing')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedSide === 'listing'
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    Listing
                  </button>
                  <button
                    onClick={() => setSelectedSide('both')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedSide === 'both'
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <span className="text-sm font-medium text-gray-600 mt-0.5">2.</span>
                  <p className="text-sm text-gray-600">
                    Upload the signed purchase agreement and any counter-offers or addenda.
                  </p>
                </div>

                <p className="text-sm text-gray-500 ml-5">
                  I'll create the file, timeline, and starter task list for you to review.
                </p>

                {/* Upload Area */}
                <div className="ml-5">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors relative ${
                      isDragOver
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center space-x-2">
                        <Upload className="h-5 w-5 text-blue-500" />
                       
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-blue-600 font-medium">
                          Click to Upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          (Max. File Size: 25MB)
                        </p>
                      </div>

                      <input
                        type="file"
                        onChange={handleFileSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                  </div>

                  {/* Uploaded File */}
                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {uploadedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">{uploadedFile.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={removeFile}
                          className="h-8 w-8 p-0 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleStartIntake}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Start Intake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}