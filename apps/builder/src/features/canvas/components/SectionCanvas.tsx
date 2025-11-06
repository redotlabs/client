import { useRef, useEffect } from "react";
import { cn } from "@redotlabs/utils";
import { COLUMN_WIDTH } from "@/shared/constants/editorData";
import { BlockRenderer } from "@/features/canvas/components/BlockRenderer";
import { SelectableBlock } from "@/features/canvas/components/SelectableBlock";
import { useEditorContext } from "@/app/context/EditorContext";
import { CanvasListener } from "@/core/events/listeners";
import {
  keyboardHandler,
  selectionHandler,
  createDropHandler,
  createDragHandler,
} from "@/core/events/handlers";
import { useRenderableBlocks } from "@/features/canvas/hooks/useRenderableBlocks";
import type { Section } from "@/shared/types";

interface SectionCanvasProps {
  section: Section;
}

/**
 * SectionCanvas
 * 단일 섹션을 렌더링하는 독립적인 Canvas 컴포넌트
 * - 섹션 내 블록만 표시
 * - 섹션별 독립적인 이벤트 처리
 */
export const SectionCanvas = ({ section }: SectionCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useEditorContext();

  const renderableBlocks = useRenderableBlocks(section.id);

  const isDragging = state.ui.isDragging;
  const isResizing = state.ui.isResizing;
  const showGrid = isDragging || isResizing;

  const listenerRef = useRef<CanvasListener | null>(null);
  const contextRef = useRef({ state, dispatch });

  useEffect(() => {
    contextRef.current = { state, dispatch };
    listenerRef.current?.setContext(contextRef.current);
  }, [state, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const listener = new CanvasListener(canvasRef.current, contextRef.current);

    const dropHandler = createDropHandler();
    const dragHandler = createDragHandler();

    listener.registerKeyboardHandler(keyboardHandler);
    listener.registerMouseHandler(selectionHandler);
    listener.registerDropHandler(dropHandler);
    listener.registerDragHandler(dragHandler);

    listener.start();
    listenerRef.current = listener;

    return () => {
      listener.stop();
      listenerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      data-section-id={section.id}
      className={cn(
        "w-full bg-gray-100 overflow-auto grid gap-0 p-0 transition-[background-image] duration-200 ease-in-out",
        "bg-size-[40px_24px] bg-position-[0_0]",
        showGrid &&
          "bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)]"
      )}
      style={{
        gridTemplateRows: `repeat(${state.gridConfig.rows}, ${state.gridConfig.rowHeight}px)`,
        gridTemplateColumns: `repeat(${state.gridConfig.columns}, ${COLUMN_WIDTH}px)`,
        minHeight: `${state.gridConfig.rows * state.gridConfig.rowHeight}px`,
      }}
    >
      {renderableBlocks.map((block) => (
        <div
          key={block.id}
          data-block-id={block.id}
          data-block-type={block.type}
          style={{ ...block.style, overflow: "visible" }}
        >
          <SelectableBlock blockId={block.id}>
            <BlockRenderer block={block} />
          </SelectableBlock>
        </div>
      ))}
    </div>
  );
};
