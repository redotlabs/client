import { createContext, useContext, type ReactNode } from "react";
import { useEditor } from "@/core/hooks/use-editor";
import type { BuilderBlock, GridConfig } from "@/shared/types";
import type { EditorState } from "@/core/state";
import type { EditorAction } from "@/core/actions";

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

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within EditorProvider");
  }
  return context;
}
