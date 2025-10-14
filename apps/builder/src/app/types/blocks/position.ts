export interface GridConfig {
  columns: number;
  rows: number;
  rowHeight: number;
  gap: number;
}

export interface BlockPosition {
  x: number; // 그리드 시작 열 (1-based)
  y: number; // 그리드 시작 행 (1-based)
  zIndex: number; // 레이어 순서
}

export interface BlockSize {
  width: number; // 그리드 셀 단위 너비
  height: number; // 그리드 셀 단위 높이
}