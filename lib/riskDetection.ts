import { Employee, AuditLog } from '@/models/types'

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

export const riskDetectionEngine = {
  detectRisks(employees: Employee[], auditLogs: AuditLog[]): SecurityAlert[] {
    const alerts: SecurityAlert[] = []

    // Orphaned accounts: inactive employee with active account
    employees.forEach(employee => {
      if (employee.status === 'inactive') {
        alerts.push({
          id: Math.random().toString(36).substr(2, 9),
          type: 'orphaned_account',
          severity: 'high',
          title: 'Orphaned Account Detected',
          description: `Employee ${employee.name} is inactive but account is still active`,
          userId: employee.id,
          userEmail: employee.email,
          timestamp: new Date(),
          resolved: false,
        })
      }
    })

    // Dormant accounts: no activity for 90 days (simulated)
    employees.forEach(employee => {
      const daysSinceUpdate = Math.floor((Date.now() - employee.updatedAt.getTime()) / (1000 * 60 * 60 * 24))
      if (daysSinceUpdate > 90 && employee.status === 'active') {
        alerts.push({
          id: Math.random().toString(36).substr(2, 9),
          type: 'dormant_account',
          severity: 'medium',
          title: 'Dormant Account Detected',
          description: `User ${employee.name} has not been active for ${daysSinceUpdate} days`,
          userId: employee.id,
          userEmail: employee.email,
          timestamp: new Date(),
          resolved: false,
        })
      }
    })

    // Privilege escalation: recent admin role assignment
    const recentAdminAssignments = auditLogs.filter(log =>
      log.action.includes('assignRole') &&
      log.result.includes('Admin') &&
      (Date.now() - log.timestamp.getTime()) < (7 * 24 * 60 * 60 * 1000) // Last 7 days
    )

    recentAdminAssignments.forEach(log => {
      alerts.push({
        id: Math.random().toString(36).substr(2, 9),
        type: 'privilege_escalation',
        severity: 'high',
        title: 'Privileged Access Assigned',
        description: `User ${log.targetUser} was granted Admin role`,
        userId: '', // Would need to map from email
        userEmail: log.targetUser,
        timestamp: log.timestamp,
        resolved: false,
      })
    })

    // Too many role changes: more than 3 changes in 30 days
    const roleChangeCounts: Record<string, number> = {}
    auditLogs.filter(log =>
      log.action.includes('assignRole') &&
      (Date.now() - log.timestamp.getTime()) < (30 * 24 * 60 * 60 * 1000) // Last 30 days
    ).forEach(log => {
      roleChangeCounts[log.targetUser] = (roleChangeCounts[log.targetUser] || 0) + 1
    })

    Object.entries(roleChangeCounts).forEach(([email, count]) => {
      if (count > 3) {
        alerts.push({
          id: Math.random().toString(36).substr(2, 9),
          type: 'role_changes',
          severity: 'medium',
          title: 'Multiple Role Changes Detected',
          description: `User ${email} has ${count} role changes in the last 30 days`,
          userId: '',
          userEmail: email,
          timestamp: new Date(),
          resolved: false,
        })
      }
    })

    return alerts
  },

  resolveAlert(alertId: string): void {
    // In a real system, this would update the alert status
    console.log(`Alert ${alertId} resolved`)
  },
}