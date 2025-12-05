import type { HTMLElementType } from "react";
import type {
  BadgeProps,
  ButtonProps,
  InputProps,
  TextProps,
  ImageProps,
  LinkProps,
} from "./attributes";
import type { BlockPosition, BlockSize } from "./position";

export type ComponentType =
  | "text"
  | "badge"
  | "button"
  | "input"
  | "image"
  | "link"
  | HTMLElementType;

/**
 * Component Props mapping by type
 */
export type ComponentPropsMap = {
  text: TextProps;
  badge: BadgeProps;
  button: ButtonProps;
  input: InputProps;
  image: ImageProps;
  link: LinkProps;
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
