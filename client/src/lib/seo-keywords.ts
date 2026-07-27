/**
 * Centralised SEO keyword sets for every page.
 * Kartik Sharma — Full Stack Developer, Jaipur, India
 */

// ── Brand / identity ────────────────────────────────────────
export const brandKeywords = [
  "Kartik Sharma",
  "Kartik Sharma developer",
  "Kartik Sharma Jaipur",
  "Kartik Sharma portfolio",
  "Kartik Sharma full stack",
  "kartiksharma.site",
  "kartiksharma4448",
  "Kartik Sharma BCA",
  "Kartik Sharma VGU",
  "Kartik Sharma Vivekananda Global University",
  "Kartik Sharma CodeUpPath",
  "Kartik Sharma India",
  "Kartik Sharma freelancer",
  "Kartik Sharma software engineer",
];

// ── Role / profession ───────────────────────────────────────
export const roleKeywords = [
  "Full Stack Developer",
  "Full Stack Developer Jaipur",
  "Full Stack Developer India",
  "Software Developer India",
  "Web Developer Jaipur",
  "React Developer India",
  "Flutter Developer India",
  "Node.js Developer India",
  "Mobile App Developer India",
  "Freelance Web Developer India",
  "Freelance Developer Jaipur",
  "BCA student developer",
  "AI developer India",
  "app developer Jaipur",
  "backend developer India",
  "frontend developer Jaipur",
];

// ── Technical skills ────────────────────────────────────────
export const techKeywords = [
  "React developer",
  "TypeScript developer",
  "Node.js developer",
  "Python developer",
  "Flutter developer",
  "Dart developer",
  "Next.js developer",
  "NestJS developer",
  "FastAPI developer",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "REST API development",
  "full stack web development",
  "mobile app development",
  "AI app development",
  "NVIDIA NIM",
  "real-time apps",
  "GPS tracking app",
];

// ── Projects keywords ───────────────────────────────────────
export const projectKeywords = [
  "TodoUp app",
  "TodoUp Play Store",
  "VCC ERP coaching app",
  "Rajasthali travel management",
  "RestroQR digital menu",
  "CVCraft resume builder",
  "PRANAG AI livestock",
  "CodeUpPath platform",
  "Aegis Care blockchain",
  "KidzGPT AI learning",
  "QR menu ordering system",
  "GPS vehicle tracking app",
  "Flutter ERP app India",
  "AI resume builder free",
  "coaching institute management app",
];

// ── Services keywords ───────────────────────────────────────
export const serviceKeywords = [
  "hire full stack developer India",
  "hire React developer India",
  "hire Flutter developer India",
  "freelance web design services",
  "website development Jaipur",
  "app development Jaipur",
  "logo design services India",
  "AI agent development",
  "custom web application development",
  "affordable web developer India",
  "low cost website development",
  "portfolio website developer",
  "build a website India",
  "website development services Rajasthan",
];

// ── Certificates / achievements ──────────────────────────────
export const achievementKeywords = [
  "Kartik Sharma certifications",
  "Google AI certificate",
  "freeCodeCamp certification",
  "Simplilearn MERN stack",
  "Google Play Academy certificate",
  "developer skills India",
  "full stack developer certificate",
  "Flutter certificate Cisco",
  "data analytics certificate",
  "Kartik Sharma achievements",
];

// ── Blog ──────────────────────────────────────────────────────
export const blogKeywords = [
  "tech blog India",
  "web development blog",
  "software development articles",
  "developer blog Jaipur",
  "React tutorials",
  "Flutter tutorials",
  "hackathon experience India",
  "VGU Google AI campus review",
  "AceHack hackathon",
  "coding blog India",
  "Kartik Sharma blog",
];

// ── Helper to join sets into a single meta string ─────────────
export function kw(...sets: string[][]): string {
  return Array.from(new Set(sets.flat())).join(", ");
}

