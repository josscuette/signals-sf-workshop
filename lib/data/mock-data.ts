import type { Company, Person, Signal, Activity, User, CompanyStats, WorkingLead, WarmIntroduction, ClientProfile } from '@/lib/types';

// Current user
export const currentUser: User = {
  id: 'user-1',
  name: 'Sarah Chen',
  email: 'sarah.chen@jll.com',
  avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
};

// Companies
export const companies: Company[] = [
  {
    id: 'company-1',
    name: 'Salesforce',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/120px-Salesforce.com_logo.svg.png',
    badges: ['IPS', 'Client'],
    domain: 'salesforce.com',
  },
  {
    id: 'company-2',
    name: 'Northrop Grumman',
    logo: 'https://www.google.com/s2/favicons?domain=northropgrumman.com&sz=128',
    badges: ['Client'],
    domain: 'northropgrumman.com',
  },
  {
    id: 'company-3',
    name: 'Varonis',
    logo: 'https://www.google.com/s2/favicons?domain=varonis.com&sz=128',
    badges: ['IPS'],
    domain: 'varonis.com',
  },
  {
    id: 'company-4',
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/120px-Stripe_Logo%2C_revised_2016.svg.png',
    badges: [],
    domain: 'stripe.com',
  },
  {
    id: 'company-5',
    name: 'BlackRock',
    logo: 'https://www.google.com/s2/favicons?domain=blackrock.com&sz=128',
    badges: ['Client'],
    domain: 'blackrock.com',
  },
  {
    id: 'company-6',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png',
    badges: ['IPS', 'Client'],
    domain: 'google.com',
  },
  {
    id: 'company-7',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/120px-Microsoft_logo.svg.png',
    badges: ['Client'],
    domain: 'microsoft.com',
  },
  {
    id: 'company-8',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/120px-Amazon_logo.svg.png',
    badges: ['IPS'],
    domain: 'amazon.com',
  },
];

