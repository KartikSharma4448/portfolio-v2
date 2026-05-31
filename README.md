<div align="center">

# 🚀 Kartik Sharma — Portfolio

A high-performance, static developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. Designed with Apple-smooth interactions, Google-style motion, and editorial typography.

**🌐 Live:** [kartiksharma.site](https://kartiksharma.site)

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-161618?style=for-the-badge&logo=radixui&logoColor=white)

<br/>

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Static_CDN-orange?style=flat-square&logo=cloudflare&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-Optimized-brightgreen?style=flat-square&logo=google&logoColor=white)
![Performance](https://img.shields.io/badge/Lighthouse-95%2B-4FC08D?style=flat-square&logo=lighthouse&logoColor=white)

</div>

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| <img src="https://cdn.simpleicons.org/react/61DAFB" width="16"/> Framework | React 18 + Vite 5 |
| <img src="https://cdn.simpleicons.org/typescript/3178C6" width="16"/> Language | TypeScript |
| <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="16"/> Styling | Tailwind CSS 3 + CSS custom properties |
| <img src="https://cdn.simpleicons.org/framer/0055FF" width="16"/> Animations | Framer Motion + Lenis (smooth scroll) |
| <img src="https://cdn.simpleicons.org/radixui/161618" width="16"/> UI Components | Radix UI primitives + shadcn/ui |
| <img src="https://cdn.simpleicons.org/postgresql/4169E1" width="16"/> Data | Static JSON (baked from PostgreSQL at build time) |
| <img src="https://cdn.simpleicons.org/googlefonts/4285F4" width="16"/> Fonts | Space Grotesk + Inter + JetBrains Mono |
| <img src="https://cdn.simpleicons.org/google/4285F4" width="16"/> SEO | Per-page meta, JSON-LD, sitemap, Open Graph |
| <img src="https://cdn.simpleicons.org/cloudflare/F38020" width="16"/> Deployment | Static bundle — any CDN |

---

## ✨ Features

- 🎬 **Immersive hero** — editorial typography, terminal card, particle background
- 📊 **Bento grid stats** — asymmetric layout with animated counters
- 🔄 **Dual-direction skill marquee** — infinite scroll both directions
- 💡 **Spotlight cards** — radial glow follows cursor on project cards
- 🧲 **Magnetic buttons** — elements subtly pull toward the cursor
- 🧈 **Smooth scroll** — Lenis-powered with Apple-style inertia
- 📏 **Scroll progress bar** — gradient indicator at viewport top
- 🎭 **Page transitions** — fade + rise between routes
- 📅 **Timeline layout** — connected vertical timeline for experience
- 🌗 **Dark + Light mode** — full theme support
- 📱 **Responsive** — mobile-first, all screen sizes
- 🔍 **SEO optimized** — unique meta per page, structured data, sitemap
- ⚡ **Static & fast** — no server, deploys anywhere free

---

## 📁 Project Structure

```
├── client/
│   ├── public/            # Static assets (images, CV, robots.txt)
│   ├── src/
│   │   ├── components/    # Shared UI (navbar, footer, motion primitives)
│   │   ├── data/          # Baked portfolio data (auto-generated)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities, SEO keywords, query client
│   │   └── pages/         # Route pages (home, about, projects, etc.)
│   └── index.html         # Entry HTML with base SEO
├── shared/
│   └── schema.ts          # TypeScript types + Zod schemas
├── scripts/
│   └── refresh-data.mjs   # Pull fresh data from database
├── dist/public/           # Build output (deploy this folder)
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🛠️ Getting Started

### Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-9%2B-CB3837?style=flat-square&logo=npm&logoColor=white)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot reload.

### Build

```bash
npm run build
```

Outputs a static bundle to `dist/public/`.

### Preview Production Build

```bash
npm run preview
```

---

## 🔄 Refreshing Data

Portfolio content is baked in at build time from PostgreSQL. To update:

```bash
# Set your database URL (never commit this)
$env:DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Pull fresh data
npm run refresh-data

# Rebuild
npm run build
```

---

## 🚀 Deployment

The build output (`dist/public/`) is a static folder. Deploy to any free static host:

### <img src="https://cdn.simpleicons.org/cloudflare/F38020" width="18"/> Cloudflare Pages (Recommended)

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist/public` |
| Root directory | `/` |

### <img src="https://cdn.simpleicons.org/netlify/00C7B7" width="18"/> Netlify

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist/public` |

### <img src="https://cdn.simpleicons.org/vercel/000000" width="18"/> Vercel

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Output directory | `dist/public` |

---

## 🔀 SPA Routing

| Platform | Solution |
|----------|----------|
| <img src="https://cdn.simpleicons.org/cloudflare/F38020" width="14"/> Cloudflare Pages | Automatic |
| <img src="https://cdn.simpleicons.org/netlify/00C7B7" width="14"/> Netlify | `_redirects`: `/*  /index.html  200` |
| <img src="https://cdn.simpleicons.org/vercel/000000" width="14"/> Vercel | `vercel.json` rewrites |
| <img src="https://cdn.simpleicons.org/github/181717" width="14"/> GitHub Pages | `404.html` = copy of `index.html` |

---

## 🔍 SEO Checklist

- [x] ✅ Unique title + description per page
- [x] ✅ JSON-LD structured data (Person, Blog, Article, ContactPage)
- [x] ✅ Open Graph + Twitter Card meta
- [x] ✅ Canonical URLs
- [x] ✅ XML Sitemap (`/sitemap.xml`)
- [x] ✅ robots.txt
- [x] ✅ Semantic HTML headings
- [x] ✅ Fast load (static, code-split, optimized)
- [ ] 📋 Submit sitemap to Google Search Console
- [ ] 📋 Backlinks from social profiles
- [ ] 📋 Google Business Profile (optional)

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔧 Start Vite dev server |
| `npm run build` | 📦 Production static build |
| `npm run preview` | 👁️ Preview production build locally |
| `npm run refresh-data` | 🔄 Pull latest data from database |
| `npm run check` | ✅ TypeScript type check |

---

## 👤 Author

<div align="center">

| | |
|---|---|
| <img src="https://cdn.simpleicons.org/globe/4285F4" width="16"/> Website | [kartiksharma.site](https://kartiksharma.site) |
| <img src="https://cdn.simpleicons.org/linkedin/0A66C2" width="16"/> LinkedIn | [kartik-sharma06](https://linkedin.com/in/kartik-sharma06) |
| <img src="https://cdn.simpleicons.org/github/181717" width="16"/> GitHub | [kartiksharma4448](https://github.com/kartiksharma4448) |
| <img src="https://cdn.simpleicons.org/instagram/E4405F" width="16"/> Instagram | [kartik.verse6](https://instagram.com/kartik.verse6) |
| 🚀 CodeUpPath | [codeuppath.com](https://codeuppath.com) |

</div>

---

<div align="center">

### ⭐ Star this repo if you found it useful!

![Made with ❤️](https://img.shields.io/badge/Made_with-❤️-red?style=for-the-badge)
![India](https://img.shields.io/badge/From-India_🇮🇳-orange?style=for-the-badge)

</div>
