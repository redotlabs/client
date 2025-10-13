import { type RefObject } from 'react';
import { DEFAULT_GRID_CONFIG } from '@/app/constants/editorData';
import type { TypedRenderableBlock } from '@/app/types/ast';
import { TypedBlockRenderer } from '@/app/components/Canvas/TypedBlockRenderer';

interface TypedCanvasProps {
  canvasRef: RefObject<HTMLDivElement | null>;
  blocks: TypedRenderableBlock[];
}

export const TypedCanvas = ({ canvasRef, blocks }: TypedCanvasProps) => {
  return (
    <div
      ref={canvasRef}
      className="w-full h-screen bg-gray-100 overflow-auto"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${DEFAULT_GRID_CONFIG.rows}, ${DEFAULT_GRID_CONFIG.rowHeight}px)`,
        gridTemplateColumns: `repeat(${DEFAULT_GRID_CONFIG.columns}, 1fr)`,
        gap: `${DEFAULT_GRID_CONFIG.gap}px`,
        padding: '16px',
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: `calc(100% / ${DEFAULT_GRID_CONFIG.columns}) ${DEFAULT_GRID_CONFIG.rowHeight}px`,
        backgroundPosition: '16px 16px',
      }}
    >
      {blocks.map((block) => (
        <TypedBlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};