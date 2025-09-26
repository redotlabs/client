import { COMPONENT_TYPES, type Component } from '@/app/types/component';
import React from 'react';

interface PropertyPanelProps {
  selectedComponent: Component | null;
  onUpdateContent: (componentId: string, newContent: string) => void;
  onUpdateTransform: (componentId: string, updates: any) => void;
  onDeleteComponent: (componentId: string) => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedComponent,
  onUpdateContent,
  onUpdateTransform,
  onDeleteComponent,
}) => {
  if (!selectedComponent) {
    return null;
  }

  return (
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
                onUpdateContent(selectedComponent.id, e.target.value)
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이미지 URL"
            />
          ) : (
            <input
              type="text"
              value={selectedComponent.content || ''}
              onChange={(e) =>
                onUpdateContent(selectedComponent.id, e.target.value)
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="내용을 입력하세요"
            />
          )}
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">위치 및 크기</h4>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600">X</label>
              <input
                type="number"
                value={selectedComponent.position.x}
                onChange={(e) =>
                  onUpdateTransform(selectedComponent.id, {
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
                  onUpdateTransform(selectedComponent.id, {
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
                  onUpdateTransform(selectedComponent.id, {
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
                  onUpdateTransform(selectedComponent.id, {
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
          onClick={() => onDeleteComponent(selectedComponent.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          ✕ 삭제
        </button>
      </div>
    </div>
  );
};
