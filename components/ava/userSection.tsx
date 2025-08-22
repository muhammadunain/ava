import { ChevronUpIcon } from "lucide-react";
import React, { JSX } from "react";
import { Badge } from "../ui/badge";
import { tableData } from "@/constants";
import { BiSort } from "react-icons/bi";




const getUrgencyColor = (type: string) => {
  switch (type) {
    case "urgent":
      return "bg-[#f42c2c1a] text-[#f42c2c]";
    case "warning":
      return "bg-[#ffbc001a] text-[#ffbc00]";
    case "safe":
      return "bg-[#00d5311a] text-[#00d531]";
    default:
      return "bg-zinc-100 text-zinc-900";
  }
};

interface UserSectionProps {
  statusFilter: string | null;
  typeFilter: string | null;
}

export const UserSection = ({ statusFilter, typeFilter }: UserSectionProps): JSX.Element => {
  // Filter the table data based on active filters
  const filteredData = tableData.filter((row) => {
    // Status filter
    const statusMatch = !statusFilter || row.status === statusFilter;
    
    // Type filter
    let typeMatch = true;
    if (typeFilter) {
      if (Array.isArray(row.representing)) {
        // For multiple representatives
        if (typeFilter.toLowerCase() === "both") {
          typeMatch = row.representing.length > 1;
        } else {
          typeMatch = row.representing.some(person => 
            person.type.toLowerCase() === typeFilter.toLowerCase()
          );
        }
      } else {
        // For single representative
        if (typeFilter.toLowerCase() === "both") {
          typeMatch = row.representing.type.toLowerCase() === "both";
        } else {
          typeMatch = row.representing.type.toLowerCase() === typeFilter.toLowerCase();
        }
      }
    }
    
    return statusMatch && typeMatch;
  });

  return (
    <div className="w-full bg-white rounded-lg border border-zinc-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 w-[183px]">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
                    Address
                  </span>
                  <BiSort  className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="text-left px-4 py-3 w-[158px]">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
                    Representing
                  </span>
                  <BiSort className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="text-left px-4 py-3 w-[89px]">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
                    Price
                  </span>
                  <BiSort className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="text-left px-4 py-3 w-[78px]">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
                    Status
                  </span>
                  <BiSort className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="text-left px-4 py-3 w-[209px]">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
                    Current Timeline
                  </span>
                  <BiSort className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="text-left px-4 py-3 w-[332px]">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
                    Upcoming Timelines
                  </span>
                  <BiSort className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="text-left px-4 py-3 w-[144px]">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
                    Closing Date
                  </span>
                  <BiSort className="w-5 h-5 text-zinc-500" />
                </div>
              </th>
            </tr>
          </thead>
        <tbody className="text-start text-xs ">
  {filteredData.map((row, index) => (
    <tr
      key={index}
      className="border-b border-zinc-200 hover:bg-zinc-50/50 align-top"
    >
      {/* Address */}
      <td className="px-1 py-4 w-full align-top">
        <span className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica]">
          {row.address}
        </span>
      </td>

      {/* Representing */}
     <td className="px-4 py-4 align-top">
  {Array.isArray(row.representing) ? (
    <div className="flex flex-col gap-2">
      {row.representing.map((person, personIndex) => (
        <div key={personIndex} className="flex flex-col">
          <span className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica]">
            {person.name}
          </span>
          <Badge
            variant="secondary"
            className="w-fit mt-1 px-2 py-0.5 bg-zinc-100 text-zinc-900 text-[10px] leading-[15px] [font-family:'Geist',Helvetica]"
          >
            {person.type}
          </Badge>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col">
      <span className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica]">
        {row.representing.name}
      </span>
      <Badge
        variant="secondary"
        className="w-fit mt-1 px-2 py-0.5 bg-zinc-100 text-zinc-900 text-[10px] leading-[15px] [font-family:'Geist',Helvetica]"
      >
        {row.representing.type}
      </Badge>
    </div>
  )}
</td>


      {/* Price */}
      <td className="px-4 py-4 align-top">
        <span className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica]">
          {row.price}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-4 align-top">
        <span className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica]">
          {row.status}
        </span>
      </td>

      {/* Current Timeline */}
      <td className="px-4 py-4 align-top">
        <div className="flex flex-col gap-1.5">
          <Badge
            variant="secondary"
            className="px-2 py-0.5 bg-zinc-100 text-zinc-900 text-xs leading-[15px] [font-family:'Geist',Helvetica] w-fit"
          >
            {row.currentTimeline.task}
          </Badge>
          <div className="flex items-center gap-1.5">
            <div className="relative w-[103px] h-[19px] bg-zinc-100 rounded-[22px]">
              <div
                className="h-[19px] bg-[#2574eb29] rounded-[21px]"
                style={{
                  width: `${
                    (row.currentTimeline.progress.current /
                      row.currentTimeline.progress.total) *
                    100
                  }%`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-medium text-[#2574eb] text-xs leading-[15px] [font-family:'Geist',Helvetica]">
                  {row.currentTimeline.progress.current}/
                  {row.currentTimeline.progress.total}
                </span>
              </div>
            </div>
            <span className="font-normal text-zinc-500 text-xs leading-4 [font-family:'Geist',Helvetica]">
              {row.currentTimeline.date}
            </span>
            <Badge
              className={`px-2 py-0.5 text-[10px] leading-[15px] [font-family:'Geist',Helvetica] font-semibold ${getUrgencyColor(
                row.currentTimeline.urgencyType
              )}`}
            >
              {row.currentTimeline.urgency}
            </Badge>
          </div>
        </div>
      </td>

      {/* Upcoming Timelines */}
      <td className="px-4 py-4 align-top">
        <div className="flex flex-col gap-1.5">
          {row.upcomingTimelines.map((timeline, timelineIndex) => (
            <div key={timelineIndex} className="flex items-center gap-1">
              <Badge
                variant="secondary"
                className="px-2 py-0.5 bg-zinc-100 text-zinc-900 text-xs leading-[15px] [font-family:'Geist',Helvetica]"
              >
                {timeline.task}
              </Badge>
              <Badge
                className={`px-2 py-0.5 text-[10px] leading-[15px] [font-family:'Geist',Helvetica] font-semibold ${getUrgencyColor(
                  timeline.urgencyType
                )}`}
              >
                {timeline.urgency}
              </Badge>
            </div>
          ))}
        </div>
      </td>

      {/* Closing Date */}
      <td className=" py-4 align-top">
        <span className="font-medium text-zinc-900 text-sm  [font-family:'Geist',Helvetica]">
          {row.closingDate}
        </span>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};