// People
export const people: Person[] = [
  // Salesforce contacts
  {
    id: 'person-1',
    name: 'Jayant Sai',
    title: 'Director Of Engineering',
    company: companies[0],
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    email: 'jayant.sai@salesforce.com',
    stats: { contacts: 1, emails: 6, meetings: 4 },
    tags: ['Leadership'],
    lastContact: 'Mar 2025',
    mutualConnections: 1,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 2 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-2',
    name: 'Kiran Kumar',
    title: 'Lead Systems Architect',
    company: companies[0],
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    email: 'kiran.kumar@salesforce.com',
    stats: { contacts: 23, emails: 6, meetings: 4 },
    tags: [],
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 2 },
  },
  {
    id: 'person-3',
    name: 'Priya Sharma',
    title: 'Principal Software Engineer',
    company: companies[0],
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    email: 'priya.sharma@salesforce.com',
    stats: { contacts: 12, emails: 8, meetings: 3 },
    tags: [],
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 2 },
  },
  {
    id: 'person-4',
    name: 'Michael Chen',
    title: 'VP of Product',
    company: companies[0],
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    email: 'michael.chen@salesforce.com',
    stats: { contacts: 5, emails: 12, meetings: 7 },
    tags: ['Leadership'],
    lastContact: 'Feb 2025',
    mutualConnections: 3,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 1 },
  },
  {
    id: 'person-5',
    name: 'Sarah Johnson',
    title: 'Head of Real Estate',
    company: companies[0],
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    email: 'sarah.johnson@salesforce.com',
    stats: { contacts: 8, emails: 15, meetings: 6 },
    tags: [],
    lastContact: 'Jan 2025',
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 1 },
  },
  // Northrop Grumman contacts
  {
    id: 'person-6',
    name: 'David Brooks',
    title: 'VP of Facilities',
    company: companies[1],
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    email: 'david.brooks@northropgrumman.com',
    stats: { contacts: 14, emails: 22, meetings: 8 },
    tags: ['Leadership'],
    lastContact: 'Dec 2025',
    mutualConnections: 2,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 1 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-7',
    name: 'Amanda Torres',
    title: 'Director of Real Estate',
    company: companies[1],
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    email: 'amanda.torres@northropgrumman.com',
    stats: { contacts: 9, emails: 18, meetings: 5 },
    tags: [],
    lastContact: 'Nov 2025',
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 2 },
  },
  {
    id: 'person-8',
    name: 'Robert Kim',
    title: 'Senior Property Manager',
    company: companies[1],
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    email: 'robert.kim@northropgrumman.com',
    stats: { contacts: 6, emails: 11, meetings: 3 },
    tags: [],
    hasZoomInfo: true,
    hasLinkedIn: false,
    contactInfo: { emails: 1, phones: 1 },
  },
  // Varonis contacts
  {
    id: 'person-9',
    name: 'Emily Watson',
    title: 'CFO',
    company: companies[2],
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    email: 'emily.watson@varonis.com',
    stats: { contacts: 7, emails: 14, meetings: 4 },
    tags: ['Leadership'],
    lastContact: 'Jan 2026',
    mutualConnections: 1,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 2 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-10',
    name: 'Chris Anderson',
    title: 'Head of Operations',
    company: companies[2],
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    email: 'chris.anderson@varonis.com',
    stats: { contacts: 4, emails: 9, meetings: 2 },
    tags: [],
    hasZoomInfo: false,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 1 },
  },
  // Stripe contacts
  {
    id: 'person-11',
    name: 'Jessica Liu',
    title: 'VP of Infrastructure',
    company: companies[3],
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    email: 'jessica.liu@stripe.com',
    stats: { contacts: 11, emails: 25, meetings: 9 },
    tags: ['Leadership'],
    lastContact: 'Dec 2025',
    mutualConnections: 3,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 2 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-12',
    name: 'Mark Thompson',
    title: 'Facilities Director',
    company: companies[3],
    avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
    email: 'mark.thompson@stripe.com',
    stats: { contacts: 8, emails: 16, meetings: 5 },
    tags: [],
    lastContact: 'Nov 2025',
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 1 },
  },
  // BlackRock contacts
  {
    id: 'person-13',
    name: 'Patricia Moore',
    title: 'Managing Director',
    company: companies[4],
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    email: 'patricia.moore@blackrock.com',
    stats: { contacts: 19, emails: 42, meetings: 14 },
    tags: ['Leadership'],
    lastContact: 'Jan 2026',
    mutualConnections: 4,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 2 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-14',
    name: 'James Wilson',
    title: 'Head of Real Assets',
    company: companies[4],
    avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
    email: 'james.wilson@blackrock.com',
    stats: { contacts: 15, emails: 33, meetings: 11 },
    tags: ['Leadership'],
    lastContact: 'Dec 2025',
    mutualConnections: 2,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 1 },
  },
  {
    id: 'person-15',
    name: 'Linda Garcia',
    title: 'Senior Vice President',
    company: companies[4],
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
    email: 'linda.garcia@blackrock.com',
    stats: { contacts: 10, emails: 21, meetings: 7 },
    tags: [],
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 2 },
  },
  // Google contacts
  {
    id: 'person-16',
    name: 'Alex Rivera',
    title: 'Director of Real Estate',
    company: companies[5],
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    email: 'alex.rivera@google.com',
    stats: { contacts: 22, emails: 48, meetings: 16 },
    tags: ['Leadership'],
    lastContact: 'Jan 2026',
    mutualConnections: 5,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 2 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-17',
    name: 'Samantha Lee',
    title: 'Workplace Services Lead',
    company: companies[5],
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    email: 'samantha.lee@google.com',
    stats: { contacts: 13, emails: 29, meetings: 8 },
    tags: [],
    lastContact: 'Dec 2025',
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 1 },
  },
  // Microsoft contacts
  {
    id: 'person-18',
    name: 'Daniel Park',
    title: 'VP of Global Real Estate',
    company: companies[6],
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    email: 'daniel.park@microsoft.com',
    stats: { contacts: 28, emails: 56, meetings: 19 },
    tags: ['Leadership'],
    lastContact: 'Jan 2026',
    mutualConnections: 6,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 2 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-19',
    name: 'Rachel Green',
    title: 'Facilities Manager',
    company: companies[6],
    avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
    email: 'rachel.green@microsoft.com',
    stats: { contacts: 11, emails: 24, meetings: 6 },
    tags: [],
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 1 },
  },
  // Amazon contacts
  {
    id: 'person-20',
    name: 'Kevin Brown',
    title: 'Senior Director of Logistics',
    company: companies[7],
    avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    email: 'kevin.brown@amazon.com',
    stats: { contacts: 17, emails: 38, meetings: 12 },
    tags: ['Leadership'],
    lastContact: 'Dec 2025',
    mutualConnections: 3,
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 2, phones: 2 },
    isMostRecentlyContacted: true,
  },
  {
    id: 'person-21',
    name: 'Michelle Davis',
    title: 'Real Estate Development Manager',
    company: companies[7],
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    email: 'michelle.davis@amazon.com',
    stats: { contacts: 9, emails: 19, meetings: 5 },
    tags: [],
    lastContact: 'Nov 2025',
    hasZoomInfo: true,
    hasLinkedIn: true,
    contactInfo: { emails: 1, phones: 1 },
  },
];

