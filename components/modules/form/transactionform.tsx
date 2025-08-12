'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronDownIcon, ChevronRight } from 'lucide-react';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    type: 'Buyer Lead',
    status: '',
    representing: '',
    address: '432 FULMER DR #404',
    city: '',
    state: '',
    zip: '',
    transactionName: '',
    price: '',
    buyerRepresentationDate: '',
    buyerRepresentationBroker: '',
    acceptanceDate: '',
    listingDate: '',
    listingExpirationDate: '',
    closingDate: '',
    leadBuyerSelect: '',
    county: '',
    propertyType: '',
    publicRemarks: '',
    buildingSqft: '',
    lotSqft: '',
    zoning: '',
    bedrooms: '',
    fullBaths: '',
    halfBaths: '',
    showingInstructions: '',
    showExact: '',
    description: '',
    clientDescription: '',
    agm: '',
    sqft: '',
    tenant: '',
    lockbox: '',
    yearBuilt: '',
    source: 'Lockbox',
    attorneyContact: '',
    dateReceived: '',
    dateDescribed: '',
    dateReleased: '',
    amountReleased: ''
  });

  const [expandedSections, setExpandedSections] = useState({
    mlsInfo: false,
    propertyInfo: false,
    additionalInfo: false
  });

  const handleInputChange = (field:any, value:any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSection = (section:any) => {
    setExpandedSections(prev => ({
      ...prev,
    //   @ts-ignore
      [section]: !prev[section]
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">New Transaction</h2>
          <button type="button" className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Basic Info Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              value={formData.type} 
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Buyer Lead</option>
              <option>Seller Lead</option>
              <option>Rental</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Representing</label>
            <input 
              type="text" 
              value={formData.representing}
              onChange={(e) => handleInputChange('representing', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* Address Row */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              type="text" 
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input 
              type="text" 
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
            <input 
              type="text" 
              value={formData.zip}
              onChange={(e) => handleInputChange('zip', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* Transaction Details Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction name</label>
            <input 
              type="text" 
              value={formData.transactionName}
              onChange={(e) => handleInputChange('transactionName', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              type="text" 
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* Dates Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buyer representation date</label>
            <input 
              type="date" 
              value={formData.buyerRepresentationDate}
              onChange={(e) => handleInputChange('buyerRepresentationDate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buyer representation broker</label>
            <input 
              type="text" 
              value={formData.buyerRepresentationBroker}
              onChange={(e) => handleInputChange('buyerRepresentationBroker', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Acceptance date</label>
            <input 
              type="date" 
              value={formData.acceptanceDate}
              onChange={(e) => handleInputChange('acceptanceDate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* More Dates Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Listing date</label>
            <input 
              type="date" 
              value={formData.listingDate}
              onChange={(e) => handleInputChange('listingDate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Listing expiration date</label>
            <input 
              type="date" 
              value={formData.listingExpirationDate}
              onChange={(e) => handleInputChange('listingExpirationDate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing date</label>
            <input 
              type="date" 
              value={formData.closingDate}
              onChange={(e) => handleInputChange('closingDate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* Collapsible MLS INFO Section */}
        <div className="border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection('mlsInfo')}
            className="w-full flex items-center justify-between cursor-pointer p-4 text-left "
          >
            <span className="text-blue-600 font-medium flex items-center gap-2">
            <ChevronDownIcon className='w-4 h-4'/>
             Additional fields
            </span>
            {expandedSections.mlsInfo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections.mlsInfo && (
            <div className="p-4 border-t border-gray-200 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Buyer select</label>
                  <select 
                    value={formData.leadBuyerSelect}
                    onChange={(e) => handleInputChange('leadBuyerSelect', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">select</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input 
                    type="text" 
                    value={formData.county}
                    onChange={(e) => handleInputChange('county', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <input 
                    type="text" 
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Public Remarks</label>
                <textarea 
                  value={formData.publicRemarks}
                  onChange={(e) => handleInputChange('publicRemarks', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 
                />
              </div>
            </div>
          )}
        </div>

        {/* Property Details Section */}
        <div className="border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection('propertyInfo')}
            className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">Property Details</span>
            {expandedSections.propertyInfo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections.propertyInfo && (
            <div className="p-4 border-t border-gray-200 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Building SQFT</label>
                  <input 
                    type="text" 
                    placeholder="Lot SQFT"
                    value={formData.buildingSqft}
                    onChange={(e) => handleInputChange('buildingSqft', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zoning</label>
                  <input 
                    type="text" 
                    value={formData.zoning}
                    onChange={(e) => handleInputChange('zoning', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <input 
                    type="text" 
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full baths</label>
                  <input 
                    type="text" 
                    value={formData.fullBaths}
                    onChange={(e) => handleInputChange('fullBaths', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Half baths</label>
                  <input 
                    type="text" 
                    value={formData.halfBaths}
                    onChange={(e) => handleInputChange('halfBaths', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                  <input 
                    type="text" 
                    value={formData.yearBuilt}
                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Showing instructions</label>
                  <input 
                    type="text" 
                    value={formData.showingInstructions}
                    onChange={(e) => handleInputChange('showingInstructions', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Show exact</label>
                  <input 
                    type="text" 
                    value={formData.showExact}
                    onChange={(e) => handleInputChange('showExact', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input 
                    type="text" 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information Section */}
        <div className="border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={() => toggleSection('additionalInfo')}
            className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">Additional Information</span>
            {expandedSections.additionalInfo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {expandedSections.additionalInfo && (
            <div className="p-4 border-t border-gray-200 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select 
                    value={formData.source}
                    onChange={(e) => handleInputChange('source', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Lockbox</option>
                    <option>MLS</option>
                    <option>Referral</option>
                    <option>Website</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">AGM</label>
                  <input 
                    type="text" 
                    value={formData.agm}
                    onChange={(e) => handleInputChange('agm', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SQFT</label>
                  <input 
                    type="text" 
                    value={formData.sqft}
                    onChange={(e) => handleInputChange('sqft', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenant</label>
                  <input 
                    type="text" 
                    value={formData.tenant}
                    onChange={(e) => handleInputChange('tenant', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attorney Contact</label>
                  <input 
                    type="text" 
                    value={formData.attorneyContact}
                    onChange={(e) => handleInputChange('attorneyContact', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
                  <input 
                    type="date" 
                    value={formData.dateReceived}
                    onChange={(e) => handleInputChange('dateReceived', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Described</label>
                  <input 
                    type="date" 
                    value={formData.dateDescribed}
                    onChange={(e) => handleInputChange('dateDescribed', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Released</label>
                  <input 
                    type="date" 
                    value={formData.dateReleased}
                    onChange={(e) => handleInputChange('dateReleased', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Released</label>
                  <input 
                    type="text" 
                    value={formData.amountReleased}
                    onChange={(e) => handleInputChange('amountReleased', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button"
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;