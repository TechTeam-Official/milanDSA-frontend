# 🎭 MILAN 2026 - Official Website

**National Cultural Festival of SRM Institute of Science and Technology**

A modern, interactive Next.js web application showcasing MILAN 2026, featuring event management, team showcases, gallery exploration, and integrated payment systems.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Key Features Documentation](#key-features-documentation)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

MILAN 2026 is a comprehensive web platform designed for the annual cultural festival at SRMIST. The application provides:

- **Event Management**: Browse, register, and manage festival events
- **Team Showcase**: Interactive 3D globe visualization of organizing teams
- **Explore Gallery**: Draggable canvas with circular image placement
- **Authentication**: Google OAuth integration via Supabase
- **Payment Integration**: Konfuhub for event registrations and passes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

---

## ✨ Features

### 🏠 Home Page
- Hero section with custom animations
- Introduction to MILAN festival
- Poster generator for social sharing
- Directors and managers showcase
- Timeline of MILAN history
- Guest showcase section

### 🎪 Events
- Browse all festival events
- Event registration system
- Event details with rulebook downloads
- Category-based filtering
- Responsive card-based layout

### 👥 Teams
- Interactive 3D globe with team markers
- Team member profiles with roles
- Smooth animations and transitions
- Responsive team listing
- Touch-optimized for mobile

### 🖼️ Explore Gallery
- **Circular Placement Algorithm**: Dynamic concentric ring layout
- **Draggable Canvas**: Pan and zoom functionality
- **Full-size Images**: Display at actual dimensions
- **Infinite Scroll**: Smooth exploration experience
- **Hashtag System**: Trending tags and filtering
- **Upload Feature**: Community-driven content

### 🎟️ Passes & Payments
- Digital pass generation
- QR code integration
- Konfuhub payment gateway
- Payment verification system
- Pass download functionality

### 🔐 Authentication
- Google OAuth 2.0
- Supabase authentication backend
- Protected routes
- User session management

### 📱 Responsive Design
- Mobile-first approach
- Optimized navbar and footer
- Touch-friendly interactions
- Adaptive layouts

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **React**: 19.2.0
- **TypeScript**: ^5
- **Styling**: Tailwind CSS 4
- **Animations**: 
  - Framer Motion (^12.23.24)
  - GSAP (^3.13.0)
  - Lenis (smooth scroll)

### 3D Graphics
- **Three.js** (^0.182.0) - Globe visualization

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Component library
- **Lucide React** - Icon set

### Backend & Database
- **Supabase** - Authentication, Database, Storage
- **PostgreSQL** - Database (via Supabase)

### Payment
- **Konfuhub** - Payment gateway integration

### Additional Tools
- **Nodemailer** - Email notifications
- **Puppeteer** - PDF/poster generation
- **QR Code Generator** - Pass validation
- **JWT** - Token management
- **UUID** - Unique identifiers

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm/yarn
- **Supabase Account** ([Create one](https://supabase.com))
- **Google Cloud Project** (for OAuth)
- **Konfuhub Account** (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd milanDSA-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Email Settings (Nodemailer)
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_app_password
   
   # Base URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Konfuhub (optional, for payments)
   KONFUHUB_KEY_ID=your_konfuhub_key_id
   KONFUHUB_KEY_SECRET=your_konfuhub_key_secret
   ```

4. **Configure Supabase**
   
   See [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md) for detailed Google OAuth setup.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
milanDSA-frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── explore/              # Explore gallery API
│   │   ├── passes/               # Digital passes API
│   │   ├── check-payment/        # Payment verification
│   │   └── webhooks/             # Payment webhooks
│   ├── checkout/                 # Payment checkout page
│   ├── event-register/           # Event registration
│   ├── events/                   # Events listing
│   ├── explore/                  # Gallery page
│   ├── gallery/                  # Photo gallery
│   ├── login/                    # Login page
│   ├── passes/                   # Digital passes
│   ├── sponsors/                 # Sponsors page
│   ├── team/                     # Team showcase
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── event/                    # Event-related components
│   ├── explore/                  # Explore gallery components
│   ├── intro/                    # Intro animation
│   ├── sponsors/                 # Sponsor components
│   ├── teams/                    # Team components
│   ├── navbar.tsx                # Navigation bar
│   ├── footer.tsx                # Footer
│   ├── hero.tsx                  # Hero section
│   ├── draggable-canvas.tsx      # Canvas for explore page
│   ├── team-sphere.tsx           # 3D globe component
│   └── ...                       # Other components
│
├── lib/                          # Utility functions
│   ├── database.types.ts         # Supabase types
│   ├── circular-placement.ts     # Image placement algorithm
│   └── ...                       # Other utilities
│
├── context/                      # React Context
│   └── auth-context.tsx          # Authentication context
│
├── types/                        # TypeScript definitions
│
├── public/                       # Static assets
│   ├── Rulebooks/                # Event rulebooks
│   └── ...                       # Images, fonts, etc.
│
├── supabase/                     # Supabase configuration
│   └── migrations/               # Database migrations
│
├── scripts/                      # Utility scripts
│
├── .env.local                    # Environment variables (create this)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── GOOGLE_AUTH_SETUP.md          # Google OAuth guide
└── EXPLORE_NEW_IMPLEMENTATION.md # Explore feature docs
```

---

## ⚙️ Configuration

### Next.js Configuration

The `next.config.ts` includes:
- Image domain whitelisting for Supabase storage
- Experimental features for performance optimization

### Tailwind CSS

Custom configuration with:
- Custom fonts: `StampPress`, `Foglihten`
- Extended color palette
- Custom animations
- Responsive breakpoints

### TypeScript

Strict mode enabled with path aliases:
- `@/` maps to root directory for clean imports

---

## 🎨 Key Features Documentation

### 1. Explore Gallery - Circular Placement

**See**: [EXPLORE_NEW_IMPLEMENTATION.md](./EXPLORE_NEW_IMPLEMENTATION.md)

The Explore page features a unique circular placement algorithm:

- **Dynamic Layout**: Images arranged in concentric rings
- **Full-size Display**: Uses actual image dimensions
- **Interactive Canvas**: 
  - Pan: Click & drag / Touch & swipe
  - Zoom: Mouse wheel (30%-300%)
  - Reset: Button to return to center
- **Alternating Direction**: Clockwise → Counter-clockwise rings
- **Overlap Prevention**: Intelligent spacing algorithm
- **Random Center**: Different layout on each visit

**Technologies**: 
- Custom placement algorithm
- GPU-accelerated transforms
- Next.js Image optimization
- Framer Motion animations

### 2. Team Sphere - 3D Globe

Interactive globe showcasing team members:

- **Three.js Integration**: Realistic 3D globe rendering
- **Interactive Markers**: Clickable team member locations
- **Smooth Rotations**: GSAP-powered animations
- **Touch Support**: Mobile-optimized interactions
- **Team Details**: Pop-up cards with member information

### 3. Authentication System

**See**: [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)

Google OAuth integration:

1. **Google Cloud Setup**: OAuth 2.0 client configuration
2. **Supabase Provider**: Enable Google authentication
3. **Redirect URLs**: Configure allowed callbacks
4. **Session Management**: Persistent user sessions
5. **Protected Routes**: Route guards for authenticated pages

### 4. Payment Integration

Konfuhub payment flow:

1. User selects event/pass
2. Checkout page with payment details
3. Konfuhub modal integration
4. Payment verification webhook
5. Pass generation with QR code
6. Email notification

### 5. Event Registration

Complete registration workflow:

- Browse events with filters
- View event details and rulebooks
- Registration form with validation
- Payment processing
- Confirmation email
- Registration details page

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/google` - Google OAuth callback
- `GET /api/auth/session` - Get current session
- `POST /api/auth/logout` - End session

### Explore Gallery
- `GET /api/explore/posts` - Fetch all gallery posts
- `POST /api/explore/upload` - Upload new image
- `DELETE /api/explore/delete` - Remove post

### Passes
- `POST /api/passes/generate` - Create digital pass
- `GET /api/passes/[id]` - Retrieve pass details
- `POST /api/passes/validate` - Validate QR code

### Payments
- `POST /api/check-payment` - Verify payment status
- `POST /api/webhooks/konfuhub` - Payment webhook

---

## 🏗️ Deployment

### Docker Deployment

Using the included Dockerfile:

```bash
# Build image
docker build -t milan-frontend .

# Run container
docker run -p 3000:3000 milan-frontend
```

Or use Docker Compose:

```bash
docker-compose up -d
```

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
EMAIL_USER=
EMAIL_PASS=
NEXT_PUBLIC_BASE_URL=https://your-domain.com
KONFUHUB_KEY_ID=
KONFUHUB_KEY_SECRET=
```

---

## 📱 Mobile Optimization

The application is fully responsive with specific optimizations:

- **Navbar**: Hamburger menu with icon
- **Footer**: Condensed layout for small screens
- **Teams Page**: Touch-optimized scrolling
- **Explore Canvas**: Swipe gestures
- **Forms**: Touch-friendly inputs
- **Images**: Lazy loading and optimization

---

## 🧪 Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

---

## 🤝 Contributing

### Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind CSS for styling
- Add comments for complex logic
- Keep components small and focused

### Commit Guidelines

- Use descriptive commit messages
- Reference issue numbers
- Keep commits atomic

### Pull Requests

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 🐛 Troubleshooting

### Build Errors

**Issue**: "Module not found"
- **Solution**: Check import paths, ensure `@/` alias works
- Run `npm install` to ensure dependencies are installed

**Issue**: TypeScript errors
- **Solution**: Run `npm run build` to see all errors
- Check `tsconfig.json` paths configuration

### Authentication Issues

**Issue**: "Provider is not enabled"
- **Solution**: Enable Google OAuth in Supabase Dashboard
- See [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)

**Issue**: "redirect_uri_mismatch"
- **Solution**: Verify callback URL in Google Cloud matches Supabase
- Check allowed redirect URLs in Supabase settings

### Performance Issues

**Issue**: Slow page loads
- **Solution**: 
  - Optimize images (compress before upload)
  - Enable Next.js Image optimization
  - Check network tab for large assets

**Issue**: Canvas lag on Explore page
- **Solution**:
  - Reduce number of images
  - Disable animations temporarily
  - Check browser console for errors

### Database Issues

**Issue**: Supabase connection fails
- **Solution**:
  - Verify environment variables
  - Check Supabase project status
  - Ensure correct URL and anon key

**Issue**: Migration errors
- **Solution**: Check `supabase/migrations/` folder
- Run migrations manually via Supabase Dashboard

---

## 📚 Additional Documentation

- **[GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)** - Complete Google OAuth setup guide
- **[EXPLORE_NEW_IMPLEMENTATION.md](./EXPLORE_NEW_IMPLEMENTATION.md)** - Explore gallery technical details

---

## 📞 Support

For issues or questions:

- **Technical Team**: techteam.sa@srmist.edu.in
- **Documentation**: Check the guides in the repository
- **Issues**: Open a GitHub issue

---

## 📄 License

This project is proprietary and confidential. All rights reserved by SRM Institute of Science and Technology - Student Activities.

---

## 🎉 Acknowledgments

- **SRM Institute of Science and Technology**
- **Student Activities - Technical Team**
- **MILAN Organizing Committee**
- **Open Source Community** for the amazing tools and libraries

---

**Built with ❤️ for MILAN 2026**

*Last Updated: February 2026*
