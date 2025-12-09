import {
  Canvas,
  LeftPanel,
  EditorProvider,
  InspectorPanel,
} from '@repo/builder/editor';
import { Header } from './header';
import CreatePage from './create-page';
import NotFound from '@/pages/not-found';
import { usePage } from '@/features/page/quries/page.query';
import { usePageStore } from '@/features/page/store';
import { usePageVersions } from '@/features/page/quries/page-versions.query';
import { Loader } from '@repo/ui';

export default function BuilderApp() {
  const { data: pageVersions } = usePageVersions({ enabled: true });
  const { currentPageKey, storedContentsMap, storedPagesMap } = usePageStore();
  const { data: page, isLoading } = usePage(currentPageKey);

  const pages = Object.values(storedPagesMap);
  const currentContent = currentPageKey
    ? storedContentsMap[currentPageKey]
    : null;

  if (pageVersions?.content.length === 0) return <CreatePage />;

  if (isLoading)
    return (
      <div className="size-full flex min-h-svh items-center justify-center">
        <Loader />
      </div>
    );

  if (!page || !pages || !currentContent) return <NotFound />;

  return (
    <EditorProvider key={page.key} content={currentContent} pages={pages}>
      <div className="h-svh flex flex-col min-h-0">
        <Header />
        <div className="flex flex-1 relative min-h-0 overflow-y-auto">
          <LeftPanel className="top-32" />
          <Canvas />
          <InspectorPanel className="top-32" />
        </div>
      </div>
    </EditorProvider>
  );
}
