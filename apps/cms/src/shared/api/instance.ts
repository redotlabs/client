import { createAxiosInstance } from '@repo/api-instance';
import { PATH } from '@/shared/constants/routes';
import { isServer } from '@tanstack/react-query';
import { AUTH_WHITE_LIST } from '../constants/auth';
import { API_DOMAIN, SUBDOMAIN_HEADER } from '@/shared/constants/env-variables';

export const api = createAxiosInstance({
  baseURL: `${API_DOMAIN}/api/v1`,
});

export const initializeSubdomainHeader = (subdomain: string) => {
  api.interceptors.request.use((config) => {
    config.headers[SUBDOMAIN_HEADER] = subdomain;
    return config;
  });
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) {
      // 서버 사이드는 middleware에서 처리
      if (!isServer) {
        const pathname = window.location.pathname;
        if (!AUTH_WHITE_LIST.includes(pathname)) {
          alert('로그인이 만료되었습니다.');
          window.location.href = `${PATH.auth.signIn}?redirect=${pathname}`;
        }
      }
    }
    return Promise.reject(error);
  }
);
