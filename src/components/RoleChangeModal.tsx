import { useState } from 'react';
import { iamService, type IAMUser, type Role, type Department } from '@/lib/iamMock';

const ROLES: Role[] = ['Engineer', 'Manager', 'Designer', 'Admin', 'Analyst', 'DevOps'];
const DEPARTMENTS: Department[] = ['Engineering', 'Design', 'Product', 'Operations', 'HR', 'Finance'];

interface RoleChangeModalProps {
  user: IAMUser;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RoleChangeModal({ user, onClose, onSuccess }: RoleChangeModalProps) {
  const [role, setRole] = useState<Role>(user.role);
  const [dept, setDept] = useState<Department>(user.department);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await iamService.updateRole(user.id, role, dept);
      onSuccess();
      onClose();
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const inputClass = "w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring text-foreground";
  const labelClass = "block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1";

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 bg-foreground/20">
      <div className="bg-card rounded-lg shadow-elevated border border-border w-full max-w-md p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-foreground">Role Change — {user.name}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-lg">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>New Role</label>
            <select value={role} onChange={e => setRole(e.target.value as Role)} className={inputClass}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>New Department</label>
            <select value={dept} onChange={e => setDept(e.target.value as Department)} className={inputClass}>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50">
              {loading ? 'Processing...' : 'Submit Mover Request'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
