import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { ChartAreaInteractive } from "@/components/side-bar/chart-area-interactive";
import { DataTable } from "@/components/side-bar/data-table";
import { SectionCards } from "@/components/side-bar/section-cards";
import { SiteHeader } from "@/components/side-bar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "../../public/data.json";

export default function Page() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<SectionCards />
							<div className="px-4 lg:px-6">
								<ChartAreaInteractive />
							</div>
							<DataTable data={data} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
