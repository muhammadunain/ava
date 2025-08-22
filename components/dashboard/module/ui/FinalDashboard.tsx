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
  ChevronDown,
  Filter,
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
  upcomingTimeline2?: string;
  progress: number;
  progressDate: string;
  progressDays: string;
  closingDate: string;
  type: "residential" | "commercial" | "land";
};

const filters = [
  { name: "All" },
  { name: "Opportunity" },
  { name: "Active" },
  { name: "Pending" },
  { name: "Closed" },
  { name: "Void" },
];

const statusOptions = ["All Status", "Active", "Pending", "Closed", "Opportunity", "Void"];
const typeOptions = ["All Types", "Residential", "Commercial", "Land"];

const initialTransactions: Transaction[] = [
  { 
    id: 1, 
    owner: "Dylan Sanders", 
    ownerRole: "buyer", 
    address: "742 Evergreen Terrace", 
    price: "$239,000", 
    lastUpdated: "Aug 31, 2025", 
    status: "active", 
    currentTimeline: "Buyer's Initial Deposit", 
    upcomingTimeline: "Condominium Document Receipt", 
    upcomingTimeline2: "Condo Fire Sprinkler Records Re...",
    progress: 10, 
    progressDate: "23 Aug",
    progressDays: "4d",
    closingDate: "Dec 5, 2025",
    type: "residential"
  },
  { 
    id: 2, 
    owner: "Olivia Thompson", 
    ownerRole: "buyer", 
    address: "1199 Oakwood Drive", 
    price: "$450,000", 
    lastUpdated: "Aug 31, 2025", 
    status: "active", 
    currentTimeline: "Purchase agreement", 
    upcomingTimeline: "Deposited payment", 
    upcomingTimeline2: "Buyer election",
    progress: 17, 
    progressDate: "19 Aug",
    progressDays: "4d",
    closingDate: "Aug 23, 2025",
    type: "commercial"
  },
  { 
    id: 3, 
    owner: "Jacob Anderson", 
    ownerRole: "seller", 
    address: "56 Maple Grove Lane", 
    price: "$125,000", 
    lastUpdated: "Aug 31, 2025", 
    status: "pending", 
    currentTimeline: "Escrow receipt received", 
    upcomingTimeline: "Purchase agreement", 
    upcomingTimeline2: "Buyer election",
    progress: 17, 
    progressDate: "17 Aug",
    progressDays: "8d",
    closingDate: "Aug 22, 2025",
    type: "land"
  },
  { 
    id: 4, 
    owner: "Ryan Mitchell", 
    ownerRole: "seller", 
    address: "375 Cedar Ridge Road", 
    price: "$850,000", 
    lastUpdated: "Sep 1, 2025", 
    status: "active", 
    currentTimeline: "Schedule home inspection", 
    upcomingTimeline: "Deposited payment", 
    upcomingTimeline2: "Buyer election",
    progress: 11, 
    progressDate: "20 Aug",
    progressDays: "5d",
    closingDate: "Sep 12, 2025",
    type: "residential"
  },
  { 
    id: 5, 
    owner: "Emily Harris", 
    ownerRole: "both", 
    address: "210 Birch Hill Avenue", 
    price: "$1,250,000", 
    lastUpdated: "Sep 2, 2025", 
    status: "pending", 
    currentTimeline: "Receives disclosures", 
    upcomingTimeline: "Buyer broker agreement", 
    upcomingTimeline2: "Buyer election",
    progress: 20, 
    progressDate: "24 Aug",
    progressDays: "1d",
    closingDate: "Sep 2, 2025",
    type: "commercial"
  },
  { 
    id: 6, 
    owner: "Nathan Parker", 
    ownerRole: "seller", 
    address: "48 Pinecrest Boulevard", 
    price: "$550,000", 
    lastUpdated: "Sep 3, 2025", 
    status: "pending", 
    currentTimeline: "Review disclosures", 
    upcomingTimeline: "Deposited payment", 
    upcomingTimeline2: "Escrow receipt received",
    progress: 13, 
    progressDate: "25 Aug",
    progressDays: "5d",
    closingDate: "Aug 25, 2025",
    type: "residential"
  },
  { 
    id: 7, 
    owner: "Grace Sullivan", 
    ownerRole: "buyer", 
    address: "921 Aspen Meadows Way", 
    price: "$450,500", 
    lastUpdated: "Sep 4, 2025", 
    status: "pending", 
    currentTimeline: "Buyer election", 
    upcomingTimeline: "Deposited payment", 
    upcomingTimeline2: "Buyer broker agreement",
    progress: 17, 
    progressDate: "31 Aug",
    progressDays: "3d",
    closingDate: "Sep 6, 2025",
    type: "land"
  },
  { 
    id: 8, 
    owner: "Benjamin Reed", 
    ownerRole: "both", 
    address: "1520 Silver Lake Drive", 
    price: "$1,200,000", 
    lastUpdated: "Sep 5, 2025", 
    status: "active", 
    currentTimeline: "Remove Contingencies", 
    upcomingTimeline: "Purchase agreement", 
    upcomingTimeline2: "Buyer election",
    progress: 24, 
    progressDate: "03 Sep",
    progressDays: "1d",
    closingDate: "Sep 25, 2025",
    type: "commercial"
  },
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

const getTimelineBadgeClass = (timeline: string, index: number = 0) => {
  if (timeline.includes("Buyer's Initial") || timeline.includes("Purchase agreement")) return "bg-blue-100 text-blue-700";
  if (timeline.includes("Deposited payment")) return "bg-yellow-100 text-yellow-700";
  if (timeline.includes("Buyer election")) return "bg-green-100 text-green-700";
  if (timeline.includes("Buyer broker")) return "bg-red-100 text-red-700";
  if (timeline.includes("Escrow") || timeline.includes("Remove Contingencies")) return "bg-purple-100 text-purple-700";
  if (timeline.includes("Condo") || timeline.includes("Condominium") || timeline.includes("Schedule home")) return "bg-green-100 text-green-700";
  if (timeline.includes("Review") || timeline.includes("Receives")) return "bg-blue-100 text-blue-700";
  
  const badges = ["bg-blue-100 text-blue-700", "bg-yellow-100 text-yellow-700", "bg-green-100 text-green-700"];
  return badges[index % badges.length];
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

const Button = ({ children, className, onClick, ...props }: any) => {
  return (
    <button 
      onClick={onClick} 
      className={className}
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

const DropdownButton = ({ 
  options, 
  selected, 
  onSelect, 
  icon, 
  label 
}: { 
  options: string[]; 
  selected: string; 
  onSelect: (value: string) => void; 
  icon: React.ReactNode; 
  label: string; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
      >
        {icon}
        <span>{selected}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TransactionsDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");
  const [columns, setColumns] = useState({
    address: true,
    owner: true,
    price: true,
    status: true,
    currentTimeline: true,
    upcomingTimeline: true,
    closingDate: true,
  });
  const [showColumnPopover, setShowColumnPopover] = useState(false);

  const filteredTransactions = useMemo(() => {
    let filtered = initialTransactions;
    
    // Apply main filter
    if (activeFilter !== "All") {
      filtered = filtered.filter((t) => t.status === activeFilter.toLowerCase());
    }
    
    // Apply status filter
    if (statusFilter !== "All Status") {
      filtered = filtered.filter((t) => t.status === statusFilter.toLowerCase());
    }
    
    // Apply type filter
    if (typeFilter !== "All Types") {
      filtered = filtered.filter((t) => t.type === typeFilter.toLowerCase());
    }
    
    return filtered;
  }, [activeFilter, statusFilter, typeFilter]);

  return (
    <div className="w-full max-w-full space-y-6 p-6 overflow-hidden">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 p-6 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium text-gray-900">Recent Transactions</h2>
            <Badge className="rounded-full bg-blue-500 text-white border border-blue-200">
              {filteredTransactions.length}
            </Badge>
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownButton
              options={statusOptions}
              selected={statusFilter}
              onSelect={setStatusFilter}
              icon={<Filter className="w-4 h-4" />}
              label="Status"
            />
            
            <DropdownButton
              options={typeOptions}
              selected={typeFilter}
              onSelect={setTypeFilter}
              icon={<Home className="w-4 h-4" />}
              label="Type"
            />
            
            <div className="relative">
              <Button
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50"
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
                        className="h-6 w-6 flex items-center justify-center hover:bg-gray-100 rounded"
                        onClick={() => setShowColumnPopover(false)}
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
                             col === 'upcomingTimeline' ? 'Upcoming Timelines' :
                             col === 'closingDate' ? 'Closing Date' :
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
        </div>

        {/* Card Content with Custom Table */}
        <div className="overflow-x-auto">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {columns.address && (
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm min-w-[200px]">
                      Address ↑
                    </th>
                  )}
                  {columns.owner && (
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm min-w-[180px]">
                      Representing ↑
                    </th>
                  )}
                  {columns.price && (
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm min-w-[120px]">
                      Price ↑
                    </th>
                  )}
                  {columns.status && (
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm min-w-[100px]">
                      Status ↑
                    </th>
                  )}
                  {columns.currentTimeline && (
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm min-w-[300px]">
                      Current Timeline ↑
                    </th>
                  )}
                  {columns.upcomingTimeline && (
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm min-w-[250px]">
                      Upcoming Timelines ↑
                    </th>
                  )}
                  {columns.closingDate && (
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm min-w-[140px]">
                      Closing Date ↑
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id} 
                    className={`hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      index === filteredTransactions.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    {columns.address && (
                      <td className="py-4 px-4 min-w-[200px]">
                        <div className="font-medium text-gray-900 text-sm">
                          {transaction.address}
                        </div>
                      </td>
                    )}
                    {columns.owner && (
                      <td className="py-4 px-4 min-w-[180px]">
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-gray-900">
                            {transaction.owner}
                          <Badge className={`text-xs  bg-gray-100`}>
                            {transaction.ownerRole}
                          </Badge>
                          </div>
                        </div>
                      </td>
                    )}
                    {columns.price && (
                      <td className="py-4 px-4 min-w-[120px]">
                        <div className="font-medium text-gray-900 text-sm">
                          {transaction.price}
                        </div>
                      </td>
                    )}
                    {columns.status && (
                      <td className="py-4 px-4 min-w-[100px]">
                        <Badge className={`text-sm capitalize bg-gray-100`}>
                          {transaction.status}
                        </Badge>
                      </td>
                    )}
                    {columns.currentTimeline && (
                      <td className="py-4 px-4 min-w-[300px]">
                        <div className="space-y-2">
                          <div>
                            <Badge className={`inline-block font-medium text-xs bg-gray-100`}>
                              {transaction.currentTimeline}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                         
                            <span className="text-xs text-gray-500">{transaction.progressDate}</span>
                            <Badge className="bg-red-100 text-red-600 text-xs">
                              {transaction.progressDays}
                            </Badge>
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
                      <td className="py-4 px-4 min-w-[250px]">
                        <div className="space-y-1">
                          <div>
                            <Badge className={`text-xs ${getTimelineBadgeClass(transaction.upcomingTimeline, 0)}`}>
                              {transaction.upcomingTimeline}
                            </Badge>
                          </div>
                          {transaction.upcomingTimeline2 && (
                            <div>
                              <Badge className={`text-xs ${getTimelineBadgeClass(transaction.upcomingTimeline2, 1)}`}>
                                {transaction.upcomingTimeline2}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                    {columns.closingDate && (
                      <td className="py-4 px-4 min-w-[140px]">
                        <div className="font-medium text-gray-900 text-sm">
                          {transaction.closingDate}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsDashboard;