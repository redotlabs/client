import { createContext, useContext, type ReactNode } from 'react';
import { useEditor } from '@/core/hooks/use-editor';
import type { GridConfig, Page } from '@repo/builder/renderer';
import type { EditorState } from '@/core/state';
import type { EditorAction } from '@/core/actions';
import type { RuleValidationResult } from '@/core/rules';
import { DEFAULT_GRID_CONFIG } from '@/shared/constants/editorData';

type Pages = Pick<Page, 'id' | 'title' | 'path'>[];

interface EditorContextValue {
  state: EditorState;
  pages: Pages;
  dispatch: (action: EditorAction) => RuleValidationResult;
}

const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorProviderProps {
  children: ReactNode;
  gridConfig?: GridConfig;
  currentPage: Page;
  pages: Pages;
  onChange?: (page: Page) => void;
}

/**
 * EditorProvider
 * 에디터 상태를 전역으로 제공하는 Provider
 */
export function EditorProvider({
  children,
  gridConfig = DEFAULT_GRID_CONFIG,
  currentPage,
  pages,
  onChange,
}: EditorProviderProps) {
  const { state, dispatch } = useEditor(gridConfig, currentPage, onChange);

  return (
    <EditorContext value={{ state, pages, dispatch }}>{children}</EditorContext>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within EditorProvider');
  }
  return context;
}
