import { ImagePlus } from "lucide-react";
import type { ImageProps } from "../types";
import { cn } from "@redotlabs/utils";

interface ImageBlockProps {
  props: ImageProps;
  className?: string;
}

/**
 * ImageBlock
 * - src가 있으면 이미지 표시
 * - src가 없으면 placeholder 표시
 */
export const ImageBlock = ({ props, className }: ImageBlockProps) => {
  const hasImage = props.src && props.src.length > 0;

  if (hasImage) {
    return (
      <div className={cn("w-full h-full", className)}>
        <img
          src={props.src}
          alt={props.alt || ""}
          style={{ objectFit: props.objectFit || "cover" }}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)}>
      <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500">
        <ImagePlus className="w-8 h-8 mb-2" />
        <span className="text-sm font-medium">No image</span>
        <span className="text-xs text-gray-400">Upload from Inspector</span>
      </div>
    </div>
  );
};
