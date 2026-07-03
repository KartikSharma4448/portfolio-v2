<p align="center">
  <img src="rajasthali-admin/public/logo.png" width="100" alt="Rajasthali Tours" />
</p>

<h1 align="center">🚐 Rajasthali Traveling System</h1>

<p align="center">
  <strong>Complete end-to-end travel management ecosystem built for Rajasthali Tours, Rajasthan 🇮🇳</strong><br/>
  Mobile App · Web Admin Panel · Landing Page · Supabase Backend
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Flutter-3.7-blue?logo=flutter" />
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Platform-Android-green?logo=android" />
  <img src="https://img.shields.io/badge/Cost-₹0/month-success" />
</p>

---

## 🏗️ System Architecture

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

### Communication Flow

```
Flutter App ──────────────→ Supabase REST API (CRUD)
Flutter App ←─────────────→ Supabase Realtime (GPS WebSocket)
Flutter App ──────────────→ OSRM API (Road Routes, free)
Flutter App ──────────────→ Firebase FCM (Push Notifications)
Admin Panel ──────────────→ Supabase REST + Service Role Key
Admin Panel ←─────────────→ Supabase Realtime (Live Tracking Map)
Admin Panel ──────────────→ OSRM API (Tour Route Visualization)
Landing Page ─────────────→ Vercel (Static + SSR hosting)
Public Track Link ─────────→ Admin Panel /track/[token] (Realtime Map)
```

---

## 📁 Repository Structure

```
Rajasthali-Traveling-System/                     ← Monorepo root
│
├── 📱 RajasthaliApp/                            ← Flutter Android App
│   ├── lib/
│   │   ├── main.dart                            ← App entry point
│   │   ├── app/                                 ← Routing, theme, constants
│   │   ├── core/                                ← Auth, GPS, repositories, services
│   │   └── features/                            ← Driver, Client, Login, Tracking screens
│   ├── android/                                 ← Android native configs
│   ├── assets/images/                           ← Logo, images
│   ├── pubspec.yaml                             ← Flutter dependencies
│   ├── .env.example                             ← Environment template
│   ├── README.md                                ← App documentation
│   └── TECHNICAL.md                             ← Full technical reference
│
├── 🖥️ rajasthali-admin/                        ← Next.js 16 Admin Panel
│   ├── src/
│   │   ├── app/                                 ← App Router pages
│   │   │   ├── (dashboard)/                     ← Protected dashboard pages
│   │   │   ├── login/                           ← Login page
│   │   │   ├── track/[token]/                   ← Public live location page
│   │   │   └── actions/                         ← Server actions
│   │   ├── lib/                                 ← Supabase clients, utilities
│   │   └── types/                               ← TypeScript interfaces
│   ├── public/                                  ← Static assets, logo
│   ├── package.json                             ← Node dependencies
│   └── .env.local.example                       ← Environment template
│
├── 🌐 rajasthalitourslandingpage/              ← Express + EJS Landing Website
│   ├── views/                                   ← EJS templates
│   ├── public/                                  ← CSS, JS, images
│   ├── data/                                    ← Tour packages, destinations data
│   ├── server.js                                ← Express entry point
│   └── vercel.json                              ← Vercel deployment config
│
├── 📄 Resource/                                 ← SQL migrations & specs
│   ├── supabase_schema.sql                      ← Complete database schema
│   ├── supabase_rls.sql                         ← Row Level Security policies
│   ├── supabase_storage.sql                     ← Storage bucket configs
│   └── Rajasthali_Master_Project_Specification.md
│
├── .gitignore                                   ← Monorepo gitignore
├── implementation.md                            ← Original implementation plan
└── README.md                                    ← This file
```

---

## ✨ Features Overview

### 📱 Flutter App

| Feature | Description |
|---------|-------------|
| 🔐 Phone Auth | Phone → email conversion, role-based routing (Driver/Client) |
| 🏠 Smart Dashboard | Time-based greeting, live speedometer, quick action grid |
| 🗺️ Live GPS Tracking | Background service, 10s Supabase Realtime updates |
| 🛤️ Road Navigation | OSRM driving routes with distance + ETA |
| 🏎️ Speedometer | Real-time speed, overspeed warning >80 km/h |
| 🤖 Tour Auto-Start | Scheduled time → automatic `in_progress` |
| ✅ Tour Auto-Complete | End date passed → automatic `completed` |
| 🚨 SOS Emergency | Police (100) / Ambulance (108) / Road Help (1033) + admin alert |
| 🔋 Battery Saver | Smart GPS frequency, auto-reduces when stationary |
| 📤 Share Location | Public shareable link, no app needed for viewer |
| 🔄 Pull to Refresh | Swipe down on all list screens |
| 🌐 Hindi/English | Bilingual toggle |
| 📋 Tour Checklists | Driver marks preparation items |
| 📍 Itinerary Stops | Timeline view with hotel info |

