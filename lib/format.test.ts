import { describe, expect, it } from 'vitest';
import { formatCurrency, formatStatus } from './format';

describe('formatCurrency', () => {
  it('keeps cents', () => {
    expect(formatCurrency(1899.99)).toBe('€1,899.99');
    expect(formatCurrency(23410.5)).toBe('€23,410.50');
  });
});

describe('formatStatus', () => {
  it('humanizes status', () => {
    expect(formatStatus('in_transit')).toBe('In transit');
  });
});
