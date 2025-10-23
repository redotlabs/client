import type { RenderableBlock } from '@/shared/types';
import type {
  TextProps,
  BadgeProps,
  ButtonProps,
  InputProps,
  LogoProps,
  ToastProps,
} from '@/shared/types';
import { Badge, Button, Input, Logo } from '@redotlabs/ui';

interface BlockRendererProps {
  block: RenderableBlock;
}

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  const renderContent = () => {
    switch (block.type) {
      case 'text': {
        const props = block.props as TextProps;
        return <div>{props.children}</div>;
      }

      case 'badge': {
        const props = block.props as BadgeProps;
        return (
          <Badge color={props.color} size={props.size} className={props.className}>
            {props.children}
          </Badge>
        );
      }

      case 'button': {
        const props = block.props as ButtonProps;
        return (
          <Button
            variant={props.variant}
            size={props.size}
            className={props.className}
            disabled={props.disabled}
          >
            {props.children}
          </Button>
        );
      }

      case 'input': {
        const props = block.props as InputProps;
        return (
          <Input
            placeholder={props.placeholder}
            value={props.value}
            type={props.type}
            disabled={props.disabled}
            error={props.error}
            className={props.className}
          />
        );
      }

      case 'logo': {
        const props = block.props as LogoProps;
        return <Logo type={props.type} className={props.className} />;
      }

      case 'toast': {
        const props = block.props as ToastProps;
        return (
          <Button variant="outlined" size="sm" className={props.className}>
            🔔 {props.title || 'Toast Trigger'}
          </Button>
        );
      }

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
