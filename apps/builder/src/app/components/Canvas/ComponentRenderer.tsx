import { COMPONENT_TYPES, type Component } from '@/app/types/component';
import React from 'react';

interface ComponentRendererProps {
  component: Component;
  isSelected: boolean;
  isDragging: boolean;
  draggedItemId?: string;
  onSelect: (component: Component) => void;
  onDelete: (componentId: string) => void;
  onDragStart: (
    e: React.DragEvent,
    component: Component,
    source: string
  ) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isSelected,
  isDragging,
  draggedItemId,
  onSelect,
  onDelete,
  onDragStart,
  onDragEnd,
}) => {
  const commonProps = {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(component);
    },
    className: `absolute border-2 transition-all flex items-center justify-center ${
      isSelected
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-gray-400'
    }`,
    style: {
      left: component.position.x,
      top: component.position.y,
      width: component.size.width,
      height: component.size.height,
      padding: '8px',
      cursor: isDragging ? 'grabbing' : 'grab',
      zIndex: isDragging && draggedItemId === component.id ? 1000 : 'auto',
      ...component.style,
    },
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      e.stopPropagation();
      onDragStart(e, component, 'canvas');
    },
    onDragEnd: (e: React.DragEvent) => {
      e.stopPropagation();
      onDragEnd(e);
    },
    onMouseDown: (e: React.MouseEvent) => {
      e.stopPropagation();
    },
  };

  const renderComponentContent = () => {
    switch (component.type) {
      case COMPONENT_TYPES.TEXT:
        return (
          <div
            className="text-lg text-center w-full overflow-hidden text-ellipsis pointer-events-none"
            style={{ userSelect: 'none' }}
          >
            {component.content}
          </div>
        );

      case COMPONENT_TYPES.IMAGE:
        return (
          <img
            src={component.content}
            alt=""
            className="max-w-full max-h-full object-contain pointer-events-none"
            style={{ userSelect: 'none' }}
            draggable={false}
          />
        );

      case COMPONENT_TYPES.BUTTON:
        return (
          <div
            className="px-4 py-2 bg-blue-500 text-white rounded whitespace-nowrap overflow-hidden text-ellipsis max-w-full pointer-events-none"
            style={{ userSelect: 'none' }}
          >
            {component.content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div key={component.id} {...commonProps}>
      {renderComponentContent()}

      {/* 선택된 컴포넌트 제어 */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {component.type}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(component.id);
            }}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
