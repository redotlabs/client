import { Canvas } from '@/app/components/Canvas/Canvas';
import { initialPageData } from '@/app/constants/componentLibrary';
import { useRef } from 'react';

export default function GridEditor() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <Canvas canvasRef={canvasRef} components={initialPageData.components} />
  );
}
