/**
 * 블록 타입 정의 및 메타데이터 관리
 * - 블록 템플릿 정의 (타입, 기본값, UI 메타데이터)
 * - 블록 생성 로직 포함 (Factory 패턴 병합)
 * - Feature 레이어에서 사용할 수 있는 표준 인터페이스 제공
 */

import type { BuilderBlock, BlockPosition, BlockSize } from "@/shared/types";

export interface BlockTemplate<
  T extends BuilderBlock["component"] = BuilderBlock["component"],
> {
  id: string;
  type: T;
  label: string;

  defaultProps: {
    component: T;
    props: T extends keyof ComponentPropsDefaults
      ? ComponentPropsDefaults[T]
      : unknown;
    size: BlockSize;
  };

  createBlock: (position: BlockPosition, size?: BlockSize) => BuilderBlock<T>;
}

type ComponentPropsDefaults = {
  text: {
    children: string;
    fontSize?: number;
    color?: string;
    fontWeight?: string;
  };
  button: {
    children: string;
    variant?: "text" | "contained" | "outlined";
    size?: "sm" | "md" | "lg";
  };
  input: {
    placeholder?: string;
    size?: "sm" | "md" | "lg";
  };
  badge: {
    children: string;
    color?: "default" | "primary" | "secondary";
    size?: "sm" | "md" | "lg";
  };
  logo: {
    type?: "symbol" | "full";
  };
};

const generateBlockId = (): string => {
  return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const createBlockMetadata = () => ({
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const BLOCK_REGISTRY: BlockTemplate[] = [
  {
    id: "text",
    type: "text",
    label: "Text",
    defaultProps: {
      component: "text",
      props: {
        children: "New Text",
        fontSize: 16,
        color: "#000000",
      },
      size: { width: 4, height: 1 },
    },
    createBlock: (position, size) => ({
      id: generateBlockId(),
      component: "text",
      props: {
        children: "New Text",
        fontSize: 16,
        color: "#000000",
      },
      children: "New Text",
      position,
      size: size || { width: 4, height: 1 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "button",
    type: "button",
    label: "Button",
    defaultProps: {
      component: "button",
      props: {
        children: "Button",
        variant: "contained",
        size: "md",
      },
      size: { width: 4, height: 2 },
    },
    createBlock: (position, size) => ({
      id: generateBlockId(),
      component: "button",
      props: {
        children: "Button",
        variant: "contained",
        size: "md",
      },
      children: "Button",
      position,
      size: size || { width: 4, height: 2 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "input",
    type: "input",
    label: "Input",
    defaultProps: {
      component: "input",
      props: {
        placeholder: "Enter text...",
        size: "md",
      },
      size: { width: 4, height: 1 },
    },
    createBlock: (position, size) => ({
      id: generateBlockId(),
      component: "input",
      props: {
        placeholder: "Enter text...",
        size: "md",
      },
      position,
      size: size || { width: 4, height: 1 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "badge",
    type: "badge",
    label: "Badge",
    defaultProps: {
      component: "badge",
      props: {
        children: "Badge",
        color: "default",
        size: "md",
      },
      size: { width: 3, height: 2 },
    },
    createBlock: (position, size) => ({
      id: generateBlockId(),
      component: "badge",
      props: {
        children: "Badge",
        color: "default",
        size: "md",
      },
      children: "Badge",
      position,
      size: size || { width: 3, height: 2 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "logo",
    type: "logo",
    label: "Logo",
    defaultProps: {
      component: "logo",
      props: {
        type: "symbol",
      },
      size: { width: 2, height: 2 },
    },
    createBlock: (position, size) => ({
      id: generateBlockId(),
      component: "logo",
      props: {
        type: "symbol",
      },
      position,
      size: size || { width: 2, height: 2 },
      metadata: createBlockMetadata(),
    }),
  },
];
