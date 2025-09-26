import type { Component, PageData } from '@/app/types/component';
import { useState } from 'react';

export const useComponentManager = (initialData: PageData) => {
  const [pageData, setPageData] = useState<PageData>(initialData);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  );

  const selectComponent = (component: Component) => {
    setSelectedComponent(component);
  };

  const deleteComponent = (componentId: string) => {
    const newComponents = pageData.components.filter(
      (comp) => comp.id !== componentId
    );
    setPageData({ ...pageData, components: newComponents });
    setSelectedComponent(null);
  };

  const updateComponentContent = (componentId: string, newContent: string) => {
    const newComponents = pageData.components.map((comp) =>
      comp.id === componentId ? { ...comp, content: newContent } : comp
    );
    setPageData({ ...pageData, components: newComponents });
  };

  const updateComponentTransform = (componentId: string, updates: any) => {
    const newComponents = pageData.components.map((comp) =>
      comp.id === componentId
        ? {
            ...comp,
            position: updates.position || comp.position,
            size: updates.size || comp.size,
          }
        : comp
    );
    setPageData({ ...pageData, components: newComponents });
  };

  return {
    pageData,
    setPageData,
    selectedComponent,
    selectComponent,
    deleteComponent,
    updateComponentContent,
    updateComponentTransform,
  };
};
