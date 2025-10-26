import { NextRequest, NextResponse } from 'next/server';
import { extractSubdomain, isSubdomain } from '@repo/utils';

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;
  const subdomain = extractSubdomain(request.url);

  if (isSubdomain(hostname)) {
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
