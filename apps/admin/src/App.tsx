import { ThemeProvider } from '@redotlabs/themes';
import { Router } from '@/shared/routes';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@redotlabs/ui';
import RedotQueryClientProvider from './shared/components/wrapper/query-client-provider';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './pages/error';

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <RedotQueryClientProvider>
        <ThemeProvider color="blue" font="pretendard">
          <Toaster />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </RedotQueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
