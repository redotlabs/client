import { useMemo } from "react";
import { useEditorContext } from "@/app/context/EditorContext";
import { SectionCanvas } from "./SectionCanvas";

/**
 * Canvas
 * 모든 섹션을 순서대로 렌더링하는 컨테이너
 * - 각 섹션마다 SectionCanvas 인스턴스 생성
 * - 섹션 추가 UI 제공 (TODO)
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
            <SectionCanvas section={section} />
          </div>
        ))}
      </div>
    </div>
  );
};
