import { createAxiosInstance } from '@repo/api-instance';
import { PATH } from '@/shared/constants/routes';
import { isServer } from '@tanstack/react-query';

export const api = createAxiosInstance({
  baseURL: '/api/v1',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) {
      // 서버 사이드는 middleware에서 처리
      if (!isServer) {
        const redirect = window.location.href;

        alert('로그인이 만료되었습니다.');
        window.location.href = `${PATH.auth.signIn}?redirect=${redirect}`;
      }
    }
    return Promise.reject(error);
  }
);
