import { useState, useEffect } from 'react';
import type { Site } from '@repo/renderer';
import { SiteRenderer } from '@repo/renderer';

export const RendererApp = () => {
  const [site, setSite] = useState<Site | null>(null);
  const [currentPath, setCurrentPath] = useState('/');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const siteDataStr = localStorage.getItem('preview-site-data');
      if (!siteDataStr) {
        setError('No site data found. Please open preview from the builder.');
        return;
      }

      const siteData = JSON.parse(siteDataStr) as Site;
      setSite(siteData);

      const hash = window.location.hash.slice(1) || '/';
      setCurrentPath(hash);
    } catch (err) {
      setError('Failed to load site data: ' + String(err));
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentPath(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading site...</p>
        </div>
      </div>
    );
  }

  return (
    <SiteRenderer
      site={site}
      currentPath={currentPath}
      themeConfig={{ color: 'blue', font: 'pretendard' }}
      renderNotFound={(path) => (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-gray-600 mb-4">Page not found: {path}</p>
          <a href="#/" className="text-blue-600 hover:underline">
            Go to home
          </a>
        </div>
      )}
    />
  );
};
