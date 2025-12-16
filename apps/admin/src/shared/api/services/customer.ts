import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import type { Pagination, RedotUser, RedotUserStatus } from '@repo/types';

export interface GetCustomersParams extends Partial<
  Pick<RedotUser, 'name' | 'email' | 'socialProvider'>
> {
  status?: RedotUserStatus | '';
  page?: number;
  size?: number;
}

export interface CustomerDto extends RedotUser {
  appCount?: number;
}

export const getCustomers = async (params: GetCustomersParams) => {
  const { page = 0, size = 10, ...restParams } = params;
  const { data } = await api.get<Pagination<CustomerDto>>(
    API_PATH.customer.root,
    {
      params: { page, size, ...restParams },
    }
  );
  return data;
};

export const getCustomer = async (customerId: number) => {
  const { data } = await api.get<CustomerDto>(
    API_PATH.customer.detail(customerId)
  );
  return data;
};

export const deleteCustomer = async (customerId: number) => {
  await api.delete(API_PATH.customer.detail(customerId));
};

export const updateCustomer = async (
  payload: Pick<RedotUser, 'id' | 'name' | 'profileImageUrl' | 'status'>
) => {
  const { id, ...body } = payload;
  const { data } = await api.put<CustomerDto>(
    API_PATH.customer.detail(id),
    body
  );
  return data;
};
