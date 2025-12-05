export interface BaseRenderProps {
  children?: React.ReactNode;
}

export interface RenderableBlock {
  id: string;
  type: string;
  gridArea: string;
  style: React.CSSProperties;
  props: BaseRenderProps & Record<string, unknown>;
  children?: RenderableBlock[];
}
