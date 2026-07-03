<p align="center">
  <img src="admin-panel/public/vcc-logo.png" width="140" alt="VCC Logo" />
</p>

<h1 align="center">VCC — Vinayak Coaching Classes</h1>

<p align="center">
  <strong>A full-stack coaching institute management platform</strong><br/>
  Mobile App (Flutter) · Admin Panel (Next.js) · Backend API (NestJS)
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Flutter-3.41-02569B?logo=flutter&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-16.2-000000?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-7.8-2D3748?logo=prisma&logoColor=white" />
</p>

<p align="center">
  <a href="https://vcc-admin-panel.vercel.app"><strong>🌐 Live Admin Panel</strong></a> · 
  <a href="https://vcc-erp.onrender.com"><strong>⚡ Live API</strong></a>
</p>

---

## Overview

VCC is a complete ERP solution built for coaching institutes. It handles student management, attendance tracking, fee records, study materials, online quizzes, timetables, announcements, AI tutoring, and performance analytics — all accessible through a mobile app for students/teachers and a web dashboard for admins.

### Key Features

| Module | Student | Teacher | Admin |
|--------|---------|---------|-------|
| **Authentication** | JWT login, 7-day session | ✓ | ✓ |
| **Profile** | View + edit (name/phone/password) | ✓ | ✓ |
| **Attendance** | Month-wise view + % ring | Mark batch attendance | Mark teacher attendance |
| **Fees** | View payment history | — | Manage all fees |
| **Notes & Documents** | In-app reader (subject-wise) | Upload (text + file) | Manage all |
| **Online Quizzes** | Attempt MCQ + detailed results | Create for batch | Manage all |
| **AI Tutor** | Chat with AI (Nim/Llama 3.1) | ✓ | — |
| **Performance Dashboard** | Attendance % + quiz scores + subject breakdown | — | — |
| **Rankings & Analytics** | — | — | Scoreboard + CSV export |
| **Time Table** | View weekly schedule | View batch schedule | Create/manage |
| **Announcements** | View relevant | View relevant | Post (role/batch targeted) |
| **Batches** | — | View assigned | Full CRUD |
| **User Management** | — | — | Create/edit/deactivate |
| **Test Results** | View marks | Record marks | — |
| **Notifications** | Inbox | Inbox | Broadcast |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Clients                               │
│                                                              │
│   ┌──────────────┐    ┌──────────────────────────────────┐  │
│   │  VCC App     │    │  Admin Panel                     │  │
│   │  (Flutter)   │    │  (Next.js 16 + Tailwind v4)      │  │
│   │  Android     │    │  React 19, App Router            │  │
│   └──────┬───────┘    └──────────────┬───────────────────┘  │
│          │                           │                       │
└──────────┼───────────────────────────┼───────────────────────┘
           │         REST API          │
           ▼                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    vcc-backend (NestJS 11)                    │
│                                                              │
│  Auth (JWT) · Users · Batches · Attendance · Fees            │
│  Materials · Quizzes · Tests · Timetable · Announcements     │
│  Notifications · Teacher Attendance                          │
│                                                              │
│  Prisma ORM · class-validator · Role-based guards            │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   PostgreSQL (Supabase) │
              └────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | Flutter 3.41, Dart 3.11, Material 3, Google Fonts (Inter) |
| Admin Panel | Next.js 16.2, React 19, Tailwind CSS v4, TypeScript |
| Backend API | NestJS 11, TypeScript, Passport JWT |
| AI Tutor | NVIDIA Nim (Llama 3.1 8B Instruct) |
| Database | PostgreSQL (Supabase hosted) |
| ORM | Prisma 7.8 with `@prisma/adapter-pg` |
| Validation | class-validator + class-transformer |

---

## Project Structure

