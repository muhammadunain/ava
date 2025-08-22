import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { JSX } from "react";
import { Button } from "../ui/button";

export const FormSelectionSection = (): JSX.Element => {
  return (
    <div className="flex w-full max-w-[800px] items-center justify-between translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <div className="[font-family:'Geist',Helvetica] font-normal text-zinc-500 text-sm leading-5 whitespace-nowrap">
        Step 2 of 5
      </div>

      <div className="inline-flex items-start gap-6">
        <Button
          variant="outline"
          className="h-10 items-center justify-center gap-2 px-6 py-2 border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-600"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="[font-family:'Geist',Helvetica] font-medium text-sm">
            Back
          </span>
        </Button>

        <Button className="h-10 w-[111.12px] items-center justify-center gap-2 px-6 py-2 bg-zinc-900 hover:bg-zinc-800 text-neutral-50">
          <span className="[font-family:'Geist',Helvetica] font-medium text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
            Next
          </span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
