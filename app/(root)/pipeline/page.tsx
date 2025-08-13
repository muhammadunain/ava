import React from 'react';
import { Home, Clock, CheckCircle } from 'lucide-react';

const TransactionsDashboard = () => {
  const transactions = [
    {
      address: "9877 GULF SHORE DR #B04, Naples",
      price: "$145,000",
      agent: "Dave Summers",
      status: "Closing: 21 September, 2020",
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
    <div className="flex my-3">
      {/* Left Sidebar */}
      <div className="w-64  border rounded-md p-4 space-y-4 mt-6">
        {/* Total Transactions */}
        <div className=" mb-10 ">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-lg text-gray-900">Total Transactions</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">21</span>
          </div>
          <div className="text-gray-600">$855,000</div>

        </div>

        {/* Opportunities */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 py-10">
          <div className="flex items-center justify-between mb-2">
                        <Home className="w-5 h-5 text-gray-400" />

            <span className="font-semibold text-gray-900">Opportunities</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">1</span>
          </div>
          <div className="text-gray-600">$468,000</div>
        </div>

        {/* Active */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Active</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">20</span>
          </div>
          <div className="text-gray-600">$560,000</div>
          <div className="mt-3">
            <Home className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Pending</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">4</span>
          </div>
          <div className="text-gray-600">$450,000</div>
          <div className="mt-3">
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Closed */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Closed</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">2</span>
          </div>
          <div className="text-gray-600">$290,000</div>
          <div className="mt-3">
            <CheckCircle className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
            </div>
            <div className="text-gray-600 mt-1">$174,000 Office Gross</div>
          </div>

          {/* Transaction List */}
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-1">
                    {transaction.address}
                  </div>
                  <div className="text-gray-600">
                    {transaction.price}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {transaction.status && (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.statusColor}`}>
                      {transaction.status}
                    </div>
                  )}
                  
                  <div className="text-right">
                    {transaction.hasAvatar ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">{transaction.agent}</span>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">AVA</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-900">{transaction.agent}</span>
                    )}
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