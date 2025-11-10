import { ThemeProvider } from "@redotlabs/themes";
import { initialEditorData } from "@/shared/constants/editorData";
import { EditorProvider } from "./context/EditorContext";
import { EditorLayout } from "./components/EditorLayout";

export default function BuilderApp() {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <EditorProvider
        gridConfig={initialEditorData.gridConfig}
        sections={initialEditorData.sections}
      >
        <EditorLayout />
      </EditorProvider>
    </ThemeProvider>
  );
}
