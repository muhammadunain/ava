'use client'

import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BotIcon, ChevronDown, ChevronRight, Newspaper, Paperclip, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ContactsInput from './ContactField';
import SignersAndOtherParties from './AddSigners';
import AgentsCommissions from '@/components/final/commision';

interface MLSData {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  agent: string;
  price: string;
  transactionName: string;
  buyerAgreementDate: string;
  buyerExpirationDate: string;
  acceptanceDate: string;
  listingDate: string;
  listingExpirationDate: string;
  closingDate: string;
  representing: string;
  type: string;
  status: string;
}

const MultiStepTransactionForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [mlsNumber, setMlsNumber] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [selectedMLS, setSelectedMLS] = useState<MLSData | null>(null);
  const [formData, setFormData] = useState<Partial<MLSData>>({});
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  
  // Collapsible states
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true);
  const [isDatesOpen, setIsDatesOpen] = useState(false);
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);

  const mlsSuggestions: MLSData[] = [
    {
      id: 'MLS001234',
      address: '2153 Asti Ct',
      city: 'Naples',
      state: 'FL',
      zip: '34105',
      agent: 'James Craft',
      price: '$3,545,000.00',
      transactionName: 'Luxury Home Sale - Asti Court',
      buyerAgreementDate: '2024-01-15',
      buyerExpirationDate: '2024-06-15',
      acceptanceDate: '2024-02-01',
      listingDate: '2024-01-10',
      listingExpirationDate: '2024-07-10',
      closingDate: '2024-03-15',
      representing: 'Buyer',
      type: 'Sale',
      status: 'Active'
    },
    {
      id: 'MLS005678',
      address: '1234 Ocean Dr',
      city: 'Naples',
      state: 'FL',
      zip: '34102',
      agent: 'Sarah Johnson',
      price: '$2,850,000.00',
      transactionName: 'Oceanfront Property Deal',
      buyerAgreementDate: '2024-01-20',
      buyerExpirationDate: '2024-06-20',
      acceptanceDate: '2024-02-05',
      listingDate: '2024-01-15',
      listingExpirationDate: '2024-07-15',
      closingDate: '2024-03-20',
      representing: 'Seller',
      type: 'Sale',
      status: 'Pending'
    }
  ];

  const availableForms = [
    { id: 'florida-sales', name: 'Florida Sales Contract.pdf', selected: false },
    { id: 'farbar-sales', name: 'Farbar Sales Contract.pdf', selected: false },
    { id: 'nabor-sales', name: 'Nabor Sales Contract.pdf', selected: false },
    { id: 'example1-sales', name: 'Example 1 Sales Contract.pdf', selected: true },
    { id: 'example2-sales', name: 'Example 2 Sales Contract.pdf', selected: false },
    { id: 'example3-sales', name: 'Example 3 Sales Contract.pdf', selected: false }
  ];

  const handleInputChange = (value: string) => {
    setMlsNumber(value);
    setShowDropdown(value.length > 0);
  };

  const selectMLS = (mls: MLSData) => {
    setSelectedMLS(mls);
    setMlsNumber(mls.id);
    setShowDropdown(false);
    setShowImportDialog(true);
  };

  const handleImportData = () => {
    if (selectedMLS) {
      setFormData(selectedMLS);
    }
    setShowImportDialog(false);
    setCurrentStep(2);
  };

  const handleCancel = () => {
    setShowImportDialog(false);
  };

  const handleFormToggle = (formId: string) => {
    setSelectedForms(prev => 
      prev.includes(formId) 
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/pdfviewer');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Transaction name', active: currentStep === 1 },
      { number: 2, title: 'Agents & Commissions', active: currentStep === 2 },
      { number: 3, title: 'Transaction Form', active: currentStep === 3 },
      { number: 4, title: 'Add Forms', active: currentStep === 4 },
      { number: 5, title: 'Add Signers', active: currentStep === 5 }
    ];

    return (
      <div className="flex items-center justify-center mb-16">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step.active 
                ? 'bg-orange-500 text-white' 
                : currentStep > step.number 
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
            }`}>
              {step.number}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step.active ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-gray-300 mx-4"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Create New Transaction</h2>
        <p className="text-gray-500">How would you like to enter data in your document?</p>
      </div>

      <div className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Property Address or MLS#"
            value={mlsNumber}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full pl-4 pr-10 py-6 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
            {mlsSuggestions
              .filter(mls => mls.id.toLowerCase().includes(mlsNumber.toLowerCase()) || 
                           mls.address.toLowerCase().includes(mlsNumber.toLowerCase()))
              .map((mls, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  onClick={() => selectMLS(mls)}
                >
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-medium">{mls.id}</span>
                    <span className="text-sm text-gray-600">{mls.address}, {mls.city} {mls.state} {mls.zip}</span>
                    <span className="text-sm text-gray-500">Listed by {mls.agent} - {mls.price}</span>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Unsure of the property address? Put in your client's name for now - you can always change it later.
      </p>

      <div className="flex justify-between mt-12">
        <Button className='cursor-pointer' variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          Back
        </Button>
        <Button onClick={handleContinue} className="bg-black cursor-pointer text-white hover:bg-gray-800">
          Continue
        </Button>
      </div>
    </div>
  );

 const renderStep2 = () => (
  <div className="max-w-4xl mx-auto">
   <AgentsCommissions/>

    {/* Footer actions */}
    <div className="flex justify-between items-center mt-8">
      <div className="text-sm text-gray-500">step 1 of 4</div>

      <div className="flex space-x-3">
        <Button className='cursor-pointer' variant="outline" onClick={handleBack}>
          Back
        </Button>

        <Button onClick={handleNext} className="bg-black cursor-pointer text-white hover:bg-gray-800">
          Next
        </Button>
      </div>
    </div>
  </div>
);

  const renderStep3 = () => (
     <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Create New Transaction</h2>
      <p className="text-gray-500">How would you like to enter data in your document?</p>
    </div>

    <div className="bg-white p-6 rounded-lg border">
      {/* Top Row: 3 dropdowns */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Representing</label>
          <Select value={formData.representing} onValueChange={(value) => updateFormData('representing', value)}>
            <SelectTrigger  className="h-12 w-full cursor-pointer">
              <SelectValue placeholder="select" />
            </SelectTrigger >
            <SelectContent >
              <SelectItem value="buyer">Buyer</SelectItem>
              <SelectItem value="seller">Seller</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
            <SelectTrigger className="h-12 w-full cursor-pointer">
              <SelectValue placeholder="select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="lease">Lease</SelectItem>
              <SelectItem value="rental">Rental</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <Select value={formData.status} onValueChange={(value) => updateFormData('status', value)}>
            <SelectTrigger className="h-12 w-full cursor-pointer">
              <SelectValue placeholder="select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Address Row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <Input
            className="h-12"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <Input
            className="h-12"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <Input
              className="h-12"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zip</label>
            <Input
              className="h-12"
              value={formData.zip}
              onChange={(e) => updateFormData('zip', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Transaction name + Price */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transaction name</label>
          <Input
            className="h-12"
            value={formData.transactionName}
            onChange={(e) => updateFormData('transactionName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <Input
            className="h-12"
            value={formData.price}
            onChange={(e) => updateFormData('price', e.target.value)}
          />
        </div>
      </div>

      {/* Dates Row 1 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Buyer agreement date</label>
          <div className="relative">
            <Input
              type="date"
              className="h-12"
              value={formData.buyerAgreementDate}
              onChange={(e) => updateFormData('buyerAgreementDate', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Buyer expiration date</label>
          <div className="relative">
            <Input
              type="date"
              className="h-12"
              value={formData.buyerExpirationDate}
              onChange={(e) => updateFormData('buyerExpirationDate', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Acceptance date</label>
          <div className="relative">
            <Input
              type="date"
              className="h-12"
              value={formData.acceptanceDate}
              onChange={(e) => updateFormData('acceptanceDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Dates Row 2 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Listing date</label>
          <div className="relative">
            <Input
              type="date"
              className="h-12"
              value={formData.listingDate}
              onChange={(e) => updateFormData('listingDate', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Listing expiration date</label>
          <div className="relative">
            <Input
              type="date"
              className="h-12"
              value={formData.listingExpirationDate}
              onChange={(e) => updateFormData('listingExpirationDate', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Closing date</label>
          <div className="relative">
            <Input
              type="date"
              className="h-12"
              value={formData.closingDate}
              onChange={(e) => updateFormData('closingDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Additional fields toggle */}
      <div className="mb-6">
        <button
          onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
          className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium flex items-center"
          aria-expanded={isAdditionalOpen}
        >
          <span className="mr-1">{isAdditionalOpen ? '-' : '+'}</span>
          Additional fields
        </button>
      </div>

      {/* Collapsible Additional Fields — collapsed by default */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isAdditionalOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {/* Border and spacing to match expanded screenshot */}
        <div className="border-t pt-6 mt-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MLS#</label>
              <Input
                className="h-12"
                // @ts-ignore
                value={formData.mls}
                onChange={(e) => updateFormData('mls', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                {/* @ts-ignore */}
              <Select value={formData.leadSource} onValueChange={(value) => updateFormData('leadSource', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.county}
                onChange={(e) => updateFormData('county', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property type</label>
                    {/* @ts-ignore */}
              <Select value={formData.propertyType} onValueChange={(value) => updateFormData('propertyType', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Commercial" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.area}
                onChange={(e) => updateFormData('area', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Public remarks</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.publicRemarks}
                onChange={(e) => updateFormData('publicRemarks', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Building SQFT</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.buildingSqft}
                onChange={(e) => updateFormData('buildingSqft', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lot SQFT</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.lotSqft}
                onChange={(e) => updateFormData('lotSqft', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zoning</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.zoning}
                onChange={(e) => updateFormData('zoning', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.bedrooms}
                onChange={(e) => updateFormData('bedrooms', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full baths</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.fullBaths}
                onChange={(e) => updateFormData('fullBaths', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Half baths</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.halfBaths}
                onChange={(e) => updateFormData('halfBaths', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Showing instructions</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.showingInstructions}
                onChange={(e) => updateFormData('showingInstructions', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show notes</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.showNotes}
                onChange={(e) => updateFormData('showNotes', e.target.value)}
              />
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full border rounded p-3 text-sm h-28"
                // @ts-ignore

                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </div>

            {/* Continue mapping the remaining fields as in your expanded screenshot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Legal description</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.legalDescription}
                onChange={(e) => updateFormData('legalDescription', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">APN</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.apn}
                onChange={(e) => updateFormData('apn', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SQFT</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.sqft}
                onChange={(e) => updateFormData('sqft', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenant</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.tenant}
                onChange={(e) => updateFormData('tenant', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lockbox</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.lockbox}
                onChange={(e) => updateFormData('lockbox', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year built</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.yearBuilt}
                onChange={(e) => updateFormData('yearBuilt', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Escrow #</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.escrowNumber}
                onChange={(e) => updateFormData('escrowNumber', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount received from</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.amountReceivedFrom}
                onChange={(e) => updateFormData('amountReceivedFrom', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount received</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.amountReceived}
                onChange={(e) => updateFormData('amountReceived', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date received</label>
              <Input
                type="date"
                className="h-12"
                // @ts-ignore

                value={formData.dateReceived}
                onChange={(e) => updateFormData('dateReceived', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date encumbered</label>
              <Input
                type="date"
                className="h-12"
                // @ts-ignore

                value={formData.dateEncumbered}
                onChange={(e) => updateFormData('dateEncumbered', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date released</label>
              <Input
                type="date"
                className="h-12"
                // @ts-ignore

                value={formData.dateReleased}
                onChange={(e) => updateFormData('dateReleased', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount released</label>
              <Input
                className="h-12"
                // @ts-ignore

                value={formData.amountReleased}
                onChange={(e) => updateFormData('amountReleased', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer actions */}
    <div className="flex justify-between items-center mt-8">
      <div className="text-sm text-gray-500">step 1 of 4</div>

      <div className="flex space-x-3">
        <Button className='cursor-pointer' variant="outline" onClick={handleBack}>
          Back
        </Button>

        <Button onClick={handleNext} className="bg-black cursor-pointer text-white hover:bg-gray-800">
          Next
        </Button>
      </div>
    </div>
  </div>
  );

  const renderStep4 = () => (
     <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Forms</h2>
        <p className="text-gray-500 flex items-center">
          <span className="w-5 h-5 flex items-center justify-center mr-2">
            <BotIcon className="text-blue-600 "/>
          </span>
          We have identified following lists based on your transactions.
        </p>
      </div>

      <div className="space-y-3">
        {availableForms.map((form) => (
          <div key={form.id} className="flex items-center space-x-3 p-3 bg-gray-100 hover:bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              name="selectedForm"
              onChange={() => handleFormToggle(form.id)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label className="text-gray-900 cursor-pointer flex-1">
              {form.name}
            </label>
          </div>
        ))}
          <div className="mt-8 bg-gray-100  border-2 border-dashed border-gray-200  rounded-md h-28 flex flex-col items-center justify-center text-center">
      <Newspaper className="w-6 h-6 text-gray-400 mb-1" />
      <div className="text-sm text-gray-500">
        <button className="text-blue-600 underline">Add more forms</button>
        <span className="mx-5">or</span>
        <button className="text-gray-600 underline">attach a document</button>
      </div>
    </div>
      </div>

      <div className="flex justify-between items-center mt-12">
        <div className="text-sm text-gray-500">
          step 3 of 4
        </div>
        <div className="flex space-x-3">
          <Button className='cursor-pointer' variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext} className="bg-black cursor-pointer text-white hover:bg-gray-800">
            Next
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="max-w-4xl mx-auto">
      

                  <SignersAndOtherParties/>
    

      <div className="flex justify-between items-center mt-12">
        <div className="text-sm text-gray-500">
          step 5 of 5
        </div>
        <div className="flex space-x-3">
          <Button className='cursor-pointer' variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext} className="bg-slate-800 cursor-pointer text-white hover:bg-slate-700">
          Next
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-6xl mx-auto px-4">
        {renderStepIndicator()}
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}

        {/* Import Data Dialog */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold ">Import Data</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-sm text-gray-700 mb-4">
                Would you like to import the listing details from Naples Area Board of Realtors?
              </p>
              
              <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 mb-4">
                Auto-populated information is provided solely for your convenience and does not disclaims any representation as to the accuracy or completeness of all information entered into dotloop, including auto-populated information.
              </div>
              
              {selectedMLS && (
                <div className="space-y-1">
                  <p className="font-medium text-sm">
                    {selectedMLS.address}, {selectedMLS.city} {selectedMLS.state} {selectedMLS.zip}
                  </p>
                  <p className="text-sm text-gray-600">
                    Listed by {selectedMLS.agent} - {selectedMLS.price}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleImportData}
                className="flex-1 bg-black cursor-pointer text-white hover:bg-gray-800"
              >
                Import Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MultiStepTransactionForm;