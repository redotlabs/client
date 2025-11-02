import { useCallback, type RefObject } from "react";
import type { BlockTemplate } from "@/core/blocks";
import { useGridCoordinates } from "./useGridCoordinates";

interface UseDragAndDropProps {
  canvasRef: RefObject<HTMLElement | null>;
  onAddBlock: (
    template: BlockTemplate,
    position: { x: number; y: number }
  ) => void;
}

interface UseDragAndDropReturn {
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
}

/**
 * Canvas 드래그앤드롭을 관리하는 훅
 *
 * @example
 * ```tsx
 * const canvasRef = useRef<HTMLDivElement>(null);
 * const { handleDrop, handleDragOver } = useDragAndDrop({
 *   canvasRef,
 *   onAddBlock: handleAddBlock,
 * });
 *
 * <div ref={canvasRef} onDrop={handleDrop} onDragOver={handleDragOver}>
 * ```
 */
export const useDragAndDrop = ({
  canvasRef,
  onAddBlock,
}: UseDragAndDropProps): UseDragAndDropReturn => {
  const { convertToGridCoordinates } = useGridCoordinates();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      if (!canvasRef.current) return;

      const template = window.__draggedTemplate;
      if (!template) return;

      const gridPosition = convertToGridCoordinates(e, canvasRef.current);

      console.log("[useDragAndDrop] Dropping block:", {
        template: template.label,
        gridPosition,
      });

      onAddBlock(template, gridPosition);

      delete window.__draggedTemplate;
    },
    [canvasRef, convertToGridCoordinates, onAddBlock]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  return {
    handleDrop,
    handleDragOver,
  };
};
