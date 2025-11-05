import { useRef, useEffect } from "react";
import { cn } from "@redotlabs/utils";
import { DEFAULT_GRID_CONFIG } from "@/shared/constants/editorData";
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

export const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useEditorContext();

  const renderableBlocks = useRenderableBlocks();

  const isDragging = state.ui.isDragging;
  const isResizing = state.ui.isResizing;
  const showGrid = isDragging || isResizing;

  useEffect(() => {
    if (!canvasRef.current) return;

    const listener = new CanvasListener(canvasRef.current, {
      state,
      dispatch,
    });

    const dropHandler = createDropHandler();
    const dragHandler = createDragHandler();

    listener.registerKeyboardHandler(keyboardHandler);
    listener.registerMouseHandler(selectionHandler);
    listener.registerDropHandler(dropHandler);
    listener.registerDragHandler(dragHandler);

    listener.start();

    return () => {
      listener.stop();
    };
  }, [state, dispatch]);

  return (
    <div
      ref={canvasRef}
      className={cn(
        "w-full h-screen bg-gray-100 overflow-auto grid gap-0 p-0 transition-[background-image] duration-200 ease-in-out",
        "bg-size-[40px_24px] bg-position-[0_0]",
        showGrid &&
          "bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)]"
      )}
      style={{
        gridTemplateRows: `repeat(${DEFAULT_GRID_CONFIG.rows}, ${DEFAULT_GRID_CONFIG.rowHeight}px)`,
        gridTemplateColumns: `repeat(${DEFAULT_GRID_CONFIG.columns}, 40px)`,
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
