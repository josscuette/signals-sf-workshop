"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  MaterialSymbol,
} from "@jllt/alize-ui";
import { companies } from "@/lib/data/mock-data";

interface CreateActivityDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateActivityDrawer({
  open,
  onOpenChange,
}: CreateActivityDrawerProps) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [activityType, setActivityType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // In a real app, this would save the activity
    console.log({ selectedCompany, activityType, date, description });
    onOpenChange(false);
    // Reset form
    setSelectedCompany("");
    setActivityType("");
    setDate("");
    setDescription("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setSelectedCompany("");
    setActivityType("");
    setDate("");
    setDescription("");
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <DrawerTitle>Create activity</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MaterialSymbol name="close" size={20} />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Select Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Select company</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger id="company">
                <SelectValue placeholder="Meeting" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Activity Type */}
          <div className="space-y-2">
            <Label htmlFor="activity-type">Select an activity type</Label>
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger id="activity-type">
                <SelectValue placeholder="Meeting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="note">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button className="w-full" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" className="w-full" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}



