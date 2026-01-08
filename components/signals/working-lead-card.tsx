"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, Badge } from "@jllt/alize-ui";
import type { WorkingLead } from "@/lib/types";

interface WorkingLeadCardProps {
  lead: WorkingLead;
  isSelected?: boolean;
  onClick?: () => void;
}

export function WorkingLeadCard({ lead, isSelected, onClick }: WorkingLeadCardProps) {
  const { company, signals, categories, lastActivity, isUnread } = lead;
  
  const initials = company.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/company/${company.id}`} onClick={onClick}>
      <div
        className={`p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer ${
          isSelected ? "bg-muted" : ""
        }`}
      >
        {/* Header row: Logo + Name + Time + Unread dot */}
        <div className="flex items-start gap-3 mb-3">
          {/* Company Logo */}
          <div className="shrink-0 size-10 rounded-md border border-stroke-subdued overflow-hidden bg-background flex items-center justify-center">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="size-full object-contain p-1"
              />
            ) : (
              <Avatar className="size-full rounded-none">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs rounded-none">
                  {initials}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* Name and domain */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {company.name}
            </p>
            {company.domain && (
              <p className="text-xs text-muted-foreground truncate">
                {company.domain}
              </p>
            )}
          </div>

          {/* Time + Unread indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground">
              {lastActivity}
            </span>
            {isUnread && (
              <div className="size-2 rounded-full bg-[var(--tonal-science-strong,#125190)]" />
            )}
          </div>
        </div>

        {/* Signals row */}
        <div className="flex flex-wrap gap-2 mb-2">
          {signals.map((signal) => (
            <Badge
              key={signal}
              variant="outline"
              className="text-xs px-2 py-0.5 border-stroke-subdued"
            >
              {signal}
            </Badge>
          ))}
        </div>

        {/* Categories row */}
        <div className="flex items-center gap-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-1">
              <div className="size-2 rounded-sm bg-foreground" />
              <span className="text-xs text-muted-foreground">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

