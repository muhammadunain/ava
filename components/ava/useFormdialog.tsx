"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Newspaper, X } from "lucide-react"
import DrawerSelectForm from "../modules/form/DrawerSelectForm"
import SimpleUploadDialog from "../dialog/multiformdialog"

export default function UseForm() {
  const [files, setFiles] = React.useState([
    { name: "Buyer Broker Agreement. Property-Specific.pdf", source: "nabor mls" },
    { name: "Buyer Broker Exclusive Agreement.pdf", source: "nabor mls" },
  ])

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='text-gray-900 bg-[#f4f4f599] rounded-sm text-sm font-medium  cursor-pointer'>Use forms</Button>
      </DialogTrigger>
      <DialogContent className=" rounded-lg  p-7">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Forms & Documents</DialogTitle>
          <DialogDescription>
            AI has picked up the following forms from the library. You can choose from them or attach a document.
          </DialogDescription>
        </DialogHeader>

        {/* Files List */}
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border rounded-lg px-3 py-2 text-sm"
            >
              <span className="truncate">{file.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">{file.source}</span>
                <button
                  onClick={() => removeFile(idx)}
                  className="p-1 hover:bg-muted rounded-full"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Area */}
         <div className="mt-8 bg-gray-100 border-2 border-dashed border-gray-200 rounded-md h-28 flex flex-col items-center justify-center text-center">
             <Newspaper className="w-6 h-6 text-gray-400 mb-1" />
             <div className="text-sm text-gray-500">
               <DrawerSelectForm />
               <span className="mx-5">or</span>
               <SimpleUploadDialog />
             </div>
           </div>

        {/* Footer */}
        <div className="flex justify-end">
          <Button>Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
