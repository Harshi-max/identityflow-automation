import { Employee, UserRole } from '@/models/types'

export interface EmailNotification {
  to: string
  subject: string
  body: string
  type: 'employee_report' | 'approval_request' | 'security_alert' | 'access_review'
}

// Mock email service - in production, this would integrate with SendGrid, AWS SES, etc.
export const emailService = {
  async sendEmployeeReport(managerEmail: string, employee: Employee, reportType: string, details: string) {
    const notification: EmailNotification = {
      to: managerEmail,
      subject: `Employee Behavior Report: ${employee.name}`,
      body: `
Dear Manager,

This is an automated report regarding employee behavior:

Employee: ${employee.name}
Email: ${employee.email}
Department: ${employee.department}
Report Type: ${reportType}

Details:
${details}

Please review this report and take appropriate action if needed.

Best regards,
IdentityFlow Automation System
      `,
      type: 'employee_report'
    }

    // Simulate sending email
    console.log('📧 Sending email notification:', notification)
    await this.simulateEmailSend(notification)

    return { success: true, message: 'Report sent to manager successfully' }
  },

  async sendVerificationCode(email: string, code: string) {
    const notification: EmailNotification = {
      to: email,
      subject: 'Verify your IdentityFlow account',
      body: `
Hello,

Please use the following verification code to complete your IdentityFlow sign up:

Code: ${code}

If you did not request this, you can ignore this message.

Best regards,
IdentityFlow Team
      `,
      type: 'security_alert',
    }

    console.log('📧 Sending verification code:', notification)
    await this.simulateEmailSend(notification)

    return { success: true, message: 'Verification code sent.' }
  },

  async sendApprovalNotification(approverEmail: string, requestDetails: any) {
    const notification: EmailNotification = {
      to: approverEmail,
      subject: `New Approval Request: ${requestDetails.type}`,
      body: `
Dear Approver,

A new approval request requires your attention:

Type: ${requestDetails.type}
Employee: ${requestDetails.employeeName}
Department: ${requestDetails.department}

Please log in to the system to review and approve/reject this request.

Best regards,
IdentityFlow Automation System
      `,
      type: 'approval_request'
    }

    console.log('📧 Sending approval notification:', notification)
    await this.simulateEmailSend(notification)

    return { success: true, message: 'Approval notification sent' }
  },

  async sendSecurityAlert(recipientEmail: string, alertDetails: any) {
    const notification: EmailNotification = {
      to: recipientEmail,
      subject: `Security Alert: ${alertDetails.title}`,
      body: `
Security Alert Notification

Alert Type: ${alertDetails.type}
Severity: ${alertDetails.severity}
Title: ${alertDetails.title}

Description: ${alertDetails.description}

User: ${alertDetails.userEmail}

Please investigate this security concern immediately.

Best regards,
IdentityFlow Security System
      `,
      type: 'security_alert'
    }

    console.log('🚨 Sending security alert:', notification)
    await this.simulateEmailSend(notification)

    return { success: true, message: 'Security alert sent' }
  },

  async simulateEmailSend(notification: EmailNotification): Promise<void> {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // In a real application, this would call an email service API
    console.log(`✅ Email sent to ${notification.to}: ${notification.subject}`)
  }
}