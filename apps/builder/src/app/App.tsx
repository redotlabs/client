import { ThemeProvider } from "@redotlabs/themes";
import { DEFAULT_GRID_CONFIG, initialSite } from "@/shared/constants/editorData";
import { EditorProvider } from "./context/EditorContext";
import { EditorLayout } from "./components/EditorLayout";

export default function BuilderApp() {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <EditorProvider gridConfig={DEFAULT_GRID_CONFIG} site={initialSite}>
        <EditorLayout />
      </EditorProvider>
    </ThemeProvider>
  );
}
