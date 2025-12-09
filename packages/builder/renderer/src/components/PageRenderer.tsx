import type { PageContent } from '../types';
import { SectionRenderer } from './SectionRenderer';

interface PageRendererProps {
  content: PageContent;
}

export const PageRenderer = ({ content }: PageRendererProps) => {
  return (
    <div className="w-full">
      {content.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
};
