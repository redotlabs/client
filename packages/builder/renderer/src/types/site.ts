import type { Section } from './section';

/**
 * Page
 * A single page within a site
 */
export interface Page {
  id: number;
  path: string;
  content: {
    sections: Section[];
  };
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
