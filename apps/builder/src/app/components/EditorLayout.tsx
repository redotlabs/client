import { Canvas } from "@/features/canvas/components/Canvas";
import { BlockLibrary } from "@/features/sidebar/components/BlockLibrary";

export const EditorLayout = () => {
  return (
    <div className="flex h-screen">
      <BlockLibrary />
      <Canvas />
    </div>
  );
};