```
vcc-erp/
├── VCC APP/              # Flutter mobile app (Android)
│   ├── lib/
│   │   ├── core/         # Theme, widgets, models, services
│   │   └── features/     # Screens by feature (auth, home, notes, quiz, etc.)
│   └── assets/           # Logo
│
├── admin-panel/          # Next.js web dashboard
│   ├── src/
│   │   ├── app/          # App Router pages (login, dashboard, content, etc.)
│   │   ├── components/   # Shared UI components
│   │   └── lib/          # API client, types, auth context
│   └── public/           # Logo, favicon
│
├── vcc-backend/          # NestJS REST API
│   ├── src/
│   │   ├── auth/         # JWT authentication
│   │   ├── users/        # User CRUD
│   │   ├── batches/      # Batch management
│   │   ├── attendance/   # Student attendance
│   │   ├── fees/         # Fee records
│   │   ├── materials/    # Notes & documents (subject-wise)
│   │   ├── tests/        # Tests & results
│   │   ├── quizzes/      # Online quizzes (MCQ)
│   │   ├── timetable/    # Weekly schedule
│   │   ├── announcements/# Targeted announcements
│   │   ├── notifications/# Push-style notifications
│   │   ├── teacher-attendance/ # Staff attendance
│   │   └── common/       # Guards, decorators, utilities
│   └── prisma/
│       ├── schema.prisma # Database schema
│       └── seed.js       # Sample data seeder
│
└── .env.example          # Environment variables template
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Flutter SDK 3.x
- PostgreSQL database (or Supabase project)

### 1. Backend Setup

```bash
cd vcc-backend
cp ../.env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

npm install
npx prisma migrate dev
npx prisma db seed      # Loads sample data
npm run start:dev       # Runs on http://localhost:4000
```

### 2. Admin Panel Setup

```bash
cd admin-panel
npm install
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:4000" > .env.local
npm run dev             # Runs on http://localhost:3000
```

### 3. Flutter App Setup

```bash
cd "VCC APP"
flutter pub get

# For production (live server):
flutter build apk --release --dart-define=API_BASE_URL=https://vcc-erp.onrender.com

# For local development:
# - Emulator: http://10.0.2.2:4000
# - Real device: http://<your-pc-ip>:4000
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:4000
```

---

## Sample Accounts

All passwords: **`VCC@1234`**

| Role | Username | Name | Details |
|------|----------|------|---------|
| Admin | `admin.vcc` | Rajesh Sharma | Super admin |
| Teacher | `teacher.vcc` | Anjali Verma | Mathematics, Class 10 |
| Teacher | `priya.nair` | Priya Nair | Physics, Class 11 |
| Teacher | `amit.kulkarni` | Amit Kulkarni | Chemistry, Class 12 |
| Teacher | `sunita.rao` | Sunita Rao | Biology, NEET |
| Student | `student.vcc` | Aarav Gupta | Class 10 |
| Student | `ananya.reddy` | Ananya Reddy | Class 11 |
| Student | `aditya.rao` | Aditya Rao | NEET |

12 students, 5 teachers, 4 batches with realistic attendance, fees, notes, quizzes, timetable, and announcements data.

---

## API Endpoints

<details>
<summary><strong>Authentication</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Authenticated |

</details>

<details>
<summary><strong>Users</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/users` | Admin |
| GET | `/users?role=STUDENT` | Admin |
| GET | `/users/:id` | Admin |
| PATCH | `/users/:id` | Admin |

</details>

<details>
<summary><strong>Batches</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/batches` | Admin |
| GET | `/batches` | Admin, Teacher |
| GET | `/batches/:id` | Admin, Teacher |
| GET | `/batches/:id/students` | Admin, Teacher |
| PATCH | `/batches/:id` | Admin |

</details>

<details>
<summary><strong>Attendance</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/attendance/mark` | Admin, Teacher |
| GET | `/attendance/me` | Student |
| GET | `/attendance/batch/:batchId` | Admin, Teacher |

</details>

<details>
<summary><strong>Fees</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/fees` | Admin |
| GET | `/fees/me` | Student |
| GET | `/fees/student/:studentId` | Admin, Teacher |

</details>

<details>
<summary><strong>Materials (Notes & Documents)</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/materials` | Admin, Teacher |
| GET | `/materials/me?subject=X&type=NOTE` | Student |
| GET | `/materials/batch/:batchId?subject=X` | Admin, Teacher |
| GET | `/materials/batch/:batchId/subjects` | Admin, Teacher |
| DELETE | `/materials/:id` | Admin, Teacher |

