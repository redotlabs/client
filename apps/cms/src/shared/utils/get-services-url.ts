import { ROOT_DOMAIN } from '@/shared/constants/env-variables';

export const getCmsUrl = (subdomain: string) => {
  const { protocol } = window.location;
  return `${protocol}//${subdomain}.${ROOT_DOMAIN}/cms`;
};

export const getBuilderUrl = (subdomain: string) => {
  const { protocol } = window.location;
  return `${protocol}//${subdomain}.${ROOT_DOMAIN}/builder`;
};
