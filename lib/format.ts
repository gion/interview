const eur = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return eur.format(value);
}

export function formatStatus(status: string): string {
  return status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase());
}
