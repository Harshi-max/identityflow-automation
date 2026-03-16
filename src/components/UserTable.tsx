import type { IAMUser } from '@/lib/iamMock';

const STATUS_STYLES = {
  active: 'bg-status-active/10 text-status-active',
  pending: 'bg-status-pending/10 text-status-pending',
  deactivated: 'bg-destructive/10 text-destructive',
};

interface UserTableProps {
  users: IAMUser[];
  onAction?: (user: IAMUser, action: 'mover' | 'leaver') => void;
}

export default function UserTable({ users, onAction }: UserTableProps) {
  return (
    <div className="bg-card rounded-lg shadow-subtle border border-border/50 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/30">
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Name</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Email</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Role</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Department</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Status</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Systems</th>
            {onAction && <th className="text-right px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-secondary/20 transition-colors">
              <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{user.email}</td>
              <td className="px-4 py-3 text-foreground">{user.role}</td>
              <td className="px-4 py-3 text-muted-foreground">{user.department}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{user.systems.length > 0 ? user.systems.length : '—'}</td>
              {onAction && (
                <td className="px-4 py-3 text-right space-x-2">
                  {user.status === 'active' && (
                    <>
                      <button onClick={() => onAction(user, 'mover')} className="text-xs font-medium text-status-info hover:underline">Change Role</button>
                      <button onClick={() => onAction(user, 'leaver')} className="text-xs font-medium text-destructive hover:underline">Deactivate</button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="px-4 py-8 text-center text-muted-foreground text-sm">No employees found.</div>
      )}
    </div>
  );
}
