import React from 'react';

const TransactionsTable = () => {
  const transactions = [
    {
      address: "742 Evergreen Terrace",
      owner: "Ethan Miller",
      representing: "Seller",
      price: "$2,450,000",
      lastUpdated: "Aug 31, 2025",
      status: "Active",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      address: "1199 Oakwood Drive",
      owner: "Madison Clark",
      representing: "Seller",
      price: "$120,000",
      lastUpdated: "Sep 2, 2025",
      status: "Opportunity",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      address: "56 Maple Grove Lane",
      owner: "Benjamin Hayes",
      representing: "Buyer",
      price: "$250,000",
      lastUpdated: "Sep 7, 2025",
      status: "Void",
      statusColor: "bg-gray-100 text-gray-800"
    },
    {
      address: "375 Cedar Ridge Road",
      owner: "Charlotte Brooks",
      representing: "Buyer",
      price: "$50,000",
      lastUpdated: "Sep 19, 2025",
      status: "Active",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      address: "210 Birch Hill Avenue",
      owner: "Samuel Porter",
      representing: "Seller",
      price: "$450,000",
      lastUpdated: "Sep 17, 2025",
      status: "Opportunity",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      address: "48 Pinecrest Boulevard",
      owner: "Olivia Bennett",
      representing: "Seller",
      price: "$2,555,000",
      lastUpdated: "Sep 21, 2025",
      status: "Opportunity",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      address: "921 Aspen Meadows Way",
      owner: "Nathaniel Scott",
      representing: "Seller",
      price: "$895,000",
      lastUpdated: "Oct 3, 2025",
      status: "Closed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      address: "1520 Silver Lake Drive",
      owner: "Grace Mitchell",
      representing: "Buyer",
      price: "$6,450,000",
      lastUpdated: "Oct 6, 2025",
      status: "Void",
      statusColor: "bg-gray-100 text-gray-800"
    },
    {
      address: "5908 Meadowlark Lane",
      owner: "Emily Dawson",
      representing: "Buyer",
      price: "$3,680,000",
      lastUpdated: "Oct 25, 2025",
      status: "Pending",
      statusColor: "bg-red-100 text-red-800"
    }
  ];

  return (
    <div className="bg-white rounded-lg my-5 shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">9</span>
        </div>
        <div className="text-sm text-gray-600 mt-1"><span className='text-blue-600'>$6450,500</span> Office Gross</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Representing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.address}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {transaction.owner}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {transaction.representing}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {transaction.lastUpdated}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full `}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;