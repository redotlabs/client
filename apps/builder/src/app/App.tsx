import { ThemeProvider } from '@redotlabs/themes';
import { EditorProvider, DEFAULT_GRID_CONFIG } from '@repo/web-builder';
import { initialSite } from '@/shared/constants/editorData';
import { EditorLayout } from './components/EditorLayout';

export default function BuilderApp() {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <EditorProvider gridConfig={DEFAULT_GRID_CONFIG} site={initialSite}>
        <EditorLayout />
      </EditorProvider>
    </ThemeProvider>
  );
}
