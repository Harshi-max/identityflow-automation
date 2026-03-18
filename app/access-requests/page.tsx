'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import BackButton from '@/components/BackButton'

export default function AccessRequests() {
  const { user } = useAuth()
  const [resource, setResource] = useState('')
  const [duration, setDuration] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const response = await fetch('/api/access-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: user.id,
          resource,
          duration: parseInt(duration),
        }),
      })

      if (response.ok) {
        alert('Access request submitted successfully!')
        setResource('')
        setDuration('')
      }
    } catch (error) {
      console.error('Error submitting request:', error)
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Access Requests</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Request Access</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="resource" className="block text-sm font-medium text-gray-700">
                Resource
              </label>
              <select
                id="resource"
                value={resource}
                onChange={(e) => setResource(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a resource</option>
                <option value="GitHub Repository">GitHub Repository</option>
                <option value="AWS Console">AWS Console</option>
                <option value="Database Access">Database Access</option>
                <option value="DevOps Tools">DevOps Tools</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (days)
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="30"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}