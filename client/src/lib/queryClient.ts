import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolio-data";

/**
 * STATIC MODE
 * This portfolio ships with its content baked in at build time
 * (see client/src/data/portfolio-data.ts, generated from the database).
 * The query function below resolves all read endpoints from that static
 * data instead of hitting a backend, so the site can be deployed as a
 * pure static bundle (Cloudflare Pages / Netlify / GitHub Pages).
 */

function resolveStatic(path: string): unknown {
  // Normalise: strip query string
  const [rawPath, query] = path.split("?");
  const segments = rawPath.split("/").filter(Boolean); // e.g. ["api","projects"]

  if (segments[0] !== "api") return null;
  const resource = segments[1];
  const id = segments[2];
  const sub = segments[2]; // for /slug/:slug style

  switch (resource) {
    case "projects":
      if (id) return portfolioData.projects.find((p) => p.id === id) ?? null;
      return portfolioData.projects;

    case "certificates":
      if (id) return portfolioData.certificates.find((c) => c.id === id) ?? null;
      return portfolioData.certificates;

    case "skills":
      if (id) return portfolioData.skills.find((s) => s.id === id) ?? null;
      return portfolioData.skills;

    case "services":
      if (id) return portfolioData.services.find((s) => s.id === id) ?? null;
      return portfolioData.services;

    case "social-links":
      if (id) return portfolioData.socialLinks.find((s) => s.id === id) ?? null;
      return portfolioData.socialLinks;

    case "products":
      if (id) return portfolioData.products.find((p) => p.id === id) ?? null;
      return portfolioData.products;

    case "about-content":
      return portfolioData.aboutContent;

    case "blog-posts": {
      // /api/blog-posts/slug/:slug
      if (sub === "slug" && segments[3]) {
        return (
          portfolioData.blogPosts.find((b) => b.slug === segments[3]) ?? null
        );
      }
      // /api/blog-posts/:id
      if (id) return portfolioData.blogPosts.find((b) => b.id === id) ?? null;
      // /api/blog-posts?published=true
      const publishedOnly = /published=true/.test(query || "");
      const posts = portfolioData.blogPosts;
      return publishedOnly
        ? posts.filter((p) => p.published === "true")
        : posts;
    }

    // Auth / admin endpoints are not available in static mode
    case "user":
      return null;

    default:
      return null;
  }
}

/**
 * apiRequest — used by mutations (contact form, admin).
 * In static mode there is no server, so writes are simulated.
 * The contact form is wired separately (see contact page) to a
 * client-friendly fallback.
 */
export async function apiRequest(
  _method: string,
  _url: string,
  _data?: unknown,
): Promise<Response> {
  // Static build: no backend. Resolve as a successful no-op so the UI
  // success states still work. Real submissions should use a form service.
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  () =>
  async ({ queryKey }) => {
    const path = queryKey.join("/") as string;
    // Simulate async so loading states behave normally
    return resolveStatic(path) as any;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
