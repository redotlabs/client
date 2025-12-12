import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  createAdmin,
  resetPassword,
  uploadAdminProfileImage,
} from '@/shared/api/services/admin';
import type { PageParams } from '@repo/types';

export const useAdminList = (props?: {
  enabled?: boolean;
  params?: PageParams;
}) => {
  const queryFn = () => getAdmins(props?.params ?? {});
  return useQuery({
    queryKey: queryKeyFactory.admin.list(props?.params),
    queryFn,
    enabled: props?.enabled ?? true,
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

export const useAdmin = (adminId: number) => {
  return useQuery({
    queryKey: queryKeyFactory.admin.detail(adminId),
    queryFn: () => getAdmin(adminId),
    enabled: !!adminId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.admin.list(),
      });
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.admin.list(),
      });
    },
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.admin.list(),
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

export const useUploadAdminProfileImage = () => {
  return useMutation({
    mutationFn: uploadAdminProfileImage,
  });
};
