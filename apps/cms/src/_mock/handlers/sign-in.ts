import { API_PATH } from '@/shared/api/path';
import { delay, http, HttpResponse } from 'msw';
import { SignInRequest } from '@/shared/api/services/auth/sign-in';
import { MOCK_ACCOUNT } from '../utils/constants';
import { getNewHeaders, generateMockJwt } from '../utils/jwt';
import { MOCK_API_BASE } from '../utils/constants';
import { authInterceptor } from '../utils/interceptor';

const signInHandlers = () => [
  http.post(MOCK_API_BASE + API_PATH.auth.signIn, _signIn),
  http.post(MOCK_API_BASE + API_PATH.auth.reIssue, authInterceptor(_reIssue)),
  http.get(MOCK_API_BASE + API_PATH.auth.me, authInterceptor(_getMe)),
];

const _signIn: Parameters<typeof http.post<never, SignInRequest>>[1] = async ({
  request,
}) => {
  await delay(1000);
  const { email, password } = await request.json();

  if (email === MOCK_ACCOUNT.email && password === MOCK_ACCOUNT.password) {
    return HttpResponse.json(
      { accessToken: generateMockJwt() },
      { headers: getNewHeaders() }
    );
  }

  return HttpResponse.json(
    { message: '계정 정보가 일치하지 않습니다.' },
    { status: 401 }
  );
};

const _reIssue: Parameters<typeof http.post>[1] = async () => {
  await delay(300);

  return HttpResponse.json(
    { accessToken: generateMockJwt() },
    { headers: getNewHeaders() }
  );
};

const _getMe: Parameters<typeof http.get>[1] = async () => {
  await delay(1000);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = MOCK_ACCOUNT;

  return HttpResponse.json(rest);
};

export default signInHandlers();
