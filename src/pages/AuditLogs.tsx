import { useState, useEffect, useCallback } from 'react';
import { iamService, type AuditLog } from '@/lib/iamMock';
import AuditLogTable from '@/components/AuditLogTable';

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const load = useCallback(async () => {
    setLogs(await iamService.getLogs());
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">Immutable record of all identity lifecycle actions.</p>
      </header>
      <AuditLogTable logs={logs} />
    </div>
  );
}