// Company stats
export const companyStatsData: CompanyStats = {
  localEmployees: 215,
  localEmployeesGrowth: 10,
  globalEmployees: 215,
  globalEmployeesGrowth: 10,
  localJobs: 11,
  localJobsGrowth: 10,
};

// JLL Connections (internal colleagues)
export const jllConnections: Person[] = [
  {
    id: 'jll-1',
    name: 'John Smith',
    title: 'Managing Director',
    company: { id: 'jll', name: 'JLL', badges: [], domain: 'jll.com' },
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'john.smith@jll.com',
    stats: { contacts: 45, emails: 120, meetings: 32 },
    tags: [],
  },
  {
    id: 'jll-2',
    name: 'Jose Martinez',
    title: 'Senior Broker',
    company: { id: 'jll', name: 'JLL', badges: [], domain: 'jll.com' },
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    email: 'jose.martinez@jll.com',
    stats: { contacts: 38, emails: 95, meetings: 28 },
    tags: [],
  },
  {
    id: 'jll-3',
    name: 'Lena Lacroix',
    title: 'Associate Director',
    company: { id: 'jll', name: 'JLL', badges: [], domain: 'jll.com' },
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    email: 'lena.lacroix@jll.com',
    stats: { contacts: 22, emails: 67, meetings: 18 },
    tags: [],
  },
  {
    id: 'jll-4',
    name: 'Marina Ronault',
    title: 'Vice President',
    company: { id: 'jll', name: 'JLL', badges: [], domain: 'jll.com' },
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'marina.ronault@jll.com',
    stats: { contacts: 31, emails: 88, meetings: 24 },
    tags: [],
  },
];

// Signals (news/updates)
export const signals: Signal[] = [
  {
    id: 'signal-1',
    company: companies[5], // Google
    title: 'Google expanding.',
    description: 'Opening new campus in Austin, TX',
    timestamp: '4 hours ago',
    type: 'expansion',
  },
  {
    id: 'signal-2',
    company: companies[6], // Microsoft
    title: 'Microsoft hiring.',
    description: 'Adding 500 roles in cloud division',
    timestamp: '6 hours ago',
    type: 'hiring',
  },
  {
    id: 'signal-3',
    company: companies[0], // Salesforce
    title: 'Salesforce relocating.',
    description: 'Moving HQ to new downtown tower',
    timestamp: '1 day ago',
    type: 'relocation',
  },
  {
    id: 'signal-4',
    company: companies[7], // Amazon
    title: 'Amazon leasing.',
    description: 'Signed 200K SF warehouse in LA',
    timestamp: '1 day ago',
    type: 'lease',
  },
  {
    id: 'signal-5',
    company: companies[3], // Stripe
    title: 'Stripe funding.',
    description: 'Raised $600M Series I round',
    timestamp: '2 days ago',
    type: 'funding',
  },
  {
    id: 'signal-6',
    company: companies[4], // BlackRock
    title: 'BlackRock leadership.',
    description: 'New CEO of Real Assets division',
    timestamp: '3 days ago',
    type: 'leadership',
  },
];

// Company signals (for company profile)
export const companySignals = ['Leadership change', 'Funding', 'Expansion', 'Hiring', 'M&A'];

