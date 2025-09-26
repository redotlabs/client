import {
  COMPONENT_TYPES,
  type ComponentLibraryItem,
  type PageData,
} from '@/app/types/component';

export const componentLibrary: ComponentLibraryItem[] = [
  {
    id: 'text-comp',
    type: COMPONENT_TYPES.TEXT,
    label: '📝 텍스트',
    defaultContent: '새로운 텍스트',
    defaultSize: { width: 200, height: 40 },
  },
  {
    id: 'image-comp',
    type: COMPONENT_TYPES.IMAGE,
    label: '🖼️ 이미지',
    defaultContent: 'https://via.placeholder.com/300x150?text=이미지',
    defaultSize: { width: 300, height: 150 },
  },
  {
    id: 'button-comp',
    type: COMPONENT_TYPES.BUTTON,
    label: '🔘 버튼',
    defaultContent: '버튼',
    defaultSize: { width: 120, height: 40 },
  },
];

export const initialPageData: PageData = {
  components: [
    {
      id: 'text-1',
      type: COMPONENT_TYPES.TEXT,
      content: '제목 텍스트',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 40 },
      style: {},
    },
    {
      id: 'text-2',
      type: COMPONENT_TYPES.TEXT,
      content: '부제목 텍스트',
      position: { x: 100, y: 160 },
      size: { width: 180, height: 30 },
      style: {},
    },
  ],
};

export const GRID_CONFIG = {
  SIZE: 30,
  COLS: 50,
};
