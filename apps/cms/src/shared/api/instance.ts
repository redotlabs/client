import { createAxiosInstance } from '@repo/api-instance';
import { PATH } from '@/shared/constants/routes';
import { isServer } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000';

export const api = createAxiosInstance({
  baseURL: `${BASE_URL}/api/v1`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) {
      // 서버 사이드는 middleware에서 처리
      if (!isServer) {
        const pathname = window.location.pathname;
        if (pathname !== PATH.auth.signIn) {
          alert('로그인이 만료되었습니다.');
          window.location.href = `${PATH.auth.signIn}?redirect=${pathname}`;
        }
      }
    }
    return Promise.reject(error);
  }
);
