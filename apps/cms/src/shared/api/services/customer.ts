import { api } from '../instance';
import { API_PATH } from '../path';

export const getCustomer = async () => {
  const response = await api.get(API_PATH.customer.root);
  return response.data;
};
