import { jwtDecode } from '@repo/utils';
import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import { RedotUser } from '@repo/types';

export interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async (payload: SignInRequest) => {
  const { data } = await api.post(API_PATH.auth.signIn, payload);
  return data;
};

export const reIssue = async () => {
  const { data } = await api.post(API_PATH.auth.reIssue, {});
  const { accessToken } = data;
  const { exp } = jwtDecode(accessToken);
  tokenExpired(exp);

  return data;
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
  const { data } = await api.get<RedotUser>(API_PATH.auth.me);
  return data;
};

export const signOut = async () => {
  const { data } = await api.post(API_PATH.auth.signOut);
  return data;
};

export const getSocialLoginUrl = async ({
  provider,
  redirectUri: redirect_uri,
  failureUri: failure_uri,
}: {
  provider: string;
  redirectUri: string;
  failureUri: string;
}) => {
  const { data } = await api.get<{ url: string }>(API_PATH.auth.socialUrl, {
    params: {
      provider,
      redirect_uri,
      failure_uri,
    },
  });
  return data;
};

export const verifyEmailVerificationCode = async (payload: {
  email: string;
  purpose: 'redot-member-sign-up';
  code: string;
}) => {
  const { data } = await api.post<{ verificationToken: string }>(
    API_PATH.auth.email.verify,
    payload
  );
  return data;
};

export const sendEmailVerificationCode = async (payload: {
  email: string;
  purpose: 'redot-member-sign-up';
}) => {
  const { data } = await api.post(API_PATH.auth.email.send, payload);
  return data;
};

export const signUp = async (payload: {
  email: string;
  password: string;
  name: string;
  verificationToken: string;
}) => {
  const { data } = await api.post(API_PATH.auth.signUp, payload);
  return data;
};
