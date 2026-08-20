# AAKSHI — Premium Luxury Jewelry E-commerce Platform

A production-ready, full-stack e-commerce platform for **AAKSHI**, a premium women's fashion jewelry brand specializing in Korean and anti-tarnish jewelry.

## Features

### Customer-Facing
- Premium luxury UI with rose gold, beige, and champagne color palette
- Home page with hero, trust badges, collections, best sellers, reviews, Instagram gallery
- Product pages with image zoom, variants, reviews, and similar products
- Shop page with filters, sorting, and search
- Shopping cart with coupon system and tax/shipping calculation
- Multi-step checkout (Address → Shipping → Payment)
- User authentication (Sign up, Login, OTP verification, Forgot password, Social login ready)
- Customer account dashboard (Profile, Orders, Wishlist, Addresses, Returns, Rewards, Referrals)
- About, Contact (with WhatsApp integration), and Legal pages

### Admin Panel
- Dashboard with analytics and recent orders
- Order management with status updates
- Product management (CRUD, variants, bulk operations)
- Customer management
- Review moderation
- Coupon management
- Return management
- Inventory tracking with low stock alerts

### Backend API
- Express.js REST API with JWT authentication
- Role-based access control (Admin, Manager, Support, Customer)
- Rate limiting, CORS, Helmet security headers
- Razorpay & Stripe payment integration
- PostgreSQL database with Prisma ORM

### SEO & Performance
- Dynamic meta tags and Open Graph
- XML Sitemap and robots.txt
- Schema markup ready
- Image optimization with Next.js Image
- Lazy loading and code splitting
- Core Web Vitals optimized

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, TailwindCSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + NextAuth ready |
| Payments | Razorpay, Stripe, COD |
| Storage | Cloudinary ready |
| Email | Resend ready |
| Search | Algolia ready |
| Hosting | Vercel (Frontend), Railway (Backend) |

## Project Structure

```
aakshi/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # Express.js backend API
├── packages/
│   └── database/     # Prisma schema & client
├── .env.example      # Environment variables template
└── package.json      # Monorepo root
```

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm 9+

### 1. Clone & Install

```bash
git clone <repository-url>
cd aakshi
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your database URL and API keys
```

### 3. Setup Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Start Development

```bash
# Start both frontend and API
npm run dev

# Or individually:
npm run dev:web    # http://localhost:3000
npm run dev:api    # http://localhost:4000
```

### 5. Access the Platform

| Service | URL |
|---------|-----|
| Website | http://localhost:3000 |
| API | http://localhost:4000 |
| Admin Panel | http://localhost:3000/admin |
| Prisma Studio | `npm run db:studio` |

### Default Admin Credentials

```
Email: admin@aakshi.com
Password: Aakshi@Admin2024!
```

> Change the admin password immediately after first login in production.

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set root directory to `apps/web`
3. Add environment variables from `.env.example`
4. Deploy

### Backend (Railway)

1. Create a new Railway project
2. Add PostgreSQL plugin
3. Set root directory to `apps/api`
4. Add environment variables
5. Deploy

### Database

Use Supabase, Railway PostgreSQL, or any managed PostgreSQL provider. Update `DATABASE_URL` in your environment.

## Payment Setup

### Razorpay
1. Create account at [razorpay.com](https://razorpay.com)
2. Get API keys from Dashboard → Settings → API Keys
3. Set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID`

### Stripe
1. Create account at [stripe.com](https://stripe.com)
2. Get keys from Dashboard → Developers → API Keys
3. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Adding Products

### Via Admin Panel
1. Login to `/admin` with admin credentials
2. Navigate to Products → Add Product
3. Upload images, set pricing, categories, and inventory

### Via Database Seed
Edit `packages/database/prisma/seed.ts` and run `npm run db:seed`

### Via API
```bash
curl -X POST http://localhost:4000/api/admin/products \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Product Name","slug":"product-slug","price":999,...}'
```

## Marketing Features (Ready to Connect)

- Email marketing via Resend
- Abandoned cart recovery (database model ready)
- Push notifications (infrastructure ready)
- SMS campaigns (integrate Twilio/MSG91)
- WhatsApp marketing (integrate WhatsApp Business API)
- Referral program (built-in with referral codes)
- Loyalty rewards (reward points system)
- Discount/coupon system (fully functional)

## License

Proprietary — © 2026 AAKSHI. All rights reserved.
