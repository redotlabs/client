import React from 'react';

import { useComponentManager } from './hooks/useComponentManager';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useGridSystem } from './hooks/useGridSystem';

import { ComponentLibrary } from './components/Sidebar/ComponentLibrary';
import { PropertyPanel } from './components/Sidebar/PropertyPanel';
import { Canvas } from './components/Canvas/Canvas';

import { initialPageData } from './constants/componentLibrary';

export default function SimpleWebBuilder() {
  const canvasRef = React.useRef<HTMLDivElement>(null);

  const {
    pageData,
    setPageData,
    selectedComponent,
    selectComponent,
    deleteComponent,
    updateComponentContent,
    updateComponentTransform,
  } = useComponentManager(initialPageData);

  const {
    draggedItem,
    isDragging,
    hoveredDropZone,
    handleDragStart,
    handleDragEnd,
    handleDropZoneHover,
    handleDropZoneLeave,
    handleDrop,
  } = useDragAndDrop(pageData, setPageData);

  const { gridZones, gridBackgroundStyle } = useGridSystem(
    canvasRef,
    pageData.components,
    draggedItem,
    isDragging
  );

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* 왼쪽 사이드바 - 컴포넌트 라이브러리 */}
      <ComponentLibrary
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />

      {/* 메인 캔버스 */}
      <Canvas
        canvasRef={canvasRef}
        components={pageData.components}
        selectedComponent={selectedComponent}
        isDragging={isDragging}
        draggedItem={draggedItem}
        hoveredDropZone={hoveredDropZone}
        gridZones={gridZones}
        gridBackgroundStyle={gridBackgroundStyle}
        onSelectComponent={selectComponent}
        onDeleteComponent={deleteComponent}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onDropZoneHover={handleDropZoneHover}
        onDropZoneLeave={handleDropZoneLeave}
      />

      {/* 오른쪽 속성 패널 */}
      <PropertyPanel
        selectedComponent={selectedComponent}
        onUpdateContent={updateComponentContent}
        onUpdateTransform={updateComponentTransform}
        onDeleteComponent={deleteComponent}
      />
    </div>
  );
}
