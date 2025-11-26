const isServer = typeof window === 'undefined';

const isSubdomain = (hostname: string) => {
  const dotCnt = hostname.split('.').length - 1;
  const subdomain = hostname.split('.')?.[0];
  if (!subdomain) return false;

  // subdomain.length >= 8
  // ex. subdomain.redotlabs.vercel.app
  if (hostname.includes('vercel.app') && dotCnt > 2) {
    return subdomain.length >= 8;
  }
  // ex. subdomain.redot.me
  if (dotCnt > 1) {
    return subdomain.length >= 8;
  }
  return false;
};

const isSubdomainInPath = (path: string) => {
  return path.includes('/s/');
};

const extractSubdomainFromHostname = (hostname: string) => {
  if (isSubdomain(hostname)) {
    return hostname
      .split('.')[0]!
      .replace('www.', '')
      .replace('http://', '')
      .replace('https://', '');
  }
  return null;
};

const extractSubdomainFromPath = (path: string) => {
  // /s/subdomain/path 형식으로 되어 있음. ex /s/subdomain, /s/subdomain/path
  const pathSegments = path.match(/\/s\/([^/]+)(\/|$)/);
  if (!pathSegments) {
    return null;
  }
  const [, subdomain] = pathSegments;
  return subdomain;
};

const serverSideGetSubdomain = (url?: string) => {
  if (!url) {
    throw new Error('url is required when running on server');
  }
  const { hostname, pathname } = new URL(url);
  if (isSubdomain(hostname)) {
    return extractSubdomainFromHostname(hostname);
  }
  if (isSubdomainInPath(pathname)) {
    return extractSubdomainFromPath(pathname);
  }
  return null;
};

const clientSideGetSubdomain = () => {
  const { hostname, pathname } = window.location;
  if (isSubdomain(hostname)) {
    return extractSubdomainFromHostname(hostname);
  }
  if (isSubdomainInPath(pathname)) {
    return extractSubdomainFromPath(pathname);
  }
  return null;
};

const extractSubdomain = (url?: string) => {
  return isServer ? serverSideGetSubdomain(url) : clientSideGetSubdomain();
};

export { extractSubdomain, isSubdomain, isSubdomainInPath };
