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

export const createTextBlock = (
  position: BlockPosition,
  size: BlockSize,
  attributes: TextBlockAttributes
): TextBlock => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  type: 'text',
  position,
  size,
  attributes,
  metadata: {
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
});

export const createImageBlock = (
  position: BlockPosition,
  size: BlockSize,
  attributes: ImageBlockAttributes
): ImageBlock => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  type: 'image',
  position,
  size,
  attributes,
  metadata: {
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
});

export const createButtonBlock = (
  position: BlockPosition,
  size: BlockSize,
  attributes: ButtonBlockAttributes
): ButtonBlock => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  type: 'button',
  position,
  size,
  attributes,
  metadata: {
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
});

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
