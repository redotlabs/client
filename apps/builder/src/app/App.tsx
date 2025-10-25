import { ThemeProvider } from '@redotlabs/themes';
import { Canvas } from '@/features/canvas/components/Canvas';
import { initialEditorData } from '@/shared/constants/editorData';
import { BlockConverter } from '@/core/blocks';
import { useEditor } from '@/core';
import { useRef, useMemo, useEffect } from 'react';
import { CanvasListener } from '@/features/canvas/listeners';
import {
  keyboardHandler,
  dragHandler,
  selectionHandler,
} from '@/features/canvas/handlers';

export default function BuilderApp() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Editor 상태 및 dispatch
  const { state, dispatch } = useEditor(
    initialEditorData.blocks,
    initialEditorData.grid
  );

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
    <ThemeProvider color="blue" font="pretendard">
      <div>
        {/* 상태 디버깅 정보 */}
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
          <p>Mode: {state.mode}</p>
          <p>
            Selected IDs:{' '}
            {Array.from(state.selection.selectedBlockIds).join(', ') || 'None'}
          </p>
        </div>

        <Canvas canvasRef={canvasRef} blocks={renderableBlocks} />
      </div>
    </ThemeProvider>
  );
}
