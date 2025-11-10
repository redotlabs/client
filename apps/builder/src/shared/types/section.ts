import type { BuilderBlock } from "./blocks";

/**
 * Section
 * 빌더의 섹션 단위 - 블록들을 그룹화하는 독립적인 영역
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
