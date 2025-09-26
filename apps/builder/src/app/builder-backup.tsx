/* 리팩토링 하면서 백업 확인용 파일로 만들어 놓은 거라서 무시하면 됨! */

import React, { useState } from 'react';

// 컴포넌트 타입
const COMPONENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  ROW: 'row',
  COLUMN: 'column',
  SECTION: 'section',
};

// 초기 페이지 데이터
const initialPageData = {
  components: [
    {
      id: 'text-1',
      type: COMPONENT_TYPES.TEXT,
      content: '제목 텍스트',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 40 },
      style: {},
    },
    {
      id: 'text-2',
      type: COMPONENT_TYPES.TEXT,
      content: '부제목 텍스트',
      position: { x: 100, y: 160 },
      size: { width: 180, height: 30 },
      style: {},
    },
  ],
};

// 컴포넌트 라이브러리 (임시)
const componentLibrary = [
  {
    id: 'text-comp',
    type: COMPONENT_TYPES.TEXT,
    label: '📝 텍스트',
    defaultContent: '새로운 텍스트',
    defaultSize: { width: 200, height: 40 },
  },
  {
    id: 'image-comp',
    type: COMPONENT_TYPES.IMAGE,
    label: '🖼️ 이미지',
    defaultContent: 'https://via.placeholder.com/300x150?text=이미지',
    defaultSize: { width: 300, height: 150 },
  },
  {
    id: 'button-comp',
    type: COMPONENT_TYPES.BUTTON,
    label: '🔘 버튼',
    defaultContent: '버튼',
    defaultSize: { width: 120, height: 40 },
  },
];

