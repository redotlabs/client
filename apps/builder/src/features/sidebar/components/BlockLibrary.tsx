import { BLOCK_REGISTRY, type BlockTemplate } from "@/core/blocks";
import { useBlockActions } from "@/features/canvas/hooks/useBlockActions";

interface BlockLibraryItemProps {
  template: BlockTemplate;
  onDoubleClick: (template: BlockTemplate) => void;
  onDragStart: (template: BlockTemplate) => void;
}

/**
 * 개별 블록 아이템 컴포넌트
 * TODO: 디자인 확정 후 아이콘 추가 예정
 */
const BlockLibraryItem = ({
  template,
  onDoubleClick,
  onDragStart,
}: BlockLibraryItemProps) => {
  return (
    <div
      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
      onDoubleClick={() => onDoubleClick(template)}
      draggable
      onDragStart={() => onDragStart(template)}
    >
      <span className="text-sm font-medium text-gray-700">
        {template.label}
      </span>
    </div>
  );
};

export const BlockLibrary = () => {
  const { handleAddBlock, handleDragStart } = useBlockActions();

  const handleDoubleClick = (template: BlockTemplate) => {
    handleAddBlock(template);
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Components</h2>
      <div className="space-y-2">
        {BLOCK_REGISTRY.map((template) => (
          <BlockLibraryItem
            key={template.id}
            template={template}
            onDoubleClick={handleDoubleClick}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};
