import { Canvas } from '@/features/canvas/components/Canvas';
import { initialEditorData } from '@/shared/constants/editorData';
import { BlockConverter } from '@/core/blocks';
import { useRef, useMemo } from 'react';

export default function BuilderApp() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const renderableBlocks = useMemo(() => {
    const converter = new BlockConverter(initialEditorData.grid);
    return converter.convertBlocks(initialEditorData.blocks);
  }, []);

  return <Canvas canvasRef={canvasRef} blocks={renderableBlocks} />;
}
