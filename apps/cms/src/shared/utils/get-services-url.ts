import { IS_PRODUCTION, ROOT_DOMAIN } from '@/shared/constants/env-variables';

export const getBuilderUrl = (subdomain: string) => {
  const protocol = IS_PRODUCTION ? 'https' : 'http';
  return `${protocol}://${subdomain}.${ROOT_DOMAIN}/builder`;
};
