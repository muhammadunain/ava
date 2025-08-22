import { IconCamera, IconChartBar, IconDashboard, IconDatabase, IconFileAi, IconFileDescription, IconFileWord, IconFolder, IconHelp, IconListDetails, IconReport, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react";

export const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		// avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: IconDashboard,
		},
		{
			title: "Contact",
			url: "/contact",
			icon: IconListDetails,
		},
		
		
		
	],
	navClouds: [
		{
			title: "Capture",
			icon: IconCamera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: IconFileDescription,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: IconFileAi,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		
		
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: IconDatabase,
		},
		
	],
};





// table content

export const tableData = [
  {
    address: "742 Evergreen Terrace",
    representing: { name: "Dylan Sanders", type: "buyer" },
    price: "$238,000",
    status: "Active",
    closingDate: "Dec 5, 2025",
    currentTimeline: {
      task: "Buyer's Initial Deposit",
      progress: { current: 12, total: 35 },
      date: "25 Aug",
      urgency: "4d",
      urgencyType: "urgent",
    },
    upcomingTimelines: [
      {
        task: "Condominium Document..",
        urgency: "11d",
        urgencyType: "safe",
      },
      {
        task: "Condo Fire Sprinkler Retrof...",
        urgency: "11d",
        urgencyType: "safe",
      },
    ],
  },
  {
    address: "1199 Oakwood Drive",
    representing: { name: "Olivia Thompson", type: "buyer" },
    price: "$450,000",
    status: "Active",
    closingDate: "Aug 23, 2025",
    currentTimeline: {
      task: "Purchase agreement",
      progress: { current: 21, total: 25 },
      date: "16 Aug",
      urgency: "4d",
      urgencyType: "urgent",
    },
    upcomingTimelines: [
      { task: "Deposited payment", urgency: "5d", urgencyType: "warning" },
      { task: "Buyer election", urgency: "7d", urgencyType: "safe" },
    ],
  },
  {
    address: "56 Maple Grove Lane",
    representing: [
      { name: "Jacob Anderson", type: "seller" },
      { name: "Jacob Anderson", type: "buyer" },
    ],
    price: "$125,000",
    status: "Pending",
    closingDate: "Aug 22, 2025",
    currentTimeline: {
      task: "Escrow receipt received",
      progress: { current: 11, total: 32 },
      date: "17 Aug",
      urgency: "5d",
      urgencyType: "warning",
    },
    upcomingTimelines: [
      { task: "Purchase agreement", urgency: "7d", urgencyType: "safe" },
      { task: "Buyer election", urgency: "8d", urgencyType: "safe" },
    ],
  },
  {
    address: "375 Cedar Ridge Road",
    representing: { name: "Ryan Mitchell", type: "seller" },
    price: "$850,000",
    status: "Active",
    closingDate: "Sep 12, 2025",
    currentTimeline: {
      task: "Schedule home inspection",
      progress: { current: 11, total: 32 },
      date: "20 Aug",
      urgency: "2d",
      urgencyType: "urgent",
    },
    upcomingTimelines: [
      { task: "Deposited payment", urgency: "7d", urgencyType: "warning" },
      { task: "Buyer election", urgency: "12d", urgencyType: "safe" },
    ],
  },
  {
    address: "210 Birch Hill Avenue",
    representing: { name: "Emily Harris", type: "both" },
    price: "$1,250,000",
    status: "Pending",
    closingDate: "Sep 2, 2025",
    currentTimeline: {
      task: "Receives disclosures",
      progress: { current: 24, total: 35 },
      date: "24 Aug",
      urgency: "1d",
      urgencyType: "urgent",
    },
    upcomingTimelines: [
      { task: "Buyer broker agreement", urgency: "3d", urgencyType: "urgent" },
      { task: "Buyer election", urgency: "5d", urgencyType: "warning" },
    ],
  },
  {
    address: "48 Pinecrest Boulevard",
    representing: { name: "Nathan Parker", type: "seller" },
    price: "$550,000",
    status: "Pending",
    closingDate: "Aug 25, 2025",
    currentTimeline: {
      task: "Review disclosures",
      progress: { current: 11, total: 32 },
      date: "26 Aug",
      urgency: "8d",
      urgencyType: "safe",
    },
    upcomingTimelines: [
      { task: "Deposited payment", urgency: "12d", urgencyType: "safe" },
      { task: "Escrow receipt received", urgency: "27d", urgencyType: "safe" },
    ],
  },
  {
    address: "921 Aspen Meadows Way",
    representing: { name: "Grace Sullivan", type: "buyer" },
    price: "$450,500",
    status: "Pending",
    closingDate: "Sep 6, 2025",
    currentTimeline: {
      task: "Buyer election",
      progress: { current: 11, total: 32 },
      date: "31 Aug",
      urgency: "2d",
      urgencyType: "urgent",
    },
    upcomingTimelines: [
      { task: "Deposited payment", urgency: "5d", urgencyType: "warning" },
      { task: "Buyer broker agreement", urgency: "8d", urgencyType: "safe" },
    ],
  },
  {
    address: "1520 Silver Lake Drive",
    representing: { name: "Benjamin Reed", type: "both" },
    price: "$1,200,000",
    status: "Active",
    closingDate: "Sep 25, 2025",
    currentTimeline: {
      task: "Remove Contingencies",
      progress: { current: 24, total: 56 },
      date: "03 Sep",
      urgency: "1d",
      urgencyType: "urgent",
    },
    upcomingTimelines: [
      { task: "Purchase agreement", urgency: "2d", urgencyType: "urgent" },
      { task: "Buyer election", urgency: "5d", urgencyType: "warning" },
    ],
  },
];


