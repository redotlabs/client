import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getAppInfo,
  getPage,
  getPageVersions,
  createPageVersion,
  type GetPageVersionsParams,
} from '@/shared/api/services/app';

export const useAppInfo = (props?: { enabled: boolean }) => {
  return useQuery({
    queryKey: queryKeyFactory.app.bySubdomain,
    queryFn: getAppInfo,
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: props?.enabled ?? true,
  });
};

export const useGetPageVersions = (params?: GetPageVersionsParams) => {
  const queryFn = () => getPageVersions(params);
  return useQuery({
    queryKey: queryKeyFactory.app.page.versions,
    queryFn,
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

export const useCreatePageVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPageVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.app.page.versions,
      });
    },
  });
};

export const useGetPage = (pageId?: number) => {
  const queryFn = () => (pageId ? getPage(pageId) : Promise.resolve(undefined));
  return useQuery({
    queryKey: queryKeyFactory.app.page.detail(pageId!),
    queryFn,
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !!pageId,
  });
};
