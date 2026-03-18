import { UserRole } from '@/models/types'

export const PERMISSIONS = {
  APPROVE_REQUESTS: 'approve_requests',
  MANAGE_USERS: 'manage_users',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  MANAGE_ACCESS_REVIEWS: 'manage_access_reviews',
  VIEW_ANALYTICS: 'view_analytics',
} as const

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  Employee: [],
  Manager: [
    PERMISSIONS.APPROVE_REQUESTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_USERS,
  ],
  Admin: [
    PERMISSIONS.APPROVE_REQUESTS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.MANAGE_ACCESS_REVIEWS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  HR: [
    PERMISSIONS.APPROVE_REQUESTS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.MANAGE_ACCESS_REVIEWS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
}

export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false
}

export const canApproveRequests = (userRole: UserRole): boolean => {
  return hasPermission(userRole, PERMISSIONS.APPROVE_REQUESTS)
}

export const canManageUsers = (userRole: UserRole): boolean => {
  return hasPermission(userRole, PERMISSIONS.MANAGE_USERS)
}