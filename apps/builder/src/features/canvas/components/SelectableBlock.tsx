import { useEditorContext } from "@/app/context/EditorContext";
import { selectBlock } from "@/core/actions";
import { resizeHandler, type ResizeDirection } from "@/core/events/handlers";
import { cn } from "@redotlabs/utils";
import type { ReactNode } from "react";

interface SelectableBlockProps {
  blockId: string;
  children: ReactNode;
}

/**
 * SelectableBlock
 *
 * 블록을 클릭하여 선택할 수 있게 만들고,
 * 선택된 블록은 드래그 및 리사이징 기능을 제공합니다.
 *
 */
export const SelectableBlock = ({
  blockId,
  children,
}: SelectableBlockProps) => {
  const { state, dispatch } = useEditorContext();
  const isSelected = state.selection.selectedBlockIds.has(blockId);

  const handleMouseDown = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-resize-handle]")) return;

    const multiSelect = event.metaKey || event.ctrlKey;
    if (!isSelected || multiSelect) {
      dispatch(selectBlock(blockId, multiSelect));
    }
  };

  const handleResizeStart = (
    event: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    const context = { state, dispatch };
    resizeHandler.onResizeStart(event.nativeEvent, context, blockId, direction);
  };

  return (
    <div className="relative w-full h-full">
      <div
        data-draggable="true"
        className="absolute inset-0 cursor-move"
        onMouseDown={handleMouseDown}
      />

      {isSelected && (
        <>
          <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded" />
          <ResizeHandle
            position="-top-1 -left-1"
            cursor="nw"
            direction="nw"
            onMouseDown={handleResizeStart}
          />
          <ResizeHandle
            position="-top-1 -right-1"
            cursor="ne"
            direction="ne"
            onMouseDown={handleResizeStart}
          />
          <ResizeHandle
            position="-bottom-1 -left-1"
            cursor="sw"
            direction="sw"
            onMouseDown={handleResizeStart}
          />
          <ResizeHandle
            position="-bottom-1 -right-1"
            cursor="se"
            direction="se"
            onMouseDown={handleResizeStart}
          />
          <ResizeHandle
            position="-top-1 left-1/2 -translate-x-1/2"
            cursor="n"
            direction="n"
            onMouseDown={handleResizeStart}
          />
          <ResizeHandle
            position="-bottom-1 left-1/2 -translate-x-1/2"
            cursor="s"
            direction="s"
            onMouseDown={handleResizeStart}
          />
          <ResizeHandle
            position="-left-1 top-1/2 -translate-y-1/2"
            cursor="w"
            direction="w"
            onMouseDown={handleResizeStart}
          />
          <ResizeHandle
            position="-right-1 top-1/2 -translate-y-1/2"
            cursor="e"
            direction="e"
            onMouseDown={handleResizeStart}
          />
        </>
      )}

      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </div>
  );
};

interface ResizeHandleProps {
  position: string;
  cursor: string;
  direction: ResizeDirection;
  onMouseDown: (event: React.MouseEvent, direction: ResizeDirection) => void;
}

const CURSOR_CLASSES: Record<string, string> = {
  nw: "cursor-nw-resize",
  ne: "cursor-ne-resize",
  sw: "cursor-sw-resize",
  se: "cursor-se-resize",
  n: "cursor-n-resize",
  s: "cursor-s-resize",
  w: "cursor-w-resize",
  e: "cursor-e-resize",
};

const ResizeHandle = ({
  position,
  cursor,
  direction,
  onMouseDown,
}: ResizeHandleProps) => (
  <div
    className={cn(
      "absolute w-2 h-2 bg-white border-2 border-blue-500 rounded-full z-10",
      position,
      CURSOR_CLASSES[cursor]
    )}
    onMouseDown={(e) => onMouseDown(e, direction)}
    data-resize-handle
  />
);
