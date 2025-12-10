import { MULTI_ZONE_PATHS } from '@/shared/constants/multi-zone-paths';

export const isMultiZonePath = (path: string) => {
  return MULTI_ZONE_PATHS.some(
    (preventPath) => preventPath === path || path.startsWith(preventPath + '/')
  );
};
