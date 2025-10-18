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
  ImageProps,
  ButtonProps,
} from "@/shared/types";

export const createTextBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: TextProps
): BuilderBlock => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: "text",
  props,
  children: props.children,
  position,
  size,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

export const createImageBlock = (
  position: BlockPosition,
  size: BlockSize,
  props: ImageProps
): BuilderBlock => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: "image",
  props,
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
): BuilderBlock => ({
  id: `block-${Math.random().toString(36).substring(2, 8)}`,
  component: "button",
  props,
  children: props.children,
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
): BuilderBlock => {
  return createTextBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { children: text, ...options }
  );
};

export const createImageBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  src: string,
  options?: Partial<ImageProps>
): BuilderBlock => {
  return createImageBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { src, ...options }
  );
};

export const createButtonBlockFromCoords = (
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  options?: Partial<ButtonProps>
): BuilderBlock => {
  return createButtonBlock(
    { x, y, zIndex: 1 },
    { width, height },
    { children: text, ...options }
  );
};
