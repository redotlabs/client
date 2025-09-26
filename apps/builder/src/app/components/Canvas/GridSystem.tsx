import type { GridZone } from '@/app/types/grid';
import React from 'react';

interface GridSystemProps {
  isDragging: boolean;
  gridZones: GridZone[];
  gridBackgroundStyle: React.CSSProperties;
  hoveredDropZone: string | null;
  canvasWidth: number;
  onDropZoneHover: (zoneId: string, canvasWidth: number) => void;
  onDropZoneLeave: () => void;
  onDrop: (
    e: React.DragEvent,
    canvasRect?: DOMRect,
    targetZoneId?: string
  ) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const GridSystem: React.FC<GridSystemProps> = ({
  isDragging,
  gridZones,
  gridBackgroundStyle,
  hoveredDropZone,
  canvasWidth,
  onDropZoneHover,
  onDropZoneLeave,
  onDrop,
  canvasRef,
}) => {
  if (!isDragging) return null;

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={gridBackgroundStyle}
      />

      {gridZones.map((zone) => {
        const hoveredZoneIds = hoveredDropZone
          ? hoveredDropZone.split(',')
          : [];
        const isHovered = hoveredZoneIds.includes(zone.id);

        return (
          <div
            key={zone.id}
            className="absolute transition-all duration-200"
            style={{
              left: zone.x,
              top: zone.y,
              width: zone.width,
              height: zone.height,
              zIndex: 200,
              backgroundColor: zone.isOccupied
                ? 'rgba(239, 68, 68, 0.2)'
                : isHovered
                  ? 'rgba(59, 130, 246, 0.3)'
                  : 'transparent',
              border: isHovered ? '2px solid #3b82f6' : 'none',
              cursor: zone.isOccupied ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={() =>
              !zone.isOccupied && onDropZoneHover(zone.id, canvasWidth)
            }
            onMouseLeave={onDropZoneLeave}
            onDragOver={(e) => {
              e.preventDefault();
              if (!zone.isOccupied) {
                onDropZoneHover(zone.id, canvasWidth);
              }
            }}
            onDrop={(e) => {
              if (!zone.isOccupied && canvasRef.current) {
                const canvasRect = canvasRef.current.getBoundingClientRect();
                onDrop(e, canvasRect, zone.id);
              }
            }}
          />
        );
      })}
    </>
  );
};
