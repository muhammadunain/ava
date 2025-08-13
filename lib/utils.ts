import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}






  // <div className="max-w-4xl mx-auto">
  //   <div className="mb-8">
  //     <h2 className="text-2xl font-semibold mb-2">Create New Transaction</h2>
  //     <p className="text-gray-500">How would you like to enter data in your document?</p>
  //   </div>

  //   <div className="bg-white p-6 rounded-lg border">
  //     {/* Top Row: 3 dropdowns */}
  //     <div className="grid grid-cols-3 gap-6 mb-6">
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Representing</label>
  //         <Select value={formData.representing} onValueChange={(value) => updateFormData('representing', value)}>
  //           <SelectTrigger className="h-12 w-full cursor-pointer">
  //             <SelectValue placeholder="select" />
  //           </SelectTrigger>
  //           <SelectContent>
  //             <SelectItem value="buyer">Buyer</SelectItem>
  //             <SelectItem value="seller">Seller</SelectItem>
  //             <SelectItem value="both">Both</SelectItem>
  //           </SelectContent>
  //         </Select>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
  //         <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
  //           <SelectTrigger className="h-12 w-full cursor-pointer">
  //             <SelectValue placeholder="select" />
  //           </SelectTrigger>
  //           <SelectContent>
  //             <SelectItem value="sale">Sale</SelectItem>
  //             <SelectItem value="lease">Lease</SelectItem>
  //             <SelectItem value="rental">Rental</SelectItem>
  //           </SelectContent>
  //         </Select>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
  //         <Select value={formData.status} onValueChange={(value) => updateFormData('status', value)}>
  //           <SelectTrigger className="h-12 w-full cursor-pointer">
  //             <SelectValue placeholder="select" />
  //           </SelectTrigger>
  //           <SelectContent>
  //             <SelectItem value="active">Active</SelectItem>
  //             <SelectItem value="pending">Pending</SelectItem>
  //             <SelectItem value="closed">Closed</SelectItem>
  //           </SelectContent>
  //         </Select>
  //       </div>
  //     </div>

  //     {/* Address Row */}
  //     <div className="grid grid-cols-4 gap-6 mb-6">
  //       <div className="col-span-2">
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
  //         <Input
  //           className="h-12"
  //           value={formData.address}
  //           onChange={(e) => updateFormData('address', e.target.value)}
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
  //         <Input
  //           className="h-12"
  //           value={formData.city}
  //           onChange={(e) => updateFormData('city', e.target.value)}
  //         />
  //       </div>

  //       <div className="grid grid-cols-2 gap-3">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
  //           <Input
  //             className="h-12"
  //             value={formData.state}
  //             onChange={(e) => updateFormData('state', e.target.value)}
  //           />
  //         </div>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Zip</label>
  //           <Input
  //             className="h-12"
  //             value={formData.zip}
  //             onChange={(e) => updateFormData('zip', e.target.value)}
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     {/* Transaction name + Price */}
  //     <div className="grid grid-cols-2 gap-6 mb-6">
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Transaction name</label>
  //         <Input
  //           className="h-12"
  //           value={formData.transactionName}
  //           onChange={(e) => updateFormData('transactionName', e.target.value)}
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
  //         <Input
  //           className="h-12"
  //           value={formData.price}
  //           onChange={(e) => updateFormData('price', e.target.value)}
  //         />
  //       </div>
  //     </div>

  //     {/* Dates Row 1 */}
  //     <div className="grid grid-cols-3 gap-6 mb-6">
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Buyer agreement date</label>
  //         <div className="relative">
  //           <Input
  //             type="date"
  //             className="h-12"
  //             value={formData.buyerAgreementDate}
  //             onChange={(e) => updateFormData('buyerAgreementDate', e.target.value)}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Buyer expiration date</label>
  //         <div className="relative">
  //           <Input
  //             type="date"
  //             className="h-12"
  //             value={formData.buyerExpirationDate}
  //             onChange={(e) => updateFormData('buyerExpirationDate', e.target.value)}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Acceptance date</label>
  //         <div className="relative">
  //           <Input
  //             type="date"
  //             className="h-12"
  //             value={formData.acceptanceDate}
  //             onChange={(e) => updateFormData('acceptanceDate', e.target.value)}
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     {/* Dates Row 2 */}
  //     <div className="grid grid-cols-3 gap-6 mb-6">
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Listing date</label>
  //         <div className="relative">
  //           <Input
  //             type="date"
  //             className="h-12"
  //             value={formData.listingDate}
  //             onChange={(e) => updateFormData('listingDate', e.target.value)}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Listing expiration date</label>
  //         <div className="relative">
  //           <Input
  //             type="date"
  //             className="h-12"
  //             value={formData.listingExpirationDate}
  //             onChange={(e) => updateFormData('listingExpirationDate', e.target.value)}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Closing date</label>
  //         <div className="relative">
  //           <Input
  //             type="date"
  //             className="h-12"
  //             value={formData.closingDate}
  //             onChange={(e) => updateFormData('closingDate', e.target.value)}
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     {/* Additional fields toggle */}
  //     <div className="mb-6">
  //       <button
  //         onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
  //         className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium flex items-center"
  //         aria-expanded={isAdditionalOpen}
  //       >
  //         <span className="mr-1">{isAdditionalOpen ? '-' : '+'}</span>
  //         Additional fields
  //       </button>
  //     </div>

  //     {/* Collapsible Additional Fields — collapsed by default */}
  //     <div
  //       className={`overflow-hidden transition-all duration-300 ${isAdditionalOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
  //     >
  //       {/* Border and spacing to match expanded screenshot */}
  //       <div className="border-t pt-6 mt-6">
  //         <div className="grid grid-cols-3 gap-6">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">MLS#</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore
  //               value={formData.mls}
  //               onChange={(e) => updateFormData('mls', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
  //               {/* @ts-ignore */}
  //             <Select value={formData.leadSource} onValueChange={(value) => updateFormData('leadSource', value)}>
  //               <SelectTrigger className="h-12">
  //                 <SelectValue placeholder="select" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="online">Online</SelectItem>
  //                 <SelectItem value="referral">Referral</SelectItem>
  //                 <SelectItem value="other">Other</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.county}
  //               onChange={(e) => updateFormData('county', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Property type</label>
  //                   {/* @ts-ignore */}
  //             <Select value={formData.propertyType} onValueChange={(value) => updateFormData('propertyType', value)}>
  //               <SelectTrigger className="h-12">
  //                 <SelectValue placeholder="Commercial" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="commercial">Commercial</SelectItem>
  //                 <SelectItem value="residential">Residential</SelectItem>
  //                 <SelectItem value="land">Land</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.area}
  //               onChange={(e) => updateFormData('area', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Public remarks</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.publicRemarks}
  //               onChange={(e) => updateFormData('publicRemarks', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Building SQFT</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.buildingSqft}
  //               onChange={(e) => updateFormData('buildingSqft', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Lot SQFT</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.lotSqft}
  //               onChange={(e) => updateFormData('lotSqft', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Zoning</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.zoning}
  //               onChange={(e) => updateFormData('zoning', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.bedrooms}
  //               onChange={(e) => updateFormData('bedrooms', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Full baths</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.fullBaths}
  //               onChange={(e) => updateFormData('fullBaths', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Half baths</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.halfBaths}
  //               onChange={(e) => updateFormData('halfBaths', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Showing instructions</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.showingInstructions}
  //               onChange={(e) => updateFormData('showingInstructions', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Show notes</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.showNotes}
  //               onChange={(e) => updateFormData('showNotes', e.target.value)}
  //             />
  //           </div>

  //           <div className="col-span-3">
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
  //             <textarea
  //               className="w-full border rounded p-3 text-sm h-28"
  //               // @ts-ignore

  //               value={formData.description}
  //               onChange={(e) => updateFormData('description', e.target.value)}
  //             />
  //           </div>

  //           {/* Continue mapping the remaining fields as in your expanded screenshot */}
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Legal description</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.legalDescription}
  //               onChange={(e) => updateFormData('legalDescription', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">APN</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.apn}
  //               onChange={(e) => updateFormData('apn', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">SQFT</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.sqft}
  //               onChange={(e) => updateFormData('sqft', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Tenant</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.tenant}
  //               onChange={(e) => updateFormData('tenant', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Lockbox</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.lockbox}
  //               onChange={(e) => updateFormData('lockbox', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Year built</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.yearBuilt}
  //               onChange={(e) => updateFormData('yearBuilt', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Escrow #</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.escrowNumber}
  //               onChange={(e) => updateFormData('escrowNumber', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Amount received from</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.amountReceivedFrom}
  //               onChange={(e) => updateFormData('amountReceivedFrom', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Amount received</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.amountReceived}
  //               onChange={(e) => updateFormData('amountReceived', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Date received</label>
  //             <Input
  //               type="date"
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.dateReceived}
  //               onChange={(e) => updateFormData('dateReceived', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Date encumbered</label>
  //             <Input
  //               type="date"
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.dateEncumbered}
  //               onChange={(e) => updateFormData('dateEncumbered', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Date released</label>
  //             <Input
  //               type="date"
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.dateReleased}
  //               onChange={(e) => updateFormData('dateReleased', e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Amount released</label>
  //             <Input
  //               className="h-12"
  //               // @ts-ignore

  //               value={formData.amountReleased}
  //               onChange={(e) => updateFormData('amountReleased', e.target.value)}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  //   {/* Footer actions */}
  //   <div className="flex justify-between items-center mt-8">
  //     <div className="text-sm text-gray-500">step 1 of 4</div>

  //     <div className="flex space-x-3">
  //       <Button className='cursor-pointer' variant="outline" onClick={handleBack}>
  //         Back
  //       </Button>

  //       <Button onClick={handleNext} className="bg-black cursor-pointer text-white hover:bg-gray-800">
  //         Next
  //       </Button>
  //     </div>
  //   </div>
  // </div>