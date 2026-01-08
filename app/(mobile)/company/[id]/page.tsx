"use client";

import { use, useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  MaterialSymbol,
  ScrollArea,
  ScrollBar,
  Input,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@jllt/alize-ui";
import {
  getCompanyById,
  getCompanyPeople,
  jllConnections,
  companySignals,
  activities,
  engagementCities,
  engagementAISummary,
  currentUser,
  companyStatsData,
} from "@/lib/data/mock-data";
import type { Person } from "@/lib/types";
import { DesktopCompanyView } from "@/components/signals/desktop-company-view";

interface CompanyPageProps {
  params: Promise<{ id: string }>;
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const { id } = use(params);
  const company = getCompanyById(id);
  const companyPeople = getCompanyPeople(id);
  const [selectedCity, setSelectedCity] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // Swipe animation state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Panel refs
  const panelRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const tabs = ["overview", "engagement", "contacts"];
  const currentIndex = tabs.indexOf(activeTab);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    // Add resistance at edges
    const isAtStart = currentIndex === 0 && diff > 0;
    const isAtEnd = currentIndex === tabs.length - 1 && diff < 0;
    
    if (isAtStart || isAtEnd) {
      setDragOffset(diff * 0.3); // Rubber band effect
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 80; // Minimum distance to trigger tab change
    
    if (dragOffset < -threshold && currentIndex < tabs.length - 1) {
      // Swipe left -> next tab
      setActiveTab(tabs[currentIndex + 1]);
    } else if (dragOffset > threshold && currentIndex > 0) {
      // Swipe right -> previous tab
      setActiveTab(tabs[currentIndex - 1]);
    }
    
    setDragOffset(0);
  };

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Company not found</p>
      </div>
    );
  }

  const companyInitials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Filter activities by city
  const filteredActivities = selectedCity === "All" 
    ? activities 
    : activities.filter(a => a.location === selectedCity);

  return (
    <>
      {/* ===== DESKTOP VERSION ===== */}
      <div className="hidden md:block h-full">
        <DesktopCompanyView company={company} />
      </div>

      {/* ===== MOBILE VERSION ===== */}
      <div className="flex flex-col min-h-screen bg-background md:hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <header ref={headerRef} className="fixed top-0 left-0 right-0 z-10 bg-background">
          {/* Top section with header and company info */}
          <div className="flex flex-col gap-0 items-center">
            {/* Header row - Back + Follow */}
            <div className="flex items-center justify-between w-full px-6 pt-3">
              <Link href="/">
                <Button variant="outline" size="icon">
                  <MaterialSymbol name="chevron_left" size={20} />
                </Button>
              </Link>
              <Button variant="secondary" size="sm">
                Follow
              </Button>
            </div>

            {/* Company Info row */}
            <div className="flex items-center justify-between w-full px-6 my-4">
              <div className="flex items-center gap-3">
                {/* Company Logo - same style as SignalCard */}
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
                <div className="flex flex-col">
                  <span className="text-lg leading-7 text-foreground">
                    {company.name}
                  </span>
                  {company.domain && (
                    <span className="text-xs leading-4 text-muted-foreground">
                      {company.domain}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tonal="lilac" className="text-xs">WD</Badge>
                <Badge tonal="lilac" className="text-xs">IPS</Badge>
                <Badge tonal="lilac" className="text-xs">Client</Badge>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="w-full border-b border-border">
            <ScrollArea className="w-full">
              <TabsList className="w-max bg-transparent h-auto p-0 gap-4 pl-6">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 pt-0 text-base leading-6 font-normal"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="engagement"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 pt-0 text-base leading-6 font-normal"
                >
                  Engagement
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 pt-0 text-base leading-6 font-normal"
                >
                  Contacts
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </header>

        {/* Swipeable Tab Content */}
        <div 
          className="relative overflow-hidden"
          style={{ marginTop: headerHeight }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={containerRef}
            className="relative overflow-hidden"
          >
            {/* Overview Panel */}
            <div 
              ref={(el) => { panelRefs.current[0] = el; }}
              className="bg-muted/50 w-full"
              style={{ 
                position: currentIndex === 0 ? 'relative' : 'absolute',
                opacity: currentIndex === 0 ? 1 : 0,
                pointerEvents: currentIndex === 0 ? 'auto' : 'none',
                transform: `translateX(${(0 - currentIndex) * 100 + (dragOffset / (typeof window !== 'undefined' ? window.innerWidth : 375)) * 100}%)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                top: 0,
                left: 0,
              }}
            >
              {/* Signals Section */}
              <section className="bg-background px-6 py-4 flex flex-col gap-3">
                <h3 className="text-sm leading-5 text-muted-foreground">
                  Signals
                </h3>
                <ScrollArea className="w-full">
                  <div className="flex gap-2">
                    {companySignals.map((signal) => (
                      <div
                        key={signal}
                        className="shrink-0 bg-[var(--tonal-science-subdued,#e8f4ff)] text-[var(--tonal-science-strong,#125190)] px-3 py-2 rounded-md text-sm leading-5 whitespace-nowrap"
                      >
                        {signal}
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </section>

              {/* Cards container */}
              <div className="flex flex-col gap-3 px-6 py-3">
                {/* Warm Introductions Section */}
                <section className="bg-background rounded-xl p-4 flex flex-col gap-3">
                  <h3 className="text-sm leading-5 text-muted-foreground">
                    JLL connections
                  </h3>
                  <div className="flex gap-4 w-full">
                    {jllConnections.slice(0, 4).map((person) => {
                      const initials = person.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase();
                      return (
                        <div
                          key={person.id}
                          className="flex-1 flex flex-col items-center gap-2"
                        >
                          <div className="w-full aspect-square">
                            <Avatar className="size-full">
                              {person.avatar ? (
                                <AvatarImage src={person.avatar} alt={person.name} />
                              ) : (
                                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                  {initials}
                                </AvatarFallback>
                              )}
                            </Avatar>
                          </div>
                          <span className="text-xs leading-4 text-foreground text-center w-full">
                            {person.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    See all JLL connections
                  </Button>
                </section>

                {/* Engagement Section */}
                <section className="bg-background rounded-xl p-4 flex flex-col gap-3">
                  <h3 className="text-sm leading-5 text-muted-foreground">
                    Engagement
                  </h3>
                  <ScrollArea className="w-full">
                    <div className="flex gap-2">
                      {engagementCities.map((city) => (
                        <Badge
                          key={city}
                          variant={selectedCity === city ? "default" : "outline"}
                          className="shrink-0 cursor-pointer"
                          onClick={() => setSelectedCity(city)}
                        >
                          {city}
                        </Badge>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  <div className="flex flex-col gap-3">
                    {filteredActivities.slice(0, 5).map((activity) => (
                      <EngagementCard key={activity.id} activity={activity} />
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setActiveTab("engagement")}
                  >
                    See more engagement
                  </Button>
                </section>
              </div>
            </div>

            {/* Engagement Panel */}
            <div 
              ref={(el) => { panelRefs.current[1] = el; }}
              className="bg-muted/50 w-full"
              style={{ 
                position: currentIndex === 1 ? 'relative' : 'absolute',
                opacity: currentIndex === 1 ? 1 : 0,
                pointerEvents: currentIndex === 1 ? 'auto' : 'none',
                transform: `translateX(${(1 - currentIndex) * 100 + (dragOffset / (typeof window !== 'undefined' ? window.innerWidth : 375)) * 100}%)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                top: 0,
                left: 0,
              }}
            >
              <div className="flex flex-col gap-4 p-4">
                {/* AI Summary Card */}
                <div className="bg-[var(--tonal-royal-subdued,#e8e8ff)] rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <MaterialSymbol name="auto_awesome" size={20} className="text-[var(--tonal-royal-strong,#4a4adc)]" />
                    <h3 className="text-sm font-medium text-[var(--tonal-royal-strong,#4a4adc)]">
                      AI Summary
                    </h3>
                  </div>
                  <div className="text-sm leading-relaxed text-[var(--tonal-royal-strong,#4a4adc)] whitespace-pre-line">
                    {engagementAISummary}
                  </div>
                </div>

                {/* All Engagements */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm leading-5 text-muted-foreground">
                    All Engagements ({activities.length})
                  </h3>
                  {activities.map((activity) => (
                    <EngagementCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>

            {/* Contacts Panel */}
            <div 
              ref={(el) => { panelRefs.current[2] = el; }}
              className="bg-muted/50 w-full"
              style={{ 
                position: currentIndex === 2 ? 'relative' : 'absolute',
                opacity: currentIndex === 2 ? 1 : 0,
                pointerEvents: currentIndex === 2 ? 'auto' : 'none',
                transform: `translateX(${(2 - currentIndex) * 100 + (dragOffset / (typeof window !== 'undefined' ? window.innerWidth : 375)) * 100}%)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                top: 0,
                left: 0,
              }}
            >
              {/* Stats Row */}
              <div className="bg-background px-6 py-4 flex gap-6 border-b border-border">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xl leading-7 font-semibold text-foreground">{companyStatsData.localEmployees}</span>
                    <span className="text-xs leading-4 text-[var(--tonal-nature-strong,#0d7a3c)] flex items-center">
                      <MaterialSymbol name="arrow_upward" size={12} />
                      {companyStatsData.localEmployeesGrowth}% (Yoy)
                    </span>
                  </div>
                  <span className="text-sm leading-5 text-muted-foreground">Local employees</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xl leading-7 font-semibold text-foreground">{companyStatsData.globalEmployees}</span>
                    <span className="text-xs leading-4 text-[var(--tonal-nature-strong,#0d7a3c)] flex items-center">
                      <MaterialSymbol name="arrow_upward" size={12} />
                      {companyStatsData.globalEmployeesGrowth}% (Yoy)
                    </span>
                  </div>
                  <span className="text-sm leading-5 text-muted-foreground">Global</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xl leading-7 font-semibold text-foreground">{companyStatsData.localJobs}</span>
                    <span className="text-xs leading-4 text-[var(--tonal-nature-strong,#0d7a3c)] flex items-center">
                      <MaterialSymbol name="arrow_upward" size={12} />
                      {companyStatsData.localJobsGrowth}% (Yoy)
                    </span>
                  </div>
                  <span className="text-sm leading-5 text-muted-foreground">Local jobs</span>
                </div>
              </div>

              {/* Tabs and Search */}
              <div className="bg-background px-6 py-3 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="cursor-pointer">
                    Company contacts ({companyPeople.length})
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Internal connections ({jllConnections.length})
                  </Badge>
                </div>
                <Input 
                    placeholder="Search company"
                    className="w-full h-11 shadow-sm"
                  />
              </div>

              {/* Contact Cards */}
              <div className="flex flex-col gap-3 p-4">
                {companyPeople.length > 0 ? (
                  companyPeople.map((person) => (
                    <ContactCard key={person.id} person={person} />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm leading-5 text-muted-foreground">No contacts found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tabs>

      </div>
    </>
  );
}

// Engagement Card Component
function EngagementCard({ activity }: { activity: typeof activities[0] }) {
  const userInitials = currentUser.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-muted/50 rounded-lg px-4 py-3 flex flex-col gap-2 w-full">
      {/* Top meta */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 flex items-center gap-3">
          {/* User info */}
          <div className="flex items-center gap-2">
            <Avatar className="size-5 rounded-full">
              {currentUser.avatar ? (
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              ) : (
                <AvatarFallback className="bg-muted text-muted-foreground text-[8px]">
                  {userInitials}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-xs leading-4 text-foreground whitespace-nowrap">
              {currentUser.name}
            </span>
          </div>
          {/* Location badge */}
          {activity.location && (
            <div className="bg-background px-1 rounded">
              <span className="text-xs leading-4 text-foreground whitespace-nowrap">
                {activity.location}
              </span>
            </div>
          )}
        </div>
        {/* Date */}
        <span className="text-xs leading-4 text-muted-foreground whitespace-nowrap">
          {activity.date}
        </span>
      </div>
      {/* Description */}
      <p className="text-base leading-6 text-foreground w-full">
        {activity.description}
      </p>
    </div>
  );
}

// Contact Card Component
function ContactCard({ person }: { person: Person }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-background rounded-xl p-4 flex flex-col gap-3 border border-border">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          {/* Name and Icons */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base leading-6 font-semibold text-foreground">
              {person.name}
            </span>
            {person.hasZoomInfo && (
              <span className="text-sm font-bold text-[#6b4fbb]">Z</span>
            )}
            {person.hasLinkedIn && (
              <span className="text-sm font-bold text-[#0077b5]">in</span>
            )}
          </div>
          
          {/* Title and Last Contact */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm leading-5 text-muted-foreground">{person.title}</span>
            {person.lastContact && (
              <div className="flex items-center gap-1 text-sm leading-5 text-muted-foreground">
                <MaterialSymbol name="wifi_tethering" size={14} />
                <span>{person.lastContact}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* View Contact Info Button */}
        <div className="flex flex-col items-end gap-1">
          <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
            View contact info
          </Button>
          {person.contactInfo && (
            <span className="text-xs leading-4 text-muted-foreground">
              {person.contactInfo.emails} email and {person.contactInfo.phones} phone numbers found
            </span>
          )}
        </div>
      </div>

      {/* Badges Row */}
      {(person.mutualConnections || person.isMostRecentlyContacted) && (
        <div className="flex items-center gap-2 flex-wrap">
          {person.mutualConnections && person.mutualConnections > 0 && (
            <Badge variant="outline" className="text-[var(--tonal-nature-strong,#0d7a3c)] border-[var(--tonal-nature-subdued,#d4f5e0)] bg-[var(--tonal-nature-subdued,#d4f5e0)]">
              <MaterialSymbol name="add_circle_outline" size={14} className="mr-1" />
              {person.mutualConnections} mutual connection{person.mutualConnections > 1 ? 's' : ''}
            </Badge>
          )}
          {person.isMostRecentlyContacted && (
            <Badge variant="secondary" className="text-xs">
              Most recently contacted
            </Badge>
          )}
        </div>
      )}

      {/* Internal Connections Expandable */}
      {person.internalConnections && person.internalConnections.length > 0 && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="flex items-center gap-1 text-sm leading-5 text-muted-foreground hover:text-foreground transition-colors">
            {person.internalConnections.length} mutual JLL connections
            <MaterialSymbol 
              name={isExpanded ? "expand_less" : "expand_more"} 
              size={18} 
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-col gap-2">
              {person.internalConnections.map((connection) => (
                <div key={connection.id} className="flex items-center gap-2 text-sm leading-5 text-foreground">
                  <Avatar className="size-6">
                    {connection.avatar ? (
                      <AvatarImage src={connection.avatar} alt={connection.name} />
                    ) : (
                      <AvatarFallback className="text-xs">
                        {connection.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{connection.name}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Default Internal Connections (for demo) */}
      {!person.internalConnections && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="flex items-center gap-1 text-sm leading-5 text-muted-foreground hover:text-foreground transition-colors">
            2 mutual JLL connections
            <MaterialSymbol 
              name={isExpanded ? "expand_less" : "expand_more"} 
              size={18} 
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-col gap-2">
              {jllConnections.slice(0, 2).map((connection) => (
                <div key={connection.id} className="flex items-center gap-2 text-sm leading-5 text-foreground">
                  <Avatar className="size-6">
                    {connection.avatar ? (
                      <AvatarImage src={connection.avatar} alt={connection.name} />
                    ) : (
                      <AvatarFallback className="text-xs">
                        {connection.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{connection.name}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
