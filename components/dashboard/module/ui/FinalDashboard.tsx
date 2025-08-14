"use client";
import React, { useMemo, useState } from "react";
import {
  Ban,
  BookCheck,
  CheckCircle2,
  CircleCheck,
  Clock3,
  HousePlusIcon,
  Lightbulb,
  List,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

type Transaction = {
  id: number;
  owner: string;
  ownerRole: string;
  address: string;
  price: string;
  lastUpdated: string;
  status: "active" | "opportunity" | "closed" | "pending" | "void";
  timeline: string;
  nextTimeline: string;
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
  { id: 1, owner: "Ethan Miller", ownerRole: "buyer", address: "742 Evergreen Terrace", price: "$238,000", lastUpdated: "Aug 31, 2025", status: "active", timeline: "Escrow receipt received", nextTimeline: "Deposited payment", progress: 58 },
  { id: 2, owner: "Ryan Mitchell", ownerRole: "seller", address: "375 Cedar Ridge Road", price: "$850,000", lastUpdated: "Aug 31, 2025", status: "active", timeline: "Escrow receipt received", nextTimeline: "Escrow receipt received", progress: 85 },
  { id: 3, owner: "Grace Sullivan", ownerRole: "buyer", address: "921 Aspen Meadows Way", price: "$450,500", lastUpdated: "Aug 31, 2025", status: "pending", timeline: "Buyer election", nextTimeline: "Buyer broker agreement", progress: 35 },
  { id: 4, owner: "Michael Johnson", ownerRole: "buyer", address: "1847 Sunset Boulevard", price: "$675,000", lastUpdated: "Sep 1, 2025", status: "active", timeline: "Purchase agreement", nextTimeline: "Home inspection", progress: 42 },
  { id: 5, owner: "Sarah Davis", ownerRole: "seller", address: "523 Oak Street", price: "$320,000", lastUpdated: "Sep 2, 2025", status: "pending", timeline: "Listing agreement", nextTimeline: "Property valuation", progress: 25 },
  { id: 6, owner: "David Wilson", ownerRole: "both", address: "789 Pine Avenue", price: "$1,100,000", lastUpdated: "Sep 3, 2025", status: "active", timeline: "Contract signed", nextTimeline: "Financing approval", progress: 65 },
  { id: 7, owner: "Jennifer Brown", ownerRole: "buyer", address: "456 Elm Drive", price: "$425,000", lastUpdated: "Sep 4, 2025", status: "pending", timeline: "Offer submitted", nextTimeline: "Seller response", progress: 15 },
  { id: 8, owner: "Robert Taylor", ownerRole: "seller", address: "321 Maple Lane", price: "$780,000", lastUpdated: "Sep 5, 2025", status: "active", timeline: "Home inspection", nextTimeline: "Appraisal scheduled", progress: 72 },
  { id: 9, owner: "Lisa Anderson", ownerRole: "buyer", address: "654 Birch Road", price: "$550,000", lastUpdated: "Sep 6, 2025", status: "pending", timeline: "Pre-approval received", nextTimeline: "House hunting", progress: 20 },
  { id: 10, owner: "James Martinez", ownerRole: "both", address: "987 Cedar Court", price: "$925,000", lastUpdated: "Sep 7, 2025", status: "active", timeline: "Final walkthrough", nextTimeline: "Closing preparation", progress: 90 },
  { id: 11, owner: "Amanda White", ownerRole: "seller", address: "147 Willow Street", price: "$395,000", lastUpdated: "Sep 8, 2025", status: "pending", timeline: "Market analysis", nextTimeline: "Pricing strategy", progress: 10 },
  { id: 12, owner: "Christopher Lee", ownerRole: "buyer", address: "258 Spruce Avenue", price: "$680,000", lastUpdated: "Sep 9, 2025", status: "active", timeline: "Mortgage application", nextTimeline: "Credit verification", progress: 55 },
  { id: 13, owner: "Michelle Garcia", ownerRole: "seller", address: "369 Redwood Drive", price: "$515,000", lastUpdated: "Sep 10, 2025", status: "pending", timeline: "Photography scheduled", nextTimeline: "MLS listing", progress: 30 },
  { id: 14, owner: "Kevin Thompson", ownerRole: "buyer", address: "741 Cypress Lane", price: "$890,000", lastUpdated: "Sep 11, 2025", status: "active", timeline: "Inspection complete", nextTimeline: "Negotiation phase", progress: 68 },
  { id: 15, owner: "Rachel Moore", ownerRole: "both", address: "852 Hickory Street", price: "$1,250,000", lastUpdated: "Sep 12, 2025", status: "pending", timeline: "Title search", nextTimeline: "Insurance quotes", progress: 45 },
];

const statusClasses: Record<Transaction["status"], string> = {
  active: "bg-blue-100 text-blue-800 border border-blue-200",
  opportunity: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  closed: "bg-green-100 text-green-800 border border-green-200",
  pending: "bg-red-100 text-red-800 border border-red-200",
  void: "bg-gray-100 text-gray-800 border border-gray-200",
};

const roleClasses: Record<string, string> = {
  buyer: "bg-green-100 text-green-700 border border-green-200",
  seller: "bg-orange-100 text-orange-700 border border-orange-200",
  both: "bg-blue-100 text-blue-700 border border-blue-200",
};

const iconMap: Record<string, React.ReactNode> = {
  All: <BookCheck className="w-4 h-4" />,
  Opportunity: <HousePlusIcon className="w-4 h-4" />,
  Active: <CircleCheck className="w-4 h-4" />,
  Pending: <Clock3 className="w-4 h-4" />,
  Closed: <CheckCircle2 className="w-4 h-4" />,
  Void: <Ban className="w-4 h-4" />,
};

const Badge = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className, onClick, ...props }: any) => (
  <button className={`inline-flex items-center justify-center ${className}`} onClick={onClick} {...props}>
    {children}
  </button>
);

