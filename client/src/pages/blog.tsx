import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, ArrowRight, BookOpen, Clock, PenLine } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { SEO } from "@/components/seo";
import { pageKeywords } from "@/lib/seo-keywords";
import { portfolioData } from "@/data/portfolio-data";

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

const tagColors = [
  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "bg-orange-500/10 text-orange-400 border-orange-500/20",
];

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", { published: "true" }],
    queryFn: async () =>
      portfolioData.blogPosts.filter((p) => p.published === "true") as any,
  });

  return (
    <div className="min-h-screen pt-28 pb-20 sm:pb-24">
      <SEO
        title="Blog — Tech Insights & Tutorials"
        description="Read Kartik Sharma's blog for software development tutorials, tech insights, cloud computing tips, and web development guides. Fresh content for developers and learners."
        keywords={pageKeywords.blog}
        url="https://kartiksharma.site/blog"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Kartik Sharma — Tech Blog",
          "description": "Software development tutorials, insights, and articles",
          "url": "https://kartiksharma.site/blog",
          "author": {
            "@type": "Person",
            "name": "Kartik Sharma",
            "url": "https://kartiksharma.site"
          }
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-5">
            <PenLine className="h-3.5 w-3.5" />
            writing
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-5 leading-[0.95]">
            The
            <span className="text-gradient-animate"> Blog</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full mx-auto mb-5" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about software development, technology, and learning
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm">Loading posts...</p>
            </div>
          </div>
        ) : blogPosts && blogPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative"
              >
                {/* hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300 cursor-pointer">

                    {/* top accent */}
                    <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

                    {post.coverImage ? (
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-primary/10 via-violet-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-3 left-3 w-20 h-20 bg-blue-500/15 rounded-full blur-xl" />
                        <div className="absolute bottom-3 right-3 w-16 h-16 bg-violet-500/15 rounded-full blur-xl" />
                        <BookOpen className="h-12 w-12 text-primary/30 relative" />
                      </div>
                    )}

                    <div className="p-5">
                      {/* meta */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <time>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                              : "Draft"}
                          </time>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {readingTime(post.content)} min read
                        </span>
                      </div>

                      <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${tagColors[i % tagColors.length]}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
                        Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold mb-2">No posts yet</h3>
            <p className="text-muted-foreground">New articles are coming soon — check back later!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
