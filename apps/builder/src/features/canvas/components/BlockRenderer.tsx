import type { RenderableBlock } from "@/shared/types";
import type {
  TextProps,
  BadgeProps,
  ButtonProps,
  InputProps,
  ImageProps,
  LinkProps,
} from "@/shared/types";
import { Badge, Button, Input } from "@redotlabs/ui";
import { cn } from "@redotlabs/utils";
import { ImageBlock } from "./ImageBlock";

interface BlockRendererProps {
  block: RenderableBlock;
}

const BLOCK_FILL_CLASSES = "w-full h-full";

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  const renderContent = () => {
    switch (block.type) {
      case "text": {
        const props = block.props as TextProps;
        return (
          <div
            style={{
              color: props.color,
              fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
              fontWeight: props.fontWeight,
              textAlign: props.textAlign,
              backgroundColor: props.backgroundColor,
            }}
          >
            {props.children}
          </div>
        );
      }

      case "badge": {
        const props = block.props as BadgeProps;
        return (
          <Badge
            color={props.color}
            size={props.size}
            className={cn(BLOCK_FILL_CLASSES, props.className)}
          >
            {props.children}
          </Badge>
        );
      }

      case "button": {
        const props = block.props as ButtonProps;
        return (
          <Button
            variant={props.variant}
            size={props.size}
            className={cn(BLOCK_FILL_CLASSES, props.className)}
            disabled={props.disabled}
          >
            {props.children}
          </Button>
        );
      }

      case "input": {
        const props = block.props as InputProps;
        return (
          <Input
            size={props.size || "md"}
            placeholder={props.placeholder}
            value={props.value}
            type={props.type}
            disabled={props.disabled}
            error={props.error}
            className={cn(BLOCK_FILL_CLASSES, props.className)}
          />
        );
      }

      case "image": {
        const props = block.props as unknown as ImageProps;
        return <ImageBlock props={props} className={BLOCK_FILL_CLASSES} />;
      }

      case "link": {
        const props = block.props as LinkProps;
        return (
          <a
            href={props.href || "#"}
            target={props.target || "_self"}
            className={cn(BLOCK_FILL_CLASSES, props.className)}
            style={{
              color: props.color,
              fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
              fontWeight: props.fontWeight,
              textDecoration: props.textDecoration || "underline",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {props.children || "Link"}
          </a>
        );
      }

      default:
        return <div>Unknown block type: {block.type}</div>;
    }
  };

  return renderContent();
};
