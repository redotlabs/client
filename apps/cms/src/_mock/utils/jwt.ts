import { STORAGE_KEYS } from '@/shared/constants/storage-keys';

const hours = (hours: number) => hours * 60 * 60;

export const generateMockJwt = () => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: 1,
    exp: Math.floor(Date.now() / 1000) + hours(0.1),
  };
  const signature = 'mock-signature';

  const encode = (obj: object | string) =>
    Buffer.from(JSON.stringify(obj))
      // base64url로 변환
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  return `${encode(header)}.${encode(payload)}.${encode(signature)}`;
};

export const getNewHeaders = () => {
  return new Headers([
    ['Set-Cookie', `${STORAGE_KEYS.accessToken}=${generateMockJwt()}; Path=/;`],
    [
      'Set-Cookie',
      `${STORAGE_KEYS.refreshToken}=${generateMockJwt()}; Path=/;`,
    ],
  ]);
};

export const getNewHeadersWithDeleteTokens = () => {
  return new Headers([
    ['Set-Cookie', `${STORAGE_KEYS.accessToken}=; Path=/; Max-Age=0;`],
    ['Set-Cookie', `${STORAGE_KEYS.refreshToken}=; Path=/; Max-Age=0;`],
  ]);
};
