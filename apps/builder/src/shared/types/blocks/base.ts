import type { HTMLElementType } from "react";
import type { BlockPosition, BlockSize } from "./position";

/**
 * Component types supported by the builder
 * Following sdui-renderer's ComponentType pattern
 * Design system components: badge, button, input, logo, toast
 * Generic components: text (for TextBlock)
 */
export type ComponentType =
  | "text"
  | "badge"
  | "button"
  | "input"
  | "logo"
  | "toast"
  | HTMLElementType;

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
