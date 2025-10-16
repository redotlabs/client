export interface TextBlockAttributes {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
}

export interface ImageBlockAttributes {
  src: string;
  alt?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
  borderRadius?: number;
  loading?: 'lazy' | 'eager';
}

export interface ButtonBlockAttributes {
  text: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  onClick?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export type BlockAttributes =
  | TextBlockAttributes
  | ImageBlockAttributes
  | ButtonBlockAttributes;