import { getNewHeadersWithDeleteTokens } from './jwt';
import { HttpResponse } from 'msw';
import { STORAGE_KEYS } from '@/shared/constants/storage-keys';
import { isValidToken } from '@repo/utils';
import { SUBDOMAIN_HEADER } from '@/shared/constants/env-variables';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authInterceptor = (func: any) => (props: any) => {
  if (props?.cookies) {
    const accessToken = props.cookies[STORAGE_KEYS.accessToken];
    const refreshToken = props.cookies[STORAGE_KEYS.refreshToken];

    if (!isValidToken(accessToken) || !isValidToken(refreshToken)) {
      return HttpResponse.json(
        { message: 'Session is expired' },
        { status: 401, headers: getNewHeadersWithDeleteTokens() }
      );
    }
  }

  return func(props);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subdomainInterceptor = (func: any) => (props: any) => {
  if (props?.request?.headers) {
    const subdomain = props.request.headers.get(SUBDOMAIN_HEADER);
    if (subdomain) {
      return func(props);
    }
  }
  return HttpResponse.json(
    { message: 'Subdomain is not valid' },
    { status: 400 }
  );
};
