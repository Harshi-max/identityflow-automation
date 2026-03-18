'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Mail, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Verify() {
  const router = useRouter()
  const { verifyEmail, resendVerification, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [mockCode, setMockCode] = useState<string | null>(null)

  const loadMockCode = (email: string) => {
    try {
      const stored = localStorage.getItem('identityflow_verifications')
      if (!stored) return null
      const map = JSON.parse(stored) as Record<string, string>
      return map[email.toLowerCase()] || null
    } catch {
      return null
    }
  }

  const updateMockCode = (email: string) => {
    const code = loadMockCode(email)
    setMockCode(code)
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const result = await verifyEmail(email, code)
    setMessage(result.message)
    if (result.success) {
      setTimeout(() => router.push('/login'), 1600)
    }
  }

  const handleResend = async () => {
    setMessage('')
    const result = await resendVerification(email)
    setMessage(result.message)
    updateMockCode(email)
  }

  useEffect(() => {
    if (email) {
      updateMockCode(email)
    }
  }, [email])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <div className="flex flex-col items-center">
          <Shield className="h-12 w-12 text-blue-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Enter the verification code sent to your email to complete sign up.
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification code
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="block w-full pr-10 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  placeholder="123456"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {message && (
            <p className="text-sm text-gray-600 text-center">{message}</p>
          )}

          {mockCode && (
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold">(Dev only)</span> Verification code: {mockCode}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Verifying…' : 'Verify Email'}
          </button>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Resend code
            </button>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800">
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
