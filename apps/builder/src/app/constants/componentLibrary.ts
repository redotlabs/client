import {
  COMPONENT_TYPES,
  type PageData,
} from '@/app/types/component';

export const initialPageData: PageData = {
  components: [
    {
      id: 'text-1',
      type: COMPONENT_TYPES.TEXT,
      content: '제목 텍스트',
      gridPosition: { rowStart: 8, colStart: 6, rowEnd: 12, colEnd: 24 },
      style: {},
    },
    {
      id: 'text-2',
      type: COMPONENT_TYPES.TEXT,
      content: '부제목 텍스트',
      gridPosition: { rowStart: 16, colStart: 6, rowEnd: 20, colEnd: 20 },
      style: {},
    },
  ],
};

// CSS Grid 레이아웃 설정
export const CSS_GRID_CONFIG = {
  ROWS: 48,
  COLS: 48,
  ROW_HEIGHT: '24px',
  COL_WIDTH: '1fr',
  GAP: '4px',
};
