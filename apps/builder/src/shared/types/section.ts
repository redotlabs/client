import type { BuilderBlock } from "./blocks";
import type { GridConfig } from "./blocks/position";

/**
 * Section
 * 빌더의 섹션 단위 - 블록들을 그룹화하고 독립적인 그리드를 가짐
 */
export interface Section {
  id: string;
  name: string;
  gridConfig: GridConfig;
  blocks: BuilderBlock[];
  order: number;
  metadata?: {
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Section 생성을 위한 입력 타입
 */
export interface CreateSectionInput {
  name?: string;
  gridConfig?: GridConfig;
  order?: number;
}
