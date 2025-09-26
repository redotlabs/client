import React from 'react';
import { componentLibrary } from '../../constants/componentLibrary';

interface ComponentLibraryProps {
  onDragStart: (e: React.DragEvent, item: any, source: string) => void;
  onDragEnd: () => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div className="w-64 bg-white border-r p-4 flex-shrink-0">
      <h2 className="font-bold text-lg mb-4">컴포넌트</h2>
      <div className="space-y-2">
        {componentLibrary.map((component) => (
          <div
            key={component.id}
            draggable
            onDragStart={(e) => onDragStart(e, component, 'library')}
            onDragEnd={onDragEnd}
            className="flex items-center gap-3 p-3 border rounded cursor-grab hover:bg-gray-50"
          >
            <span>{component.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
