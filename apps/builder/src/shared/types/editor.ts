import type { Section } from "@/shared/types/section";

export interface EditorData {
  sections: Section[];
  metadata?: {
    version: string;
    lastModified: string;
    title?: string;
    description?: string;
  };
}
