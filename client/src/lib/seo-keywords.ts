/**
 * Centralised SEO keyword sets for every page.
 * Keep keywords specific, intent-driven and locally relevant.
 * Grouped so each page can pull a focused, non-spammy set.
 */

// ── Brand / identity ────────────────────────────────────────
export const brandKeywords = [
  "Kartik Sharma",
  "Kartik Sharma developer",
  "Kartik Sharma Jaipur",
  "Kartik Sharma portfolio",
  "kartiksharma.site",
  "kartiksharma4448",
  "Kartik Sharma BCA",
  "Founder CodeUpPath",
];

// ── Role / profession ───────────────────────────────────────
export const roleKeywords = [
  "Full Stack Developer",
  "Full Stack Developer Jaipur",
  "Software Developer India",
  "Web Developer Jaipur",
  "React Developer",
  "Node.js Developer",
  "Freelance Web Developer India",
  "Freelance Developer Jaipur",
  "BCA student developer",
  "AI systems builder",
];

// ── Technical skills ────────────────────────────────────────
export const techKeywords = [
  "React developer",
  "TypeScript developer",
  "Node.js developer",
  "Python developer",
  "Java programmer",
  "REST API development",
  "cloud computing",
  "Microsoft Azure",
  "machine learning",
  "TensorFlow",
  "full stack web development",
  "responsive web design",
];

// ── Service / hire intent ───────────────────────────────────
export const serviceKeywords = [
  "hire full stack developer",
  "hire React developer India",
  "freelance web design services",
  "website development Jaipur",
  "logo design services",
  "software testing services",
  "portfolio website developer",
  "build a website India",
  "custom web application development",
];

// ── Helper to join sets into a single meta string ───────────
export function kw(...sets: string[][]): string {
  return Array.from(new Set(sets.flat())).join(", ");
}

// ── Per-page ready-made keyword strings ─────────────────────
export const pageKeywords = {
  home: kw(brandKeywords, roleKeywords, techKeywords),
  about: kw(brandKeywords, roleKeywords, [
    "about Kartik Sharma",
    "Kartik Sharma biography",
    "BCA student Jaipur",
    "Vivekananda Global University",
    "full stack developer resume",
    "developer experience Jaipur",
  ]),
  projects: kw(brandKeywords, [
    "Kartik Sharma projects",
    "full stack projects",
    "React projects portfolio",
    "AI projects",
    "web development projects India",
    "developer portfolio projects",
    "CodeUpPath",
    "HOPE-PAWS",
    "Pranag AI",
  ]),
  achievements: kw(brandKeywords, [
    "Kartik Sharma certifications",
    "Microsoft Azure certification",
    "Google Data Analytics certificate",
    "developer skills",
    "cloud computing certificate",
    "BCA achievements",
  ]),
  services: kw(serviceKeywords, brandKeywords),
  products: kw(brandKeywords, [
    "buy portfolio website template",
    "ready made website templates",
    "premium landing page template",
    "GSAP animated template",
    "developer products",
    "website templates India",
  ]),
  blog: kw(brandKeywords, [
    "tech blog India",
    "web development tutorials",
    "software development blog",
    "React tutorials",
    "developer blog Jaipur",
    "coding articles",
    "hackathon blog",
  ]),
  contact: kw(brandKeywords, [
    "contact Kartik Sharma",
    "hire Kartik Sharma",
    "freelance developer contact",
    "web developer Jaipur contact",
  ]),
  social: kw(brandKeywords, [
    "Kartik Sharma LinkedIn",
    "Kartik Sharma GitHub",
    "Kartik Sharma Instagram",
    "Kartik Sharma social links",
    "connect with Kartik Sharma",
  ]),
};

// ── Shared JSON-LD: Person (used site-wide) ─────────────────
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kartik Sharma",
  url: "https://kartiksharma.site",
  image: "https://kartiksharma.site/profile.png",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer and founder of CodeUpPath from Jaipur, India. Builds scalable web apps, AI-driven systems and digital products.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "India",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Vivekananda Global University",
  },
  knowsAbout: [
    "Full Stack Development",
    "React",
    "Node.js",
    "Python",
    "Java",
    "Cloud Computing",
    "Artificial Intelligence",
    "Web Development",
  ],
  sameAs: [
    "https://linkedin.com/in/kartik-sharma06",
    "https://github.com/kartiksharma4448",
    "https://www.instagram.com/itszeromind",
    "https://codeuppath.com",
  ],
};
