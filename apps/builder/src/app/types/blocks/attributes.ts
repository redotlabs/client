// 각 블록 타입별 어트리뷰트 인터페이스
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
  onClick?: string; // 액션 식별자
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}


// 블록 타입별 어트리뷰트 유니온
export type BlockAttributes =
  | TextBlockAttributes
  | ImageBlockAttributes
  | ButtonBlockAttributes;