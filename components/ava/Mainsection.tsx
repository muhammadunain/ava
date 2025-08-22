'use client'
import React, { JSX, useState } from "react";
import { Button } from "../ui/button";

interface MainContentSectionProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export const MainContentSection = ({ onTabChange, activeTab }: MainContentSectionProps): JSX.Element => {

  const tabsData = [
    {
      id: "All",
      label: "All",
      icon: "https://c.animaapp.com/membwlndqrzxnl/img/frame-1-1.svg",
    },
    {
      id: "Opportunity",
      label: "Opportunity",
      icon: "https://c.animaapp.com/membwlndqrzxnl/img/svg-8.svg",
    },
    {
      id: "Active",
      label: "Active",
      icon: "https://c.animaapp.com/membwlndqrzxnl/img/svg-20.svg",
    },
    {
      id: "Pending",
      label: "Pending",
      icon: "https://c.animaapp.com/membwlndqrzxnl/img/frame-2-1.svg",
    },
    {
      id: "Closed",
      label: "Closed",
      icon: "https://c.animaapp.com/membwlndqrzxnl/img/svg-18.svg",
    },
    {
      id: "Void",
      label: "Void",
      icon: "https://c.animaapp.com/membwlndqrzxnl/img/svg-19.svg",
    },
  ];

  return (
    <nav className="flex w-full z-10 items-start p-1 bg-zinc-100 rounded-md translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      {tabsData.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={`flex h-8 items-center justify-center z-10 px-3 py-1.5 flex-1 grow rounded transition-colors ${
            activeTab === tab.id
              ? "bg-white shadow-[0px_1px_2px_#0000000d,0px_0px_0px_transparent,0px_0px_0px_transparent]"
              : "hover:bg-white/50"
          }`}
        >
          <div className="inline-flex items-center gap-2">
            <img className="w-4 h-4" alt={tab.label} src={tab.icon} />
            <span
              className={`font-medium text-sm text-center leading-5 [font-family:'Geist',Helvetica] whitespace-nowrap ${
                activeTab === tab.id ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              {tab.label}
            </span>
          </div>
        </Button>
      ))}
    </nav>
  );
};
