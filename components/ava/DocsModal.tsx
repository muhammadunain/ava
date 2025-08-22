import React, { JSX } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { AdditionalInformationSection } from "./Additional";
import { FormDetailsSection } from "./FormDetailsSection";
import { FormSelectionSection } from "./FormSelectionSection";

export const AddFormInNew = (): JSX.Element => {
  return (
    <div >

      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-gray-600 underline cursor-pointer" variant="ghost">
                   attach a document
                 </Button>
        </DialogTrigger>
        <DialogContent className="w-full h-full overflow-auto p-0">
          <div
            className="bg-white w-full flex flex-col relative"
            data-model-id="2489:233"
          >
            

            <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
              <AdditionalInformationSection />
            </div>

           

          

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
