# Srinatha Yoga School — Project Documentation

Last updated: May 26, 2026
Stack: Next.js 16.2.4 + Supabase + Turbopack

---

## 1. Architecture Overview

```
WEBSITE (public, marketing - no auth needed)
  ├── /                  Home page
  ├── /about             About the school
  ├── /teachers          Teacher profiles
  ├── /courses           Course listings (browse only)
  ├── /shop              Product listings (browse only)
  ├── /contact           Contact form
  ├── /search            Search across courses/products/workshops
  ├── /privacy           Privacy policy
  ├── /terms             Terms of use
  ├── /refund            Refund policy
  ├── /cart              Shopping cart (public)
  └── /checkout          Redirects to /dashboard/checkout (protected by proxy)

WEBAPP (dashboard - login required, auth-protected by proxy)
  ├── /dashboard                  Main dashboard (mobile app style, 5 tabs)
  │   ├── Home tab                Course progress, quick stats
  │   ├── Learn tab               Enrolled courses
  │   ├── Workshops tab           Available workshops
  │   ├── Store tab               Products from DB
  │   └── Profile tab             User profile, enrollments, orders, saved items
  ├── /dashboard/login            Email/password + Magic Link login
  ├── /dashboard/signup           Create account
  ├── /dashboard/forgot-password  Reset password
  ├── /dashboard/reset-password   Set new password
  ├── /dashboard/checkout         CHECKOUT HAPPENS HERE (auto-fills profile + address)
  ├── /dashboard/orders           All past purchases (courses + products)
  ├── /dashboard/calendar         Upcoming workshop schedule
  ├── /dashboard/certificates     Completed courses (download disabled - coming soon)
  ├── /dashboard/resources        TTC learning resources
  └── /dashboard/courses/[id]     Course detail page with "Enroll Now" → cart → checkout
```

### Key Distinction
- **Website** = marketing, browsing, cart. All public.
- **Webapp** = all purchases, learning, user data. Login required.
- **Checkout** = inside webapp (`/dashboard/checkout`). Protected by auth proxy. Auto-fills user name/phone/address from profile + saved shipping addresses.
- **Old public `/checkout`** = now redirects to `/dashboard/checkout` (proxy handles auth)`
- **Cart** = React Context + localStorage. Survives page refresh. Shared across website and webapp on same domain.

---

## 2. Supabase Database (18 tables)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User accounts | id, email, name, phone, avatar_url, role (student/admin) |
| `categories` | Product/course categories | id, name, slug, type, image |
| `courses` | Yoga courses | id, title, subtitle, description, price, instructor, level, duration, image, rating, certificate_eligible, published |
| `lessons` | Course lessons | id, course_id, title, description, video_url, duration_seconds, order_index |
| `products` | Shop products | id, title, description, price, image, category, rating, stock |
| `workshops` | Workshops/events | id, title, description, price, start_date, end_date, format, location, image |
| `orders` | Purchase records | id, user_id, total, status, shipping_address_id |
| `order_items` | Items in each order | id, order_id, product_id/course_id/workshop_id, price |
| `enrollments` | Course enrollment | id, user_id, course_id, progress, started_at |
| `lesson_progress` | Per-lesson completion | id, user_id, lesson_id, course_id, completed, watched_seconds |
| `workshop_registrations` | Workshop signups | id, user_id, workshop_id, status, registered_at |
| `shipping_addresses` | Saved delivery addresses | id, user_id, name, phone, address, city, state, pincode, country |
| `saved_items` | Bookmarked items | id, user_id, item_type, item_id |
| `wishlist_items` | Product wishlist | id, user_id, product_id |
| `notifications` | User notifications | id, user_id, title, message, read, created_at |
| `ttc_resources` | TTC learning materials | id, title, type, file_url, description, created_at |
| `ttc_enrollments` | TTC program enrollment | id, user_id, course, status, created_at |
| `contact_messages` | Contact form submissions | id, name, email, subject, message, created_at |

### RLS (Row Level Security)
- Users can only see their own data (orders, enrollments, profile, etc.)
- Admins have full access via `role = 'admin'` check (RLS policies exist for all tables)
- Admin UI not built yet — pending client decision

---

## 3. Purchase Flow (Course + Product)

### Login Required
Every purchase requires login. No guest checkout.

```
/shop → Add to Cart → /cart → "Proceed to Checkout"
                                    ↓
                          Proxy checks auth
                                    ↓
                    Not logged in? → /dashboard/login?redirect=/dashboard/checkout
                                    ↓
                         /dashboard/checkout
                                    ↓
                    Name + phone auto-filled from profile
                    Address auto-filled from last saved shipping_addresses
                                    ↓
                    If cart has products → address form shown (editable)
                    If cart has only courses → address form hidden
                                    ↓
                    Click "Pay" → bypasses Razorpay → saves order
                                    ↓
                    "Payment Successful!" → redirects to /dashboard/orders
