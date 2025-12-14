import type {
  RenderableBlock,
  TextProps,
  BadgeProps,
  ButtonProps,
  InputProps,
  ImageProps,
  LinkProps,
  FrameProps,
} from "../types";
import { Badge, Button, Input } from "@redotlabs/ui";
import { cn } from "@redotlabs/utils";
import { ImageBlock } from "./ImageBlock";
import { FrameRenderer } from "./FrameRenderer";

interface BlockRendererProps {
  block: RenderableBlock;
  isPreviewMode?: boolean;
  isInsideFrame?: boolean; // Frame 내부 블록인지 여부
}

const BLOCK_FILL_CLASSES = "w-full h-full";

export const BlockRenderer = ({
  block,
  isPreviewMode = false,
  isInsideFrame = false
}: BlockRendererProps) => {
  // Frame 내부 블록은 크기를 자동으로 조정, 외부 블록은 w-full h-full
  const blockClasses = isInsideFrame ? "" : BLOCK_FILL_CLASSES;
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
            className={cn(blockClasses, props.className)}
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
            className={cn(blockClasses, props.className)}
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
            className={cn(blockClasses, props.className)}
          />
        );
      }

      case "image": {
        const props = block.props as unknown as ImageProps;
        return <ImageBlock props={props} className={blockClasses} />;
      }

      case "link": {
        const props = block.props as LinkProps;
        const href = props.href || "#";
        const isInternal = href.startsWith("/");
        const finalHref = isPreviewMode && isInternal ? `#${href}` : href;

        return (
          <a
            href={finalHref}
            target={props.target || "_self"}
            className={cn(blockClasses, props.className)}
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
              if (!isPreviewMode) {
                e.preventDefault();
              }
            }}
          >
            {props.children || "Link"}
          </a>
        );
      }

      case "frame": {
        const props = block.props as FrameProps;
        return (
          <FrameRenderer
            layout={props.layout}
            backgroundColor={props.backgroundColor}
            borderRadius={props.borderRadius}
            className={props.className}
          >
            {block.children?.map((child) => (
              <BlockRenderer
                key={child.id}
                block={child}
                isPreviewMode={isPreviewMode}
                isInsideFrame={true}
              />
            ))}
          </FrameRenderer>
        );
      }

      default:
        return <div>Unknown block type: {block.type}</div>;
    }
  };

  return renderContent();
};
