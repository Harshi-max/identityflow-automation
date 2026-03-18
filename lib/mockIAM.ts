import { Employee, AuditLog, UserRole } from '@/models/types'

let employees: Employee[] = [
  {
    id: 'emp-1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    role: 'Employee',
    jobTitle: 'Senior Software Engineer',
    manager: 'Sarah Johnson',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 'emp-2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Manager',
    jobTitle: 'Engineering Manager',
    manager: 'Michael Chen',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: 'emp-3',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Engineering',
    role: 'Admin',
    jobTitle: 'VP of Engineering',
    manager: 'CEO',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 50),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 'emp-4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Marketing',
    role: 'Manager',
    jobTitle: 'Marketing Manager',
    manager: 'Robert Wilson',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: 'emp-5',
    name: 'Robert Wilson',
    email: 'robert.wilson@company.com',
    department: 'Marketing',
    role: 'Admin',
    jobTitle: 'CMO',
    manager: 'CEO',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: 'emp-6',
    name: 'Lisa Brown',
    email: 'lisa.brown@company.com',
    department: 'HR',
    role: 'Employee',
    jobTitle: 'HR Specialist',
    manager: 'David Miller',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'emp-7',
    name: 'David Miller',
    email: 'david.miller@company.com',
    department: 'HR',
    role: 'Manager',
    jobTitle: 'HR Director',
    manager: 'CEO',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: 'emp-8',
    name: 'James Taylor',
    email: 'james.taylor@company.com',
    department: 'Finance',
    role: 'Employee',
    jobTitle: 'Financial Analyst',
    manager: 'VP Finance',
    status: 'inactive',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
]

let auditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    actor: 'system',
    action: 'JOINER_PROVISIONED',
    targetUser: 'eva_novak',
    result: 'All systems provisioned',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    actor: 'system',
    action: 'MOVER_ROLE_CHANGE',
    targetUser: 'carol_davis',
    result: 'Role: Intern → Designer',
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    actor: 'system',
    action: 'LEAVER_DEACTIVATED',
    targetUser: 'david_kim',
    result: 'All access revoked',
  },
]

export const mockIAM = {
  async createUser(employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay

    const newEmployee: Employee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
      status: employee.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    employees.push(newEmployee)

    // Log action
    auditLogs.push({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      actor: 'system',
      action: 'createUser',
      targetUser: employee.email,
      result: 'success',
    })

    return newEmployee
  },

  async assignRole(employeeId: string, role: UserRole): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const employee = employees.find(e => e.id === employeeId)
    if (employee) {
      employee.role = role
      employee.updatedAt = new Date()

      auditLogs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        actor: 'system',
        action: 'assignRole',
        targetUser: employee.email,
        result: `role changed to ${role}`,
      })
    }
  },

  async revokeAccess(employeeId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const employee = employees.find(e => e.id === employeeId)
    if (employee) {
      employee.status = 'inactive'
      employee.updatedAt = new Date()

      auditLogs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        actor: 'system',
        action: 'revokeAccess',
        targetUser: employee.email,
        result: 'access revoked',
      })
    }
  },

  async disableAccount(employeeId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const employee = employees.find(e => e.id === employeeId)
    if (employee) {
      employee.status = 'inactive'
      employee.updatedAt = new Date()

      auditLogs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        actor: 'system',
        action: 'disableAccount',
        targetUser: employee.email,
        result: 'account disabled',
      })
    }
  },

  async provisionEmail(employeeId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const employee = employees.find(e => e.id === employeeId)
    if (employee) {
      auditLogs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        actor: 'system',
        action: 'provisionEmail',
        targetUser: employee.email,
        result: 'email provisioned',
      })
    }
  },

  getEmployees(): Employee[] {
    return employees
  },

  getAuditLogs(): AuditLog[] {
    return auditLogs
  },

  addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): void {
    auditLogs.push({
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    })
  },
}