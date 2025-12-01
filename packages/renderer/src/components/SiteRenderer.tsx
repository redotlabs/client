import { ThemeProvider } from '@redotlabs/themes';
import type { Site } from '../types';
import { PageRenderer } from './PageRenderer';

interface SiteRendererProps {
  /**
   * Site data containing pages and metadata
   */
  site: Site;

  /**
   * Current path to render (e.g., '/', '/about')
   */
  currentPath: string;

  /**
   * Theme configuration
   */
  themeConfig?: {
    color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
    font?: 'pretendard';
  };

  /**
   * Custom 404 component
   */
  renderNotFound?: (path: string) => React.ReactNode;
}

/**
 * SiteRenderer - Renders a complete site with theme and routing
 *
 * This component handles:
 * - Theme provider integration
 * - Page routing based on currentPath
 * - 404 page handling
 *
 * @example
 * ```tsx
 * <SiteRenderer
 *   site={siteData}
 *   currentPath={window.location.pathname}
 *   themeConfig={{ color: 'blue', font: 'pretendard' }}
 * />
 * ```
 */
export function SiteRenderer({
  site,
  currentPath,
  themeConfig = { color: 'blue', font: 'pretendard' },
  renderNotFound,
}: SiteRendererProps) {
  const currentPage = site.pages.find((page) => page.path === currentPath);

  const NotFoundContent = () => {
    if (renderNotFound) {
      return <>{renderNotFound(currentPath)}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-gray-600 mb-4">Page not found: {currentPath}</p>
          <a href="/" className="text-blue-600 hover:underline">
            Go to home
          </a>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider
      color={themeConfig.color ?? 'blue'}
      font={themeConfig.font ?? 'pretendard'}
    >
      <div className="min-h-screen bg-white">
        {currentPage ? (
          <PageRenderer page={currentPage} />
        ) : (
          <NotFoundContent />
        )}
      </div>
    </ThemeProvider>
  );
}
