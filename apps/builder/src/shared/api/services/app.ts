import { api } from '@/shared/api/instance';
import { API_PATH } from '@/shared/api/path';
import type { AppPage, Pagination } from '@repo/types';
import type { PageContent } from '@repo/builder/renderer';
import { safeParseJson } from '@repo/utils';

export const getAppInfo = async () => {
  const { data } = await api.get(API_PATH.app.bySubdomain);
  return data;
};

export interface GetPageVersionsParams {
  page?: number;
  size?: number;
  status?: 'DRAFT' | 'PUBLISHED';
}

export interface PageVersion {
  id: number;
  remark?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  pages: Pick<AppPage, 'id' | 'title' | 'description' | 'path'>[];
  createdAt: string;
}

export const getPageVersions = async (params?: GetPageVersionsParams) => {
  const { data } = await api.get<Pagination<PageVersion>>(
    API_PATH.app.page.versions,
    {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? 10,
        status: params?.status,
      },
    }
  );
  return data;
};

export interface CreatePageVersionPayload {
  status: 'DRAFT' | 'PUBLISHED';
  remark?: string | null;
  retained: { id: AppPage['id'] }[];
  added: Pick<
    AppPage,
    'title' | 'description' | 'path' | 'content' | 'isProtected'
  >[];
}

export const createPageVersion = async (payload: CreatePageVersionPayload) => {
  // added의 content를 string화해야 함.
  const payloadWithStringContent = {
    ...payload,
    added: payload.added.map((item) => ({
      ...item,
      content: JSON.stringify(item.content),
    })),
  };
  const { data } = await api.post(
    API_PATH.app.page.versions,
    payloadWithStringContent
  );
  return data;
};

export const getPage = async (pageId: number) => {
  const { data } = await api.get(API_PATH.app.page.detail(pageId));
  // content는 JSON string임. parsing해야 함.
  data.content = safeParseJson(data?.content) ?? {};
  return data as AppPage<PageContent>;
};
