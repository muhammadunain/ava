"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ChevronLeft,
	ChevronDown,
	Upload,
	FileText,
	Circle,
	MessageSquare,
	Download,
	Mail,
	Edit,
	FileSignature,
	UserMinus,
	Archive,
	Users,
	ChevronRight,
	MessageCircle,
	UserPlus,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const documents = [
	{
		id: 1,
		name: "Buyer's Election Deadline",
		status: "pending",
		hasForm: false,
	},
	{
		id: 2,
		name: "Agency relationship disclosure",
		status: "pending",
		hasForm: false,
	},
	{
		id: 3,
		name: "Buyer referral agreement",
		status: "pending",
		hasForm: false,
	},
	{ id: 4, name: "Purchase agreement", status: "pending", hasForm: true },
	{ id: 5, name: "Escrow deposit receipt", status: "pending", hasForm: false },
	{
		id: 6,
		name: "Earthquake disclosure report",
		status: "pending",
		hasForm: false,
	},
	{
		id: 7,
		name: "Environmental hazards booklet",
		status: "active",
		hasForm: false,
	},
	{
		id: 8,
		name: "Natural hazards disclosure",
		status: "pending",
		hasForm: false,
	},
	{ id: 9, name: "Property tax disclosure", status: "pending", hasForm: false },
	{ id: 10, name: "Appraisal report", status: "pending", hasForm: false },
	{
		id: 11,
		name: "Confirm that Broker reviewed all docs",
		status: "pending",
		hasForm: false,
	},
];

