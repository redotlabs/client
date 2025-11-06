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
 */
export const useBlockActions = (): UseBlockActionsReturn => {
  const { state, dispatch } = useEditorContext();

  const handleAddBlock = useCallback(
    (template: BlockTemplate, position?: BlockPosition) => {
      const blockPosition = {
        x: position?.x ?? 10,
        y: position?.y ?? 5,
        zIndex: 1,
      };

      const blockSize = template.defaultProps.size;
      const newBlock = template.createBlock(blockPosition, blockSize);

      const activeSectionId = state.selection.activeSectionId;
      if (!activeSectionId) {
        console.warn("No active section found");
        return;
      }

      dispatch(createBlock(activeSectionId, newBlock));
    },
    [dispatch, state.selection.activeSectionId]
  );

  /**
   * 드래그 시작 시 템플릿을 전역에 저장
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
