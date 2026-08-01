import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schemaJson?: Record<string, any>;
}

export default function SEO({
  title,
  description = "Lux Grown is the leader in ethical luxury, offering certified lab-grown diamond jewelry, engagement rings, and luxury timepieces crafted with master precision.",
  keywords = "lab grown diamonds, ethical jewelry, engagement rings, luxury watches, lab created diamonds, certified diamonds, fine jewelry",
  canonicalUrl,
  ogType = "website",
  ogImage,
  schemaJson
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://luxgrown.com';
    const currentPath = location.pathname;
    
    // Determine canonical URL
    let fullCanonical = canonicalUrl;
    if (!fullCanonical) {
      // Strip trailing slashes except for root
      const cleanPath = currentPath === '/' ? '' : currentPath.replace(/\/+$|$/g, '');
      fullCanonical = `${origin}${cleanPath}`;
    }

    // 1. Title
    const formattedTitle = title 
      ? `${title} | Lux Grown Lab Diamonds` 
      : "Lux Grown | Premium Lab-Grown Diamonds & Fine Jewelry";
    document.title = formattedTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Canonical Link Tag (Critical for GSC & SEO)
    setLinkTag('canonical', fullCanonical);

    // 3. Meta Description & Keywords
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow');

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Lux Grown');
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // 5. Twitter Meta Tags
    setMetaTag('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // 6. JSON-LD Structured Data Schema for GSC
    let scriptElement = document.querySelector('script[type="application/ld+json"]#seo-schema');
    if (schemaJson) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('id', 'seo-schema');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schemaJson);
    } else if (scriptElement) {
      // Default Organization Schema
      scriptElement.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Lux Grown Lab Diamonds",
        "url": origin,
        "logo": `${origin}/logo.png`,
        "description": "Ethical luxury lab-grown diamond fine jewelry and timepieces.",
        "sameAs": [
          "https://instagram.com",
          "https://facebook.com",
          "https://youtube.com"
        ]
      });
    }

  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schemaJson, location.pathname]);

  return null;
}
