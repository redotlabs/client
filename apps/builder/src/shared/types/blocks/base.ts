import type { HTMLElementType } from "react";
import type {
  BadgeProps,
  ButtonProps,
  InputProps,
  TextProps,
  ImageProps,
} from "./attributes";
import type { BlockPosition, BlockSize } from "@/shared/types/blocks/position";

export type ComponentType =
  | "text"
  | "badge"
  | "button"
  | "input"
  | "image"
  | HTMLElementType;

/**
 * 컴포넌트 타입별 Props 매핑
 */
export type ComponentPropsMap = {
  text: TextProps;
  badge: BadgeProps;
  button: ButtonProps;
  input: InputProps;
  image: ImageProps;
};

export interface ContentBlock<T extends ComponentType = ComponentType> {
  id: string;
  component: T;
  props?: T extends keyof ComponentPropsMap ? ComponentPropsMap[T] : unknown;
  children?: string | ContentBlock[];
}

export interface BuilderBlock<T extends ComponentType = ComponentType>
  extends ContentBlock<T> {
  position: BlockPosition;
  size: BlockSize;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
  };
}

export type Block = BuilderBlock;
