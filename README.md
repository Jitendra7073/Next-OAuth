# Next.js OAuth 2.0 Authentication Setup Guide

A complete authentication solution built with Next.js 16, NextAuth.js, PostgreSQL, Prisma, and shadcn/ui components.

## Features

- **OAuth 2.0 Authentication**: Sign in with GitHub and Google
- **Credentials Authentication**: Traditional email/password login
- **PostgreSQL Database**: Secure data storage with Prisma ORM
- **Beautiful UI**: Custom-designed pages using shadcn/ui components
- **Protected Routes**: Middleware-based route protection
- **Session Management**: JWT-based sessions
- **User Profiles**: Comprehensive user profile pages

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running locally or remotely
- GitHub OAuth App credentials
- Google OAuth App credentials

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The `.env` file is already configured with your credentials:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/chat-app?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_SECRET_KEY="your-github-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_SECRET_ID="your-google-secret"
```

**Important**: Update the `DATABASE_URL` if your PostgreSQL credentials are different.

### 3. Set Up PostgreSQL Database

Make sure PostgreSQL is running and create the database:

```bash
# Using psql
psql -U postgres
CREATE DATABASE "chat-app";
\q
```

### 4. Run Database Migrations

```bash
npx dotenv -e .env -- npx prisma migrate dev --name init
```

This will:

- Create all necessary tables (User, Account, Session, VerificationToken)
- Generate the Prisma Client

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## OAuth Provider Setup

### GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env` file

### Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Configure consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env` file

## Project Structure

```
next-final-application/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   ├── options.ts      # NextAuth configuration
│   │       │   └── route.ts        # NextAuth API route
│   │       └── register/
│   │           └── route.ts        # User registration endpoint
│   ├── auth/
│   │   ├── signin/page.tsx         # Sign in page
│   │   ├── signup/page.tsx         # Sign up page
│   │   ├── signout/page.tsx        # Sign out page
│   │   └── error/page.tsx          # Auth error page
│   ├── profile/page.tsx            # User profile page
│   ├── (admin)/dashboard/          # Protected admin routes
│   └── page.tsx                    # Home page
├── components/
│   └── ui/                         # shadcn components
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Database migrations
├── middleware.ts                   # Route protection
├── prismaClient.ts                 # Prisma client instance
├── next-auth.d.ts                  # NextAuth type definitions
└── .env                            # Environment variables
```

## Database Schema

### User Table

- `id`: Unique identifier (CUID)
- `name`: User's full name
- `email`: User's email (unique)
- `emailVerified`: Email verification timestamp
- `image`: Profile image URL
- `password`: Hashed password (for credentials auth)
- `createdAt`: Account creation date
- `updatedAt`: Last update date

### Account Table

- Links users to OAuth providers
- Stores OAuth tokens and metadata

### Session Table

- Manages user sessions
- JWT-based authentication

### VerificationToken Table

- Email verification tokens
- Token expiration management

## Usage

### Sign Up

1. Navigate to `/auth/signup`
2. Choose:
   - Fill out the registration form (email/password)
   - Or click "GitHub" or "Google" to sign up with OAuth

### Sign In

1. Navigate to `/auth/signin`
2. Choose:
   - Enter your email and password
   - Or click "GitHub" or "Google" to sign in with OAuth

### Protected Routes

Routes protected by authentication:

- `/profile/*` - User profile pages
- `/(admin)/*` - Admin dashboard pages

Unauthenticated users will be redirected to `/auth/signin`

### View Profile

After signing in, click "View Profile" to see:

- User information
- Connected OAuth accounts
- Account creation date
- Profile settings

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx dotenv -e .env -- npx prisma migrate dev

# Generate Prisma Client
npx dotenv -e .env -- npx prisma generate

# Open Prisma Studio (database GUI)
npx dotenv -e .env -- npx prisma studio
```

## Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. Verify PostgreSQL is running
2. Check your DATABASE_URL in `.env`
3. Ensure the database exists
4. Verify user permissions

### OAuth Errors

If OAuth sign-in fails:

1. Verify callback URLs match exactly
2. Check CLIENT_ID and CLIENT_SECRET are correct
3. Ensure OAuth apps are enabled
4. Check NEXTAUTH_URL matches your domain

### Migration Errors

If migrations fail:

```bash
# Reset database (WARNING: deletes all data)
npx dotenv -e .env -- npx prisma migrate reset

# Or manually delete and recreate
npx dotenv -e .env -- npx prisma migrate dev --name init
```

## Security Notes

- Never commit `.env` file to version control
- Use strong NEXTAUTH_SECRET in production
- Enable HTTPS in production
- Regularly update dependencies
- Implement rate limiting for auth endpoints
- Use environment-specific OAuth credentials

## Production Deployment

1. Update `.env` with production values:

   ```env
   DATABASE_URL="your-production-database-url"
   NEXTAUTH_URL="https://yourdomain.com"
   ```

2. Update OAuth callback URLs to production domain

3. Build and deploy:
   ```bash
   npm run build
   npm start
   ```

## Tech Stack

- **Framework**: Next.js 16
- **Authentication**: NextAuth.js 4
- **Database**: PostgreSQL
- **ORM**: Prisma 6
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Support

For issues and questions:

- Check the [NextAuth.js Documentation](https://next-auth.js.org/)
- Review [Prisma Documentation](https://www.prisma.io/docs)
- Check [shadcn/ui Documentation](https://ui.shadcn.com/)

## License

MIT License - feel free to use this for your projects!
