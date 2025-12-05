import { useEditorContext } from '@/context';
import { COLUMN_WIDTH } from '@/shared/constants/editorData';
import type { Section } from '@repo/renderer';

interface InteractionPreviewLayerProps {
  section: Section;
}

/**
 * InteractionPreviewLayer
 * 드래그 및 리사이즈 중간 상태를 미리보기로 렌더링하는 레이어
 * 실제 데이터를 변경하지 않고 시각적 피드백만 제공
 */
export const InteractionPreviewLayer = ({
  section,
}: InteractionPreviewLayerProps) => {
  const { state } = useEditorContext();
  const { interaction, gridConfig } = state;

  const shouldRenderDragPreview =
    interaction.type === 'drag' &&
    interaction.drag &&
    section.blocks.some((block) => block.id === interaction.drag?.blockId);

  const shouldRenderResizePreview =
    interaction.type === 'resize' &&
    interaction.resize &&
    section.blocks.some((block) => block.id === interaction.resize?.blockId);

  if (!shouldRenderDragPreview && !shouldRenderResizePreview) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {shouldRenderDragPreview && interaction.drag && (
        <DragPreview
          previewPosition={interaction.drag.previewPosition}
          blockId={interaction.drag.blockId}
          section={section}
          rowHeight={gridConfig.rowHeight}
        />
      )}
      {shouldRenderResizePreview && interaction.resize && (
        <ResizePreview
          startPosition={interaction.resize.startPosition}
          previewSize={interaction.resize.previewSize}
          blockId={interaction.resize.blockId}
          section={section}
          rowHeight={gridConfig.rowHeight}
        />
      )}
    </div>
  );
};

/**
 * DragPreview
 * 드래그 중 블록이 배치될 위치를 미리보기로 표시
 */
interface DragPreviewProps {
  previewPosition: { x: number; y: number; zIndex: number };
  blockId: string;
  section: Section;
  rowHeight: number;
}

const DragPreview = ({
  previewPosition,
  blockId,
  section,
  rowHeight,
}: DragPreviewProps) => {
  const block = section.blocks.find((b) => b.id === blockId);
  if (!block) return null;

  const { x, y } = previewPosition;
  const { width, height } = block.size;

  return (
    <div
      className="absolute border-2 border-green-400 border-dashed bg-green-100/30 rounded"
      style={{
        gridColumnStart: x + 1,
        gridColumnEnd: x + 1 + width,
        gridRowStart: y + 1,
        gridRowEnd: y + 1 + height,
        width: `${width * COLUMN_WIDTH}px`,
        height: `${height * rowHeight}px`,
        left: `${x * COLUMN_WIDTH}px`,
        top: `${y * rowHeight}px`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-xs text-green-600 font-medium">
        Drop here
      </div>
    </div>
  );
};

/**
 * ResizePreview
 * 리사이즈 중 블록의 변경될 크기를 미리보기로 표시
 */
interface ResizePreviewProps {
  startPosition: { x: number; y: number; zIndex: number };
  previewSize: { width: number; height: number };
  blockId: string;
  section: Section;
  rowHeight: number;
}

const ResizePreview = ({
  startPosition,
  previewSize,
  blockId,
  section,
  rowHeight,
}: ResizePreviewProps) => {
  const block = section.blocks.find((b) => b.id === blockId);
  if (!block) return null;

  const { x, y } = startPosition;
  const { width, height } = previewSize;

  return (
    <div
      className="absolute border-2 border-green-400 border-dashed bg-green-100/30 rounded"
      style={{
        gridColumnStart: x + 1,
        gridColumnEnd: x + 1 + width,
        gridRowStart: y + 1,
        gridRowEnd: y + 1 + height,
        width: `${width * COLUMN_WIDTH}px`,
        height: `${height * rowHeight}px`,
        left: `${x * COLUMN_WIDTH}px`,
        top: `${y * rowHeight}px`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-xs text-green-600 font-medium">
        {width} × {height}
      </div>
    </div>
  );
};
