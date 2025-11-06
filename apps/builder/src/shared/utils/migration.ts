import type { BuilderBlock, GridConfig, Section, EditorData } from "@/shared/types";

/**
 * 임시 ID 생성 함수 (추후 라이브러리로 교체 가능)
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 레거시 EditorData 타입 (마이그레이션용)
 */
interface LegacyEditorData {
  grid: GridConfig;
  blocks: BuilderBlock[];
  metadata?: {
    version: string;
    lastModified: string;
    title?: string;
    description?: string;
  };
}

/**
 * 레거시 EditorData를 Section 기반 구조로 변환
 * @param legacyData - 기존 grid + blocks 구조의 데이터
 * @returns Section 기반 EditorData
 */
export function migrateLegacyEditorData(
  legacyData: LegacyEditorData
): EditorData {
  const now = new Date().toISOString();

  // 기존 데이터를 첫 번째 섹션으로 변환
  const defaultSection: Section = {
    id: generateId(),
    name: "Section 1",
    blocks: legacyData.blocks,
    order: 0,
    metadata: {
      createdAt: now,
      updatedAt: now,
    },
  };

  return {
    gridConfig: legacyData.grid,
    sections: [defaultSection],
    metadata: legacyData.metadata,
  };
}

/**
 * 빈 섹션 생성
 * @param name - 섹션 이름
 * @param order - 섹션 순서
 * @returns 새로운 Section 객체
 */
export function createEmptySection(
  name: string = "New Section",
  order: number = 0
): Section {
  const now = new Date().toISOString();

  return {
    id: generateId(),
    name,
    blocks: [],
    order,
    metadata: {
      createdAt: now,
      updatedAt: now,
    },
  };
}
