import { useEditorContext } from "@/app/context/EditorContext";
import { selectSection } from "@/core/actions";
import { SectionToolbar } from "./SectionToolbar";
import { SectionResizeHandle } from "./SectionResizeHandle";
import { calculateMinSectionRows } from "@/shared/utils/sectionHeight";
import type { ReactNode } from "react";
import type { Section } from "@/shared/types";

interface SelectableSectionProps {
  section: Section;
  children: ReactNode;
}

/**
 * SelectableSection
 * 섹션을 클릭하여 선택할 수 있게 만들고,
 * 선택된 섹션은 border와 toolbar를 표시
 */
export const SelectableSection = ({
  section,
  children,
}: SelectableSectionProps) => {
  const { state, dispatch } = useEditorContext();
  const isSelected = state.selection.selectedSectionId === section.id;

  const handleClick = () => {
    dispatch(selectSection(section.id));
  };

  const minRows = calculateMinSectionRows(section.blocks);

  return (
    <div
      className={`mb-8 cursor-pointer relative ${
        isSelected
          ? "border-4 border-blue-500 shadow-lg"
          : "border-4 border-transparent"
      }`}
      onClick={handleClick}
    >
      {children}

      {isSelected && (
        <>
          <SectionToolbar sectionId={section.id} />
          <SectionResizeHandle
            sectionId={section.id}
            currentRows={section.rows}
            minRows={minRows}
          />
        </>
      )}
    </div>
  );
};
