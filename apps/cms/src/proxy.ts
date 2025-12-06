import { NextRequest, NextResponse } from 'next/server';
import { extractSubdomain, isSubdomain } from '@repo/utils';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // request.nextUrl.hostname은 localhost를 반환하므로, 실제 Host 헤더를 읽어야 함
  const host = request.headers.get('host') || request.nextUrl.hostname;
  const url = `${request.nextUrl.protocol}//${host}${pathname}`;
  const subdomain = extractSubdomain(url);

  if (isSubdomain(url)) {
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
