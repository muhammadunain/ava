"use client";

import { HistoryEntry, Task, TransactionDetails } from "@/types";
import { useMemo, useState } from "react";
import GlassHeader from "./GlassHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	CheckSquare,
	BarChart3,
	Info,
	FileText,
	StickyNote,
	History,
	Plus,
	MessageSquare,
	User,
	Phone,
	Mail,
	ArrowRight,
	Clock,
} from "lucide-react";
import { DetailsTab } from "./DetailsTab";
import { DocumentsTab } from "./DocumentsTabs";
import { HistoryTab } from "./HistoryTabs";
import { NotesTab } from "./NotesTabs";
import { TasksTab } from "./TasksTabComponent";
import { TimelineTab } from "./TimeLineTabs";
import AddTaskDialog from "./AddTaskDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Enhanced Follow Up Tab Component
const FollowUpTab = () => {
	const followUpMessages = [
		{
			id: 1,
			sender: "Faith Montgomery",
			phone: "(646) 974-4755 (mobile2)",
			recipient: "Agent Brooke Smith",
			time: "6 days ago",
			message: "I'm free at 2:30",
			avatar: "F",
			type: "client",
			status: "replied"
		},
		{
			id: 2,
			sender: "Agent Brooke Smith",
			phone: "",
			recipient: "Faith Montgomery (646) 974-4755 (mobile)",
			time: "6 days ago",
			message: "Yeah actually my afternoon is pretty open. What time works best for you?",
			avatar: "B",
			type: "agent",
			status: "sent"
		},
		{
			id: 3,
			sender: "Brooke Admin",
			phone: "",
			recipient: "Faith Montgomery (646) 974-4755 (mobile2), Agent Brooke Smith",
			time: "6 days ago",
			message: "Unfortunately I don't. Brooke do you?",
			avatar: "B",
			type: "admin",
			status: "sent"
		},
		{
			id: 4,
			sender: "Faith Montgomery",
			phone: "(646) 974-4755 (mobile2)",
			recipient: "Agent Brooke Smith",
			time: "6 days ago",
			message: "I can only meet today if you have an opening",
			avatar: "F",
			type: "client",
			status: "pending"
		},
		{
			id: 5,
			sender: "Brooke Admin",
			phone: "",
			recipient: "Faith Montgomery (646) 974-4755 (mobile2), Agent Brooke Smith",
			time: "6 days ago",
			message: "Faith, are you free this week to take a quick tour of a home I picked out for you?",
			avatar: "B",
			type: "admin",
			status: "sent"
		}
	];

	const getAvatarColor = (type: string) => {
		switch (type) {
			case 'client': return 'bg-blue-500 text-white';
			case 'agent': return 'bg-emerald-500 text-white';
			case 'admin': return 'bg-purple-500 text-white';
			default: return 'bg-gray-500 text-white';
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'replied': return <Badge className="bg-green-100 text-green-800 border-green-200">Replied</Badge>;
			case 'pending': return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Pending</Badge>;
			case 'sent': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Sent</Badge>;
			default: return null;
		}
	};

	return (
		<div className="space-y-6">
			{/* Quick Actions */}
			<div className="flex flex-wrap gap-3 mb-6">
				<Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
					<Phone className="w-4 h-4 mr-2" />
					Schedule Call
				</Button>
				<Button variant="outline" className="border-gray-200 hover:bg-gray-50">
					<Mail className="w-4 h-4 mr-2" />
					Send Email
				</Button>
				<Button variant="outline" className="border-gray-200 hover:bg-gray-50">
					<MessageSquare className="w-4 h-4 mr-2" />
					Quick Message
				</Button>
			</div>

			{/* Messages */}
			<div className="space-y-4">
				{followUpMessages.map((message, index) => (
					<div key={message.id} className="group relative">
						{/* Timeline connector */}
						{index < followUpMessages.length - 1 && (
							<div className="absolute left-5 top-16 w-0.5 h-8 bg-gray-200"></div>
						)}
						
						<div className="flex gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
							{/* Avatar */}
							<div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${getAvatarColor(message.type)} shadow-lg`}>
								{message.avatar}
							</div>
							
							{/* Content */}
							<div className="flex-1 min-w-0">
								{/* Header */}
								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center gap-3">
										<span className="font-semibold text-gray-900 text-base">{message.sender}</span>
										{message.phone && (
											<span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{message.phone}</span>
										)}
										{getStatusBadge(message.status)}
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-500">
										<Clock className="w-4 h-4" />
										{message.time}
									</div>
								</div>
								
								{/* Recipient */}
								<div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
									<ArrowRight className="w-3 h-3" />
									<span>{message.recipient}</span>
								</div>
								
								{/* Message */}
								<div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
									<p className="text-gray-800 leading-relaxed">{message.message}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const TransactionDashboard = () => {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: 1,
			title: "Send Transaction Introduction and Timeline to the Client",
			dueDate: "2025-07-26",
			completed: false,
			priority: "high",
			category: "client-communication",
		},
		{
			id: 2,
			title: "Order Title Commitment from Title Company",
			dueDate: "2025-07-26",
			completed: false,
			priority: "high",
			category: "documentation",
		},
		{
			id: 3,
			title: "Confirm Receipt of Executed Sales Contract",
			dueDate: "2025-07-26",
			completed: true,
			priority: "medium",
			category: "documentation",
		},
		{
			id: 4,
			title: "Collect Initial Escrow Deposit from Buyer",
			dueDate: "2025-07-29",
			completed: false,
			priority: "high",
			category: "financial",
		},
		{
			id: 5,
			title: "Schedule Home Inspection",
			dueDate: "2025-08-02",
			completed: false,
			priority: "medium",
			category: "inspection",
		},
		{
			id: 6,
			title: "Review Property Appraisal",
			dueDate: "2025-08-10",
			completed: false,
			priority: "medium",
			category: "financial",
		},
	]);

	const [searchQuery, setSearchQuery] = useState<string>("");
	const [notes, setNotes] = useState<string>("");
	const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

	const transactionDetails: TransactionDetails = {
		address: "410 FLAGSHIP DR # 501",
		district: "Downtown Marina District",
		propertyType: "Condominium",
		squareFootage: "1,250 sq ft",
		purchasePrice: "$485,000",
		downPayment: "$97,000 (20%)",
		loanAmount: "$388,000",
		closingDate: "August 30, 2025",
	};

	type Document = {
		name: string;
		status: string;
		date: string;
	};

	const documents: Document[] = [
		{ name: "Sales Contract", status: "Complete", date: "07/25/2025" },
		{ name: "Title Commitment", status: "Pending", date: "07/30/2025" },
		{ name: "Inspection Report", status: "Pending", date: "08/05/2025" },
		{ name: "Appraisal Report", status: "Pending", date: "08/12/2025" },
		{ name: "Loan Documents", status: "Pending", date: "08/25/2025" },
		{ name: "Closing Disclosure", status: "Pending", date: "08/28/2025" },
	];

	const history: HistoryEntry[] = [
		{
			action: "Task completed: Confirm Receipt of Executed Sales Contract",
			date: "07/26/2025 2:30 PM",
		},
		{
			action: "New task added: Collect Initial Escrow Deposit from Buyer",
			date: "07/26/2025 10:15 AM",
		},
		{ action: "Transaction created", date: "07/25/2025 4:45 PM" },
	];

	const toggleTask = (id: number): void => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const handleAddTask = () => {
		console.log("Add task functionality");
	};

	const handleSaveNotes = () => {
		console.log("Notes saved:", notes);
	};

	const addTask = (newTask: Task): void => {
		setTasks((prev) => [...prev, newTask]);
	};

	const progressPercentage = useMemo(() => {
		const completedTasks = tasks.filter((task) => task.completed).length;
		return Math.round((completedTasks / tasks.length) * 100);
	}, [tasks]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4">
			<AddTaskDialog
				isOpen={showAddDialog}
				onClose={() => setShowAddDialog(false)}
				onAddTask={addTask}
			/>

			<div className="max-w-7xl mx-auto space-y-8">
				<GlassHeader
					address={transactionDetails.address}
					district={transactionDetails.district}
					status="BUYING"
				/>

				{/* Enhanced Main Content Container */}
				<div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl shadow-black/5 overflow-hidden">
					<Tabs defaultValue="tasks" className="w-full">
						{/* Enhanced TabsList */}
						<div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-100">
							<TabsList className="w-full bg-transparent h-auto p-0">
								<div className="flex w-full px-2 py-2">
									<TabsTrigger
										value="tasks"
										className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 mx-1
										rounded-xl font-semibold text-sm transition-all duration-300 ease-out
										text-gray-600 hover:text-gray-900 hover:bg-gray-50
										data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-900 data-[state=active]:to-slate-700
										data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-900/30
										data-[state=active]:scale-105 hover:scale-[1.02]">
										<CheckSquare className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
										<span>Tasks</span>
									</TabsTrigger>
									<TabsTrigger
										value="timeline"
										className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 mx-1
										rounded-xl font-semibold text-sm transition-all duration-300 ease-out
										text-gray-600 hover:text-gray-900 hover:bg-gray-50
										data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-900 data-[state=active]:to-slate-700
										data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-900/30
										data-[state=active]:scale-105 hover:scale-[1.02]">
										<BarChart3 className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
										<span>Timeline</span>
									</TabsTrigger>
									<TabsTrigger
										value="details"
										className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 mx-1
										rounded-xl font-semibold text-sm transition-all duration-300 ease-out
										text-gray-600 hover:text-gray-900 hover:bg-gray-50
										data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-900 data-[state=active]:to-slate-700
										data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-900/30
										data-[state=active]:scale-105 hover:scale-[1.02]">
										<Info className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
										<span>Details</span>
									</TabsTrigger>
									<TabsTrigger
										value="documents"
										className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 mx-1
										rounded-xl font-semibold text-sm transition-all duration-300 ease-out
										text-gray-600 hover:text-gray-900 hover:bg-gray-50
										data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-900 data-[state=active]:to-slate-700
										data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-900/30
										data-[state=active]:scale-105 hover:scale-[1.02]">
										<FileText className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
										<span>Documents</span>
									</TabsTrigger>
									<TabsTrigger
										value="notes"
										className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 mx-1
										rounded-xl font-semibold text-sm transition-all duration-300 ease-out
										text-gray-600 hover:text-gray-900 hover:bg-gray-50
										data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-900 data-[state=active]:to-slate-700
										data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-900/30
										data-[state=active]:scale-105 hover:scale-[1.02]">
										<StickyNote className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
										<span>Notes</span>
									</TabsTrigger>
									<TabsTrigger
										value="followup"
										className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 mx-1
										rounded-xl font-semibold text-sm transition-all duration-300 ease-out
										text-gray-600 hover:text-gray-900 hover:bg-gray-50
										data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-900 data-[state=active]:to-slate-700
										data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-900/30
										data-[state=active]:scale-105 hover:scale-[1.02]">
										<MessageSquare className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
										<span>Follow Up</span>
									</TabsTrigger>
									<TabsTrigger
										value="history"
										className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 mx-1
										rounded-xl font-semibold text-sm transition-all duration-300 ease-out
										text-gray-600 hover:text-gray-900 hover:bg-gray-50
										data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-900 data-[state=active]:to-slate-700
										data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-900/30
										data-[state=active]:scale-105 hover:scale-[1.02]">
										<History className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
										<span>History</span>
									</TabsTrigger>
								</div>
							</TabsList>
						</div>

						{/* Enhanced Content Area */}
						<div className="p-8 lg:p-10">
							<TabsContent value="tasks" className="mt-0">
								<div className="flex items-center justify-between mb-8">
									<div className="space-y-1">
										<h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tasks</h2>
										<p className="text-gray-600 text-lg">
											Manage your transaction tasks and deadlines
										</p>
									</div>
									<Button
										onClick={() => setShowAddDialog(true)}
										className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105">
										<Plus className="h-4 w-4" />
										New Task
									</Button>
								</div>
								<TasksTab />
							</TabsContent>

							<TabsContent value="timeline" className="mt-0">
								<div className="mb-8 space-y-1">
									<h2 className="text-3xl font-bold text-slate-900 tracking-tight">
										Timeline
									</h2>
									<p className="text-gray-600 text-lg">
										Track project milestones and deadlines
									</p>
								</div>
								<TimelineTab />
							</TabsContent>

							<TabsContent value="details" className="mt-0">
								<div className="mb-8 space-y-1">
									<h2 className="text-3xl font-bold text-slate-900 tracking-tight">
										Transaction Details
									</h2>
									<p className="text-gray-600 text-lg">
										Property and transaction information
									</p>
								</div>
								<DetailsTab details={transactionDetails} />
							</TabsContent>

							<TabsContent value="documents" className="mt-0">
								<div className="mb-8 space-y-1">
									<h2 className="text-3xl font-bold text-slate-900 tracking-tight">
										Documents
									</h2>
									<p className="text-gray-600 text-lg">
										Manage transaction documents and files
									</p>
								</div>
								<DocumentsTab documents={documents} />
							</TabsContent>

							<TabsContent value="notes" className="mt-0">
								<div className="mb-8 space-y-1">
									<h2 className="text-3xl font-bold text-slate-900 tracking-tight">Notes</h2>
									<p className="text-gray-600 text-lg">
										Add important notes and observations
									</p>
								</div>
								<NotesTab
									notes={notes}
									onNotesChange={setNotes}
									onSaveNotes={handleSaveNotes}
								/>
							</TabsContent>

							<TabsContent value="followup" className="mt-0">
								<div className="mb-8 space-y-1">
									<h2 className="text-3xl font-bold text-slate-900 tracking-tight">Follow Up</h2>
									<p className="text-gray-600 text-lg">
										Track client communications and responses
									</p>
								</div>
								<FollowUpTab />
							</TabsContent>

							<TabsContent value="history" className="mt-0">
								<div className="mb-8 space-y-1">
									<h2 className="text-3xl font-bold text-slate-900 tracking-tight">
										Activity History
									</h2>
									<p className="text-gray-600 text-lg">
										View all transaction activities and changes
									</p>
								</div>
								<HistoryTab history={history} />
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default TransactionDashboard;