import React from 'react';

export const COMPONENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  ROW: 'row',
  COLUMN: 'column',
  SECTION: 'section',
} as const;

export type ComponentType =
  (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];

export interface GridPosition {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

export interface Component {
  id: string;
  type: ComponentType;
  content: string;
  gridPosition: GridPosition;
  style: React.CSSProperties;
}

export interface PageData {
  components: Component[];
}
