import { useEffect } from 'react';
import { create } from 'zustand';
import { deviceAgentRegex, responsiveType } from './utils';
import { throttle } from '@repo/utils';

interface Store {
  viewportType: 'mobile' | 'tablet' | 'desktop';
  isInitialized: boolean;
}

const useStore = create<Store>(() => ({
  viewportType: 'mobile',
  isInitialized: false,
}));

const useViewport = () => {
  const { viewportType, isInitialized } = useStore();

  useEffect(() => {
    if (isInitialized) return;

    const userAgent = navigator.userAgent.toLowerCase();

    const isMobileDevice = deviceAgentRegex.mobile.test(userAgent);
    const isTabletDevice =
      deviceAgentRegex.tablet.test(userAgent) && !isMobileDevice;

    const updateResponsiveType = throttle(() => {
      const width = window.innerWidth;
      const type = responsiveType(width);

      if (isMobileDevice || type === 'mobile') {
        useStore.setState({ viewportType: 'mobile' });
        return;
      }

      if (isTabletDevice || type === 'tablet') {
        useStore.setState({ viewportType: 'tablet' });
        return;
      }

      useStore.setState({ viewportType: 'desktop' });
    }, 200);

    // initialize
    updateResponsiveType();
    useStore.setState({ isInitialized: true });

    window.addEventListener('resize', updateResponsiveType);

    return () => {
      window.removeEventListener('resize', updateResponsiveType);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    viewportType,
    isMobile: viewportType === 'mobile',
    isTablet: viewportType === 'tablet',
    isDesktop: viewportType === 'desktop',
  };
};

export { useViewport };
