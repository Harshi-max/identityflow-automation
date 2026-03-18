'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserRole } from '@/models/types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (name: string, email: string, password: string, department: string, role?: UserRole) => Promise<{ success: boolean; message: string }>
  verifyEmail: (email: string, code: string) => Promise<{ success: boolean; message: string }>
  resendVerification: (email: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_STORAGE_KEY = 'identityflow_users'
const SESSION_STORAGE_KEY = 'identityflow_user'
const VERIFICATION_STORAGE_KEY = 'identityflow_verifications'

const DEFAULT_USERS: User[] = [
  {
    id: 'emp-1',
    name: 'Alice Johnson',
    email: 'alice.employee@company.com',
    role: 'Employee',
    department: 'Engineering',
    permissions: [],
    password: 'employee123',
    isVerified: true,
  },
  {
    id: 'emp-2',
    name: 'Bob Smith',
    email: 'bob.employee@company.com',
    role: 'Employee',
    department: 'Marketing',
    permissions: [],
    password: 'employee123',
    isVerified: true,
  },
  {
    id: 'mgr-1',
    name: 'Sarah Manager',
    email: 'sarah.manager@company.com',
    role: 'Manager',
    department: 'Engineering',
    permissions: ['approve_requests', 'view_analytics'],
    password: 'manager123',
    isVerified: true,
  },
  {
    id: 'mgr-2',
    name: 'John Manager',
    email: 'john.manager@company.com',
    role: 'Manager',
    department: 'HR',
    permissions: ['approve_requests', 'manage_users', 'view_analytics'],
    password: 'manager123',
    isVerified: true,
  },
]

function loadUsers(): User[] {
  if (typeof window === 'undefined') return DEFAULT_USERS
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  if (!stored) return DEFAULT_USERS
  try {
    return JSON.parse(stored) as User[]
  } catch {
    localStorage.removeItem(USERS_STORAGE_KEY)
    return DEFAULT_USERS
  }
}

function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function loadVerifications(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem(VERIFICATION_STORAGE_KEY)
  if (!stored) return {}
  try {
    return JSON.parse(stored) as Record<string, string>
  } catch {
    localStorage.removeItem(VERIFICATION_STORAGE_KEY)
    return {}
  }
}

function saveVerifications(map: Record<string, string>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(VERIFICATION_STORAGE_KEY, JSON.stringify(map))
}

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem(SESSION_STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem(SESSION_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const users = loadUsers()
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (!foundUser) {
      setIsLoading(false)
      return { success: false, message: 'User not found. Please check your email.' }
    }

    if (foundUser.password !== password) {
      setIsLoading(false)
      return { success: false, message: 'Invalid password.' }
    }

    if (!foundUser.isVerified) {
      await resendVerification(email)
      setIsLoading(false)
      return {
        success: false,
        message: 'Your email is not verified. A verification code has been sent to your email.'
      }
    }

    setUser(foundUser)
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(foundUser))
    setIsLoading(false)

    return { success: true, message: 'Login successful!' }
  }

  const signup = async (name: string, email: string, password: string, department: string, role: UserRole = 'Employee') => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const users = loadUsers()
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (existing) {
      setIsLoading(false)
      return { success: false, message: 'An account with this email already exists.' }
    }

    const newUser: User = {
      id: `user-${Math.random().toString(36).slice(2, 10)}`,
      name,
      email,
      role,
      department,
      permissions: [],
      password,
      isVerified: false,
    }

    const updatedUsers = [...users, newUser]
    saveUsers(updatedUsers)
    await resendVerification(email)

    setIsLoading(false)
    return {
      success: true,
      message: `Account created. A verification code was sent to your email (mock code: ${loadVerifications()[email.toLowerCase()] || '——'}).`
    }
  }

  const resendVerification = async (email: string) => {
    const users = loadUsers()
    const userToVerify = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!userToVerify) {
      return { success: false, message: 'Email not found.' }
    }

    const code = generateVerificationCode()
    const verifications = loadVerifications()
    verifications[email.toLowerCase()] = code
    saveVerifications(verifications)

    // Send the verification email via a server-side endpoint.
    // If SMTP is not configured, the server will log the email instead.
    const response = await fetch('/api/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    })

    if (!response.ok) {
      const result = await response.json().catch(() => ({}))
      return { success: false, message: result.error || 'Failed to send verification email' }
    }

    return { success: true, message: `Verification code sent (mock): ${code}` }
  }

  const verifyEmail = async (email: string, code: string) => {
    const verifications = loadVerifications()
    const storedCode = verifications[email.toLowerCase()]

    if (!storedCode || storedCode !== code) {
      return { success: false, message: 'Invalid verification code.' }
    }

    const users = loadUsers()
    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === email.toLowerCase() ? { ...u, isVerified: true } : u
    )

    saveUsers(updatedUsers)
    delete verifications[email.toLowerCase()]
    saveVerifications(verifications)

    return { success: true, message: 'Email verified successfully! You can now sign in.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        verifyEmail,
        resendVerification,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}