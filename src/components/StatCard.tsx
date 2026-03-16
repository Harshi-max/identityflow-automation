interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  variant?: 'default' | 'active' | 'pending' | 'deactivated';
}

export default function StatCard({ label, value, delta, variant = 'default' }: StatCardProps) {
  const deltaColor = {
    default: 'text-status-active',
    active: 'text-status-active',
    pending: 'text-status-pending',
    deactivated: 'text-destructive',
  }[variant];

  return (
    <div className="bg-card p-5 rounded-lg shadow-subtle border border-border/50">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2 mt-1.5">
        <span className="text-2xl font-bold tabular-nums text-foreground">{value}</span>
        {delta && <span className={`text-xs font-medium ${deltaColor}`}>{delta}</span>}
      </div>
    </div>
  );
}
