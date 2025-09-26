import { useState } from 'react';
import { componentLibrary } from '../constants/componentLibrary';
import { getPositionFromDropZone } from '../utils/gridCalculations';
import { getComponentSizeFromDraggedItem } from '../utils/componentHelpers';
import { getGridSpanForComponent } from '../utils/gridCalculations';
import { GRID_CONFIG } from '../constants/componentLibrary';
import type { Component, DraggedItem, PageData } from '@/app/types/component';

export const useDragAndDrop = (
  pageData: PageData,
  setPageData: (data: PageData) => void
) => {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredDropZone, setHoveredDropZone] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, item: any, source: string) => {
    setDraggedItem({ ...item, source });
    setIsDragging(true);
    setHoveredDropZone(null);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setHoveredDropZone(null);
    setDraggedItem(null);
  };

  const handleDropZoneHover = (zoneId: string, canvasWidth: number) => {
    if (isDragging && draggedItem) {
      const componentSize = getComponentSizeFromDraggedItem(draggedItem);
      const { spanCols, spanRows } = getGridSpanForComponent(
        componentSize,
        canvasWidth
      );
      const [startRow, startCol] = zoneId.split('-').map(Number);

      const hoveredZones = [];
      for (let r = startRow; r < startRow + spanRows; r++) {
        for (let c = startCol; c < startCol + spanCols; c++) {
          if (c < GRID_CONFIG.COLS) {
            hoveredZones.push(`${r}-${c}`);
          }
        }
      }

      setHoveredDropZone(hoveredZones.join(','));
    }
  };

  const handleDropZoneLeave = () => {
    setHoveredDropZone(null);
  };

  const handleDrop = (
    e: React.DragEvent,
    canvasRect?: DOMRect,
    targetZoneId?: string
  ) => {
    e.preventDefault();
    setIsDragging(false);
    setHoveredDropZone(null);

    if (!draggedItem || !canvasRect) return;

    let finalPosition;

    if (targetZoneId) {
      finalPosition = getPositionFromDropZone(targetZoneId, canvasRect.width);
    } else {
      const rawX = e.clientX - canvasRect.left;
      const rawY = e.clientY - canvasRect.top;
      finalPosition = { x: rawX, y: rawY };
    }

    if (draggedItem.source === 'library') {
      const componentType = componentLibrary.find(
        (comp) => comp.id === draggedItem.id
      );
      if (componentType) {
        const newComponent: Component = {
          id: `${componentType.type}-${Date.now()}`,
          type: componentType.type,
          content: componentType.defaultContent,
          position: finalPosition,
          size: componentType.defaultSize,
          style: {},
        };

        const newComponents = [...pageData.components, newComponent];
        setPageData({ ...pageData, components: newComponents });
      }
    } else if (draggedItem.source === 'canvas') {
      const newComponents = pageData.components.map((comp) =>
        comp.id === draggedItem.id ? { ...comp, position: finalPosition } : comp
      );
      setPageData({ ...pageData, components: newComponents });
    }

    setDraggedItem(null);
  };

  return {
    draggedItem,
    isDragging,
    hoveredDropZone,
    handleDragStart,
    handleDragEnd,
    handleDropZoneHover,
    handleDropZoneLeave,
    handleDrop,
  };
};
