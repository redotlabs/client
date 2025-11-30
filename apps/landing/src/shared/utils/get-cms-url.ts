import { ROOT_DOMAIN } from '../constants/env-variables';

export const getCmsUrl = (subdomain: string) => {
  const { protocol } = window.location;
  return `${protocol}//${subdomain}.${ROOT_DOMAIN}/cms`;
};
