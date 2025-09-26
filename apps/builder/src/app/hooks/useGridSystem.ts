import { useMemo, RefObject } from 'react';
import { generateGridZones } from '../utils/gridCalculations';
import { GRID_CONFIG } from '../constants/componentLibrary';
import type { Component, DraggedItem } from '@/app/types/component';

export const useGridSystem = (
  canvasRef: RefObject<HTMLDivElement>,
  components: Component[],
  draggedItem: DraggedItem | null,
  isDragging: boolean
) => {
  const gridZones = useMemo(() => {
    if (!isDragging || !canvasRef.current) return [];

    const rect = canvasRef.current.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    return generateGridZones(
      canvasWidth,
      canvasHeight,
      components,
      draggedItem
    );
  }, [isDragging, canvasRef, components, draggedItem]);

  const gridBackgroundStyle = useMemo(() => {
    if (!isDragging || !canvasRef.current) return {};

    const rect = canvasRef.current.getBoundingClientRect();
    const canvasWidth = rect.width;
    const actualCols = Math.floor(
      canvasWidth / (canvasWidth / GRID_CONFIG.COLS)
    );

    return {
      backgroundImage: `
        linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
      `,
      backgroundSize: `${canvasWidth / actualCols}px ${GRID_CONFIG.SIZE}px`,
      zIndex: 100,
    };
  }, [isDragging, canvasRef]);

  return {
    gridZones,
    gridBackgroundStyle,
  };
};
