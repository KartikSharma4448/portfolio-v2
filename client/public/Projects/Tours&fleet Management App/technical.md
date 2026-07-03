# Technical Documentation — Rajasthali Traveling System

> Complete technical reference covering architecture, features, workflows, data models, and deployment for the full Rajasthali Tours ecosystem.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Repository Structure](#4-repository-structure)
5. [Features](#5-features)
6. [Complete Workflow](#6-complete-workflow)
7. [Database Schema](#7-database-schema)
8. [Authentication System](#8-authentication-system)
9. [Live Tracking System](#9-live-tracking-system)
10. [Smart Automation Engine](#10-smart-automation-engine)
11. [State Management — Flutter](#11-state-management--flutter)
12. [Navigation & Routing](#12-navigation--routing)
13. [API Integrations](#13-api-integrations)
14. [Security & RLS Policies](#14-security--rls-policies)
15. [Environment Variables](#15-environment-variables)
16. [Build & Deployment](#16-build--deployment)
17. [Performance Optimizations](#17-performance-optimizations)

---

## 1. Project Overview

Rajasthali Traveling System is a **complete end-to-end travel management ecosystem** purpose-built for Rajasthali Tours, Rajasthan. It consists of four independent applications sharing a single Supabase backend:

| App | Technology | Audience |
|-----|-----------|----------|
| Flutter Android App | Flutter 3.7 + Dart | Drivers & Clients |
| Next.js Admin Panel | Next.js 16 + TypeScript | Owners & Managers |
| Express Landing Page | Express 5 + EJS | Public visitors |
| Supabase Backend | PostgreSQL + Auth + Realtime | All apps |

**Monthly infrastructure cost: ₹0** — all services operate within free tiers.

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                   RAJASTHALI TRAVELING SYSTEM                        │
├─────────────────┬──────────────────┬────────────────┬───────────────┤
│ 📱 Flutter App  │ 🖥️ Admin Panel   │ 🌐 Landing Page │ ☁️ Supabase  │
│ Android         │ Next.js 16       │ Express + EJS   │ PostgreSQL    │
├─────────────────┼──────────────────┼────────────────┼───────────────┤
│ Driver Panel    │ Dashboard        │ Tour Packages   │ Auth          │
│ Client Panel    │ CRUD Management  │ Destinations    │ Realtime      │
│ Live GPS        │ Fleet Tracking   │ Fleet Showcase  │ Storage       │
│ Smart Features  │ HR & Payroll     │ SEO Pages       │ RLS Security  │
│ Road Navigation │ Analytics        │ Contact Forms   │ Edge Functions│
└─────────────────┴──────────────────┴────────────────┴───────────────┘
```

### Communication Patterns

| Source → Destination | Protocol | Use Case |
|---------------------|----------|----------|
| Flutter App → Supabase | REST (PostgREST) | CRUD operations |
| Flutter App ↔ Supabase | Realtime WebSocket | Live GPS location stream |
| Flutter App → OSRM | HTTP GET | Road route calculation |
| Flutter App → Firebase | FCM SDK | Push notification token registration |
| Admin Panel → Supabase | REST + Service Role Key | Admin user creation, all CRUD |
| Admin Panel ↔ Supabase | Realtime WebSocket | Live fleet tracking map |
| Public `/track/[token]` | REST + Realtime | Shareable live location page (no auth) |

### Role-Based Access Control

```
┌──────────────────────────────────────────────────────────────┐
│                          ROLES                               │
├──────────┬──────────┬────────────────┬────────────────────── ┤
│  Owner   │ Manager  │    Driver      │       Client          │
├──────────┼──────────┼────────────────┼───────────────────────┤
│ Web ✓    │ Web ✓    │ App ✓          │ App ✓                 │
│ App ✗    │ App ✗    │ Web ✗          │ Web ✗                 │
│ Full CRUD│ Full CRUD│ Read own tours │ Read assigned tours   │
│ Create   │ Create   │ Update location│ Request extra tours   │
│ users    │ users    │ Mark checklist │ Share own location    │
│          │          │ Share location │ View driver location  │
└──────────┴──────────┴────────────────┴───────────────────────┘
```

---

## 3. Tech Stack

### Flutter App (`RajasthaliApp/`)

| Category | Library | Version | Purpose |
|----------|---------|---------|---------|
| Framework | Flutter + Dart | 3.7+ | Cross-platform Android UI |
| State | flutter_riverpod | 2.6.1 | Reactive state management |
| Navigation | go_router | 14.8.1 | Declarative routing with auth guards |
| Backend | supabase_flutter | 2.8.4 | Auth + DB + Realtime + Storage |
| Maps | flutter_map + latlong2 | 7.0.2 / 0.9.1 | OpenStreetMap rendering |
| GPS | geolocator | 13.0.2 | Background location service |
| Permissions | permission_handler | 11.3.1 | Runtime permission requests |
| Push | firebase_messaging | 15.2.5 | FCM push notifications |
| Local notifications | flutter_local_notifications | 18.0.1 | Foreground service notification |
| Charts | fl_chart | 0.70.2 | Speed gauge, data visualization |
| HTTP | http | 1.2.0 | OSRM routing API calls |
| Fonts | google_fonts | 6.2.1 | Inter typeface |
| Images | cached_network_image | 3.4.1 | Disk + memory image caching |
| Code gen | freezed + json_serializable | 2.5.7 / 6.9.5 | Immutable models, JSON serialization |
| Env | flutter_dotenv | 5.2.1 | .env file loading |
| Utilities | intl, url_launcher, share_plus, image_picker, shared_preferences, connectivity_plus | various | Dates, deep links, sharing, offline |

### Admin Panel (`rajasthali-admin/`)

| Category | Library | Version | Purpose |
|----------|---------|---------|---------|
| Framework | Next.js | 16.2.9 | App Router, Server Components, SSR |
| UI | React | 19.2.4 | Component rendering |
| Language | TypeScript | 5.x | Type-safe development |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Backend | @supabase/supabase-js + @supabase/ssr | 2.108.2 / 0.12.0 | Auth + DB, SSR cookie management |
| Maps | Leaflet + react-leaflet | 1.9.4 / 5.0.0 | Fleet tracking map |
| Charts | Recharts | 3.8.1 | Analytics dashboards |
| Forms | React Hook Form + Zod | 7.80.0 / 4.4.3 | Form state + schema validation |
| Icons | Lucide React | 1.21.0 | Icon library |
| Dates | date-fns | 4.4.0 | Date formatting + calculation |
| Helpers | clsx, tailwind-merge | 2.1.1 / 3.6.0 | Conditional class names |

### Landing Page (`rajasthalitourslandingpage/`)

| Category | Library | Version | Purpose |
|----------|---------|---------|---------|
| Server | Express | 5.2.1 | HTTP server + routing |
| Templates | EJS | 6.0.1 | Server-side HTML rendering |
| Images | sharp | 0.34.5 | Build-time image optimization |

### Backend (Supabase — shared)

| Service | Purpose |
|---------|---------|
| PostgreSQL | Primary relational database (18 tables) |
| Auth | Email/password auth (phone-to-email conversion) |
| Realtime | WebSocket broadcast for live GPS locations |
| Storage | Profile photos, documents (`avatars`, `documents`, `logos` buckets) |
| Row Level Security | Per-table access control policies |
| Edge Functions | User creation, push notifications, analytics aggregation |

---

## 4. Repository Structure

```
TravelSystem/                                    ← Monorepo root
│
├── 📱 RajasthaliApp/                            ← Flutter Android App
│   ├── lib/
│   │   ├── main.dart                            ← App entry, Firebase init, Riverpod scope
│   │   ├── app/
│   │   │   ├── router.dart                      ← GoRouter with role-based redirect guards
│   │   │   ├── theme.dart                       ← Pink (#E91E8C) Apple-inspired design tokens
│   │   │   ├── constants.dart                   ← Table names, roles, phone→email helper
│   │   │   └── localization.dart                ← Hindi / English toggle
│   │   ├── core/
│   │   │   ├── auth/
│   │   │   │   ├── auth_service.dart            ← Supabase auth wrapper + profile loading
│   │   │   │   └── auth_providers.dart          ← Riverpod auth providers
│   │   │   ├── network/
│   │   │   │   └── supabase_client.dart         ← Singleton Supabase client
│   │   │   ├── location/
│   │   │   │   └── location_service.dart        ← Background GPS + battery saver modes
│   │   │   ├── repositories/
│   │   │   │   ├── tour_repository.dart         ← Tour CRUD data access
│   │   │   │   └── tour_providers.dart          ← Riverpod providers for tours
│   │   │   ├── services/
│   │   │   │   ├── tour_auto_start_service.dart ← 30s timer, auto start/complete tours
│   │   │   │   └── smart_features_service.dart  ← Speed monitor, SOS, weather
│   │   │   └── widgets/
│   │   │       ├── skeleton_loader.dart         ← Shimmer loading skeletons
│   │   │       ├── error_retry_widget.dart      ← Error + retry UI
│   │   │       └── smart_widgets.dart           ← Speedometer, battery indicator
│   │   └── features/
│   │       ├── login/screens/                   ← Login screen (phone + password)
│   │       ├── splash/                          ← Splash + auth redirect
│   │       ├── driver/screens/                  ← Driver home, tours, detail, profile, notifications
│   │       ├── client/screens/                  ← Client home, tours, detail, profile, requests
│   │       └── tracking/screens/                ← Shared live map page (driver & client)
│   ├── android/                                 ← Android native, foreground service config
│   ├── assets/images/                           ← Logo, app images
│   ├── pubspec.yaml                             ← Flutter dependencies
│   └── .env                                     ← SUPABASE_URL + SUPABASE_ANON_KEY
│
├── 🖥️ rajasthali-admin/                        ← Next.js 16 Admin Panel
│   ├── src/
│   │   ├── app/
│   │   │   ├── (dashboard)/                     ← Protected route group
│   │   │   │   ├── layout.tsx                   ← Sidebar + auth wrapper
│   │   │   │   ├── dashboard/page.tsx           ← KPI dashboard
│   │   │   │   ├── employees/                   ← List, detail [id], new
│   │   │   │   ├── clients/                     ← List, detail [id], new
│   │   │   │   ├── vehicles/                    ← List, detail [id], new
│   │   │   │   ├── tours/                       ← List, detail [id], new
│   │   │   │   ├── attendance/page.tsx
│   │   │   │   ├── salaries/page.tsx
│   │   │   │   ├── leaves/page.tsx
│   │   │   │   ├── tracking/                    ← Leaflet live tracking map
│   │   │   │   ├── analytics/page.tsx           ← Recharts income/expense
│   │   │   │   ├── notifications/page.tsx
│   │   │   │   └── reports/page.tsx
│   │   │   ├── login/page.tsx                   ← Phone/password login
│   │   │   ├── track/[token]/page.tsx           ← Public shareable tracking page
│   │   │   └── actions/user.ts                  ← Server action: createAuthUserAction()
│   │   ├── lib/
│   │   │   ├── supabase-server.ts               ← SSR client (cookie-based sessions)
│   │   │   └── supabase-browser.ts              ← Client-side singleton
│   │   ├── types/database.ts                    ← All TypeScript interfaces mirroring DB schema
│   │   └── middleware.ts                        ← Session refresh + route protection
│   └── public/                                  ← logo.png, icons
│
├── 🌐 rajasthalitourslandingpage/              ← Express + EJS Landing Website
│   ├── views/                                   ← EJS page templates
│   ├── public/                                  ← CSS, JS, images
│   ├── data/                                    ← Tour packages, destinations JSON
│   └── server.js                                ← Express entry, all routes
│
├── 📄 Resource/
│   ├── supabase_schema.sql                      ← Complete DB schema (run in Supabase SQL editor)
│   ├── supabase_rls.sql                         ← All RLS policies
│   ├── supabase_storage.sql                     ← Storage bucket configuration
│   └── Rajasthali_Master_Project_Specification.md
│
├── RajasthaliApp-release.apk                    ← Latest production APK
├── implementation.md                            ← Original phased build plan
└── README.md                                    ← Monorepo overview
```

---

## 5. Features

### Flutter App — Driver Panel

| Feature | Description |
|---------|-------------|
| Phone Auth | Phone → email conversion, auto-route to driver panel |
| Smart Dashboard | Time-based greeting, live speedometer widget, quick action grid |
| My Tours | Upcoming / In-Progress / Completed tabs with pull-to-refresh |
| Tour Detail | Client info card, stops timeline, hotel info, checklist |
| Tour Checklist | Mark preparation items complete with timestamp |
| Live Speedometer | Real-time GPS speed in km/h, color-coded (green/yellow/red) |
| Overspeed Alert | Warning banner and alert at >80 km/h |
| Client Location | View assigned client's live location on flutter_map |
| Road Navigation | OSRM driving route with distance and ETA |
| Share Location | Generate public tracking link (no app required for viewer) |
| SOS Emergency | One-tap call to Police (100), Ambulance (108), Road Help (1033) + admin alert |
| Battery Saver GPS | Auto-reduces to 30s interval when stationary for >60 seconds |
| Auto Tour Start | Tour automatically moves to `in_progress` at scheduled start time |
| Auto Tour Complete | Tour automatically moves to `completed` when end date passes |
| Notifications | Push notification center with FCM integration |
| Profile | View/update profile photo, name, contact info |
| Hindi/English Toggle | Full bilingual UI support |

### Flutter App — Client Panel

| Feature | Description |
|---------|-------------|
| Phone Auth | Phone → email conversion, auto-route to client panel |
| My Tours | Active and past tour listings |
| Tour Detail | Full itinerary with stops, dates, hotels, notes |
| Driver Info | Driver name, phone, photo; vehicle plate, model, color |
| Driver Location | View assigned driver's live location on flutter_map |
| Share Own Location | Share client's GPS location for driver to track |
| Request Extra Tour | Submit additional trip request with preferred dates and places |
| Notifications | Push notification center |
| Profile | View profile, contact info |

### Admin Panel

| Feature | Description |
|---------|-------------|
| Dashboard | KPI cards: active tours, fleet, employees, net profit; recent tours table |
| Employee CRUD | Create with Supabase Auth user, role assignment, salary, photo; toggle active/inactive |
| Client CRUD | Create with Supabase Auth user, city, notes; toggle active/inactive |
| Fleet CRUD | Add vehicles, assign driver, track insurance/fitness/permit expiry dates |
| Tour Management | Multi-step creation: driver → vehicle → clients → stops map → checklist → pricing |
| Tour Detail | Stops map (Leaflet), checklist manager, status updater, client list |
| Live Tracking | All active drivers and clients on Leaflet map with Realtime updates |
| Attendance | Per-employee daily marking (present / absent / leave); absence-based model |
| Salary & Payroll | Monthly records: base salary, absent deductions, bonus, net pay, mark as paid |
| Leave Requests | Approve / reject workflow with admin notes |
| Analytics | Income, expense, profit charts via Recharts; monthly breakdowns |
| Notifications | Compose and send push notifications to employees/clients |
| Reports | Export placeholder (planned: CSV/PDF) |
| Public Track Link | `/track/[token]` — shareable live location page with no login required |

### Landing Website

| Feature | Description |
|---------|-------------|
| Tour Packages | Browsable packages with pricing and descriptions |
| Fleet Showcase | Vehicle photos and specifications |
| Rajasthan Destinations | City guides and attraction information |
| Services | Taxi routes (Jaipur↔Agra, Jaipur↔Udaipur, etc.), luxury rentals, wedding cars |
| Certifications | IATA, TripAdvisor, Ministry of Tourism badges |
| SEO | Sitemap.xml, robots.txt, meta tags, structured data |

---

## 6. Complete Workflow

This section describes the end-to-end operational flow of the system from account creation through tour completion.

### 6.1 Account Creation

```
Admin (Web Panel)
    │
    ├── Opens /employees/new or /clients/new
    ├── Fills form: name, phone, password, role
    │
    └── Submits → createAuthUserAction() [Server Action]
            │
            ├── Uses SUPABASE_SERVICE_ROLE_KEY (server-only)
            ├── Converts phone → email: 9876543210@rajasthali.app
            ├── Calls supabaseAdmin.auth.admin.createUser()
            │       (email_confirm: true — no email verification needed)
            ├── Receives new auth user UUID
            └── Inserts record into employees / clients table
                    with user_id = new UUID

Admin shares phone + password with the new user manually.
```

### 6.2 User Login — Flutter App

```
User opens RajasthaliApp
    │
    ├── SplashScreen checks authService.isAuthenticated
    │       ├── Authenticated → load profile → route to /driver or /client
    │       └── Not authenticated → route to /login
    │
    └── LoginScreen
            ├── User enters 10-digit phone + password
            ├── phoneToEmail("9876543210") → "9876543210@rajasthali.app"
            ├── supabase.auth.signInWithPassword(email, password)
            │
            ├── On success: _loadProfile()
            │       ├── Query employees WHERE user_id = auth.uid()
            │       │       → found: set role (driver/owner/manager/accountant)
            │       └── If not found: query clients WHERE user_id = auth.uid()
            │               → found: set role = 'client'
            │
            └── GoRouter redirect:
                    ├── isDriver → navigate to /driver
                    └── isClient → navigate to /client
```

### 6.3 User Login — Admin Panel

```
Admin opens /login
    │
    ├── Enters phone + password
    ├── Converts phone → email
    ├── supabase.auth.signInWithPassword()
    │
    ├── Fetches employees record → verify role IN ('owner', 'manager')
    ├── Verify is_active = true
    │       ├── Wrong role → signOut() + error: "Admin portal only for Owners and Managers"
    │       └── Inactive → signOut() + error: "Account deactivated"
    │
    └── Success → router.push('/dashboard')

Middleware (runs on every request):
    ├── Refresh Supabase session from cookies
    ├── If no user + dashboard route → redirect to /login
    ├── If user + /login → redirect to /dashboard
    └── /track/* routes → always public, no redirect
```

### 6.4 Tour Lifecycle

```
1. DRAFT — Admin creates tour
   ├── Selects driver (from active employees with role='driver')
   ├── Selects vehicle (from available fleet)
   ├── Adds clients (from clients table)
   ├── Adds stops: place name, lat/lng, dates, hotel info, sort_order
   ├── Sets price and investment
   └── Tour status = 'draft'

2. ASSIGNED — Admin assigns resources
   └── Tour status = 'assigned' (driver + vehicle set)

3. IN_PROGRESS — Tour begins
   ├── Manual: Admin or driver triggers start
   └── Automatic (TourAutoStartService — runs every 30s on driver's device):
           IF start_date < today → start
           IF start_date = today AND start_time ≤ now → start
           IF start_date = today AND no start_time → start

4. COMPLETED — Tour ends
   ├── Manual: Admin or driver triggers complete
   └── Automatic (same 30s cycle):
           IF end_date < today → complete

5. CANCELLED — Admin can cancel from any state
```

### 6.5 Live GPS Tracking Workflow

```
Driver / Client Device (Flutter)
    │
    ├── User enables location sharing
    ├── LocationService starts Android foreground service
    │       (persistent notification: "Live Tracking Active")
    │
    └── Every 10 seconds:
            geolocator.getPositionStream() → position
            │
            └── supabase.from('live_locations').upsert({
                    user_id, lat, lng, heading, speed, accuracy,
                    is_active: true, updated_at: now()
                }, onConflict: 'user_id')

Admin Panel / Viewer (Web)
    │
    └── Supabase Realtime subscription on live_locations:
            supabase.channel('tracking').on('postgres_changes', ...)
            │
            └── Update Leaflet marker position on map in real-time

Flutter Viewer (Driver watching Client / Client watching Driver)
    │
    └── StreamProvider for liveLocationStreamProvider:
            supabase.from('live_locations')
                .stream(primaryKey: ['id'])
                .eq('user_id', targetUserId)
            │
            └── Animate flutter_map marker to new coordinates
```

### 6.6 Public Shareable Tracking

```
Driver clicks "Share Location"
    │
    ├── Admin Panel generates shared_tracking_links record:
    │       token = random 12-char string
    │       expires_at = now() + N hours
    │       user_id = driver's auth user id
    │
    └── Shareable URL: https://rajasthali-admin.vercel.app/track/{token}

Anyone opens URL (no login required)
    │
    ├── /track/[token]/page.tsx looks up token in shared_tracking_links
    ├── Verifies is_active = true AND expires_at > now()
    ├── Gets user_id from token record
    └── Opens Realtime subscription on live_locations for that user_id
            → Shows live position on Leaflet map
```

### 6.7 Salary Workflow

```
Month End → Admin opens /salaries
    │
    ├── Selects month + year
    ├── System queries attendance for each employee
    │       → counts absent days in selected month
    │
    ├── Auto-calculates:
    │       daily_rate = base_salary / working_days_in_month
    │       deductions = absent_days × daily_rate
    │       net_salary = base_salary - deductions + bonus
    │
    ├── Admin reviews, adjusts bonus if needed
    └── Marks as paid → salary_records.is_paid = true, paid_at = now()
```

### 6.8 Leave Request Workflow

```
Driver (Flutter App) — not yet implemented in app UI
                    ← Leave requests currently created by admin on behalf

Admin opens /leaves
    │
    ├── Views pending leave_requests
    ├── Reviews dates, reason, employee details
    └── Clicks Approve or Reject
            ├── approved_by = admin's auth.uid()
            ├── approved_at = now()
            ├── status = 'approved' | 'rejected'
            └── admin_note = optional message
```

### 6.9 Notification Flow

```
Admin Panel → /notifications
    │
    ├── Composes title + body + selects recipients
    └── Inserts into notifications table:
            { user_id, title, body, type, data_json, is_read: false }

Supabase Realtime (notifications table is Realtime-enabled)
    │
    └── Flutter App receives stream update
            ├── Displays in-app notification badge
            └── Shows in notification center screen

FCM Push (Firebase Cloud Messaging — for background notifications)
    │
    ├── App registers FCM token on login → saved in fcm_tokens table
    ├── Edge Function (send-notification) fetches tokens for target users
    └── Sends FCM payload via Firebase Admin SDK
```

---

## 7. Database Schema

### Enums

```sql
employee_role:      owner | manager | driver | accountant
tour_status:        draft | assigned | in_progress | completed | cancelled
attendance_status:  present | absent | leave
leave_status:       pending | approved | rejected
vehicle_status:     available | assigned | maintenance | retired
extra_request_status: pending | approved | rejected | completed
```

### Core Tables

```sql
-- All staff members
employees (
  id UUID PK,
  user_id UUID → auth.users (nullable),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  role employee_role DEFAULT 'driver',
  photo_url TEXT,
  address TEXT,
  base_salary NUMERIC(12,2) DEFAULT 0,
  join_date DATE DEFAULT CURRENT_DATE,
  emergency_contact TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at / updated_at TIMESTAMPTZ
)
-- Indexes: user_id, role, phone, is_active

-- Tour passengers
clients (
  id UUID PK,
  user_id UUID → auth.users (nullable),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  photo_url TEXT,
  address TEXT,
  city TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at / updated_at TIMESTAMPTZ
)
-- Indexes: user_id, phone, is_active

-- Fleet
vehicles (
  id UUID PK,
  number_plate TEXT UNIQUE NOT NULL,
  model TEXT NOT NULL,
  vehicle_type TEXT DEFAULT 'sedan',
  capacity INTEGER DEFAULT 4,
  color TEXT,
  assigned_driver_id UUID → employees,
  insurance_expiry DATE,
  fitness_expiry DATE,
  permit_expiry DATE,
  status vehicle_status DEFAULT 'available',
  photo_url TEXT,
  notes TEXT,
  created_at / updated_at TIMESTAMPTZ
)
-- Indexes: assigned_driver_id, status, number_plate

-- Tour bookings
tours (
  id UUID PK,
  tour_no TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  driver_id UUID → employees,
  vehicle_id UUID → vehicles,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  pickup_location TEXT,
  dropoff_location TEXT,
  price NUMERIC(12,2) DEFAULT 0,
  investment NUMERIC(12,2) DEFAULT 0,
  status tour_status DEFAULT 'draft',
  notes TEXT,
  created_by UUID → auth.users,
  created_at / updated_at TIMESTAMPTZ
)
-- Indexes: driver_id, vehicle_id, status, start_date, tour_no

-- Many-to-many: tours ↔ clients
tour_clients (
  id UUID PK,
  tour_id UUID → tours ON DELETE CASCADE,
  client_id UUID → clients ON DELETE CASCADE,
  UNIQUE(tour_id, client_id)
)

-- Tour itinerary stops
tour_stops (
  id UUID PK,
  tour_id UUID → tours ON DELETE CASCADE,
  place_name TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  arrival_date DATE,
  departure_date DATE,
  arrival_time TIME,
  hotel_name TEXT,
  hotel_address TEXT,
  day_info TEXT,
  sort_order INTEGER DEFAULT 0
)

-- Driver preparation checklist
tour_checklist (
  id UUID PK,
  tour_id UUID → tours ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  completed_by UUID → auth.users,
  sort_order INTEGER DEFAULT 0
)
```

### HR Tables

```sql
-- Daily attendance (absence-based — only non-present days stored)
attendance (
  id UUID PK,
  employee_id UUID → employees ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status DEFAULT 'present',
  note TEXT,
  marked_by UUID → auth.users,
  UNIQUE(employee_id, date)
)
-- Indexes: employee_id, date, (employee_id, date)

-- Monthly salary records
salary_records (
  id UUID PK,
  employee_id UUID → employees,
  month INTEGER CHECK (1-12),
  year INTEGER CHECK (>=2020),
  base_salary NUMERIC(12,2) DEFAULT 0,
  absent_days INTEGER DEFAULT 0,
  deductions NUMERIC(12,2) DEFAULT 0,
  bonus NUMERIC(12,2) DEFAULT 0,
  net_salary NUMERIC(12,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  paid_at TIMESTAMPTZ,
  paid_by UUID → auth.users,
  notes TEXT,
  UNIQUE(employee_id, month, year)
)

-- Leave requests
leave_requests (
  id UUID PK,
  employee_id UUID → employees,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status leave_status DEFAULT 'pending',
  approved_by UUID → auth.users,
  approved_at TIMESTAMPTZ,
  admin_note TEXT,
  created_at / updated_at TIMESTAMPTZ
)
```

### Tracking & System Tables

```sql
-- Real-time GPS (upserted every 10s; unique per user)
live_locations (
  id UUID PK,
  user_id UUID UNIQUE → auth.users ON DELETE CASCADE,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  heading DOUBLE PRECISION DEFAULT 0,
  speed DOUBLE PRECISION DEFAULT 0,
  accuracy DOUBLE PRECISION DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ
)
-- Realtime: ALTER PUBLICATION supabase_realtime ADD TABLE live_locations

-- Public shareable tracking links
shared_tracking_links (
  id UUID PK,
  user_id UUID → auth.users,
  token VARCHAR(12) UNIQUE NOT NULL,
  tour_id UUID → tours,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ NOT NULL
)

-- In-app + push notification log
notifications (
  id UUID PK,
  user_id UUID → auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT DEFAULT 'general',
  data_json JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)
-- Realtime: ALTER PUBLICATION supabase_realtime ADD TABLE notifications

-- Revenue tracking
income_records (
  id UUID PK, tour_id UUID → tours,
  amount NUMERIC(12,2), description TEXT,
  category TEXT DEFAULT 'tour_payment', date DATE
)

-- Cost tracking
expense_records (
  id UUID PK, tour_id UUID → tours,
  amount NUMERIC(12,2), description TEXT,
  category TEXT DEFAULT 'fuel', date DATE
)

-- Client-initiated extra trip requests
extra_tour_requests (
  id UUID PK,
  client_id UUID → clients ON DELETE CASCADE,
  tour_id UUID → tours,
  description TEXT NOT NULL,
  preferred_start_date DATE, preferred_end_date DATE,
  places TEXT,
  status extra_request_status DEFAULT 'pending',
  admin_note TEXT, reviewed_by UUID → auth.users
)

-- Firebase device tokens for push notifications
fcm_tokens (
  id UUID PK,
  user_id UUID → auth.users ON DELETE CASCADE,
  token TEXT NOT NULL,
  device_info TEXT,
  UNIQUE(user_id, token)
)
```

### Views

| View | Purpose |
|------|---------|
| `active_drivers` | Employees with role=driver joined with their assigned vehicle |
| `tour_summary` | Tours with driver info, vehicle, client count, profit = price - investment |
| `monthly_analytics` | UNION of income + expense aggregated by month |

### Helper Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `get_user_role(uid)` | employee_role | Role from employees table |
| `is_admin(uid)` | boolean | True if owner or manager and is_active |
| `is_driver(uid)` | boolean | True if driver and is_active |
| `get_client_id(uid)` | UUID | Client record id for auth user |
| `get_employee_id(uid)` | UUID | Employee record id for auth user |

All functions use `SECURITY DEFINER` to run as the function owner, bypassing RLS for these lookups.

### Entity Relationships

```
employees ──────────────────────────→ tours (driver_id)
vehicles  ──────────────────────────→ tours (vehicle_id)
clients ←──── tour_clients ─────────→ tours
tours   ──────────────────────────→ tour_stops
        ──────────────────────────→ tour_checklist
employees ──────────────────────────→ attendance
          ──────────────────────────→ salary_records
          ──────────────────────────→ leave_requests
auth.users ─────────────────────────→ live_locations
           ─────────────────────────→ notifications
           ─────────────────────────→ shared_tracking_links
           ─────────────────────────→ fcm_tokens
```

---

## 8. Authentication System

### Phone-to-Email Conversion

Supabase phone OTP auth requires SMS costs. Instead, all phone numbers are deterministically converted to synthetic emails:

```
Input:  9876543210
Output: 9876543210@rajasthali.app
```

This conversion is transparent to users — they always see and enter phone numbers only.

```dart
// Flutter (constants.dart)
static String phoneToEmail(String phone) {
  final cleaned = phone.replaceAll(RegExp(r'[^\d]'), '');
  return '$cleaned@rajasthali.app';
}
```

```typescript
// Next.js (login/page.tsx)
const phoneToEmail = (phoneNum: string) => {
  const cleaned = phoneNum.replace(/[^\d]/g, '');
  return `${cleaned}@rajasthali.app`;
};
```

### Auth Flow — Flutter App

```
signIn(phone, password)
    → phoneToEmail(phone) → email
    → supabase.auth.signInWithPassword(email, password)
    → _loadProfile():
        1. query employees WHERE user_id = auth.uid() → MAYBЕСИНGLE
           found → AuthUserProfile(role = employee.role, employeeId = employee.id)
        2. if not found → query clients WHERE user_id = auth.uid()
           found → AuthUserProfile(role = 'client', clientId = client.id)
        3. if neither found → throw Exception → auto signOut()
    → profileController.add(profile)
    → GoRouter redirect runs → /driver or /client
```

### Auth Flow — Admin Panel

```
POST /login
    → supabase.auth.signInWithPassword(email, password)
    → query employees: .select('role, is_active').eq('user_id', user.id)
    → if role not in ['owner', 'manager'] → signOut + error
    → if is_active = false → signOut + error
    → router.push('/dashboard') + router.refresh()
```

### Middleware (Admin Panel)

```typescript
// Every request (except static assets):
1. Refresh Supabase session from cookies → keeps session alive
2. if (!user && isDashboardPage) → redirect /login
3. if (user && isLoginPage) → redirect /dashboard
4. /track/* → always allow (public pages)
```

### User Creation (Service Role Pattern)

Creating a user from the admin panel must not log out the currently signed-in admin. Supabase's client-side `signUp()` would create a new session. The solution:

```typescript
// actions/user.ts — Server Action (runs on server, never in browser)
const supabaseAdmin = createClient(url, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data } = await supabaseAdmin.auth.admin.createUser({
  email: phoneToEmail(phone),
  password,
  email_confirm: true,        // skip email verification
  user_metadata: { name, role }
});

return data.user.id;          // returned to calling page to insert DB record
```

---

## 9. Live Tracking System

### Publishing Location (Driver/Client Device)

```dart
// Android foreground service — keeps running when app is backgrounded
AndroidSettings(
  accuracy: LocationAccuracy.high,
  distanceFilter: 10,                    // meters
  intervalDuration: Duration(seconds: 10),
  foregroundNotificationConfig: ForegroundNotificationConfig(
    notificationTitle: 'Live Tracking Active',
    notificationText: 'Sharing your location in real-time.',
    enableWakeLock: true,
  ),
)

// UPSERT (not INSERT) — one row per user, always up-to-date
supabase.from('live_locations').upsert({
  'user_id': userId,
  'lat': position.latitude,
  'lng': position.longitude,
  'heading': position.heading,
  'speed': position.speed,
  'accuracy': position.accuracy,
  'is_active': true,
  'updated_at': DateTime.now().toIso8601String(),
}, onConflict: 'user_id');
```

### Consuming Location (Realtime Stream)

```dart
// Flutter viewer
supabase.from('live_locations')
    .stream(primaryKey: ['id'])
    .eq('user_id', targetUserId)
    .map((rows) => rows.isNotEmpty ? rows.first : null);
```

```typescript
// Admin Panel (Leaflet)
supabase.channel('tracking')
    .on('postgres_changes', {
        event: '*', schema: 'public', table: 'live_locations'
    }, (payload) => updateMarker(payload.new))
    .subscribe();
```

### Battery Saver Modes

| Mode | GPS Interval | Distance Filter | Trigger |
|------|-------------|-----------------|---------|
| Performance | 5s | 5m | Manual |
| Balanced | 10s | 10m | Default |
| Saver | 30s | 50m | Manual |
| Auto-Stationary | 30s | 50m | No movement for 60 seconds |

---

## 10. Smart Automation Engine

### Tour Auto-Start / Auto-Complete

`TourAutoStartService` runs a `Timer.periodic(30s)` inside the Driver shell. On each tick:

```
Query tours WHERE driver_id = me AND status IN ('assigned', 'in_progress')

FOR each tour:
  // Auto-Start
  IF status = 'assigned':
    IF start_date < today → UPDATE status = 'in_progress'
    IF start_date = today AND start_time ≤ now → UPDATE status = 'in_progress'
    IF start_date = today AND no start_time → UPDATE status = 'in_progress'

  // Auto-Complete
  IF status IN ('assigned', 'in_progress'):
    IF end_date < today → UPDATE status = 'completed'
```

This runs silently on the driver's device — no server cron job required.

### Speed Monitor

```
GPS position stream → position.speed (m/s) × 3.6 → km/h

0–64 km/h  → GREEN indicator (Normal)
64–80 km/h → YELLOW indicator (Warning)
80+ km/h   → RED indicator + "SLOW DOWN!" alert banner
```

### Road Route (OSRM)

```
GET https://router.project-osrm.org/route/v1/driving/{lng1},{lat1};{lng2},{lat2}
    ?overview=full&geometries=geojson

Response:
    routes[0].geometry.coordinates → List<[lng, lat]>
    routes[0].distance → meters
    routes[0].duration → seconds

Displayed:
    flutter_map Polyline overlay
    "X km · Y min" ETA chip
```

### SOS Emergency

```
Driver taps SOS button →
    Shows bottom sheet with options:
    1. Police (100)           → url_launcher tel:100
    2. Ambulance (108)        → url_launcher tel:108
    3. Road Helpline (1033)   → url_launcher tel:1033
    4. Alert Admin            → insert notification record for all managers/owners
```

---

## 11. State Management — Flutter

### Riverpod Architecture

```
┌─────────────────────────────────────────────────┐
│            UI Layer (Widgets)                   │
│   ConsumerWidget / ConsumerStatefulWidget       │
└──────────────────┬──────────────────────────────┘
                   │  ref.watch() / ref.read()
                   ▼
┌─────────────────────────────────────────────────┐
│           Provider Layer (Riverpod)             │
│   FutureProvider / StreamProvider               │
│   StateNotifierProvider / Provider              │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│     Repository / Service Layer                  │
│   TourRepository, AuthService,                  │
│   LocationService, TourAutoStartService,        │
│   SmartFeaturesService                          │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      Supabase Client (Network)                  │
│   REST + Realtime + Auth + Storage              │
└─────────────────────────────────────────────────┘
```

### Key Providers

| Provider | Type | Purpose |
|----------|------|---------|
| `authServiceProvider` | `Provider<AuthService>` | Auth singleton |
| `authProfileProvider` | `StreamProvider<AuthUserProfile?>` | Current user profile stream |
| `locationServiceProvider` | `StateNotifierProvider` | GPS on/off + mode |
| `speedMonitorProvider` | `StateNotifierProvider` | Live speed + classification |
| `batterySaverProvider` | `StateNotifierProvider` | GPS frequency mode |
| `tourAutoStartServiceProvider` | `StateNotifierProvider` | 30s timer lifecycle |
| `driverToursProvider` | `FutureProvider.family<List, String>` | Tours by driverId |
| `clientToursProvider` | `FutureProvider.family<List, String>` | Tours by clientId |
| `tourDetailProvider` | `FutureProvider.family<Map, String>` | Single tour by id |
| `liveLocationStreamProvider` | `StreamProvider.family<Map?, String>` | Realtime location by userId |
| `notificationsProvider` | `StreamProvider<List>` | Notification stream |

---

## 12. Navigation & Routing

### Admin Panel Routes (Next.js App Router)

```
/                        → redirect to /dashboard
/login                   → LoginPage (public)
/track/[token]           → PublicTrackingPage (public, no auth)

/(dashboard)/
    dashboard/           → DashboardPage
    employees/           → EmployeeListPage
    employees/new        → CreateEmployeePage
    employees/[id]       → EmployeeDetailPage
    clients/             → ClientListPage
    clients/new          → CreateClientPage
    clients/[id]         → ClientDetailPage
    vehicles/            → VehicleListPage
    vehicles/new         → CreateVehiclePage
    vehicles/[id]        → VehicleDetailPage
    tours/               → TourListPage
    tours/new            → CreateTourPage (multi-step wizard)
    tours/[id]           → TourDetailPage
    attendance/          → AttendancePage
    salaries/            → SalaryPage
    leaves/              → LeaveRequestsPage
    tracking/            → LiveTrackingMapPage
    analytics/           → AnalyticsPage
    notifications/       → NotificationsPage
    reports/             → ReportsPage
```

### Flutter App Routes (GoRouter)

```
/splash              → SplashScreen (auth decision point)
/login               → LoginScreen

/driver              → DriverHomePage        ┐
/driver/tours        → DriverToursPage       │ DriverShell
/driver/tours/:id    → DriverTourDetailPage  │ (BottomNav)
/driver/notifications → DriverNotificationsPage │
/driver/profile      → DriverProfilePage     ┘
/driver/tracking/:userId → TrackingMapPage (view client)

/client              → ClientHomePage          ┐
/client/tours        → ClientToursPage         │ ClientShell
/client/tours/:id    → ClientTourDetailPage    │ (BottomNav)
/client/notifications → ClientNotificationsPage │
/client/profile      → ClientProfilePage       ┘
/client/request-tour → ClientRequestTourPage
/client/tracking/:userId → TrackingMapPage (view driver)
```

### Auth Guard Logic (GoRouter)

```dart
String? _handleRedirect(BuildContext context, GoRouterState state) {
  final isLoggedIn = authService.isAuthenticated;
  final isOnSplash = state.matchedLocation == '/splash';
  final isOnLogin  = state.matchedLocation == '/login';

  if (!isLoggedIn && !isOnLogin && !isOnSplash) return '/login';

  if (isLoggedIn && (isOnLogin || isOnSplash)) {
    final profile = authService.currentProfile;
    if (profile == null) return '/splash';
    if (profile.isDriver) return '/driver';
    if (profile.isClient) return '/client';
    return '/login';
  }
  return null; // no redirect
}
```

---

## 13. API Integrations

| Service | Endpoint | Used By | Cost |
|---------|----------|---------|------|
| Supabase REST | `{project}.supabase.co/rest/v1/` | All apps | Free |
| Supabase Realtime | `{project}.supabase.co/realtime/v1/` | Flutter + Admin | Free |
| Supabase Auth | `{project}.supabase.co/auth/v1/` | All apps | Free |
| Supabase Storage | `{project}.supabase.co/storage/v1/` | Flutter | Free (2GB) |
| Firebase FCM | `fcm.googleapis.com` | Flutter | Free |
| OSRM Routing | `router.project-osrm.org/route/v1/driving/` | Flutter + Admin | Free, no key |
| OpenStreetMap Tiles | `tile.openstreetmap.org/{z}/{x}/{y}.png` | Flutter + Admin | Free, no key |
| Open-Meteo Weather | `api.open-meteo.com/v1/forecast` | Flutter | Free, no key |
| Vercel Hosting | Vercel CDN | Admin + Landing | Free tier |

**No paid API keys required** for any feature in the current production build.

---

## 14. Security & RLS Policies

### Row Level Security Overview

| Table | Who Can Read | Who Can Write |
|-------|-------------|---------------|
| `employees` | Own record (`user_id = auth.uid()`) | Admin (service role) |
| `clients` | Own record | Admin (service role) |
| `tours` | Driver reads assigned tours; Client reads tours via tour_clients | Admin |
| `tour_stops` | Same as tours | Admin |
| `tour_checklist` | Driver reads assigned tours | Driver can update `is_completed` |
| `live_locations` | All authenticated (for tracking) | Own record only |
| `notifications` | Own (`user_id = auth.uid()`) | Own + admin |
| `attendance` | Managers/owners | Managers/owners |
| `salary_records` | Managers/owners + own employee | Managers/owners |
| `leave_requests` | Own + managers | Own (create) + managers (approve) |
| `extra_tour_requests` | Own client + managers | Own client (create) |

### Helper Functions Used in RLS

```sql
-- Used in tour policies for drivers:
driver_id IN (
  SELECT id FROM employees WHERE user_id = auth.uid()
)

-- Used in tour policies for clients:
id IN (
  SELECT tour_id FROM tour_clients
  WHERE client_id = (SELECT id FROM clients WHERE user_id = auth.uid())
)
```

### Admin Panel Service Role

The admin panel uses `SUPABASE_SERVICE_ROLE_KEY` exclusively in:
- `actions/user.ts` server action — creates auth users
- This key is **never** exposed to the browser (it's in a server-only Server Action)

---

## 15. Environment Variables

### Flutter App (`.env`)

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

Loaded at startup via `flutter_dotenv`: `await dotenv.load(fileName: '.env');`

### Admin Panel (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...    # server-only, NEVER prefix with NEXT_PUBLIC_
```

### Landing Page (`.env`)

```
PORT=3000
```

---

## 16. Build & Deployment

### Flutter App

```bash
cd RajasthaliApp

# Setup
cp .env.example .env          # add Supabase credentials
flutter pub get

# Debug run
flutter run

# Release APK (direct install)
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk

# App Bundle (Google Play Store)
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

**Android foreground service** requires the following in `AndroidManifest.xml`:
- `FOREGROUND_SERVICE` permission
- `FOREGROUND_SERVICE_LOCATION` permission
- Foreground service declaration with `foregroundServiceType="location"`

### Admin Panel

```bash
cd rajasthali-admin

# Setup
cp .env.local.example .env.local   # add Supabase credentials
npm install

# Development
npm run dev                         # http://localhost:3000

# Production build (verify before deploy)
npm run build

# Deploy to Vercel
vercel --prod
```

**Important Next.js settings:**
- Map components use `dynamic(() => import(...), { ssr: false })` to prevent SSR hydration errors with Leaflet
- Data pages use `export const dynamic = 'force-dynamic'` to always fetch fresh data (no stale SSG cache)

### Landing Page

```bash
cd rajasthalitourslandingpage
npm install
node server.js                      # http://localhost:3000

# Deploy to Vercel
vercel --prod
```

### Database Setup (Supabase)

```
1. Create project at supabase.com (region: ap-south-1 Mumbai recommended)
2. Open SQL Editor
3. Run: Resource/supabase_schema.sql    (all tables, indexes, triggers, views, functions)
4. Run: Resource/supabase_rls.sql       (all RLS policies)
5. Run: Resource/supabase_storage.sql   (storage buckets + policies)
6. Enable Realtime on live_locations and notifications tables
7. Copy Project URL and Anon Key to .env files
8. Copy Service Role Key to admin panel .env.local
```

### Live URLs

| Service | URL |
|---------|-----|
| Admin Panel | https://rajasthali-admin.vercel.app |
| Admin Login | https://rajasthali-admin.vercel.app/login |
| Public Tracking | https://rajasthali-admin.vercel.app/track/{token} |

---

## 17. Performance Optimizations

| Optimization | Implementation | Benefit |
|-------------|----------------|---------|
| SSR-safe Supabase clients | Null-safe fallbacks during Next.js build | No build-time errors |
| Dynamic map imports | `dynamic(() => import('...'), { ssr: false })` | No Leaflet/window errors |
| Force-dynamic pages | `export const dynamic = 'force-dynamic'` | Always fresh data |
| Singleton Supabase client | Module-level instance | No connection leak |
| Single Realtime channel | One subscription per screen | Fewer WebSocket connections |
| Location UPSERT | `onConflict: 'user_id'` — one row per user | No table bloat |
| Auto-stationary GPS reduction | 30s interval when no movement for 60s | Battery savings |
| Image caching (Flutter) | `cached_network_image` memory + disk cache | Faster loads, less bandwidth |
| Skeleton loading | Shimmer widgets shown immediately | Perceived performance |
| Pull-to-refresh | `RefreshIndicator` on all list screens | User-controlled freshness |
| Icon font tree-shaking | Flutter build excludes unused icon glyphs | APK size reduction |
| Supabase indexes | On all FK columns + frequently filtered fields | Fast query performance |

---

## Appendix: Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#E91E8C` | Buttons, active states, brand elements |
| Primary Hover | `#B5146D` | Button hover/pressed |
| Background | `#F8F9FA` | App background |
| Surface | `#FFFFFF` | Cards, panels |
| Text Primary | `#1E293B` (slate-800) | Headings |
| Text Secondary | `#94A3B8` (slate-400) | Subtext, placeholders |
| Border | `#F1F5F9` (slate-100) | Subtle dividers |
| Error | `#EF4444` | Error states |

### Design Principles

- **Cards**: 16px border radius, soft shadows (`0 10px 25px rgba(0,0,0,0.04)`)
- **Inputs**: `bg-slate-50` default, `focus:bg-white focus:border-pink-500` with ring
- **Typography**: Inter (via google_fonts in Flutter, system font stack in Next.js)
- **Spacing**: 8px grid
- **Loading**: Skeleton shimmer before data, never blank screens

---

*Last updated: July 2026*
*Maintainer: Kartik Sharma — kartikuma9261@gmail.com*
