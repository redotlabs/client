import { api } from '../instance';
import { API_PATH } from '../path';

export const getCustomer = async (subdomain: string) => {
  const response = await api.get(API_PATH.customer.root, {
    params: {
      subdomain,
    },
  });
  return response.data;
};