// Activities/Engagements
export const activities: Activity[] = [
  {
    id: 'activity-1',
    type: 'meeting',
    company: companies[0],
    description: 'Toured 100 Market street with James Wilson and Lisa Martinez',
    date: 'Jan 2nd, 2026',
    location: 'San Francisco',
    participants: [people[1]],
  },
  {
    id: 'activity-2',
    type: 'meeting',
    company: companies[0],
    description: 'Discussed Q1 expansion plans for the Bay Area office portfolio',
    date: 'Dec 28th, 2025',
    location: 'San Francisco',
    participants: [people[1]],
  },
  {
    id: 'activity-3',
    type: 'call',
    company: companies[0],
    description: 'Follow-up call regarding lease renewal options for 555 California St',
    date: 'Dec 20th, 2025',
    location: 'Sacramento',
    participants: [people[1]],
  },
  {
    id: 'activity-4',
    type: 'email',
    company: companies[0],
    description: 'Sent proposal for new office space at Embarcadero Center',
    date: 'Dec 15th, 2025',
    location: 'San Francisco',
    participants: [people[2]],
  },
  {
    id: 'activity-5',
    type: 'meeting',
    company: companies[0],
    description: 'Site visit at 345 Spear Street with the facilities team',
    date: 'Dec 10th, 2025',
    location: 'Los Angeles',
    participants: [people[0], people[1]],
  },
  {
    id: 'activity-6',
    type: 'call',
    company: companies[0],
    description: 'Reviewed tenant improvement allowance terms with legal team',
    date: 'Dec 5th, 2025',
    location: 'San Francisco',
    participants: [people[1]],
  },
  {
    id: 'activity-7',
    type: 'meeting',
    company: companies[0],
    description: 'Met with CFO to discuss 2026 real estate budget allocation',
    date: 'Nov 28th, 2025',
    location: 'San Jose',
    participants: [people[0]],
  },
  {
    id: 'activity-8',
    type: 'email',
    company: companies[0],
    description: 'Shared market comparison report for downtown LA properties',
    date: 'Nov 22nd, 2025',
    location: 'Los Angeles',
    participants: [people[2]],
  },
  {
    id: 'activity-9',
    type: 'meeting',
    company: companies[0],
    description: 'Quarterly business review with executive leadership team',
    date: 'Nov 15th, 2025',
    location: 'San Francisco',
    participants: [people[0], people[1], people[2]],
  },
  {
    id: 'activity-10',
    type: 'call',
    company: companies[0],
    description: 'Discussed subleasing options for excess space in Building A',
    date: 'Nov 10th, 2025',
    location: 'Sacramento',
    participants: [people[1]],
  },
  {
    id: 'activity-11',
    type: 'meeting',
    company: companies[0],
    description: 'Property tour at One California Plaza with facilities director',
    date: 'Nov 5th, 2025',
    location: 'Los Angeles',
    participants: [people[0]],
  },
  {
    id: 'activity-12',
    type: 'email',
    company: companies[0],
    description: 'Sent updated lease terms for 888 Brannan Street',
    date: 'Oct 30th, 2025',
    location: 'San Francisco',
    participants: [people[1]],
  },
  {
    id: 'activity-13',
    type: 'call',
    company: companies[0],
    description: 'Negotiation call for parking allocation at new headquarters',
    date: 'Oct 25th, 2025',
    location: 'San Jose',
    participants: [people[2]],
  },
  {
    id: 'activity-14',
    type: 'meeting',
    company: companies[0],
    description: 'Space planning session for new engineering hub',
    date: 'Oct 20th, 2025',
    location: 'San Francisco',
    participants: [people[0], people[1]],
  },
  {
    id: 'activity-15',
    type: 'email',
    company: companies[0],
    description: 'Shared sustainability assessment for LEED certification',
    date: 'Oct 15th, 2025',
    location: 'San Francisco',
    participants: [people[1]],
  },
  {
    id: 'activity-16',
    type: 'meeting',
    company: companies[0],
    description: 'Walkthrough of renovated floors at 101 Second Street',
    date: 'Oct 10th, 2025',
    location: 'San Francisco',
    participants: [people[0]],
  },
  {
    id: 'activity-17',
    type: 'call',
    company: companies[0],
    description: 'Budget review call for Q4 capital expenditures',
    date: 'Oct 5th, 2025',
    location: 'Sacramento',
    participants: [people[2]],
  },
  {
    id: 'activity-18',
    type: 'meeting',
    company: companies[0],
    description: 'Strategic planning session for West Coast portfolio expansion',
    date: 'Sep 28th, 2025',
    location: 'Los Angeles',
    participants: [people[0], people[1], people[2]],
  },
  {
    id: 'activity-19',
    type: 'email',
    company: companies[0],
    description: 'Sent competitive analysis for downtown Sacramento market',
    date: 'Sep 22nd, 2025',
    location: 'Sacramento',
    participants: [people[1]],
  },
  {
    id: 'activity-20',
    type: 'call',
    company: companies[0],
    description: 'Discussed flex space requirements with HR leadership',
    date: 'Sep 15th, 2025',
    location: 'San Francisco',
    participants: [people[0]],
  },
  {
    id: 'activity-21',
    type: 'meeting',
    company: companies[0],
    description: 'Annual real estate strategy presentation to board',
    date: 'Sep 10th, 2025',
    location: 'San Francisco',
    participants: [people[0], people[1]],
  },
  {
    id: 'activity-22',
    type: 'email',
    company: companies[0],
    description: 'Circulated draft RFP for furniture procurement',
    date: 'Sep 5th, 2025',
    location: 'San Jose',
    participants: [people[2]],
  },
  {
    id: 'activity-23',
    type: 'call',
    company: companies[0],
    description: 'Coordination call with move management team',
    date: 'Aug 30th, 2025',
    location: 'San Francisco',
    participants: [people[1]],
  },
  {
    id: 'activity-24',
    type: 'meeting',
    company: companies[0],
    description: 'Final lease signing ceremony at 200 Mission Street',
    date: 'Aug 25th, 2025',
    location: 'San Francisco',
    participants: [people[0], people[1], people[2]],
  },
  {
    id: 'activity-25',
    type: 'email',
    company: companies[0],
    description: 'Sent welcome package and building access information',
    date: 'Aug 20th, 2025',
    location: 'San Francisco',
    participants: [people[1]],
  },
];

