import { useMemo } from "react";
import { useEditorContext } from "@/app/context/EditorContext";
import { BlockConverter } from "@/features/canvas/utils/block-converter";

/**
 * BuilderBlock을 RenderableBlock으로 변환
 * - 그리드 기반 위치/크기를 픽셀 기반으로 변환
 * - Canvas 렌더링에 필요한 스타일 정보 생성
 *
 * @param sectionId - 특정 섹션의 블록만 가져올 경우 섹션 ID
 */
export const useRenderableBlocks = (sectionId?: string) => {
  const { state } = useEditorContext();

  return useMemo(() => {
    const converter = new BlockConverter(state.gridConfig);

    // sectionId가 제공되면 해당 섹션의 블록만, 없으면 모든 블록
    let blocks;
    if (sectionId) {
      const section = state.sections.get(sectionId);
      blocks = section?.blocks || [];
    } else {
      // 모든 섹션의 블록을 합침
      blocks = Array.from(state.sections.values()).flatMap(
        (section) => section.blocks
      );
    }

    return converter.convertBlocks(blocks);
  }, [state.sections, state.gridConfig, sectionId]);
};
