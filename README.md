#  John Tor Tsuwa - Academic Website

Academic website and consultancy portal for  John Tor Tsuwa, specializing in Political Science, Peace Studies, Conflict Resolution, Governance, and Security Studies.

## Prerequisites

- Node.js 18+ or 20+
- pnpm package manager
- Supabase account
- Resend account (for email notifications)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `RESEND_API_KEY` - Your Resend API key for email
- `SENDER_EMAIL` - Email address for sending notifications (must be verified in Resend)
- `NEXT_PUBLIC__EMAIL` - 's email to receive contact notifications

### 3. Database Setup

Ensure your Supabase database has these tables:

**contact_messages**
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message_type TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**consultancy_leads**
```sql
CREATE TABLE consultancy_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  service_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**profiles**
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build & Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Production Deployment

### Pre-deployment Checklist

- [ ] All environment variables set in production
- [ ] Sender email verified in Resend
- [ ] Supabase database tables created
- [ ] Admin user created with `is_admin = true` in profiles table
- [ ] Build passes without errors (`pnpm build`)
- [ ] Test contact form submission
- [ ] Test consultancy inquiry submission
- [ ] Verify email notifications work
- [ ] Test admin login and dashboard access

### Deployment Notes

1. **Rate Limiting**: Currently using in-memory rate limiting. For production with multiple instances, consider using Redis or similar.

2. **Images**: Update `next.config.mjs` to include additional image domains if needed.

3. **Security Headers**: Already configured in `next.config.mjs`.

4. **Admin Access**: First admin user must be manually set in Supabase by setting `is_admin = true` in the profiles table.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── admin/           # Admin dashboard
│   └── */               # Public pages
├── components/          # React components
├── lib/                 # Utility functions
├── config/             # Site configuration
├── public/             # Static assets
└── middleware.ts       # Auth middleware
```

## Features

- ✅ Contact form with validation
- ✅ Consultancy inquiry system
- ✅ Admin dashboard for managing content
- ✅ Rate limiting on forms
- ✅ Email notifications via Resend
- ✅ SEO optimized (sitemap, robots.txt, metadata)
- ✅ Custom 404 and error pages
- ✅ Security headers configured
- ✅ Protected admin routes

## Support

For issues or questions, contact the development team.
