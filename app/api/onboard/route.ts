import { NextRequest, NextResponse } from 'next/server'
import { workflowEngine } from '@/lib/workflowEngine'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, department, role, manager } = body

    // Map role to jobTitle
    const roleJobTitleMap: Record<string, string> = {
      'Employee': 'Engineer',
      'Manager': 'Manager',
      'Admin': 'Admin',
      'HR': 'HR Specialist'
    }
    const jobTitle = roleJobTitleMap[role] || 'Employee'

    const employeeData = { name, email, department, role, manager, jobTitle }
    const requestResult = await workflowEngine.submitRequest('onboard', employeeData, 'system')

    return NextResponse.json({ success: true, request: requestResult })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit onboard request' }, { status: 500 })
  }
}