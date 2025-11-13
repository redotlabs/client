import { Canvas } from "@/features/canvas/components/Canvas";
import { LeftPanel } from "@/features/sidebar/components/LeftPanel";
import { InspectorPanel } from "@/features/inspector/components";
import { Header } from "@/features/header/components";

export const EditorLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 mt-14">
        <LeftPanel />
        <Canvas />
        <InspectorPanel />
      </div>
    </div>
  );
};
