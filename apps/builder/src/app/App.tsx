import { Canvas } from '@/features/canvas/components/Canvas';
import { initialEditorData } from '@/shared/constants/editorData';
import { BlockRenderer } from '@/core/blocks';
import { useRef, useMemo } from 'react';

export default function BuilderApp() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const renderableBlocks = useMemo(() => {
    const renderer = new BlockRenderer(initialEditorData.grid);
    return renderer.renderBlocks(initialEditorData.blocks);
  }, []);

  return <Canvas canvasRef={canvasRef} blocks={renderableBlocks} />;
}
