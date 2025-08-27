"use client";

import { Card } from "@/components/ui/card";
import React, { JSX, useState } from "react";
import { TransactionsListSection } from "./TranscationList";
import { HeaderSectionFinal } from "./headersection";


export const Transactions = (): JSX.Element => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    price: true,
    status: true,
    currentTimeline: true,
    upcomingTimelines: true,
    closingDate: true,
  });

  const handleColumnToggle = (column: string, visible: boolean) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: visible,
    }));
  };

  return (
    <div className="bg-white min-h-screen w-full animate-fade-in my-5">
      {/* Main Layout */}
      <div className="flex">
        {/* Main Content Area */}
         <div className="flex-1 w-full">
                    <Card className="bg-white w-full max-w-none rounded-lg border border-zinc-200 overflow-hidden">
            {/* Header Section */}
            <HeaderSectionFinal
              onStatusFilter={setStatusFilter}
              onTypeFilter={setTypeFilter}
              activeStatusFilter={statusFilter}
              activeTypeFilter={typeFilter}
              onColumnToggle={handleColumnToggle}
              visibleColumns={visibleColumns}
            />

            {/* Transactions List Section */}
            <TransactionsListSection
              statusFilter={statusFilter}
              typeFilter={typeFilter}
              visibleColumns={visibleColumns}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
