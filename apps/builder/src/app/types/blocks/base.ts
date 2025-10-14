import type { BlockPosition, BlockSize } from './position';
import type {
  TextBlockAttributes,
  ImageBlockAttributes,
  ButtonBlockAttributes,
  ContainerBlockAttributes
} from './attributes';

// 기본 블록 구조
export interface BaseBlock {
  id: string;
  type: string;
  position: BlockPosition;
  size: BlockSize;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    locked?: boolean;
    hidden?: boolean;
  };
}

// 타입별 블록 정의
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

export interface ContainerBlock extends BaseBlock {
  type: 'container';
  attributes: ContainerBlockAttributes;
  children?: Block[]; // 중첩 가능한 컨테이너
}

// 블록 유니온 타입
export type Block = TextBlock | ImageBlock | ButtonBlock | ContainerBlock;