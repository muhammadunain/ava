import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import DocumentFormSelector from './SelectForm'

const DrawerSelectForm = () => {
  return (
    <Drawer>
      {/* Trigger button */}
      <DrawerTrigger asChild>
        <Button className="text-gray-600 underline cursor-pointer" variant="ghost">
          attach a document
        </Button>
      </DrawerTrigger>

      {/* Fullscreen Drawer */}
      <DrawerContent className="w-full min-h-screen  p-0">
        {/* Accessible header */}
        <DrawerHeader>
          <DrawerTitle>Attach a Document</DrawerTitle>
          <DrawerDescription>Select, upload, and preview forms</DrawerDescription>
        </DrawerHeader>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <DocumentFormSelector />
        </div>

        {/* Custom footer with full-width buttons */}
        <DrawerFooter className="flex flex-row items-end justify-end gap-3 !sm:flex-col !sm:gap-3">
             <DrawerClose asChild>

          <Button className="w-20 cursor-pointer">Submit</Button>
             </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline" className="w-20 cursor-pointer">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerSelectForm
