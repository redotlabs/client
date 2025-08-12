import { createRoot } from 'react-dom/client';
import './index.css';
import BuilderApp from '@/app/index';

function App() {
  return <BuilderApp />;
}

createRoot(document.getElementById('root')!).render(<App />);