```

### What gets saved in Supabase per purchase:
- `orders` — order record (user_id, total, status='completed', shipping_address_id)
- `order_items` — each item (product_id or course_id or workshop_id, price)
- For courses: `enrollments` — enrollment record (user_id, course_id, progress=0)
- For workshops: `workshop_registrations` — registration record
- For products: `shipping_addresses` — saved for future auto-fill

### Payment Gateway
- **Currently bypassed** — Razorpay code exists but is not active
- "Pay" button calls `saveOrder('completed')` directly
- Shows green "Payment Successful!" banner then redirects to orders page
- Can be connected to real Razorpay later by adding keys to `.env.local`:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID`

---

## 4. Auth System

| Feature | Status | Details |
|---------|--------|---------|
| Email/password signup | ✅ Working | `signUpWithEmail()` in `lib/auth.ts` |
| Email/password login | ✅ Working | `signInWithEmail()` |
| Password reset | ✅ Working | Forgot + reset password flow |
| Magic Link (passwordless) | ✅ Working | `signInWithOtp()` in `lib/auth.ts` — user enters email, clicks link from inbox |
| Profile auto-creation | ✅ DB trigger | When user signs up, profile created via `handle_new_user` trigger |
| Session persistence | ✅ Working | Supabase SSR cookies |
| Auth context | ✅ `AuthProvider` | `components/auth-provider.tsx`, wraps root via `components/providers.tsx` |

---

## 5. Auth — Magic Link (Passwordless Login)

Google OAuth was replaced with Magic Link because Google Cloud Console requires a credit card and manual OAuth credential setup. Magic Link is free, instant, and requires no configuration beyond what Supabase provides out of the box (email service enabled by default on free tier).

### How it works
1. User enters email on login page
2. Clicks "Send Magic Link"
3. Supabase sends OTP email via built-in email service
4. User clicks link in inbox → automatically logged in

### Code
- `signInWithOtp()` in `lib/auth.ts` calls `supabase.auth.signInWithOtp()`
- Magic Link button on `/dashboard/login` page
- No additional setup needed

---

## 6. Key Libraries & Packages

| Package | Purpose |
|---------|---------|
| next 16.2.4 | Framework |
| @supabase/supabase-js | Database client |
| @supabase/ssr | Server-side auth |
| lucide-react | Icons |
| tailwindcss | Styling |
| framer-motion | ❌ REMOVED — replaced with CSS animation classes |

### Dead Code Removed
- `components/theme-provider.tsx`
- `hooks/use-toast.ts`
- `lib/supabase-admin.ts`
- `hooks/use-mobile.ts`
- 55 unused shadcn UI components
- 144 unused npm packages
- framer-motion (saves ~31KB gzipped)
- 42 unused data entries in `lib/app-data.ts`

---

## 7. CSS Animation System

All animations use CSS classes (no framer-motion):

| Class | Effect |
|-------|--------|
| `animate-fade-in` | Simple fade in |
| `animate-fade-in-up` | Fade in + slide up |
| `animate-fade-in-left` | Fade in + slide from left |
| `animate-fade-in-right` | Fade in + slide from right |

Usage: `<div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>`

---

## 8. Color Palette

