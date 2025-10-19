import type { HTMLElementType } from "react";
import type { BlockPosition, BlockSize } from "./position";

/**
 * Component types supported by the builder
 * Following sdui-renderer's ComponentType pattern
 */
export type ComponentType = "text" | "image" | "button" | HTMLElementType;

export interface ContentBlock {
  id: string;
  component: ComponentType;
  props?: {
    className?: string;
    [key: string]: unknown;
  };
  children?: string | ContentBlock[];
}

export interface BuilderBlock extends ContentBlock {
  position: BlockPosition;
  size: BlockSize;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
  };
}

export type Block = BuilderBlock;
