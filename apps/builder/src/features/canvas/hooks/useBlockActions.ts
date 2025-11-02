import { useCallback } from "react";
import { useEditorContext } from "@/app/context/EditorContext";
import { createBlock } from "@/core/actions";
import type { BlockTemplate } from "@/core/blocks";

interface BlockPosition {
  x: number;
  y: number;
}

interface UseBlockActionsReturn {
  handleAddBlock: (template: BlockTemplate, position?: BlockPosition) => void;
  handleDragStart: (template: BlockTemplate) => void;
}

/**
 * 블록 추가 및 드래그 액션을 관리하는 커스텀 훅
 *
 * @returns 블록 추가/드래그 핸들러
 *
 * @example
 * ```tsx
 * const { handleAddBlock, handleDragStart } = useBlockActions();
 *
 * // 블록 추가 (기본 위치)
 * handleAddBlock(textTemplate);
 *
 * // 블록 추가 (특정 위치)
 * handleAddBlock(buttonTemplate, { x: 5, y: 10 });
 * ```
 */
export const useBlockActions = (): UseBlockActionsReturn => {
  const { dispatch } = useEditorContext();

  const handleAddBlock = useCallback(
    (template: BlockTemplate, position?: BlockPosition) => {
      const blockPosition = {
        x: position?.x ?? 10,
        y: position?.y ?? 5,
        zIndex: 1,
      };

      const blockSize = template.defaultProps.size;
      const newBlock = template.createBlock(blockPosition, blockSize);

      dispatch(createBlock(newBlock));
    },
    [dispatch]
  );

  /**
   * 드래그 시작 시 템플릿을 전역에 저장
   * - Canvas 컴포넌트의 onDrop에서 접근
   * - TODO: Context나 State로 개선 고려
   */
  const handleDragStart = useCallback((template: BlockTemplate) => {
    window.__draggedTemplate = template;
  }, []);

  return {
    handleAddBlock,
    handleDragStart,
  };
};
