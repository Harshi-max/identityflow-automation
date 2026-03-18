'use client'

import { useEffect, useState } from 'react'
import { mockIAM } from '@/lib/mockIAM'
import { AuditLog } from '@/models/types'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import BackButton from '@/components/BackButton'

export default function AuditLogs() {
  const { user } = useAuth()
  const [logs, setLogs] = useState<AuditLog[]>([])

  useEffect(() => {
    if (user) {
      setLogs(mockIAM.getAuditLogs())
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Audit Logs</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {logs.reverse().map((log) => (
              <li key={log.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.action}</div>
                      <div className="text-sm text-gray-500">
                        {log.actor} → {log.targetUser}
                      </div>
                      <div className="text-sm text-gray-400">{log.result}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {log.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}