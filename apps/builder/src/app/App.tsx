import { ThemeProvider } from "@redotlabs/themes";
import { initialEditorData } from "@/shared/constants/editorData";
import { EditorProvider } from "./context/EditorContext";
import { EditorLayout } from "./components/EditorLayout";

export default function BuilderApp() {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <EditorProvider
        blocks={initialEditorData.blocks}
        gridConfig={initialEditorData.grid}
      >
        <EditorLayout />
      </EditorProvider>
    </ThemeProvider>
  );
}
