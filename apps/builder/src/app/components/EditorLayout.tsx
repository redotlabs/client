import { Canvas } from "@/features/canvas/components/Canvas";
import { BlockLibrary } from "@/features/sidebar/components/BlockLibrary";
import { useBlockActions } from "@/features/canvas/hooks/useBlockActions";

export const EditorLayout = () => {
  const { handleAddBlock, handleDragStart } = useBlockActions();

  return (
    <div className="flex h-screen">
      <BlockLibrary onAddBlock={handleAddBlock} onDragStart={handleDragStart} />
      <Canvas onAddBlock={handleAddBlock} />
    </div>
  );
};
