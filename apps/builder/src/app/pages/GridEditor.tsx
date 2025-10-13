import { Canvas } from '@/app/components/Canvas/Canvas';
import { TypedCanvas } from '@/app/components/Canvas/TypedCanvas';
import { initialEditorData } from '@/app/constants/editorData';
import { createBlockRenderer } from '@/app/utils/blockRenderer';
import { useRef, useMemo } from 'react';

const USE_TYPED_RENDERER = false;

export default function GridEditor() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // 기본 렌더러 (개발 편의성 우선)
  const renderableBlocks = useMemo(() => {
    const renderer = createBlockRenderer(initialEditorData.grid);
    return renderer.renderBlocks(initialEditorData.blocks);
  }, []);

  // 타입 안전한 렌더러
  const typedRenderableBlocks = useMemo(() => {
    const renderer = createBlockRenderer(initialEditorData.grid);
    return renderer.renderTypedBlocks(initialEditorData.blocks);
  }, []);

  if (USE_TYPED_RENDERER) {
    return <TypedCanvas canvasRef={canvasRef} blocks={typedRenderableBlocks} />;
  }

  return <Canvas canvasRef={canvasRef} blocks={renderableBlocks} />;
}
