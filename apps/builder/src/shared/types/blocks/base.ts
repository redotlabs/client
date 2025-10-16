import type { BlockPosition, BlockSize } from './position';
import type {
  TextBlockAttributes,
  ImageBlockAttributes,
  ButtonBlockAttributes
} from './attributes';

export interface BaseBlock {
  id: string;
  type: string;
  position: BlockPosition;
  size: BlockSize;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  attributes: TextBlockAttributes;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  attributes: ImageBlockAttributes;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  attributes: ButtonBlockAttributes;
}

export type Block = TextBlock | ImageBlock | ButtonBlock;