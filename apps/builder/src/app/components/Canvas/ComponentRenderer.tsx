import { COMPONENT_TYPES, type Component } from '@/app/types/component';
import { generateGridArea } from '@/app/utils/gridHelpers';

interface ComponentRendererProps {
  component: Component;
}

/* 디자인 시스템 컴포넌트 정의됨에 따라 렌더러 로직 도 추후에 다 수정할 예정! 현재는 예시 코드로 설정 */

export const ComponentRenderer = ({ component }: ComponentRendererProps) => {
  const renderComponentContent = () => {
    switch (component.type) {
      case COMPONENT_TYPES.TEXT:
        return (
          <div className="text-lg text-center w-full overflow-hidden text-ellipsis">
            {component.content}
          </div>
        );

      case COMPONENT_TYPES.IMAGE:
        return (
          <img
            src={component.content}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        );

      case COMPONENT_TYPES.BUTTON:
        return (
          <div className="px-4 py-2 bg-blue-500 text-white rounded whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {component.content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="border-2 border-gray-200 flex items-center justify-center"
      style={{
        gridArea: generateGridArea(component.gridPosition),
        padding: '8px',
        ...component.style,
      }}
    >
      {renderComponentContent()}
    </div>
  );
};
