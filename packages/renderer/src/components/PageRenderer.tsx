import type { Page } from "../types";
import { SectionRenderer } from "./SectionRenderer";

interface PageRendererProps {
  page: Page;
}

export const PageRenderer = ({ page }: PageRendererProps) => {
  return (
    <div className="w-full">
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
};
