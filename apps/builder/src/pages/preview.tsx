import { PageRenderer, type PageContent } from '@repo/builder/renderer';
import type { AppPage } from '@repo/types';
import { safeParseJson } from '@repo/utils';

export const PreviewPage = () => {
  const storedPage = localStorage.getItem('preview-page-data');

  const isError = !storedPage;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600">
            No page data found. Please open preview from the builder.
          </p>
        </div>
      </div>
    );
  }

  const page = safeParseJson<AppPage<PageContent>>(storedPage);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading site...</p>
        </div>
      </div>
    );
  }

  return <PageRenderer content={page.content} />;
};
