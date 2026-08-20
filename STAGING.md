# AAKSHI Staging Environment — Testing Guide

## Staging URLs

| Environment | URL | Status |
|-------------|-----|--------|
| **Live Full-Stack (Dev)** | https://temporal-heaven-tide-animation.trycloudflare.com | Active while Cloud Agent session runs |
| **GitHub Pages (Static UI)** | https://akashsrivastava626262-wq.github.io/Love-calculator/ | Deployed via GitHub Actions |
| **Backend API (Render)** | https://aakshi-api-staging.onrender.com/api | Deploy via Render Blueprint (see below) |

> **Note:** The Cloudflare tunnel URL is temporary for this review session. GitHub Pages is the permanent staging frontend. Connect Render for a permanent backend API.

---

## Admin Panel Access

| Field | Value |
|-------|-------|
| **URL** | `{STAGING_URL}/admin` |
| **Email** | `admin@aakshi.com` |
| **Password** | `admin123` |

Example: https://akashsrivastava626262-wq.github.io/Love-calculator/admin/

---

## Test User Credentials

| Role | Email | Phone | Password |
|------|-------|-------|----------|
| **Customer** | `test@aakshi.com` | `9876543210` | `test123` |
| **Admin** | `admin@aakshi.com` | — | `admin123` |

### OTP Login (Staging)
- Use phone `9876543210` → OTP is logged in backend console (email/SMS stubs in staging)
- Or register a new account at `/account`

### Social Login (Staging)
- Google/Facebook buttons use demo social auth stubs for testing

---

## Payment Gateway — Sandbox / Test Mode

Payments run in **stub mode** on staging until you add your own keys. COD always works for end-to-end order flow testing.

### Razorpay (Test Mode)
1. Create a free account at https://dashboard.razorpay.com/
2. Enable **Test Mode** (toggle in dashboard)
3. Go to **Settings → API Keys** and generate test keys
4. Add to backend env:
   - `RAZORPAY_KEY_ID` = `rzp_test_xxxxxxxx`
   - `RAZORPAY_KEY_SECRET` = your test secret
5. Add to frontend env:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = same test key ID

**Razorpay test cards:**
| Card Number | Result |
|-------------|--------|
| `4111 1111 1111 1111` | Success |
| `4000 0000 0000 0002` | Failure |

**Test UPI:** `success@razorpay` (success) / `failure@razorpay` (failure)

### Stripe (Test Mode)
1. Dashboard: https://dashboard.stripe.com/test/apikeys
2. Add to backend:
   - `STRIPE_SECRET_KEY` = `sk_test_...`
3. **Test card:** `4242 4242 4242 4242`, any future expiry, any CVC

### Cash on Delivery (COD)
- No keys required — select COD at checkout for full order flow testing

---

## Test Coupons

| Code | Discount | Min Order |
|------|----------|-------------|
| `WELCOME20` | 20% off (max ₹500) | ₹499 |
| `AAKSHI10` | 10% off (max ₹200) | ₹299 |
| `FLAT100` | Flat ₹100 off | ₹599 |

---

## Deploy Permanent Staging Backend (Render)

One-click deploy (free tier):

1. Open: https://render.com/deploy?repo=https://github.com/akashsrivastava626262-wq/Love-calculator
2. Connect your GitHub account and select branch `cursor/aakshi-ecommerce-2b88`
3. Render reads `render.yaml` and creates `aakshi-api-staging` with in-memory MongoDB + auto-seed
4. After deploy, API URL: `https://aakshi-api-staging.onrender.com/api/health`

Then update frontend `NEXT_PUBLIC_API_URL` in GitHub Actions workflow to match.

---

## Feature Testing Checklist

### Homepage
- [ ] Hero slider auto-rotates with CTAs (Shop Now, Best Sellers, New Arrivals)
- [ ] Trending categories grid loads
- [ ] Best sellers & new arrivals sections
- [ ] Flash sale countdown timer
- [ ] Instagram gallery, reviews, brand story
- [ ] Newsletter subscription form
- [ ] AI chat widget (bottom-right pink button)

### Shop & Products
- [ ] `/shop` — filter by collection (`?collection=korean`)
- [ ] Product page — image zoom, color/size variants
- [ ] Add to cart, wishlist heart icon
- [ ] Similar products section
- [ ] Reviews & FAQ tabs

### Cart & Checkout
- [ ] Add/remove items, update quantity
- [ ] Apply coupon `WELCOME20`
- [ ] Tax & shipping calculated
- [ ] Guest checkout with address form
- [ ] Payment method selection (COD for easiest test)
- [ ] Order confirmation → track order page

### Account
- [ ] Login with `test@aakshi.com` / `test123`
- [ ] OTP login flow
- [ ] Wishlist sync
- [ ] Order history, rewards page

### Admin (`/admin`)
- [ ] Dashboard stats load
- [ ] Product management table
- [ ] Login as `admin@aakshi.com` / `admin123`

### SEO
- [ ] `/sitemap.xml` and `/robots.txt` accessible
- [ ] Page meta titles in browser tab

### Mobile
- [ ] Responsive layout on phone viewport
- [ ] Mobile hamburger menu

---

## Local Development

```bash
# Backend (in-memory DB + auto-seed)
cd backend && npm run staging

# Frontend
cd frontend && npm run dev

# Open http://localhost:3000
```

---

## Production Launch Checklist (After Your Approval)

1. Purchase domain (e.g. `aakshi.com`)
2. Deploy frontend to Vercel with production env vars
3. Deploy backend to Render/AWS with MongoDB Atlas
4. Add production Razorpay/Stripe keys
5. Configure Cloudinary for product images
6. Set up SMTP for transactional emails
7. Point domain DNS to Vercel
8. Enable HTTPS on all services

---

## Support

Staging issues: support@aakshi.com (configure in production)
