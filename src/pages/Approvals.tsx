import { useState, useEffect, useCallback } from 'react';
import { iamService, type ApprovalRequest } from '@/lib/iamMock';
import ApprovalPanel from '@/components/ApprovalPanel';

export default function Approvals() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const load = useCallback(async () => {
    setApprovals(await iamService.getApprovals());
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleApprove = async (id: string) => {
    setLoading(id);
    await iamService.approveRequest(id);
    await load();
    setLoading(null);
  };

  const handleReject = async (id: string) => {
    setLoading(id);
    await iamService.rejectRequest(id);
    await load();
    setLoading(null);
  };

  const filtered = filter === 'all' ? approvals : approvals.filter(a => a.status === filter);
  const pending = approvals.filter(a => a.status === 'pending').length;

  const tabClass = (v: string) =>
    `px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
      filter === v ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Approval Queue {pending > 0 && <span className="text-status-pending text-lg">({pending})</span>}
        </h1>
        <p className="text-sm text-muted-foreground">Review and action JML workflow requests.</p>
      </header>

      <div className="flex gap-1">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(v => (
          <button key={v} onClick={() => setFilter(v)} className={tabClass(v)}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <ApprovalPanel approvals={filtered} onApprove={handleApprove} onReject={handleReject} loading={loading} />
    </div>
  );
}
