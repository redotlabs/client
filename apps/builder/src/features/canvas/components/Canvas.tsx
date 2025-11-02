import { useRef, useEffect } from "react";
import { cn } from "@redotlabs/utils";
import { DEFAULT_GRID_CONFIG } from "@/shared/constants/editorData";
import { BlockRenderer } from "@/features/canvas/components/BlockRenderer";
import { InteractiveBlock } from "@/features/canvas/components/InteractiveBlock";
import { useEditorContext } from "@/app/context/EditorContext";
import { CanvasListener } from "@/core/events/listeners";
import {
  keyboardHandler,
  dragHandler,
  selectionHandler,
} from "@/core/events/handlers";
import { useDragAndDrop } from "@/features/canvas/hooks/useDragAndDrop";
import { useRenderableBlocks } from "@/features/canvas/hooks/useRenderableBlocks";
import type { BlockTemplate } from "@/core/blocks";

interface CanvasProps {
  onAddBlock?: (
    template: BlockTemplate,
    position: { x: number; y: number }
  ) => void;
}

export const Canvas = ({ onAddBlock }: CanvasProps = {}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useEditorContext();

  const { handleDrop, handleDragOver, handleDragLeave, isDragging } =
    useDragAndDrop({
      canvasRef,
      onAddBlock: onAddBlock || (() => {}),
    });

  const renderableBlocks = useRenderableBlocks();

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
      className={cn(
        "w-full h-screen bg-gray-100 overflow-auto grid gap-0 p-0 transition-[background-image] duration-200 ease-in-out",
        "bg-size-[40px_24px] bg-position-[0_0]",
        isDragging &&
          "bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)]"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
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
          <InteractiveBlock blockId={block.id}>
            <BlockRenderer block={block} />
          </InteractiveBlock>
        </div>
      ))}
    </div>
  );
};
