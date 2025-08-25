import { Button } from "@/components/ui/button";

export function PropertyDetailsSection() {
  return (
    <div className="space-y-12 bg-white p-8">
      {/* Address Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-black flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-500"></div>
            Address
          </h2>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-normal">
            Generate Summary
          </Button>
        </div>
        
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="w-full">
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/5">Street Address</td>
                <td className="px-6 py-4 text-sm text-black">410 FLAGSHIP DR # 501</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/5">City</td>
                <td className="px-6 py-4 text-sm text-black">Naples</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">State</td>
                <td className="px-6 py-4 text-sm text-black">FL</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Zip Code</td>
                <td className="px-6 py-4 text-sm text-black">34108</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Country</td>
                <td className="px-6 py-4 text-sm text-black">United States</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Property Section */}
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-light text-black flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-500"></div>
            Property Details
          </h2>
        </div>
        
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="w-full">
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/4">Boat Slip</td>
                <td className="px-6 py-4 text-sm text-black">#45</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/4">Unit Number</td>
                <td className="px-6 py-4 text-sm text-black">105</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">County</td>
                <td className="px-6 py-4 text-sm text-black">Collier</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Garage</td>
                <td className="px-6 py-4 text-sm text-black">#153</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Legal Description</td>
                <td className="px-6 py-4 text-sm text-black" >REGATTA AT VANDERBILT BEACH II A CONDOMINIUM UNIT 105 Collier</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Parties Section */}
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-light text-black flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-500"></div>
            Transaction Parties
          </h2>
        </div>
        
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="w-full">
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/4">Property Address</td>
                <td className="px-6 py-4 text-sm text-black" >410 FLAGSHIP DR # 501, Naples FL 34108</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Primary Seller</td>
                <td className="px-6 py-4 text-sm text-black">Jay Christopher Wagner</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/4">Additional Seller</td>
                <td className="px-6 py-4 text-sm text-black">Shonda Lynn Wagner</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Primary Buyer</td>
                <td className="px-6 py-4 text-sm text-black">Jeff Eckert</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Additional Buyer</td>
                <td className="px-6 py-4 text-sm text-black">Kimberly Eckert</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Buyer Entity</td>
                <td className="px-6 py-4 text-sm text-black">Turnkey</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Brokerage</td>
                <td className="px-6 py-4 text-sm text-black">Naples Homes</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Buyer Agent</td>
                <td className="px-6 py-4 text-sm text-black">Ryan Schwartz</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Seller Agent</td>
                <td className="px-6 py-4 text-sm text-black">Ryan Schwartz</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Escrow Officer</td>
                <td className="px-6 py-4 text-sm text-black" >
                  <div>Josh Rudnick</div>
                  <div className="text-blue-500 mt-1">(239) 325-4070</div>
                  <div className="text-gray-600 mt-1">9045 Strada Stell Ct #400, Naples, FL 34109</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Financing Section */}
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-light text-black flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-500"></div>
            Financing Details
          </h2>
        </div>
        
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="w-full">
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/4">Initial Deposit</td>
                <td className="px-6 py-4 text-sm text-black font-medium">$25,000.00</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30 w-1/4">Due Within</td>
                <td className="px-6 py-4 text-sm text-black">3 days</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Additional Deposit</td>
                <td className="px-6 py-4 text-sm text-black font-medium">$135,000.00</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Due Within</td>
                <td className="px-6 py-4 text-sm text-black">15 days</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Balance Due at Closing</td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">$1,440,000.00</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50/30">Loan Type</td>
                <td className="px-6 py-4 text-sm text-gray-500 italic">Unknown</td>
              </tr>
              <tr className="bg-blue-50/50 hover:bg-blue-50/70 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700 bg-blue-100/50">Total Purchase Price</td>
                <td className="px-6 py-4 text-lg font-medium text-blue-600" >$1,600,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}