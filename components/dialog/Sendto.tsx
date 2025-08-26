"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import toast from "react-hot-toast"

const SendTo = () => {
  const handleClick = (action: string) => {
    toast.success(`${action} action triggered`)
  }

  return (
    <div className="flex items-center">
      {/* Main Send Action */}
      <Button 
        variant="outline" 
        className="rounded-r-none"
      >
        Actions
      </Button>

      {/* Dropdown Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
          size={'icon'}
            variant="ghost" 
            className="rounded-l-none"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => handleClick("Share")}>
           Share
          </DropdownMenuItem> <DropdownMenuItem onClick={() => handleClick("E-Sign")}>
            E-Sign
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("Download")}>
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SendTo
