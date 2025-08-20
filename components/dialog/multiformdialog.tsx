"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SimpleUploadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="text-blue-600 underline cursor-pointer">Add more forms</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Form</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Choose File</Label>
            <Input id="file" type="file" />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
