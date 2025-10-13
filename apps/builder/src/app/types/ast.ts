// AST 기반 데이터 구조

export interface GridConfig {
  columns: number;
  rows: number;
  rowHeight: number;
  gap: number;
}

export interface BlockPosition {
  x: number; // 그리드 시작 열 (1-based)
  y: number; // 그리드 시작 행 (1-based)
  zIndex: number; // 레이어 순서
}

export interface BlockSize {
  width: number; // 그리드 셀 단위 너비
  height: number; // 그리드 셀 단위 높이
}

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

export interface ContainerBlockAttributes {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  gap?: number;
  layout?: 'flex' | 'grid' | 'stack';
}

// 블록 타입별 어트리뷰트 유니온
export type BlockAttributes =
  | TextBlockAttributes
  | ImageBlockAttributes
  | ButtonBlockAttributes
  | ContainerBlockAttributes;

// 기본 블록 구조
export interface BaseBlock {
  id: string;
  type: string;
  position: BlockPosition;
  size: BlockSize;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    locked?: boolean;
    hidden?: boolean;
  };
}

// 타입별 블록 정의
export interface TextBlock extends BaseBlock {
  type: 'text';
  attributes: TextBlockAttributes;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  attributes: ImageBlockAttributes;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  attributes: ButtonBlockAttributes;
}

export interface ContainerBlock extends BaseBlock {
  type: 'container';
  attributes: ContainerBlockAttributes;
  children?: Block[]; // 중첩 가능한 컨테이너
}

// 블록 유니온 타입
export type Block = TextBlock | ImageBlock | ButtonBlock | ContainerBlock;

// 전체 에디터 데이터 구조
export interface EditorData {
  grid: GridConfig;
  blocks: Block[];
  metadata?: {
    version: string;
    lastModified: string;
    title?: string;
    description?: string;
  };
}

// 블록 생성을 위한 팩토리 타입
export interface BlockFactory {
  createTextBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: TextBlockAttributes
  ): TextBlock;
  createImageBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ImageBlockAttributes
  ): ImageBlock;
  createButtonBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ButtonBlockAttributes
  ): ButtonBlock;
  createContainerBlock(
    position: BlockPosition,
    size: BlockSize,
    attributes: ContainerBlockAttributes
  ): ContainerBlock;
}

// 기본 렌더링 Props (최소한의 공통 속성만 정의)
export interface BaseRenderProps {
  children?: React.ReactNode; // 텍스트/버튼 등의 내용
}

// 각 블록 타입별 구체적인 Props 인터페이스
export interface TextRenderProps extends BaseRenderProps {
  children: string;
}

export interface ImageRenderProps extends BaseRenderProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

export interface ButtonRenderProps extends BaseRenderProps {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface ContainerRenderProps extends BaseRenderProps {
  layout?: 'flex' | 'grid' | 'stack';
  gap?: number;
}

// 기본 RenderableBlock 인터페이스
export interface BaseRenderableBlock {
  id: string;
  type: string;
  gridArea: string; // CSS grid-area 값
  style: React.CSSProperties;
  children?: BaseRenderableBlock[];
}

// 타입별로 확장된 RenderableBlock
export type TypedRenderableBlock =
  | (BaseRenderableBlock & { type: 'text'; props: TextRenderProps })
  | (BaseRenderableBlock & { type: 'image'; props: ImageRenderProps })
  | (BaseRenderableBlock & { type: 'button'; props: ButtonRenderProps })
  | (BaseRenderableBlock & { type: 'container'; props: ContainerRenderProps });

// 하위 호환성을 위한 기본 RenderableBlock (점진적 마이그레이션)
export interface RenderableBlock extends BaseRenderableBlock {
  props: BaseRenderProps & Record<string, unknown>;
}
