import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Smartphone, Download, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/seo";
import { portfolioData } from "@/data/portfolio-data";
import { projectDetails, type ProjectDetail } from "@/data/project-details";

// ─── Screenshot Carousel ─────────────────────────────────────────────────────
function ScreenshotCarousel({ screenshots }: { screenshots: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!screenshots.length) return null;

  return (
    <div className="space-y-4">
      {/* Thumbnails strip */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {screenshots.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === idx
                ? "border-primary scale-105 shadow-md shadow-primary/20"
                : "border-border/40 opacity-60 hover:opacity-90"
            }`}
            style={{ width: 80, height: 148 }}
          >
            <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Full image */}
      <div className="relative rounded-2xl overflow-hidden border border-border/40 bg-muted/20 flex items-center justify-center h-[600px]">
        <motion.img
          key={idx}
          src={screenshots[idx]}
          alt={`Screenshot ${idx + 1}`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        />
        {screenshots.length > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/60 flex items-center justify-center hover:bg-background hover:scale-110 transition-all shadow-lg text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % screenshots.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/60 flex items-center justify-center hover:bg-background hover:scale-110 transition-all shadow-lg text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border/30">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === idx ? "bg-primary w-6" : "bg-border w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Play Store Badge ────────────────────────────────────────────────────────
function PlayStoreBadge({ status }: { status: ProjectDetail["playStoreStatus"] }) {
  if (!status) return null;
  const map = {
    live: { label: "▶ Play Store", cls: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30" },
    "closed-testing": { label: "🔒 Play Store — Closed Testing", cls: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
    "coming-soon": { label: "🚀 Play Store — Coming Soon", cls: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  };
  const { label, cls } = map[status];
  return <Badge className={`${cls} border text-xs font-medium px-3 py-1`}>{label}</Badge>;
}

// ─── Markdown renderer — theme-aware ─────────────────────────────────────────
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-foreground mt-8 mb-6 pb-3 border-b-2 border-border">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4 pb-2 border-b border-border/70">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground leading-[1.8] mb-4 text-[15px]">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-2 mb-5 ml-6 list-disc list-outside marker:text-primary">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-2 mb-5 ml-6 list-decimal list-outside marker:text-primary marker:font-semibold">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-muted-foreground leading-relaxed pl-1">{children}</li>
        ),
        code: ({ inline, children }: any) =>
          inline ? (
            <code className="bg-muted text-primary px-2 py-0.5 rounded text-[13px] font-mono border border-border/60 font-semibold">
              {children}
            </code>
          ) : (
            <code className="block text-foreground">{children}</code>
          ),
        pre: ({ children }) => (
          <pre className="bg-muted/60 border border-border/60 rounded-xl p-5 overflow-x-auto text-sm font-mono text-foreground mb-6 leading-relaxed shadow-sm">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6 rounded-xl border-2 border-border/70 shadow-sm bg-card">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-muted/60 border-b-2 border-border/70">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-border/40">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-muted/30 transition-colors duration-150">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="text-left px-5 py-4 text-xs font-bold text-foreground uppercase tracking-wider border-r border-border/30 last:border-r-0">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-5 py-4 text-muted-foreground font-medium border-r border-border/20 last:border-r-0">
            {children}
          </td>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/60 pl-5 py-3 my-5 bg-primary/5 rounded-r-lg text-muted-foreground">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="border-border/50 my-8" />,
        strong: ({ children }) => (
          <strong className="text-foreground font-bold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-foreground/80 italic">{children}</em>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline decoration-primary/40 underline-offset-2 hover:decoration-primary/70 transition-colors font-medium"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;

  const detailEntry = Object.entries(projectDetails).find(([, d]) => d.slug === slug);
  if (!detailEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-black mb-3">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">This project doesn't exist.</p>
          <Link href="/projects">
            <Button><ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const [projectId, detail] = detailEntry;
  const project = (portfolioData.projects as any[]).find((p) => p.id === projectId);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <SEO
        title={`${project?.title ?? "Project"} — Kartik Sharma`}
        description={project?.description ?? ""}
        keywords={(project?.technologies ?? []).join(", ")}
        url={`https://kartiksharma.site/projects/${slug}`}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/projects">
            <Button variant="ghost" className="mb-8 group hover:bg-primary/10 hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-10"
        >
          {/* Banner */}
          {detail.banner && (
            <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-border/40 shadow-xl">
              <img src={detail.banner} alt={project?.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Header */}
          <div className="flex items-start gap-5">
            {detail.logo && (
              <img
                src={detail.logo}
                alt="logo"
                className="w-16 h-16 rounded-2xl object-contain bg-muted border border-border/40 p-1.5 flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3 text-foreground">
                {project?.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-3">
                {detail.playStoreStatus && <PlayStoreBadge status={detail.playStoreStatus} />}
                {detail.liveUrl && (
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 text-xs px-3 py-1">
                    🌐 Live Website
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">{project?.description}</p>
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {(project?.technologies ?? []).map((tech: string, i: number) => (
                <Badge key={i} variant="secondary" className="text-xs border border-border/50 px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {detail.liveUrl && (
              <a href={detail.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button className="shadow-sm shadow-primary/20">
                  <Globe className="h-4 w-4 mr-2" />
                  Live Website
                </Button>
              </a>
            )}
            {detail.apkUrl && (
              <a href={detail.apkUrl} download>
                <Button variant="outline" className="border-green-500/40 text-green-600 dark:text-green-400 hover:bg-green-500/10">
                  <Download className="h-4 w-4 mr-2" />
                  Download APK
                </Button>
              </a>
            )}
            {detail.playStoreUrl && (
              <a href={detail.playStoreUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Play Store
                </Button>
              </a>
            )}
            {!detail.playStoreUrl && detail.playStoreStatus === "closed-testing" && (
              <Button variant="outline" disabled>
                <Smartphone className="h-4 w-4 mr-2" />
                Play Store (Closed Testing)
              </Button>
            )}
            {project?.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>
            )}
          </div>

          {/* Screenshots - Full Width */}
          {detail.screenshots && detail.screenshots.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary inline-block" />
                Screenshots
              </h2>
              <ScreenshotCarousel screenshots={detail.screenshots} />
            </div>
          )}

          {/* Overview Section */}
          {detail.readme && (
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary inline-block" />
                Overview
              </h2>
              <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
                <MarkdownContent content={detail.readme} />
              </div>
            </div>
          )}

          {/* Technical Documentation */}
          {detail.technical && (
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary inline-block" />
                Technical Documentation
              </h2>
              <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
                <MarkdownContent content={detail.technical} />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-6 border-t border-border/40">
            <Link href="/projects">
              <Button variant="outline" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
