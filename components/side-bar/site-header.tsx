import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, HelpCircle, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NotificationDropdown from "../dashboard/module/ui/Notify";

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height] px-3 sm:px-4 py-2">
      <div className="flex w-full items-center gap-3 flex-wrap lg:flex-nowrap">
        {/* Left section: Sidebar + Title */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
        </div>

        {/* Middle section: Search bar */}
        <div className="hidden sm:flex flex-1 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, deadlines, documents, transactions..."
              className="w-full pl-10 pr-16 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vioelt-500 focus:border-transparent transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded shadow-sm">Ctrl</kbd>
              <span className="text-xs text-gray-400">+</span>
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded shadow-sm">K</kbd>
            </div>
          </div>
        </div>

        {/* Right section: Actions */}
        <div className="flex items-center gap-2 ml-auto">
        

         <NotificationDropdown/>

          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <Avatar>
  <AvatarImage src="https://github.com/leerob.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
          </Button>

          
        </div>
      </div>
    </header>
  );
}
