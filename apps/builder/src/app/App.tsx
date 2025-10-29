import { ThemeProvider } from '@redotlabs/themes';
import { Canvas } from '@/features/canvas/components/Canvas';
import { initialEditorData } from '@/shared/constants/editorData';
import { BlockConverter } from '@/features/canvas/utils/block-converter';
import { useEditor } from '@/core';
import { useRef, useMemo, useEffect } from 'react';
import { CanvasListener } from '@/core/events/listeners';
import {
  keyboardHandler,
  dragHandler,
  selectionHandler,
} from '@/core/events/handlers';

export default function BuilderApp() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

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

        <Canvas canvasRef={canvasRef} blocks={renderableBlocks} />
      </div>
    </ThemeProvider>
  );
}
