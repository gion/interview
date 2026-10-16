import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = { title: 'Fleet Dashboard' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui', padding: 24 }}>
        <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <strong>Fleet Dashboard</strong>
          <Link href="/shipments">Shipments</Link>
          <Link href="/invoices">Invoices</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
