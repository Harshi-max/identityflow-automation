'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { workflowEngine } from '@/lib/workflowEngine'
import { Request, UserRole } from '@/models/types'
import { canApproveRequests } from '@/lib/permissions'
import Navigation from '@/components/Navigation'
import BackButton from '@/components/BackButton'

export default function Approvals() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      setRequests(workflowEngine.getPendingRequests())
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      setRequests(workflowEngine.getPendingRequests())
    }, 1000) // Poll every 1 second for dynamic updates

    return () => clearInterval(interval)
  }, [user])

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    if (!user) return

    setLoading(true)
    setMessage(null)

    try {
      const result =
        action === 'approve'
          ? await workflowEngine.approveRequest(requestId, user.id, user.role)
          : await workflowEngine.rejectRequest(requestId, user.id, user.role)

      if (result.success) {
        setRequests(workflowEngine.getPendingRequests())
        setMessage({ type: 'success', text: result.message })
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to process request' })
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const canApprove = canApproveRequests(user.role)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton href="/dashboard" label="Back to Dashboard" />
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Approval Requests</h1>
              <p className="mt-2 text-sm text-gray-600">
                Logged in as: <span className="font-medium">{user.name}</span> ({user.role})
              </p>
              <button onClick={() => setRequests(workflowEngine.getPendingRequests())} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Refresh</button>
            </div>
            {!canApprove && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      You don&apos;t have permission to approve requests. Only Managers, Admins, and HR can approve requests.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 rounded-md p-4 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Requests */}
        <div className="space-y-6">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No pending requests</div>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-800">
                              {request.employee?.name ? request.employee.name.split(' ').map(n => n[0]).join('') : '?'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.employee?.name || 'Unknown User'} • {request.employee?.email || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {request.employee?.department || 'N/A'} • Requested {request.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {canApprove ? (
                        <>
                          <button
                            onClick={() => handleApproval(request.id, 'approve')}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                          >
                            {loading ? 'Processing...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleApproval(request.id, 'reject')}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            {loading ? 'Processing...' : 'Reject'}
                          </button>
                        </>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          View Only
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}