import { useEffect, useRef } from 'react';
import type { BuilderBlock, GridConfig } from '@/shared/types';
import { useEditor } from '@/core';
import { CanvasListener } from '../listeners';
import { keyboardHandler, dragHandler, selectionHandler } from '../handlers';

interface CanvasWithEventsProps {
  blocks: BuilderBlock[];
  gridConfig: GridConfig;
}

/**
 * Canvas With Events
 * 이벤트 시스템이 통합된 Canvas 컴포넌트 예시
 */
export function CanvasWithEvents({ blocks, gridConfig }: CanvasWithEventsProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const listenerRef = useRef<CanvasListener | null>(null);

  // Editor 상태 및 dispatch
  const { state, dispatch } = useEditor(blocks, gridConfig);

  useEffect(() => {
    if (!canvasRef.current) return;

    // CanvasListener 생성
    const listener = new CanvasListener(canvasRef.current, {
      state,
      dispatch,
    });

    // 핸들러 등록
    listener.registerKeyboardHandler(keyboardHandler);
    listener.registerDragHandler(dragHandler);
    listener.registerMouseHandler(selectionHandler);

    // 리스너 시작
    listener.start();

    listenerRef.current = listener;

    return () => {
      // 클린업
      listener.stop();
    };
  }, [state, dispatch]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #ccc',
        position: 'relative',
      }}
    >
      <h3>Canvas with Event System</h3>
      <p>Selected blocks: {state.selection.selectedBlockIds.size}</p>
      <p>Total blocks: {state.blocks.size}</p>
      <p>Editor mode: {state.mode}</p>

      {/* TODO: 실제 블록 렌더링 */}
      <div>
        {Array.from(state.blocks.values()).map((block) => (
          <div
            key={block.id}
            data-block-id={block.id}
            style={{
              position: 'absolute',
              border: state.selection.selectedBlockIds.has(block.id)
                ? '2px solid blue'
                : '1px solid gray',
              padding: '8px',
              cursor: 'pointer',
            }}
          >
            {block.id}
          </div>
        ))}
      </div>
    </div>
  );
}
