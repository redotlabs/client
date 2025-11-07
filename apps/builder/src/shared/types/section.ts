import type { BuilderBlock } from "./blocks";

/**
 * Section
 * 빌더의 섹션 단위 - 블록들을 그룹화하는 독립적인 영역
 * gridConfig는 전역적으로 모든 섹션에 동일하게 적용됨
 */
export interface Section {
  id: string;
  name: string;
  blocks: BuilderBlock[];
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
}
