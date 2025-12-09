import type { BuilderBlock } from "./block";

/**
 * Section
 * A section unit in the builder - an independent area that groups blocks
 */
export interface Section {
  id: string;
  name: string;
  blocks: BuilderBlock[];
  rows?: number;
  metadata?: {
    createdAt: string;
    updatedAt: string;
  };
}
