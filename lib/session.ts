import 'server-only';
import { cookies } from 'next/headers';

export interface Session {
  userId: string;
  orgId: string;
}

/** Mock auth. In prod this verifies a signed session cookie. */
export async function getSession(): Promise<Session> {
  const jar = await cookies();
  const orgId = jar.get('org')?.value === 'org_b' ? 'org_b' : 'org_a';
  return { userId: `user_${orgId}`, orgId };
}
