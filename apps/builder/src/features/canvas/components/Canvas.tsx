import { useEditorContext } from "@/app/context/EditorContext";
import { SectionCanvas } from "./SectionCanvas";
import { SelectableSection } from "./SelectableSection";

/**
 * Canvas
 * 모든 섹션을 순서대로 렌더링하는 컨테이너
 * - 각 섹션마다 SelectableSection으로 감싸서 렌더링
 */
export const Canvas = () => {
  const { state } = useEditorContext();

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="w-full mx-auto">
        {state.sections.map((section) => (
          <SelectableSection key={section.id} section={section}>
            <SectionCanvas section={section} />
          </SelectableSection>
        ))}
      </div>
    </div>
  );
};
