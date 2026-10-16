'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SHIPMENT_STATUSES, type Shipment, type ShipmentStatus } from '@/lib/shipments';
import { debounce } from '@/lib/debounce';
import { markDelivered } from '@/app/actions';
import ShipmentRow from './ShipmentRow';

const SEARCH_DEBOUNCE_MS = 3000;

interface Props {
  items: Shipment[];
  total: number;
  page: number;
  pageSize: number;
  status: ShipmentStatus | 'all';
  search: string;
}

export default function ShipmentsTable({ items, total, page, pageSize, status, search }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searchInput, setSearchInput] = useState(search);

  const setParams = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === '') params.delete(k);
      else params.set(k, v);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = debounce((value: string) => setParams({ q: value }), SEARCH_DEBOUNCE_MS);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onMarkDelivered = async () => {
    await markDelivered(Array.from(selected));
    setSelected(new Set());
  };

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Search reference or customer…"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />

        <label>
          Status{' '}
          <select value={status} onChange={(e) => setParams({ status: e.target.value, page: null })}>
            {SHIPMENT_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <button disabled={selected.size === 0} onClick={onMarkDelivered}>
          Mark {selected.size} as delivered
        </button>

        <small>Last synced: {new Date().toLocaleTimeString()}</small>
      </div>

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
          {items.map((s, index) => (
            <ShipmentRow
              key={index}
              shipment={s}
              isSelected={selected.has(s.id)}
              highlight={searchInput}
              onToggle={() => toggle(s.id)}
            />
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
