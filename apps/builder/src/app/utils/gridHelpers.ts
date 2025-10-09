import type { GridPosition } from '@/app/types/component';

// Grid Area 문자열 생성 (CSS grid-area 속성용)
export const generateGridArea = (gridPosition: GridPosition): string => {
  return `${gridPosition.rowStart} / ${gridPosition.colStart} / ${gridPosition.rowEnd} / ${gridPosition.colEnd}`;
};

// Grid Area 문자열을 GridPosition으로 파싱
export const parseGridArea = (gridArea: string): GridPosition => {
  const [rowStart, colStart, rowEnd, colEnd] = gridArea
    .split(' / ')
    .map(Number);
  return { rowStart, colStart, rowEnd, colEnd };
};

// 그리드 셀이 비어있는지 확인
export const isGridAreaAvailable = (
  gridPosition: GridPosition,
  occupiedAreas: GridPosition[]
): boolean => {
  return !occupiedAreas.some((area) => {
    // 영역이 겹치는지 확인
    return !(
      gridPosition.rowEnd <= area.rowStart ||
      gridPosition.rowStart >= area.rowEnd ||
      gridPosition.colEnd <= area.colStart ||
      gridPosition.colStart >= area.colEnd
    );
  });
};