| Usage | Value |
|-------|-------|
| Primary | `#264020` |
| Background | `#FAF8F5` |
| Border | `#E5E5E5` |
| Text on primary | White |
| Hover state | `#3a5a30` |

---

## 9. Pending Work

| Priority | Item | Notes |
|----------|------|-------|
| Blocked | **Certificate PDF generation** | Download buttons disabled with "Coming Soon" tooltip |
| Client to provide | **Real school photos** | Currently 69+ hardcoded Unsplash placeholder URLs |
| Client to provide | **Lesson video URLs** | Course player shows placeholder — needs actual video URLs in DB |
| Client to provide | **Real social links** | Instagram + Facebook updated. No YouTube. WhatsApp link pending. |
| Nice to have | **Order tracking** | No shipment status tracking for physical products |

---

## 10. Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://mdrvawvkeuuzzzuohawt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-ga-measurement-id  # OPTIONAL
```

---

## 11. Build & Run Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server with Turbopack
npm run build        # Production build (30 routes, ~10s)
npm start            # Start production server
```

---

## 12. Key Files Reference

| File | What it does |
|------|-------------|
| `lib/supabase-queries.ts` | All DB query functions (getOrders, getCourses, getEnrollments, etc.) |
| `lib/auth.ts` | Auth functions (signUp, signIn, signInWithGoogle, getProfile, etc.) |
| `lib/utils.ts` | Utility functions (cn, formatPrice) |
| *(merged into supabase-queries.ts)* | Transforms DB types to UI types with caching |
| `lib/supabase.ts` | Supabase client creation (browser + server) |
| `components/auth-provider.tsx` | React Context for auth state |
| `components/cart/cart-context.tsx` | Cart state management (React Context + localStorage) |
| `components/providers.tsx` | Wraps app with AuthProvider + CartProvider |
| `components/header.tsx` | Shared site header |
| `components/footer.tsx` | Shared site footer |
| `app/dashboard/checkout/page.tsx` | **Final checkout page** inside webapp |
| `app/dashboard/page.tsx` | Main dashboard (5-tab mobile app layout) |
| `app/learn/[courseId]/page.tsx` | Course player with "Mark Complete" |
| `app/dashboard/courses/[courseId]/page.tsx` | Course detail + "Enroll Now" |
| `proxy.ts` | Auth guard for /dashboard and /checkout paths |
| `supabase/migrations/001_initial_schema.sql` | Full DB schema (idempotent) |
| `scripts/seed.mjs` | Seeds sample data (categories, courses, products, workshops) |

---

## 13. Key Design Decisions

1. **Checkout inside webapp** — All purchases require login. No guest checkout. Profile + address auto-fill from saved data.
2. **Payment bypassed** — Razorpay code exists but inactive. Pay button creates orders directly. No fake orders were ever created (security decision).
3. **Cart uses localStorage** — Survives refresh. No DB needed for ephemeral cart state.
4. **CSS animations** — framer-motion removed, replaced with Tailwind animation classes. Zero JS runtime cost.
5. **Single formatPrice** — Extracted to `lib/utils.ts` (was duplicated 5 times across files).
6. **getOrders N+1 fixed** — Single batched query with joins instead of per-order queries.
7. **maybeSingle** — Used in enrollment/lesson-progress queries to prevent 500 errors when no row exists.
8. **typescript.ignoreBuildErrors** — Kept enabled because lucide-react ships without .d.ts (upstream issue, not our code).
9. **Magic Link over Google OAuth** — Google required credit card for setup; Magic Link is free, instant, no config needed.
10. **proxy.ts over middleware.ts** — Next.js 16 renamed the convention; middleware.ts → proxy.ts to eliminate build warning.

---

## 14. Social Media (Footer)

| Platform | URL | Status |
|----------|-----|--------|
| Instagram | https://www.instagram.com/yogawithsrinatha/ | ✅ Set |
| Facebook | https://www.facebook.com/yogawithsrinath/ | ✅ Set |
| YouTube | Not available | ❌ Removed from footer |
| WhatsApp | Not yet linked | Pending |
