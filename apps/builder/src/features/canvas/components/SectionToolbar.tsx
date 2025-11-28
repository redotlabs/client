import { useEditorContext } from "@/app/context/EditorContext";
import { reorderSection, insertSection, deleteSection } from "@/core/actions";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

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

  const currentPage = state.site.pages.find(
    (p) => p.id === state.currentPageId
  );
  const sections = currentPage?.sections || [];

  const currentIndex = sections.findIndex((s) => s.id === sectionId);

  const canMoveUp = currentIndex > 0;
  const canMoveDown = currentIndex < sections.length - 1;

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
        className="p-2 rounded transition-colors hover:bg-gray-100 text-gray-700 cursor-pointer"
        title="Add Section Below"
      >
        <Plus />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Move Up Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleMoveUp();
        }}
        disabled={!canMoveUp}
        className={`p-2 rounded transition-colors cursor-pointer ${
          canMoveUp
            ? "hover:bg-gray-100 text-gray-700"
            : "text-gray-300 cursor-not-allowed"
        }`}
        title="Move Section Up"
      >
        <ChevronUp />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Move Down Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleMoveDown();
        }}
        disabled={!canMoveDown}
        className={`p-2 rounded transition-colors cursor-pointer ${
          canMoveDown
            ? "hover:bg-gray-100 text-gray-700"
            : "text-gray-300 cursor-not-allowed"
        }`}
        title="Move Section Down"
      >
        <ChevronDown />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      {/* Delete Section Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="p-2 rounded transition-colors text-red-600 hover:bg-red-100 cursor-pointer"
        title="Delete Section"
      >
        <Trash2 />
      </button>
    </div>
  );
};
