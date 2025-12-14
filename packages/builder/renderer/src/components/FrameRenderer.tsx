import type { AutoLayoutConfig } from "../types";
import { cn } from "@redotlabs/utils";

interface FrameRendererProps {
  layout: AutoLayoutConfig;
  backgroundColor?: string;
  borderRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * FrameRenderer
 * Flexbox 기반 Auto Layout 컨테이너
 * Frame 내부 블록들은 position 없이 순서대로 배치됨
 */
export const FrameRenderer = ({
  layout,
  backgroundColor,
  borderRadius,
  className,
  children,
}: FrameRendererProps) => {
  // direction에 따라 flexDirection 결정
  const getFlexDirection = (): React.CSSProperties["flexDirection"] => {
    switch (layout.direction) {
      case "horizontal":
        return "row";
      case "vertical":
        return "column";
      case "wrap":
        return "row"; // wrap은 flexWrap으로 처리
      default:
        return "row";
    }
  };

  return (
    <div
      className={cn("w-full h-full", className)}
      style={{
        display: "flex",
        flexDirection: getFlexDirection(),
        flexWrap: layout.direction === "wrap" ? "wrap" : "nowrap",
        gap: `${layout.gap}px`,
        padding: `${layout.padding.top}px ${layout.padding.right}px ${layout.padding.bottom}px ${layout.padding.left}px`,
        alignItems: layout.alignItems,
        justifyContent: layout.justifyContent,
        backgroundColor: backgroundColor || "transparent",
        borderRadius: borderRadius ? `${borderRadius}px` : undefined,
      }}
    >
      {children}
    </div>
  );
};
