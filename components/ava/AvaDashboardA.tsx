'use client'
import { SearchIcon } from "lucide-react";
import React, { JSX, useState } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { HeaderSection } from "./Headersection";
import { MainContentSection } from "./Mainsection";
import { RecentTransactionsSection } from "./ReacenTransvatoin";
import { Card } from "../ui/card";
import { MHeader } from "./Mheader";
import { MTable } from "./MTable";

export const AvaDashboard = (): JSX.Element => {
  const [activeNavItem, setActiveNavItem] = useState("transactions");
  const [activeSubItem, setActiveSubItem] = useState<string | undefined>("opportunities");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    price: true,
    status: true,
    currentTimeline: true,
    upcomingTimelines: true,
    closingDate: true,
  });
  const handleNavigation = (itemId: string, subItemId?: string) => {
    setActiveNavItem(itemId);
    setActiveSubItem(subItemId);
    
    // Reset filters when navigating to different sections
    if (itemId !== "transactions") {
      setStatusFilter(null);
      setTypeFilter(null);
      setActiveTab("All");
    }
  };

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
  };

  const handleTypeFilter = (type: string | null) => {
    setTypeFilter(type);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Sync tab with status filter
    if (tab === "All") {
      setStatusFilter(null);
    } else if (tab === "Active" || tab === "Pending" || tab === "Closed") {
      setStatusFilter(tab);
    }
  };

   const handleColumnToggle = (column: string, visible: boolean) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: visible,
    }));
  };
  return (
    <div
      className="bg-white min-h-screen w-full opacity-0 animate-fade-in"
      data-model-id="1267:794"
    >
      <div className="flex h-screen">
        {/* Main Content Area */}
        <main className="flex flex-col">
          {/* Header Section with Greeting */}
          <div className="px-6 pt-4 pb-2 opacity-0 animate-fade-up [--animation-delay:600ms]">
            <HeaderSection />
          </div>

          {/* Date Display */}
          <div className="px-6 pb-3 opacity-0 animate-fade-up [--animation-delay:700ms]">
            <span className="font-normal text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
              Thursday, July 31
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pb-3 opacity-0 animate-fade-up [--animation-delay:800ms]">
            <MainContentSection 
              onTabChange={handleTabChange}
              activeTab={activeTab}
            />
          </div>

          {/* Recent Transactions Card */}
          <div className="flex-1 px-6">
            <Card className="bg-white w-full rounded-lg border border-zinc-200">
              {/* Header Section */}
              <MHeader
                onStatusFilter={setStatusFilter}
                onTypeFilter={setTypeFilter}
                activeStatusFilter={statusFilter}
                activeTypeFilter={typeFilter}
                onColumnToggle={handleColumnToggle}
                visibleColumns={visibleColumns}
              />

              {/* Transactions List Section */}
              <MTable
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                visibleColumns={visibleColumns}
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};