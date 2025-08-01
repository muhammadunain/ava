import WorkingChatbot from "@/components/chat/ChatModal";
import { Sidebar, TopNavbar } from "@/components/final/Sidebar";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { ChartAreaInteractive } from "@/components/side-bar/chart-area-interactive";
import { DataTable } from "@/components/side-bar/data-table";
import { SectionCards } from "@/components/side-bar/section-cards";
import { SiteHeader } from "@/components/side-bar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { LayerProps } from "recharts";

const Layout = ({ children }: LayerProps) => {
	return (
		<>
		<div className="flex h-screen overflow-hidden">
      {/* Sidebar always on the left */}
      <Sidebar />

      {/* Main area (TopNavbar + Content) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto px-4 ">
          {children}
        </main>
      </div>
    </div>


		</>
	);
};

export default Layout;
