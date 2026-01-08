"use client";

import { use } from "react";
import Link from "next/link";
import {
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  MaterialSymbol,
  Card,
  CardContent,
} from "@jllt/alize-ui";
import { getPersonById, getPersonConnections } from "@/lib/data/mock-data";

interface PersonPageProps {
  params: Promise<{ id: string }>;
}

export default function PersonPage({ params }: PersonPageProps) {
  const { id } = use(params);
  const person = getPersonById(id);
  const connections = getPersonConnections(id);

  if (!person) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Person not found</p>
      </div>
    );
  }

  const initials = person.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Link href="/">
            <MaterialSymbol
              name="chevron_left"
              size={24}
              className="text-foreground"
            />
          </Link>
        </div>
        {person.tags.includes("Leadership") && (
          <Badge variant="outline">Leadership</Badge>
        )}
      </header>

      {/* Profile Section */}
      <section className="p-4 border-b border-border">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-muted text-muted-foreground text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">
              {person.name}
            </h1>
            <p className="text-sm text-muted-foreground">{person.title}</p>
            <p className="text-sm text-muted-foreground">
              {person.company.name}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 border-b border-border">
        <div className="p-4 text-center border-r border-border">
          <p className="text-xl font-semibold text-foreground">
            {person.stats.contacts}
          </p>
          <p className="text-sm text-muted-foreground">Contacts</p>
        </div>
        <div className="p-4 text-center border-r border-border">
          <p className="text-xl font-semibold text-foreground">
            {person.stats.emails}
          </p>
          <p className="text-sm text-muted-foreground">Emails</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-xl font-semibold text-foreground">
            {person.stats.meetings}
          </p>
          <p className="text-sm text-muted-foreground">Meetings</p>
        </div>
      </section>

      {/* Connected To */}
      <section className="flex-1">
        <h3 className="px-4 py-3 text-sm font-medium text-muted-foreground">
          Connected to
        </h3>
        <div>
          {connections.map((connection) => {
            const connectionInitials = connection.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase();

            return (
              <Card
                key={connection.id}
                className="border-0 border-b border-border rounded-none shadow-none"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {connectionInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {connection.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {connection.email}
                      </p>
                    </div>
                    <div className="flex gap-4 shrink-0">
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          {connection.stats.emails}
                        </p>
                        <p className="text-xs text-muted-foreground">Emails</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          {connection.stats.meetings}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Meetings
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Request Warm Introduction CTA */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border">
        <Button className="w-full">Request warm introduction</Button>
      </div>
    </div>
  );
}



