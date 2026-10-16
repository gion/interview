import { NextResponse, type NextRequest } from 'next/server';

/** Dev-only helper to switch tenant. */
export function GET(req: NextRequest) {
  const org = req.nextUrl.searchParams.get('org') === 'org_b' ? 'org_b' : 'org_a';
  const res = NextResponse.redirect(new URL('/shipments', req.url));
  res.cookies.set('org', org);
  return res;
}
