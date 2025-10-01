export const timestampToDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000);
};

export const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
};

export const setCookie = (name: string, value: string, exp?: number) => {
  const cookie = `${name}=${value}; path=/${
    exp ? `; expires=${new Date(timestampToDate(exp)).toUTCString()}` : ''
  }`;
  document.cookie = cookie;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const cookieManager = {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
};
