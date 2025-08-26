"use client";
import UploadDocumentsModal from "@/components/ava/FormModal";
import UseForm from "@/components/ava/useFormdialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { completedTasks, taskData } from "@/constants/task";
import React, { JSX, useState } from "react";

export const TaskListSection = (): JSX.Element => {
	const [Check, setupCheck] = useState("");
	return (
		<div className="w-full h-full   translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
				<div className="space-y-4 p-1">
					{taskData.map((task, index) => (
						<Card
							key={task.id}
							className={`my-4 rounded-md border border-zinc-200 ${
								task.hasSubtasks ? "pb-0" : ""
							} translate-y-[-1rem] animate-fade-in opacity-0`}
							style={
								{
									"--animation-delay": `${400 + index * 100}ms`,
								} as React.CSSProperties
							}>
							<CardContent className="p-0">
								<div className="flex items-center justify-between p-3">
									<div className="flex items-center gap-4">
										<div className="flex row items-center gap-[5px]">
											<span className="[font-family:'Geist',Helvetica] font-normal text-zinc-500 text-xs leading-4 whitespace-nowrap">
												{task.date}
											</span>
											<Badge
												className={`px-2 py-0.5 ${task.badge.color} rounded-full border-transparent text-[10px] font-semibold leading-[15px]`}>
												{task.badge.text}
											</Badge>
										</div>

										<Avatar className="w-6 h-6 bg-zinc-100">
											<AvatarFallback className="[font-family:'Geist',Helvetica] font-medium text-[#2574eb] text-[10px] leading-[15px]">
												{task.avatar}
											</AvatarFallback>
										</Avatar>

										<div className="flex items-center gap-3">
											{task.hasCheckbox ? (
												<Checkbox className="w-4 h-4 border-zinc-900 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-white" />
											) : (
												<img
													className="w-4 h-4"
													alt="Svg"
													src="https://c.animaapp.com/memznafvRgGYDx/img/svg.svg"
												/>
											)}

											<span className="[font-family:'Geist',Helvetica] font-medium text-zinc-900 text-sm leading-[normal] overflow-hidden text-ellipsis">
												{task.title}
											</span>
										</div>
									</div>

									<div className="flex items-center gap-2">
										{task.status === "Uploaded" ? (
											<span
												className={`[font-family:'Geist',Helvetica] font-medium text-sm ${task.statusColor}`}>
												{task.status}
											</span>
										) : task.status === "Upload" ? (
											<UploadDocumentsModal />
										) : task.status === "Use forms" ? (
											task.hasCheckbox ? null : (
												<UseForm />
											)
										) : (
											<Button
												variant="ghost"
												className="h-8 px-4 py-2 rounded-md bg-zinc-100">
												<span
													className={`[font-family:'Geist',Helvetica] font-medium text-sm ${task.statusColor}`}>
													{task.status}
												</span>
											</Button>
										)}

										<img
											className="w-4 h-4"
											alt="Svg"
											src="https://c.animaapp.com/memznafvRgGYDx/img/svg-2.svg"
										/>
									</div>
								</div>

								{task.hasSubtasks && (
									<div className="relative flex gap-3 px-8 pb-3">
										{/* timeline image on the left */}
										<img
											className="w-3.5 h-[148px] mt-1"
											alt="Group"
											src="https://c.animaapp.com/memznafvRgGYDx/img/group-88.png"
										/>

										{/* subtasks stacked on the right */}
										<div className="flex-1 space-y-2">
											{task.subtasks?.map((subtask, subtaskIndex) => (
												<div
													key={subtaskIndex}
													className={`flex flex-col gap-1 px-3.5 py-2.5 ${subtask.background} rounded-lg`}>
													<div className="font-medium text-zinc-900 text-sm">
														{subtask.title}
													</div>
													<div className="flex items-center gap-1.5">
														<span className="text-xs text-zinc-500">
															{subtask.date}
														</span>
														<Badge
															className={`px-2 py-0.5 ${subtask.badge.color} rounded-full text-[10px] font-semibold`}>
															{subtask.badge.text}
														</Badge>
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					))}

					<div className="flex items-center gap-2 pt-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms]">
						<span className="[font-family:'Geist',Helvetica] font-semibold text-zinc-950 text-base leading-7 whitespace-nowrap">
							Completed Tasks
						</span>
						<Badge className="px-2 py-0.5 bg-[#2574eb] text-white rounded-full border-transparent text-[10px] font-semibold leading-[15px]">
							1
						</Badge>
					</div>

					{completedTasks.map((task, index) => (
						<Card
							key={index}
							className="bg-zinc-100 rounded-lg translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1800ms]">
							<CardContent className="flex items-center gap-3 p-3">
								<img
									className="flex-shrink-0"
									alt="Margin WRAPPER"
									src="https://c.animaapp.com/memznafvRgGYDx/img/margin-wrapper.svg"
								/>
								<div className="flex-1">
									<div className="[font-family:'Geist',Helvetica] font-medium text-zinc-900 text-sm leading-[normal] line-through">
										{task.title}
									</div>
									<div className="[font-family:'Geist',Helvetica] font-normal text-zinc-500 text-xs leading-4 whitespace-nowrap">
										{task.subtitle}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
		</div>
	);
};
