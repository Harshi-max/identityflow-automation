'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { mockIAM } from '@/lib/mockIAM'
import { workflowEngine } from '@/lib/workflowEngine'
import { riskDetectionEngine } from '@/lib/riskDetection'
import { emailService } from '@/lib/emailService'
import { Employee, Request, AuditLog, SecurityAlert, UserRole } from '@/models/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, UserCheck, Clock, Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Mail, Flag, MessageSquare } from 'lucide-react'
import Navigation from '@/components/Navigation'
import BackButton from '@/components/BackButton'

export default function Dashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])
  const [reportingEmployee, setReportingEmployee] = useState<Employee | null>(null)
  const [reportMessage, setReportMessage] = useState('')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      setEmployees(mockIAM.getEmployees())
      setAuditLogs(mockIAM.getAuditLogs())
      setAlerts(riskDetectionEngine.detectRisks(mockIAM.getEmployees(), mockIAM.getAuditLogs()))
      setRequests(workflowEngine.getRequests())
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      setEmployees(mockIAM.getEmployees())
      setAuditLogs(mockIAM.getAuditLogs())
      setAlerts(riskDetectionEngine.detectRisks(mockIAM.getEmployees(), mockIAM.getAuditLogs()))
      setRequests(workflowEngine.getRequests())
    }, 2000) // Poll every 2 seconds for dynamic updates

    return () => clearInterval(interval)
  }, [user])

  const activeEmployees = employees.filter(e => e.status === 'active').length
  const pendingRequests = requests.filter(r => r.status === 'pending').length
  const approvedRequests = requests.filter(r => r.status === 'approved').length
  const rejectedRequests = requests.filter(r => r.status === 'rejected').length

  const roleData = employees.reduce((acc, emp) => {
    acc[emp.role] = (acc[emp.role] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(roleData).map(([role, count]) => ({ role, count }))

  const statusData = [
    { name: 'Active', value: activeEmployees, color: '#10B981' },
    { name: 'Inactive', value: employees.length - activeEmployees, color: '#EF4444' },
  ]

  const handleReportEmployee = async (employee: Employee) => {
    if (!user || !reportMessage.trim()) return

    try {
      // Find the employee's manager
      const manager = employees.find(emp => emp.role === 'Manager' && emp.department === employee.department)

      if (manager) {
        await emailService.sendEmployeeReport(
          manager.email,
          employee,
          'Behavior Report',
          reportMessage
        )

        // Log the report
        mockIAM.addAuditLog({
          actor: user.id,
          action: 'report_employee_behavior',
          targetUser: employee.email,
          result: `Report sent to ${manager.email}`,
        })

        alert('Report sent to manager successfully!')
        setReportingEmployee(null)
        setReportMessage('')
      } else {
        alert('No manager found for this employee\'s department.')
      }
    } catch (error) {
      alert('Failed to send report. Please try again.')
    }
  }

  const StatCard = ({ title, value, icon: Icon, color, change }: {
    title: string
    value: string | number
    icon: any
    color: string
    change?: string
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={employees.length}
            icon={Users}
            color="bg-blue-500"
            change="+2 this month"
          />
          <StatCard
            title="Active Users"
            value={activeEmployees}
            icon={UserCheck}
            color="bg-green-500"
          />
          <StatCard
            title="Pending Approvals"
            value={pendingRequests}
            icon={Clock}
            color="bg-yellow-500"
          />
          <StatCard
            title="Security Alerts"
            value={alerts.length}
            icon={Shield}
            color="bg-red-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Role Distribution</h3>
              <div className="text-sm text-gray-500">Current breakdown</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="role"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Status</h3>
              <div className="text-sm text-gray-500">Active vs Inactive</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Security Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-4">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-100">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.userEmail}</p>
                  </div>
                </div>
              ))}
              {alerts.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No security alerts</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <div className="text-sm text-gray-500">Last 5 actions</div>
            </div>
            <div className="space-y-4">
              {auditLogs.slice(-5).reverse().map((log) => (
                <div key={log.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">
                      {log.actor.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500">{log.targetUser}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {log.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Reports (Manager Only) */}
          {user.role === 'Manager' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Employee Reports</h3>
                <Flag className="w-5 h-5 text-orange-500" />
              </div>
              <div className="space-y-4">
                {employees
                  .filter(emp => emp.role === 'Employee' && emp.department === user.department)
                  .slice(0, 3)
                  .map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.email}</p>
                      </div>
                      <button
                        onClick={() => setReportingEmployee(employee)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Report
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {user.role !== 'Manager' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Users className="w-4 h-4 mr-2" />
                  View My Profile
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Clock className="w-4 h-4 mr-2" />
                  My Requests
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Assistant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Employee Modal */}
      {reportingEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Report Employee: {reportingEmployee.name}
              </h3>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Describe the behavior or issue..."
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setReportingEmployee(null)
                    setReportMessage('')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReportEmployee(reportingEmployee)}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700"
                >
                  Send Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}