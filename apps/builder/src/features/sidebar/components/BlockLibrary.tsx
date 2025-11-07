import { BLOCK_REGISTRY, type BlockTemplate } from "@/core/blocks";
import { useBlockActions } from "@/features/canvas/hooks/useBlockActions";
import { useEditorContext } from "@/app/context/EditorContext";
import { createSection, deleteSection } from "@/core/actions";

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
  const { state, dispatch } = useEditorContext();

  const handleDoubleClick = (template: BlockTemplate) => {
    handleAddBlock(template);
  };

  const handleAddSection = () => {
    dispatch(createSection());
  };

  const handleDeleteSection = (sectionId: string) => {
    if (state.sections.length <= 1) {
      alert('Cannot delete the last section');
      return;
    }

    if (confirm('Are you sure you want to delete this section? All blocks in this section will be deleted.')) {
      dispatch(deleteSection(sectionId));
    }
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4 overflow-y-auto">
      {/* Sections Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Sections</h2>
        <div className="space-y-2 mb-3">
          {state.sections.map((section) => (
            <div
              key={section.id}
              className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between group"
            >
              <span className="text-sm text-gray-700">{section.name}</span>
              <button
                onClick={() => handleDeleteSection(section.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                title="Delete Section"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddSection}
          className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>+</span>
          <span>Add Section</span>
        </button>
      </div>

      {/* Components Section */}
      <div>
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
    </div>
  );
};
