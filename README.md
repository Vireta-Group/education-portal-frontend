# EduPro School Management System

A modern, comprehensive school management platform built with **React 19**, **Vite 8**, **Tailwind CSS 4**, and **Redux Toolkit**.

## Tech Stack

- **React 19** — Latest React with concurrent features
- **Vite 8** — Next-gen build tool with instant HMR
- **Tailwind CSS 4** — Utility-first CSS framework
- **React Router 7** — Declarative routing
- **Redux Toolkit** — State management
- **TanStack React Query 5** — Server state management (ready for API integration)
- **React Hook Form + Zod** — Form handling & validation
- **class-variance-authority** — Component variants
- **sonner** — Toast notifications
- **lucide-react** — Icon library

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── ui/              # UI primitives (Button, Input, DatePicker, Skeleton, StatusBadge)
│   └── common/          # Shared components (DataTable, FormField, PageHeader)
├── pages/
│   ├── public/          # Landing, Login, Register + portfolio pages
│   └── private/         # 16 module directories (Academics, Students, Teachers, etc.)
├── store/               # Redux store + slices
├── layout/              # MainLayout, PublicLayout, Sidebar
├── hooks/               # Custom hooks
├── lib/                 # Utilities (cn)
└── routes/              # Route definitions
```

## Demo Credentials

- **Email:** admin@example.com
- **Password:** 12345

## Modules

Academics | Students | Teachers | Employees | Exams | Results | Fees | Transport | Hostel | Canteen | Library | HR | Communication | Events | Security | Health
