import { api } from '../instance';
import { API_PATH } from '../path';

export const getCustomer = async () => {
  const { data } = await api.get(API_PATH.customer.root);
  return data;
};
