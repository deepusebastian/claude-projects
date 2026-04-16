# AI Blueprint

Turn your idea into an AI-powered reality. Describe what you want to build and get an instant, actionable blueprint of the exact AI tools and pipeline you need.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js (Credentials + Google OAuth)
- **Database:** SQLite via Prisma ORM
- **Payments:** Stripe Checkout
- **Icons:** Lucide React

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` — from your Stripe dashboard
- `STRIPE_PUBLISHABLE_KEY` — from your Stripe dashboard
- `STRIPE_WEBHOOK_SECRET` — from `stripe listen --forward-to localhost:3000/api/payments/webhook`

### 3. Initialize the database

```bash
npx prisma db push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx              # Landing page
    layout.tsx            # Root layout with navbar
    login/page.tsx        # Login page
    signup/page.tsx       # Signup page
    builder/page.tsx      # Pipeline builder (chat UI)
    dashboard/page.tsx    # User dashboard
    api/
      auth/
        [...nextauth]/    # NextAuth handler
        register/         # User registration
      blueprints/         # CRUD for blueprints
      payments/
        create-checkout/  # Stripe checkout session
        webhook/          # Stripe webhook handler
  components/
    Button.tsx            # Reusable button
    Navbar.tsx            # Top navigation
    PipelineCard.tsx      # Blueprint pipeline display
    Providers.tsx         # NextAuth session provider
    ToolLogo.tsx          # AI tool logo badge
  data/
    ai-tools.ts           # AI tool catalog (16 tools)
    pipelines.ts          # Pipeline scenarios & classifier
  lib/
    auth.ts               # NextAuth config
    db.ts                 # Prisma client
    stripe.ts             # Stripe client
    utils.ts              # Utility functions
prisma/
  schema.prisma           # Database schema
```

## Features

- **Chat-based builder** — describe your idea, get an AI tool pipeline
- **16 AI tools** — spanning LLMs, image/video/audio gen, automation, frameworks, and vector DBs
- **5 scenario templates** — e-commerce, content, SaaS, research, and general
- **Free tier** — first blueprint is free, $2.99 per additional blueprint
- **User auth** — email/password and Google OAuth
- **Dashboard** — saved blueprints, account settings, payment management
- **Stripe payments** — checkout sessions with webhook handling

## Deployment

This project is ready to deploy on Vercel:

```bash
npx vercel
```

For production, switch the database from SQLite to PostgreSQL by updating `prisma/schema.prisma` and your `DATABASE_URL`.
