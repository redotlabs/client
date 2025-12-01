import { useEditorContext } from '@/context';
import { SectionCanvas } from './SectionCanvas';
import { SelectableSection } from './SelectableSection';

export const Canvas = () => {
  const { state } = useEditorContext();

  const currentPage = state.site.pages.find(
    (p) => p.id === state.currentPageId
  );
  const sections = currentPage?.sections || [];

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="w-full mx-auto">
        {sections.map((section) => (
          <SelectableSection key={section.id} section={section}>
            <SectionCanvas section={section} />
          </SelectableSection>
        ))}
      </div>
    </div>
  );
};
