import type { TypedRenderableBlock } from '@/app/types/ast';

interface TypedBlockRendererProps {
  block: TypedRenderableBlock;
}

export const TypedBlockRenderer = ({ block }: TypedBlockRendererProps) => {
  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return <div>{block.props.children}</div>;

      case 'image':
        return (
          <img
            src={block.props.src}
            alt={block.props.alt}
            loading={block.props.loading}
            style={{
              width: '100%',
              height: '100%',
              objectFit:
                (block.style.objectFit as React.CSSProperties['objectFit']) ||
                'contain',
            }}
          />
        );

      case 'button':
        return (
          <button
            onClick={block.props.onClick}
            disabled={block.props.disabled}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'none',
              cursor: block.props.disabled ? 'not-allowed' : 'pointer',
              opacity: block.props.disabled ? 0.6 : 1,
            }}
          >
            {block.props.children}
          </button>
        );

      case 'container':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display:
                block.props.layout === 'flex'
                  ? 'flex'
                  : block.props.layout === 'grid'
                    ? 'grid'
                    : 'block',
              gap: block.props.gap ? `${block.props.gap}px` : undefined,
            }}
          >
            {block.children?.map((child) => (
              <TypedBlockRenderer key={child.id} block={child} />
            ))}
          </div>
        );

      default:
        return <div>Unknown block type</div>;
    }
  };

  return (
    <div
      data-block-id={block.id}
      data-block-type={block.type}
      style={block.style}
    >
      {renderContent()}
    </div>
  );
};
