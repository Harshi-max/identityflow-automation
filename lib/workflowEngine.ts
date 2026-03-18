import { Request, Employee, UserRole } from '@/models/types'
import { mockIAM } from './mockIAM'
import { canApproveRequests } from './permissions'

const STORAGE_KEY = 'identityflow_requests'

function normalizeRequest(request: any): Request {
  return {
    ...request,
    createdAt: new Date(request.createdAt),
    updatedAt: new Date(request.updatedAt),
  }
}

function loadRequests(): Request[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeRequest)
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

function saveRequests(requests: Request[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
}

export const workflowEngine = {
  async submitRequest(
    type: Request['type'],
    employeeData: any,
    actor: string,
    employeeId: string = ''
  ): Promise<Request> {
    const current = loadRequests()

    let employee = employeeData as Employee
    if (type !== 'onboard' && employeeId) {
      const found = mockIAM.getEmployees().find(e => e.id === employeeId)
      if (found) {
        employee = found
      }
    }

    const request: Request = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      employeeId,
      employee,
      status: 'pending',
      approver: '', // Will be set based on role
      details: employeeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updated = [...current, request]
    saveRequests(updated)

    mockIAM.addAuditLog({
      actor,
      action: `submit ${type} request`,
      targetUser: employeeData.email || employeeData.name,
      result: 'request submitted',
    })

    return request
  },

  async processOnboarding(
    employeeData: { name: string; email: string; department: string; jobTitle?: string; role: string },
    actorId: string,
    actorName: string
  ) {
    const request = await this.submitRequest('onboard', employeeData, actorId)
    return {
      success: true,
      message: 'Onboarding request submitted',
      data: { request }
    }
  },

  async processMove(
    payload: { employeeId: string; toRole?: string; toDepartment?: string },
    actorId: string,
    actorName: string
  ) {
    const request = await this.submitRequest('move', payload, actorId, payload.employeeId)
    return {
      success: true,
      message: 'Move request submitted',
      data: { request }
    }
  },

  async processLeaver(
    payload: { employeeId: string },
    actorId: string,
    actorName: string
  ) {
    const request = await this.submitRequest('leaver', payload, actorId, payload.employeeId)
    return {
      success: true,
      message: 'Leaver request submitted',
      data: { request }
    }
  },

  async processAccessRequest(
    payload: { employeeId: string; system: string; role: string; justification: string },
    actorId: string,
    actorName: string
  ) {
    const request = await this.submitRequest('access', payload, actorId, payload.employeeId)
    return {
      success: true,
      message: 'Access request submitted',
      data: { request }
    }
  },

  async approveRequest(requestId: string, approverId: string, approverRole: UserRole): Promise<{ success: boolean; message: string }> {
    // Check permissions
    if (!canApproveRequests(approverRole)) {
      return {
        success: false,
        message: 'You do not have permission to approve requests. Only Managers, Admins, and HR can approve requests.'
      }
    }

    const current = loadRequests()
    const request = current.find(r => r.id === requestId)
    if (!request) {
      return { success: false, message: 'Request not found' }
    }

    request.status = 'approved'
    request.approver = approverId
    request.updatedAt = new Date()

    // Process the request based on type
    if (request.type === 'onboard') {
      const employee = await mockIAM.createUser(request.details)
      request.employeeId = employee.id
      await mockIAM.assignRole(employee.id, request.details.role)
      await mockIAM.provisionEmail(employee.id)
    } else if (request.type === 'move') {
      await mockIAM.assignRole(request.employeeId, request.details.newRole)
    } else if (request.type === 'leaver') {
      await mockIAM.revokeAccess(request.employeeId)
      await mockIAM.disableAccount(request.employeeId)
    }

    mockIAM.addAuditLog({
      actor: approverId,
      action: `approve ${request.type} request`,
      targetUser: request.employee.email,
      result: 'request approved',
    })

    saveRequests(current)
    return { success: true, message: 'Request approved successfully' }
  },

  async rejectRequest(requestId: string, approverId: string, approverRole: UserRole): Promise<{ success: boolean; message: string }> {
    // Check permissions
    if (!canApproveRequests(approverRole)) {
      return {
        success: false,
        message: 'You do not have permission to reject requests. Only Managers, Admins, and HR can reject requests.'
      }
    }

    const current = loadRequests()
    const request = current.find(r => r.id === requestId)
    if (!request) {
      return { success: false, message: 'Request not found' }
    }

    request.status = 'rejected'
    request.approver = approverId
    request.updatedAt = new Date()

    mockIAM.addAuditLog({
      actor: approverId,
      action: `reject ${request.type} request`,
      targetUser: request.employee.email,
      result: 'request rejected',
    })

    saveRequests(current)
    return { success: true, message: 'Request rejected successfully' }
  },

  getRequests(): Request[] {
    return loadRequests()
  },

  getPendingRequests(): Request[] {
    return loadRequests().filter(r => r.status === 'pending')
  },
}