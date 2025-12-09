import { useAppInfo } from '@/shared/api/queries/app';
import type { PropsWithChildren } from 'react';
import { ThemeProvider } from '@redotlabs/themes';

const AppThemeProvider = ({
  subdomain,
  children,
}: PropsWithChildren<{ subdomain: string }>) => {
  const { data } = useAppInfo({ enabled: !!subdomain });

  return (
    <ThemeProvider color={data?.styleInfo?.color} font={data?.styleInfo?.font}>
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
