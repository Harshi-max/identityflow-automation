'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockIAM } from '@/lib/mockIAM'
import { workflowEngine } from '@/lib/workflowEngine'
import { Employee, UserRole } from '@/models/types'
import { useAuth } from '@/contexts/AuthContext'
import { canManageUsers } from '@/lib/permissions'
import Navigation from '@/components/Navigation'
import BackButton from '@/components/BackButton'
import { UserPlus, Edit, UserX } from 'lucide-react'

export default function Employees() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Employee' as UserRole,
    department: 'Engineering',
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      setEmployees(mockIAM.getEmployees())
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      setEmployees(mockIAM.getEmployees())
    }, 2000) // Poll every 2 seconds for dynamic updates

    return () => clearInterval(interval)
  }, [user])

  const refreshEmployees = () => {
    setEmployees(mockIAM.getEmployees())
  }

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const employeeData = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        role: formData.role,
        manager: 'HR Team',
      }

      await workflowEngine.submitRequest('onboard', employeeData, user.name)

      setFormData({ name: '', email: '', role: 'Employee', department: 'Engineering' })
      setShowOnboarding(false)
      refreshEmployees()
    } catch (error) {
      alert('Failed to submit onboarding request')
    }
  }

  const handleChangeRole = async (employeeId: string, newRole: UserRole) => {
    if (!user || !canManageUsers(user.role)) {
      alert('You do not have permission to change employee roles')
      return
    }

    try {
      await workflowEngine.submitRequest(
        'move',
        { employeeId, newRole },
        user.name,
        employeeId
      )

      alert('Role change request submitted for approval')
      refreshEmployees()
    } catch (error) {
      alert('Failed to submit role change request')
    }
  }

  const handleDeactivate = async (employeeId: string) => {
    if (!user || !canManageUsers(user.role)) {
      alert('You do not have permission to deactivate employees')
      return
    }
    if (confirm('Are you sure you want to deactivate this employee?')) {
      try {
        await workflowEngine.submitRequest('leaver', { employeeId }, user.name, employeeId)

        alert('Deactivation request submitted for approval')
        refreshEmployees()
      } catch (error) {
        alert('Failed to submit deactivation request')
      }
    }
  }

  const getSystemsCount = (employee: Employee) => {
    if (employee.status !== 'active') return 'No access'
    if (employee.department === 'Engineering') return '2 systems'
    return '1 system'
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-2">Manage identity lifecycle for all employees.</p>
        </div>

        {/* New Employee Onboarding */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">New Employee Onboarding</h2>
              {canManageUsers(user.role) ? (
                <button
                  onClick={() => setShowOnboarding(!showOnboarding)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {showOnboarding ? 'Cancel' : 'Add New Employee'}
                </button>
              ) : (
                <p className="text-sm text-gray-500">Only managers can onboard new employees</p>
              )}
            </div>
          </div>

          {showOnboarding && canManageUsers(user.role) && (
            <div className="px-6 py-4">
              <form onSubmit={handleOnboard} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Employee">Engineer</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Submit Joiner Request
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Employees Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Employee Accounts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.jobTitle || employee.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">{employee.role}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          employee.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : employee.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getSystemsCount(employee)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          const newRole = prompt('Enter new role (Employee, Manager, Admin, HR):', employee.role) as UserRole
                          if (newRole && ['Employee', 'Manager', 'Admin', 'HR'].includes(newRole)) {
                            handleChangeRole(employee.id, newRole)
                          }
                        }}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!user || !canManageUsers(user.role)}
                        title={!user || !canManageUsers(user.role) ? 'Only managers can change roles' : ''}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Change Role
                      </button>
                      <button
                        onClick={() => handleDeactivate(employee.id)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center ml-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!user || !canManageUsers(user.role)}
                        title={!user || !canManageUsers(user.role) ? 'Only managers can deactivate employees' : ''}
                      >
                        <UserX className="w-4 h-4 mr-1" />
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}