// transcation

export const documents = [
		{
			date: "16 Aug",
			type: "3d",
			title: "Buyer Broker Agreement",
			status: "uploaded",
			hasTimeline: true,
			timelineItems: [
				{
					completed: true,
					icon: "calendar",
					title: "Additional Deposit Due Date",
					date: "July 10, 2025",
				},
				{
					completed: true,
					icon: "file",
					title: "Inspection Period End Date",
					date: "July 24, 2025",
				},
				{
					completed: false,
					icon: "clipboard",
					title: "Inspection Period End Date",
					date: "July 24, 2025",
				},
			],
		},

		{
			date: "16 Aug",
			type: "3d",
			title: "Buyer Broker Agreement",
			dia: "upload",
		},
		{
			date: "16 Aug",
			type: "3d",
			title: "Buyer Broker Agreement",
			dia: "upload",
		},
		{
			date: "16 Aug",
			type: "3d",
			title: "Buyer Broker Agreement",
			dia: "upload",
		},
		{
			date: "16 Aug",
			type: "3d",
			title: "Buyer Broker Agreement",
			dia: "upload",
			hasTimeline: true,
			timelineItems: [
				{
					completed: true,
					icon: "calendar",
					title: "Additional Deposit Due Date",
					date: "July 10, 2025",
				},
				{
					completed: true,
					icon: "file",
					title: "Inspection Period End Date",
					date: "July 24, 2025",
				},
				{
					completed: false,
					icon: "clipboard",
					title: "Inspection Period End Date",
					date: "July 24, 2025",
				},
			],
		},

		{
			date: "16 Aug",
			type: "3d",
			title: "Buyer Broker Agreement",
			dia: "upload",
		},

		{
			date: "24 Aug",
			type: "6d",
			title: "Schedule home inspection",
			status: "pending",
			hasTimeline: false,
			isCheckbox: true,
		},
		{
			date: "27 Aug",
			type: "2d",
			title: "Receive Disclosures",
			status: "pending",
			hasTimeline: false,
			isCheckbox: true,
		},
		{
			date: "28 Aug",
			type: "6d",
			title: "Review Disclosures",
			status: "pending",
			hasTimeline: true,
			isCheckbox: true,
		},
    {
      date: "24 Aug",
      type: "6d",
      title: "Buyer Election",
      status: "use-forms",
      hasTimeline: false,
    },
     {
      date: "24 Aug",
      type: "5d",
      title: "Buyer's Additional ",
      status: "use-forms",
      hasTimeline: false,
    },
    {
      date: "24 Aug",
      type: "5d",
      title: "Buyer Election",
      status: "use-forms",
      hasTimeline: false,
    },
     
	];