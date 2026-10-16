import { getSession } from '@/lib/session';
import { getShipments, type ShipmentStatus } from '@/lib/shipments';
import ShipmentsTable from '@/components/ShipmentsTable';

const PAGE_SIZE = 20;

export default async function ShipmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const status = (params.status ?? 'all') as ShipmentStatus | 'all';

  const { orgId } = await getSession();
  const data = await getShipments({ orgId, page, pageSize: PAGE_SIZE, status });

  return (
    <section>
      <h1>Shipments</h1>
      <ShipmentsTable items={data.items} total={data.total} page={page} pageSize={PAGE_SIZE} status={status} />
    </section>
  );
}
