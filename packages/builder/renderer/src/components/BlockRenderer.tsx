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
import React from "react";
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
        const props = block.props as unknown as FrameProps;
        const children = block.children || [];
        const direction = props.layout.direction;
        const isHorizontal = direction === 'horizontal' || direction === 'wrap';

        return (
          <FrameRenderer
            layout={props.layout}
            backgroundColor={props.backgroundColor}
            borderRadius={props.borderRadius}
            className={props.className}
          >
            {children.map((child, index) => (
              <React.Fragment key={child.id}>
                {/* 삽입 라인: children 앞에 표시 */}
                <FrameInsertionLine
                  index={index}
                  isHorizontal={isHorizontal}
                />
                <BlockRenderer
                  block={child}
                  isPreviewMode={isPreviewMode}
                  isInsideFrame={true}
                />
              </React.Fragment>
            ))}
            {/* 마지막 삽입 라인 (모든 children 뒤) */}
            <FrameInsertionLine
              index={children.length}
              isHorizontal={isHorizontal}
            />
          </FrameRenderer>
        );
      }

      default:
        return <div>Unknown block type: {block.type}</div>;
    }
  };

  return (
    <div data-block-id={block.id} className={blockClasses}>
      {renderContent()}
    </div>
  );
};

/**
 * FrameInsertionLine
 * Frame 내부에서 드롭 위치를 표시하는 파란색 삽입 라인
 */
interface FrameInsertionLineProps {
  index: number;
  isHorizontal: boolean;
}

const FrameInsertionLine = ({ index, isHorizontal }: FrameInsertionLineProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // 부모 Frame 요소에서 data-insert-index를 확인
    const checkVisibility = () => {
      const frameElement = document.querySelector(
        `[data-drop-target="true"][data-insert-index="${index}"]`
      );
      setIsVisible(!!frameElement);
    };

    // 초기 체크
    checkVisibility();

    // MutationObserver로 변경 감지
    const observer = new MutationObserver(checkVisibility);
    const frames = document.querySelectorAll('[data-block-type="frame"]');
    frames.forEach((frame) => {
      observer.observe(frame, {
        attributes: true,
        attributeFilter: ['data-drop-target', 'data-insert-index'],
      });
    });

    return () => observer.disconnect();
  }, [index]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "bg-blue-500 rounded",
        isHorizontal ? "w-1 min-h-full" : "h-1 min-w-full"
      )}
      style={{
        flexShrink: 0,
      }}
    />
  );
};