// AI Summary for engagement tab
export const engagementAISummary = `25 touchpoints over 6 months across 4 cities. Key focus areas: Bay Area portfolio expansion, lease renewals at 555 California St, and LEED-certified buildings. Strong relationship with consistent executive engagement.`;

// City filters for engagement
export const engagementCities = ['All', 'San Francisco', 'Los Angeles', 'Sacramento', 'San Jose'];

// Recently visited companies
export const recentlyVisited: Company[] = [
  companies[1], // Northrop Grumman
  companies[2], // Varonis
  companies[3], // Stripe
  companies[4], // BlackRock
];

// Helper functions
export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function getPersonById(id: string): Person | undefined {
  return people.find((p) => p.id === id);
}

export function searchCompanies(query: string): Company[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return companies.filter((c) => c.name.toLowerCase().includes(lowerQuery));
}

export function getCompanyPeople(companyId: string): Person[] {
  return people.filter((p) => p.company.id === companyId);
}

export function getPersonConnections(personId: string): Person[] {
  // Return mock connections (in real app, this would be based on relationship data)
  return people.filter((p) => p.id !== personId).slice(0, 3);
}

// Working Leads (Desktop feature)
export const workingLeads: WorkingLead[] = [
  {
    id: 'lead-1',
    company: companies[0], // Salesforce
    signals: ['Hiring 8 jobs', 'Leadership change 7/18/24'],
    categories: ['HVTs', 'Industrial'],
    lastActivity: '3w',
    isUnread: true,
  },
  {
    id: 'lead-2',
    company: companies[1], // Northrop Grumman
    signals: ['Hiring 8 jobs', 'Leadership change 7/18/24'],
    categories: ['HVTs', 'Industrial'],
    lastActivity: '3w',
    isUnread: false,
  },
  {
    id: 'lead-3',
    company: companies[3], // Stripe
    signals: ['Funding', 'Expansion'],
    categories: ['Tech', 'Growth'],
    lastActivity: '1w',
    isUnread: true,
  },
  {
    id: 'lead-4',
    company: companies[4], // BlackRock
    signals: ['Leadership change'],
    categories: ['Finance', 'Enterprise'],
    lastActivity: '2w',
    isUnread: false,
  },
  {
    id: 'lead-5',
    company: companies[5], // Google
    signals: ['Expansion', 'Hiring 12 jobs'],
    categories: ['Tech', 'HVTs'],
    lastActivity: '5d',
    isUnread: true,
  },
];

// Warm Introductions (Desktop feature)
export const warmIntroductions: Record<string, WarmIntroduction> = {
  'company-1': {
    summary: 'Several relationships exist at the leadership level, supported by direct meetings and recent communication. These connections may be particularly relevant for strategic or time-sensitive outreach.',
    contacts: [people[0], people[3]], // Jayant Sai, Michael Chen
  },
  'company-2': {
    summary: 'Strong existing relationships through multiple touchpoints. The VP of Facilities has been engaged recently with positive signals.',
    contacts: [people[5], people[6]], // David Brooks, Amanda Torres
  },
  'company-3': {
    summary: 'The CFO has shown interest in real estate discussions. Recent engagement suggests timing may be favorable.',
    contacts: [people[8]], // Emily Watson
  },
};

// Leadership contacts for a company
export function getLeadershipContacts(companyId: string): Person[] {
  return people.filter(p => p.company.id === companyId && p.tags.includes('Leadership'));
}

// Get warm introduction for a company
export function getWarmIntroduction(companyId: string): WarmIntroduction | undefined {
  return warmIntroductions[companyId];
}

// Client Profiles
export const clientProfiles: Record<string, ClientProfile> = {
  'company-1': { // Salesforce
    clientType: 'Portfolio Client',
    accountLead: {
      id: 'jll-lead-1',
      name: 'Maria Joyce',
      title: 'JLL Account Lead',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
    location: 'New York City',
    activeServices: ['Transaction Management', 'Consulting'],
    availableServices: ['JLL Technologies', 'Lease Admin', 'Integrated Facilities Management', 'Project Management', 'Workplace Services'],
  },
  'company-2': { // Northrop Grumman
    clientType: 'Strategic Account',
    accountLead: {
      id: 'jll-lead-2',
      name: 'Robert Chen',
      title: 'JLL Account Director',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    location: 'Los Angeles',
    activeServices: ['Transaction Management', 'Project Management', 'Integrated Facilities Management'],
    availableServices: ['Consulting', 'JLL Technologies', 'Lease Admin', 'Workplace Services', 'Capital Markets'],
  },
  'company-3': { // Varonis
    clientType: 'Active Client',
    accountLead: {
      id: 'jll-lead-3',
      name: 'Sarah Thompson',
      title: 'JLL Senior Broker',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    location: 'San Francisco',
    activeServices: ['Transaction Management'],
    availableServices: ['Consulting', 'JLL Technologies', 'Lease Admin', 'Integrated Facilities Management', 'Project Management', 'Workplace Services'],
  },
  'company-4': { // Stripe
    clientType: 'Prospect',
    location: 'San Francisco',
    activeServices: [],
    availableServices: ['Transaction Management', 'Consulting', 'JLL Technologies', 'Lease Admin', 'Integrated Facilities Management', 'Project Management', 'Workplace Services', 'Capital Markets'],
  },
  'company-5': { // BlackRock
    clientType: 'Portfolio Client',
    accountLead: {
      id: 'jll-lead-4',
      name: 'David Williams',
      title: 'JLL Managing Director',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    location: 'New York City',
    activeServices: ['Transaction Management', 'Capital Markets', 'Consulting', 'Project Management'],
    availableServices: ['JLL Technologies', 'Lease Admin', 'Integrated Facilities Management', 'Workplace Services'],
  },
  'company-6': { // Google
    clientType: 'Strategic Account',
    accountLead: {
      id: 'jll-lead-5',
      name: 'Jennifer Lee',
      title: 'JLL Account Executive',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    location: 'Mountain View',
    activeServices: ['Transaction Management', 'Consulting', 'Integrated Facilities Management', 'Workplace Services'],
    availableServices: ['JLL Technologies', 'Lease Admin', 'Project Management', 'Capital Markets'],
  },
  'company-7': { // Microsoft
    clientType: 'Portfolio Client',
    accountLead: {
      id: 'jll-lead-6',
      name: 'Michael Rodriguez',
      title: 'JLL Global Account Lead',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
    location: 'Seattle',
    activeServices: ['Transaction Management', 'Consulting', 'JLL Technologies', 'Integrated Facilities Management', 'Project Management'],
    availableServices: ['Lease Admin', 'Workplace Services', 'Capital Markets'],
  },
  'company-8': { // Amazon
    clientType: 'Strategic Account',
    accountLead: {
      id: 'jll-lead-7',
      name: 'Emily Davis',
      title: 'JLL Account Director',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    location: 'Seattle',
    activeServices: ['Transaction Management', 'Lease Admin', 'Integrated Facilities Management'],
    availableServices: ['Consulting', 'JLL Technologies', 'Project Management', 'Workplace Services', 'Capital Markets'],
  },
};

// Get client profile for a company
export function getClientProfile(companyId: string): ClientProfile | undefined {
  return clientProfiles[companyId];
}