// ── Per-page ready-made keyword strings ──────────────────────
export const pageKeywords = {
  home: kw(brandKeywords, roleKeywords, techKeywords, serviceKeywords),

  about: kw(brandKeywords, roleKeywords, [
    "about Kartik Sharma",
    "Kartik Sharma biography",
    "Kartik Sharma resume",
    "Kartik Sharma CV",
    "BCA student Jaipur",
    "Vivekananda Global University developer",
    "full stack developer resume India",
    "developer experience Jaipur",
    "Kartik Sharma skills",
    "CodeUpPath founder",
  ]),

  projects: kw(brandKeywords, projectKeywords, techKeywords, [
    "Kartik Sharma projects",
    "full stack projects portfolio",
    "React projects India",
    "Flutter projects India",
    "AI projects portfolio",
    "web development projects India",
    "mobile app portfolio",
    "Play Store app developer India",
    "GPS tracking Flutter app",
    "QR ordering system",
    "ERP coaching app Flutter",
    "AI resume builder India",
  ]),

  achievements: kw(brandKeywords, achievementKeywords, techKeywords, [
    "Kartik Sharma certifications list",
    "full stack developer certifications India",
    "Kartik Sharma skills and certificates",
    "developer achievements portfolio",
  ]),

  services: kw(serviceKeywords, brandKeywords, roleKeywords, [
    "website development services India",
    "Flutter app development services",
    "AI chatbot development India",
    "graphic design services India",
    "logo design Jaipur",
    "web app development Rajasthan",
    "affordable IT services India",
  ]),

  products: kw(brandKeywords, [
    "buy website template India",
    "premium landing page template",
    "GSAP animated template",
    "gaming website template",
    "ERP coaching institute software",
    "travel management software India",
    "ready made web templates",
    "developer products India",
    "website templates buy India",
    "free portfolio templates",
    "free portfolio website templates",
    "open source portfolio templates",
    "free HTML portfolio template",
    "download portfolio template free",
    "developer portfolio template free",
    "free website templates GitHub",
    "portfolio templates 2026",
    "best free portfolio websites",
    "responsive portfolio template free",
    "free personal website template",
  ]),

  blog: kw(brandKeywords, blogKeywords, [
    "Kartik Sharma articles",
    "developer journey blog",
    "hackathon blog India",
    "VGU student blog",
    "coding tutorials India",
    "free portfolio templates blog",
    "open source portfolio collection",
    "free website templates download",
    "portfolio design ideas",
    "developer portfolio tips",
  ]),

  contact: kw(brandKeywords, serviceKeywords, [
    "contact Kartik Sharma",
    "hire Kartik Sharma",
    "freelance developer contact India",
    "web developer Jaipur contact",
    "get in touch developer India",
  ]),

  social: kw(brandKeywords, [
    "Kartik Sharma LinkedIn",
    "Kartik Sharma GitHub",
    "Kartik Sharma Instagram",
    "Kartik Sharma social links",
    "connect with Kartik Sharma",
    "kartiksharma4448 GitHub",
    "kartik-sharma06 LinkedIn",
  ]),
};

// ── Shared JSON-LD: Person (used site-wide) ───────────────────
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kartik Sharma",
  url: "https://kartiksharma.site",
  image: "https://kartiksharma.site/profile.png",
  jobTitle: "Full Stack Developer",
  description:
    "Kartik Sharma is a Full Stack Developer, Flutter & AI app builder, and founder of CodeUpPath from Jaipur, Rajasthan, India. Builds scalable web apps, mobile apps, AI-driven systems and digital products.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Vivekananda Global University",
    url: "https://vgu.ac.in",
  },
  knowsAbout: [
    "Full Stack Development",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "Flutter",
    "Dart",
    "Python",
    "FastAPI",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "Firebase",
    "Artificial Intelligence",
    "NVIDIA NIM",
    "REST APIs",
    "Mobile App Development",
    "GPS Tracking",
    "Real-time Apps",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full Stack Developer",
    occupationLocation: {
      "@type": "City",
      name: "Jaipur",
    },
    skills: "React, Flutter, Node.js, Python, TypeScript, PostgreSQL, Supabase, AI",
  },
  sameAs: [
    "https://linkedin.com/in/kartik-sharma06",
    "https://github.com/kartiksharma4448",
    "https://www.instagram.com/itszeromind",
    "https://codeuppath.com",
    "https://play.google.com/store/apps/details?id=app.todoup",
  ],
};
