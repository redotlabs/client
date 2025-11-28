/**
 * 블록 타입 정의 및 메타데이터 관리
 * - 블록 템플릿 정의 (타입, 기본값, UI 메타데이터)
 * - 블록 생성 로직 포함
 */

import type { BuilderBlock, BlockPosition, BlockSize } from "@/shared/types";

export type BlockCategory = "text" | "button" | "input" | "badge" | "image" | "link";

export interface BlockTemplate<
  T extends BuilderBlock["component"] = BuilderBlock["component"],
> {
  id: string;
  type: T;
  label: string;
  category: BlockCategory;

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
  image: {
    src: string;
    alt?: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  };
  link: {
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    children?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    textDecoration?: "none" | "underline" | "line-through";
  };
};

/*
TODO: generateBlockId, createBlockMetadata 추후 수정 or 삭제 예정
*/

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
    category: "text",
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
      position,
      size: size || { width: 4, height: 1 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "button",
    type: "button",
    label: "Button",
    category: "button",
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
      position,
      size: size || { width: 4, height: 2 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "input",
    type: "input",
    label: "Input",
    category: "input",
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
    category: "badge",
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
      position,
      size: size || { width: 3, height: 2 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "image",
    type: "image",
    label: "Image",
    category: "image",
    defaultProps: {
      component: "image",
      props: {
        src: "",
        alt: "",
        objectFit: "cover",
      },
      size: { width: 6, height: 6 },
    },
    createBlock: (position, size) => ({
      id: generateBlockId(),
      component: "image",
      props: {
        src: "",
        alt: "",
        objectFit: "cover",
      },
      position,
      size: size || { width: 6, height: 6 },
      metadata: createBlockMetadata(),
    }),
  },
  {
    id: "link",
    type: "link",
    label: "Link",
    category: "link",
    defaultProps: {
      component: "link",
      props: {
        href: "#",
        target: "_self",
        children: "Link",
        color: "#0000EE",
        fontSize: 16,
        textDecoration: "underline",
      },
      size: { width: 3, height: 1 },
    },
    createBlock: (position, size) => ({
      id: generateBlockId(),
      component: "link",
      props: {
        href: "#",
        target: "_self",
        children: "Link",
        color: "#0000EE",
        fontSize: 16,
        textDecoration: "underline",
      },
      position,
      size: size || { width: 3, height: 1 },
      metadata: createBlockMetadata(),
    }),
  },
];