### 🖥️ Admin Panel

| Feature | Description |
|---------|-------------|
| 📊 Dashboard | Active tours, vehicles, employees, profit metrics |
| 👥 Employee CRUD | Role filters, profile cards, active/inactive toggle |
| 👤 Client CRUD | Linked to tours, status management |
| 🚗 Fleet CRUD | Vehicles, driver assignment, document expiry tracking |
| 🧭 Tour Management | 5-step creation wizard, itinerary, stops map, checklist |
| 📍 Live Tracking | All drivers/clients on Leaflet map, road routes |
| 📅 Attendance | Daily per-employee marking (present/absent/leave) |
| 💰 Salary/Payroll | Auto absence deductions, bonus, pay/settle |
| 📝 Leave Requests | Approve/reject workflow |
| 🔗 Share Location | Public `/track/[token]` page with Realtime map |

### 🌐 Landing Website

| Feature | Description |
|---------|-------------|
| Tour Packages | Browse available tours with pricing |
| Fleet Showcase | Vehicle photos and specifications |
| Destinations | Rajasthan destination guides |
| Certifications | IATA, TripAdvisor, Ministry of Tourism |
| SEO Optimized | Sitemap, meta tags, structured data |

---

## 🛠️ Tech Stack Summary

| Layer | Technology | Why |
|-------|-----------|-----|
| Mobile | Flutter 3.7 + Dart | Cross-platform, single codebase |
| State | Riverpod 2.6 | Reactive, compile-safe state management |
| Navigation | GoRouter 14 | Role-based route guards |
| Admin UI | Next.js 16 + React 19 | Server components, App Router |
| Styling | Tailwind CSS 4 | Utility-first, fast development |
| Backend | Supabase (PostgreSQL) | Auth + DB + Realtime + Storage |
| Maps | OpenStreetMap + Leaflet | Free, no API key |
| Routing | OSRM | Free driving routes |
| Push | Firebase FCM | Free push notifications |
| Hosting | Vercel | Free tier deployment |

**Total monthly cost: ₹0** — all services within free tiers.

---

## 🚀 Quick Start

### Mobile App

```bash
cd RajasthaliApp
cp .env.example .env          # Add Supabase URL and Anon Key
flutter pub get
flutter run                    # Debug on device
flutter build apk --release    # Production APK
```

### Admin Panel

```bash
cd rajasthali-admin
cp .env.local.example .env.local  # Add Supabase credentials
npm install
npm run dev                        # localhost:3000
```

### Landing Page

```bash
cd rajasthalitourslandingpage
npm install
node server.js                     # localhost:3000
```

---

## 🔐 Authentication System

```
Phone: 9876543210  →  Email: 9876543210@rajasthali.app

Roles & Access:
┌─────────────┬───────────────────────────────────────┐
│ Role        │ Access                                 │
├─────────────┼───────────────────────────────────────┤
│ Owner       │ Admin Panel (full access)              │
│ Manager     │ Admin Panel (full access)              │
│ Driver      │ Flutter App (driver panel)             │
│ Client      │ Flutter App (client panel)             │
└─────────────┴───────────────────────────────────────┘

Account creation is admin-only — no self-registration.
```

---

## 🌐 Live URLs

| Service | URL |
|---------|-----|
| Admin Panel | https://rajasthali-admin.vercel.app |
| Admin Login | https://rajasthali-admin.vercel.app/login |
| Live Location Tracking | https://rajasthali-admin.vercel.app/track/{token} |
| GitHub Repository | https://github.com/KartikSharma4448/Rajasthali-Traveling-System |

---

## 📱 Environment Variables

### Flutter App (`.env`)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### Admin Panel (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 👨‍💻 Developer

**Kartik Sharma**
📧 kartikuma9261@gmail.com
🐙 [@KartikSharma4448](https://github.com/KartikSharma4448)

---

## 📄 License

Proprietary — Rajasthali Tours. All rights reserved.

*Last updated: July 2026*
