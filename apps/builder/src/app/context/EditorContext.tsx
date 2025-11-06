import { createContext, useContext, type ReactNode } from "react";
import { useEditor } from "@/core/hooks/use-editor";
import type { Section, GridConfig } from "@/shared/types";
import type { EditorState } from "@/core/state";
import type { EditorAction } from "@/core/actions";

interface EditorContextValue {
  state: EditorState;
  dispatch: (action: EditorAction) => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorProviderProps {
  children: ReactNode;
  gridConfig: GridConfig;
  sections: Section[];
}

/**
 * EditorProvider
 * 에디터 상태를 전역으로 제공하는 Provider
 */
export function EditorProvider({
  children,
  gridConfig,
  sections,
}: EditorProviderProps) {
  const { state, dispatch } = useEditor(gridConfig, sections);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within EditorProvider");
  }
  return context;
}
