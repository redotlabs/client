import type {
  RenderableBlock,
  TextProps,
  BadgeProps,
  ButtonProps,
  InputProps,
  ImageProps,
  LinkProps,
} from "../types";
import React from "react";
import { Badge, Button, Input } from "@redotlabs/ui";
import { cn } from "@redotlabs/utils";
import { ImageBlock } from "./ImageBlock";

interface BlockRendererProps {
  block: RenderableBlock;
  isPreviewMode?: boolean;
}

const BLOCK_FILL_CLASSES = "w-full h-full";

export const BlockRenderer = ({
  block,
  isPreviewMode = false,
}: BlockRendererProps) => {
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
        const href = props.href || "#";
        const isInternal = href.startsWith("/");
        const finalHref = isPreviewMode && isInternal ? `#${href}` : href;

        return (
          <a
            href={finalHref}
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
              if (!isPreviewMode) {
                e.preventDefault();
              }
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
