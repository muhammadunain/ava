import { CalendarIcon, PlusIcon } from "lucide-react";
import React, { JSX } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const selectFields = [
  { label: "Representing", placeholder: "select" },
  { label: "Type", placeholder: "select" },
  { label: "Status", placeholder: "select" },
];

const addressFields = [
  {
    label: "Address",
    value: "122 Crystal Reef League city",
    width: "w-[291px]",
  },
  { label: "City", value: "Florida", width: "w-[229px]" },
  { label: "State", value: "", width: "w-[45px]" },
  { label: "Zip", value: "", width: "w-[107px]" },
];

const transactionFields = [
  { label: "Transaction name", value: "League city", width: "w-[475px]" },
  { label: "Price", value: "$232,000", width: "w-[229px]" },
];

const dateFields = [
  [
    { label: "Buyer agreement date", value: "24 August, 2025" },
    { label: "Buyer expiration date", value: "29 August, 2025" },
    { label: "Acceptance date", value: "26 August, 2025" },
  ],
  [
    { label: "Listing date", value: "21 August, 2025" },
    { label: "Listing expiration date", value: "", isEmpty: true },
    { label: "Closing date", value: "", isEmpty: true },
  ],
];

export const FormDetailsSection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[800px] bg-white rounded-lg shadow-[0px_0px_24px_#00000014] translate-y-[-1rem] animate-fade-in opacity-0">
      <CardContent className="p-10">
        <div className="flex flex-col gap-6">
          {/* First row - Select fields */}
          <div className="grid grid-cols-3 gap-4">
            {selectFields.map((field, index) => (
              <div
                key={field.label}
                className={`space-y-3 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:${200 + index * 100}ms]`}
              >
                <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-900 text-sm">
                  {field.label}
                </Label>
                <Select>
                  <SelectTrigger className="h-10 bg-zinc-100 border-zinc-200 [font-family:'Geist',Helvetica]">
                    <SelectValue
                      placeholder={field.placeholder}
                      className="text-zinc-500"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Second row - Address fields */}
          <div className="grid grid-cols-12 gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms]">
            <div className="col-span-5 space-y-3">
              <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-500 text-sm">
                Address
              </Label>
              <Input
                defaultValue="122 Crystal Reef League city"
                className="h-10 bg-white border-zinc-200 [font-family:'Geist',Helvetica] text-zinc-500"
              />
            </div>
            <div className="col-span-4 space-y-3">
              <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-500 text-sm">
                City
              </Label>
              <Input
                defaultValue="Florida"
                className="h-10 bg-white border-zinc-200 [font-family:'Geist',Helvetica] text-zinc-500"
              />
            </div>
            <div className="col-span-1 space-y-3">
              <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-500 text-sm">
                State
              </Label>
              <Input className="h-10 bg-white border-zinc-200" />
            </div>
            <div className="col-span-2 space-y-3">
              <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-500 text-sm">
                Zip
              </Label>
              <Input className="h-10 bg-white border-zinc-200" />
            </div>
          </div>

          {/* Third row - Transaction fields */}
          <div className="grid grid-cols-12 gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            <div className="col-span-8 space-y-3">
              <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-500 text-sm">
                Transaction name
              </Label>
              <Input
                defaultValue="League city"
                className="h-10 bg-white border-zinc-200 [font-family:'Geist',Helvetica] text-zinc-500"
              />
            </div>
            <div className="col-span-4 space-y-3">
              <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-500 text-sm">
                Price
              </Label>
              <Input
                defaultValue="$232,000"
                className="h-10 bg-white border-zinc-200 [font-family:'Geist',Helvetica] text-zinc-500"
              />
            </div>
          </div>

          {/* Date fields rows */}
          {dateFields.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-3 gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:${700 + rowIndex * 100}ms]`}
            >
              {row.map((field, fieldIndex) => (
                <div key={field.label} className="space-y-3">
                  <Label className="[font-family:'Geist',Helvetica] font-medium text-zinc-500 text-sm">
                    {field.label}
                  </Label>
                  {field.isEmpty ? (
                    <div className="h-10 bg-white rounded-md border border-zinc-200" />
                  ) : (
                    <div className="relative">
                      <Input
                        defaultValue={field.value}
                        className="h-10 bg-white border-zinc-200 [font-family:'Geist',Helvetica] text-zinc-500 pr-10"
                        readOnly
                      />
                      <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-zinc-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Additional fields button */}
          <div className="flex items-center gap-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:900ms]">
            <PlusIcon className="h-4 w-4 text-[#2574eb]" />
            <Button
              variant="link"
              className="h-auto p-0 [font-family:'Geist',Helvetica] font-normal text-[#2574eb] text-sm hover:no-underline"
            >
              Additional fields
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
