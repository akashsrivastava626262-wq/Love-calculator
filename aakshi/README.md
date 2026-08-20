# AAKSHI — Premium Fashion Jewelry E-Commerce Platform

**Elegance That Adorns Every Girl**

AAKSHI is a full-stack eCommerce platform for a premium fashion jewelry and girls accessories brand, competing with brands like Giva, Kushals, Yellow Chimes, and Voylla.

## Tech Stack

### Frontend (`/frontend`)
- Next.js 15+ (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- ShadCN-style UI components
- Zustand (state management)
- Axios (API client)

### Backend (`/backend`)
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- Razorpay + Stripe payments
- Cloudinary image hosting
- Nodemailer (email)
- Helmet, rate limiting, XSS protection

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and API keys
npm install
npm run seed    # Seed demo data
npm run dev     # http://localhost:5000
```

**Demo Admin:** `admin@aakshi.com` / `admin123`

### Frontend Setup

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev     # http://localhost:3000
```

## Features

### Customer Features
- Luxury homepage with hero slider, categories, best sellers, flash sale
- Product pages with zoom, variants, reviews, FAQ, similar products
- Cart with coupons, tax & shipping calculation
- Checkout with guest/user flow, multiple payment methods
- User accounts with OTP, Google/Facebook login
- Wishlist, order tracking, rewards & referrals
- AI chat support widget
- Smart search & product recommendations

### Admin Panel (`/admin`)
- Dashboard analytics (revenue, orders, conversion)
- Product, order, customer, coupon management
- Banner & inventory management
- Review moderation, refunds, marketing tools

### SEO
- Dynamic meta tags, Open Graph
- Sitemap.xml, robots.txt
- Product & FAQ schema ready

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Shop | `/shop` |
| Product | `/product/[slug]` |
| Categories | `/categories/[slug]` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Account | `/account` |
| Wishlist | `/wishlist` |
| Track Order | `/track-order` |
| Admin | `/admin` |
| About, Contact, Blog, FAQ, Policies | `/about`, `/contact`, etc. |

## Deployment

- **Frontend:** Vercel — set `NEXT_PUBLIC_API_URL` to your backend URL
- **Backend:** Render or AWS — set all env vars from `.env.example`
- **Database:** MongoDB Atlas
- **Images:** Cloudinary CDN

## Brand Colors

| Color | Hex |
|-------|-----|
| Primary | `#FF5CA8` |
| Secondary | `#FFD6E8` |
| Accent | `#D4AF37` |
| Background | `#FFF9FC` |
| Text | `#1F2937` |

## API Endpoints

```
GET  /api/health
POST /api/auth/register, /login, /otp/send, /otp/verify
GET  /api/products, /products/:slug, /products/search
GET  /api/cart, POST /api/cart/add
POST /api/orders, GET /api/orders/track
GET  /api/banners, /api/blogs
POST /api/newsletter, /api/ai-chat
GET  /api/dashboard (admin)
```

## License

Proprietary — AAKSHI Brand
