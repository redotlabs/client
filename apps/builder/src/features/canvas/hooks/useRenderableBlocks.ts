import { useMemo } from "react";
import { useEditorContext } from "@/app/context/EditorContext";
import { BlockConverter } from "@/features/canvas/utils/block-converter";

/**
 * BuilderBlock을 RenderableBlock으로 변환
 * - 그리드 기반 위치/크기를 픽셀 기반으로 변환
 * - Canvas 렌더링에 필요한 스타일 정보 생성
 */

export const useRenderableBlocks = () => {
  const { state } = useEditorContext();

  return useMemo(() => {
    const converter = new BlockConverter(state.gridConfig);
    const blocks = Array.from(state.blocks.values());
    return converter.convertBlocks(blocks);
  }, [state.blocks, state.gridConfig]);
};
