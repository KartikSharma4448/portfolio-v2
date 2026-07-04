import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import {
  ArrowDown, Mail, ExternalLink, FolderOpen,
  Award, Calendar, Star, Code2, Layers, BrainCircuit, Globe,
  Terminal, Database, ArrowRight, Sparkles, Zap, ChevronRight,
  Smartphone, Download, Info
} from "lucide-react";
import {
  SiReact, SiTypescript, SiPython, SiNodedotjs, SiGit,
  SiMysql, SiFigma, SiFlutter, SiNextdotjs,
  SiGithub, SiLinkedin, SiGooglecloud,
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroCanvasReveal } from "@/components/hero-canvas-reveal";
import { SEO } from "@/components/seo";
import { pageKeywords, personSchema } from "@/lib/seo-keywords";
import { Magnetic, SpotlightCard } from "@/components/motion-primitives";
import type { Project, Certificate } from "@shared/schema";
import { projectDetails } from "@/data/project-details";

const roles = ["Full Stack Developer", "Freelancer", "Cloud Enthusiast", "AI Explorer", "Problem Solver"];

function TypewriterRole() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = roles[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent font-bold">
        {displayed}
      </span>
      <span className="w-[3px] h-8 bg-cyan-400 animate-pulse inline-block align-middle rounded-full" />
    </span>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5));
    y.set(((e.clientY - rect.top) / rect.height - 0.5));
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const skillMarqueeItems = [
  { label: "React",           Icon: SiReact,         color: "#61DAFB" },
  { label: "TypeScript",      Icon: SiTypescript,    color: "#3178C6" },
  { label: "Python",          Icon: SiPython,        color: "#3776AB" },
  { label: "Next.js",         Icon: SiNextdotjs,     color: "#FFFFFF" },
  { label: "Flutter",         Icon: SiFlutter,       color: "#02569B" },
  { label: "Google Cloud",    Icon: SiGooglecloud,   color: "#4285F4" },
  { label: "Node.js",         Icon: SiNodedotjs,     color: "#339933" },
  { label: "Figma / Design",  Icon: SiFigma,         color: "#F24E1E" },
  { label: "MySQL",           Icon: SiMysql,         color: "#4479A1" },
  { label: "Microsoft Azure", Icon: TbBrandAzure,    color: "#0089D6" },
  { label: "Git",             Icon: SiGit,           color: "#F05032" },
];

