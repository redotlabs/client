import Sidebar from './sidebar';
import Header from './header';
import type { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="size-full flex min-h-svh max-h-svh">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
