import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  createAdmin,
  resetPassword,
} from '@/shared/api/services/admin';

export const useAdmins = (props?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: queryKeyFactory.admin.list,
    queryFn: ({ pageParam = 1 }) => getAdmins({ page: pageParam, size: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: props?.enabled ?? true,
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
        queryKey: queryKeyFactory.admin.list,
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
        queryKey: queryKeyFactory.admin.list,
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
        queryKey: queryKeyFactory.admin.list,
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
