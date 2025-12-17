import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import {
  getCustomer,
  getCustomers,
  type GetCustomersParams,
} from '@/shared/api/services/customer';
import { deleteCustomer, updateCustomer } from '@/shared/api/services/customer';
import { minutes } from '@repo/utils';

export const useCustomerList = (props?: {
  enabled?: boolean;
  params?: GetCustomersParams;
}) => {
  const queryFn = () => getCustomers(props?.params ?? {});
  return useQuery({
    queryKey: queryKeyFactory.customer.list(props?.params),
    queryFn,
    enabled: props?.enabled ?? true,
    gcTime: minutes(30),
    staleTime: minutes(30),
  });
};

export const useCustomer = (customerId?: number | null) => {
  const queryFn = () => getCustomer(customerId!);
  return useQuery({
    queryKey: queryKeyFactory.customer.detail(customerId!),
    queryFn,
    enabled: !!customerId,
    gcTime: minutes(30),
    staleTime: minutes(30),
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.customer.list(),
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: (payload) => {
      // refetch list
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.customer.list(),
      });

      // set query data
      queryClient.setQueryData(
        queryKeyFactory.customer.detail(payload.id),
        payload
      );
    },
  });
};
