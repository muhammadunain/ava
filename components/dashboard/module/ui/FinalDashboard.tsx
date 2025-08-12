"use client";
import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Ban,
  CheckCircle2,
  CircleCheck,
  Clock3,
  Lightbulb,
  List,
  SlidersHorizontal,
} from "lucide-react";

type Transaction = {
  id: number;
  owner: string;
  address: string;
  representing: string;
  lastUpdated: string;
  status: "active" | "opportunity" | "closed" | "pending" | "void";
  timeline: string;
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
  { id: 1, owner: "Ethan Miller", address: "742 Evergreen Terrace", representing: "Daniel Brooks", lastUpdated: "Aug 31, 2025", status: "active", timeline: "Escrow receipt received" },
  { id: 2, owner: "Olivia Thompson", address: "1199 Oakwood Drive", representing: "Sophia Turner", lastUpdated: "Aug 31, 2025", status: "opportunity", timeline: "Deposited payment" },
  { id: 3, owner: "Jacob Anderson", address: "56 Maple Grove Lane", representing: "Lucas Bennett", lastUpdated: "Aug 31, 2025", status: "active", timeline: "Purchase agreement" },
  { id: 4, owner: "Madison Clark", address: "823 Willowbrook Court", representing: "Tyler Hayes", lastUpdated: "Aug 31, 2025", status: "closed", timeline: "Buyer broker agreement" },
  { id: 5, owner: "Ryan Mitchell", address: "375 Cedar Ridge Road", representing: "Chloe Matthews", lastUpdated: "Aug 31, 2025", status: "active", timeline: "Escrow receipt received" },
  { id: 6, owner: "Emily Harris", address: "210 Birch Hill Avenue", representing: "Victoria Collins", lastUpdated: "Aug 31, 2025", status: "void", timeline: "Escrow receipt received" },
  { id: 7, owner: "Nathan Parker", address: "48 Pinecrest Boulevard", representing: "Lauren Adams", lastUpdated: "Aug 31, 2025", status: "active", timeline: "Purchase agreement" },
  { id: 8, owner: "Grace Sullivan", address: "921 Aspen Meadows Way", representing: "Abigail Price", lastUpdated: "Aug 31, 2025", status: "pending", timeline: "Buyer election" },
  { id: 9, owner: "Benjamin Reed", address: "1520 Silver Lake Drive", representing: "Christophe Clark", lastUpdated: "Aug 31, 2025", status: "active", timeline: "Purchase agreement" },
];

const statusClasses: Record<Transaction["status"], string> = {
  active: "bg-blue-100 text-blue-800 border border-blue-200",
  opportunity: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  closed: "bg-green-100 text-green-800 border border-green-200",
  pending: "bg-red-100 text-red-800 border border-red-200",
  void: "bg-gray-100 text-gray-800 border border-gray-200",
};

const iconMap: Record<string, React.ReactNode> = {
  All: <List className="w-4 h-4" />,
  Opportunity: <Lightbulb className="w-4 h-4" />,
  Active: <CircleCheck className="w-4 h-4" />,
  Pending: <Clock3 className="w-4 h-4" />,
  Closed: <CheckCircle2 className="w-4 h-4" />,
  Void: <Ban className="w-4 h-4" />,
};

const TransactionsDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [columns, setColumns] = useState({
    owner: true,
    address: true,
    representing: true,
    lastUpdated: true,
    status: true,
    timeline: true,
  });

  const filteredTransactions = useMemo(() => {
    return activeFilter === "All"
      ? initialTransactions
      : initialTransactions.filter((t) => t.status === activeFilter.toLowerCase());
  }, [activeFilter]);

  return (
    <section className="w-full">
      {/* Header */}
      <header className="mb-6">
        <p className="text-sm text-muted-foreground mb-1">Thursday, July 31</p>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Good afternoon, <span className="text-blue-500">Dave</span>
        </h2>
      </header>

      {/* Filters */}
      <nav className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 rounded-md p-1 bg-muted border">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.name;
            return (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`py-2 px-1 sm:px-2 flex items-center justify-center gap-1 rounded-sm text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
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
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-2xl font-semibold">Recent Transactions</h3>
            <Badge className="rounded-full w-6 h-6 flex items-center justify-center bg-blue-500 text-primary-foreground">
              {filteredTransactions.length}
            </Badge>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="text-blue-500 hover:to-blue-600" size="icon">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56">
              <div className="space-y-3">
                <p className="text-sm font-medium">Show/Hide Columns</p>
                <div className="grid gap-2">
                  {Object.keys(columns).map((col) => (
                    <label key={col} className="flex items-center gap-2">
                      <Checkbox
                        checked={columns[col as keyof typeof columns]}
                        onCheckedChange={(c) =>
                          setColumns((p) => ({ ...p, [col]: Boolean(c) }))
                        }
                      />
                      <Label className="capitalize text-sm">{col}</Label>
                    </label>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block ">
          {/* Header */}
          <div className="py-3 border-b border-border">
            <div className="grid grid-cols-[minmax(140px,1fr)_minmax(200px,2fr)_minmax(160px,1.5fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(160px,2fr)] gap-4 text-sm font-semibold capitalize tracking-wide text-muted-foreground">
              {columns.owner && <div>Owner</div>}
              {columns.address && <div>Address</div>}
              {columns.representing && <div>Representing</div>}
              {columns.lastUpdated && <div>Last updated</div>}
              {columns.status && <div>Status</div>}
              {columns.timeline && <div>Timeline</div>}
            </div>
          </div>
          {/* Body */}
          <div className="divide-y divide-border">
            {filteredTransactions.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-[minmax(140px,1fr)_minmax(200px,2fr)_minmax(160px,1.5fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(160px,2fr)] gap-4 py-4 items-center text-sm hover:bg-accent/50 transition rounded-md"
              >
                {columns.owner && <div className="font-medium">{t.owner}</div>}
                {columns.address && <div className="font-medium text-gray-900">{t.address}</div>}
                {columns.representing && <div className="text-gray-600">{t.representing}</div>}
                {columns.lastUpdated && <div className="text-muted-foreground">{t.lastUpdated}</div>}
                {columns.status && (
                  <Badge className={`px-2 py-1 rounded-md text-xs font-medium ${statusClasses[t.status]}`}>
                    {t.status}
                  </Badge>
                )}
                {columns.timeline && <div className="text-muted-foreground">{t.timeline}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet */}
        <div className="lg:hidden divide-y divide-border">
          {filteredTransactions.map((t) => (
            <div key={t.id} className="px-4 py-4 hover:bg-accent/50 rounded-md transition">
              <div className="flex justify-between items-center mb-2">
                {columns.owner && <div className="font-semibold text-sm">{t.owner}</div>}
                {columns.status && (
                  <Badge className={`px-2 py-1 rounded-md text-xs font-medium ${statusClasses[t.status]}`}>
                    {t.status}
                  </Badge>
                )}
              </div>
              {columns.address && <div className="text-sm font-medium text-gray-900">{t.address}</div>}
              {columns.representing && <div className="text-xs text-gray-600">{t.representing}</div>}
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {columns.lastUpdated && <span>{t.lastUpdated}</span>}
                {columns.timeline && <span>{t.timeline}</span>}
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center p-12">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </CardContent>
    </section>
  );
};

export default TransactionsDashboard;
