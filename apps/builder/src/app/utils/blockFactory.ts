import {
  type TextBlock,
  type ImageBlock,
  type ButtonBlock,
  type ContainerBlock,
  type BlockPosition,
  type BlockSize,
  type TextBlockAttributes,
  type ImageBlockAttributes,
  type ButtonBlockAttributes,
  type ContainerBlockAttributes,
  type BlockFactory,
} from '@/app/types';

// 고유 ID 생성기
const generateId = (): string => {
  return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 블록 팩토리 구현
export const blockFactory: BlockFactory = {
  createTextBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: TextBlockAttributes
  ): TextBlock {
    return {
      id: generateId(),
      type: 'text',
      position,
      size,
      attributes,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        locked: false,
        hidden: false,
      },
    };
  },

  createImageBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ImageBlockAttributes
  ): ImageBlock {
    return {
      id: generateId(),
      type: 'image',
      position,
      size,
      attributes,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        locked: false,
        hidden: false,
      },
    };
  },

  createButtonBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ButtonBlockAttributes
  ): ButtonBlock {
    return {
      id: generateId(),
      type: 'button',
      position,
      size,
      attributes,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        locked: false,
        hidden: false,
      },
    };
  },

  createContainerBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ContainerBlockAttributes
  ): ContainerBlock {
    return {
      id: generateId(),
      type: 'container',
      position,
      size,
      attributes,
      children: [],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        locked: false,
        hidden: false,
      },
    };
  },
};

// 편의 함수들
export const createTextBlock = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<TextBlockAttributes>
): TextBlock => {
  return blockFactory.createTextBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { text, ...options }
  );
};

export const createImageBlock = (
  x: number,
  y: number,
  width: number,
  height: number,
  src: string,
  options?: Partial<ImageBlockAttributes>
): ImageBlock => {
  return blockFactory.createImageBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { src, ...options }
  );
};

export const createButtonBlock = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<ButtonBlockAttributes>
): ButtonBlock => {
  return blockFactory.createButtonBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { text, ...options }
  );
};
