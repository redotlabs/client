import { ThemeProvider } from '@redotlabs/themes';
import { Router } from '@/shared/routes';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@redotlabs/ui';
import RedotQueryClientProvider from './shared/components/wrapper/query-client-provider';

function App() {
  return (
    <RedotQueryClientProvider>
      <ThemeProvider color="blue" font="pretendard">
        <Toaster />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </RedotQueryClientProvider>
  );
}

export default App;
