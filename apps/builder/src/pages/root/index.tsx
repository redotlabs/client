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
import Loading from '../loading';
import { usePageStateManager } from '@/features/page/manager';

export default function BuilderApp() {
  const { data: pageVersions } = usePageVersions({ enabled: true });
  const { currentPageKey } = usePageStore();
  const { data: page, isLoading, isFetched } = usePage(currentPageKey);

  const { pages, currentContent } = usePageStateManager();

  if (pageVersions?.content.length === 0) return <CreatePage />;

  if (isLoading) return <Loading />;

  if (isFetched && (!page || !pages || !currentContent)) return <NotFound />;

  return (
    <EditorProvider
      key={page?.key}
      content={currentContent ?? { sections: [] }}
      pages={pages}
    >
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
