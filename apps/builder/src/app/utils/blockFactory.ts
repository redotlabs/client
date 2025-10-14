import type {
  TextBlock,
  ImageBlock,
  ButtonBlock,
  BlockPosition,
  BlockSize,
  TextBlockAttributes,
  ImageBlockAttributes,
  ButtonBlockAttributes,
} from '@/app/types';
import { generateId, createDefaultMetadata } from './helpers';

// 기본 블록 생성 함수들
export const createTextBlock = (
  position: BlockPosition,
  size: BlockSize,
  attributes: TextBlockAttributes
): TextBlock => ({
  id: generateId(),
  type: 'text',
  position,
  size,
  attributes,
  metadata: createDefaultMetadata(),
});

export const createImageBlock = (
  position: BlockPosition,
  size: BlockSize,
  attributes: ImageBlockAttributes
): ImageBlock => ({
  id: generateId(),
  type: 'image',
  position,
  size,
  attributes,
  metadata: createDefaultMetadata(),
});

export const createButtonBlock = (
  position: BlockPosition,
  size: BlockSize,
  attributes: ButtonBlockAttributes
): ButtonBlock => ({
  id: generateId(),
  type: 'button',
  position,
  size,
  attributes,
  metadata: createDefaultMetadata(),
});

// 편의 함수: 좌표와 크기로 직접 블록 생성
export const createTextBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<TextBlockAttributes>
): TextBlock => {
  return createTextBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { text, ...options }
  );
};

export const createImageBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  src: string,
  options?: Partial<ImageBlockAttributes>
): ImageBlock => {
  return createImageBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { src, ...options }
  );
};

export const createButtonBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<ButtonBlockAttributes>
): ButtonBlock => {
  return createButtonBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { text, ...options }
  );
};
