import { useEditorContext, useSelection } from "@/app/context/EditorContext";
import { selectBlock } from "@/core/actions";
import {
  startDrag,
  startResize,
  type ResizeDirection,
} from "@/core/events/handlers";
import { cn } from "@redotlabs/utils";
import type { ReactNode } from "react";

interface InteractiveBlockProps {
  blockId: string;
  children: ReactNode;
}

/**
 * InteractiveBlock
 * 블록의 모든 인터랙션(클릭, 드래그, 리사이즈)을 처리하는 래퍼 컴포넌트
 */
export const InteractiveBlock = ({
  blockId,
  children,
}: InteractiveBlockProps) => {
  const { state, dispatch } = useEditorContext();
  const selection = useSelection();
  const isSelected = selection.selectedBlockIds.has(blockId);

  const handleMouseDown = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-resize-handle]")) return;

    const multiSelect = event.metaKey || event.ctrlKey;
    if (!isSelected || multiSelect) {
      dispatch(selectBlock(blockId, multiSelect));
    }

    const context = { state, dispatch };
    startDrag(event.nativeEvent, context, blockId);
  };

  const handleResizeStart = (
    event: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    const context = { state, dispatch };
    startResize(event.nativeEvent, context, blockId, direction);
  };

  return (
    <div className="relative w-full h-full">
      <div
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
      "absolute w-2 h-2 bg-white border-2 border-blue-500 rounded-full",
      position,
      CURSOR_CLASSES[cursor]
    )}
    onMouseDown={(e) => onMouseDown(e, direction)}
    data-resize-handle
  />
);
