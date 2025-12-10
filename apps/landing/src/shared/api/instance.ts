import { createAxiosInstance } from '@repo/api-instance';
import { PATH } from '@/shared/constants/routes';
import { isServer } from '@tanstack/react-query';
import { AUTH_WHITE_LIST } from '@/shared/constants/auth';
import { API_DOMAIN } from '../constants/env-variables';
import { toast } from '@redotlabs/ui';

export const api = createAxiosInstance({
  baseURL: isServer ? `${API_DOMAIN}/api/v1` : '/api/v1',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) {
      if (!isServer) {
        const pathname = window.location.pathname;
        if (!AUTH_WHITE_LIST.some((whiteList) => pathname === whiteList)) {
          toast.error('로그인이 만료되었습니다.');
          window.location.href = `${PATH.auth.signIn}?redirect=${pathname}`;
        }
      }
    }
    return Promise.reject(error);
  }
);
