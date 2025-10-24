/*
블록 팩토리 함수들 - SDUI ContentBlock 구조 기반
현재는 정적 데이터(editorData.ts)만 사용하므로 실제로는 호출되지 않음
향후 사용자 블록 추가/편집 기능 구현 시 사용 예정
*/

import type {
  BuilderBlock,
  BlockPosition,
  BlockSize,
  TextProps,
  BadgeProps,
  ButtonProps,
  InputProps,
  LogoProps,
  ToastProps,
} from '@/shared/types';

export const createTextBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: TextProps
): BuilderBlock<'text'> => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: 'text',
  props,
  children: props.children,
  position,
  size,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

export const createBadgeBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: BadgeProps
): BuilderBlock<'badge'> => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: 'badge',
  props,
  children: props.children as string,
  position,
  size,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

export const createButtonBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: ButtonProps
): BuilderBlock<'button'> => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: 'button',
  props,
  children: props.children as string,
  position,
  size,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

export const createInputBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: InputProps
): BuilderBlock<'input'> => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: 'input',
  props,
  position,
  size,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

export const createLogoBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: LogoProps
): BuilderBlock<'logo'> => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: 'logo',
  props,
  position,
  size,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

export const createToastBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: ToastProps
): BuilderBlock<'toast'> => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: 'toast',
  props,
  position,
  size,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

export const createTextBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<TextProps>
): BuilderBlock<'text'> => {
  return createTextBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { children: text, ...options }
  );
};

export const createBadgeBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<BadgeProps>
): BuilderBlock<'badge'> => {
  return createBadgeBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { children: text, ...options }
  );
};

export const createButtonBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<ButtonProps>
): BuilderBlock<'button'> => {
  return createButtonBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { children: text, ...options }
  );
};

export const createInputBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  options?: Partial<InputProps>
): BuilderBlock<'input'> => {
  return createInputBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { ...options }
  );
};

export const createLogoBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  options?: Partial<LogoProps>
): BuilderBlock<'logo'> => {
  return createLogoBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { ...options }
  );
};

export const createToastBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  options?: Partial<ToastProps>
): BuilderBlock<'toast'> => {
  return createToastBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { ...options }
  );
};
