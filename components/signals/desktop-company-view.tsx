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
  Input,
} from "@jllt/alize-ui";
import {
  getCompanyPeople,
  jllConnections,
  companySignals,
  activities,
  engagementCities,
  currentUser,
  companyStatsData,
  getWarmIntroduction,
  companies,
} from "@/lib/data/mock-data";
import type { Company, Person } from "@/lib/types";
import { WorkingLeadsPanel } from "./working-leads-panel";

interface DesktopCompanyViewProps {
  company: Company;
}

// AI Summaries matching the screenshot
const warmIntroSummary = "Several relationships exist at the leadership level, supported by direct meetings and recent communication. These connections may be particularly relevant for strategic or time-sensitive outreach.";
const engagementSummary = "Recent activity centers on space needs, timing considerations, and early feasibility discussions. Follow-ups appear ongoing, with no clear shift toward active deal negotiation.";

export function DesktopCompanyView({ company }: DesktopCompanyViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCity, setSelectedCity] = useState("All");
  const companyPeople = getCompanyPeople(company.id);
  const warmIntro = getWarmIntroduction(company.id);

  const filteredActivities =
    selectedCity === "All"
      ? activities
      : activities.filter((a) => a.location === selectedCity);

  return (
    <div className="flex h-full gap-4 p-4">
      {/* Left Panel - Working Leads */}
      <div className="shrink-0">
        <WorkingLeadsPanel selectedCompanyId={company.id} />
      </div>

      {/* Right Panel - Company Detail */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background rounded-lg border border-border min-w-0">
        {/* Company Header */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-medium text-foreground flex items-center gap-2">
                {company.name}
                <Link
                  href={`https://${company.domain}`}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MaterialSymbol name="open_in_new" size={16} />
                </Link>
              </h1>
              <div className="flex items-center gap-1.5">
                {company.badges.includes("Client") && (
                  <Badge variant="outline" className="text-xs font-normal">
                    Client
                  </Badge>
                )}
                {company.badges.includes("IPS") && (
                  <Badge variant="outline" className="text-xs font-normal">
                    IPS
                  </Badge>
                )}
              </div>
            </div>

            <Button variant="default" size="sm">
              Mark as working
            </Button>
          </div>

          {/* Skeleton placeholder bars (as shown in screenshot) */}
          <div className="flex gap-3 mt-4">
            <div className="h-2 w-24 bg-muted rounded" />
            <div className="h-2 w-32 bg-muted rounded" />
            <div className="h-2 w-20 bg-muted rounded" />
            <div className="h-2 w-28 bg-muted rounded" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="border-b border-border bg-background px-6">
            <TabsList className="bg-transparent h-auto p-0 gap-6">
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
            <TabsContent value="overview" className="mt-0 px-6 py-5">
              {/* Signals Badges */}
              <div className="flex gap-2 mb-6">
                <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">
                  Hiring 8 jobs
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">
                  Leadership change 7/18/24
                </Badge>
              </div>

              {/* Warm Introduction Section */}
              <section className="mb-8">
                <h3 className="text-base font-medium text-foreground mb-3">
                  Warm introduction
                </h3>

                {/* AI Summary */}
                <div className="bg-[var(--tonal-royal-subdued,#e8e8ff)] rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <MaterialSymbol
                      name="auto_awesome"
                      size={20}
                      className="text-[var(--tonal-royal-strong,#4a4adc)] shrink-0"
                    />
                    <p className="text-sm text-[var(--tonal-royal-strong,#4a4adc)] leading-relaxed">
                      {warmIntroSummary}
                    </p>
                  </div>
                </div>

                {/* Leadership Contact Cards - 2 columns */}
                <div className="grid grid-cols-2 gap-4">
                  <WarmIntroContactCard 
                    name="John Doe"
                    title="Senior Managing Director"
                    location="Dallas, TX"
                    isLeadership={true}
                    stats={{ contacts: 12, emails: 23, meetings: 5 }}
                    lastInteraction="michael@livevox.com"
                  />
                  <WarmIntroContactCard 
                    name="John Doe"
                    title="Senior Managing Director"
                    location="Dallas, TX"
                    isLeadership={true}
                    stats={{ contacts: 12, emails: 23, meetings: 5 }}
                    lastInteraction="michael@livevox.com"
                  />
                </div>
              </section>

              {/* Contacts Section */}
              <section className="mb-8">
                <h3 className="text-base font-medium text-foreground mb-3">
                  Contacts
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <ContactCard 
                    name="Craig Mueller"
                    initials="CM"
                    title="Vice President of Acmee Corporation"
                    mutualConnection="John Doe"
                    signalBadge="Hired or promoted Aug 1, 2025"
                  />
                  <ContactCard 
                    name="Craig Mueller"
                    initials="CM"
                    title="Vice President of Acmee Corporation"
                    mutualConnection="John Doe"
                    signalBadge="Hired or promoted Aug 1, 2025"
                  />
                  <ContactCard 
                    name="Craig Mueller"
                    initials="CM"
                    title="Vice President of Acmee Corporation"
                    mutualConnection="John Doe"
                    signalBadge="Hired or promoted Aug 1, 2025"
                  />
                </div>
              </section>

              {/* Engagement Section */}
              <section>
                <h3 className="text-base font-medium text-foreground mb-3">
                  Engagement
                </h3>

                {/* AI Summary */}
                <div className="bg-[var(--tonal-royal-subdued,#e8e8ff)] rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <MaterialSymbol
                      name="auto_awesome"
                      size={20}
                      className="text-[var(--tonal-royal-strong,#4a4adc)] shrink-0"
                    />
                    <p className="text-sm text-[var(--tonal-royal-strong,#4a4adc)] leading-relaxed">
                      {engagementSummary}
                    </p>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="flex flex-col">
                  <EngagementTimelineRow 
                    icon="wifi_tethering"
                    companyLogo={companies[1].logo}
                    companyInitials="NG"
                    description="Northrom Group is hiring. 65 jobs posting in your market"
                    date="August 13, 2015"
                  />
                  <EngagementTimelineRow 
                    icon="mail"
                    userName="Sarah Chen"
                    location="San Francisco"
                    description="Toured 100 Market street with James Wilson and Lisa Martinez"
                    date="August 13, 2015"
                  />
                  <EngagementTimelineRow 
                    icon="call"
                    userName="Sarah Chen"
                    location="San Francisco"
                    description="Toured 100 Market street with James Wilson and Lisa Martinez"
                    date="August 13, 2015"
                  />
                  <EngagementTimelineRow 
                    icon="wifi_tethering"
                    companyLogo={companies[1].logo}
                    companyInitials="NG"
                    description="Northrom Group is hiring. 65 jobs posting in your market"
                    date="August 13, 2015"
                  />
                  <EngagementTimelineRow 
                    icon="mail"
                    userName="Sarah Chen"
                    location="San Francisco"
                    description="Toured 100 Market street with James Wilson and Lisa Martinez"
                    date="August 13, 2015"
                  />
                </div>
              </section>
            </TabsContent>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="mt-0 px-6 py-5">
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

              <div className="flex flex-col">
                {filteredActivities.map((activity, index) => (
                  <EngagementTimelineRow 
                    key={activity.id}
                    icon={activity.type === "meeting" ? "groups" : activity.type === "call" ? "call" : "mail"}
                    userName={currentUser.name}
                    location={activity.location}
                    description={activity.description}
                    date={activity.date}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Communication Tab - Placeholder */}
            <TabsContent value="communication" className="mt-0 px-6 py-5">
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Coming soon</p>
              </div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="mt-0 px-6 py-5">
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
                  <ContactCard 
                    key={person.id}
                    name={person.name}
                    initials={person.name.split(" ").map(w => w[0]).join("").toUpperCase()}
                    title={person.title}
                    mutualConnection={jllConnections[0]?.name}
                    signalBadge={person.lastContact ? "Hired or promoted Aug 1, 2025" : undefined}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Leases Tab - Placeholder */}
            <TabsContent value="leases" className="mt-0 px-6 py-5">
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

// Warm Introduction Contact Card (with stats row)
interface WarmIntroContactCardProps {
  name: string;
  title: string;
  location: string;
  isLeadership?: boolean;
  stats: { contacts: number; emails: number; meetings: number };
  lastInteraction: string;
  avatar?: string;
}

function WarmIntroContactCard({ 
  name, 
  title, 
  location, 
  isLeadership, 
  stats, 
  lastInteraction,
  avatar 
}: WarmIntroContactCardProps) {
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase();

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Avatar className="size-14 shrink-0">
          {avatar ? (
            <AvatarImage src={avatar} alt={name} />
          ) : (
            <AvatarFallback className="bg-amber-100 text-amber-800 text-base">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            {isLeadership && (
              <Badge variant="outline" className="text-xs shrink-0">
                <MaterialSymbol name="star" size={12} className="mr-1" />
                Leadership
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Contacts</p>
          <p className="text-sm font-medium text-foreground">{stats.contacts}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Emails</p>
          <p className="text-sm font-medium text-foreground">{stats.emails}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Meetings</p>
          <p className="text-sm font-medium text-foreground">{stats.meetings}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Last interactions</p>
          <p className="text-sm font-medium text-foreground truncate">{lastInteraction}</p>
        </div>
      </div>
    </div>
  );
}

// Contact Card for Contacts section
interface ContactCardProps {
  name: string;
  initials: string;
  title: string;
  mutualConnection?: string;
  signalBadge?: string;
  avatar?: string;
}

function ContactCard({ name, initials, title, mutualConnection, signalBadge, avatar }: ContactCardProps) {
  return (
    <div className="bg-background border border-border rounded-lg p-4">
      {/* Top row: Avatar + Signal badge */}
      <div className="flex items-start justify-between mb-3">
        <Avatar className="size-12">
          {avatar ? (
            <AvatarImage src={avatar} alt={name} />
          ) : (
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        {signalBadge && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MaterialSymbol name="wifi_tethering" size={14} />
            <span>{signalBadge}</span>
          </div>
        )}
      </div>

      {/* Name and title */}
      <h4 className="text-sm font-medium text-foreground">{name}</h4>
      <p className="text-sm text-muted-foreground">{title}</p>

      {/* Mutual connection */}
      {mutualConnection && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Avatar className="size-5">
            <AvatarImage src={jllConnections[0]?.avatar} alt={mutualConnection} />
            <AvatarFallback className="text-[8px]">
              {mutualConnection.split(" ").map(w => w[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {mutualConnection} is a mutual connection
          </span>
        </div>
      )}
    </div>
  );
}

// Engagement Timeline Row
interface EngagementTimelineRowProps {
  icon: string;
  companyLogo?: string;
  companyInitials?: string;
  userName?: string;
  location?: string;
  description: string;
  date: string;
}

function EngagementTimelineRow({ 
  icon, 
  companyLogo, 
  companyInitials, 
  userName, 
  location, 
  description, 
  date 
}: EngagementTimelineRowProps) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-border last:border-b-0">
      {/* Icon */}
      <MaterialSymbol
        name={icon}
        size={18}
        className="text-muted-foreground mt-0.5 shrink-0"
      />

      {/* Avatar/Logo */}
      {companyLogo || companyInitials ? (
        <div className="shrink-0 size-6 rounded border border-border overflow-hidden bg-background flex items-center justify-center">
          {companyLogo ? (
            <img src={companyLogo} alt="" className="size-full object-contain p-0.5" />
          ) : (
            <span className="text-[8px] font-medium text-muted-foreground">{companyInitials}</span>
          )}
        </div>
      ) : userName ? (
        <Avatar className="size-6 shrink-0">
          <AvatarFallback className="text-[8px]">
            {userName.split(" ").map(w => w[0]).join("")}
          </AvatarFallback>
        </Avatar>
      ) : null}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {userName && (
            <span className="text-sm text-foreground">{userName}</span>
          )}
          {location && (
            <Badge variant="outline" className="text-xs font-normal">
              {location}
            </Badge>
          )}
        </div>
        <p className="text-sm text-foreground mt-0.5">
          {description}
        </p>
      </div>

      {/* Date */}
      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
        {date}
      </span>
    </div>
  );
}
