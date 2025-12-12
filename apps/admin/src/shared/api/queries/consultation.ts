import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getConsultation,
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

export const useConsultation = (consultationId?: number | null) => {
  const queryFn = () => getConsultation(consultationId!);
  return useQuery({
    queryKey: queryKeyFactory.consultation.detail(consultationId!),
    queryFn,
    enabled: !!consultationId,
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

export const useUpdateConsultation = () => {
  const queryClient = useQueryClient();

  const updateList = (res: Consultation) => {
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
  };

  const updateDetail = (res: Consultation) => {
    queryClient.setQueryData(queryKeyFactory.consultation.detail(res.id), res);
  };

  return useMutation({
    mutationFn: updateConsultation,
    onSuccess: (res) => {
      updateList(res);
      updateDetail(res);
    },
  });
};
