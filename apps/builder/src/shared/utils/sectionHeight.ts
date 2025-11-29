import type { Section, BuilderBlock } from '@repo/renderer';
import {
  DEFAULT_SECTION_ROWS,
  ABSOLUTE_MIN_SECTION_ROWS,
} from '@/shared/constants/editorData';

/**
 * 섹션 내 블록들을 기반으로 필요한 최소 행 수를 계산
 */
export const calculateMinSectionRows = (blocks: BuilderBlock[]): number => {
  if (blocks.length === 0) {
    return ABSOLUTE_MIN_SECTION_ROWS;
  }

  const maxBottom = Math.max(
    ...blocks.map((block) => block.position.y + block.size.height)
  );

  const PADDING_ROWS = 3;
  const calculatedRows = maxBottom + PADDING_ROWS;

  return Math.max(calculatedRows, ABSOLUTE_MIN_SECTION_ROWS);
};

/**
 * 섹션의 실제 행 수를 반환
 */
export const getSectionRows = (section: Section): number => {
  if (section.rows !== undefined) {
    return section.rows;
  }

  return DEFAULT_SECTION_ROWS;
};
