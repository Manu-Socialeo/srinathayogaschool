import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = 'https://srinathayogaschool.com';
const DEFAULT_TITLE = 'Srinatha Yoga School — Online Yoga Classes from Mysore, India';
const DEFAULT_DESCRIPTION = 'Learn authentic yoga online with Dr. Balasundara Srinatha. RYS 500 certified school offering Ashtanga, Hatha, Iyengar & Vinyasa yoga classes, workshops, and retreats from Mysore, India.';
const DEFAULT_OG_IMAGE = '/logo.png';

function setMeta(name: string, content: string, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setPropertyMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    const title = config.title ? `${config.title} — Srinatha Yoga School` : DEFAULT_TITLE;
    const description = config.description || DEFAULT_DESCRIPTION;
    const canonical = `${SITE_URL}${config.canonicalPath || '/'}`;
    const ogImage = config.ogImage || DEFAULT_OG_IMAGE;

    // Document title
    document.title = title;

    // Core meta
    setMeta('description', description);
    if (config.keywords) setMeta('keywords', config.keywords);
    setMeta('robots', config.noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    // Open Graph
    setPropertyMeta('og:type', config.ogType || 'website');
    setPropertyMeta('og:title', title);
    setPropertyMeta('og:description', description);
    setPropertyMeta('og:image', ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`);
    setPropertyMeta('og:url', canonical);
    setPropertyMeta('og:site_name', 'Srinatha Yoga School');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`);

    // JSON-LD
    let jsonLdEl = document.querySelector('script[data-jsonld="true"]') as HTMLScriptElement;
    if (!jsonLdEl) {
      jsonLdEl = document.createElement('script');
      jsonLdEl.setAttribute('type', 'application/ld+json');
      jsonLdEl.setAttribute('data-jsonld', 'true');
      document.head.appendChild(jsonLdEl);
    }
    if (config.jsonLd) {
      jsonLdEl.textContent = JSON.stringify(config.jsonLd);
    } else {
      jsonLdEl.textContent = '';
    }

    // Cleanup on unmount
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [config]);
}
