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
import { AdditionalInformationSection } from '@/components/ava/Additional'

const DrawerSelectForm = () => {
  return (
    <Drawer>
      {/* Trigger button */}
      <DrawerTrigger asChild>
        <Button  className="text-blue-600 underline cursor-pointer" variant="ghost">
          Add more forms
        </Button>
      </DrawerTrigger>

      {/* Fullscreen Drawer */}
      <DrawerContent className="w-full min-h-screen  p-0">
        {/* Accessible header */}
      

        {/* Main content */}
        <div className="flex-1 overflow-scroll">
         <AdditionalInformationSection/>
        </div>

       
    
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerSelectForm
