import type {
  BuilderBlock,
  GridConfig,
  RenderableBlock,
  BaseRenderProps,
  TextProps,
  BadgeProps,
  ButtonProps,
  InputProps,
  LogoProps,
  ToastProps,
} from '@/shared/types';
import type { CSSProperties, ReactNode } from 'react';

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

  private convertToStyle(block: BuilderBlock): CSSProperties {
    const baseStyle: CSSProperties = {
      gridArea: this.convertToGridArea(block),
      zIndex: block.position.zIndex,
    };

    switch (block.component) {
      case 'text': {
        const props = block.props as TextProps;
        return {
          ...baseStyle,
          color: props.color || '#000000',
          fontSize: props.fontSize ? `${props.fontSize}px` : '16px',
          fontWeight: props.fontWeight || 'normal',
          textAlign: props.textAlign || 'left',
          backgroundColor: props.backgroundColor || 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            props.textAlign === 'center'
              ? 'center'
              : props.textAlign === 'right'
                ? 'flex-end'
                : 'flex-start',
          padding: '8px',
          overflow: 'hidden',
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
      'data-block-type': block.component,
      'data-block-id': block.id,
    };

    switch (block.component) {
      case 'text': {
        const props = block.props as TextProps;
        const children =
          typeof block.children === 'string' ? block.children : props.children;

        return {
          ...baseProps,
          children: children as ReactNode,
        };
      }

      case 'badge': {
        const props = block.props as BadgeProps;
        const children =
          typeof block.children === 'string' ? block.children : props.children;

        return {
          ...baseProps,
          ...props,
          children: children as ReactNode,
        };
      }

      case 'button': {
        const props = block.props as ButtonProps;
        const children =
          typeof block.children === 'string' ? block.children : props.children;

        return {
          ...baseProps,
          ...props,
          children: children as ReactNode,
        };
      }

      case 'input': {
        const props = block.props as InputProps;
        return {
          ...baseProps,
          ...props,
        };
      }

      case 'logo': {
        const props = block.props as LogoProps;
        return {
          ...baseProps,
          ...props,
        };
      }

      case 'toast': {
        const props = block.props as ToastProps;
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
