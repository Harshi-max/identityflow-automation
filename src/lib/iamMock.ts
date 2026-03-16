export type UserStatus = 'active' | 'pending' | 'deactivated';
export type Role = 'Engineer' | 'Manager' | 'Designer' | 'Admin' | 'Analyst' | 'DevOps';
export type Department = 'Engineering' | 'Design' | 'Product' | 'Operations' | 'HR' | 'Finance';

export interface IAMUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: Department;
  status: UserStatus;
  createdAt: string;
  systems: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  target: string;
  status: 'success' | 'failed';
  details?: string;
}

export interface ApprovalRequest {
  id: string;
  type: 'joiner' | 'mover' | 'leaver';
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  targetUser: string;
  details: string;
  createdAt: string;
  resolvedAt?: string;
  data?: Record<string, string>;
}

const genId = () => Math.random().toString(36).substr(2, 9);
const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

const SYSTEMS = ['Email', 'Git', 'HR Portal', 'Cloud Console', 'Slack'];

let users: IAMUser[] = [
  { id: genId(), name: 'Alice Chen', email: 'alice@company.com', role: 'Engineer', department: 'Engineering', status: 'active', createdAt: '2025-01-15T09:00:00Z', systems: [...SYSTEMS] },
  { id: genId(), name: 'Bob Martinez', email: 'bob@company.com', role: 'Manager', department: 'Product', status: 'active', createdAt: '2024-11-03T10:00:00Z', systems: [...SYSTEMS] },
  { id: genId(), name: 'Carol Davis', email: 'carol@company.com', role: 'Designer', department: 'Design', status: 'active', createdAt: '2025-02-20T08:30:00Z', systems: [...SYSTEMS] },
  { id: genId(), name: 'David Kim', email: 'david@company.com', role: 'Analyst', department: 'Finance', status: 'deactivated', createdAt: '2024-06-10T11:00:00Z', systems: [] },
  { id: genId(), name: 'Eva Novak', email: 'eva@company.com', role: 'DevOps', department: 'Engineering', status: 'active', createdAt: '2025-03-01T07:45:00Z', systems: [...SYSTEMS] },
];

let logs: AuditLog[] = [
  { id: genId(), timestamp: '2026-03-16T08:12:00Z', action: 'JOINER_PROVISIONED', actor: 'System', target: 'Eva Novak', status: 'success', details: 'All systems provisioned' },
  { id: genId(), timestamp: '2026-03-15T14:30:00Z', action: 'MOVER_ROLE_CHANGE', actor: 'Admin', target: 'Carol Davis', status: 'success', details: 'Role: Intern → Designer' },
  { id: genId(), timestamp: '2026-03-14T09:00:00Z', action: 'LEAVER_DEACTIVATED', actor: 'Admin', target: 'David Kim', status: 'success', details: 'All access revoked' },
];

let approvals: ApprovalRequest[] = [];

export const iamService = {
  // Users
  getUsers: async () => { await delay(200); return [...users]; },

  createUser: async (data: { name: string; email: string; role: Role; department: Department }) => {
    await delay(600);
    const user: IAMUser = { ...data, id: genId(), status: 'pending', createdAt: new Date().toISOString(), systems: [] };
    users.push(user);

    const approval: ApprovalRequest = {
      id: genId(), type: 'joiner', status: 'pending', requestedBy: 'System',
      targetUser: user.name, details: `Onboard ${user.name} as ${user.role} in ${user.department}`,
      createdAt: new Date().toISOString(), data: { userId: user.id },
    };
    approvals.push(approval);

    iamService.log('JOINER_REQUESTED', 'System', user.name, 'Pending approval');
    return { user, approval };
  },

  updateRole: async (id: string, newRole: Role, newDept?: Department) => {
    await delay(500);
    const user = users.find(u => u.id === id);
    if (!user || user.status !== 'active') throw new Error('User not found or inactive');

    const oldRole = user.role;
    const approval: ApprovalRequest = {
      id: genId(), type: 'mover', status: 'pending', requestedBy: 'Admin',
      targetUser: user.name, details: `Change role: ${oldRole} → ${newRole}${newDept ? `, Dept: ${newDept}` : ''}`,
      createdAt: new Date().toISOString(), data: { userId: id, newRole, newDept: newDept || user.department },
    };
    approvals.push(approval);

    iamService.log('MOVER_REQUESTED', 'Admin', user.name, `Role change: ${oldRole} → ${newRole}`);
    return approval;
  },

  deactivateUser: async (id: string) => {
    await delay(500);
    const user = users.find(u => u.id === id);
    if (!user || user.status === 'deactivated') throw new Error('User not found or already deactivated');

    const approval: ApprovalRequest = {
      id: genId(), type: 'leaver', status: 'pending', requestedBy: 'Admin',
      targetUser: user.name, details: `Deactivate ${user.name} and revoke all access`,
      createdAt: new Date().toISOString(), data: { userId: id },
    };
    approvals.push(approval);

    iamService.log('LEAVER_REQUESTED', 'Admin', user.name, 'Pending approval');
    return approval;
  },

  // Approvals
  getApprovals: async () => { await delay(200); return [...approvals].reverse(); },

  approveRequest: async (approvalId: string) => {
    await delay(600);
    const req = approvals.find(a => a.id === approvalId);
    if (!req || req.status !== 'pending') throw new Error('Request not found or already resolved');

    req.status = 'approved';
    req.resolvedAt = new Date().toISOString();

    if (req.type === 'joiner' && req.data?.userId) {
      const user = users.find(u => u.id === req.data!.userId);
      if (user) { user.status = 'active'; user.systems = [...SYSTEMS]; }
      iamService.log('JOINER_PROVISIONED', 'Manager', req.targetUser, 'All systems provisioned');
    } else if (req.type === 'mover' && req.data?.userId) {
      const user = users.find(u => u.id === req.data!.userId);
      if (user) {
        user.role = (req.data!.newRole as Role) || user.role;
        user.department = (req.data!.newDept as Department) || user.department;
      }
      iamService.log('MOVER_ROLE_CHANGE', 'Manager', req.targetUser, req.details);
    } else if (req.type === 'leaver' && req.data?.userId) {
      const user = users.find(u => u.id === req.data!.userId);
      if (user) { user.status = 'deactivated'; user.systems = []; }
      iamService.log('LEAVER_DEACTIVATED', 'Manager', req.targetUser, 'All access revoked');
    }

    return req;
  },

  rejectRequest: async (approvalId: string) => {
    await delay(400);
    const req = approvals.find(a => a.id === approvalId);
    if (!req || req.status !== 'pending') throw new Error('Request not found');
    req.status = 'rejected';
    req.resolvedAt = new Date().toISOString();
    iamService.log(`${req.type.toUpperCase()}_REJECTED`, 'Manager', req.targetUser, 'Request denied');
    return req;
  },

  // Logs
  getLogs: async () => { await delay(200); return [...logs]; },

  log: (action: string, actor: string, target: string, details?: string) => {
    logs.unshift({ id: genId(), timestamp: new Date().toISOString(), action, actor, target, status: 'success', details });
  },

  // Stats
  getStats: async () => {
    await delay(200);
    const active = users.filter(u => u.status === 'active').length;
    const pending = approvals.filter(a => a.status === 'pending').length;
    const deactivated = users.filter(u => u.status === 'deactivated').length;
    return { active, pending, deactivated, total: users.length };
  },
};
