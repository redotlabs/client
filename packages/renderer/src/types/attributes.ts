/**
 * Component Props for Renderer
 * Re-exports from design system and custom props
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

// Design system type re-exports
export type { BadgeProps, BadgeVariants, InputProps, InputVariants };

// Design system variants options re-exports
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

export type ComponentProps =
  | TextProps
  | BadgeProps
  | ButtonProps
  | InputProps
  | ImageProps
  | LinkProps;
