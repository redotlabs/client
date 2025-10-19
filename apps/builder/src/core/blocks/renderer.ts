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

      case "image": {
        return {
          ...baseStyle,
          objectFit:
            (props.objectFit as "contain" | "cover" | "fill") || "contain",
          borderRadius: props.borderRadius
            ? `${props.borderRadius as number}px`
            : "0",
          width: "100%",
          height: "100%",
        };
      }

      case "button": {
        return {
          ...baseStyle,
          color: (props.color as string) || "#ffffff",
          backgroundColor: (props.backgroundColor as string) || "#3b82f6",
          borderColor: (props.borderColor as string) || "transparent",
          borderRadius: props.borderRadius
            ? `${props.borderRadius as number}px`
            : "6px",
          borderWidth: "1px",
          borderStyle: "solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontWeight: "500",
          transition: "all 0.2s",
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

      case "image": {
        return {
          ...baseProps,
          src: props.src as string,
          alt: (props.alt as string) || "",
        };
      }

      case "button": {
        const children =
          typeof block.children === "string"
            ? block.children
            : (props.children as string | undefined);

        return {
          ...baseProps,
          children: children as React.ReactNode,
          onClick: props.onClick
            ? () => console.log(`Button clicked: ${props.onClick}`)
            : undefined,
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
