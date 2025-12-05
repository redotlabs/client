import type { Section, GridConfig } from '@repo/renderer';

export interface EditorData {
  gridConfig: GridConfig;
  sections: Section[];
  metadata?: {
    version: string;
    lastModified: string;
    title?: string;
    description?: string;
  };
}
