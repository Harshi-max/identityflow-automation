import { NextRequest, NextResponse } from 'next/server'
import { workflowEngine } from '@/lib/workflowEngine'
import { UserRole } from '@/models/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { requestId, action, approverId, approverRole } = body // action: 'approve' or 'reject'

    if (!approverId || !approverRole) {
      return NextResponse.json({
        success: false,
        message: 'Approver ID and role are required'
      }, { status: 400 })
    }

    let result
    if (action === 'approve') {
      result = await workflowEngine.approveRequest(requestId, approverId, approverRole as UserRole)
    } else if (action === 'reject') {
      result = await workflowEngine.rejectRequest(requestId, approverId, approverRole as UserRole)
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid action. Must be "approve" or "reject"'
      }, { status: 400 })
    }

    if (!result.success) {
      return NextResponse.json(result, { status: 403 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to process approval'
    }, { status: 500 })
  }
}