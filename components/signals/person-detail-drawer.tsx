"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  ScrollArea,
} from "@jllt/alize-ui";
import { getPersonConnections } from "@/lib/data/mock-data";
import type { Person } from "@/lib/types";

interface PersonDetailDrawerProps {
  person: Person | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PersonDetailDrawer({
  person,
  open,
  onOpenChange,
}: PersonDetailDrawerProps) {
  if (!person) return null;

  const connections = getPersonConnections(person.id);

  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        {/* Drag handle */}
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-4 mt-2" />

        <ScrollArea className="flex-1 overflow-auto">
          <div className="px-4 pb-4">
            {/* Person Header */}
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="size-16 shrink-0">
                {person.avatar ? (
                  <AvatarImage src={person.avatar} alt={person.name} />
                ) : (
                  <AvatarFallback className="bg-muted text-muted-foreground text-lg">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {person.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">{person.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {person.company.name}
                    </p>
                  </div>
                  {person.tags.includes("Leadership") && (
                    <Badge variant="outline" className="shrink-0">
                      ★ Leadership
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground">Contacts</p>
                <p className="text-xl font-semibold text-foreground">
                  {person.stats.contacts}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Emails</p>
                <p className="text-xl font-semibold text-foreground">
                  {person.stats.emails}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Meetings</p>
                <p className="text-xl font-semibold text-foreground">
                  {person.stats.meetings}
                </p>
              </div>
            </div>

            {/* Connected to Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Connected to
              </h3>
              <div className="flex flex-col gap-3">
                {connections.map((connection) => (
                  <ConnectionRow key={connection.id} connection={connection} />
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Fixed CTA Button */}
        <div className="p-4 border-t border-border bg-background">
          <Button className="w-full" size="lg">
            Request warm introduction
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Connection Row Component
function ConnectionRow({ connection }: { connection: Person }) {
  const initials = connection.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-muted/50 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <Avatar className="size-10 shrink-0">
          {connection.avatar ? (
            <AvatarImage src={connection.avatar} alt={connection.name} />
          ) : (
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{connection.name}</p>
          <p className="text-xs text-muted-foreground">{connection.email}</p>
          {connection.lastContact && (
            <p className="text-xs text-muted-foreground mt-1">
              Last contact: {connection.lastContact}
            </p>
          )}
        </div>
        <div className="flex gap-4 shrink-0">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Emails</p>
            <p className="text-sm font-medium text-foreground">
              {connection.stats.emails}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Meetings</p>
            <p className="text-sm font-medium text-foreground">
              {connection.stats.meetings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