export default function Home() {
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: certificates = [] } = useQuery<Certificate[]>({ queryKey: ["/api/certificates"] });

  const featuredProjects = projects.filter((p) => p.featured === "true").slice(0, 3);

  const stats = [
    { label: "Years Experience", numericValue: 2, suffix: "+", icon: Calendar, color: "text-blue-400", bg: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/20", glow: "shadow-blue-500/10" },
    { label: "Certifications", numericValue: certificates.length || 10, suffix: "+", icon: Award, color: "text-amber-400", bg: "from-amber-500/20 to-amber-600/5", border: "border-amber-500/20", glow: "shadow-amber-500/10" },
    { label: "Paid Roles", numericValue: 4, suffix: "+", icon: Zap, color: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-600/5", border: "border-emerald-500/20", glow: "shadow-emerald-500/10" },
    { label: "Tech Stack Tools", numericValue: 20, suffix: "+", icon: Layers, color: "text-violet-400", bg: "from-violet-500/20 to-violet-600/5", border: "border-violet-500/20", glow: "shadow-violet-500/10" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="Kartik Sharma — Full Stack Developer & Freelancer"
        description="Full Stack Developer and founder of CodeUpPath from Jaipur, India. Building elegant web apps, AI tools, and digital products. Open to internships, freelance work, and collaborations."
        keywords={pageKeywords.home}
        url="https://kartiksharma.site"
        ogImage="https://kartiksharma.site/profile.png"
        schema={personSchema}
      />

      {/* ─── HERO (template style) ──────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col lg:grid lg:grid-cols-[1fr_380px_1.2fr] overflow-hidden bg-[#060b18]">
        <HeroCanvasReveal />
        {/* Vignette overlay */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(6,6,10,0.85) 90%), linear-gradient(to right, rgba(6,6,10,0.9) 0%, transparent 20%, transparent 80%, rgba(6,6,10,0.9) 100%)" }} />
        {/* Glow */}
        <div className="absolute inset-0 z-[3] pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 60% at 50% 46%, rgba(100,180,255,0.08) 0%, transparent 70%)" }} />

        {/* ═══ LEFT COLUMN (visible on all screens) ═══ */}
        <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left px-6 sm:px-10 lg:px-16 pt-32 pb-16 lg:pt-0 lg:pb-0 relative z-10">
          {/* eyebrow */}
          <p className="font-['Cinzel',serif] text-[8.5px] tracking-[0.45em] text-cyan-400 mb-5 lg:mb-7 flex items-center gap-3 uppercase" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>
            <span className="block w-7 h-px bg-cyan-400 opacity-80" />
            OPEN TO WORK · ACTIVE
          </p>

          {/* headline */}
          <h1 className="font-['Cinzel',serif] text-[42px] sm:text-[46px] lg:text-[38px] xl:text-[46px] font-black leading-[1.06] tracking-wide text-white mb-2" style={{ textShadow: "0 4px 15px rgba(0,0,0,0.9)" }}>
            KARTIK<br />
            <em className="not-italic text-cyan-400 block">SHARMA</em>
          </h1>

          {/* subtitle */}
          <p className="font-['Cinzel',serif] text-[9.5px] tracking-[0.28em] text-amber-300/90 mb-6 lg:mb-8 uppercase" style={{ textShadow: "0 2px 5px rgba(0,0,0,0.9)" }}>
            FULL STACK & MERN DEVELOPER
          </p>

          {/* body */}
          <p className="font-['Cormorant_Garamond',serif] text-[15px] sm:text-[16px] font-light leading-[1.85] text-white/85 max-w-[330px] mb-5" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
            He is <strong className="text-cyan-400 font-normal">not just a coder</strong>. He is something more — a silent architect, a fearless innovator. Building scalable platforms & AI-driven systems from scratch.
          </p>

          {/* divider */}
          <div className="w-11 h-px bg-gradient-to-r from-cyan-400 to-transparent my-4 lg:my-6" />

          {/* quote */}
          <blockquote className="italic font-['Cormorant_Garamond',serif] text-[17px] font-light leading-[1.72] text-white/90 mb-8 lg:mb-11 pl-5 border-l-2 border-cyan-900 max-w-[310px] text-left" style={{ textShadow: "0 2px 5px rgba(0,0,0,0.9)" }}>
            "I build what others imagine."
          </blockquote>

          {/* button */}
          <Link href="/projects">
            <span className="inline-flex items-center gap-3.5 font-['Cinzel',serif] text-[9.5px] font-bold tracking-[0.4em] text-white bg-white/5 border border-cyan-500/50 px-7 py-4 cursor-pointer backdrop-blur-sm hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(100,180,255,0.3)] transition-all duration-300 uppercase">
              VIEW MY WORK <span className="text-[13px]">→</span>
            </span>
          </Link>

          {/* mobile stats row */}
          <div className="flex items-center gap-8 mt-10 lg:hidden">
            <div className="text-center">
              <div className="font-['Cinzel',serif] text-[28px] font-black text-cyan-400 leading-none">15+</div>
              <div className="font-['Cinzel',serif] text-[7px] tracking-[0.3em] text-white/60 mt-1 uppercase">Projects</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="font-['Cinzel',serif] text-[28px] font-black text-cyan-400 leading-none">4+</div>
              <div className="font-['Cinzel',serif] text-[7px] tracking-[0.3em] text-white/60 mt-1 uppercase">Paid Roles</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="font-['Cinzel',serif] text-[28px] font-black text-cyan-400 leading-none">18+</div>
              <div className="font-['Cinzel',serif] text-[7px] tracking-[0.3em] text-white/60 mt-1 uppercase">Certs</div>
            </div>
          </div>
        </div>

        {/* ═══ CENTER HINT (absolute positioned) ═══ */}
        <div className="hidden lg:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="font-['Cinzel',serif] text-[8px] tracking-[0.35em] text-white/60 animate-pulse uppercase" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>
            MOVE CURSOR — REVEAL THE VISION
          </p>
        </div>

        {/* ═══ CENTER COLUMN ═══ */}
        <div className="hidden lg:block relative z-10 pointer-events-none">
        </div>

        {/* ═══ RIGHT COLUMN (hidden on mobile) ═══ */}
        <div className="hidden lg:flex flex-col justify-center items-end text-right pr-10 sm:pr-14 lg:pr-20 pb-28 lg:pb-0 relative z-10">
          {/* stat number */}
          <div className="font-['Cinzel',serif] text-[52px] font-black text-cyan-400 leading-none tracking-tight" style={{ textShadow: "0 4px 15px rgba(0,0,0,0.9)" }}>
            15+
          </div>
          <div className="font-['Cinzel',serif] text-[8px] tracking-[0.42em] text-white/70 mt-1 mb-9 uppercase">
            SHIPPED PROJECTS
          </div>

          {/* section */}
          <p className="font-['Cinzel',serif] text-[8.5px] tracking-[0.42em] text-cyan-400/90 mb-3 uppercase" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>
            THE STACK
          </p>
          <p className="font-['Cormorant_Garamond',serif] text-[16px] font-light leading-[1.85] text-white/85 max-w-[320px] mb-5" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
            Beneath the code lives a <strong className="text-cyan-400 font-normal">problem solver</strong>. Every project tells a story. Every challenge shapes the developer.
          </p>

          {/* divider */}
          <div className="w-11 h-px bg-gradient-to-l from-cyan-400 to-transparent my-6 ml-auto" />

          {/* legend */}
          <p className="font-['Cinzel',serif] text-[8.5px] tracking-[0.42em] text-cyan-400/90 mb-3 uppercase" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>
            THE APPROACH
          </p>
          <ul className="flex flex-col gap-3 mb-4 items-end">
            {["React, Next.js, Flutter — Frontend", "FastAPI, NestJS, Node — Backend", "PostgreSQL, MongoDB, Supabase — Data", "4 paid roles & international clients"].map((item) => (
              <li key={item} className="flex items-start gap-3 font-['Cormorant_Garamond',serif] text-[14px] font-light text-white/85 leading-[1.62]" style={{ textShadow: "0 2px 5px rgba(0,0,0,0.9)" }}>
                {item}
                <span className="block flex-shrink-0 w-[18px] h-px bg-cyan-400/70 mt-[11px]" />
              </li>
            ))}
          </ul>

          <p className="font-['Cinzel',serif] text-[8px] tracking-[0.35em] text-white/60 mt-9 uppercase">
            EXPLORE THE PROJECTS ABOVE
          </p>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70">
          <span className="font-['Cinzel',serif] text-[7px] tracking-[0.42em] text-white uppercase">SCROLL</span>
          <div className="w-px h-7 lg:h-9 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── BENTO GRID (stats + highlights) ────────────────────── */}
      <section className="py-20 sm:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[150px] gap-4"
          >
            {/* Big intro tile — spans 2 cols + 2 rows */}
            <div className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/15 via-violet-600/10 to-transparent p-7 flex flex-col justify-between group">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl breathe" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60 mb-4">
                  <BrainCircuit className="h-3.5 w-3.5" /> who_am_i
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  Building digital products that feel as good as they look.
                </h3>
              </div>
              <Link href="/about" className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 hover:gap-3 transition-all w-fit">
                More about me <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`relative group rounded-3xl border ${stat.border} bg-gradient-to-br ${stat.bg} backdrop-blur-sm p-5 flex flex-col justify-between overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className={`w-10 h-10 rounded-xl bg-card/50 flex items-center justify-center border ${stat.border} relative`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="relative">
                    <div className={`font-display text-3xl sm:text-4xl font-bold ${stat.color} tabular-nums leading-none`}>
                      <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-1.5">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── SKILLS (split heading + dual marquee) ─────────────── */}
      <section className="py-20 sm:py-24 overflow-hidden border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-12">
          <div className="grid md:grid-cols-12 gap-6 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="md:col-span-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
                <Zap className="h-3.5 w-3.5" />
                tech_stack
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
                Tools I build with,
                <br />
                <span className="text-gradient-animate">every single day.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="md:col-span-4 md:text-right"
            >
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                A modern stack spanning frontend, backend, cloud &amp; AI — picked for
                speed, scale and clean DX.
              </p>
              <Link href="/achievements">
                <Button variant="outline" className="group rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/5">
                  All Skills &amp; Certs
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* marquee row 1 → */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-3 marquee-track">
            {[...skillMarqueeItems, ...skillMarqueeItems].map((skill, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default group"
              >
                <skill.Icon style={{ color: skill.color }} className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground whitespace-nowrap group-hover:text-primary transition-colors duration-300">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* marquee row 2 ← (reverse) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-3 marquee-track-reverse">
            {[...skillMarqueeItems].reverse().concat([...skillMarqueeItems].reverse()).map((skill, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default group"
              >
                <skill.Icon style={{ color: skill.color }} className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap group-hover:text-primary transition-colors duration-300">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="py-20 sm:py-28 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-medium mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  selected_work
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
                  Featured
                  <br />
                  <span className="text-gradient-animate">Projects</span>
                </h2>
              </div>
              <Link href="/projects" className="hidden sm:block">
                <Button variant="outline" className="group rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/5" data-testid="button-view-all-projects-top">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative"
                  data-testid={`featured-project-${project.id}`}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  <SpotlightCard glowColor="rgba(99,102,241,0.16)" className="relative h-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300">
                    {/* top gradient bar */}
                    <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

                    {/* project banner image or gradient fallback */}
                    <div className="w-full h-44 flex items-center justify-center relative overflow-hidden">
                      {projectDetails[project.id]?.banner ? (
                        <img
                          src={projectDetails[project.id].banner}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-cyan-500/10 flex items-center justify-center relative">
                          <div className="absolute inset-0">
                            <div className="absolute top-3 left-3 w-24 h-24 rounded-full bg-blue-500/20 blur-2xl" />
                            <div className="absolute bottom-3 right-3 w-20 h-20 rounded-full bg-violet-500/20 blur-2xl" />
                          </div>
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <FolderOpen className="h-16 w-16 text-primary/40" />
                          </motion.div>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                        <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                          ✦ Featured
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5 border border-border/50">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs px-2 py-0.5 border border-border/50">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="h-8 text-xs bg-gradient-to-r from-blue-600 to-violet-600 border-0">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Live Demo
                            </Button>
                          </a>
                        )}
                        {projectDetails[project.id]?.playStoreUrl && (
                          <a href={projectDetails[project.id].playStoreUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="h-8 text-xs border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10">
                              <Smartphone className="h-3 w-3 mr-1" />
                              Play Store
                            </Button>
                          </a>
                        )}
                        {projectDetails[project.id]?.apkUrl && (
                          <a href={projectDetails[project.id].apkUrl} download>
                            <Button size="sm" variant="outline" className="h-8 text-xs border-green-500/40 text-green-600 dark:text-green-400 hover:bg-green-500/10">
                              <Download className="h-3 w-3 mr-1" />
                              APK
                            </Button>
                          </a>
                        )}
                        {projectDetails[project.id]?.slug && (
                          <Link href={`/projects/${projectDetails[project.id].slug}`}>
                            <Button size="sm" variant="outline" className="h-8 text-xs border-primary/30 text-primary hover:bg-primary/10">
                              <Info className="h-3 w-3 mr-1" />
                              More Info
                            </Button>
                          </Link>
                        )}
                        {project.githubUrl && !projectDetails[project.id]?.slug && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="h-8 text-xs border-border/60">
                              <SiGithub className="h-3 w-3 mr-1" />
                              Code
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mt-12 sm:hidden"
            >
              <Link href="/projects">
                <Button variant="outline" className="group rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/5" data-testid="button-view-all-projects">
                  View All Projects
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── CTA (bordered showcase card) ───────────────────────── */}
      <section className="py-20 sm:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="conic-border relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0e17]"
          >
            {/* glow blobs */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"
            />
            {/* dot grid */}
            <div className="hero-dot-grid opacity-40" />

            <div className="relative px-6 py-16 sm:px-14 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-mono font-medium mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                open_for_work
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-5 leading-[0.95] text-white">
                Let's build something
                <br />
                <span className="text-gradient-animate">amazing together.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto">
                I'm open to internships, freelance projects, and collaborations.
                Let's turn your ideas into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic strength={0.4}>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="shine group bg-white text-black hover:bg-white/90 border-0 font-semibold px-8 h-12 rounded-full w-full sm:w-auto transition-all duration-300"
                      data-testid="button-get-in-touch"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Get In Touch
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/40 font-semibold px-8 h-12 rounded-full w-full sm:w-auto transition-all duration-300"
                      data-testid="button-view-services"
                    >
                      View Services
                    </Button>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
