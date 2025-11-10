import { useEditorContext } from "@/app/context/EditorContext";
import { SectionCanvas } from "./SectionCanvas";
import { SelectableSection } from "./SelectableSection";

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
