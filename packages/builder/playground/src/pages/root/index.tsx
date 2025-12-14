import {
  Canvas,
  LeftPanel,
  EditorProvider,
  InspectorPanel,
} from '@repo/builder/editor';
import type { PageContent } from '@repo/builder/renderer';

// Mock content for testing
const mockContent: PageContent = {
  sections: [
    {
      id: 'section-1',
      name: 'Main Section',
      rows: 25,
      blocks: [
        {
          id: 'block-1',
          component: 'text',
          position: { x: 5, y: 5, zIndex: 1 },
          size: { width: 15, height: 3 },
          props: {
            children: 'Welcome to Builder Playground!',
            fontSize: 24,
            fontWeight: 'bold',
          },
        },
        {
          id: 'block-2',
          component: 'button',
          position: { x: 5, y: 10, zIndex: 1 },
          size: { width: 10, height: 2 },
          props: {
            children: 'Click me',
            variant: 'default',
          },
        },
      ],
    },
  ],
};

const mockPages = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
];

export default function BuilderApp() {
  return (
    <EditorProvider content={mockContent} pages={mockPages}>
      <div className="h-svh flex flex-col min-h-0">
        <header className="px-4 py-3 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold">🎮 Builder Playground</h1>
        </header>
        <div className="flex flex-1 relative min-h-0 overflow-y-auto">
          <LeftPanel className="top-0" />
          <Canvas />
          <InspectorPanel className="top-0" />
        </div>
      </div>
    </EditorProvider>
  );
}
