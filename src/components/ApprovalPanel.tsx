import type { ApprovalRequest } from '@/lib/iamMock';

const TYPE_LABELS = { joiner: 'JOINER', mover: 'MOVER', leaver: 'LEAVER' };
const TYPE_COLORS = {
  joiner: 'bg-status-info/10 text-status-info',
  mover: 'bg-status-pending/10 text-status-pending',
  leaver: 'bg-destructive/10 text-destructive',
};
const STATUS_COLORS = {
  pending: 'bg-status-pending/10 text-status-pending',
  approved: 'bg-status-active/10 text-status-active',
  rejected: 'bg-destructive/10 text-destructive',
};

interface ApprovalPanelProps {
  approvals: ApprovalRequest[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  loading?: string | null;
}

export default function ApprovalPanel({ approvals, onApprove, onReject, loading }: ApprovalPanelProps) {
  if (approvals.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-subtle border border-border/50 px-4 py-8 text-center text-muted-foreground text-sm">
        No approval requests.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {approvals.map(req => (
        <div key={req.id} className="bg-card rounded-lg shadow-subtle border border-border/50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${TYPE_COLORS[req.type]}`}>
                  {TYPE_LABELS[req.type]}
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[req.status]}`}>
                  {req.status}
                </span>
              </div>
              <p className="font-medium text-sm text-foreground">{req.targetUser}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{req.details}</p>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                {new Date(req.createdAt).toLocaleString()}
              </p>
            </div>
            {req.status === 'pending' && onApprove && onReject && (
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onApprove(req.id)}
                  disabled={loading === req.id}
                  className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading === req.id ? '...' : 'Approve'}
                </button>
                <button
                  onClick={() => onReject(req.id)}
                  disabled={loading === req.id}
                  className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
