import { useRef, useMemo, useEffect } from 'react';
import { DEFAULT_GRID_CONFIG } from '@/shared/constants/editorData';
import { BlockRenderer } from '@/features/canvas/components/BlockRenderer';
import { BlockConverter } from '@/features/canvas/utils/block-converter';
import { useEditorContext } from '@/app/context/EditorContext';
import { CanvasListener } from '@/core/events/listeners';
import {
  keyboardHandler,
  dragHandler,
  selectionHandler,
} from '@/core/events/handlers';

export const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useEditorContext();

  const renderableBlocks = useMemo(() => {
    const converter = new BlockConverter(state.gridConfig);
    const blocks = Array.from(state.blocks.values());
    return converter.convertBlocks(blocks);
  }, [state.blocks, state.gridConfig]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const listener = new CanvasListener(canvasRef.current, {
      state,
      dispatch,
    });

    listener.registerKeyboardHandler(keyboardHandler);
    listener.registerDragHandler(dragHandler);
    listener.registerMouseHandler(selectionHandler);

    listener.start();

    return () => {
      listener.stop();
    };
  }, [state, dispatch]);

  return (
    <div>
      {/* 상태 디버깅 정보 -> 현재는 리뷰 확인용으로 작성하였으며, 다음 PR 작업에서 삭제 예정*/}
      <div
        style={{
          padding: '16px',
          background: '#f5f5f5',
          borderBottom: '1px solid #ddd',
        }}
      >
        <p>
          <strong>Editor State:</strong>
        </p>
        <p>Total blocks: {state.blocks.size}</p>
        <p>Selected: {state.selection.selectedBlockIds.size}</p>
        <p>
          Selected IDs:{' '}
          {Array.from(state.selection.selectedBlockIds).join(', ') || 'None'}
        </p>
      </div>

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
        {renderableBlocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};
