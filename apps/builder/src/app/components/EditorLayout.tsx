import { Canvas } from "@/features/canvas/components/Canvas";
import { BlockLibrary } from "@/features/sidebar/components/BlockLibrary";
import { InspectorPanel } from "@/features/inspector/components";

export const EditorLayout = () => {
  return (
    <div className="flex h-screen">
      <BlockLibrary />
      <Canvas />
      <InspectorPanel />
    </div>
  );
};
