import type { EditorData } from '@/shared/types';

export const DEFAULT_GRID_CONFIG = {
  columns: 48,
  rows: 48,
  rowHeight: 24,
  gap: 4,
};

export const initialEditorData: EditorData = {
  grid: DEFAULT_GRID_CONFIG,
  blocks: [
    {
      id: 'block-1',
      type: 'text',
      position: {
        x: 6,
        y: 8,
        zIndex: 1,
      },
      size: {
        width: 18,
        height: 4,
      },
      attributes: {
        text: '제목 텍스트',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1f2937',
      },
      metadata: {
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },

    {
      id: 'block-2',
      type: 'text',
      position: {
        x: 6,
        y: 16,
        zIndex: 1,
      },
      size: {
        width: 14,
        height: 4,
      },
      attributes: {
        text: '부제목 텍스트',
        fontSize: 16,
        textAlign: 'left',
        color: '#6b7280',
      },
      metadata: {
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },

    {
      id: 'block-3',
      type: 'image',
      position: {
        x: 28,
        y: 8,
        zIndex: 1,
      },
      size: {
        width: 12,
        height: 8,
      },
      attributes: {
        src: 'https://picsum.photos/400/600',
        alt: 'Example Image',
        objectFit: 'cover',
        borderRadius: 8,
      },
      metadata: {
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },

    {
      id: 'block-4',
      type: 'button',
      position: {
        x: 6,
        y: 24,
        zIndex: 1,
      },
      size: {
        width: 8,
        height: 3,
      },
      attributes: {
        text: 'Click Me',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderRadius: 6,
        onClick: 'button_click_action',
      },
      metadata: {
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  ],
  metadata: {
    version: '1.0.0',
    lastModified: '2024-01-01T00:00:00.000Z',
    title: 'Sample Editor Page',
    description: 'Example page with various block types',
  },
};

