import type { RenderableBlock } from '@/app/types';

interface BlockRendererProps {
  block: RenderableBlock;
}

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return <div>{block.props.children}</div>;

      case 'image':
        return (
          <img
            src={block.props.src as string}
            alt={block.props.alt as string}
            style={{
              width: '100%',
              height: '100%',
              objectFit: block.style.objectFit,
            }}
          />
        );

      case 'button':
        return (
          <button
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            {block.props.children}
          </button>
        );

      case 'container':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {block.children?.map((child) => (
              <BlockRenderer key={child.id} block={child} />
            ))}
          </div>
        );

      default:
        return <div>Unknown block type: {block.type}</div>;
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
