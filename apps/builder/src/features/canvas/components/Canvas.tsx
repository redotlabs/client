import { useMemo } from "react";
import { useEditorContext } from "@/app/context/EditorContext";
import { SectionCanvas } from "./SectionCanvas";

/**
 * Canvas
 * 모든 섹션을 순서대로 렌더링하는 컨테이너
 * - 각 섹션마다 SectionCanvas 인스턴스 생성
 */
export const Canvas = () => {
  const { state } = useEditorContext();

  const sortedSections = useMemo(() => {
    return Array.from(state.sections.values()).sort(
      (a, b) => a.order - b.order
    );
  }, [state.sections]);

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="w-[1920px] mx-auto">
        {sortedSections.map((section) => (
          <div key={section.id} className="mb-8">
            {/* Section Header */}
            <div className="px-4 py-2 bg-white border-b">
              <h2 className="text-sm font-medium text-gray-700">{section.name}</h2>
            </div>

            {/* Section Canvas */}
            <SectionCanvas section={section} />
          </div>
        ))}
      </div>
    </div>
  );
};