export default function SimpleWebBuilder() {
  const [pageData, setPageData] = useState(initialPageData);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredDropZone, setHoveredDropZone] = useState<string | null>(null);
  const canvasRef = React.useRef<HTMLDivElement>(null);

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent, item: any, source: string) => {
    setDraggedItem({ ...item, source });
    setIsDragging(true);
    setHoveredDropZone(null);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setHoveredDropZone(null);
    setDraggedItem(null);
  };

  const GRID_SIZE = 30; // 격자 크기
  const GRID_COLS = 50; // 격자 열 수

  const generateGridZones = (canvasWidth: number, canvasHeight: number) => {
    const zones = [];
    const rows = Math.floor(canvasHeight / GRID_SIZE);
    const actualCols = Math.floor(canvasWidth / (canvasWidth / GRID_COLS));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < actualCols; col++) {
        const zoneId = `${row}-${col}`;
        const x = col * (canvasWidth / actualCols);
        const y = row * GRID_SIZE;
        const width = canvasWidth / actualCols;
        const height = GRID_SIZE;

        // 이미 컴포넌트가 있는 영역인지 확인 (드래그 중인 컴포넌트 제외)
        const isOccupied = pageData.components.some((comp) => {
          if (
            draggedItem &&
            draggedItem.source === 'canvas' &&
            comp.id === draggedItem.id
          ) {
            return false;
          }

          const compRight = comp.position.x + comp.size.width;
          const compBottom = comp.position.y + comp.size.height;
          const zoneRight = x + width;
          const zoneBottom = y + height;

          return !(
            comp.position.x >= zoneRight ||
            compRight <= x ||
            comp.position.y >= zoneBottom ||
            compBottom <= y
          );
        });

        zones.push({ id: zoneId, x, y, width, height, isOccupied });
      }
    }

    return zones;
  };

  // 컴포넌트 크기에 맞는 격자 영역 계산
  const getGridSpanForComponent = (
    componentSize: { width: number; height: number },
    canvasWidth: number
  ) => {
    const cellWidth = canvasWidth / GRID_COLS;
    const cellHeight = GRID_SIZE;

    const spanCols = Math.max(1, Math.ceil(componentSize.width / cellWidth));
    const spanRows = Math.max(1, Math.ceil(componentSize.height / cellHeight));

    return { spanCols, spanRows };
  };

  // 드롭 존간 거리 계산
  const getDropZoneFromPosition = (x: number, y: number) => {
    const canvasWidth = 720;
    const col = Math.floor((x / canvasWidth) * GRID_COLS);
    const row = Math.floor(y / GRID_SIZE);
    return `${row}-${col}`;
  };

  // 드롭 존에서 실제 위치 계산
  const getPositionFromDropZone = (zoneId: string, canvasWidth: number) => {
    const [row, col] = zoneId.split('-').map(Number);
    const actualCols = Math.floor(canvasWidth / (canvasWidth / GRID_COLS));
    const x = col * (canvasWidth / actualCols);
    const y = row * GRID_SIZE;
    return { x, y };
  };

  const handleDrop = (
    e: React.DragEvent,
    canvasRect?: DOMRect,
    targetZoneId?: string
  ) => {
    e.preventDefault();
    setIsDragging(false);
    setHoveredDropZone(null);

    if (!draggedItem || !canvasRect) return;

    let finalPosition;

    if (targetZoneId) {
      // 격자 영역에 드롭
      finalPosition = getPositionFromDropZone(targetZoneId, canvasRect.width);
    } else {
      // 자유 위치에 드롭
      const rawX = e.clientX - canvasRect.left;
      const rawY = e.clientY - canvasRect.top;
      finalPosition = { x: rawX, y: rawY };
    }

    if (draggedItem.source === 'library') {
      const componentType = componentLibrary.find(
        (comp) => comp.id === draggedItem.id
      );
      if (componentType) {
        const newComponent = {
          id: `${componentType.type}-${Date.now()}`,
          type: componentType.type,
          content: componentType.defaultContent,
          position: finalPosition,
          size: componentType.defaultSize,
          style: {},
        };

        const newComponents = [...pageData.components, newComponent];
        setPageData({ ...pageData, components: newComponents });
      }
    } else if (draggedItem.source === 'canvas') {
      const newComponents = pageData.components.map((comp) =>
        comp.id === draggedItem.id ? { ...comp, position: finalPosition } : comp
      );
      setPageData({ ...pageData, components: newComponents });
    }

    setDraggedItem(null);
  };

  // 드롭 존 호버 처리 (멀티 그리드)
  const handleDropZoneHover = (zoneId: string, canvasWidth: number) => {
    if (isDragging && draggedItem) {
      // 드래그 중인 컴포넌트의 크기 정보 가져오기
      let componentSize = { width: 200, height: 40 };

      if (draggedItem.source === 'library') {
        const componentType = componentLibrary.find(
          (comp) => comp.id === draggedItem.id
        );
        if (componentType) {
          componentSize = componentType.defaultSize;
        }
      } else if (draggedItem.source === 'canvas') {
        componentSize = draggedItem.size;
      }

      const { spanCols, spanRows } = getGridSpanForComponent(
        componentSize,
        canvasWidth
      );
      const [startRow, startCol] = zoneId.split('-').map(Number);

      const hoveredZones = [];
      for (let r = startRow; r < startRow + spanRows; r++) {
        for (let c = startCol; c < startCol + spanCols; c++) {
          if (c < GRID_COLS) {
            hoveredZones.push(`${r}-${c}`);
          }
        }
      }

      setHoveredDropZone(hoveredZones.join(','));
    }
  };

  const handleDropZoneLeave = () => {
    setHoveredDropZone(null);
  };

  const selectComponent = (component: any) => {
    setSelectedComponent(component);
  };

  const deleteComponent = (componentId: string) => {
    const newComponents = pageData.components.filter(
      (comp: any) => comp.id !== componentId
    );
    setPageData({ ...pageData, components: newComponents });
    setSelectedComponent(null);
  };

  const updateComponentContent = (componentId: string, newContent: string) => {
    const newComponents = pageData.components.map((comp: any) =>
      comp.id === componentId ? { ...comp, content: newContent } : comp
    );
    setPageData({ ...pageData, components: newComponents });
  };

  const updateComponentTransform = (componentId: string, updates: any) => {
    const newComponents = pageData.components.map((comp: any) =>
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

  const renderComponent = (component: any) => {
    const isSelected = selectedComponent?.id === component.id;

    const commonProps = {
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        selectComponent(component);
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
        zIndex: isDragging && draggedItem?.id === component.id ? 1000 : 'auto',
        ...component.style,
      },
      draggable: true,
      onDragStart: (e: React.DragEvent) => {
        e.stopPropagation();
        handleDragStart(e, component, 'canvas');
      },
      onDragEnd: (e: React.DragEvent) => {
        e.stopPropagation();
        handleDragEnd();
      },
      onMouseDown: (e: React.MouseEvent) => {
        // 드래그를 위해 필요
        e.stopPropagation();
      },
    };

    const componentContent = (() => {
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
    })();

    return (
      <div key={component.id} {...commonProps}>
        {componentContent}

        {/* 선택된 컴포넌트 제어 */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              {component.type}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(component.id);
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

  const renderGridDropZones = () => {
    if (!isDragging || !canvasRef.current) return null;

    const rect = canvasRef.current.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const zones = generateGridZones(canvasWidth, canvasHeight);
    const actualCols = Math.floor(canvasWidth / (canvasWidth / GRID_COLS));

    return (
      <>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: `${canvasWidth / actualCols}px ${GRID_SIZE}px`,
            zIndex: 100,
          }}
        />

        {zones.map((zone) => {
          const hoveredZoneIds = hoveredDropZone
            ? hoveredDropZone.split(',')
            : [];
          const isHovered = hoveredZoneIds.includes(zone.id);

          return (
            <div
              key={zone.id}
              className="absolute transition-all duration-200"
              style={{
                left: zone.x,
                top: zone.y,
                width: zone.width,
                height: zone.height,
                zIndex: 200,
                backgroundColor: zone.isOccupied
                  ? 'rgba(239, 68, 68, 0.2)'
                  : isHovered
                    ? 'rgba(59, 130, 246, 0.3)'
                    : 'transparent',
                border: isHovered ? '2px solid #3b82f6' : 'none',
                cursor: zone.isOccupied ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={() =>
                !zone.isOccupied && handleDropZoneHover(zone.id, canvasWidth)
              }
              onMouseLeave={handleDropZoneLeave}
              onDragOver={(e) => {
                e.preventDefault();
                if (!zone.isOccupied) {
                  handleDropZoneHover(zone.id, canvasWidth);
                }
              }}
              onDrop={(e) => {
                if (!zone.isOccupied && canvasRef.current) {
                  const canvasRect = canvasRef.current.getBoundingClientRect();
                  handleDrop(e, canvasRect, zone.id);
                }
              }}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* 왼쪽 사이드바 - 컴포넌트 라이브러리 */}
      <div className="w-64 bg-white border-r p-4 flex-shrink-0">
        <h2 className="font-bold text-lg mb-4">컴포넌트</h2>
        <div className="space-y-2">
          {componentLibrary.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component, 'library')}
              onDragEnd={handleDragEnd}
              className="flex items-center gap-3 p-3 border rounded cursor-grab hover:bg-gray-50"
            >
              <span>{component.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 메인 캔버스 (격자 드롭 존) */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white h-full border rounded shadow-sm flex flex-col">
          <div className="p-4 border-b flex-shrink-0">
            <h1 className="text-xl font-bold">웹 페이지 에디터</h1>
          </div>

          <div className="flex-1 p-4">
            <div
              ref={canvasRef}
              className="relative bg-white border-2 border-dashed border-gray-300 overflow-hidden w-full h-full"
              onClick={() => setSelectedComponent(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const canvasRect = e.currentTarget.getBoundingClientRect();
                handleDrop(e, canvasRect);
              }}
            >
              {/* 격자 드롭 존 (드래그 중에만 표시) */}
              {renderGridDropZones()}

              {/* 기본 안내 메시지 */}
              {pageData.components.length === 0 && !isDragging && (
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
              {pageData.components.map((component: any) =>
                renderComponent(component)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 속성 패널 */}
      {selectedComponent && (
        <div className="w-80 bg-white border-l p-4 flex-shrink-0 overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">속성 편집</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">내용</label>
              {selectedComponent.type === COMPONENT_TYPES.IMAGE ? (
                <input
                  type="url"
                  value={selectedComponent.content || ''}
                  onChange={(e) =>
                    updateComponentContent(selectedComponent.id, e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="이미지 URL"
                />
              ) : (
                <input
                  type="text"
                  value={selectedComponent.content || ''}
                  onChange={(e) =>
                    updateComponentContent(selectedComponent.id, e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="내용을 입력하세요"
                />
              )}
            </div>

            {/* 위치 및 크기 조정 */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">위치 및 크기</h4>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600">X</label>
                  <input
                    type="number"
                    value={selectedComponent.position.x}
                    onChange={(e) =>
                      updateComponentTransform(selectedComponent.id, {
                        position: {
                          ...selectedComponent.position,
                          x: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Y</label>
                  <input
                    type="number"
                    value={selectedComponent.position.y}
                    onChange={(e) =>
                      updateComponentTransform(selectedComponent.id, {
                        position: {
                          ...selectedComponent.position,
                          y: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">너비</label>
                  <input
                    type="number"
                    value={selectedComponent.size.width}
                    onChange={(e) =>
                      updateComponentTransform(selectedComponent.id, {
                        size: {
                          ...selectedComponent.size,
                          width: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">높이</label>
                  <input
                    type="number"
                    value={selectedComponent.size.height}
                    onChange={(e) =>
                      updateComponentTransform(selectedComponent.id, {
                        size: {
                          ...selectedComponent.size,
                          height: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => deleteComponent(selectedComponent.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ✕ 삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
