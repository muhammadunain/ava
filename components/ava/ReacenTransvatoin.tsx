"use client";
import React, { JSX, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface RecentTransactionsSectionProps {
  onStatusFilter: (status: string | null) => void;
  onTypeFilter: (type: string | null) => void;
  activeStatusFilter: string | null;
  activeTypeFilter: string | null;
}

export const RecentTransactionsSection = ({
  onStatusFilter,
  onTypeFilter,
  activeStatusFilter,
  activeTypeFilter,
}: RecentTransactionsSectionProps): JSX.Element => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);

  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const layoutButtonRef = useRef<HTMLButtonElement>(null);

  const [statusPosition, setStatusPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [typePosition, setTypePosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [layoutPosition, setLayoutPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const statusOptions = ["All", "Active", "Pending", "Closed"];
  const typeOptions = ["All", "Buyer", "Seller", "Both"];
  const layoutOptions = ["Compact", "Comfortable", "Detailed"];

  const handleStatusFilter = (status: string) => {
    const filterValue = status === "All" ? null : status;
    onStatusFilter(filterValue);
    setShowStatusDropdown(false);
  };

  const handleTypeFilter = (type: string) => {
    const filterValue = type === "All" ? null : type;
    onTypeFilter(filterValue);
    setShowTypeDropdown(false);
  };

  const handleLayoutChange = (layout: string) => {
    console.log("Layout changed to:", layout);
    setShowLayoutDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".filter-dropdown")) {
        setShowStatusDropdown(false);
        setShowTypeDropdown(false);
        setShowLayoutDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Position dropdown under buttons
  useEffect(() => {
    if (showStatusDropdown && statusButtonRef.current) {
      const rect = statusButtonRef.current.getBoundingClientRect();
      setStatusPosition({ top: rect.bottom + 4, left: rect.left });
    }
    if (showTypeDropdown && typeButtonRef.current) {
      const rect = typeButtonRef.current.getBoundingClientRect();
      setTypePosition({ top: rect.bottom + 4, left: rect.left });
    }
    if (showLayoutDropdown && layoutButtonRef.current) {
      const rect = layoutButtonRef.current.getBoundingClientRect();
      setLayoutPosition({ top: rect.bottom + 4, left: rect.left });
    }
  }, [showStatusDropdown, showTypeDropdown, showLayoutDropdown]);

  return (
    <div className="flex w-full items-center justify-between mb-6">
      {/* Left side - Title and Badge */}
      <div className="flex items-center gap-3">
        <h2 className="font-semibold text-zinc-950 text-xl leading-7 font-['Geist',Helvetica]">
          Recent Transactions
        </h2>
        <Badge className="px-2 py-0.5 bg-[#2574eb] rounded-full border-0">
          <span className="font-semibold text-white text-[10px] leading-[15px]">8</span>
        </Badge>
      </div>

      {/* Right side - Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <div className="filter-dropdown">
          <Button
            ref={statusButtonRef}
            variant="outline"
            size="sm"
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown);
              setShowTypeDropdown(false);
              setShowLayoutDropdown(false);
            }}
            className={`flex items-center gap-2 px-3 py-2 h-8 rounded-md border text-sm font-medium transition-colors ${
              activeStatusFilter 
                ? "bg-blue-50 border-blue-200 text-blue-700" 
                : "bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50"
            }`}
          >
            <img className="w-4 h-4" alt="Sort" src="https://c.animaapp.com/membwlndqrzxnl/img/sort-descending.svg" />
            <span>
              Status{activeStatusFilter ? ` (${activeStatusFilter})` : ''}
            </span>
          </Button>
        </div>

        {/* Type Filter */}
        <div className="filter-dropdown">
          <Button
            ref={typeButtonRef}
            variant="outline"
            size="sm"
            onClick={() => {
              setShowTypeDropdown(!showTypeDropdown);
              setShowStatusDropdown(false);
              setShowLayoutDropdown(false);
            }}
            className={`flex items-center gap-2 px-3 py-2 h-8 rounded-md border text-sm font-medium transition-colors ${
              activeTypeFilter 
                ? "bg-blue-50 border-blue-200 text-blue-700" 
                : "bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50"
            }`}
          >
            <img className="w-4 h-4" alt="Sort" src="https://c.animaapp.com/membwlndqrzxnl/img/sort-descending-1.svg" />
            <span>
              Type{activeTypeFilter ? ` (${activeTypeFilter})` : ''}
            </span>
          </Button>
        </div>

        {/* Layout Filter */}
        <div className="filter-dropdown">
          <Button
            ref={layoutButtonRef}
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowLayoutDropdown(!showLayoutDropdown);
              setShowStatusDropdown(false);
              setShowTypeDropdown(false);
            }}
            className="w-8 h-8 p-0 hover:bg-zinc-100 rounded-md transition-colors"
          >
            <img className="w-4 h-4" alt="Layout column" src="https://c.animaapp.com/membwlndqrzxnl/img/layout-3-column-.svg" />
          </Button>
        </div>
      </div>

      {/* Portaled Dropdowns */}
      {showStatusDropdown &&
        createPortal(
          <div
            className="fixed bg-white border border-zinc-200 rounded-md shadow-lg z-50 min-w-[140px] py-1"
            style={{ top: statusPosition.top, left: statusPosition.left }}
          >
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`w-full px-3 py-2 text-left text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                  (status === "All" && !activeStatusFilter) || status === activeStatusFilter
                    ? "bg-blue-50 text-blue-600"
                    : "text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>,
          document.body
        )}

      {showTypeDropdown &&
        createPortal(
          <div
            className="fixed bg-white border border-zinc-200 rounded-md shadow-lg z-50 min-w-[140px] py-1"
            style={{ top: typePosition.top, left: typePosition.left }}
          >
            {typeOptions.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeFilter(type)}
                className={`w-full px-3 py-2 text-left text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                  (type === "All" && !activeTypeFilter) || type === activeTypeFilter
                    ? "bg-blue-50 text-blue-600"
                    : "text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>,
          document.body
        )}

      {showLayoutDropdown &&
        createPortal(
          <div
            className="fixed bg-white border border-zinc-200 rounded-md shadow-lg z-50 min-w-[140px] py-1"
            style={{ top: layoutPosition.top, left: layoutPosition.left }}
          >
            {layoutOptions.map((layout) => (
              <button
                key={layout}
                onClick={() => handleLayoutChange(layout)}
                className="w-full px-3 py-2 text-left text-sm text-zinc-900 hover:bg-zinc-50 transition-colors first:rounded-t-md last:rounded-b-md"
              >
                {layout}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};