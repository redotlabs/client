import { useMemo } from "react";
import { useEditorContext } from "@/app/context/EditorContext";
import { SectionCanvas } from "./SectionCanvas";
import { selectSection } from "@/core/actions";

/**
 * Canvas
 * 모든 섹션을 순서대로 렌더링하는 컨테이너
 * - 각 섹션마다 SectionCanvas 인스턴스 생성
 */
export const Canvas = () => {
  const { state, dispatch } = useEditorContext();

  const sortedSections = useMemo(() => {
    return Array.from(state.sections.values()).sort(
      (a, b) => a.order - b.order
    );
  }, [state.sections]);

  const handleSectionClick = (sectionId: string) => {
    dispatch(selectSection(sectionId));
  };

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="w-full mx-auto ">
        {sortedSections.map((section) => {
          const isSelected = state.selection.selectedSectionId === section.id;

          return (
            <div
              key={section.id}
              className={`mb-8 transition-all cursor-pointer ${
                isSelected
                  ? "border-4 border-blue-500 shadow-lg"
                  : "border-4 border-transparent"
              }`}
              onClick={() => handleSectionClick(section.id)}
            >
              {/* Section Canvas */}
              <SectionCanvas section={section} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
