'use client'

import { useState } from 'react'
import { mockIAM } from '@/lib/mockIAM'
import { workflowEngine } from '@/lib/workflowEngine'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/models/types'
import Navigation from '@/components/Navigation'
import BackButton from '@/components/BackButton'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
}

interface ConversationState {
  step:
    | 'idle'
    | 'awaiting_onboard_name'
    | 'awaiting_onboard_email'
    | 'awaiting_onboard_department'
    | 'awaiting_onboard_role'
    | 'awaiting_onboard_manager'
    | 'awaiting_move_details'
    | 'awaiting_leaver_details'
  data: Record<string, any>
}

export default function Chatbot() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'System ready. Type help for commands.', sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const [conversationState, setConversationState] = useState<ConversationState>({ step: 'idle', data: {} })

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const message: Message = { id: Date.now().toString(), text, sender }
    setMessages(prev => [...prev, message])
  }

  const formatEmailFromName = (name: string) => {
    const normalized = name.trim().toLowerCase().replace(/\s+/g, '.')
    return `${normalized}@company.com`
  }

  const findManagerForDepartment = (department: string) => {
    const manager = mockIAM
      .getEmployees()
      .find(e => e.role === 'Manager' && e.department.toLowerCase() === department.toLowerCase())

    return manager?.name || 'HR Team'
  }

  const getSystemStats = () => {
    const employees = mockIAM.getEmployees()
    const pendingRequests = workflowEngine.getPendingRequests()
    
    const active = employees.filter(e => e.status === 'active').length
    const pending = employees.filter(e => e.status === 'pending').length
    const deactivated = employees.filter(e => e.status === 'inactive').length
    const total = employees.length

    return { active, pending, deactivated, total, pendingRequests: pendingRequests.length }
  }

  const formatSystemStatus = () => {
    const stats = getSystemStats()
    return `\n• Active: ${stats.active}\n• Pending Approvals: ${stats.pendingRequests}\n• Deactivated: ${stats.deactivated}\n• Total: ${stats.total}`
  }

  const formatActiveEmployees = () => {
    const employees = mockIAM.getEmployees().filter(e => e.status === 'active' || e.status === 'pending')
    return employees.map(e => `• ${e.name} — ${e.jobTitle}, ${e.department} [${e.status}]`).join('\n')
  }

  const formatPendingApprovals = () => {
    const requests = workflowEngine.getPendingRequests()
    return requests.map(r => `• ${r.employee.name} — ${r.type.toUpperCase()}: ${r.details.role || r.details.newRole || 'Deactivation'} in ${r.details.department || r.employee.department}`).join('\n')
  }

  const normalizeRole = (role: string): { userRole: UserRole; jobTitle: string } => {
    const lowerRole = role.toLowerCase()
    if (lowerRole.includes('admin')) return { userRole: 'Admin', jobTitle: 'Admin' }
    if (lowerRole.includes('manager')) return { userRole: 'Manager', jobTitle: 'Manager' }
    if (lowerRole.includes('hr')) return { userRole: 'HR', jobTitle: 'HR Specialist' }
    if (lowerRole.includes('developer') || lowerRole.includes('engineer')) return { userRole: 'Employee', jobTitle: 'Engineer' }
    if (lowerRole.includes('analyst')) return { userRole: 'Employee', jobTitle: 'Analyst' }
    if (lowerRole.includes('designer')) return { userRole: 'Employee', jobTitle: 'Designer' }
    if (lowerRole.includes('intern')) return { userRole: 'Employee', jobTitle: 'Intern' }
    return { userRole: 'Employee', jobTitle: 'Employee' } // Default
  }

  const handleConversation = (userInput: string) => {
    if (conversationState.step === 'awaiting_onboard_name') {
      conversationState.data.name = userInput.trim()
      setConversationState({ ...conversationState, step: 'awaiting_onboard_role' })
      addMessage('What is their role? (e.g., Engineer, Manager, Developer)', 'bot')
    } else if (conversationState.step === 'awaiting_onboard_role') {
      const { userRole, jobTitle } = normalizeRole(userInput.trim())
      conversationState.data.userRole = userRole
      conversationState.data.jobTitle = jobTitle
      setConversationState({ ...conversationState, step: 'awaiting_onboard_email' })
      addMessage('What is their email address?', 'bot')
    } else if (conversationState.step === 'awaiting_onboard_email') {
      conversationState.data.email = userInput.trim()
      setConversationState({ ...conversationState, step: 'awaiting_onboard_department' })
      addMessage('What department? (e.g., Engineering, HR, Marketing)', 'bot')
    } else if (conversationState.step === 'awaiting_onboard_department') {
      conversationState.data.department = userInput.trim()
      const data = conversationState.data
      const manager = findManagerForDepartment(data.department)
      addMessage(`⌛ Running: onboard ${data.name} ${data.jobTitle} (dept: ${data.department})`, 'bot')
      submitOnboardRequest({ ...data, manager } as any)
      setConversationState({ step: 'idle', data: {} })
    }
  }

  const submitOnboardRequest = async (data: {
    name: string
    email: string
    department: string
    userRole: UserRole
    jobTitle: string
    manager: string
  }) => {
    try {
      const employeeData = {
        name: data.name,
        email: data.email,
        department: data.department,
        role: data.userRole,
        manager: data.manager,
      }

      const request = await workflowEngine.submitRequest('onboard', employeeData, user?.name || 'system')

      addMessage(
        `✓ Joiner request created for ${data.name} ${data.jobTitle}\n• Role: ${data.jobTitle}\n• Department: ${data.department}\n• Email: ${data.email}\n• Status: Pending Approval (ID: ${request.id.slice(0, 6)})`,
        'bot'
      )

      // Show updated stats
      const stats = getSystemStats()
      const allEmployees = mockIAM.getEmployees().filter(e => e.status === 'active' || e.status === 'pending')
      addMessage(
        `All Employees (${allEmployees.length})\n${formatActiveEmployees()}\n\nPending Approvals (${stats.pendingRequests})\n${formatPendingApprovals()}\n\nSystem Status${formatSystemStatus()}`,
        'bot'
      )
    } catch (error) {
      addMessage('❌ Error submitting request. Please try again.', 'bot')
    } finally {
      setConversationState({ step: 'idle', data: {} })
    }
  }

  const submitMoveRequest = async (
    employeeId: string,
    newRole: string,
    newDepartment?: string
  ) => {
    try {
      await workflowEngine.submitRequest(
        'move',
        { employeeId, newRole, newDepartment },
        user?.name || 'system',
        employeeId
      )

      const employee = mockIAM.getEmployees().find(e => e.id === employeeId)
      addMessage(`✓ Role change request created for ${employee?.name}\n• New Role: ${newRole}\n• Status: Pending Approval`, 'bot')
      
      // Show updated stats
      const stats = getSystemStats()
      const allEmployees = mockIAM.getEmployees().filter(e => e.status === 'active' || e.status === 'pending')
      addMessage(`All Employees (${allEmployees.length})\n${formatActiveEmployees()}\n\nPending Approvals (${stats.pendingRequests})\n${formatPendingApprovals()}\n\nSystem Status${formatSystemStatus()}`, 'bot')
    } catch (error) {
      addMessage('❌ Error submitting request. Please try again.', 'bot')
    } finally {
      setConversationState({ step: 'idle', data: {} })
    }
  }

  const submitLeaverRequest = async (employeeId: string) => {
    try {
      await workflowEngine.submitRequest('leaver', { employeeId }, user?.name || 'system', employeeId)

      const employee = mockIAM.getEmployees().find(e => e.id === employeeId)
      addMessage(`✓ Leaver request created for ${employee?.name}\n• Status: Pending Approval`, 'bot')
      
      // Show updated stats
      const stats = getSystemStats()
      const allEmployees = mockIAM.getEmployees().filter(e => e.status === 'active' || e.status === 'pending')
      addMessage(`All Employees (${allEmployees.length})\n${formatActiveEmployees()}\n\nPending Approvals (${stats.pendingRequests})\n${formatPendingApprovals()}\n\nSystem Status${formatSystemStatus()}`, 'bot')
    } catch (error) {
      addMessage('❌ Error submitting request. Please try again.', 'bot')
    } finally {
      setConversationState({ step: 'idle', data: {} })
    }
  }

  const handleOnboardCommand = (preset?: { name: string; role: string; department?: string }) => {
    if (!user) return

    if (preset) {
      const name = preset.name.trim()
      const { userRole, jobTitle } = normalizeRole(preset.role.trim())
      const department = preset.department?.trim() || 'Engineering'
      const email = formatEmailFromName(name)
      const manager = findManagerForDepartment(department)

      addMessage(`⌛ Running: onboard ${name} ${jobTitle} (dept: ${department})`, 'bot')
      submitOnboardRequest({ name, userRole, jobTitle, department, email, manager })
      return
    }

    setConversationState({ step: 'awaiting_onboard_name', data: {} })
    addMessage('Great — let\'s onboard a new employee. What is the employee\'s full name?', 'bot')
  }

  const handleMoveCommand = (
    employeeName: string,
    preset?: { newRole?: string; newDepartment?: string }
  ) => {
    if (!user) return
    const employees = mockIAM.getEmployees()
    const employee = employees.find(e => e.name.toLowerCase().includes(employeeName.toLowerCase()))
    if (!employee) {
      addMessage(`Employee "${employeeName}" not found. Please check the name and try again.`, 'bot')
      return
    }

    if (preset?.newRole) {
      const { userRole, jobTitle } = normalizeRole(preset.newRole)
      addMessage(`⌛ Running: change role of ${employee.name} to ${jobTitle}`, 'bot')
      submitMoveRequest(employee.id, userRole, preset.newDepartment)
      return
    }

    setConversationState({
      step: 'awaiting_move_details',
      data: { employeeId: employee.id, employeeName: employee.name }
    })
    addMessage(`Found employee: ${employee.name}\nCurrent role: ${employee.role}\n\nPlease provide new details:\nNew Role: [role]\nNew Department: [department] (optional)`, 'bot')
  }

  const handleLeaverCommand = (employeeName: string, skipConfirmation = false) => {
    if (!user) return
    const employees = mockIAM.getEmployees()
    const employee = employees.find(e => e.name.toLowerCase().includes(employeeName.toLowerCase()))
    if (!employee) {
      addMessage(`Employee "${employeeName}" not found. Please check the name and try again.`, 'bot')
      return
    }

    if (skipConfirmation) {
      addMessage(`⌛ Running: deactivate ${employee.name}`, 'bot')
      submitLeaverRequest(employee.id)
      return
    }

    setConversationState({
      step: 'awaiting_leaver_details',
      data: { employeeId: employee.id, employeeName: employee.name }
    })
    addMessage(`Found employee: ${employee.name}\n\nAre you sure you want to deactivate this employee? Type "yes" to confirm.`, 'bot')
  }

  const processOnboardStep = async (input: string) => {
    const step = conversationState.step
    const data = { ...conversationState.data }

    if (step === 'awaiting_onboard_name') {
      data.name = input.trim()
      setConversationState({ step: 'awaiting_onboard_email', data })
      addMessage('Great! What is the employee\'s email address?', 'bot')
      return
    }

    if (step === 'awaiting_onboard_email') {
      data.email = input.trim()
      setConversationState({ step: 'awaiting_onboard_department', data })
      addMessage('Which department will they belong to?', 'bot')
      return
    }

    if (step === 'awaiting_onboard_department') {
      data.department = input.trim()
      setConversationState({ step: 'awaiting_onboard_role', data })
      addMessage('What role will they have?', 'bot')
      return
    }

    if (step === 'awaiting_onboard_role') {
      const { userRole, jobTitle } = normalizeRole(input.trim())
      data.userRole = userRole
      data.jobTitle = jobTitle
      setConversationState({ step: 'awaiting_onboard_manager', data })
      addMessage('Who is their manager (name or email)?', 'bot')
      return
    }

    if (step === 'awaiting_onboard_manager') {
      data.manager = input.trim()
      await submitOnboardRequest({
        name: data.name,
        email: data.email,
        department: data.department,
        userRole: data.userRole,
        jobTitle: data.jobTitle,
        manager: data.manager,
      })
    }
  }

  const processMoveDetails = async (details: string) => {
    const lines = details.split('\n')
    const data: any = { ...conversationState.data }

    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim())
      if (!key || !value) return

      if (key.toLowerCase().includes('role')) {
        const { userRole } = normalizeRole(value)
        data.newRole = userRole
      }

      if (key.toLowerCase().includes('department')) {
        data.newDepartment = value
      }
    })

    if (!data.newRole) {
      addMessage('Please provide the new role.', 'bot')
      return
    }

    await submitMoveRequest(data.employeeId, data.newRole, data.newDepartment)
  }

  const processLeaverConfirmation = async (confirmation: string) => {
    if (confirmation.toLowerCase() !== 'yes') {
      addMessage('Deactivation cancelled.', 'bot')
      setConversationState({ step: 'idle', data: {} })
      return
    }

    await submitLeaverRequest(conversationState.data.employeeId)
  }

  const handleSend = async () => {
    const rawInput = input.trim()
    if (!rawInput) return
    if (!user) {
      addMessage('Please log in to use the AI assistant.', 'bot')
      return
    }

    addMessage(rawInput, 'user')
    setInput('')

    const userInput = rawInput.toLowerCase()

    // Handle conversation states
    if (conversationState.step.startsWith('awaiting_onboard')) {
      await processOnboardStep(rawInput)
      return
    }

    if (conversationState.step === 'awaiting_move_details') {
      await processMoveDetails(rawInput)
      return
    }

    if (conversationState.step === 'awaiting_leaver_details') {
      await processLeaverConfirmation(rawInput)
      return
    }

    // CLI-style parsing
    if (userInput === 'help') {
      addMessage(`Available commands:
• onboard — Start joiner workflow (interactive)
• change role [name] to [role] — Initiate mover
• deactivate [name] — Start leaver workflow
• list users — Show all employees
• list approvals — Show pending requests
• stats — Dashboard stats`, 'bot')
      return
    }

    if (userInput.startsWith('onboard')) {
      setConversationState({ step: 'awaiting_onboard_name', data: {} })
      addMessage('Please enter the full name of the employee to onboard.', 'bot')
      return
    }

    const changeRoleMatch = rawInput.match(/^change role\s+(.+?)\s+to\s+(employee|manager|admin|hr|developer|engineer|analyst|designer|intern)$/i)
    if (changeRoleMatch) {
      const employeeName = changeRoleMatch[1].trim()
      const { userRole } = normalizeRole(changeRoleMatch[2].trim())
      handleMoveCommand(employeeName, { newRole: userRole })
      return
    }

    const deactivateMatch = rawInput.match(/^deactivate\s+(.+)$/i)
    if (deactivateMatch) {
      const employeeName = deactivateMatch[1].trim()
      handleLeaverCommand(employeeName, true)
      return
    }

    if (userInput === 'list users') {
      const employees = mockIAM.getEmployees()
      const allEmployees = employees.filter(e => e.status === 'active' || e.status === 'pending')
      const employeeList = allEmployees.map(e => `• ${e.name} — ${e.jobTitle}, ${e.department} [${e.status}]`).join('\n')
      addMessage(`All Employees (${allEmployees.length})\n${employeeList}`, 'bot')
      return
    }

    if (userInput === 'list approvals') {
      const requests = workflowEngine.getPendingRequests()
      if (requests.length === 0) {
        addMessage('Pending Approvals (0)\nNo pending requests.', 'bot')
      } else {
        const approvalList = requests.map(r => `• ${r.employee.name} — ${r.type.toUpperCase()}: ${r.details.jobTitle || r.details.newRole || 'Deactivation'} in ${r.details.department || r.employee.department}`).join('\n')
        addMessage(`Pending Approvals (${requests.length})\n${approvalList}`, 'bot')
      }
      return
    }

    if (userInput === 'stats') {
      const stats = getSystemStats()
      addMessage(`System Status${formatSystemStatus()}`, 'bot')
      return
    }

    addMessage('Command not recognized. Type "help" for available commands.', 'bot')
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
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Identity Assistant</h1>

        <div className="bg-white rounded-lg shadow h-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your command..."
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
            {conversationState.step !== 'idle' && (
              <p className="text-sm text-gray-500 mt-2">
                {conversationState.step === 'awaiting_onboard_name' && 'Onboarding: please provide the employee’s full name.'}
                {conversationState.step === 'awaiting_onboard_email' && 'Onboarding: what is the employee’s email address?'}
                {conversationState.step === 'awaiting_onboard_department' && 'Onboarding: what department will they join?'}
                {conversationState.step === 'awaiting_onboard_role' && 'Onboarding: what role will they have?'}
                {conversationState.step === 'awaiting_onboard_manager' && 'Onboarding: who is the manager for this employee?'}
                {conversationState.step === 'awaiting_move_details' && `Updating role for ${conversationState.data.employeeName}`}
                {conversationState.step === 'awaiting_leaver_details' && `Confirming deactivation of ${conversationState.data.employeeName}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}