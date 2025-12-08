import { useMemo } from 'react';
import { useEditorContext } from '@/context';
import { BlockConverter } from '@repo/builder/renderer';

/**
 * BuilderBlock을 RenderableBlock으로 변환
 * - 그리드 기반 위치/크기를 픽셀 기반으로 변환
 * - Canvas 렌더링에 필요한 스타일 정보 생성
 */
export const useRenderableBlocks = (sectionId?: string) => {
  const { state } = useEditorContext();

  return useMemo(() => {
    const converter = new BlockConverter(state.gridConfig);

    const sections = state?.page?.content?.sections || [];

    let blocks;
    if (sectionId) {
      const section = sections.find((s) => s.id === sectionId);
      blocks = section?.blocks || [];
    } else {
      blocks = sections.flatMap((section) => section.blocks);
    }

    return converter.convertBlocks(blocks);
  }, [state.page, state.gridConfig, sectionId]);
};
