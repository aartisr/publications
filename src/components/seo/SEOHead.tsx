import React, { useEffect } from 'react';
import { Publication } from '../../types';
import { discoverabilityService } from '../../services/discoverabilityService';

interface SEOHeadProps {
  publication?: Publication | null;
}

/**
 * SEOHead - Dynamic DOM Head injector for SEO, GEO, AIO, AEI, AXO,
 * OpenGraph, Twitter Cards, Highwire Press, Dublin Core, and Schema.org JSON-LD.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({ publication }) => {
  useEffect(() => {
    const meta = discoverabilityService.getMetadata(publication);

    // 1. Update Title
    document.title = meta.title;

    // Helper to set or update meta tags by name or property
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Helper to set or update link rel canonical
    const setCanonicalLink = (href: string) => {
      let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // 2. Set Standard & OpenGraph Metas
    setMetaTag('name', 'description', meta.description);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:url', meta.canonicalUrl);
    setMetaTag('property', 'og:site_name', 'Aarti Sri Ravikumar Academic Archive');
    setMetaTag('property', 'og:image', meta.ogImage);

    // 3. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', meta.ogImage);
    setMetaTag('name', 'twitter:creator', '@aartisr');

    // 4. Canonical URL
    setCanonicalLink(meta.canonicalUrl);

    // 5. Highwire Press Academic Meta Tags (Google Scholar / CrossRef)
    Object.entries(meta.highwirePressTags).forEach(([name, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => setMetaTag('name', name, v));
      } else {
        setMetaTag('name', name, val);
      }
    });

    // 6. Dublin Core Tags
    Object.entries(meta.dublinCoreTags).forEach(([name, val]) => {
      setMetaTag('name', name, val);
    });

    // 7. Inject Schema.org JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
    existingScripts.forEach((s) => s.remove());

    meta.jsonLdSchemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic', 'true');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

    return () => {
      // Clean up dynamic JSON-LD on unmount
      const cleanupScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
      cleanupScripts.forEach((s) => s.remove());
    };
  }, [publication]);

  return null;
};
