'use client'
import { SearchIcon } from "lucide-react";
import React, { JSX, useState } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { HeaderSection } from "./Headersection";
import { MainContentSection } from "./Mainsection";
import { RecentTransactionsSection } from "./ReacenTransvatoin";
import { UserSection } from "./userSection";

export const AvaDashboard = (): JSX.Element => {
  const [activeNavItem, setActiveNavItem] = useState("transactions");
  const [activeSubItem, setActiveSubItem] = useState<string | undefined>("opportunities");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

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
  return (
    <div
      className="bg-white min-h-screen w-full opacity-0 animate-fade-in"
      data-model-id="1267:794"
    >
      <div className="flex h-screen">
       

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
        

          {/* Header Section with Greeting */}
          <div className="px-6 py-4 opacity-0 animate-fade-up [--animation-delay:600ms]">
            <HeaderSection />
          </div>

          {/* Date Display */}
          <div className="px-6 pb-4 opacity-0 animate-fade-up [--animation-delay:700ms]">
            <span className="font-normal text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
              Thursday, July 31
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pb-4 opacity-0 animate-fade-up [--animation-delay:800ms]">
            <MainContentSection 
              onTabChange={handleTabChange}
              activeTab={activeTab}
            />
          </div>

          {/* Recent Transactions Header */}
          <div className="px-6 my-3 opacity-0 animate-fade-up [--animation-delay:900ms]">
            <RecentTransactionsSection 
              onStatusFilter={handleStatusFilter}
              onTypeFilter={handleTypeFilter}
              activeStatusFilter={statusFilter}
              activeTypeFilter={typeFilter}
            />
          </div>

          {/* Main Table */}
          <div className="flex-1 px-6 pb-6 opacity-0 animate-fade-up [--animation-delay:1000ms]">
            <UserSection 
              statusFilter={statusFilter}
              typeFilter={typeFilter}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
