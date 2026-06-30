# 🌊 Kekamiya Beach Resort — Management System

**Next.js · Neon Database · Resend Email**

A modern, full-featured resort management system for Kekamiya Beach Resort, Botolan, Zambales.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Your Neon database connection string |
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | Sender email (must be verified in Resend) |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL |

### 3. Set Up Neon Database
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project → copy the connection string
3. Paste it as `DATABASE_URL` in `.env.local`
4. Tables are auto-created on first API call (see `lib/db.ts`)

### 4. Set Up Resend Email
1. Go to [resend.com](https://resend.com) and create an account
2. Create an API key → paste as `RESEND_API_KEY`
3. Verify your domain or use `onboarding@resend.dev` for testing

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
kekamiya/
├── app/
│   ├── layout.tsx          # Root layout + fonts
│   ├── globals.css         # Global styles + Tailwind
│   ├── page.tsx            # Homepage
│   ├── book/               # Booking page (coming soon)
│   ├── accommodations/     # Rooms page (coming soon)
│   ├── gallery/            # Photo gallery (coming soon)
│   ├── amenities/          # Amenities page (coming soon)
│   ├── contact/            # Contact page (coming soon)
│   └── api/
│       ├── bookings/       # Booking API routes
│       └── contact/        # Contact form API routes
├── components/
│   ├── Navbar.tsx          # Sticky responsive navbar
│   ├── HeroSection.tsx     # Animated beach hero
│   ├── AboutSection.tsx    # Resort overview
│   ├── AmenitiesSection.tsx # Features & facilities
│   ├── AccommodationsSection.tsx # Room cards
│   ├── BookingCTA.tsx      # Booking widget
│   ├── TestimonialsSection.tsx # Guest reviews
│   ├── LocationSection.tsx # Map & directions
│   └── Footer.tsx          # Site footer
├── lib/
│   ├── db.ts               # Neon DB connection
│   └── email.ts            # Resend email utilities
└── public/
    └── images/             # Local assets
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | Ocean blue `#06b4e9` |
| Accent | Sand gold `#f7ae3e` |
| Success | Palm green `#2e9e48` |
| Alert | Coral red `#ff5a42` |
| Display font | Playfair Display |
| Body font | Plus Jakarta Sans |

---

## ✅ Features (Homepage)

- [x] Animated beach hero with palm trees & waves
- [x] About / resort overview section
- [x] Amenities grid (pool, beach, restaurant, etc.)
- [x] Room/accommodation cards with pricing
- [x] Live availability search widget
- [x] Guest testimonials
- [x] Location & directions
- [x] Responsive navbar (transparent → solid on scroll)
- [x] Mobile-friendly layout
- [x] Footer with social links

## 🔜 Coming Next

- [ ] Full booking flow with payment
- [ ] Admin dashboard
- [ ] Gallery page
- [ ] Contact form with email notification
- [ ] Room availability calendar

---

## 🏖️ About the Resort

Kekamiya Beach Resort · Botolan, Zambales · [Facebook](https://facebook.com/kekamiyabeachresort)
