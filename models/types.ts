export type UserRole = 'Employee' | 'Manager' | 'Admin' | 'HR'

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  role: UserRole
  jobTitle?: string
  manager: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  permissions: string[]
  password?: string
  isVerified?: boolean
}

export interface Request {
  id: string
  type: 'onboard' | 'move' | 'leaver' | 'access'
  employeeId: string
  employee: Employee
  status: 'pending' | 'approved' | 'rejected'
  approver: string
  details: any
  createdAt: Date
  updatedAt: Date
}

export interface AuditLog {
  id: string
  timestamp: Date
  actor: string
  action: string
  targetUser: string
  result: string
}

export interface AccessRequest {
  id: string
  employeeId: string
  resource: string
  duration?: number // in days
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  approvedAt?: Date
  expiresAt?: Date
}

export interface SecurityAlert {
  id: string
  type: 'orphaned_account' | 'privilege_escalation' | 'dormant_account' | 'role_changes'
  severity: 'low' | 'medium' | 'high'
  title: string
  description: string
  userId: string
  userEmail: string
  timestamp: Date
  resolved: boolean
}

export interface AccessReviewCampaign {
  id: string
  name: string
  description: string
  managerId: string
  managerName: string
  department: string
  status: 'active' | 'completed' | 'overdue'
  dueDate: Date
  createdAt: Date
  reviews: AccessReview[]
}

export interface AccessReview {
  id: string
  campaignId: string
  employeeId: string
  employeeName: string
  employeeEmail: string
  currentRole: string
  permissions: string[]
  status: 'pending' | 'approved' | 'revoked'
  reviewedBy?: string
  reviewedAt?: Date
  comments?: string
}