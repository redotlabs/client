import type {
  Component,
  ComponentSize,
  DraggedItem,
} from '@/app/types/component';
import { GRID_CONFIG } from '../constants/componentLibrary';
import type { GridSpan, GridZone } from '@/app/types/grid';

export const getGridSpanForComponent = (
  componentSize: ComponentSize,
  canvasWidth: number
): GridSpan => {
  const cellWidth = canvasWidth / GRID_CONFIG.COLS;
  const cellHeight = GRID_CONFIG.SIZE;

  const spanCols = Math.max(1, Math.ceil(componentSize.width / cellWidth));
  const spanRows = Math.max(1, Math.ceil(componentSize.height / cellHeight));

  return { spanCols, spanRows };
};

export const generateGridZones = (
  canvasWidth: number,
  canvasHeight: number,
  components: Component[],
  draggedItem: DraggedItem | null
): GridZone[] => {
  const zones: GridZone[] = [];
  const rows = Math.floor(canvasHeight / GRID_CONFIG.SIZE);
  const actualCols = Math.floor(canvasWidth / (canvasWidth / GRID_CONFIG.COLS));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < actualCols; col++) {
      const zoneId = `${row}-${col}`;
      const x = col * (canvasWidth / actualCols);
      const y = row * GRID_CONFIG.SIZE;
      const width = canvasWidth / actualCols;
      const height = GRID_CONFIG.SIZE;

      // 이미 컴포넌트가 있는 영역인지 확인 (드래그 중인 컴포넌트 제외)
      const isOccupied = components.some((comp) => {
        if (
          draggedItem &&
          draggedItem.source === 'canvas' &&
          comp.id === draggedItem.id
        ) {
          return false;
        }

        const compRight = comp.position.x + comp.size.width;
        const compBottom = comp.position.y + comp.size.height;
        const zoneRight = x + width;
        const zoneBottom = y + height;

        return !(
          comp.position.x >= zoneRight ||
          compRight <= x ||
          comp.position.y >= zoneBottom ||
          compBottom <= y
        );
      });

      zones.push({ id: zoneId, x, y, width, height, isOccupied });
    }
  }

  return zones;
};

export const getDropZoneFromPosition = (x: number, y: number): string => {
  const canvasWidth = 720;
  const col = Math.floor((x / canvasWidth) * GRID_CONFIG.COLS);
  const row = Math.floor(y / GRID_CONFIG.SIZE);
  return `${row}-${col}`;
};

export const getPositionFromDropZone = (
  zoneId: string,
  canvasWidth: number
): { x: number; y: number } => {
  const [row, col] = zoneId.split('-').map(Number);
  const actualCols = Math.floor(canvasWidth / (canvasWidth / GRID_CONFIG.COLS));
  const x = col * (canvasWidth / actualCols);
  const y = row * GRID_CONFIG.SIZE;
  return { x, y };
};
