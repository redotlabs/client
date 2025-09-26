export interface GridZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isOccupied: boolean;
}

export interface GridSpan {
  spanCols: number;
  spanRows: number;
}

export interface GridConfig {
  size: number;
  cols: number;
}