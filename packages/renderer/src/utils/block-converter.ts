import type {
  BuilderBlock,
  GridConfig,
  RenderableBlock,
  BaseRenderProps,
  TextProps,
  BadgeProps,
  ButtonProps,
  InputProps,
  ImageProps,
  LinkProps,
} from "../types";
import type { CSSProperties, ReactNode } from "react";

type ComponentPropHandler = (
  block: BuilderBlock,
  baseProps: BaseRenderProps & Record<string, unknown>
) => BaseRenderProps & Record<string, unknown>;

const componentPropHandlers: Record<string, ComponentPropHandler> = {
  text: (block, baseProps) => {
    const props = block.props as TextProps;
    const children =
      typeof block.children === "string" ? block.children : props.children;

    return {
      ...baseProps,
      children: children as ReactNode,
    };
  },

  badge: (block, baseProps) => {
    const props = block.props as BadgeProps;
    const children =
      typeof block.children === "string" ? block.children : props.children;

    return {
      ...baseProps,
      ...props,
      children: children as ReactNode,
    };
  },

  button: (block, baseProps) => {
    const props = block.props as ButtonProps;
    const children =
      typeof block.children === "string" ? block.children : props.children;

    return {
      ...baseProps,
      ...props,
      children: children as ReactNode,
    };
  },

  input: (block, baseProps) => {
    const props = block.props as InputProps;
    return {
      ...baseProps,
      ...props,
    };
  },

  image: (block, baseProps) => {
    const props = block.props as ImageProps;
    return {
      ...baseProps,
      ...props,
    };
  },

  link: (block, baseProps) => {
    const props = block.props as LinkProps;
    const children =
      typeof block.children === "string" ? block.children : props.children;

    return {
      ...baseProps,
      ...props,
      children: children as ReactNode,
    };
  },
};

export class BlockConverter {
  private gridConfig: GridConfig;

  constructor(gridConfig: GridConfig) {
    this.gridConfig = gridConfig;
  }

  public getGridConfig(): GridConfig {
    return this.gridConfig;
  }

  private convertToGridArea(block: BuilderBlock): string {
    const { position, size } = block;
    const rowStart = position.y + 1;
    const colStart = position.x + 1;
    const rowEnd = position.y + size.height + 1;
    const colEnd = position.x + size.width + 1;

    return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  }

  private convertToStyle(block: BuilderBlock): CSSProperties {
    const baseStyle: CSSProperties = {
      gridArea: this.convertToGridArea(block),
      zIndex: block.position.zIndex,
    };

    switch (block.component) {
      case "text": {
        const props = block.props as TextProps;
        return {
          ...baseStyle,
          color: props.color || "#000000",
          fontSize: props.fontSize ? `${props.fontSize}px` : "16px",
          fontWeight: props.fontWeight || "normal",
          textAlign: props.textAlign || "left",
          backgroundColor: props.backgroundColor || "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent:
            props.textAlign === "center"
              ? "center"
              : props.textAlign === "right"
                ? "flex-end"
                : "flex-start",
          overflow: "hidden",
        };
      }

      default:
        return baseStyle;
    }
  }

  private convertToProps(
    block: BuilderBlock
  ): BaseRenderProps & Record<string, unknown> {
    const baseProps: BaseRenderProps & Record<string, unknown> = {
      id: block.id,
      "data-block-type": block.component,
      "data-block-id": block.id,
    };

    const handler = componentPropHandlers[block.component];
    return handler ? handler(block, baseProps) : baseProps;
  }

  public convertBlock(block: BuilderBlock): RenderableBlock {
    const renderableBlock: RenderableBlock = {
      id: block.id,
      type: block.component,
      gridArea: this.convertToGridArea(block),
      style: this.convertToStyle(block),
      props: this.convertToProps(block),
    };

    return renderableBlock;
  }

  public convertBlocks(blocks: BuilderBlock[]): RenderableBlock[] {
    return blocks
      .map((block) => this.convertBlock(block))
      .sort((a, b) => (a.style.zIndex as number) - (b.style.zIndex as number));
  }

  public updateGridConfig(newConfig: GridConfig): void {
    this.gridConfig = newConfig;
  }
}
