import type {
  Block,
  GridConfig,
  RenderableBlock,
  BaseRenderProps,
} from '@/shared/types';

export class BlockRenderer {
  private gridConfig: GridConfig;

  constructor(gridConfig: GridConfig) {
    this.gridConfig = gridConfig;
  }

  public getGridConfig(): GridConfig {
    return this.gridConfig;
  }

  private convertToGridArea(block: Block): string {
    const { position, size } = block;
    const rowStart = position.y;
    const colStart = position.x;
    const rowEnd = position.y + size.height;
    const colEnd = position.x + size.width;

    return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  }

  private convertToStyle(block: Block): React.CSSProperties {
    const baseStyle: React.CSSProperties = {
      gridArea: this.convertToGridArea(block),
      zIndex: block.position.zIndex,
    };

    switch (block.type) {
      case 'text':
        return {
          ...baseStyle,
          color: block.attributes.color || '#000000',
          fontSize: block.attributes.fontSize
            ? `${block.attributes.fontSize}px`
            : '16px',
          fontWeight: block.attributes.fontWeight || 'normal',
          textAlign: block.attributes.textAlign || 'left',
          backgroundColor: block.attributes.backgroundColor || 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            block.attributes.textAlign === 'center'
              ? 'center'
              : block.attributes.textAlign === 'right'
                ? 'flex-end'
                : 'flex-start',
          padding: '8px',
          overflow: 'hidden',
        };

      case 'image':
        return {
          ...baseStyle,
          objectFit: block.attributes.objectFit || 'contain',
          borderRadius: block.attributes.borderRadius
            ? `${block.attributes.borderRadius}px`
            : '0',
          width: '100%',
          height: '100%',
        };

      case 'button':
        return {
          ...baseStyle,
          color: block.attributes.color || '#ffffff',
          backgroundColor: block.attributes.backgroundColor || '#3b82f6',
          borderColor: block.attributes.borderColor || 'transparent',
          borderRadius: block.attributes.borderRadius
            ? `${block.attributes.borderRadius}px`
            : '6px',
          borderWidth: '1px',
          borderStyle: 'solid',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontWeight: '500',
          transition: 'all 0.2s',
        };


      default:
        return baseStyle;
    }
  }

  private convertToProps(
    block: Block
  ): BaseRenderProps & Record<string, unknown> {
    const baseProps = {
      id: block.id,
      'data-block-type': block.type,
      'data-block-id': block.id,
    };

    switch (block.type) {
      case 'text':
        return {
          ...baseProps,
          children: block.attributes.text,
        };

      case 'image':
        return {
          ...baseProps,
          src: block.attributes.src,
          alt: block.attributes.alt || '',
        };

      case 'button':
        return {
          ...baseProps,
          children: block.attributes.text,
          onClick: block.attributes.onClick
            ? () => console.log(`Button clicked: ${block.attributes.onClick}`)
            : undefined,
        };


      default:
        return baseProps;
    }
  }

  public renderBlock(block: Block): RenderableBlock {
    const renderableBlock: RenderableBlock = {
      id: block.id,
      type: block.type,
      gridArea: this.convertToGridArea(block),
      style: this.convertToStyle(block),
      props: this.convertToProps(block),
    };


    return renderableBlock;
  }

  public renderBlocks(blocks: Block[]): RenderableBlock[] {
    return blocks
      .map((block) => this.renderBlock(block))
      .sort((a, b) => (a.style.zIndex as number) - (b.style.zIndex as number));
  }

  public updateGridConfig(newConfig: GridConfig): void {
    this.gridConfig = newConfig;
  }
}
