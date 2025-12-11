import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import type { Pagination, Consultation } from '@repo/types';

export interface GetConsultationsParams {
  page?: number;
  size?: number;
  status?: string;
  type?: string;
  email?: string;
  phone?: string;
  currentWebsiteUrl?: string;
  startDate?: string;
  endDate?: string;
}

export const getConsultations = async (params: GetConsultationsParams) => {
  const { page = 0, size = 10, ...restParams } = params;
  const { data } = await api.get<Pagination<Consultation>>(
    API_PATH.consultation.root,
    {
      params: { page, size, ...restParams },
    }
  );
  return data;
};

export const updateConsultation = async (
  payload: Pick<
    Consultation,
    | 'id'
    | 'phone'
    | 'content'
    | 'page'
    | 'currentWebsiteUrl'
    | 'status'
    | 'type'
  >
) => {
  const { id, ...body } = payload;
  const { data } = await api.put<Consultation>(
    API_PATH.consultation.detail(payload.id),
    body
  );
  return data;
};
