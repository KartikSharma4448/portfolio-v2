import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  schema?: object;
  /** Override the default " | Kartik Sharma" suffix */
  bareTitle?: boolean;
}

const SITE_NAME = 'Kartik Sharma';
const SITE_URL = 'https://kartiksharma.site';
const DEFAULT_OG = 'https://kartiksharma.site/profile.png';

export function SEO({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG,
  url = SITE_URL,
  type = 'website',
  schema,
  bareTitle = false,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = bareTitle ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (attr: string, attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // Core
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('name', 'author', SITE_NAME);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Canonical
    setLink('canonical', url);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_IN');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // JSON-LD structured data
    if (schema) {
      const id = 'page-ld-json';
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    }

    return () => {
      const ldEl = document.getElementById('page-ld-json');
      if (ldEl) ldEl.remove();
    };
  }, [title, description, keywords, ogImage, url, type, schema, bareTitle]);

  return null;
}
