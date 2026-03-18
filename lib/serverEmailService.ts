import nodemailer from 'nodemailer'

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env

const isSMTPConfigured = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS)

export async function sendEmail(options: {
  to: string
  subject: string
  body: string
}) {
  const { to, subject, body } = options

  if (!isSMTPConfigured) {
    console.log('📧 (mock) Email not sent because SMTP is not configured:', { to, subject, body })
    return
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  const from = SMTP_FROM || SMTP_USER

  await transport.sendMail({
    from,
    to,
    subject,
    text: body,
  })

  console.log(`✅ Email sent to ${to}: ${subject}`)
}