export default function AlternateTransaction() {
	const [selectedDocument, setSelectedDocument] = useState(
		"Environmental hazards booklet"
	);
	const [hideActivity, setHideActivity] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [isUploadMode, setIsUploadMode] = useState(false);
	const [quickNote, setQuickNote] = useState("");
	const [showComments, setShowComments] = useState(false);

	const handleUploadClick = () => {
		setIsUploadMode(!isUploadMode);
	};

	const handleAddQuickNote = () => {
		if (quickNote.trim()) {
			// Here you would typically add the quick note to your state/database
			console.log("Quick note:", quickNote);
			setQuickNote("");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-200 px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
                        <Link href={'/'}>
						<Button
							variant="ghost"
							size="sm"
							className="cursor-pointer text-blue-600 hover:text-blue-700">
							<ChevronLeft className="w-4 h-4 mr-1" />
							BACK
						</Button>
                                </Link>
						<div className="flex items-center gap-2">
							<span className="text-lg font-medium">ALL</span>
							<span className="text-gray-400">•</span>
							<span className="text-lg font-medium">DOCUMENTS</span>
							<Badge
								variant="secondary"
								className="bg-orange-100 text-orange-600 ml-2">
								2
							</Badge>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm">
									Actions <ChevronDown className="w-4 h-4 ml-1" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>Export</DropdownMenuItem>
								<DropdownMenuItem>Print</DropdownMenuItem>
								<DropdownMenuItem>Share</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="text-sm text-gray-600">
							<div className="font-medium">Environmental hazards booklet</div>
							<div className="text-xs text-gray-500">
								Assigned to Ryan Schwartz
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex">
				{/* Left Sidebar */}
				<div className="w-64 bg-white border-r border-gray-200 min-h-screen">
					<div className="p-4">
						<div className="mb-6">
							<h3 className="font-medium text-gray-900 mb-2">123 Mainstreet</h3>
							<div className="text-sm text-gray-500">$1,234,567</div>
						</div>

						<Button
							variant="outline"
							size="sm"
							className="w-full mb-6 text-blue-600 border-blue-200 bg-transparent">
							📧 Add via email
						</Button>

						<div className="space-y-6">
							<div>
								<h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
									📋 CHECKLISTS
								</h4>
								<div className="space-y-1">
									<div className="flex items-center justify-between p-2 bg-blue-50 rounded text-sm">
										<span className="text-blue-700">Buying</span>
									</div>
									<div className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
										<span>Sold</span>
									</div>
								</div>
							</div>

							<div>
								<h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
									📁 ASSETS
								</h4>
								<div className="space-y-1">
									<div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded text-sm">
										<span>All</span>
									</div>
									<div className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
										<span>Unowned</span>
									</div>
									<div className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
										<span>Owned</span>
									</div>
									<div className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
										<span>Liens & contracts</span>
									</div>
									<div className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
										<span>Finance</span>
									</div>
									<div className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
										<span>Activity</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 flex">
					{/* Document List */}
					<div className="flex-1 p-6">
						<div className="space-y-2">
							{documents.map((doc) => (
								<div
									key={doc.id}
									className={`flex items-center justify-between p-3 rounded-lg border ${
										doc.status === "active"
											? "bg-blue-50 border-blue-200"
											: "bg-white border-gray-200"
									} hover:shadow-sm transition-shadow cursor-pointer`}
									onClick={() => setSelectedDocument(doc.name)}>
									<div className="flex items-center gap-3">
										<Circle className="w-4 h-4 text-gray-400" />
										<FileText className="w-4 h-4 text-gray-400" />
										<span className="text-sm font-medium text-gray-900">
											{doc.name}
										</span>
									</div>
									<div className="flex items-center gap-2">
										{doc.hasForm && (
											<Button
												variant="link"
												size="sm"
												className="text-blue-600 p-0 h-auto">
												📄 Use forms
											</Button>
										)}
										<Button
											variant="outline"
											size="sm"
											className="text-blue-600 border-blue-200 bg-transparent"
											onClick={handleUploadClick}>
											<Upload className="w-3 h-3 mr-1" />
											Upload
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right Panel */}
					<div className="w-90 bg-white border-l border-gray-200 p-6 relative">
						<div className="mb-6">
							<div className="flex items-start justify-between ">
								<div>
									<div className="flex items-center gap-2 mb-2">
										<FileText className="w-5 h-5 text-gray-800" />
										<h2 className="text-lg font-medium text-gray-900">
											Purchase Agreement
										</h2>
									</div>

									<div className="flex justify-between items-start w-full mt-2">
										<div className="text-sm  text-gray-500">
											Assigned to:{" "}
											<span className="text-gray-900 mx-2">Dylan Sanders</span>
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								{/* Left side (Due date) */}
								<div className="text-sm text-gray-600">
									Due:{" "}
									<span className="text-blue-600 font-medium">
										Aug 27, 2025
									</span>
								</div>

								{/* Right side */}
								<div className="flex items-center gap-2">
									<p className="text-blue-500 text-xs font-medium">
										waiting on others
									</p>

									<Button
										variant="ghost"
										size="sm"
										className="h-8 w-8 flex items-center justify-center gap-1">
										<UserPlus className="w-4 h-4 text-gray-500" />
										<MessageSquare className="w-4 h-4 text-gray-500" />
									</Button>
								</div>
							</div>

							<div className="space-y-2 my-3">
								<div className="flex gap-2">
									{isUploadMode ? (
										<>
											<Button
												variant="outline"
												size="sm"
												className="flex-1 text-blue-600 border-blue-200 bg-transparent">
												<FileSignature className="w-3 h-3 mr-1" />
												E-Sign
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="flex-1 text-gray-600 border-gray-200 bg-transparent">
												<UserMinus className="w-3 h-3 mr-1" />
												Unassign
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="flex-1 text-gray-600 border-gray-200 bg-transparent">
												<Edit className="w-3 h-3 mr-1" />
												Edit
											</Button>
										</>
									) : (
										<>
											<Button
												variant="outline"
												size="sm"
												className="flex-1 text-gray-600 border-gray-200 bg-transparent">
												<Download className="w-3 h-3 mr-1" />
												Download
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="flex-1 text-gray-600 border-gray-200 bg-transparent">
												<Mail className="w-3 h-3 mr-1" />
												Email
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="flex-1 text-gray-600 border-gray-200 bg-transparent">
												<Edit className="w-3 h-3 mr-1" />
												Edit
											</Button>
										</>
									)}
								</div>
								{!isUploadMode && (
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											className="flex-1 text-blue-600 border-blue-200 bg-transparent">
											<FileSignature className="w-3 h-3 mr-1" />
											E-Sign
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="flex-1 text-gray-600 border-gray-200 bg-transparent">
											<UserMinus className="w-3 h-3 mr-1" />
											Unassign
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="flex-1 text-red-600 border-red-200 bg-transparent">
											<Archive className="w-3 h-3 mr-1" />
											Archive
										</Button>
									</div>
								)}
							</div>
						</div>

						<div className="border-b border-gray-200 bg-white">
							<button
								className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
								onClick={() => setShowComments(!showComments)}>
								<div className="flex items-center gap-2">
									<MessageCircle className="w-4 h-4 text-gray-400" />
									<span className="font-medium cursor-pointer text-gray-900">
										Comments & Activity
									</span>
									<Badge
										variant="secondary"
										className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
										2
									</Badge>
								</div>
								<ChevronRight
									className={`w-4 h-4 text-gray-400 transition-transform ${
										showComments ? "rotate-90" : ""
									}`}
								/>
							</button>

							{showComments && (
								<div className="px-4 pb-4 border-t border-gray-100">
									<div className="flex items-center gap-3 mt-4">
										<div className="flex-1">
											<Input
												placeholder="Add a quick note or comment..."
												className="text-sm border-gray-200 focus:border-blue-500"
												value={quickNote}
												onChange={(e) => setQuickNote(e.target.value)}
												onKeyPress={(e) => {
													if (e.key === "Enter") {
														handleAddQuickNote();
													}
												}}
											/>
										</div>
										<Button
											size="sm"
											variant="ghost"
											onClick={handleAddQuickNote}>
											<MessageSquare className="w-4 h-4" />
										</Button>
									</div>
									<div className="space-y-3 my-5">
										{/* Document Approved Card */}
										<div className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm">
											<div className="flex items-start gap-3">
												<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
													<span className="text-sm font-medium text-gray-600">
														DS
													</span>
												</div>
												<div className="flex-1">
													<div className="flex items-center gap-2">
														<span className="text-sm text-gray-600">
															Document approved by:
														</span>
														<span className="text-sm font-medium text-gray-900">
															Dylan Sanders
														</span>
													</div>
													<div className="text-xs text-gray-500 mt-1">
														Thursday July 31, 2025
													</div>
												</div>
											</div>
										</div>

										{/* Updated By Card */}
										<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
											<div className="flex items-start gap-3">
												<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
													<span className="text-sm font-medium text-gray-600">
														AS
													</span>
												</div>
												<div className="flex-1">
													<div className="flex items-center gap-2">
														<span className="text-sm text-gray-600">
															Updated by:
														</span>
														<span className="text-sm font-medium text-gray-900">
															Adam Summers
														</span>
													</div>
													<div className="text-xs text-gray-500 mt-1">
														Thursday July 31, 2025
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Quick Note Field - Always Visible */}
						</div>

						<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 relative min-h-[300px]">
							<Image
								src={"/image.png"}
								width={500}
								height={500}
								alt="image"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