const Checkbox = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <input 
    type="checkbox" 
    checked={checked} 
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
  />
);

const TransactionsDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [columns, setColumns] = useState({
    address: true,
    owner: true,
    price: true,
    status: true,
    timeline: true,
    nextTimeline: true,
  });
  const [showColumnPopover, setShowColumnPopover] = useState(false);

  const filteredTransactions = useMemo(() => {
    return activeFilter === "All"
      ? initialTransactions
      : initialTransactions.filter((t) => t.status === activeFilter.toLowerCase());
  }, [activeFilter]);

  return (
    <section className="w-full">
      {/* Header */}
      <header className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Thursday, July 31</p>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Good afternoon, <span className="text-blue-500">Dave</span>
        </h2>
      </header>

      {/* Filters */}
      <nav className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 rounded-md p-1 bg-gray-100 border">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.name;
            return (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`py-2 px-1 sm:px-2 flex items-center cursor-pointer justify-center gap-1 rounded-sm text-xs sm:text-sm  transition-colors ${
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

      {/* Transactions */}
      <div className="pt-6 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4 px-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-semibold">Recent Transactions</h3>
            <Badge className="rounded-full w-6 h-6 flex items-center justify-center bg-blue-500 text-white">
              {filteredTransactions.length}
            </Badge>
          </div>
          <div className="relative">
            <Button 
              className="text-blue-500 hover:text-blue-600 cursor-pointer p-2" 
              onClick={() => setShowColumnPopover(!showColumnPopover)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
            {showColumnPopover && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                <p className="text-sm font-medium mb-3">Show/Hide Columns</p>
                <div className="space-y-2">
                  {Object.keys(columns).map((col) => (
                    <label key={col} className="flex items-center gap-2">
                      <Checkbox
                        checked={columns[col as keyof typeof columns]}
                        onCheckedChange={(c) =>
                          setColumns((p) => ({ ...p, [col]: Boolean(c) }))
                        }
                      />
                      <span className="text-sm  capitalize">{col === 'owner' ? 'Representing' : col.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          {/* Header */}
          <div className="py-3 border-b border-gray-200 px-6">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_2fr] gap-4 text-sm font-medium text-gray-500">
              {columns.address && <div>Address</div>}
              {columns.owner && <div>Representing</div>}
              {columns.price && <div>Price</div>}
              {columns.status && <div>Status</div>}
              {columns.timeline && <div>Timeline</div>}
              {columns.nextTimeline && <div>Next Timeline</div>}
            </div>
          </div>
          {/* Body */}
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((t) => (
              <Link  key={t.id} href={'/opportunites'}>
              <div
               
                className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_2fr] gap-4 py-4 px-6 items-center text-sm hover:bg-gray-50 transition"
              >
                {columns.address && <div className="font-medium text-gray-900 cursor-pointer">{t.address}</div>}
                {columns.owner && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{t.owner}</span>
                    <Badge className={`px-2 py-0.5   text-xs font-medium bg-gray-100 rounded-full p-1`}>
                      {t.ownerRole}
                    </Badge>
                  </div>
                )}
                {columns.price && <div className="font-medium text-gray-900">{t.price}</div>}
                {columns.status && (
                  <Badge className={`px-3 py-1 rounded text-xs font-medium w-fit `}>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </Badge>
                )}
                {columns.timeline && (
                  <div className="space-y-2">
                    <div className="text-gray-900 font-medium"><span className="bg-gray-100 rounded-full p-1">{t.timeline}</span></div>
                    <div className="text-gray-900 font-medium"><span className="bg-gray-100 rounded-full p-1">Document review</span></div>
                  </div>
                )}
                {columns.nextTimeline && (
                  <div className="space-y-2">
                    <div className="text-gray-900 font-medium"><span className="bg-gray-100 rounded-full p-1">{t.nextTimeline}</span></div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${t.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{t.progress}%</span>
                    </div>
                  </div>
                )}
              </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredTransactions.map((t) => (
            <div key={t.id} className="px-6 py-4 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  {columns.address && <div className="font-medium text-gray-900">{t.address}</div>}
                  {columns.owner && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{t.owner}</span>
                      <Badge className={`px-2 py-0.5 rounded text-xs font-medium ${roleClasses[t.ownerRole]}`}>
                        {t.ownerRole}
                      </Badge>
                    </div>
                  )}
                </div>
                {columns.status && (
                  <Badge className={`px-3 py-1 rounded text-xs font-medium ${statusClasses[t.status]}`}>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </Badge>
                )}
              </div>
              
              {columns.price && <div className="font-medium text-gray-900 mb-2">{t.price}</div>}
              
              <div className="space-y-2">
                {columns.timeline && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Timeline:</span> <span className="bg-gray-100 rounded-full p-1">{t.timeline}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="bg-gray-100 rounded-full p-1">Document review</span>
                    </div>
                  </div>
                )}
                {columns.nextTimeline && (
                  <div>
                    <div className="text-sm font-medium text-gray-900"><span className="bg-gray-100 rounded-full p-1">{t.nextTimeline}</span></div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${t.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{t.progress}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center p-12">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionsDashboard;