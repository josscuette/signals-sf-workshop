# Signals App - Project Context

## Overview

**Signals** is a mobile-first commercial real estate CRM app for JLL brokers. It provides company and relationship intelligence, helping brokers manage prospects and clients while enabling warm introductions through JLL's network.

## Target Users

- **Primary**: JLL Brokers (internal users)
- **Use case**: Access company/relationship info on-the-go, track client interactions, request warm introductions

## Core Features

### 1. Home Screen
- Search bar to find companies
- Feed of "Signals updates" (business news, company events)
- Quick access to recent activity

### 2. Search
- Search companies by name
- View recently visited companies
- Quick actions: Add Activity, Opportunities, New Company
- Create activity modal with form

### 3. Company Profile
- Company header with badges (IPS, Client)
- Follow functionality
- Tabbed navigation:
  - **Overview**: Signals (Leadership change, Funding), JLL connections, Engagement activity
  - **Engagement**: Activity list with city filters
  - **Communication**: (future)
  - **People**: List of connected contacts
  - **Leases**: (future)

### 4. Person Detail
- Contact profile with title and company
- Stats: Contacts, Emails, Meetings
- Connected colleagues list
- "Request warm introduction" CTA

### 5. Navigation
- Bottom nav: Home, Search, Add (+), Following, Profile

---

## Data Models

### Company
```typescript
{
  id: string;
  name: string;
  logo?: string;
  badges: ('IPS' | 'Client')[];
  domain?: string;
}
```

### Person
```typescript
{
  id: string;
  name: string;
  title: string;
  company: Company;
  avatar?: string;
  stats: { contacts: number; emails: number; meetings: number };
  tags: string[];
}
```

### Signal
```typescript
{
  id: string;
  company: Company;
  title: string;
  description: string;
  timestamp: string;
  type: 'hiring' | 'funding' | 'leadership' | 'expansion' | 'other';
}
```

### Activity
```typescript
{
  id: string;
  type: 'meeting' | 'call' | 'email' | 'note';
  company: Company;
  description: string;
  date: string;
  location?: string;
  participants?: Person[];
}
```

---

## Design Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-07 | Use Alizé UI exclusively | Compliance with JLL design system |
| 2026-01-07 | Mobile-first (375px) | Business requirement, desktop later |
| 2026-01-07 | Static mock data | MVP approach, no backend needed |
| 2026-01-07 | Next.js App Router | Already set up in project |

---

## Screen Inventory

| Screen | Route | Status |
|--------|-------|--------|
| Home | `/(mobile)` | Pending |
| Search | `/(mobile)/search` | Pending |
| Company Profile | `/(mobile)/company/[id]` | Pending |
| Person Detail | `/(mobile)/person/[id]` | Pending |

---

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: @jllt/alize-ui (v0.2.0)
- **Styling**: Tailwind CSS (via Alizé)
- **Icons**: Material Symbols (via Alizé)
- **Language**: TypeScript

---

## Notes

- All components must come from Alizé UI
- No custom styling without approval
- Desktop breakpoints will be added in Phase 2



