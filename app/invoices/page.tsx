import { billingApi } from '@/lib/db';
import { formatCurrency } from '@/lib/format';
import { getSession } from '@/lib/session';

export default async function InvoicesPage() {
  const { orgId } = await getSession();
  const totals = await billingApi(`/orgs/${orgId}/totals`, { invoiced: 184230.75, outstanding: 23410.5, overdue: 1899.99 });

  return (
    <section>
      <h1>Invoices</h1>
      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '4px 16px' }}>
        <dt>Invoiced</dt><dd>{formatCurrency(totals.invoiced)}</dd>
        <dt>Outstanding</dt><dd>{formatCurrency(totals.outstanding)}</dd>
        <dt>Overdue</dt><dd>{formatCurrency(totals.overdue)}</dd>
      </dl>
    </section>
  );
}