</details>

<details>
<summary><strong>Quizzes</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/quizzes` | Admin, Teacher |
| GET | `/quizzes/me?subject=X` | Student |
| GET | `/quizzes/batch/:batchId?subject=X` | Admin, Teacher |
| GET | `/quizzes/:id` | Admin, Teacher |
| GET | `/quizzes/:id/attempt` | Student |
| POST | `/quizzes/:id/submit` | Student |

</details>

<details>
<summary><strong>Timetable</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/timetable` | Admin |
| GET | `/timetable/me` | Student |
| GET | `/timetable/batch/:batchId` | Admin, Teacher |
| DELETE | `/timetable/:id` | Admin |

</details>

<details>
<summary><strong>Announcements</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/announcements` | Admin |
| GET | `/announcements` | Admin |
| GET | `/announcements/me` | All roles |
| DELETE | `/announcements/:id` | Admin |

</details>

<details>
<summary><strong>Teacher Attendance</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/teacher-attendance/mark` | Admin |
| GET | `/teacher-attendance?date=X` | Admin |
| GET | `/teacher-attendance/teacher/:id` | Admin |
| GET | `/teacher-attendance/me` | Teacher |

</details>

<details>
<summary><strong>AI Tutor</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/ai/chat` | All authenticated |

</details>

<details>
<summary><strong>Analytics & Rankings</strong></summary>

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/users/analytics/rankings` | Admin |
| GET | `/users/analytics/:studentId` | Admin |
| GET | `/auth/profile` | All authenticated |
| PATCH | `/auth/profile` | All authenticated |

</details>

---

## Design System

The app follows an **Apple-inspired design language** across both platforms:

- **iOS system colors** blended with VCC brand (blue/navy/gold)
- **Inter font** (SF-style) with tight letter-spacing
- **Frosted glass** surfaces with backdrop blur
- **Smooth animations** — spring curves, staggered fade-in, press-scale feedback
- **Shimmer loading** skeletons instead of plain spinners
- **Consistent components** — cards, buttons, status chips, subject filter pills

---

## Environment Variables

```env
# Backend
PORT=4000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
JWT_SECRET=your-secret-key
NIM_API_KEY=your-nvidia-nim-api-key

# Admin Panel
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

---

## Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start in watch mode |
| `npm run build` | Production build |
| `npx prisma migrate dev` | Run migrations |
| `npx prisma db seed` | Seed sample data |
| `npx prisma studio` | Open Prisma Studio |

### Admin Panel

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |

### Flutter App

| Command | Description |
|---------|-------------|
| `flutter run` | Run on connected device |
| `flutter build apk --debug` | Build debug APK |
| `flutter analyze` | Static analysis |

---

## Live Deployment

The platform is deployed and accessible 24/7:

| Component | Platform | URL |
|-----------|----------|-----|
| Backend API | Render (Free) | https://vcc-erp.onrender.com |
| Admin Panel | Vercel (Free) | https://vcc-admin-panel.vercel.app |
| Database | Supabase (Free) | Managed PostgreSQL |
| Mobile App | APK (Android) | Distributed via direct download |

- Backend includes a **self-ping keep-alive** mechanism (pings itself every 14 min) to prevent Render free tier sleep.
- Auto-deploy enabled: push to `main` → both Render and Vercel redeploy automatically.

---

## Security

- JWT-based authentication with role-based access control (RBAC)
- Input validation on all endpoints (class-validator)
- Password hashing with bcrypt (10 rounds)
- CORS enabled for cross-origin requests
- Network security config for Android (cleartext only to dev hosts)

---

## Roadmap

- [ ] File upload (cloud storage integration)
- [ ] Push notifications (FCM)
- [ ] iOS build
- [ ] Refresh tokens
- [ ] Online payment gateway
- [ ] Student performance analytics
- [ ] Parent portal
- [ ] Chat / messaging

---

## License

This project is private and proprietary to Vinayak Coaching Classes.

---

<p align="center">
  Built with ❤️ for <strong>Vinayak Coaching Classes</strong>
</p>
