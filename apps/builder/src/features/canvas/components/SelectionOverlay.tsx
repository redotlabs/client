import { useEditorContext } from '@/app/context/EditorContext';
import { startResize, startDrag, type ResizeDirection } from '@/core/events/handlers';
import { selectBlock } from '@/core/actions';

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

  const handleDragStart = (event: React.MouseEvent) => {
    // 블록 선택 (Cmd/Ctrl 키로 다중 선택 지원)
    const multiSelect = event.metaKey || event.ctrlKey;
    if (multiSelect) {
      dispatch(selectBlock(blockId, multiSelect));
    }

    // 드래그 시작
    const context = { state, dispatch };
    startDrag(event.nativeEvent, context, blockId);
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
      data-resize-handle
    />
  );

  return (
    <>
      {/* 드래그 가능한 영역 - border와 겹치지만 pointer-events를 활성화 */}
      <div
        className="absolute inset-0 cursor-move"
        onMouseDown={handleDragStart}
      />
      {/* Selection border - pointer-events 비활성화 */}
      <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded" />
      {/* Resize handles */}
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
