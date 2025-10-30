import { ThemeProvider } from '@redotlabs/themes';
import { Canvas } from '@/features/canvas/components/Canvas';
import { initialEditorData } from '@/shared/constants/editorData';
import { EditorProvider } from './context/EditorContext';

export default function BuilderApp() {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <EditorProvider
        blocks={initialEditorData.blocks}
        gridConfig={initialEditorData.grid}
      >
        <EditorContent />
      </EditorProvider>
    </ThemeProvider>
  );
}

function EditorContent() {
  return <Canvas />;
}
