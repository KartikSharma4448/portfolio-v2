import { GraduationCap, Briefcase, MapPin, Sparkles, Calendar, Building2, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Magnetic } from "@/components/motion-primitives";
import { SEO } from "@/components/seo";
import { pageKeywords, personSchema } from "@/lib/seo-keywords";
import { portfolioData } from "@/data/portfolio-data";
import type { AboutContent } from "@shared/schema";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const { data: aboutContent, isLoading } = useQuery<AboutContent | null>({
    queryKey: ["/api/about-content"],
    queryFn: async () => portfolioData.aboutContent as any,
  });

  const defaultEducation = [
    {
      institution: "Vivekananda Global University",
      degree: "Bachelor in Computer Applications (BCA)",
      specialization: "Full Stack and Cloud Computing",
      duration: "Sep 2024 - Jul 2027",
      grade: "9.43 CGPA",
    },
    {
      institution: "A.S. Public Senior Secondary School",
      degree: "12th Grade",
      specialization: "Science (Mathematics)",
      duration: "Completed",
      grade: "96%",
    },
  ];

  const defaultExperience = [
    {
      role: "Computer Teacher",
      company: "Anukriti Prakashan",
      type: "Part-time",
      duration: "Mar 2025 - Present",
      location: "Jaipur, Rajasthan, India",
      description:
        "Teaching computer fundamentals and modern technologies to students, developing curriculum materials, and fostering digital literacy.",
    },
    {
      role: "Computer Teacher",
      company: "InfoSphere",
      type: "Part-time",
      duration: "Sep 2024 - Aug 2025",
      location: "Jaipur, Rajasthan, India",
      description:
        "Taught the RS-CIT course, focusing on computer fundamentals and digital literacy. Designed engaging lessons and provided hands-on training.",
    },
    {
      role: "Back End Developer",
      company: "Zenz Aawara",
      type: "Internship",
      duration: "May 2025 - Jul 2025",
      location: "Jaipur, Rajasthan, India (Hybrid)",
      description:
        "Contributed to backend development by designing and optimizing server-side code while building RESTful APIs for effective data management.",
    },
  ];

  const getEducation = () => {
    try {
      return (aboutContent as any)?.educationJson
        ? JSON.parse((aboutContent as any).educationJson)
        : defaultEducation;
    } catch {
      return defaultEducation;
    }
  };

  const getExperience = () => {
    try {
      return (aboutContent as any)?.experienceJson
        ? JSON.parse((aboutContent as any).experienceJson)
        : defaultExperience;
    } catch {
      return defaultExperience;
    }
  };

  const education = getEducation();
  const experience = getExperience();

  const quickStats = [
    { label: "CGPA", value: "9.43" },
    { label: "Projects", value: "5+" },
    { label: "Roles", value: "3" },
  ];

  const typeColors: Record<string, string> = {
    "Part-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Internship: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Full-time": "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <SEO
        title="About — Full Stack Developer from Jaipur"
        description="Kartik Sharma is a Full Stack Developer and founder of CodeUpPath from Jaipur, India. BCA student building scalable web apps, AI-driven systems and digital products. 9.43 CGPA."
        keywords={pageKeywords.about}
        url="https://kartiksharma.site/about"
        type="profile"
        schema={personSchema}
      />
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">

        {/* ═══ HERO — big photo left, intro right ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid md:grid-cols-12 gap-8 lg:gap-10 items-center mb-20"
        >
          {/* Photo */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-600/30 via-violet-600/20 to-transparent blur-2xl breathe" />
              <div className="conic-border relative rounded-[1.75rem] overflow-hidden border border-white/10 w-60 h-72 sm:w-72 sm:h-80">
                <img
                  src="/profile.png"
                  alt="Kartik Sharma"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/favicon.png"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-mono text-white/80">open to work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="md:col-span-7 text-center md:text-left">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-64 rounded-md" />
                <Skeleton className="h-5 w-48 rounded-md" />
                <Skeleton className="h-20 w-full rounded-md" />
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  about_me
                </div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] mb-4">
                  {aboutContent?.title || "Hey, I'm Kartik."}
                </h1>
                {aboutContent?.subtitle && (
                  <p className="text-blue-400 font-semibold text-lg mb-3">{aboutContent.subtitle}</p>
                )}
                <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0 mb-6">
                  {aboutContent?.description ||
                    "BCA student building a strong foundation in programming, web development, cloud computing, and modern technologies — passionate about creating elegant digital solutions."}
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-7">
                  <Badge className="flex items-center gap-1 bg-muted text-muted-foreground border border-border/60">
                    <MapPin className="h-3 w-3" /> Jaipur, Rajasthan
                  </Badge>
                  <Badge className="flex items-center gap-1 bg-muted text-muted-foreground border border-border/60">
                    <GraduationCap className="h-3 w-3" /> BCA Student
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Magnetic strength={0.4}>
                    <Link href="/contact">
                      <Button className="shine rounded-full">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Hire Me
                      </Button>
                    </Link>
                  </Magnetic>
                  <a href="/Kartik_Sharma_CV.pdf" download="Kartik_Sharma_CV.pdf" data-testid="button-download-cv">
                    <Button variant="outline" className="rounded-full border-chart-2/40 text-chart-2 hover:bg-chart-2/10 hover:text-chart-2 hover:border-chart-2/60">
                      <Download className="h-4 w-4 mr-2" />
                      Download CV
                    </Button>
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* ═══ QUICK STATS strip ════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-4 mb-20"
        >
          {quickStats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 text-center"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-animate leading-none">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-2 font-mono">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ═══ PROFESSIONAL SUMMARY — quote style ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="relative mb-24 pl-6 sm:pl-8 border-l-2 border-primary/40"
        >
          <Sparkles className="absolute -left-[13px] top-0 h-6 w-6 text-primary bg-background rounded-full p-0.5" />
          <h2 className="font-display text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5">Professional Summary</h2>
          <div className="space-y-4 text-lg sm:text-xl text-foreground/80 leading-relaxed font-light">
            {(aboutContent as any)?.professionalSummary ? (
              <p>{(aboutContent as any).professionalSummary}</p>
            ) : (
              <>
                <p>
                  My academic curriculum has given me hands-on exposure to{" "}
                  <span className="text-foreground font-medium">C, Python, and Java</span>, plus
                  practical knowledge in web development, databases, and cloud computing.
                </p>
                <p>
                  I love applying theory to real projects — gaining experience through internships
                  and teaching roles that sharpened both my{" "}
                  <span className="text-foreground font-medium">technical and communication skills</span>.
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* ═══ JOURNEY TIMELINE (education + experience) ════════ */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
              <Calendar className="h-3.5 w-3.5" />
              my_journey
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter">
              Education &amp; <span className="text-gradient-animate">Experience</span>
            </h2>
          </motion.div>

          {/* timeline */}
          <div className="relative pl-8 sm:pl-10">
            {/* vertical line */}
            <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-violet-500/40 to-transparent" />

            {/* Experience entries */}
            {experience.map((exp: any, index: number) => (
              <motion.div
                key={`exp-${index}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative mb-8 group"
              >
                {/* node */}
                <div className="absolute -left-8 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="h-3 w-3 text-purple-400" />
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 sm:p-6 hover:border-purple-400/40 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-lg font-bold leading-tight">{exp.role}</h3>
                      <p className="text-primary font-medium text-sm">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{exp.duration}</span>
                      <Badge className={`border text-xs ${typeColors[exp.type] || "bg-muted text-muted-foreground border-border/50"}`}>
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Education entries */}
            {education.map((edu: any, index: number) => (
              <motion.div
                key={`edu-${index}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative mb-8 group"
              >
                {/* node */}
                <div className="absolute -left-8 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-3 w-3 text-blue-400" />
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 sm:p-6 hover:border-blue-400/40 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-1">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-tight">{edu.institution}</h3>
                        <p className="text-muted-foreground font-medium text-sm">{edu.degree}</p>
                        {edu.specialization && (
                          <p className="text-xs text-muted-foreground mt-0.5">{edu.specialization}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0 ml-12 sm:ml-0">
                      <span className="text-xs font-mono text-muted-foreground">{edu.duration}</span>
                      <Badge className="bg-chart-2/10 text-chart-2 border border-chart-2/20 text-xs">
                        🎓 {edu.grade}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ CTA — based in Jaipur ════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="conic-border relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0e17] p-10 sm:p-14 text-center"
        >
          <div className="hero-dot-grid opacity-40" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
              <MapPin className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">Based in Jaipur, India</h3>
            <p className="text-slate-400 mb-7 max-w-md mx-auto">
              Open to remote and on-site opportunities. Let's create something great together.
            </p>
            <Magnetic strength={0.4}>
              <Link href="/contact">
                <Button className="shine bg-white text-black hover:bg-white/90 rounded-full px-7 h-12 font-semibold group">
                  Get In Touch
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
