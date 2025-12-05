export interface GridConfig {
  columns: number;
  rows: number;
  rowHeight: number;
  gap: number;
}

export interface BlockPosition {
  x: number;
  y: number;
  zIndex: number;
}

export interface BlockSize {
  width: number;
  height: number;
}
