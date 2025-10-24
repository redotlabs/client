/**
 * TODO: 디자인 시스템 타입과 완전히 일치하면 리팩토링 예정
 */

import type {
  BadgeProps,
  BadgeVariants,
  ButtonVariants,
  InputProps,
  InputVariants,
  LogoProps,
} from '@redotlabs/ui';
import type { ComponentProps as ReactComponentProps } from 'react';

// 디자인 시스템 타입 re-export
export type { BadgeProps, BadgeVariants, InputProps, InputVariants, LogoProps };

export interface TextProps {
  className?: string;
  children?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  [key: string]: unknown;
}

// TODO: 디자인 시스템에서 ButtonProps export 되면 교체
export type ButtonProps = ReactComponentProps<'button'> & ButtonVariants;

export interface ToastProps {
  className?: string;
  title?: string;
  description?: string;
  variant?: 'success' | 'warning' | 'error';
  [key: string]: unknown;
}

export type ComponentProps =
  | TextProps
  | BadgeProps
  | ButtonProps
  | InputProps
  | LogoProps
  | ToastProps;

export type TextBlockAttributes = TextProps;
export type BadgeBlockAttributes = BadgeProps;
export type ButtonBlockAttributes = ButtonProps;
export type InputBlockAttributes = InputProps;
export type LogoBlockAttributes = LogoProps;
export type ToastBlockAttributes = ToastProps;
export type BlockAttributes = ComponentProps;
