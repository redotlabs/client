const isServer = typeof window === 'undefined';

const decode = (str: string) => {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  if (isServer) {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
  return window
    .atob(base64)
    .split('')
    .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
    .join('');
};

export function jwtDecode(token: string) {
  const [, payload] = token.split('.');
  if (!payload) return {};

  const jsonPayload = decodeURIComponent(decode(payload));

  return JSON.parse(jsonPayload);
}

export const isValidToken = (accessToken: string | undefined | null) => {
  if (!accessToken) return false;

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
