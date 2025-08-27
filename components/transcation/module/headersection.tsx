import { ArrowUpDownIcon, Columns3Icon } from "lucide-react";
import React, { JSX } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropFilter from "@/components/dialog/dropfilter";
import { Checkbox } from "@/components/ui/checkbox";

interface HeaderSectionProps {
  onStatusFilter: (status: string | null) => void;
  onTypeFilter: (type: string | null) => void;
  activeStatusFilter: string | null;
  activeTypeFilter: string | null;
  onColumnToggle: (column: string, visible: boolean) => void;
  visibleColumns: Record<string, boolean>;
}

export const HeaderSectionFinal = ({ 
  onStatusFilter, 
  onTypeFilter, 
  activeStatusFilter, 
  activeTypeFilter,
  onColumnToggle,
  visibleColumns
}: HeaderSectionProps): JSX.Element => {

  return (
    <header className="flex w-full p-2 items-center justify-between px-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-zinc-950 text-xl [font-family:'Geist',Helvetica] whitespace-nowrap">
            Transactions
          </h1>
          <Badge className=" py-0.5 bg-[#2574eb] rounded-full hover:bg-[#2574eb]/90">
            <span className="font-semibold text-white text-[10px] leading-[15px]">
              9
            </span>
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold text-zinc-950 text-sm leading-5 [font-family:'Geist',Helvetica]">
            $6,450,500
          </span>
          <span className="text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
            Office Gross
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 animate-fade-in opacity-0 [--animation-delay:200ms]">
    {/* Status Button */}
  <DropFilter/>

    {/* Columns Toggle */}
   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 hover:bg-zinc-100 transition-colors"
        >
          <Columns3Icon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onColumnToggle("price", !visibleColumns.price)}
          >
            <Checkbox checked={visibleColumns.price} />
            <span>Price</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onColumnToggle("status", !visibleColumns.status)}
          >
            <Checkbox checked={visibleColumns.status} />
            <span>Status</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              onColumnToggle("currentTimeline", !visibleColumns.currentTimeline)
            }
          >
            <Checkbox checked={visibleColumns.currentTimeline} />
            <span>Current Timeline</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              onColumnToggle(
                "upcomingTimelines",
                !visibleColumns.upcomingTimelines
              )
            }
          >
            <Checkbox checked={visibleColumns.upcomingTimelines} />
            <span>Upcoming Timelines</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              onColumnToggle("closingDate", !visibleColumns.closingDate)
            }
          >
            <Checkbox checked={visibleColumns.closingDate} />
            <span>Closing Date</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
    </header>
  );
};
