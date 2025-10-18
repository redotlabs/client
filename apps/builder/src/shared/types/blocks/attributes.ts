export interface TextProps {
  className?: string;
  children?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  backgroundColor?: string;
  [key: string]: unknown;
}

export interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  objectFit?: "contain" | "cover" | "fill";
  borderRadius?: number;
  loading?: "lazy" | "eager";
  [key: string]: unknown;
}

export interface ButtonProps {
  className?: string;
  children?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  onClick?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  [key: string]: unknown;
}

export type ComponentProps = TextProps | ImageProps | ButtonProps;

export type TextBlockAttributes = TextProps;
export type ImageBlockAttributes = ImageProps;
export type ButtonBlockAttributes = ButtonProps;
export type BlockAttributes = ComponentProps;
