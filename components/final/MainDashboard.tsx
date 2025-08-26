"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Sparkles,
	Clock,
	CheckCircle2,
	Filter,
	FilterIcon,
} from "lucide-react";
import DashboardStats from "../DashboardStacs";
import Checksome from "./ChecksomeOnce";
import TransactionsDashboard from "../dashboard/module/ui/FinalDashboard";
import { AvaDashboard } from "../ava/AvaDashboardA";

interface Task {
	id: string;
	title: string;
	address: string;
	date: string;
	label: string;
	labelColor: "blue" | "red" | "gray" | "orange";
	completed: boolean;
}

interface Deadline {
	id: string;
	title: string;
	address: string;
	date: string;
	label: string;
	labelColor: "red" | "orange";
	completed: boolean;
}

interface Closing {
	id: string;
	address: string;
	label: string;
	labelColor: "red" | "orange";
	progress: number;
	status: string;
	deadline: string;
}

export default function MainDashboard() {
	function getBadgeStyle(color: string) {
		switch (color) {
			case "red":
				return "bg-red-100 text-red-500";
			case "yellow":
				return "bg-yellow-100 text-yellow-600";
			default:
				return "bg-gray-100 text-gray-600";
		}
	}

	const [tasks, setTasks] = useState<Task[]>([
		{
			id: "1",
			title: "Ensure Loan Application is...",
			address: "410 FLAGSHIP DR #501",
			date: "Today",
			label: "Loan Application Deadline",
			labelColor: "blue",
			completed: false,
		},
		{
			id: "2",
			title: "Coordinate Home Inspection",
			address: "410 FLAGSHIP DR #501",
			date: "Today",
			label: "Additional Deposit Deadline",
			labelColor: "blue",
			completed: false,
		},
		{
			id: "3",
			title: "Prepare and Submit Buyer's Election...",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "Inspection Period End Date",
			labelColor: "gray",
			completed: false,
		},
		{
			id: "4",
			title: "Obtain Flood Insurance Disclosure",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "Additional Deposit Deadline",
			labelColor: "gray",
			completed: false,
		},
		{
			id: "5",
			title: "Prepare Bill of Sale",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "Additional Deposit Deadline",
			labelColor: "gray",
			completed: false,
		},
	]);

	const [deadlines] = useState<Deadline[]>([
		{
			id: "1",
			title: "Additional Deposit Due Date",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "2d",
			labelColor: "red",
			completed: false,
		},
		{
			id: "2",
			title: "Inspection Period End Date",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "2d",
			labelColor: "red",
			completed: false,
		},
		{
			id: "3",
			title: "Buyer's Election Deadline",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "2d",
			labelColor: "red",
			completed: false,
		},
		{
			id: "4",
			title: "Seller's Response Deadline",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "6d",
			labelColor: "orange",
			completed: false,
		},
		{
			id: "5",
			title: "Financing Contingency Deadline",
			address: "410 FLAGSHIP DR #501",
			date: "08/10/2025",
			label: "6d",
			labelColor: "orange",
			completed: false,
		},
	]);

	const [closings] = useState<Closing[]>([
		{
			id: "1",
			address: "410 FLAGSHIP DR #501",
			label: "2d",
			labelColor: "red",
			progress: 58,
			status: "58% to closing",
			deadline: "Loan Application Deadline",
		},
		{
			id: "2",
			address: "85 RIVERSIDE AVE #302",
			label: "5d",
			labelColor: "orange",
			progress: 13,
			status: "13% to closing",
			deadline: "Loan Application Deadline",
		},
	]);

	const handleTaskToggle = (taskId: string) => {
		setTasks(
			tasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const getBadgeVariant = (color: string) => {
		switch (color) {
			case "red":
				return "bg-red-50 text-red-600 border-red-200";
			case "blue":
				return "bg-blue-50 text-blue-600 border-blue-200";
			case "orange":
				return "bg-orange-50 text-orange-600 border-orange-200";
			case "gray":
				return "bg-gray-50 text-gray-600 border-gray-200";
			default:
				return "bg-gray-50 text-gray-600 border-gray-200";
		}
	};

	return (
		<div className="">
			<div className=" ">
				{/* Header */}
				{/* <DashboardStats /> */}
				{/* <TransactionsDashboard/> */}
				<AvaDashboard/>
				
			</div>
		</div>
	);
}
