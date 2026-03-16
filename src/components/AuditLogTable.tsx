import type { AuditLog } from '@/lib/iamMock';

const ACTION_COLORS: Record<string, string> = {
  JOINER_REQUESTED: 'bg-status-info',
  JOINER_PROVISIONED: 'bg-status-active',
  JOINER_REJECTED: 'bg-destructive',
  MOVER_REQUESTED: 'bg-status-pending',
  MOVER_ROLE_CHANGE: 'bg-status-info',
  MOVER_REJECTED: 'bg-destructive',
  LEAVER_REQUESTED: 'bg-status-pending',
  LEAVER_DEACTIVATED: 'bg-destructive',
  LEAVER_REJECTED: 'bg-destructive',
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

interface AuditLogTableProps {
  logs: AuditLog[];
}

export default function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="bg-card rounded-lg shadow-subtle border border-border/50 overflow-hidden">
      <div className="divide-y divide-border/50">
        {logs.map(log => (
          <div key={log.id} className="px-4 py-3 flex justify-between text-sm items-center hover:bg-secondary/20 transition-colors">
            <div className="flex gap-3 items-center min-w-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${ACTION_COLORS[log.action] || 'bg-muted-foreground'}`} />
              <span className="font-medium font-mono text-xs text-foreground">{log.action}</span>
              <span className="text-muted-foreground font-mono text-xs truncate">
                target: {log.target.toLowerCase().replace(/\s/g, '_')}
              </span>
              {log.details && (
                <span className="text-muted-foreground text-xs truncate hidden md:inline">— {log.details}</span>
              )}
            </div>
            <span className="text-muted-foreground tabular-nums text-xs shrink-0 ml-4">{timeAgo(log.timestamp)}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="px-4 py-8 text-center text-muted-foreground text-sm">No audit logs.</div>
        )}
      </div>
    </div>
  );
}
