'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { Shipment, ShipmentStatus } from '@/lib/shipments';
import { formatCurrency, formatStatus } from '@/lib/format';

interface Props {
  items: Shipment[];
  total: number;
  page: number;
  pageSize: number;
  status: ShipmentStatus | 'all';
}

export default function ShipmentsTable({ items, total, page, pageSize, status }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const setParams = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === '') params.delete(k);
      else params.set(k, v);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <label>
        Status{' '}
        <select value={status} onChange={(e) => setParams({ status: e.target.value, page: null })}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In transit</option>
          <option value="delivered">Delivered</option>
        </select>
      </label>

      <table style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th />
            <th>Reference</th>
            <th>Customer</th>
            <th>Route</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td>
                <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} />
              </td>
              <td>{s.reference}</td>
              <td>{s.customer}</td>
              <td>
                {s.origin} → {s.destination}
              </td>
              <td>{formatStatus(s.status)}</td>
              <td>{formatCurrency(s.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button disabled={page <= 1} onClick={() => setParams({ page: String(page - 1) })}>
          Prev
        </button>
        <span>
          Page {page} / {pageCount} · {total} shipments · {selected.size} selected
        </span>
        <button disabled={page >= pageCount} onClick={() => setParams({ page: String(page + 1) })}>
          Next
        </button>
      </footer>
    </>
  );
}
