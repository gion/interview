const eur = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Used for prices AND invoice amounts — must stay exact to the cent. */
export function formatCurrency(value: number): string {
  return eur.format(value);
}

export function formatStatus(status: string): string {
  return status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase());
}
