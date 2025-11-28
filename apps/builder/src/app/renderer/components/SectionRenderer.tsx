import type { Section, RenderableBlock } from "@/shared/types";
import { BlockRenderer } from "./BlockRenderer";
import { BlockConverter } from "@/features/canvas/utils/block-converter";
import {
  COLUMN_WIDTH,
  DEFAULT_GRID_CONFIG,
} from "@/shared/constants/editorData";

interface SectionRendererProps {
  section: Section;
}

export const SectionRenderer = ({ section }: SectionRendererProps) => {
  const rows = section.rows || 25;
  const rowHeight = DEFAULT_GRID_CONFIG.rowHeight;
  const columns = DEFAULT_GRID_CONFIG.columns;

  const converter = new BlockConverter({
    columns: columns,
    rows: rows,
    rowHeight: rowHeight,
    gap: 0,
  });
  const renderableBlocks = converter.convertBlocks(section.blocks);

  return (
    <div
      className="w-full bg-gray-100 overflow-hidden grid gap-0 p-0"
      style={{
        gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
        gridTemplateColumns: `repeat(${columns}, ${COLUMN_WIDTH}px)`,
        minHeight: `${rows * rowHeight}px`,
      }}
    >
      {renderableBlocks.map((block: RenderableBlock) => (
        <div
          key={block.id}
          data-block-id={block.id}
          data-block-type={block.type}
          style={{ ...block.style, overflow: "visible" }}
        >
          <BlockRenderer block={block} isPreviewMode={true} />
        </div>
      ))}
    </div>
  );
};
