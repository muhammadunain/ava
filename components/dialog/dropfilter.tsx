"use client";
import React, { useState } from "react";
import { BiSort } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Options
const statusOptions = [
  "Opportunities",
  "Pending",
  "Active",
  "Close Wise",
  "Expired",
];

const typeOptions = ["Buyer", "Agreement", "Listing", "Intake"];

const DropFilter = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleOption = (
    option: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((o) => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const formatLabel = (selected: string[], fallback: string) => {
    if (selected.length === 0) return fallback;
    if (selected.length === 1) return selected[0];
    return `${selected.length} selected`;
  };

  return (
    <div className="flex gap-3">
      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm"
          >
            {formatLabel(selectedStatus, "Status")}
            <BiSort className="w-3.5 h-3.5 text-zinc-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={(e) => e.preventDefault()} // prevent closing
              className="flex items-center gap-2 cursor-pointer"
              onClick={() =>
                toggleOption(option, selectedStatus, setSelectedStatus)
              }
            >
              <Checkbox checked={selectedStatus.includes(option)} />
              <span>{option}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Type Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm"
          >
            {formatLabel(selectedTypes, "Type")}
            <BiSort className="w-3.5 h-3.5 text-zinc-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {typeOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() =>
                toggleOption(option, selectedTypes, setSelectedTypes)
              }
            >
              <Checkbox checked={selectedTypes.includes(option)} />
              <span>{option}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropFilter;
