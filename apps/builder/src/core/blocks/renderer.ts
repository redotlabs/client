import type {
  BuilderBlock,
  GridConfig,
  RenderableBlock,
  BaseRenderProps,
} from "@/shared/types";

export class BlockRenderer {
  private gridConfig: GridConfig;

  constructor(gridConfig: GridConfig) {
    this.gridConfig = gridConfig;
  }

  public getGridConfig(): GridConfig {
    return this.gridConfig;
  }

  private convertToGridArea(block: BuilderBlock): string {
    const { position, size } = block;
    const rowStart = position.y;
    const colStart = position.x;
    const rowEnd = position.y + size.height;
    const colEnd = position.x + size.width;

    return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  }

  private convertToStyle(block: BuilderBlock): React.CSSProperties {
    const baseStyle: React.CSSProperties = {
      gridArea: this.convertToGridArea(block),
      zIndex: block.position.zIndex,
    };

    const props = (block.props as Record<string, unknown>) || {};

    switch (block.component) {
      case "text": {
        return {
          ...baseStyle,
          color: (props.color as string) || "#000000",
          fontSize: props.fontSize ? `${props.fontSize as number}px` : "16px",
          fontWeight: (props.fontWeight as string) || "normal",
          textAlign: (props.textAlign as "left" | "center" | "right") || "left",
          backgroundColor: (props.backgroundColor as string) || "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent:
            props.textAlign === "center"
              ? "center"
              : props.textAlign === "right"
                ? "flex-end"
                : "flex-start",
          padding: "8px",
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
    const baseProps = {
      id: block.id,
      "data-block-type": block.component,
      "data-block-id": block.id,
    };

    const props = (block.props as Record<string, unknown>) || {};

    switch (block.component) {
      case "text": {
        const children =
          typeof block.children === "string"
            ? block.children
            : (props.children as string | undefined);

        return {
          ...baseProps,
          children: children as React.ReactNode,
        };
      }

      case "badge":
      case "button": {
        const children =
          typeof block.children === "string"
            ? block.children
            : (props.children as string | undefined);

        return {
          ...baseProps,
          ...props,
          children: children as React.ReactNode,
        };
      }

      case "input":
      case "logo":
      case "toast": {
        return {
          ...baseProps,
          ...props,
        };
      }

      default:
        return baseProps;
    }
  }

  public renderBlock(block: BuilderBlock): RenderableBlock {
    const renderableBlock: RenderableBlock = {
      id: block.id,
      type: block.component,
      gridArea: this.convertToGridArea(block),
      style: this.convertToStyle(block),
      props: this.convertToProps(block),
    };

    return renderableBlock;
  }

  public renderBlocks(blocks: BuilderBlock[]): RenderableBlock[] {
    return blocks
      .map((block) => this.renderBlock(block))
      .sort((a, b) => (a.style.zIndex as number) - (b.style.zIndex as number));
  }

  public updateGridConfig(newConfig: GridConfig): void {
    this.gridConfig = newConfig;
  }
}
