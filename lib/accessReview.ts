import { AccessReviewCampaign, AccessReview, Employee } from '@/models/types'

let campaigns: AccessReviewCampaign[] = []

export const accessReviewEngine = {
  createCampaign(name: string, description: string, managerId: string, managerName: string, department: string, employees: Employee[]): AccessReviewCampaign {
    const reviews: AccessReview[] = employees.map(employee => ({
      id: Math.random().toString(36).substr(2, 9),
      campaignId: '',
      employeeId: employee.id,
      employeeName: employee.name,
      employeeEmail: employee.email,
      currentRole: employee.role,
      permissions: ['GitHub', 'AWS', 'Jira', 'Database'], // Mock permissions
      status: 'pending',
    }))

    const campaignId = Math.random().toString(36).substr(2, 9)
    const campaign: AccessReviewCampaign = {
      id: campaignId,
      name,
      description,
      managerId,
      managerName,
      department,
      status: 'active',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date(),
      reviews: reviews.map(review => ({ ...review, campaignId })),
    }

    campaigns.push(campaign)
    return campaign
  },

  getCampaigns(): AccessReviewCampaign[] {
    return campaigns
  },

  getCampaignById(id: string): AccessReviewCampaign | undefined {
    return campaigns.find(c => c.id === id)
  },

  updateReview(campaignId: string, reviewId: string, status: 'approved' | 'revoked', reviewer: string, comments?: string): void {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (!campaign) return

    const review = campaign.reviews.find(r => r.id === reviewId)
    if (!review) return

    review.status = status
    review.reviewedBy = reviewer
    review.reviewedAt = new Date()
    review.comments = comments

    // Check if all reviews are completed
    const allCompleted = campaign.reviews.every(r => r.status !== 'pending')
    if (allCompleted) {
      campaign.status = 'completed'
    }
  },

  getPendingReviewsForManager(managerId: string): AccessReview[] {
    return campaigns
      .filter(c => c.managerId === managerId && c.status === 'active')
      .flatMap(c => c.reviews.filter(r => r.status === 'pending'))
  },
}