import { ChevronUpIcon } from "lucide-react";
import React, { JSX } from "react";
import { Badge } from "@/components/ui/badge";
import { BiSort } from "react-icons/bi";
import Link from "next/link";

const transactionData = [
	{
		address: "742 Evergreen Terrace",
		representing: { name: "Dylan Sanders", role: "Buyer" },
		price: "$238,000",
		status: "Active",
		currentTimeline: {
			task: "Buyer's Initial Deposit",
			progress: { current: 12, total: 35 },
			date: "25 Aug",
			urgency: "4d",
			urgencyColor: "bg-[#f42c2c1a] text-[#f42c2c]",
		},
		upcomingTimelines: [
			{
				task: "Condominium Doc...",
				urgency: "11d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
			{
				task: "Condo Fire...",
				urgency: "11d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
		],
		closingDate: "Dec 5, 2025",
	},
	{
		address: "1199 Oakwood Drive",
		representing: { name: "Olivia Thompson", role: "Buyer" },
		price: "$450,000",
		status: "Active",
		currentTimeline: {
			task: "Purchase agreement",
			progress: { current: 21, total: 25 },
			date: "16 Aug",
			urgency: "4d",
			urgencyColor: "bg-[#f42c2c1a] text-[#f42c2c]",
		},
		upcomingTimelines: [
			{
				task: "Deposited payment",
				urgency: "5d",
				urgencyColor: "bg-[#ffbc001a] text-[#ffbc00]",
			},
			{
				task: "Buyer election",
				urgency: "7d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
		],
		closingDate: "Aug 23, 2025",
	},
	{
		address: "56 Maple Grove Lane",
		representing: { name: "Jacob Anderson", role: "Seller" },
		price: "$125,000",
		status: "Pending",
		currentTimeline: {
			task: "Escrow receipt received",
			progress: { current: 11, total: 32 },
			date: "17 Aug",
			urgency: "5d",
			urgencyColor: "bg-[#ffbc001a] text-[#ffbc00]",
		},
		upcomingTimelines: [
			{
				task: "Purchase agreement",
				urgency: "7d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
			{
				task: "Buyer election",
				urgency: "8d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
		],
		closingDate: "Aug 22, 2025",
	},
	{
		address: "375 Cedar Ridge Road",
		representing: { name: "Ryan Mitchell", role: "Seller" },
		price: "$850,000",
		status: "Active",
		currentTimeline: {
			task: "Schedule home inspection",
			progress: { current: 11, total: 32 },
			date: "20 Aug",
			urgency: "2d",
			urgencyColor: "bg-[#f42c2c1a] text-[#f42c2c]",
		},
		upcomingTimelines: [
			{
				task: "Deposited payment",
				urgency: "7d",
				urgencyColor: "bg-[#ffbc001a] text-[#ffbc00]",
			},
			{
				task: "Buyer election",
				urgency: "12d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
		],
		closingDate: "Sep 12, 2025",
	},
	{
		address: "210 Birch Hill Avenue",
		representing: { name: "Emily Harris", role: "Both" },
		price: "$1250,000",
		status: "Pending",
		currentTimeline: {
			task: "Receives disclosures",
			progress: { current: 24, total: 35 },
			date: "24 Aug",
			urgency: "1d",
			urgencyColor: "bg-[#f42c2c1a] text-[#f42c2c]",
		},
		upcomingTimelines: [
			{
				task: "Buyer broker...",
				urgency: "3d",
				urgencyColor: "bg-[#f42c2c1a] text-[#f42c2c]",
			},
			{
				task: "Buyer election",
				urgency: "5d",
				urgencyColor: "bg-[#ffbc001a] text-[#ffbc00]",
			},
		],
		closingDate: "Sep 2, 2025",
	},
	{
		address: "48 Pinecrest Boulevard",
		representing: { name: "Nathan Parker", role: "Seller" },
		price: "$550,000",
		status: "Pending",
		currentTimeline: {
			task: "Review disclosures",
			progress: { current: 11, total: 32 },
			date: "26 Aug",
			urgency: "8d",
			urgencyColor: "bg-[#00d5311a] text-[#00d531]",
		},
		upcomingTimelines: [
			{
				task: "Deposited payment",
				urgency: "12d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
			{
				task: "Escrow receipt",
				urgency: "27d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
		],
		closingDate: "Aug 25, 2025",
	},
	{
		address: "921 Aspen Meadows",
		representing: { name: "Grace Sullivan", role: "Seller" },
		price: "$450,500",
		status: "Pending",
		currentTimeline: {
			task: "Buyer election",
			progress: { current: 11, total: 32 },
			date: "31 Aug",
			urgency: "2d",
			urgencyColor: "bg-[#f42c2c1a] text-[#f42c2c]",
		},
		upcomingTimelines: [
			{
				task: "Deposited payment",
				urgency: "5d",
				urgencyColor: "bg-[#ffbc001a] text-[#ffbc00]",
			},
			{
				task: "Buyer broker...",
				urgency: "8d",
				urgencyColor: "bg-[#00d5311a] text-[#00d531]",
			},
		],
		closingDate: "Sep 6, 2025",
	},
];

interface TransactionsListSectionProps {
	statusFilter: string | null;
	typeFilter: string | null;
	visibleColumns: Record<string, boolean>;
}

export const MTable = ({
	statusFilter,
	typeFilter,
	visibleColumns,
}: TransactionsListSectionProps): JSX.Element => {
	const filteredTransactions = transactionData.filter((transaction) => {
		const statusMatch = !statusFilter || transaction.status === statusFilter;
		const typeMatch =
			!typeFilter || transaction.representing.role === typeFilter;
		return statusMatch && typeMatch;
	});
	return (
		<section className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
			<Link href={'/opportunites'}>
			<div className="w-full bg-white rounded-lg overflow-hidden">
				<div
					className="grid gap-4 px-6  border-b border-gray-200"
					style={{
						gridTemplateColumns: [
							"200px", // Address
							"150px", // Representing
							visibleColumns.price ? "100px" : "",
							visibleColumns.status ? "80px" : "",
							visibleColumns.currentTimeline ? "200px" : "",
							visibleColumns.upcomingTimelines ? "180px" : "",
							visibleColumns.closingDate ? "120px" : "",
						]
							.filter(Boolean)
							.join(" "),
					}}>
					<div className="flex items-center gap-1">
						<span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
							Address
						</span>
						<BiSort className="w-3.5 h-3.5 text-zinc-500" />
					</div>

					<div className="flex items-center gap-1">
						<span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
							Representing
						</span>
						<BiSort className="w-3.5 h-3.5 text-zinc-500" />
					</div>

					{visibleColumns.price && (
						<div className="flex items-center gap-1">
							<span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
								Price
							</span>
							<BiSort className="w-3.5 h-3.5 text-zinc-500" />
						</div>
					)}

					{visibleColumns.status && (
						<div className="flex items-center gap-1">
							<span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
								Status
							</span>
							<BiSort className="w-3.5 h-3.5 text-zinc-500" />
						</div>
					)}

					{visibleColumns.currentTimeline && (
						<div className="flex items-center gap-1">
							<span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
								Current Timeline
							</span>
							<BiSort className="w-3.5 h-3.5 text-zinc-500" />
						</div>
					)}

					{visibleColumns.upcomingTimelines && (
						<div className="flex items-center gap-1">
							<span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
								Upcoming Timelines
							</span>
							<BiSort className="w-3.5 h-3.5 text-zinc-500" />
						</div>
					)}

					{visibleColumns.closingDate && (
						<div className="flex items-center gap-1">
							<span className="font-medium text-zinc-500 text-sm leading-5 [font-family:'Geist',Helvetica]">
								Closing Date
							</span>
							<BiSort className="w-3.5 h-3.5 text-zinc-500" />
						</div>
					)}
				</div>

				<div className="divide-y divide-gray-200">
					{filteredTransactions.map((transaction, index) => (
						<div
							key={index}
							className={`grid gap-4 px-6 py-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:${
								(index + 1) * 100
							}ms]`}
							style={{
								gridTemplateColumns: [
									"200px", // Address
									"150px", // Representing
									visibleColumns.price ? "100px" : "",
									visibleColumns.status ? "80px" : "",
									visibleColumns.currentTimeline ? "200px" : "",
									visibleColumns.upcomingTimelines ? "180px" : "",
									visibleColumns.closingDate ? "120px" : "",
								]
									.filter(Boolean)
									.join(" "),
							}}>
							<div className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica] text-left">
								{transaction.address}
							</div>

							<div className="flex flex-col gap-1.5 items-start">
								<div className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica] text-left">
									{transaction.representing.name}
								</div>
								<Badge
									variant="secondary"
									className="w-fit px-2 py-0.5 bg-zinc-100 text-zinc-900 text-xs font-medium [font-family:'Geist',Helvetica] rounded-full">
									{transaction.representing.role}
								</Badge>
							</div>

							{visibleColumns.price && (
								<div className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica] text-left">
									{transaction.price}
								</div>
							)}

							{visibleColumns.status && (
								<div className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica] text-left">
									{transaction.status}
								</div>
							)}

							{visibleColumns.currentTimeline && (
								<div className="flex flex-col gap-1.5 items-start">
									<Badge
										variant="secondary"
										className="w-fit px-2 py-0.5 bg-zinc-100 text-zinc-900 text-xs font-medium [font-family:'Geist',Helvetica] rounded-full">
										{transaction.currentTimeline.task}
									</Badge>
									<div className="flex items-center gap-1.5">
										<div className="relative w-[103px] h-[19px] bg-zinc-100 rounded-[22px]">
											<div
												className="h-[19px] bg-[#2574eb29] rounded-[21px_0px_0px_21px]"
												style={{
													width: `${
														(transaction.currentTimeline.progress.current /
															transaction.currentTimeline.progress.total) *
														103
													}px`,
												}}
											/>
											<div className="absolute inset-0 flex items-center justify-center font-medium text-[#2574eb] text-xs leading-[15px] [font-family:'Geist',Helvetica]">
												{transaction.currentTimeline.progress.current}/
												{transaction.currentTimeline.progress.total}
											</div>
										</div>
										<span className="font-normal text-zinc-500 text-xs leading-4 [font-family:'Geist',Helvetica]">
											{transaction.currentTimeline.date}
										</span>
										<Badge
											className={`px-2 py-0.5 ${transaction.currentTimeline.urgencyColor} text-[10px] font-semibold [font-family:'Geist',Helvetica] rounded-full border-0`}>
											{transaction.currentTimeline.urgency}
										</Badge>
									</div>
								</div>
							)}

							{visibleColumns.upcomingTimelines && (
								<div className="flex flex-col gap-1.5 items-start">
									{transaction.upcomingTimelines.map(
										(timeline, timelineIndex) => (
											<div
												key={timelineIndex}
												className="flex items-center gap-1">
												<Badge
													variant="secondary"
													className="px-2 py-0.5 bg-zinc-100 text-zinc-900 text-xs font-medium [font-family:'Geist',Helvetica] rounded-full">
													{timeline.task}
												</Badge>
												<Badge
													className={`px-2 py-0.5 ${timeline.urgencyColor} text-[10px] font-semibold [font-family:'Geist',Helvetica] rounded-full border-0`}>
													{timeline.urgency}
												</Badge>
											</div>
										)
									)}
								</div>
							)}

							{visibleColumns.closingDate && (
								<div className="font-medium text-zinc-900 text-sm leading-5 [font-family:'Geist',Helvetica] text-left">
									{transaction.closingDate}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			</Link>
		</section>
	);
};
