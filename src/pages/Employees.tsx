import { useState, useEffect, useCallback } from 'react';
import { iamService, type IAMUser } from '@/lib/iamMock';
import UserTable from '@/components/UserTable';
import OnboardForm from '@/components/OnboardForm';
import RoleChangeModal from '@/components/RoleChangeModal';

export default function Employees() {
  const [users, setUsers] = useState<IAMUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IAMUser | null>(null);
  const [confirmDeactivate, setConfirmDeactivate] = useState<IAMUser | null>(null);

  const load = useCallback(async () => {
    setUsers(await iamService.getUsers());
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAction = (user: IAMUser, action: 'mover' | 'leaver') => {
    if (action === 'mover') setSelectedUser(user);
    else setConfirmDeactivate(user);
  };

  const handleDeactivate = async () => {
    if (!confirmDeactivate) return;
    await iamService.deactivateUser(confirmDeactivate.id);
    setConfirmDeactivate(null);
    load();
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Employees</h1>
        <p className="text-sm text-muted-foreground">Manage identity lifecycle for all employees.</p>
      </header>

      <OnboardForm onSuccess={load} />
      <UserTable users={users} onAction={handleAction} />

      {selectedUser && (
        <RoleChangeModal user={selectedUser} onClose={() => setSelectedUser(null)} onSuccess={load} />
      )}

      {confirmDeactivate && (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 bg-foreground/20">
          <div className="bg-card rounded-lg shadow-elevated border border-border w-full max-w-sm p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Confirm Deactivation</h3>
            <p className="text-sm text-muted-foreground">
              Deactivate <strong>{confirmDeactivate.name}</strong>? This will create a leaver request pending approval.
            </p>
            <div className="flex gap-2">
              <button onClick={handleDeactivate} className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground rounded-md hover:opacity-90">
                Deactivate
              </button>
              <button onClick={() => setConfirmDeactivate(null)} className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
