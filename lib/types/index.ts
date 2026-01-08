// Signals App - Type Definitions

export interface Company {
  id: string;
  name: string;
  logo?: string;
  badges: CompanyBadge[];
  domain?: string;
}

export type CompanyBadge = 'IPS' | 'Client';

export interface Person {
  id: string;
  name: string;
  title: string;
  company: Company;
  avatar?: string;
  email?: string;
  stats: PersonStats;
  tags: string[];
  // Extended fields for contact details
  lastContact?: string;
  mutualConnections?: number;
  internalConnections?: Person[];
  hasZoomInfo?: boolean;
  hasLinkedIn?: boolean;
  contactInfo?: {
    emails: number;
    phones: number;
  };
  isMostRecentlyContacted?: boolean;
}

export interface PersonStats {
  contacts: number;
  emails: number;
  meetings: number;
}

export interface CompanyStats {
  localEmployees: number;
  localEmployeesGrowth: number;
  globalEmployees: number;
  globalEmployeesGrowth: number;
  localJobs: number;
  localJobsGrowth: number;
}

export interface Signal {
  id: string;
  company: Company;
  title: string;
  description: string;
  timestamp: string;
  type: SignalType;
}

export type SignalType = 'hiring' | 'funding' | 'leadership' | 'expansion' | 'relocation' | 'lease' | 'other';

export interface Activity {
  id: string;
  type: ActivityType;
  company: Company;
  description: string;
  date: string;
  location?: string;
  participants?: Person[];
}

export type ActivityType = 'meeting' | 'call' | 'email' | 'note';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

// Navigation types
export type BottomNavItem = 'home' | 'search' | 'add' | 'following' | 'profile';

// Working Leads (Desktop feature)
export interface WorkingLead {
  id: string;
  company: Company;
  signals: string[];
  categories: string[];
  lastActivity: string;
  isUnread: boolean;
}

// Warm Introduction (Desktop feature)
export interface WarmIntroduction {
  summary: string;
  contacts: Person[];
}

// Extended Person fields for desktop
export interface LeadershipContact extends Person {
  isLeadership: boolean;
  lastInteraction?: string;
}

// Client Profile types
export type JLLServiceType = 
  | 'Transaction Management'
  | 'Consulting'
  | 'JLL Technologies'
  | 'Lease Admin'
  | 'Integrated Facilities Management'
  | 'Project Management'
  | 'Workplace Services'
  | 'Capital Markets';

export interface ClientProfile {
  clientType: 'Portfolio Client' | 'Strategic Account' | 'Prospect' | 'Active Client';
  accountLead?: {
    id: string;
    name: string;
    title: string;
    avatar?: string;
  };
  location?: string;
  activeServices: JLLServiceType[];
  availableServices: JLLServiceType[];
}



