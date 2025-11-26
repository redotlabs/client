import { createAxiosInstance } from '@repo/api-instance';
import { SUBDOMAIN_HEADER } from '@/shared/constants/env-variables';
import { API_DOMAIN } from '../constants/env-variables';

const isServer = typeof window === 'undefined';

export const api = createAxiosInstance({
  baseURL: isServer ? `${API_DOMAIN}/api/v1` : '/api/v1',
});

export const initializeSubdomainHeader = (subdomain: string) => {
  api.interceptors.request.use((config) => {
    config.headers[SUBDOMAIN_HEADER] = subdomain;
    return config;
  });
};
