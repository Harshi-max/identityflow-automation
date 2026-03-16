import { useState } from 'react';
import { iamService, type Role, type Department } from '@/lib/iamMock';

const ROLES: Role[] = ['Engineer', 'Manager', 'Designer', 'Admin', 'Analyst', 'DevOps'];
const DEPARTMENTS: Department[] = ['Engineering', 'Design', 'Product', 'Operations', 'HR', 'Finance'];

interface OnboardFormProps {
  onSuccess: () => void;
}

export default function OnboardForm({ onSuccess }: OnboardFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Engineer');
  const [dept, setDept] = useState<Department>('Engineering');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    try {
      await iamService.createUser({ name, email, role, department: dept });
      setResult(`Joiner request created for ${name}. Pending approval.`);
      setName(''); setEmail(''); setRole('Engineer'); setDept('Engineering');
      onSuccess();
    } catch {
      setResult('Error creating user.');
    }
    setLoading(false);
  };

  const inputClass = "w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring text-foreground";
  const labelClass = "block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1";

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-subtle border border-border/50 p-5 space-y-4">
      <h3 className="font-semibold text-foreground">New Employee Onboarding</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Role</label>
          <select value={role} onChange={e => setRole(e.target.value as Role)} className={inputClass}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Department</label>
          <select value={dept} onChange={e => setDept(e.target.value as Department)} className={inputClass}>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Processing...' : 'Submit Joiner Request'}
        </button>
        {result && <span className="text-xs text-status-active">{result}</span>}
      </div>
    </form>
  );
}
