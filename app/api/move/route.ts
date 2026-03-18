import { NextRequest, NextResponse } from 'next/server'
import { workflowEngine } from '@/lib/workflowEngine'
import { mockIAM } from '@/lib/mockIAM'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId, newRole, newDepartment } = body

    const employee = mockIAM.getEmployees().find(e => e.id === employeeId)
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const details = { ...employee, newRole, newDepartment }
    const requestResult = await workflowEngine.submitRequest('move', details, 'employee')

    return NextResponse.json({ success: true, request: requestResult })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit move request' }, { status: 500 })
  }
}