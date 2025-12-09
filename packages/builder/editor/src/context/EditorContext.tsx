import { createContext, useContext, type ReactNode } from 'react';
import { useEditor } from '@/core/hooks/use-editor';
import type { GridConfig, PageContent } from '@repo/builder/renderer';
import type { EditorState } from '@/core/state';
import type { EditorAction } from '@/core/actions';
import type { RuleValidationResult } from '@/core/rules';
import { DEFAULT_GRID_CONFIG } from '@/shared/constants/editorData';
import type { AppPage } from '@repo/types';

type Pages = Pick<AppPage, 'title' | 'path'>[];

interface EditorContextValue {
  state: EditorState;
  pages: Pages;
  dispatch: (action: EditorAction) => RuleValidationResult;
  isDirty: boolean;
}

const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorProviderProps {
  children: ReactNode;
  gridConfig?: GridConfig;
  content: PageContent;
  pages: Pages;
  onChange?: (content: PageContent) => void;
}

/**
 * EditorProvider
 * 에디터 상태를 전역으로 제공하는 Provider
 */
export function EditorProvider({
  children,
  gridConfig = DEFAULT_GRID_CONFIG,
  content,
  pages,
  onChange,
}: EditorProviderProps) {
  const { state, dispatch, isDirty } = useEditor(gridConfig, content, onChange);

  return (
    <EditorContext value={{ state, pages, dispatch, isDirty }}>
      {children}
    </EditorContext>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within EditorProvider');
  }
  return context;
}
