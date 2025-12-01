'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAppList,
  createApp,
  createAppManager,
  getAppPlans,
} from '@/shared/api/services/app';
import { minutes } from '@repo/utils';
import { queryKeyFactory } from '../query-key-factory';

export const useAppList = () => {
  return useQuery({
    queryKey: queryKeyFactory.app.list,
    queryFn: getAppList,
    gcTime: minutes(10),
    staleTime: minutes(10),
  });
};

export const useCreateApp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApp,
    onSuccess: () => {
      // 앱 목록 다시 가져오기
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.app.list });
    },
  });
};

export const useCreateAppManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppManager,
    onSuccess: () => {
      // 앱 목록 다시 가져오기 (isCreatedManager 상태 업데이트)
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.app.list });
    },
  });
};

export const useAppPlans = () => {
  return useQuery({
    queryKey: queryKeyFactory.app.plans,
    queryFn: getAppPlans,
    gcTime: Infinity,
    staleTime: Infinity,
  });
};
