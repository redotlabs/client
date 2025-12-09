import { createRoot } from 'react-dom/client';
import './index.css';
import BuilderApp from '@/pages/root';
import { PreviewPage } from '@/pages/preview';
import RedotQueryClientProvider from './shared/components/wrapper/query-client-provider';
import SubdomainInitializer from './shared/components/wrapper/subdomain-initializer';
import { Toaster } from '@redotlabs/ui';
import { extractSubdomain } from '@repo/utils';
import AuthGuard from './shared/components/wrapper/auth-guard';
import NotFound from './pages/not-found';
import AppThemeProvider from './shared/components/wrapper/app-theme-provider';

const isPreviewMode = window.location.pathname === '/builder/preview';

function App() {
  const subdomain = extractSubdomain(window.location.href);

  return (
    <RedotQueryClientProvider>
      <SubdomainInitializer subdomain={subdomain ?? ''}>
        <AppThemeProvider subdomain={subdomain ?? ''}>
          <Toaster />
          {(() => {
            if (!subdomain) return <NotFound />;
            if (isPreviewMode) return <PreviewPage />;
            return (
              <AuthGuard>
                <BuilderApp />
              </AuthGuard>
            );
          })()}
        </AppThemeProvider>
      </SubdomainInitializer>
    </RedotQueryClientProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
