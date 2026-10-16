# Fleet Dashboard

Multi-tenant dashboard for dispatchers (Next.js App Router).
Each user belongs to an organisation (`orgId`); a user must only ever see their own org's data.

```bash
npm install
npm run dev     # http://localhost:3000/shipments
npm test
```

- Data layer is mocked in `lib/db.ts` (random latency).
- Session is mocked in `lib/session.ts`: switch tenant with cookie `org=org_a` / `org=org_b`
  (or `/api/dev-login?org=org_b`).
