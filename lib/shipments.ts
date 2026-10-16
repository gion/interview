import { shipmentsTable, sleep, type Shipment, type ShipmentStatus } from './db';

export type { Shipment, ShipmentStatus };

const STATUS_LABELS: Record<string, string> = { pending: 'Pending', in_transit: 'In transit', delivered: 'Delivered' };

// Derived from the data so the filter options never go out of sync with the backend
export const SHIPMENT_STATUSES: { value: ShipmentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  ...Array.from(new Set(shipmentsTable.map((s) => s.status))).map((value) => ({ value, label: STATUS_LABELS[value] })),
];

export interface ShipmentsQuery {
  orgId: string;
  page: number;
  pageSize: number;
  status: ShipmentStatus | 'all';
  search?: string;
}

export interface ShipmentsPage {
  items: Shipment[];
  total: number;
}

// Simple in-memory cache to reduce load on the shipments DB
const cache = new Map<string, ShipmentsPage>();

export async function getShipments({ orgId, page, pageSize, status, search = '' }: ShipmentsQuery): Promise<ShipmentsPage> {
  const cacheKey = `${search}|${status}|${page}|${pageSize}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  await sleep(200 + Math.random() * 600);
  const q = search.trim().toLowerCase();
  const filtered = shipmentsTable.filter(
    (s) =>
      s.orgId === orgId &&
      (status === 'all' || s.status === status) &&
      (!q || s.reference.toLowerCase().includes(q) || s.customer.toLowerCase().includes(q)),
  );
  const start = (page - 1) * pageSize;
  const result = { items: filtered.slice(start, start + pageSize), total: filtered.length };

  cache.set(cacheKey, result);
  return result;
}
