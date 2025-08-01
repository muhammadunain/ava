import { TransactionDetails } from "@/types";

export const DetailsTab: React.FC<{ details: TransactionDetails }> = ({ details }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">Transaction Details</h2>
      <p className="text-slate-600 text-xl font-medium">Property and transaction information</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="backdrop-blur-xl bg-white/60 border border-white/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Property Information</h3>
        <div className="space-y-4">
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibold text-slate-700">Address:</span> 
            <span className="text-slate-900 font-medium">{details.address}</span>
          </div>
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibold text-slate-700">District:</span> 
            <span className="text-slate-900 font-medium">{details.district}</span>
          </div>
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibold text-slate-700">Property Type:</span> 
            <span className="text-slate-900 font-medium">{details.propertyType}</span>
          </div>
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibold text-slate-700">Square Footage:</span> 
            <span className="text-slate-900 font-medium">{details.squareFootage}</span>
          </div>
        </div>
      </div>
      <div className="backdrop-blur-xl bg-white/60 border border-white/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Financial Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibold text-slate-700">Purchase Price:</span> 
            <span className="text-slate-900 font-medium">{details.purchasePrice}</span>
          </div>
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibold text-slate-700">Down Payment:</span> 
            <span className="text-slate-900 font-medium">{details.downPayment}</span>
          </div>
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibold text-slate-700">Loan Amount:</span> 
            <span className="text-slate-900 font-medium">{details.loanAmount}</span>
          </div>
          <div className="flex justify-between p-3 bg-white/40 rounded-xl">
            <span className="font-semibent text-slate-700">Closing Date:</span> 
            <span className="text-slate-900 font-medium">{details.closingDate}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);