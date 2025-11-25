import { useState, useEffect } from "react";
import { ThemeProvider } from "@redotlabs/themes";
import type { Site } from "@/shared/types";
import { PageRenderer } from "./components/PageRenderer";

export const RendererApp = () => {
  const [site, setSite] = useState<Site | null>(null);
  const [currentPath, setCurrentPath] = useState("/");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const siteDataStr = localStorage.getItem("preview-site-data");
      if (!siteDataStr) {
        setError("No site data found. Please open preview from the builder.");
        return;
      }

      const siteData = JSON.parse(siteDataStr) as Site;
      setSite(siteData);

      const hash = window.location.hash.slice(1) || "/";
      setCurrentPath(hash);
    } catch (err) {
      setError("Failed to load site data: " + String(err));
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "/";
      setCurrentPath(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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

  const currentPage = site.pages.find((page) => page.path === currentPath);

  if (!currentPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-gray-600 mb-4">Page not found: {currentPath}</p>
          <a href="#/" className="text-blue-600 hover:underline">
            Go to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider color="blue" font="pretendard">
      <div className="min-h-screen bg-white">
        <PageRenderer page={currentPage} />
      </div>
    </ThemeProvider>
  );
};
