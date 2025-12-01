import { createAxiosInstance } from '@repo/api-instance';
import { SUBDOMAIN_HEADER } from '@/shared/constants/env-variables';
import { API_DOMAIN } from '../constants/env-variables';
import { extractSubdomain } from '@repo/utils';

const isServer = typeof window === 'undefined';

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
