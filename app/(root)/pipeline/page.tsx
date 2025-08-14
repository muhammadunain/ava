import React from 'react';
import { Home, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TransactionsDashboard = () => {
  const transactions = [
    {
      address: "9877 GULF SHORE DR #B04, Naples",
      price: "$145,000",
      agent: "Dave Summers",
      status: "Closing: 21 August, 2020",
      statusColor: "bg-orange-100 text-orange-600"
    },
    {
      address: "350 5TH AVE, Empire State Realty Trust",
      price: "$205,000",
      agent: "David Wilson",
      status: "",
      statusColor: ""
    },
    {
      address: "310 MAPLE AVE, Cedar Grove",
      price: "$645,000",
      agent: "John Smith",
      status: "Closing: 4 September, 2020",
      statusColor: "bg-orange-100 text-orange-600"
    },
    {
      address: "11 WALL ST, Michael Brown",
      price: "$65,000",
      agent: "Michael Brown",
      status: "Closing: 10 September, 2020",
      statusColor: "bg-orange-100 text-orange-600"
    },
    {
      address: "47 OAK RIDGE RD, Pine Valley Grocers",
      price: "$205,000",
      agent: "David Wilson",
      status: "",
      statusColor: ""
    },
    {
      address: "350 5TH AVE, Emily Carter",
      price: "$105,000",
      agent: "Emily",
      status: "",
      statusColor: "",
      hasAvatar: true
    },
    {
      address: "512 ELM ST, Red Barn",
      price: "$805,000",
      agent: "Grace Mitchell",
      status: "",
      statusColor: ""
    },
    {
      address: "11 WALL ST, James Anderson",
      price: "$45,000",
      agent: "Lauren Hughes",
      status: "Closing: 10 September, 2020",
      statusColor: "bg-orange-100 text-orange-600"
    },
    {
      address: "11 WALL ST, James Anderson",
      price: "$55,000",
      agent: "Owen Reed",
      status: "Closing: 27 September, 2020",
      statusColor: "bg-orange-100 text-orange-600"
    },
    {
      address: "370 PARK AVE, Greenfield Pharmacy",
      price: "$500,000",
      agent: "Abigail Foster",
      status: "",
      statusColor: ""
    }
  ];

  return (
    <div className="flex gap-6 my-3 ">
      {/* Left Sidebar */}
      <div className="w-56 space-y-3  border border-gray-200 p-4 rounded-lg ">
        {/* Total Transactions */}
        <div className="bg-white  ">
          <div className="flex items-center justify-between mb-1">
            <span className="text-lg font-semibold text-gray-900">Total Transactions</span>
            <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">21</span>
          </div>
          <div className="text-sm font-medium text-gray-500">$855,000</div>
        </div>

        {/* Opportunities */}
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-start mb-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mb-1">
            <span className="text-sm font-medium text-gray-900">Opportunities</span>
            <Badge className="bg-blue-500 text-white text-xs  rounded-full font-medium">1</Badge>
          </div>
          <div className="text-lg font-semibold text-gray-900">$468,000</div>
        </div>

        {/* Active */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex justify-start mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mb-1">
            <span className="text-sm font-medium text-gray-900">Active</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">20</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">$560,000</div>
        </div>

        {/* Pending */}
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-start mb-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mb-1">
            <span className="text-sm font-medium text-gray-900">Pending</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">4</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">$450,000</div>
        </div>

        {/* Closed */}
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-start mb-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mb-1">
            <span className="text-sm font-medium text-gray-900">Closed</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">1</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">$290,000</div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
            <div className="text-xs text-gray-500 mt-0.5">$174,000 Office Gross</div>
          </div>

          {/* Transaction List */}
          <div className="divide-y divide-gray-100">
            {transactions.map((transaction, index) => (
              <div key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-0.5 truncate">
                      {transaction.address}
                    </div>
                    <div className="text-sm text-gray-600">
                      {transaction.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-4">
                    {transaction.status && (
                      <div className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${transaction.statusColor}`}>
                        {transaction.status}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 min-w-0">
                      {transaction.hasAvatar ? (
                        <>
                          <span className="text-sm text-gray-900 font-medium truncate">{transaction.agent}</span>
                         
                        </>
                      ) : (
                        <span className="text-sm text-gray-900 font-medium truncate">{transaction.agent}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsDashboard;