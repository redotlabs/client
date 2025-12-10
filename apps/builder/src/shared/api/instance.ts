import { createAxiosInstance } from '@repo/api-instance';
import { SUBDOMAIN_HEADER } from '../constants/env-variables';
import { toast } from '@redotlabs/ui';

export const api = createAxiosInstance({
  baseURL: '/api/v1',
});

let subdomainInterceptorId: number | null = null;

export const initializeSubdomainHeader = (subdomain: string) => {
  if (subdomainInterceptorId !== null) {
    api.interceptors.request.eject(subdomainInterceptorId);
  }

  subdomainInterceptorId = api.interceptors.request.use((config) => {
    config.headers[SUBDOMAIN_HEADER] = subdomain;
    return config;
  });

  return subdomainInterceptorId;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) {
      toast.error('페이지 이용 권한이 없습니다.');
    }
    return Promise.reject(error);
  }
);
