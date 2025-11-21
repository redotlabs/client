import { Canvas } from "@/features/canvas/components/Canvas";
import { Header } from "@/features/header/components";
import { LeftPanel } from "@/features/toolbox/components";
import { InspectorPanel } from "@/features/inspector/components";

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
