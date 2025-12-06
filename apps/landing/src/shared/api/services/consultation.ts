import { Consultation } from '@repo/types';
import { API_PATH } from '@/shared/api/path';
import { api } from '@/shared/api/instance';

export const createConsultation = async (
  payload: Omit<Consultation, 'id' | 'createdAt'>
) => {
  const { data } = await api.post(API_PATH.consultation.root, payload);
  return data;
};
