import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ArrowLeft, Clock, Tag, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import type { BlogPost } from "@shared/schema";
import { SEO } from "@/components/seo";
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

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts/slug", slug],
    queryFn: async () =>
      (portfolioData.blogPosts.find((b) => b.slug === slug) ?? null) as any,
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h1 className="text-3xl font-black mb-3">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-blue-600 to-violet-600 border-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const mins = readingTime(blogPost.content);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <SEO
        title={blogPost.title}
        description={blogPost.excerpt}
        keywords={blogPost.tags.join(", ")}
        url={`https://kartiksharma.site/blog/${blogPost.slug}`}
        ogImage={blogPost.coverImage || "https://kartiksharma.site/profile.png"}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": blogPost.title,
          "description": blogPost.excerpt,
          "url": `https://kartiksharma.site/blog/${blogPost.slug}`,
          "image": blogPost.coverImage || "https://kartiksharma.site/favicon.png",
          "author": {
            "@type": "Person",
            "name": "Kartik Sharma",
            "url": "https://kartiksharma.site"
          },
          "publisher": {
            "@type": "Person",
            "name": "Kartik Sharma"
          },
          "datePublished": blogPost.publishedAt ? new Date(blogPost.publishedAt).toISOString() : undefined,
          "dateModified": blogPost.updatedAt ? new Date(blogPost.updatedAt).toISOString() : undefined,
          "keywords": blogPost.tags.join(", "),
          "wordCount": blogPost.content.split(/\s+/).length,
          "timeRequired": `PT${mins}M`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 group hover:bg-primary/10 hover:text-primary transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Cover image */}
          {blogPost.coverImage && (
            <div className="aspect-video w-full overflow-hidden rounded-2xl mb-10 border border-border/50 shadow-xl">
              <img
                src={blogPost.coverImage}
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {blogPost.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[i % tagColors.length]}`}
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              {blogPost.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border/50">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-border">
                  <img src="/favicon.png" alt="Kartik Sharma" className="w-full h-full object-cover" />
                </div>
                <span className="font-medium text-foreground">Kartik Sharma</span>
              </div>
              {blogPost.publishedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <time>{new Date(blogPost.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
                  </span>
                </>
              )}
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {mins} min read
              </span>
            </div>
          </header>

          {/* Excerpt callout */}
          <div className="relative rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 mb-10">
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-full" />
            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed pl-2">
              {blogPost.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-p:text-muted-foreground prose-p:leading-relaxed prose-code:text-cyan-400 prose-pre:bg-card prose-pre:border prose-pre:border-border/50">
            <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-base sm:text-lg">
              {blogPost.content}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs border border-border/50">
                  #{tag}
                </Badge>
              ))}
            </div>
            <Link href="/blog">
              <Button variant="outline" className="border-border/60 hover:border-primary/40 hover:bg-primary/5 group shrink-0">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                More Articles
              </Button>
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
