import { useCallback, useState, useEffect, type RefObject } from "react";
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
  handleDragLeave: (e: React.DragEvent) => void;
  isDragging: boolean;
}

const DRAG_THRESHOLD = 5; // 5px 이상 움직여야 드래그로 인식

/**
 * Canvas 드래그앤드롭을 관리하는 훅
 *
 * 두 가지 드래그를 감지합니다:
 * 1. BlockLibrary에서의 드래그 (HTML5 Drag API)
 * 2. Canvas 내부 블록 드래그 (Mouse API + Threshold)
 *
 * @example
 * ```tsx
 * const canvasRef = useRef<HTMLDivElement>(null);
 * const { handleDrop, handleDragOver, isDragging } = useDragAndDrop({
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
  const [isDragging, setIsDragging] = useState(false);

  // Canvas 내부 블록 드래그 감지 (실제 드래그 시작 시에만)
  useEffect(() => {
    if (!canvasRef.current) return;

    let mouseDownPos: { x: number; y: number } | null = null;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const blockElement = target.closest("[data-block-id]");
      if (blockElement) {
        mouseDownPos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDownPos) return;

      const deltaX = Math.abs(e.clientX - mouseDownPos.x);
      const deltaY = Math.abs(e.clientY - mouseDownPos.y);

      // Threshold 초과 시 드래그로 인식
      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        setIsDragging(true);
        mouseDownPos = null; // 한 번만 설정
      }
    };

    const handleMouseUp = () => {
      mouseDownPos = null;
      setIsDragging(false);
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasRef]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

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
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  }, []);

  return {
    handleDrop,
    handleDragOver,
    handleDragLeave,
    isDragging,
  };
};
