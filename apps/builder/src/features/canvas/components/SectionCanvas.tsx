import { useRef, useEffect } from "react";
import { cn } from "@redotlabs/utils";
import { COLUMN_WIDTH } from "@/shared/constants/editorData";
import { BlockRenderer } from "@/app/renderer/components/BlockRenderer";
import { SelectableBlock } from "@/features/canvas/components/SelectableBlock";
import { InteractionPreviewLayer } from "@/features/canvas/components/InteractionPreviewLayer";
import { useEditorContext } from "@/app/context/EditorContext";
import { CanvasListener } from "@/core/events/listeners";
import {
  keyboardHandler,
  selectionHandler,
  createDropHandler,
  createDragHandler,
} from "@/core/events/handlers";
import { useRenderableBlocks } from "@/features/canvas/hooks/useRenderableBlocks";
import { getSectionRows } from "@/shared/utils/sectionHeight";
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

  const sectionRows = getSectionRows(section);

  const isBlockDragging = state.ui.isBlockDragging;
  const isSectionResizing = state.ui.isSectionResizing;
  const isSelected = state.selection.selectedSectionId === section.id;

  const hasInteractionInThisSection =
    (state.interaction.type === "drag" &&
      section.blocks.some((b) => b.id === state.interaction.drag?.blockId)) ||
    (state.interaction.type === "resize" &&
      section.blocks.some((b) => b.id === state.interaction.resize?.blockId));

  const showGrid =
    (isSelected && isSectionResizing) ||
    hasInteractionInThisSection ||
    isBlockDragging;

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

  const isEmpty = section.blocks.length === 0;

  return (
    <div
      ref={canvasRef}
      data-section-id={section.id}
      className={cn(
        "w-full bg-gray-100 overflow-hidden grid gap-0 p-0 transition-[background-image] duration-200 ease-in-out relative select-none",
        "bg-size-[40px_24px] bg-position-[0_0]",
        showGrid &&
          "bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)]"
      )}
      style={{
        gridTemplateRows: `repeat(${sectionRows}, ${state.gridConfig.rowHeight}px)`,
        gridTemplateColumns: `repeat(${state.gridConfig.columns}, ${COLUMN_WIDTH}px)`,
        minHeight: `${sectionRows * state.gridConfig.rowHeight}px`,
      }}
    >
      {/* Empty State Placeholder */}
      {isEmpty && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-3">
            <svg
              className="w-16 h-16 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-400">
                빈 섹션입니다
              </p>
              <p className="text-xs text-gray-300">
                왼쪽 도구 상자에서 블록을 드래그하여 추가하세요
              </p>
            </div>
          </div>
        </div>
      )}

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

      {/* Interaction Preview Layer */}
      <InteractionPreviewLayer section={section} />
    </div>
  );
};
