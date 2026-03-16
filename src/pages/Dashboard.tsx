import { useState, useEffect, useCallback } from 'react';
import { iamService, type AuditLog } from '@/lib/iamMock';
import StatCard from '@/components/StatCard';
import AuditLogTable from '@/components/AuditLogTable';

export default function Dashboard() {
  const [stats, setStats] = useState({ active: 0, pending: 0, deactivated: 0, total: 0 });
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const load = useCallback(async () => {
    const [s, l] = await Promise.all([iamService.getStats(), iamService.getLogs()]);
    setStats(s);
    setLogs(l.slice(0, 10));
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Identity Overview</h1>
        <p className="text-sm text-muted-foreground">System-wide JML lifecycle status.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Identities" value={stats.active} variant="active" />
        <StatCard label="Pending Approvals" value={stats.pending} variant="pending" />
        <StatCard label="Deactivated" value={stats.deactivated} variant="deactivated" />
        <StatCard label="Total Records" value={stats.total} />
      </div>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-foreground">Recent Activity</h2>
          <a href="/logs" className="text-xs font-medium text-status-info hover:underline">View all</a>
        </div>
        <AuditLogTable logs={logs} />
      </section>
    </div>
  );
}
