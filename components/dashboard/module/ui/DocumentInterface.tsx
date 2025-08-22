"use client";

import React, { useState } from "react";
import {
	ChevronDown,
	ChevronRight,
	FileText,
	Calendar,
	X,
	Check,
	BadgeIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import UploadDocumentsModal from "@/components/ava/FormModal";
import UseForm from "@/components/ava/useFormdialog";
import { documents } from "@/constants";

const DocumentsInterface = () => {
	// Initialize with only the second item (16 Aug - Buyer Broker Agreement) open by default
	const [expandedSections, setExpandedSections] = useState({
		"Buyer Broker Agreement": true,
	});
	const [checkboxStates, setCheckboxStates] = useState({
		"Property Disclosure Statement Review": false,
		"Final Walkthrough Completion Checklist": true,
	});

	const toggleSection = (sectionId: any) =>
		// @ts-ignore
		setExpandedSections((p) => ({ ...p, [sectionId]: !p[sectionId] }));

	const toggleCheckbox = (title: string) => {
		setCheckboxStates((prev) => ({
			...prev,
			[title]: !prev[title as keyof typeof prev],
		}));
	};

	const DocumentRow = ({
		date,
		type,
		title,
		status,
		dia,
		hasTimeline,
		timelineItems,
		onClick,
		isCheckbox,
	}: any) => {
		// @ts-ignore
		const isExpanded = expandedSections[title];
		const isChecked = checkboxStates[title as keyof typeof checkboxStates];

		return (
			<div className="border-b border-gray-100 last:border-b-0">
				{/* Row header */}
				<div
					className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 cursor-pointer"
					onClick={() => {
						if (isCheckbox) {
							toggleCheckbox(title);
						} else if (hasTimeline) {
							toggleSection(title);
						} else {
							onClick?.();
						}
					}}>
					<div className="flex items-center">
						<span className="text-sm text-gray-500 min-w-[60px]">{date}</span>
						<div className="flex items-center gap-2">
							<span
								className={`text-xs px-2 py-1 rounded-full font-medium ${
									type === "2d"
										? "bg-red-100 text-red-600"
										: type === "3d"
										? "bg-blue-100 text-blue-600"
										: type === "5d"
										? "bg-yellow-100 text-yellow-600"
										: type === "6d"
										? "bg-green-100 text-green-600"
										: type === "9d"
										? "bg-green-100 text-green-600"
										: type === "checkbox"
										? "bg-purple-100 text-purple-600"
										: "bg-gray-100 text-gray-600"
								}`}>
								{type}
							</span>
							{isCheckbox ? (
								<>
									<div className="flex items-center gap-2">
										<Badge className="h-5 min-w-5 bg-gray-100 text-blue-500 font-normal rounded-full px-1 font-mono tabular-nums">
											DS
										</Badge>
									</div>
									<div
										className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
											isChecked
												? "bg-blue-600 border-blue-600"
												: "bg-white border-gray-300"
										}`}>
										{isChecked && (
											<Check className="w-2.5 h-2.5 text-white stroke-2" />
										)}
									</div>
								</>
							) : (
								<>
									<div className="flex items-center gap-2">
										<Badge className="h-5 min-w-5 bg-gray-100 text-blue-500 font-normal rounded-full px-1 font-mono tabular-nums">
											DS
										</Badge>
										<FileText className="w-4 h-4 text-gray-400" />
									</div>
								</>
							)}
							<span className="text-gray-900 font-medium text-sm">{title}</span>
						</div>
					</div>

					<div className="flex items-center gap-2">
						{status === "uploaded" && (
							<span className="text-blue-600 text-sm font-medium">
								uploaded
							</span>
						)}
						{status === "use-forms" && (
							<UseForm/>
						)}
						{status === "upload" && (
							<span className="text-blue-600 text-sm font-medium">Upload</span>
						)}

						{dia === "upload" && <UploadDocumentsModal />}
						{isCheckbox && <ChevronRight className="w-4 h-4 text-gray-400" />}

						{!isCheckbox && (
							<>
								{hasTimeline ? (
									isExpanded ? (
										<ChevronDown className="w-4 h-4 text-gray-400" />
									) : (
										<ChevronRight className="w-4 h-4 text-gray-400" />
									)
								) : (
									<ChevronRight className="w-4 h-4 text-gray-400" />
								)}
							</>
						)}
					</div>
				</div>

				{/* Timeline - Compact Design */}
				{hasTimeline && isExpanded && (
					<div className="px-6 pb-4">
						<div className=" relative">
							<div className="space-y-0 ">
								{timelineItems?.map((item: any, idx: any) => (
									<div key={idx} className="relative flex items-start  py-2">
										{/* Vertical line - positioned to connect through markers */}
										{idx < timelineItems.length - 1 && (
											<div className="absolute left-1.5 top-6 bottom-0 w-px bg-gray-200 z-0" />
										)}

										{/* Timeline marker */}
										<div className="relative z-10 flex-shrink-0">
											<div
												className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
													item.completed
														? "bg-blue-600 border-blue-600"
														: "bg-white border-gray-300"
												}`}>
												{item.completed && (
													<Check className="w-2.5 h-2.5 text-white stroke-2" />
												)}
											</div>
										</div>

										{/* Content */}
										<div
											className={`flex-1 p-2 rounded-md border ${
												item.completed
													? "bg-blue-50 border-blue-200"
													: "bg-gray-50 border-gray-200"
											}`}>
											<div className="flex items-start gap-2">
												{/* Icon */}
												<div className="flex-shrink-0 mt-0.5">
													{item.icon === "calendar" && (
														<Calendar
															className={`w-3 h-3 ${
																item.completed
																	? "text-blue-600"
																	: "text-gray-500"
															}`}
														/>
													)}
													{item.icon === "file" && (
														<FileText
															className={`w-3 h-3 ${
																item.completed
																	? "text-blue-600"
																	: "text-gray-500"
															}`}
														/>
													)}
													{item.icon === "clipboard" && (
														<FileText
															className={`w-3 h-3 ${
																item.completed
																	? "text-blue-600"
																	: "text-gray-500"
															}`}
														/>
													)}
												</div>

												{/* Text content */}
												<div className="flex-1">
													<div
														className={`font-medium text-xs ${
															item.completed ? "text-gray-900" : "text-gray-800"
														}`}>
														{item.title}
													</div>
													{/* Type indicator */}
													<div className="flex items-center justify-start gap-3">
														<div className="text-xs text-gray-500 mt-0.5">
															{item.date}
														</div>
														<div className="rounded-full">
															<Badge
																className={`text-xs  rounded-full font-medium ${
																	type === "2d"
																		? "bg-red-100 text-red-600"
																		: type === "3d"
																		? "bg-red-100 text-red-600"
																		: type === "5d"
																		? "bg-yellow-100 text-yellow-600"
																		: type === "6d"
																		? "bg-green-100 text-green-600"
																		: type === "9d"
																		? "bg-green-100 text-green-600"
																		: "bg-gray-100 text-gray-600"
																}`}>
																{type}
															</Badge>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	

	

	return (
		<div className=" mx-auto bg-white ">
			<div className="rounded-lg">
				<div>
					{documents.map((doc, i) => (
						<DocumentRow key={i} {...doc} />
					))}
				</div>
			</div>

			
		</div>
	);
};

export default DocumentsInterface;
