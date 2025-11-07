import { useEditorContext } from "@/app/context/EditorContext";
import { reorderSection } from "@/core/actions";

interface SectionToolbarProps {
  sectionId: string;
}

/**
 * SectionToolbar
 * 선택된 섹션 하단에 표시되는 툴바
 * - 섹션을 위/아래로 이동할 수 있는 화살표 버튼 제공
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

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 z-10">
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
    </div>
  );
};
