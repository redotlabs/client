import { jwtDecode } from '@repo/utils';
import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import { User } from '@/shared/types/user';

export interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async (data: SignInRequest) => {
  const response = await api.post(API_PATH.auth.signIn, data);
  return response.data;
};

export const reIssue = async () => {
  const response = await api.post(API_PATH.auth.reIssue, {});
  const { accessToken } = response.data;
  const { exp } = jwtDecode(accessToken);
  tokenExpired(exp);

  return response.data;
};

const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // 만료 5분 전에 refresh
  const timeLeft = exp * 1000 - currentTime - 5 * 60 * 1000;

  clearTimeout(expiredTimer);

  // 1일보다 많이 남으면 실행하지 않음
  if (timeLeft >= 86400000) {
    return;
  }

  expiredTimer = setTimeout(() => {
    reIssue();
  }, timeLeft);
};

export const getMe = async () => {
  const response = await api.get<User>(API_PATH.auth.me);
  return response.data;
};
