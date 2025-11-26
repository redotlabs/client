'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { signIn, reIssue, getMe } from '@/shared/api/services/auth/sign-in';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import { signOut } from '@/shared/api/services/auth/sign-in';
import { useTenantRouter } from '@repo/tenant-router/next';
import { PATH } from '@/shared/constants/routes';

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
  const { push } = useTenantRouter();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      push(PATH.auth.signIn);
    },
  });
};
