import { createAxiosInstance } from '@repo/api-instance';
import { PATH } from '@/shared/constants/routes';
import { isServer } from '@tanstack/react-query';
import { AUTH_WHITE_LIST } from '../constants/auth';
import { SUBDOMAIN_HEADER } from '@/shared/constants/env-variables';
import { extractSubdomain, isSubdomainInPath } from '@repo/utils';
import { API_DOMAIN } from '../constants/env-variables';

export const api = createAxiosInstance({
  baseURL: isServer ? `${API_DOMAIN}/api/v1` : '/api/v1',
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
        const subdomain = extractSubdomain();
        const pathPrefix = isSubdomainInPath(pathname) ? `/s/${subdomain}` : '';
        const redirect = pathname.replace(`/s/${subdomain}`, '');

        if (
          !AUTH_WHITE_LIST.some((whiteList) => pathname.includes(whiteList))
        ) {
          alert('로그인이 만료되었습니다.');
          window.location.href = `${pathPrefix}${PATH.auth.signIn}?redirect=${redirect}`;
        }
      }
    }
    return Promise.reject(error);
  }
);
