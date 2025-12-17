import { useEffect, useState } from 'react';
import { cn } from '@redotlabs/utils';

/**
 * FrameInsertionLine
 * Frame 내부에서 드롭 위치를 표시하는 파란색 삽입 라인
 */
interface FrameInsertionLineProps {
  index: number;
  isHorizontal: boolean;
}

export const FrameInsertionLine = ({
  index,
  isHorizontal,
}: FrameInsertionLineProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 부모 Frame 요소에서 data-insert-index를 확인
    const checkVisibility = () => {
      const frameElement = document.querySelector(
        `[data-drop-target="true"][data-insert-index="${index}"]`
      );
      setIsVisible(!!frameElement);
    };

    // 초기 체크
    checkVisibility();

    const observer = new MutationObserver(checkVisibility);
    const frames = document.querySelectorAll('[data-block-type="frame"]');
    frames.forEach((frame) => {
      observer.observe(frame, {
        attributes: true,
        attributeFilter: ['data-drop-target', 'data-insert-index'],
      });
    });

    return () => observer.disconnect();
  }, [index]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'bg-blue-500 rounded',
        isHorizontal ? 'w-1 min-h-full' : 'h-1 min-w-full'
      )}
      style={{
        flexShrink: 0,
      }}
    />
  );
};
