import React from 'react';
import { GridSystem } from './GridSystem';
import { ComponentRenderer } from './ComponentRenderer';
import type { Component, DraggedItem } from '@/app/types/component';
import type { GridZone } from '@/app/types/grid';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  components: Component[];
  selectedComponent: Component | null;
  isDragging: boolean;
  draggedItem: DraggedItem | null;
  hoveredDropZone: string | null;
  gridZones: GridZone[];
  gridBackgroundStyle: React.CSSProperties;
  onSelectComponent: (component: Component | null) => void;
  onDeleteComponent: (componentId: string) => void;
  onDragStart: (e: React.DragEvent, item: any, source: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDrop: (
    e: React.DragEvent,
    canvasRect?: DOMRect,
    targetZoneId?: string
  ) => void;
  onDropZoneHover: (zoneId: string, canvasWidth: number) => void;
  onDropZoneLeave: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  canvasRef,
  components,
  selectedComponent,
  isDragging,
  draggedItem,
  hoveredDropZone,
  gridZones,
  gridBackgroundStyle,
  onSelectComponent,
  onDeleteComponent,
  onDragStart,
  onDragEnd,
  onDrop,
  onDropZoneHover,
  onDropZoneLeave,
}) => {
  const canvasWidth = canvasRef.current?.getBoundingClientRect().width || 0;

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="bg-white h-full border rounded shadow-sm flex flex-col">
        <div className="p-4 border-b flex-shrink-0">
          <h1 className="text-xl font-bold">웹 페이지 에디터</h1>
        </div>

        <div className="flex-1 p-4">
          <div
            ref={canvasRef}
            className="relative bg-white border-2 border-dashed border-gray-300 overflow-hidden w-full h-full"
            onClick={() => onSelectComponent(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const canvasRect = e.currentTarget.getBoundingClientRect();
              onDrop(e, canvasRect);
            }}
          >
            {/* 격자 드롭 존 (드래그 중에만 표시) */}
            <GridSystem
              isDragging={isDragging}
              gridZones={gridZones}
              gridBackgroundStyle={gridBackgroundStyle}
              hoveredDropZone={hoveredDropZone}
              canvasWidth={canvasWidth}
              onDropZoneHover={onDropZoneHover}
              onDropZoneLeave={onDropZoneLeave}
              onDrop={onDrop}
              canvasRef={canvasRef}
            />

            {/* 기본 안내 메시지 */}
            {components.length === 0 && !isDragging && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">+</div>
                  <p>컴포넌트를 여기에 드래그하세요</p>
                  <p className="text-sm mt-2">
                    드래그하면 격자 영역이 나타납니다
                  </p>
                </div>
              </div>
            )}

            {/* 컴포넌트들 */}
            {components.map((component) => (
              <ComponentRenderer
                key={component.id}
                component={component}
                isSelected={selectedComponent?.id === component.id}
                isDragging={isDragging}
                draggedItemId={draggedItem?.id}
                onSelect={onSelectComponent}
                onDelete={onDeleteComponent}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
