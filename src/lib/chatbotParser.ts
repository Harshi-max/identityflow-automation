import { iamService, type Role, type Department } from './iamMock';

const ROLES: Role[] = ['Engineer', 'Manager', 'Designer', 'Admin', 'Analyst', 'DevOps'];
const DEPARTMENTS: Department[] = ['Engineering', 'Design', 'Product', 'Operations', 'HR', 'Finance'];

function findMatch(input: string, list: string[]): string | undefined {
  return list.find(item => input.toLowerCase().includes(item.toLowerCase()));
}

function extractName(input: string, keywords: string[]): string | undefined {
  let cleaned = input;
  for (const kw of keywords) cleaned = cleaned.replace(new RegExp(kw, 'gi'), '');
  for (const r of ROLES) cleaned = cleaned.replace(new RegExp(`\\b${r}\\b`, 'gi'), '');
  for (const d of DEPARTMENTS) cleaned = cleaned.replace(new RegExp(`\\b${d}\\b`, 'gi'), '');
  cleaned = cleaned.replace(/\b(as|in|to|the|a|an|new|employee|user|for|of)\b/gi, '');
  const words = cleaned.trim().split(/\s+/).filter(w => w.length > 1);
  if (words.length >= 2) return words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  return undefined;
}

export interface ChatResponse {
  text: string;
  action?: string;
}

export async function processCommand(input: string): Promise<ChatResponse> {
  const lower = input.toLowerCase().trim();

  // Help
  if (lower === 'help' || lower === '?') {
    return { text: 'Available commands:\n• **onboard [name] [role]** — Start joiner workflow\n• **change role [name] to [role]** — Initiate mover\n• **deactivate [name]** — Start leaver workflow\n• **list users** — Show all employees\n• **list approvals** — Show pending requests\n• **stats** — Dashboard stats' };
  }

  // Stats
  if (lower.includes('stats') || lower.includes('dashboard') || lower.includes('overview')) {
    const stats = await iamService.getStats();
    return { text: `**System Status**\n• Active: ${stats.active}\n• Pending Approvals: ${stats.pending}\n• Deactivated: ${stats.deactivated}\n• Total: ${stats.total}`, action: 'STATS' };
  }

  // List users
  if (lower.includes('list') && (lower.includes('user') || lower.includes('employee'))) {
    const users = await iamService.getUsers();
    const active = users.filter(u => u.status === 'active');
    const lines = active.map(u => `• **${u.name}** — ${u.role}, ${u.department}`).join('\n');
    return { text: `**Active Employees (${active.length})**\n${lines}`, action: 'LIST_USERS' };
  }

  // List approvals
  if (lower.includes('list') && lower.includes('approval')) {
    const apps = await iamService.getApprovals();
    const pending = apps.filter(a => a.status === 'pending');
    if (pending.length === 0) return { text: 'No pending approvals.' };
    const lines = pending.map(a => `• **${a.targetUser}** — ${a.type.toUpperCase()}: ${a.details}`).join('\n');
    return { text: `**Pending Approvals (${pending.length})**\n${lines}`, action: 'LIST_APPROVALS' };
  }

  // Onboard
  if (lower.includes('onboard') || (lower.includes('add') && (lower.includes('user') || lower.includes('employee'))) || lower.includes('joiner')) {
    const name = extractName(input, ['onboard', 'add', 'joiner', 'create', 'hire']);
    const role = findMatch(input, ROLES) as Role || 'Engineer';
    const dept = findMatch(input, DEPARTMENTS) as Department || 'Engineering';
    if (!name) return { text: 'Please specify a name. Example: **onboard John Smith Engineer**' };
    const email = `${name.toLowerCase().replace(/\s/g, '.')}@company.com`;
    const result = await iamService.createUser({ name, email, role, department: dept });
    return { text: `✓ Joiner request created for **${name}**\n• Role: ${role}\n• Department: ${dept}\n• Email: ${email}\n• Status: **Pending Approval** (ID: ${result.approval.id.slice(0, 6)})`, action: 'JOINER_REQUESTED' };
  }

  // Role change
  if (lower.includes('change') || lower.includes('move') || lower.includes('mover') || lower.includes('update role')) {
    const role = findMatch(input, ROLES) as Role;
    if (!role) return { text: 'Please specify a target role. Example: **change role Alice to Manager**' };
    const name = extractName(input, ['change', 'role', 'move', 'mover', 'update']);
    if (!name) return { text: 'Please specify a user name. Example: **change role Alice to Manager**' };
    const users = await iamService.getUsers();
    const user = users.find(u => u.name.toLowerCase().includes(name.toLowerCase()) && u.status === 'active');
    if (!user) return { text: `No active user found matching "${name}".` };
    const approval = await iamService.updateRole(user.id, role);
    return { text: `✓ Mover request created for **${user.name}**\n• ${approval.details}\n• Status: **Pending Approval**`, action: 'MOVER_REQUESTED' };
  }

  // Deactivate
  if (lower.includes('deactivate') || lower.includes('remove') || lower.includes('leaver') || lower.includes('offboard') || lower.includes('disable')) {
    const name = extractName(input, ['deactivate', 'remove', 'leaver', 'offboard', 'disable', 'access']);
    if (!name) return { text: 'Please specify a user name. Example: **deactivate Bob**' };
    const users = await iamService.getUsers();
    const user = users.find(u => u.name.toLowerCase().includes(name.toLowerCase()) && u.status !== 'deactivated');
    if (!user) return { text: `No active user found matching "${name}".` };
    const approval = await iamService.deactivateUser(user.id);
    return { text: `✓ Leaver request created for **${user.name}**\n• ${approval.details}\n• Status: **Pending Approval**`, action: 'LEAVER_REQUESTED' };
  }

  return { text: 'Unknown command. Type **help** for available commands.' };
}
