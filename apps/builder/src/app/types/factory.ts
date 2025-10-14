import type { BlockPosition, BlockSize } from './blocks';
import type {
  TextBlock,
  ImageBlock,
  ButtonBlock,
  ContainerBlock,
  TextBlockAttributes,
  ImageBlockAttributes,
  ButtonBlockAttributes,
  ContainerBlockAttributes
} from './blocks';

// 블록 생성을 위한 팩토리 타입
export interface BlockFactory {
  createTextBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: TextBlockAttributes
  ): TextBlock;
  createImageBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ImageBlockAttributes
  ): ImageBlock;
  createButtonBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ButtonBlockAttributes
  ): ButtonBlock;
  createContainerBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ContainerBlockAttributes
  ): ContainerBlock;
}