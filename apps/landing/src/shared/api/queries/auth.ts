import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  signIn,
  reIssue,
  getMe,
  signOut,
  getSocialLoginUrl,
  verifyEmailVerificationCode,
  sendEmailVerificationCode,
  signUp,
} from '@/shared/api/services/auth';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import { PATH } from '@/shared/constants/routes';
import { useRouter } from 'next/navigation';
import { API_DOMAIN } from '@/shared/constants/env-variables';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useReIssue = () => {
  return useMutation({
    mutationFn: reIssue,
  });
};

export const useMe = (props?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeyFactory.auth.me,
    queryFn: getMe,
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: props?.enabled ?? true,
  });
};

/**
 * 맨 처음 진입시 refresh + me
 */
export const useAuth = (props?: { enabled?: boolean }) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['ONE_TIME_QUERY_FOR_INITIALIZE_SESSION'],
    queryFn: async () => {
      await reIssue();
      const data = await getMe();
      queryClient.setQueryData(queryKeyFactory.auth.me, data);
      return data;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: props?.enabled ?? true,
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      window.location.href = PATH.auth.signIn;
    },
  });
};

export const useSocialLoginUrl = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: getSocialLoginUrl,
    onSuccess: (data) => {
      /** ! Will fix
       * 현재 url의 도메인이 서버 도메인이 아니라 요청주소로 되고 있음.
       * 서버 도메인으로 리다이렉트 하기 위해서는 서버 도메인으로 리다이렉트 해야 함.
       */
      if (data.url) {
        push(new URL(data.url, API_DOMAIN).href);
      }
    },
  });
};

export const useVerifyEmailVerificationCode = () => {
  return useMutation({
    mutationFn: verifyEmailVerificationCode,
  });
};

export const useSendEmailVerificationCode = () => {
  return useMutation({
    mutationFn: sendEmailVerificationCode,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
