import 'server-only';

export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered';

export interface Shipment {
  id: string;
  orgId: string;
  reference: string;
  customer: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  price: number; // EUR
}

const ORGS = ['org_a', 'org_b'];
const CUSTOMERS = ['Dacia Logistics', 'Carpathia Freight', 'Danube Cargo', 'Transilvania Trans', 'Black Sea Lines'];
const CITIES = ['Cluj-Napoca', 'Bucharest', 'Timișoara', 'Vienna', 'Budapest', 'Munich', 'Milan', 'Constanța'];
const STATUSES: ShipmentStatus[] = ['pending', 'in_transit', 'delivered'];

export const shipmentsTable: Shipment[] = Array.from({ length: 180 }, (_, i) => ({
  id: `shp_${1000 + i}`,
  orgId: ORGS[i % ORGS.length],
  reference: `RO-${20260000 + i * 37}`,
  customer: CUSTOMERS[i % CUSTOMERS.length],
  origin: CITIES[i % CITIES.length],
  destination: CITIES[(i * 3 + 1) % CITIES.length],
  status: STATUSES[i % STATUSES.length],
  price: Math.round((450 + ((i * 97) % 2300) + (i % 7) * 0.35) * 100) / 100,
}));

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Talks to the internal billing API. Token is a server secret. */
export async function billingApi<T>(_path: string, fallback: T): Promise<T> {
  const token = process.env.INTERNAL_API_TOKEN;
  if (!token) console.warn('INTERNAL_API_TOKEN missing, using mock data');
  await sleep(150);
  return fallback;
}
