// 렌더링 관련 타입들

// 기본 렌더링 Props
export interface BaseRenderProps {
  children?: React.ReactNode;
}

// RenderableBlock 인터페이스
export interface RenderableBlock {
  id: string;
  type: string;
  gridArea: string; // CSS grid-area 값
  style: React.CSSProperties;
  props: BaseRenderProps & Record<string, unknown>;
  children?: RenderableBlock[];
}
