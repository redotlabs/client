export const COMPONENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  ROW: 'row',
  COLUMN: 'column',
  SECTION: 'section',
} as const;

export type ComponentType = (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];

export interface ComponentPosition {
  x: number;
  y: number;
}

export interface ComponentSize {
  width: number;
  height: number;
}

export interface Component {
  id: string;
  type: ComponentType;
  content: string;
  position: ComponentPosition;
  size: ComponentSize;
  style: Record<string, any>;
}

export interface ComponentLibraryItem {
  id: string;
  type: ComponentType;
  label: string;
  defaultContent: string;
  defaultSize: ComponentSize;
}

export interface PageData {
  components: Component[];
}

export interface DraggedItem {
  id: string;
  type?: ComponentType;
  source: 'library' | 'canvas';
  size?: ComponentSize;
  [key: string]: any;
}