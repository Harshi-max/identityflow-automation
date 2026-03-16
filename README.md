# Self-Service Identity Lifecycle Automation

A web-based system that automates the **Joiner–Mover–Leaver (JML)** identity lifecycle using simulated IAM workflows.  
The platform provides a **self-service portal and chatbot assistant** to manage employee onboarding, role changes, and offboarding with approval workflows and audit logging.

This project simulates Identity and Access Management (IAM) automation **without connecting to production systems**, making it safe for demonstrations, learning, and hackathons.

---

# Problem Statement

Many organizations still manage **Joiner–Mover–Leaver processes manually**, which leads to:

- Delays in employee onboarding
- Incorrect role assignments
- Security risks due to orphaned accounts
- Lack of centralized audit tracking

This project demonstrates how **automation + workflow approvals** can streamline identity lifecycle management.

---

# Solution

This system provides a **self-service automation portal** that:

- Automates onboarding (Joiner)
- Handles role/department changes (Mover)
- Deactivates users and removes access (Leaver)
- Uses simulated IAM APIs
- Tracks all activities through audit logs
- Includes a chatbot assistant for easy interaction

---

# Key Features

## 1. Joiner (Employee Onboarding)
- Create a new employee account
- Assign department and role
- Simulate IAM account creation
- Manager approval workflow

## 2. Mover (Role / Department Change)
- Update employee role
- Simulate permission updates
- Trigger approval workflow

## 3. Leaver (Employee Offboarding)
- Disable employee accounts
- Revoke access permissions
- Log the action in the audit system

## 4. Approval Workflow
- Requests are marked as **Pending**
- Admin/Manager can **Approve or Reject**
- Approved actions trigger simulated IAM operations

## 5. IAM Simulation Layer

Mock IAM APIs simulate identity management operations:

- `createUser()`
- `assignRole()`
- `revokeAccess()`
- `disableAccount()`

These functions simulate real IAM delays and responses.

## 6. Chatbot Assistant

A simple chatbot helps users perform actions such as:

- "Onboard a new employee"
- "Change role"
- "Deactivate employee"

The chatbot guides users through the workflow.

## 7. Audit Logs

All actions are recorded with:

- Timestamp
- Action type
- Employee
- Status
- Approver

This provides **traceability and compliance visibility**.

---

# Tech Stack

**Frontend**
- Next.js 14
- React
- TailwindCSS
- TypeScript

**Backend**
- Next.js API Routes (Serverless)

**Deployment**
- Vercel

**Other**
- Mock IAM simulation layer
- In-memory / JSON data storage

---

# Project Architecture

```
User / Admin
     |
     v
Self-Service Portal / Chatbot
     |
     v
Approval Workflow System
     |
     v
Mock IAM API Layer
     |
     v
Audit Logging System
```

---

# Project Structure

```
/app
   /dashboard
   /employees
   /approvals
   /chatbot

/api
   /onboard
   /move
   /leaver
   /approve

/lib
   mockIAM.ts

/components
   EmployeeTable.tsx
   ApprovalCard.tsx
   ChatbotWidget.tsx
   AuditLog.tsx
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/identity-lifecycle-automation.git
cd identity-lifecycle-automation
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

# Deployment (Vercel)

1. Push the project to GitHub
2. Go to **Vercel**
3. Import the repository
4. Click **Deploy**

Vercel will automatically detect the **Next.js project** and deploy it.

---

# Example Workflow

### Onboarding

1. Employee onboarding request submitted
2. Manager approval required
3. IAM simulation creates account
4. Role assigned
5. Audit log updated

### Role Change

1. Role change request submitted
2. Approval workflow triggered
3. Permissions updated

### Offboarding

1. Deactivation request
2. IAM simulation disables account
3. Access revoked
4. Audit recorded

---

# Security Considerations

- No real IAM system is connected
- APIs are simulated
- Designed only for **demonstration and learning**

---

# Future Improvements

- Integrate with real IAM providers (Okta, Azure AD)
- Add RBAC access control
- Add database (PostgreSQL / MongoDB)
- AI-powered chatbot
- Slack / Teams integration
- Email notification system

---

# Author

Harshi

---

# License

MIT License
