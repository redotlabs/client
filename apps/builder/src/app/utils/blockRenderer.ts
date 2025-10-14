import type {
  Block,
  RenderableBlock,
  GridConfig,
  BaseRenderProps
} from '@/app/types';

// Block을 RenderableBlock으로 변환하는 렌더러
export class BlockRenderer {
  private gridConfig: GridConfig;

  constructor(gridConfig: GridConfig) {
    this.gridConfig = gridConfig;
  }

  // Block을 CSS Grid 스타일로 변환
  private convertToGridArea(block: Block): string {
    const { position, size } = block;
    const rowStart = position.y;
    const colStart = position.x;
    const rowEnd = position.y + size.height;
    const colEnd = position.x + size.width;

    return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  }

  // Block을 React 스타일 객체로 변환
  private convertToStyle(block: Block): React.CSSProperties {
    const baseStyle: React.CSSProperties = {
      gridArea: this.convertToGridArea(block),
      zIndex: block.position.zIndex,
    };

    // 타입별 스타일 처리
    switch (block.type) {
      case 'text':
        return {
          ...baseStyle,
          color: block.attributes.color || '#000000',
          fontSize: block.attributes.fontSize ? `${block.attributes.fontSize}px` : '16px',
          fontWeight: block.attributes.fontWeight || 'normal',
          textAlign: block.attributes.textAlign || 'left',
          backgroundColor: block.attributes.backgroundColor || 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: block.attributes.textAlign === 'center' ? 'center' :
                          block.attributes.textAlign === 'right' ? 'flex-end' : 'flex-start',
          padding: '8px',
          overflow: 'hidden',
        };

      case 'image':
        return {
          ...baseStyle,
          objectFit: block.attributes.objectFit || 'contain',
          borderRadius: block.attributes.borderRadius ? `${block.attributes.borderRadius}px` : '0',
          width: '100%',
          height: '100%',
        };

      case 'button':
        return {
          ...baseStyle,
          color: block.attributes.color || '#ffffff',
          backgroundColor: block.attributes.backgroundColor || '#3b82f6',
          borderColor: block.attributes.borderColor || 'transparent',
          borderRadius: block.attributes.borderRadius ? `${block.attributes.borderRadius}px` : '6px',
          borderWidth: '1px',
          borderStyle: 'solid',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontWeight: '500',
          transition: 'all 0.2s',
        };

      case 'container':
        return {
          ...baseStyle,
          backgroundColor: block.attributes.backgroundColor || 'transparent',
          borderColor: block.attributes.borderColor || 'transparent',
          borderWidth: block.attributes.borderWidth ? `${block.attributes.borderWidth}px` : '0',
          borderStyle: 'solid',
          borderRadius: block.attributes.borderRadius ? `${block.attributes.borderRadius}px` : '0',
          padding: block.attributes.padding ? `${block.attributes.padding}px` : '0',
          display: 'grid',
          gap: block.attributes.gap ? `${block.attributes.gap}px` : '0',
        };

      default:
        return baseStyle;
    }
  }

  // Block을 props 객체로 변환
  private convertToProps(block: Block): BaseRenderProps & Record<string, unknown> {
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
          onClick: block.attributes.onClick ? () => console.log(`Button clicked: ${block.attributes.onClick}`) : undefined,
        };

      case 'container':
        return {
          ...baseProps,
        };

      default:
        return baseProps;
    }
  }

  // 단일 Block을 RenderableBlock으로 변환
  public renderBlock(block: Block): RenderableBlock {
    const renderableBlock: RenderableBlock = {
      id: block.id,
      type: block.type,
      gridArea: this.convertToGridArea(block),
      style: this.convertToStyle(block),
      props: this.convertToProps(block),
    };

    // 컨테이너의 경우 children도 렌더링
    if (block.type === 'container' && block.children) {
      renderableBlock.children = block.children.map(child => this.renderBlock(child));
    }

    return renderableBlock;
  }

  // 블록 배열을 RenderableBlock 배열로 변환
  public renderBlocks(blocks: Block[]): RenderableBlock[] {
    return blocks
      .filter(block => !block.metadata?.hidden) // 숨겨진 블록 제외
      .map(block => this.renderBlock(block))
      .sort((a, b) => (a.style.zIndex as number) - (b.style.zIndex as number)); // zIndex 순으로 정렬
  }


  // 그리드 설정 업데이트
  public updateGridConfig(newConfig: GridConfig): void {
    this.gridConfig = newConfig;
  }
}

// 기본 렌더러 인스턴스 생성 함수
export const createBlockRenderer = (gridConfig: GridConfig): BlockRenderer => {
  return new BlockRenderer(gridConfig);
};