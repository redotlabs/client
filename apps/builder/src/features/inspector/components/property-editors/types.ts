import type { BuilderBlock } from '@repo/renderer';
import type { ReactElement } from 'react';

/**
 * Property Editor Props
 * 모든 Property Editor가 받는 공통 props
 */
export interface PropertyEditorProps<T extends BuilderBlock = BuilderBlock> {
  block: T;
  onUpdate: (updates: Partial<T>) => void;
}

/**
 * Property Editor Component Type
 */
export type PropertyEditorComponent = (
  props: PropertyEditorProps
) => ReactElement;
