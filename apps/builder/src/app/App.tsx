import { Canvas } from '@/app/components/Canvas/Canvas';
import { initialEditorData } from '@/constants/editorData';
import { BlockRenderer } from '@/lib/block';
import { useRef, useMemo } from 'react';

export default function BuilderApp() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const renderableBlocks = useMemo(() => {
    const renderer = new BlockRenderer(initialEditorData.grid);
    return renderer.renderBlocks(initialEditorData.blocks);
  }, []);

  return <Canvas canvasRef={canvasRef} blocks={renderableBlocks} />;
}
