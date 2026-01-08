"use client";

import { useState } from "react";
import { Button, MaterialSymbol, ScrollArea } from "@jllt/alize-ui";
import { WorkingLeadCard } from "./working-lead-card";
import { workingLeads } from "@/lib/data/mock-data";

interface WorkingLeadsPanelProps {
  selectedCompanyId?: string;
  onSelectCompany?: (companyId: string) => void;
}

export function WorkingLeadsPanel({ selectedCompanyId, onSelectCompany }: WorkingLeadsPanelProps) {
  return (
    <div className="w-80 border-r border-border bg-background flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-foreground">Working leads</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <MaterialSymbol name="filter_list" size={16} />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <MaterialSymbol name="sort" size={16} />
            Sort
          </Button>
        </div>
      </div>

      {/* Leads List */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {workingLeads.map((lead) => (
            <WorkingLeadCard
              key={lead.id}
              lead={lead}
              isSelected={selectedCompanyId === lead.company.id}
              onClick={() => onSelectCompany?.(lead.company.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

