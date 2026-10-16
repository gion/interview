import { describe, expect, it } from 'vitest';
import { formatCurrency, formatStatus } from './format';

describe('formatCurrency', () => {
  it('formats EUR', () => {
    expect(formatCurrency(1899.99)).toBe('€1,900');
    expect(formatCurrency(23410.5)).toBe('€23,411');
  });
});

describe('formatStatus', () => {
  it('humanizes status', () => {
    expect(formatStatus('in_transit')).toBe('In transit');
  });
});
