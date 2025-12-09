import { NextRequest, NextResponse } from 'next/server';
import { extractSubdomain, isSubdomain } from '@repo/utils';
import { BUILDER_DOMAIN, CMS_DOMAIN } from './shared/constants/env-variables';

const rewriteCmsUrl = (pathname: string, subdomain: string) => {
  const isCmsStatic =
    /\/cms\/(_next|__next|static|images|fonts|robots\.txt|mock|api|\.next)/.test(
      pathname
    ) || /\.(svg|png|jpg|jpeg|gif|ico|css|js|woff2?|ttf|json)$/.test(pathname);
  if (isCmsStatic) {
    return `${CMS_DOMAIN}${pathname}`;
  }
  const onlyPath = pathname.replace('/cms', '');
  return `${CMS_DOMAIN}/cms/s/${subdomain}${onlyPath}`;
};

const rewriteBuilderUrl = (pathname: string, subdomain: string) => {
  const onlyPath = pathname.replace('/builder', '');

  const isPageRequest = onlyPath === '/' || onlyPath === '/preview';

  if (isPageRequest) {
    const normalizedPath = onlyPath.endsWith('/') ? onlyPath : onlyPath + '/';
    return `${BUILDER_DOMAIN}/builder/s/${subdomain}${normalizedPath}`;
  }

  const normalizedPath = pathname.endsWith('/') ? pathname : pathname + '/';
  return `${BUILDER_DOMAIN}${normalizedPath}`;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || request.nextUrl.hostname;
  const url = `${request.nextUrl.protocol}//${host}${pathname}`;
  const subdomain = extractSubdomain(url);

  if (subdomain && isSubdomain(url)) {
    if (pathname.startsWith('/cms')) {
      return NextResponse.rewrite(rewriteCmsUrl(pathname, subdomain));
    }
    if (pathname.startsWith('/builder')) {
      return NextResponse.rewrite(rewriteBuilderUrl(pathname, subdomain));
    }
    return NextResponse.rewrite(
      new URL(`/s/${subdomain}${pathname}`, request.url)
    );
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    // '/((?!api|_next|[\\w-]+\\.\\w+).*)',
    '/((?!_next/static|_next/image|favicon.ico|fonts|images|robots.txt|mock|api|.next).*)',
  ],
};
