import React from 'react';
import { FrameRenderer, FrameInsertionLine } from '@repo/builder/renderer';
import type { RenderableBlock, FrameProps } from '@repo/builder/renderer';
import { FrameChildBlock } from './FrameChildBlock';
import { BlockRenderer } from '@repo/builder/renderer';

interface FrameBlockProps {
  block: RenderableBlock;
  isPreviewMode?: boolean;
}

/**
 * Frame 블록 전용 컴포넌트
 * - Frame은 Grid에 배치되지만 내부는 Flexbox로 children 관리
 * - Frame children은 FrameChildBlock으로 감싸서 선택 가능하게 함
 */
export const FrameBlock = ({ block, isPreviewMode = false }: FrameBlockProps) => {
  const props = block.props as unknown as FrameProps;
  const children = block.children || [];
  const direction = props.layout.direction;
  const isHorizontal = direction === 'horizontal' || direction === 'wrap';

  return (
    <FrameRenderer
      layout={props.layout}
      backgroundColor={props.backgroundColor}
      borderRadius={props.borderRadius}
      className={props.className}
    >
      {children.map((child, index) => (
        <React.Fragment key={child.id}>
          <FrameInsertionLine index={index} isHorizontal={isHorizontal} />
          <FrameChildBlock blockId={child.id}>
            <div data-block-id={child.id}>
              <BlockRenderer block={child} isPreviewMode={isPreviewMode} />
            </div>
          </FrameChildBlock>
        </React.Fragment>
      ))}
      <FrameInsertionLine index={children.length} isHorizontal={isHorizontal} />
    </FrameRenderer>
  );
};
