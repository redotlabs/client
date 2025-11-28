/**
 * TODO: 디자인 시스템 타입과 완전히 일치하면 리팩토링 예정
 */

import type {
  BadgeProps,
  BadgeVariants,
  ButtonVariants,
  InputProps,
  InputVariants,
} from "@redotlabs/ui";
import {
  badgeVariantsOptions,
  buttonVariantsOptions,
  inputVariantsOptions,
} from "@redotlabs/ui";
import type { ComponentProps as ReactComponentProps } from "react";

// 디자인 시스템 타입 re-export
export type { BadgeProps, BadgeVariants, InputProps, InputVariants };

// 디자인 시스템 variants options re-export
export { badgeVariantsOptions, buttonVariantsOptions, inputVariantsOptions };

export interface TextProps {
  className?: string;
  children?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  backgroundColor?: string;
  [key: string]: unknown;
}

// TODO: 디자인 시스템에서 ButtonProps export 되면 교체
export type ButtonProps = ReactComponentProps<"button"> & ButtonVariants;

export interface ImageProps {
  src?: string;
  alt?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  className?: string;
}

export interface LinkProps {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  children?: string;
  className?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textDecoration?: "none" | "underline" | "line-through";
}

export type ComponentProps = TextProps | BadgeProps | ButtonProps | InputProps | ImageProps | LinkProps;

export type TextBlockAttributes = TextProps;
export type BadgeBlockAttributes = BadgeProps;
export type ButtonBlockAttributes = ButtonProps;
export type InputBlockAttributes = InputProps;
export type BlockAttributes = ComponentProps;
