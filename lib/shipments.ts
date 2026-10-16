import 'server-only';
import { shipmentsTable, sleep, type Shipment, type ShipmentStatus } from './db';

export type { Shipment, ShipmentStatus };

export interface ShipmentsQuery {
  orgId: string;
  page: number;
  pageSize: number;
  status: ShipmentStatus | 'all';
}

export interface ShipmentsPage {
  items: Shipment[];
  total: number;
}

export async function getShipments({ orgId, page, pageSize, status }: ShipmentsQuery): Promise<ShipmentsPage> {
  await sleep(200 + Math.random() * 600);
  const filtered = shipmentsTable.filter((s) => s.orgId === orgId && (status === 'all' || s.status === status));
  const start = (page - 1) * pageSize;
  return { items: filtered.slice(start, start + pageSize), total: filtered.length };
}
