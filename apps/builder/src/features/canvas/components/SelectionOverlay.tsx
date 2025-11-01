import { useEditorContext } from '@/app/context/EditorContext';
import { startResize, type ResizeDirection } from '@/core/events/handlers';

interface SelectionOverlayProps {
  isSelected: boolean;
  blockId: string;
}

export const SelectionOverlay = ({
  isSelected,
  blockId,
}: SelectionOverlayProps) => {
  const { state, dispatch } = useEditorContext();

  if (!isSelected) return null;

  const handleResizeStart = (
    event: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    const context = { state, dispatch };
    startResize(event.nativeEvent, context, blockId, direction);
  };

  const Handle = ({
    position,
    cursor,
    direction,
  }: {
    position: string;
    cursor: string;
    direction: ResizeDirection;
  }) => (
    <div
      className={`absolute w-2 h-2 bg-white border-2 border-blue-500 rounded-full ${position} cursor-${cursor}-resize`}
      onMouseDown={(e) => handleResizeStart(e, direction)}
    />
  );

  return (
    <>
      <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded" />
      <Handle position="-top-1 -left-1" cursor="nw" direction="nw" />
      <Handle position="-top-1 -right-1" cursor="ne" direction="ne" />
      <Handle position="-bottom-1 -left-1" cursor="sw" direction="sw" />
      <Handle position="-bottom-1 -right-1" cursor="se" direction="se" />
      <Handle position="-top-1 left-1/2 -translate-x-1/2" cursor="n" direction="n" />
      <Handle position="-bottom-1 left-1/2 -translate-x-1/2" cursor="s" direction="s" />
      <Handle position="-left-1 top-1/2 -translate-y-1/2" cursor="w" direction="w" />
      <Handle position="-right-1 top-1/2 -translate-y-1/2" cursor="e" direction="e" />
    </>
  );
};
