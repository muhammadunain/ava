"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function DeadLineDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useState([
    { id: Date.now(), date: "", time: "" },
  ]);

  const handleAddReminder = () => {
    setReminders((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), date: "", time: "" },
    ]);
  };

  const handleRemoveReminder = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReminderChange = (
    id: number,
    field: "date" | "time",
    value: string
  ) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = () => {
    const payload = {
      name,
      date,
      reminders,
    };
    console.log("Timeline added:", payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className=" flex items-center cursor-pointer">
             <Plus className="w-4 h-4" />
                      <span>New</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Timeline</DialogTitle>
          <DialogDescription>
            Provide a name, date, and optional reminders.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div >
            <Label className="my-2" htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label className="my-2" htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <hr className="my-2" />
<div className="flex items-center justify-between gap-2">

          <p className="text-sm font-semibold text-gray-700">Reminders</p>
  <Button
            variant="outline"
            type="button"
            onClick={handleAddReminder}
            className="text-sm mt-1 cursor-pointer"
            >
            <Plus className="w-4 h-4 mr-1" /> Add Reminder
          </Button>
              </div>
          {reminders.map((reminder) => (
            
            <div key={reminder.id} className="flex gap-2 items-center">
                
              <Input
                type="date"
                value={reminder.date}
                onChange={(e) =>
                  handleReminderChange(reminder.id, "date", e.target.value)
                }
              />
              <Input
                type="time"
                value={reminder.time}
                onChange={(e) =>
                  handleReminderChange(reminder.id, "time", e.target.value)
                }
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => handleRemoveReminder(reminder.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

        
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
          className="cursor-pointer"
            variant="outline"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={handleSubmit}>Add Deadline</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
