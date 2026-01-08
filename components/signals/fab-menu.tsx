"use client";

import { useState } from "react";
import {
  MaterialSymbol,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Separator,
  DatePicker,
} from "@jllt/alize-ui";
import { companies } from "@/lib/data/mock-data";

interface FabMenuItem {
  id: string;
  label: string;
  description: string;
  icon?: string;
  onClick?: () => void;
}

interface FabMenuProps {
  items: FabMenuItem[];
}

type ActivePanel = "activity" | "opportunities" | "new-company" | null;

export function FabMenu({ items }: FabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  // Form states for Activity
  const [activityType, setActivityType] = useState("");
  const [activityDate, setActivityDate] = useState<Date | undefined>(undefined);
  const [activityDescription, setActivityDescription] = useState("");

  // Form states for Opportunity
  const [companyName, setCompanyName] = useState("");
  const [clientContactName, setClientContactName] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [opportunityMarket, setOpportunityMarket] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [meetingDate, setMeetingDate] = useState<Date | undefined>(undefined);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: FabMenuItem) => {
    setActivePanel(item.id as ActivePanel);
    setIsOpen(false);
  };

  const handleClosePanel = () => {
    setActivePanel(null);
    // Reset Activity form
    setActivityType("");
    setActivityDate(undefined);
    setActivityDescription("");
    // Reset Opportunity form
    setCompanyName("");
    setClientContactName("");
    setOpportunityName("");
    setOpportunityMarket("");
    setMeetingType("");
    setMeetingDate(undefined);
  };

  const handleSaveActivity = () => {
    console.log({ activityType, activityDate, activityDescription });
    handleClosePanel();
  };

  const handleSaveOpportunity = () => {
    console.log({
      companyName,
      clientContactName,
      opportunityName,
      opportunityMarket,
      meetingType,
      meetingDate,
    });
    handleClosePanel();
  };

  return (
    <>
      {/* Full Page Panel - New Activity */}
      <div
        className={`fixed inset-0 z-[200] bg-background transition-transform duration-300 ease-out ${
          activePanel === "activity" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-3">
          <Button variant="outline" size="icon" onClick={handleClosePanel}>
            <MaterialSymbol name="chevron_left" size={20} />
          </Button>
          <h1 className="text-lg font-semibold">New activity</h1>
          <div className="w-10" />
        </header>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-56px)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Activity Type */}
            <div className="space-y-2">
              <Label>Select an activity type</Label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Meeting" />
                </SelectTrigger>
                <SelectContent className="z-[300]">
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <DatePicker
                date={activityDate}
                onDateChange={setActivityDate}
                placeholder="Select a date"
                className="w-full"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
                rows={6}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 space-y-2">
            <Button className="w-full" onClick={handleSaveActivity}>
              Save
            </Button>
            <Button variant="ghost" className="w-full" onClick={handleClosePanel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Full Page Panel - New Opportunity */}
      <div
        className={`fixed inset-0 z-[200] bg-background transition-transform duration-300 ease-out ${
          activePanel === "opportunities" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-3">
          <Button variant="outline" size="icon" onClick={handleClosePanel}>
            <MaterialSymbol name="chevron_left" size={20} />
          </Button>
          <h1 className="text-lg font-semibold">New opportunity</h1>
          <div className="w-10" />
        </header>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-56px)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label>Company name*</Label>
              <Select value={companyName} onValueChange={setCompanyName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent className="z-[300]">
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Client Contact Name */}
            <div className="space-y-2">
              <Label>Client contact name*</Label>
              <Input
                value={clientContactName}
                onChange={(e) => setClientContactName(e.target.value)}
                placeholder="Enter contact name"
              />
              <p className="text-sm text-muted-foreground">
                Input company name to see a list of contact for that company
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Opportunity Name */}
            <div className="space-y-2">
              <Label>Opportunity name*</Label>
              <Input
                value={opportunityName}
                onChange={(e) => setOpportunityName(e.target.value)}
                placeholder="Enter opportunity name"
              />
            </div>

            {/* Opportunity Market */}
            <div className="space-y-2">
              <Label>Opportunity market*</Label>
              <Input
                value={opportunityMarket}
                onChange={(e) => setOpportunityMarket(e.target.value)}
                placeholder="Enter market"
              />
            </div>

            <Separator className="bg-border" />

            {/* Meeting Type */}
            <div className="space-y-2">
              <Label>Meeting type*</Label>
              <Select value={meetingType} onValueChange={setMeetingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent className="z-[300]">
                  <SelectItem value="in-person">In-person</SelectItem>
                  <SelectItem value="video">Video call</SelectItem>
                  <SelectItem value="phone">Phone call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Meeting */}
            <div className="space-y-2">
              <Label>Date of meeting*</Label>
              <DatePicker
                date={meetingDate}
                onDateChange={setMeetingDate}
                placeholder="Select a date"
                className="w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 space-y-2">
            <Button className="w-full" onClick={handleSaveOpportunity}>
              Save
            </Button>
            <Button variant="ghost" className="w-full" onClick={handleClosePanel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Items */}
      <div
        className={`fixed bottom-[76px] left-0 right-0 pl-6 pr-12 z-[101] ${
          isOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className="w-full bg-background rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-[32px] shadow-lg border border-border p-6 flex flex-col gap-5 origin-bottom-right transition-transform duration-200 ease-out"
          style={{
            transform: isOpen ? "scale(1)" : "scale(0)",
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
            >
              <div className="size-[46px] rounded-md bg-muted flex items-center justify-center shrink-0">
                {item.icon && (
                  <MaterialSymbol
                    name={item.icon}
                    size={24}
                    className="text-muted-foreground"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-base leading-6 text-foreground">
                  {item.label}
                </span>
                <span className="text-sm leading-5 text-muted-foreground">
                  {item.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FAB Button */}
      <div className="fixed bottom-0 right-0 px-6 py-5 z-[101]">
        <button
          type="button"
          onClick={handleToggle}
          className={`size-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
            isOpen
              ? "bg-background hover:bg-muted rotate-45"
              : "bg-primary hover:bg-primary/90 rotate-0"
          }`}
        >
          <MaterialSymbol
            name="add"
            size={28}
            className={`transition-colors duration-300 ${
              isOpen ? "text-foreground" : "text-primary-foreground"
            }`}
          />
        </button>
      </div>
    </>
  );
}
