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

export type SignalType = 'hiring' | 'funding' | 'leadership' | 'expansion' | 'other';

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



