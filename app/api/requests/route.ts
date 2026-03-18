import { NextRequest, NextResponse } from 'next/server'
import { workflowEngine } from '@/lib/workflowEngine'

export async function GET(request: NextRequest) {
  try {
    const requests = workflowEngine.getPendingRequests()
    return NextResponse.json({ success: true, requests })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch requests' }, { status: 500 })
  }
}
