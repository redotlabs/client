import { Canvas, Header, LeftPanel, InspectorPanel } from '@repo/web-builder';

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
