import { mockIAM } from './mockIAM'
import { workflowEngine } from './workflowEngine'
import { Employee, Request } from '@/models/types'

export const dataStore = {
  getEmployees(): Employee[] {
    return mockIAM.getEmployees()
  },

  getPendingRequests(): Request[] {
    return workflowEngine.getPendingRequests()
  },

  getAllRequests(): Request[] {
    return workflowEngine.getRequests()
  },

  findEmployee(query: string): Employee | undefined {
    const normalized = query.trim().toLowerCase()
    return mockIAM
      .getEmployees()
      .find(
        e =>
          e.id === normalized ||
          e.email.toLowerCase() === normalized ||
          e.name.toLowerCase() === normalized
      )
  },
}
