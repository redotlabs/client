import { ThemeProvider } from '@redotlabs/themes';
import { WebBuilder, DEFAULT_GRID_CONFIG } from '@repo/web-builder';
import { initialSite } from '@/shared/constants/editorData';

export default function BuilderApp() {
  return (
    <ThemeProvider color="blue" font="pretendard">
      <WebBuilder
        initialSite={initialSite}
        gridConfig={DEFAULT_GRID_CONFIG}
        onPublish={async (site) => {
          console.log('Publishing site:', site);
          // TODO: Implement publish API call
          alert('Publish feature coming soon!');
        }}
        onPreview={(site) => {
          // Store preview data and open preview window
          localStorage.setItem('preview-site-data', JSON.stringify(site));
          window.open('/preview', '_blank');
        }}
        onChange={(site) => {
          // TODO: Implement auto-save
          console.log('Site changed:', site.metadata.name);
        }}
      />
    </ThemeProvider>
  );
}
