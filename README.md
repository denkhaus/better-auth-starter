# Zexa Auth Starter

A modern, production-ready Next.js boilerplate with comprehensive authentication, admin dashboard, and user management features. Built by Zexa for rapid application development.

## ✨ Features

### 🔐 Authentication
- **Email & Password Authentication** with email verification
- **Session Management** with secure token handling
- **Account Linking** support
- **Role-based Access Control** (Admin, User roles)

### 👥 User Management
- **User Registration & Login** with form validation
- **Email Verification** system
- **Profile Management**
- **User Banning/Unbanning** with expiration dates
- **Session Revocation** for security

### 🛡️ Admin Dashboard
- **User Management Interface** - View, edit, ban/unban users
- **Role Assignment** - Manage user permissions
- **User Actions** - Delete users, revoke sessions
- **Responsive Admin UI** with modern design

### 🌍 Internationalization (i18n)
- **Multi-language Support** with German (default) and English
- **Locale Detection** via browser preferences and URL
- **Translation Management** using next-intl with JSON files
- **Language Toggle** component with [DE|EN] UI
- **Better-Auth Integration** with internationalized auth components
- **Persistent Language Preferences** using local storage

### 🎨 UI/UX
- **Modern Design System** with Tailwind CSS
- **Responsive Layout** for all devices
- **Component Library** with Radix UI primitives
- **Form Validation** with React Hook Form + Zod
- **Toast Notifications** for user feedback

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Authentication:** Better Auth
- **Internationalization:** next-intl
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Email:** Brevo
- **TypeScript:** Full type safety

## 📧 Email Service Migration (Resend to Brevo)

This project has migrated its email service from Resend to Brevo. If you were previously using Resend, please note the following changes:

- **Dependency Change**: The `resend` package has been replaced with `@getbrevo/brevo`.
- **Environment Variables**: 
  - `RESEND_API_KEY` is no longer used.
  - New environment variables `BREVO_API_KEY` and `BREVO_SENDER_EMAIL` are required for Brevo configuration. Please update your `.env.local` file accordingly.
- **Codebase Changes**: All email sending logic has been refactored to use the Brevo SDK. Refer to `src/lib/email.ts` for implementation details.

## 🌍 Internationalization Setup

The application supports multiple languages with the following configuration:

1. **Supported Languages:** English (en) and German (de)
2. **Default Language:** German (de)
3. **Translation Files:** Located in `public/locales/`
4. **Language Switching:** Implemented with next-intl and a toggle component
5. **URL Structure:** Language codes are included in the URL (e.g., `/en`, `/de`)

### Adding New Languages

To add additional languages:
1. Create a new translation JSON file in `public/locales/` (e.g., `fr.json` for French)
2. Add the locale to the configuration in `src/i18n/routing.ts`
3. Update the Language Toggle component if needed

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Brevo account (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zexa-auth-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Copy the `.env.example` file to `.env.local` and fill in the values.

   ```bash
   cp .env.example .env.local
   ```

4. **Database Setup**
   ```bash
   # Generate and run migrations
   npm run db:generate
   npm run db:migrate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see your application!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized app routes
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # User dashboard
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── auth/             # Authentication forms
│   ├── landing/          # Landing page components
│   └── ui/               # Reusable UI components
├── db/                   # Database configuration
├── lib/                  # Utility libraries
├── services/             # Business logic services
└── utils/                # Helper functions
└── i18n/                 # Internationalization configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push database migrations to the database
- `npm run db:studio` - Open the Drizzle ORM Studio

## 🔑 Key Features Explained

### Authentication Flow
1. **Registration:** Users sign up with email/password
2. **Email Verification:** Automated email verification process
3. **Login:** Secure session-based authentication

### Internationalization Flow
1. **Locale Detection:** URL-based locale detection with middleware
2. **Translation Loading:** Dynamic loading of translation files
3. **Language Switching:** Client-side locale switching with state persistence
4. **Component Integration:** Better-Auth components with internationalized labels

### Admin Features
- **User Management:** Full CRUD operations on user accounts
- **Role Management:** Assign and modify user roles
- **Security Actions:** Ban users, revoke sessions, delete accounts
- **Audit Trail:** Track user actions and changes

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For support and questions:
- Create an issue in this repository
- Contact Zexa team

---

**Built with ❤️ by Zexa**

Ready to build something amazing? Get started with Zexa Auth Starter today!
