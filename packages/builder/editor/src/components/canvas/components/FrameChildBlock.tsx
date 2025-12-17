import { useEditorContext } from '@/context';
import { selectBlock } from '@/core/actions';
import { cn } from '@redotlabs/utils';
import type { ReactNode } from 'react';

interface FrameChildBlockProps {
  blockId: string;
  children: ReactNode;
}

/**
 * Frame 내부 블록 wrapper
 * - 선택만 가능 (드래그/리사이즈 없음)
 * - 간단한 구조
 */
export const FrameChildBlock = ({
  blockId,
  children,
}: FrameChildBlockProps) => {
  const { state, dispatch } = useEditorContext();
  const isSelected = state.selection.selectedBlockIds.has(blockId);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Frame 선택 방지
    const multiSelect = event.metaKey || event.ctrlKey;
    if (!isSelected || multiSelect) {
      dispatch(selectBlock(blockId, multiSelect));
    }
  };

  return (
    <div
      className={cn(
        'relative cursor-pointer z-10 pointer-events-auto',
        isSelected && 'ring-2 ring-blue-500 rounded'
      )}
      data-block-id={blockId}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
