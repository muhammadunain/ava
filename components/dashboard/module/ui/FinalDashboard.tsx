"use client";

import React, { useMemo, useState } from "react";
import {
  Ban,
  BookCheck,
  CheckCircle2,
  CircleCheck,
  Clock3,
  Home,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Transaction = {
  id: number;
  owner: string;
  ownerRole: string;
  address: string;
  price: string;
  lastUpdated: string;
  status: "active" | "opportunity" | "closed" | "pending" | "void";
  currentTimeline: string;
  upcomingTimeline: string;
  progress: number;
};

const filters = [
  { name: "All" },
  { name: "Opportunity" },
  { name: "Active" },
  { name: "Pending" },
  { name: "Closed" },
  { name: "Void" },
];

const initialTransactions: Transaction[] = [
  { id: 1, owner: "Ethan Miller", ownerRole: "buyer", address: "742 Evergreen Terrace", price: "$238,000", lastUpdated: "Aug 31, 2025", status: "active", currentTimeline: "Buyer broker agreement", upcomingTimeline: "Escrow receipt received", progress: 58 },
  { id: 2, owner: "Olivia Thompson", ownerRole: "buyer", address: "1199 Oakwood Drive", price: "$450,000", lastUpdated: "Aug 31, 2025", status: "active", currentTimeline: "Purchase agreement", upcomingTimeline: "Deposited payment", progress: 45 },
  { id: 3, owner: "Jacob Anderson", ownerRole: "seller", address: "56 Maple Grove Lane", price: "$125,000", lastUpdated: "Aug 31, 2025", status: "pending", currentTimeline: "Escrow receipt received", upcomingTimeline: "Purchase agreement", progress: 35 },
  { id: 4, owner: "Ryan Mitchell", ownerRole: "seller", address: "375 Cedar Ridge Road", price: "$850,000", lastUpdated: "Sep 1, 2025", status: "active", currentTimeline: "Schedule home inspection", upcomingTimeline: "Deposited payment", progress: 58 },
  { id: 5, owner: "Emily Harris", ownerRole: "both", address: "210 Birch Hill Avenue", price: "$1,250,000", lastUpdated: "Sep 2, 2025", status: "pending", currentTimeline: "Receives disclosures", upcomingTimeline: "Buyer broker agreement", progress: 35 },
  { id: 6, owner: "Nathan Parker", ownerRole: "seller", address: "48 Pinecrest Boulevard", price: "$550,000", lastUpdated: "Sep 3, 2025", status: "pending", currentTimeline: "Review disclosures", upcomingTimeline: "Deposited payment", progress: 70 },
  { id: 7, owner: "Grace Sullivan", ownerRole: "buyer", address: "921 Aspen Meadows Way", price: "$450,500", lastUpdated: "Sep 4, 2025", status: "pending", currentTimeline: "Buyer election", upcomingTimeline: "Deposited payment", progress: 35 },
  { id: 8, owner: "Benjamin Reed", ownerRole: "both", address: "1520 Silver Lake Drive", price: "$1,200,000", lastUpdated: "Sep 5, 2025", status: "active", currentTimeline: "Remove Contingencies", upcomingTimeline: "Purchase agreement", progress: 85 },
];

const statusClasses: Record<Transaction["status"], string> = {
  active: "bg-blue-50 text-blue-700 border border-blue-200",
  opportunity: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  closed: "bg-green-50 text-green-700 border border-green-200",
  pending: "bg-red-50 text-red-700 border border-red-200",
  void: "bg-gray-50 text-gray-700 border border-gray-200",
};

const roleClasses: Record<string, string> = {
  buyer: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  seller: "bg-orange-50 text-orange-700 border border-orange-200",
  both: "bg-blue-50 text-blue-700 border border-blue-200",
};

const iconMap: Record<string, React.ReactNode> = {
  All: <BookCheck className="w-4 h-4" />,
  Opportunity: <Home className="w-4 h-4" />,
  Active: <CircleCheck className="w-4 h-4" />,
  Pending: <Clock3 className="w-4 h-4" />,
  Closed: <CheckCircle2 className="w-4 h-4" />,
  Void: <Ban className="w-4 h-4" />,
};

const Badge = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <span className={`inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-medium rounded-full ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className, onClick, variant = "default", size = "default", ...props }: any) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  

  return (
    <button 
      
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  );
};

const Checkbox = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <input 
    type="checkbox" 
    checked={checked} 
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
  />
);

const TransactionsDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [columns, setColumns] = useState({
    address: true,
    owner: true,
    price: true,
    status: true,
    currentTimeline: true,
    upcomingTimeline: true,
  });
  const [showColumnPopover, setShowColumnPopover] = useState(false);

  const filteredTransactions = useMemo(() => {
    return activeFilter === "All"
      ? initialTransactions
      : initialTransactions.filter((t) => t.status === activeFilter.toLowerCase());
  }, [activeFilter]);

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Thursday, July 31</p>
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">
          Good afternoon, <span className="text-blue-600">Dave</span>
        </h1>
      </div>

      {/* Filters */}
      <nav className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 rounded-md p-1 bg-gray-100 border">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.name;
            return (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`py-2 px-1 sm:px-2 flex items-center cursor-pointer justify-center gap-1 rounded-sm text-xs sm:text-sm transition-colors ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {iconMap[filter.name]}
                <span className="hidden sm:inline">{filter.name}</span>
                <span className="sm:hidden">{filter.name.slice(0, 3)}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Transactions Table Card */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex flex-row items-center justify-between border-b border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium text-gray-900">Recent Transactions</h2>
            <Badge className="rounded-full bg-blue-500  text-white border border-blue-200">
              {filteredTransactions.length}
            </Badge>
          </div>
          <div className="relative">
            <Button
            
              variant="outline"
              size="icon"
              onClick={() => setShowColumnPopover(!showColumnPopover)}
            
            >
              <SlidersHorizontal className="h-4 w-4 text-blue-500 cursor-pointer" />
            </Button>
            {showColumnPopover && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg z-10">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Show/Hide Columns</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowColumnPopover(false)}
                      className="h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(columns).map(([col, checked]) => (
                      <div key={col} className="flex items-center space-x-3">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(c) =>
                            setColumns((p) => ({ ...p, [col]: Boolean(c) }))
                          }
                        />
                        <label className="text-sm font-medium text-gray-700 cursor-pointer capitalize">
                          {col === 'owner' ? 'Representing' : 
                           col === 'currentTimeline' ? 'Current Timeline' :
                           col === 'upcomingTimeline' ? 'Upcoming Timeline' :
                           col.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-0">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {columns.address && (
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm w-1/6">
                        Address
                      </th>
                    )}
                    {columns.owner && (
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm w-1/6">
                        Representing
                      </th>
                    )}
                    {columns.price && (
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm w-1/8">
                        Price
                      </th>
                    )}
                    {columns.status && (
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm w-1/8">
                        Status
                      </th>
                    )}
                    {columns.currentTimeline && (
                      <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm w-1/4">
                        Current Timeline
                      </th>
                    )}
                    {columns.upcomingTimeline && (
                      <th className="text-left py-3 px-4 font-medium  text-gray-500 text-sm w-1/6">
                        Upcoming Timeline
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr 
                      key={transaction.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index === filteredTransactions.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      {columns.address && (
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900 truncate" title={transaction.address}>
                            {transaction.address}
                          </div>
                        </td>
                      )}
                      {columns.owner && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <div className="font-medium text-sm text-gray-900" title={transaction.owner}>
                              {transaction.owner}
                            </div>
                            <Badge className="bg-gray-100 text-gray-700  rounded-full text-sm">
                              {transaction.ownerRole}
                            </Badge>
                          </div>
                        </td>
                      )}
                      {columns.price && (
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">
                            {transaction.price}
                          </div>
                        </td>
                      )}
                      {columns.status && (
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {transaction.status}
                          </div>
                        </td>
                      )}
                      {columns.currentTimeline && (
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-start gap-2">
                              <span className="p-1 font-medium  bg-gray-100 text-gray-700  rounded-full text-sm truncate" title={transaction.currentTimeline}>
                                {transaction.currentTimeline}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-400">16 Aug</span>
                                <span className="bg-red-100 text-red-600 rounded-full px-1.5 py-0.5 text-xs font-medium">
                                  3d
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: `${transaction.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-900 font-semibold">
                                {transaction.progress}%
                              </span>
                            </div>
                          </div>
                        </td>
                      )}
                      {columns.upcomingTimeline && (
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <Badge className="inline-block bg-gray-100 text-gray-700  rounded-full text-sm">
                              {transaction.upcomingTimeline}
                            </Badge>
                            <Badge className="inline-block bg-gray-100 text-gray-700  rounded-full text-sm">
                              Purchase agreement
                            </Badge>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsDashboard;