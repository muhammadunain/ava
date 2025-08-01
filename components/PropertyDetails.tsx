import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PropertyDetailsSection() {
  return (
    <div className="space-y-6">
      {/* Address Section */}
      <div>
        <div className="flex flex-row items-center justify-between py-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Address
          </h3>
          <Button variant="default" size="sm">
            Generate Summary
          </Button>
        </div>
        <CardContent className="pt-0">
          <div className="grid grid-cols-5 gap-8">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Street Address</label>
              <p className="text-sm">410 FLAGSHIP DR # 501</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">City</label>
              <p className="text-sm">Naples</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">State</label>
              <p className="text-sm">FL</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Zip</label>
              <p className="text-sm">34108</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Country</label>
              <p className="text-sm">United States</p>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Property Section */}
      <div>
        <div className="py-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Property
          </h3>
        </div>
        <CardContent className="pt-0">
          <div className="grid grid-cols-5 gap-8">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Boat Slip Included</label>
              <p className="text-sm">#45</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Condominium Unit Number</label>
              <p className="text-sm">105</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">County</label>
              <p className="text-sm">Collier</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Garage Number Included</label>
              <p className="text-sm">#153</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Legal Description of Property</label>
              <p className="text-sm">REGATTA AT VANDERBILT BEACH II A CONDOMINIUM UNIT 105 Collier</p>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Parties Section */}
      <div>
        <div className="py-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Parties
          </h3>
        </div>
        <CardContent className="pt-0">
          <div className="grid grid-cols-6 gap-8">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Property Address</label>
              <p className="text-sm">410 FLAGSHIP DR # 501, Naples FL 34108</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Seller</label>
              <p className="text-sm">Jay Christopher Wagner</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Buyer</label>
              <p className="text-sm">Jeff Eckert</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Escrow Officer</label>
              <p className="text-sm">Josh Rudnick<br />(239) 325-4070<br />9045 Strada Stell Ct #400,<br />Naples, FL 34109</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Buyer</label>
              <p className="text-sm">Kimberly Eckert</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Seller Brokerage</label>
              <p className="text-sm">Naples Homes</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-8 mt-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Buyer Brokerage</label>
              <p className="text-sm">Naples Homes</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Buyer Agent</label>
              <p className="text-sm">Ryan Schwartz</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Seller Agent</label>
              <p className="text-sm">Ryan Schwartz</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Seller</label>
              <p className="text-sm">Shonda Lynn Wagner</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Buyer Address/Entity</label>
              <p className="text-sm">Turnkey<br />Turnkey</p>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Financing Section */}
      <div>
        <div className="py-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Financing
          </h3>
        </div>
        <CardContent className="pt-0">
          <div className="grid grid-cols-6 gap-8">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Additional Deposit</label>
              <p className="text-sm">$135,000.00</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Additional Deposit Due After Effective Date</label>
              <p className="text-sm">15 days</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Balance Due at Closing</label>
              <p className="text-sm">$1,440,000.00</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Initial Deposit</label>
              <p className="text-sm">$25,000.00</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Initial Deposit Due After Effective Date</label>
              <p className="text-sm">3 days</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Loan Type</label>
              <p className="text-sm">Unknown</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 mt-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Other Proceeds</label>
              <p className="text-sm"></p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Proceeds of Mortgage, if</label>
              <p className="text-sm"></p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Proceeds of Seller</label>
              <p className="text-sm"></p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Purchase Price</label>
              <p className="text-sm"></p>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}