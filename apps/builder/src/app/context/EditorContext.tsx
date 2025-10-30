import { createContext, useContext, type ReactNode } from 'react';
import { useEditor } from '@/core/hooks/use-editor';
import type { BuilderBlock, GridConfig } from '@/shared/types';
import type { EditorState } from '@/core/state';
import type { EditorAction } from '@/core/actions';

interface EditorContextValue {
  state: EditorState;
  dispatch: (action: EditorAction) => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorProviderProps {
  children: ReactNode;
  blocks: BuilderBlock[];
  gridConfig: GridConfig;
}

/**
 * EditorProvider
 * 에디터 상태를 전역으로 제공하는 Provider
 */
export function EditorProvider({
  children,
  blocks,
  gridConfig,
}: EditorProviderProps) {
  const { state, dispatch } = useEditor(blocks, gridConfig);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

/**
 * useEditorContext
 * 에디터 상태와 dispatch에 접근하는 hook
 */
export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within EditorProvider');
  }
  return context;
}

/**
 * useSelection
 * 선택 상태만 필요할 때 사용하는 hook
 */
export function useSelection() {
  const { state } = useEditorContext();
  return state.selection;
}

/**
 * useEditorDispatch
 * dispatch만 필요할 때 사용하는 hook
 */
export function useEditorDispatch() {
  const { dispatch } = useEditorContext();
  return dispatch;
}

/**
 * useBlocks
 * 블록 데이터만 필요할 때 사용하는 hook
 */
export function useBlocks() {
  const { state } = useEditorContext();
  return state.blocks;
}
