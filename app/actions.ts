'use server';

import { shipmentsTable } from '@/lib/db';

export async function markDelivered(ids: string[]) {
  console.log('[markDelivered]', ids);
  for (const shipment of shipmentsTable) {
    if (ids.includes(shipment.id)) shipment.status = 'delivered';
  }
  return { ok: true };
}
