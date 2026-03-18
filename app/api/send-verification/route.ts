import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/serverEmailService'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ success: false, error: 'Missing email or code' }, { status: 400 })
    }

    const body = `
Hello,

Please use the following verification code to complete your IdentityFlow sign up:

Code: ${code}

If you did not request this, you can ignore this message.

Best regards,
IdentityFlow Team
    `

    await sendEmail({ to: email, subject: 'Verify your IdentityFlow account', body })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send verification email', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
