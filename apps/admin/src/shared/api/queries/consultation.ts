import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getConsultations,
  updateConsultation,
  type GetConsultationsParams,
} from '@/shared/api/services/consultation';
import type { Consultation, Pagination } from '@repo/types';

export const useConsultationList = (props?: {
  enabled?: boolean;
  params?: GetConsultationsParams;
}) => {
  const queryFn = () => getConsultations(props?.params ?? {});
  return useQuery({
    queryKey: queryKeyFactory.consultation.list(props?.params),
    queryFn,
    enabled: props?.enabled ?? true,
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

export const useUpdateConsultation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateConsultation,
    onSuccess: (res) => {
      queryClient.setQueriesData(
        {
          queryKey: queryKeyFactory.consultation.list(),
          exact: false,
        },
        (old?: Pagination<Consultation>) => {
          if (!old) return old;
          return {
            ...old,
            content: old.content.map((consultation) =>
              consultation.id === res.id
                ? { ...consultation, ...res }
                : consultation
            ),
          };
        }
      );
    },
  });
};
