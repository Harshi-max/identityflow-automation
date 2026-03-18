'use client'

import { useEffect, useState } from 'react'
import { accessReviewEngine } from '@/lib/accessReview'
import { mockIAM } from '@/lib/mockIAM'
import { AccessReviewCampaign, AccessReview, Employee } from '@/models/types'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import BackButton from '@/components/BackButton'

export default function AccessReviews() {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState<AccessReviewCampaign[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<AccessReviewCampaign | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    if (user) {
      if (accessReviewEngine.getCampaigns().length === 0) {
        // Create an initial sample campaign
        const allEmployees = mockIAM.getEmployees()
        const engEmployees = allEmployees.filter(emp => emp.department === 'Engineering')
        accessReviewEngine.createCampaign(
          'Q1 Engineering Review',
          'Quarterly review for Engineering department access',
          user.id,
          user.name,
          'Engineering',
          engEmployees
        )
      }
      setCampaigns(accessReviewEngine.getCampaigns())
      setEmployees(mockIAM.getEmployees())
    }
  }, [user])

  const handleCreateCampaign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const department = formData.get('department') as string
    const managerId = user.id
    const managerName = user.name

    const departmentEmployees = employees.filter(emp => emp.department === department)
    const campaign = accessReviewEngine.createCampaign(name, description, managerId, managerName, department, departmentEmployees)

    setCampaigns([...campaigns, campaign])
    setShowCreateForm(false)
  }

  const handleReviewAction = (campaignId: string, reviewId: string, action: 'approved' | 'revoked') => {
    if (!user) return

    accessReviewEngine.updateReview(campaignId, reviewId, action, user.id, 'Access review completed')
    setCampaigns(accessReviewEngine.getCampaigns())
    if (selectedCampaign) {
      setSelectedCampaign(accessReviewEngine.getCampaignById(selectedCampaign.id) || null)
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Access Review Campaigns</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Campaign
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Create Access Review Campaign</h2>
            <form onSubmit={handleCreateCampaign}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Quarterly Access Review"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Review all access permissions for the engineering team"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <li key={campaign.id}>
                  <div
                    className="px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.description}</div>
                        <div className="text-sm text-gray-400">
                          Department: {campaign.department} | Due: {campaign.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'active'
                          ? 'bg-yellow-100 text-yellow-800'
                          : campaign.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {selectedCampaign && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{selectedCampaign.name}</h2>
              <div className="space-y-4">
                {selectedCampaign.reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{review.employeeName}</h3>
                        <p className="text-sm text-gray-500">{review.employeeEmail}</p>
                        <p className="text-sm text-gray-600">Role: {review.currentRole}</p>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Permissions:</p>
                          <ul className="text-xs text-gray-600">
                            {review.permissions.map((perm, index) => (
                              <li key={index}>• {perm}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {review.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleReviewAction(selectedCampaign.id, review.id, 'approved')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReviewAction(selectedCampaign.id, review.id, 'revoked')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                              Revoke
                            </button>
                          </>
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            review.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {review.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}