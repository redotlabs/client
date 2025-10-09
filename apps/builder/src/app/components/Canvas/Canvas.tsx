import { type RefObject } from 'react';
import { CSS_GRID_CONFIG } from '@/app/constants/componentLibrary';
import type { Component } from '@/app/types/component';
import { ComponentRenderer } from '@/app/components/Canvas/ComponentRenderer';

interface CanvasProps {
  canvasRef: RefObject<HTMLDivElement | null>;
  components: Component[];
}

export const Canvas = ({ canvasRef, components }: CanvasProps) => {
  return (
    <div
      ref={canvasRef}
      className="w-full h-screen bg-gray-100 overflow-auto"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${CSS_GRID_CONFIG.ROWS}, ${CSS_GRID_CONFIG.ROW_HEIGHT})`,
        gridTemplateColumns: `repeat(${CSS_GRID_CONFIG.COLS}, ${CSS_GRID_CONFIG.COL_WIDTH})`,
        gap: CSS_GRID_CONFIG.GAP,
        padding: '16px',
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: `calc(100% / ${CSS_GRID_CONFIG.COLS}) ${CSS_GRID_CONFIG.ROW_HEIGHT}`,
        backgroundPosition: '16px 16px',
      }}
    >
      {components.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
};
