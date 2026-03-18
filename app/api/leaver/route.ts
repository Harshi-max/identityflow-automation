import { NextRequest, NextResponse } from 'next/server'
import { workflowEngine } from '@/lib/workflowEngine'
import { mockIAM } from '@/lib/mockIAM'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId } = body

    const employee = mockIAM.getEmployees().find(e => e.id === employeeId)
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const requestResult = await workflowEngine.submitRequest('leaver', employee, 'employee')

    return NextResponse.json({ success: true, request: requestResult })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit leaver request' }, { status: 500 })
  }
}