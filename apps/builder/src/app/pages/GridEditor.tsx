import { Canvas } from '@/app/components/Canvas/Canvas';
import { initialEditorData } from '@/app/constants/editorData';
import { createBlockRenderer } from '@/app/utils/rendererFactory';
import { useRef, useMemo } from 'react';

export default function GridEditor() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const renderableBlocks = useMemo(() => {
    const renderer = createBlockRenderer(initialEditorData.grid);
    return renderer.renderBlocks(initialEditorData.blocks);
  }, []);

  return <Canvas canvasRef={canvasRef} blocks={renderableBlocks} />;
}
