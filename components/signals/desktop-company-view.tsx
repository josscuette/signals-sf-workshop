"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  MaterialSymbol,
  ScrollArea,
  ScrollBar,
  Input,
} from "@jllt/alize-ui";
import {
  getCompanyPeople,
  jllConnections,
  companySignals,
  activities,
  engagementCities,
  engagementAISummary,
  currentUser,
  companyStatsData,
  getWarmIntroduction,
} from "@/lib/data/mock-data";
import type { Company, Person } from "@/lib/types";
import { WorkingLeadsPanel } from "./working-leads-panel";

interface DesktopCompanyViewProps {
  company: Company;
}

export function DesktopCompanyView({ company }: DesktopCompanyViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCity, setSelectedCity] = useState("All");
  const companyPeople = getCompanyPeople(company.id);
  const warmIntro = getWarmIntroduction(company.id);

  const companyInitials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const filteredActivities =
    selectedCity === "All"
      ? activities
      : activities.filter((a) => a.location === selectedCity);

  return (
    <div className="flex h-full">
      {/* Left Panel - Working Leads */}
      <WorkingLeadsPanel selectedCompanyId={company.id} />

      {/* Right Panel - Company Detail */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Company Header */}
        <div className="bg-background border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Company Logo */}
              <div className="shrink-0 size-12 rounded-md border border-stroke-subdued overflow-hidden bg-background flex items-center justify-center p-1">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="size-full object-contain"
                  />
                ) : (
                  <Avatar className="size-full rounded-none">
                    <AvatarFallback className="bg-muted text-muted-foreground text-sm rounded-none">
                      {companyInitials}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-foreground">
                    {company.name}
                  </h1>
                  <Link
                    href={`https://${company.domain}`}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <MaterialSymbol name="open_in_new" size={18} />
                  </Link>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {company.badges.includes("Client") && (
                    <Badge tonal="lilac" className="text-xs">
                      Client
                    </Badge>
                  )}
                  {company.badges.includes("IPS") && (
                    <Badge tonal="lilac" className="text-xs">
                      IPS
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Button variant="default" size="sm">
              Mark as working
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="border-b border-border bg-background">
            <TabsList className="bg-transparent h-auto p-0 gap-6 px-6">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm leading-5 font-normal"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="engagement"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm leading-5 font-normal"
              >
                Engagement
              </TabsTrigger>
              <TabsTrigger
                value="communication"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm leading-5 font-normal"
              >
                Communication
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm leading-5 font-normal"
              >
                Contacts
              </TabsTrigger>
              <TabsTrigger
                value="leases"
                className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm leading-5 font-normal"
              >
                Leases
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0 p-6">
              {/* Signals Badges */}
              <div className="flex gap-2 mb-6">
                {companySignals.slice(0, 2).map((signal) => (
                  <Badge
                    key={signal}
                    variant="outline"
                    className="px-3 py-1.5 text-sm"
                  >
                    {signal}
                  </Badge>
                ))}
              </div>

              {/* Warm Introduction Section */}
              <section className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Warm introduction
                </h3>

                {/* AI Summary */}
                <div className="bg-[var(--tonal-royal-subdued,#e8e8ff)] rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MaterialSymbol
                      name="auto_awesome"
                      size={18}
                      className="text-[var(--tonal-royal-strong,#4a4adc)] mt-0.5"
                    />
                    <p className="text-sm text-[var(--tonal-royal-strong,#4a4adc)] leading-relaxed">
                      {warmIntro?.summary ||
                        "Several relationships exist at the leadership level, supported by direct meetings and recent communication. These connections may be particularly relevant for strategic or time-sensitive outreach."}
                    </p>
                  </div>
                </div>

                {/* Leadership Contact Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {(warmIntro?.contacts || companyPeople.filter(p => p.tags.includes("Leadership"))).slice(0, 2).map((person) => (
                    <LeadershipContactCard key={person.id} person={person} />
                  ))}
                </div>
              </section>

              {/* Contacts Section */}
              <section className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Contacts
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {companyPeople.slice(0, 3).map((person) => (
                    <ContactCardCompact key={person.id} person={person} />
                  ))}
                </div>
              </section>

              {/* Engagement Section */}
              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Engagement
                </h3>

                {/* AI Summary */}
                <div className="bg-[var(--tonal-royal-subdued,#e8e8ff)] rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MaterialSymbol
                      name="auto_awesome"
                      size={18}
                      className="text-[var(--tonal-royal-strong,#4a4adc)] mt-0.5"
                    />
                    <p className="text-sm text-[var(--tonal-royal-strong,#4a4adc)] leading-relaxed">
                      {engagementAISummary}
                    </p>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="flex flex-col gap-0">
                  {activities.slice(0, 5).map((activity) => (
                    <EngagementRow key={activity.id} activity={activity} />
                  ))}
                </div>
              </section>
            </TabsContent>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="mt-0 p-6">
              <div className="mb-4">
                <div className="flex gap-2 mb-4">
                  {engagementCities.map((city) => (
                    <Badge
                      key={city}
                      variant={selectedCity === city ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-0">
                {filteredActivities.map((activity) => (
                  <EngagementRow key={activity.id} activity={activity} />
                ))}
              </div>
            </TabsContent>

            {/* Communication Tab - Placeholder */}
            <TabsContent value="communication" className="mt-0 p-6">
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Coming soon</p>
              </div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="mt-0 p-6">
              {/* Stats Row */}
              <div className="flex gap-8 mb-6 pb-6 border-b border-border">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-semibold text-foreground">
                      {companyStatsData.localEmployees}
                    </span>
                    <span className="text-xs text-[var(--tonal-nature-strong,#0d7a3c)] flex items-center">
                      <MaterialSymbol name="arrow_upward" size={12} />
                      {companyStatsData.localEmployeesGrowth}% (Yoy)
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Local employees
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-semibold text-foreground">
                      {companyStatsData.globalEmployees}
                    </span>
                    <span className="text-xs text-[var(--tonal-nature-strong,#0d7a3c)] flex items-center">
                      <MaterialSymbol name="arrow_upward" size={12} />
                      {companyStatsData.globalEmployeesGrowth}% (Yoy)
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">Global</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-semibold text-foreground">
                      {companyStatsData.localJobs}
                    </span>
                    <span className="text-xs text-[var(--tonal-nature-strong,#0d7a3c)] flex items-center">
                      <MaterialSymbol name="arrow_upward" size={12} />
                      {companyStatsData.localJobsGrowth}% (Yoy)
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Local jobs
                  </span>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default">
                  Company contacts ({companyPeople.length})
                </Badge>
                <Badge variant="outline">
                  Internal connections ({jllConnections.length})
                </Badge>
              </div>

              {/* Search */}
              <Input placeholder="Search contacts" className="mb-4 max-w-md" />

              {/* Contact Grid */}
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {companyPeople.map((person) => (
                  <ContactCardCompact key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>

            {/* Leases Tab - Placeholder */}
            <TabsContent value="leases" className="mt-0 p-6">
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Coming soon</p>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}

// Leadership Contact Card for Warm Introduction section
function LeadershipContactCard({ person }: { person: Person }) {
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Avatar className="size-12">
          {person.avatar ? (
            <AvatarImage src={person.avatar} alt={person.name} />
          ) : (
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-foreground">
              {person.name}
            </span>
            {person.tags.includes("Leadership") && (
              <Badge variant="outline" className="text-xs">
                <MaterialSymbol name="star" size={12} className="mr-1" />
                Leadership
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{person.title}</p>
          <p className="text-xs text-muted-foreground">Dallas, TX</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-border text-xs">
        <div>
          <span className="text-muted-foreground">Contacts</span>
          <p className="text-foreground font-medium">{person.stats.contacts}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Emails</span>
          <p className="text-foreground font-medium">{person.stats.emails}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Meetings</span>
          <p className="text-foreground font-medium">{person.stats.meetings}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Last interactions</span>
          <p className="text-foreground font-medium">{person.email}</p>
        </div>
      </div>
    </div>
  );
}

// Compact Contact Card for desktop grid
function ContactCardCompact({ person }: { person: Person }) {
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <Avatar className="size-10">
          {person.avatar ? (
            <AvatarImage src={person.avatar} alt={person.name} />
          ) : (
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        {person.lastContact && (
          <Badge variant="outline" className="text-xs">
            <MaterialSymbol name="wifi_tethering" size={12} className="mr-1" />
            Hired or promoted Aug 1, 2025
          </Badge>
        )}
      </div>

      <h4 className="text-sm font-medium text-foreground">{person.name}</h4>
      <p className="text-sm text-muted-foreground">{person.title}</p>

      {/* Mutual connection */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        <Avatar className="size-5">
          <AvatarImage
            src={jllConnections[0]?.avatar}
            alt={jllConnections[0]?.name}
          />
          <AvatarFallback className="text-[8px]">JD</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">
          {jllConnections[0]?.name} is a mutual connection
        </span>
      </div>
    </div>
  );
}

// Engagement Row for timeline
function EngagementRow({ activity }: { activity: typeof activities[0] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "groups";
      case "call":
        return "call";
      case "email":
        return "mail";
      default:
        return "event_note";
    }
  };

  return (
    <div className="flex items-start gap-4 py-3 border-b border-border last:border-b-0">
      <MaterialSymbol
        name={getIcon(activity.type)}
        size={18}
        className="text-muted-foreground mt-0.5"
      />

      <div className="flex-1 flex items-start gap-3">
        <Avatar className="size-6">
          {currentUser.avatar ? (
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          ) : (
            <AvatarFallback className="text-[8px]">SC</AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">{currentUser.name}</span>
            {activity.location && (
              <Badge variant="outline" className="text-xs">
                {activity.location}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {activity.description}
          </p>
        </div>
      </div>

      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {activity.date}
      </span>
    </div>
  );
}

