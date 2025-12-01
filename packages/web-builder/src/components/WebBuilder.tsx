import type { Site, Page, GridConfig } from '@repo/renderer';
import { EditorProvider, useEditorContext } from '@/context';
import { getCurrentPage } from '@/core/state/selectors';
import { Canvas } from './canvas/components/Canvas';
import { Header } from './header/components';
import { LeftPanel } from './toolbox/components';
import { InspectorPanel } from './inspector/components';

export interface WebBuilderProps {
  /**
   * Initial site data to load in the editor
   */
  initialSite: Site;

  /**
   * Grid configuration for the canvas
   */
  gridConfig: GridConfig;

  /**
   * Callback when user clicks publish button
   * Receives the current site state
   */
  onPublish?: (site: Site) => void | Promise<void>;

  /**
   * Callback when user clicks preview button
   * Receives the current site and selected page
   */
  onPreview?: (site: Site, page: Page) => void;

  /**
   * Callback when site data changes
   * Useful for auto-save functionality
   */
  onChange?: (site: Site) => void;

  /**
   * Optional custom header component
   * If not provided, uses default Header
   */
  renderHeader?: (props: HeaderProps) => React.ReactNode;
}

interface HeaderProps {
  onPublish?: () => void | Promise<void>;
  onPreview?: () => void;
}

/**
 * Inner component that has access to EditorContext
 */
function WebBuilderInner({
  onPublish,
  onPreview,
  renderHeader,
}: {
  onPublish?: (site: Site) => void | Promise<void>;
  onPreview?: (site: Site, page: Page) => void;
  renderHeader?: (props: HeaderProps) => React.ReactNode;
}) {
  const { state } = useEditorContext();

  const handlePublish = onPublish
    ? async () => {
        await onPublish(state.site);
      }
    : undefined;

  const handlePreview = onPreview
    ? () => {
        const currentPage = getCurrentPage(state);
        if (currentPage) {
          onPreview(state.site, currentPage);
        }
      }
    : undefined;

  return (
    <div className="h-screen flex flex-col">
      {renderHeader ? (
        renderHeader({ onPublish: handlePublish, onPreview: handlePreview })
      ) : (
        <Header onPublish={handlePublish} onPreview={handlePreview} />
      )}
      <div className="flex flex-1 mt-14">
        <LeftPanel />
        <Canvas />
        <InspectorPanel />
      </div>
    </div>
  );
}

/**
 * WebBuilder - Complete web builder editor component
 *
 * This is the main component that wraps all editor functionality.
 * Simply provide initial site data and configuration, and optionally
 * callbacks for publish/preview actions.
 *
 * @example
 * ```tsx
 * <WebBuilder
 *   initialSite={mySite}
 *   gridConfig={DEFAULT_GRID_CONFIG}
 *   onPublish={async (site) => {
 *     await api.publishSite(site);
 *   }}
 *   onPreview={(site, page) => {
 *     window.open(`https://${site.metadata.subdomain}.example.com${page.path}`);
 *   }}
 * />
 * ```
 */
export function WebBuilder({
  initialSite,
  gridConfig,
  onPublish,
  onPreview,
  onChange,
  renderHeader,
}: WebBuilderProps) {
  return (
    <EditorProvider
      gridConfig={gridConfig}
      site={initialSite}
      onChange={onChange}
    >
      <WebBuilderInner
        onPublish={onPublish}
        onPreview={onPreview}
        renderHeader={renderHeader}
      />
    </EditorProvider>
  );
}
