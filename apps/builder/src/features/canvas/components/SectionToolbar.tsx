import { useEditorContext } from "@/app/context/EditorContext";
import { reorderSection, insertSection, deleteSection } from "@/core/actions";

interface SectionToolbarProps {
  sectionId: string;
}

/**
 * SectionToolbar
 * 선택된 섹션 하단에 표시되는 툴바
 * - 섹션 이동 (위/아래)
 * - 섹션 추가 (현재 섹션 바로 아래에)
 * - 섹션 삭제
 */
export const SectionToolbar = ({ sectionId }: SectionToolbarProps) => {
  const { state, dispatch } = useEditorContext();

  const currentIndex = state.sections.findIndex((s) => s.id === sectionId);

  const canMoveUp = currentIndex > 0;
  const canMoveDown = currentIndex < state.sections.length - 1;

  const handleMoveUp = () => {
    if (!canMoveUp) return;
    dispatch(reorderSection(currentIndex, currentIndex - 1));
  };

  const handleMoveDown = () => {
    if (!canMoveDown) return;
    dispatch(reorderSection(currentIndex, currentIndex + 1));
  };

  const handleAddSection = () => {
    const targetIndex = currentIndex + 1;
    dispatch(insertSection(targetIndex));
  };

  const handleDelete = () => {
    dispatch(deleteSection(sectionId));
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 z-10">
      {/* Add Section Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddSection();
        }}
        className="p-2 rounded transition-colors hover:bg-gray-100 text-gray-700"
        title="Add Section Below"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300" />

      {/* Move Up Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleMoveUp();
        }}
        disabled={!canMoveUp}
        className={`p-2 rounded transition-colors ${
          canMoveUp
            ? "hover:bg-gray-100 text-gray-700"
            : "text-gray-300 cursor-not-allowed"
        }`}
        title="Move Section Up"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300" />

      {/* Move Down Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleMoveDown();
        }}
        disabled={!canMoveDown}
        className={`p-2 rounded transition-colors ${
          canMoveDown
            ? "hover:bg-gray-100 text-gray-700"
            : "text-gray-300 cursor-not-allowed"
        }`}
        title="Move Section Down"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300" />

      {/* Delete Section Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="p-2 rounded transition-colors text-red-600 hover:bg-red-100 "
        title="Delete Section"
      >
        <svg
          className="w-5 h-5"
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
  );
};
