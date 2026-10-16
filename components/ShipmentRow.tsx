'use client';

import { memo, useState } from 'react';
import type { Shipment } from '@/lib/shipments';
import { formatCurrency, formatStatus } from '@/lib/format';

interface Props {
  shipment: Shipment;
  isSelected: boolean;
  highlight: string;
  onToggle: () => void;
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  return text.replace(new RegExp(query, 'gi'), (m) => `<mark>${m}</mark>`);
}

function ShipmentRow({ shipment: s, isSelected, highlight, onToggle }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr onClick={() => setExpanded((e) => !e)} style={{ cursor: 'pointer' }}>
        <td onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={isSelected} onChange={onToggle} />
        </td>
        <td dangerouslySetInnerHTML={{ __html: highlightMatch(s.reference, highlight) }} />
        <td dangerouslySetInnerHTML={{ __html: highlightMatch(s.customer, highlight) }} />
        <td>
          {s.origin} → {s.destination}
        </td>
        <td>{formatStatus(s.status)}</td>
        <td>{formatCurrency(s.price)}</td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} style={{ background: '#f6f6f6' }}>
            Shipment {s.id} · {s.customer} · {formatCurrency(s.price)}
          </td>
        </tr>
      )}
    </>
  );
}

// Memoized to avoid re-rendering every row on each keystroke
export default memo(ShipmentRow);
