import { NextRequest, NextResponse } from 'next/server'
import { workflowEngine } from '@/lib/workflowEngine'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId, resource, duration } = body

    const details = { employeeId, resource, duration }
    const requestResult = await workflowEngine.submitRequest('access', details, 'employee')

    return NextResponse.json({ success: true, request: requestResult })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit access request' }, { status: 500 })
  }
}