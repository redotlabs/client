import type { Section } from "./section";

/**
 * Site Metadata
 * Overall site meta information
 */
export interface SiteMetadata {
  id: string;
  name: string;
  description?: string;
  favicon?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Page
 * A single page within a site
 */
export interface Page {
  id: string;
  name: string;
  path: string;
  sections: Section[];
  metadata?: {
    title?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Site
 * Top-level data structure representing a website
 * - Multi-page support
 * - Extensible for global styles, SEO settings, etc.
 */
export interface Site {
  metadata: SiteMetadata;
  pages: Page[];
}
