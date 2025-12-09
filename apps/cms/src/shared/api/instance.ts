import { createAxiosInstance } from '@repo/api-instance';
import { PATH } from '@/shared/constants/routes';
import { isServer } from '@tanstack/react-query';
import { AUTH_WHITE_LIST } from '../constants/auth';
import {
  IS_MULTI_ZONE,
  SUBDOMAIN_HEADER,
} from '@/shared/constants/env-variables';
import { extractSubdomain, isSubdomainInPath } from '@repo/utils';
import { API_DOMAIN } from '../constants/env-variables';

export const api = createAxiosInstance({
  baseURL: isServer ? `${API_DOMAIN}/api/v1` : '/api/v1',
});

// 서브도메인 interceptor ID를 저장하여 중복 등록 방지
let subdomainInterceptorId: number | null = null;

export const initializeSubdomainHeader = (subdomain: string) => {
  // 이전 interceptor가 있으면 제거
  if (subdomainInterceptorId !== null) {
    api.interceptors.request.eject(subdomainInterceptorId);
  }

  // 클라이언트 사이드에서는 동적으로 서브도메인을 가져오고,
  // 서버 사이드에서는 파라미터로 받은 서브도메인을 사용
  subdomainInterceptorId = api.interceptors.request.use((config) => {
    let currentSubdomain = subdomain;

    // 클라이언트 사이드에서는 매 요청마다 현재 탭의 서브도메인을 동적으로 가져옴
    if (!isServer && typeof window !== 'undefined') {
      const dynamicSubdomain = extractSubdomain();
      if (dynamicSubdomain) {
        currentSubdomain = dynamicSubdomain;
      }
    }

    config.headers[SUBDOMAIN_HEADER] = currentSubdomain;
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
        const basePath = IS_MULTI_ZONE ? '/cms' : '';
        const subdomain = extractSubdomain();
        const pathPrefix = isSubdomainInPath(pathname) ? `/s/${subdomain}` : '';
        const redirect = pathname
          .replace(basePath, '')
          .replace(`/s/${subdomain}`, '');

        if (
          !AUTH_WHITE_LIST.some((whiteList) => pathname.includes(whiteList))
        ) {
          alert('로그인이 만료되었습니다.');
          window.location.href =
            basePath + pathPrefix + PATH.auth.signIn + `?redirect=${redirect}`;
        }
      }
    }
    return Promise.reject(error);
  }
);
