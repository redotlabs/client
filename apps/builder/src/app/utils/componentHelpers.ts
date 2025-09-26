import type { ComponentSize, DraggedItem } from '@/app/types/component';
import { componentLibrary } from '../constants/componentLibrary';

export const getComponentSizeFromDraggedItem = (
  draggedItem: DraggedItem
): ComponentSize => {
  let componentSize = { width: 200, height: 40 };

  if (draggedItem.source === 'library') {
    const componentType = componentLibrary.find(
      (comp) => comp.id === draggedItem.id
    );
    if (componentType) {
      componentSize = componentType.defaultSize;
    }
  } else if (draggedItem.source === 'canvas') {
    componentSize = draggedItem.size || componentSize;
  }

  return componentSize;
};
