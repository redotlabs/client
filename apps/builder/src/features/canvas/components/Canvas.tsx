import { useRef, useMemo, useEffect } from 'react';
import { DEFAULT_GRID_CONFIG } from '@/shared/constants/editorData';
import { BlockRenderer } from '@/features/canvas/components/BlockRenderer';
import { InteractiveBlock } from '@/features/canvas/components/InteractiveBlock';
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
    <div
      ref={canvasRef}
      className="w-full h-screen bg-gray-100 overflow-auto"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${DEFAULT_GRID_CONFIG.rows}, ${DEFAULT_GRID_CONFIG.rowHeight}px)`,
        gridTemplateColumns: `repeat(${DEFAULT_GRID_CONFIG.columns}, 40px)`,
        gap: 0,
        padding: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 24px',
        backgroundPosition: '0 0',
      }}
    >
      {renderableBlocks.map((block) => (
        <div
          key={block.id}
          data-block-id={block.id}
          data-block-type={block.type}
          style={{ ...block.style, overflow: "visible" }}
        >
          <InteractiveBlock blockId={block.id}>
            <BlockRenderer block={block} />
          </InteractiveBlock>
        </div>
      ))}
    </div>
  );
};
