# Srinatha Yoga Shala - Online Yoga School Website

## Project Overview

This is a Next.js website for an online yoga school offering teacher training courses via Zoom for students worldwide.

### Tech Stack
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), Inter (sans)

---

## Pages

### 1. Home Page (`/`)
- Hero section with logo and tagline
- Stats (200k+ lives transformed, 1M+ people, 10+ years)
- Upcoming Programs section with 3 featured courses
- Instagram section
- Meet The Educators section
- Scroll to top button
- WhatsApp widget

### 2. Courses Page (`/courses`)
- 8 Online Teacher Training Courses:
  1. 7 Day Chair Yoga Teacher Training - ₹9,999 / $120
  2. 7 Day Wheel Yoga Teacher Training - ₹9,999 / $120
  3. 21 Days Ashtanga TTC - ₹25,000 / $300
  4. 21 Days Hatha TTC - ₹25,000 / $300
  5. 50 Hour Yin Yoga TTC - ₹18,000 / $220
  6. 200 Hour Yoga TTC - ₹99,000 / $1,200 (Recommended)
  7. 300 Hour Yoga TTC - ₹1,49,000 / $1,800
  8. 85 Hours Prenatal Postnatal Yoga TTC - ₹18,500 / $225
- Category filters (All, Beginner, Teacher Training, Specialized)
- Course cards with ratings, pricing, features
- Meet The Educators section
- Instagram section
- Consistent Footer

### 3. Teachers Page (`/teachers`)
- Hero section
- Team photo section
- Team members with colored backgrounds (10 members)
- Core values section (4 values)
- Join Our Team CTA section
- Footer

### 4. Shop Page (`/shop`)
- Product categories: Books, Apparel, Sound Healing, Mattress & Cushions, Accessories
- 16 products with ratings, prices, descriptions
- Category filter tabs
- Free shipping, easy returns, eco-friendly badges
- Footer

### 5. Dashboard (`/dashboard`)
- Sidebar navigation
- Top bar with profile
- Quick Stats (Hours Practiced, Classes Attended, Current Streak)
- Resume Practice card with video thumbnail
- Course Progress Tracker (200h TTC - 8 modules)
- Upcoming Classes section
- Resources section
- Certificate Preview section
- Footer

### 6. Dashboard - Calendar (`/dashboard/calendar`)
- Week calendar view
- Upcoming classes list
- Week stats (Classes, Practice Time, Live Sessions, Recordings)
- Add to Google Calendar button

### 7. Dashboard - Resources (`/dashboard/resources`)
- Resource categories: Asana Manuals, Chanting Guides, Philosophy, Anatomy & Physiology, Teaching Materials
- Download buttons for each resource
- Search functionality
- Quick filters

### 8. Dashboard - Certificates (`/dashboard/certificates`)
- Completed certificates (with download/share)
- In-progress certificates (with progress bar)
- Achievements badges

### 9. Dashboard - Login (`/dashboard/login`)
- Email/password form
- Remember me checkbox
- Forgot password link
- Sign up link

---

## Components

### Header
- Logo and brand name
- Navigation: Home, Teachers, Courses, Shop, Blogs (placeholder)
- Student Login button
- Mobile responsive hamburger menu

### Footer
- Logo and description
- Quick Links (About, Courses, Teachers, Philosophy, Yoga, Recipes)
- Resources (Youth, Meet The Team, Stories, Blogs, Contact, Workshop Login)
- Newsletter signup
- Contact info (Mysore, Karnataka, India - +91 98865 12083)
- Social links (YouTube, Instagram, Facebook)
- Bottom bar (Copyright, Privacy, Terms, Refund)

---

## SEO

### Metadata
- Page-specific titles, descriptions, keywords
- Open Graph tags
- Twitter Card tags

### Structured Data (JSON-LD)
- YogaSchool schema with:
  - Name, description, URL, logo
  - Phone number and address (Mysore, Karnataka)
  - Social profiles
  - Aggregate rating (4.9, 200k+ reviews)

---

## Features Removed

- Download App section (removed from home page)
- /philosophy broken link (changed to About)
- All app store links and references

---

## CSS Updates

- Border radius increased to 0.75rem (12px) for rounded corners
- Button styles updated to rounded-xl
- Custom scrollbar styling
- Satvic card hover effects

---

## How to Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Notes

- All courses are online (Zoom-based) - no stay/food included
- Website is for international online students
- Separate website exists for offline/in-person students

---

## Last Updated

May 5, 2026