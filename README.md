# VORTX - Premium Creative Technology Studio

![VORTX](https://img.shields.io/badge/VORTX-Premium%20Tech%20Studio-blue)
![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-38B2AC?logo=tailwind-css)

A stunning, award-winning website for VORTX - a fictional global technology company specializing in AI solutions, web development, creative design, and next-generation software systems.

## 🌟 Features

### Design & UX
- **Immersive Hero Section** - Full-screen video background with glassmorphic elements
- **Octagonal Clip-Path Buttons** - Custom-designed button system with unique cut corners
- **Staggered Entrance Animations** - Smooth fade-up animations on scroll reveal
- **Premium Loading Screen** - Animated logo reveal with progress indicator
- **Scroll Progress Bar** - Gradient progress indicator showing page scroll position
- **Scroll-to-Top Button** - Smooth navigation helper with hover glow effects
- **Glassmorphism UI** - Frosted glass aesthetic with backdrop blur effects
- **Responsive Design** - Fully optimized for all devices and screen sizes

### Sections
1. **Hero** - Full-screen immersive introduction with background video
2. **About** - Company mission, vision, and core values
3. **Services** - 6 comprehensive service offerings with technology stacks
4. **Featured Projects** - 6 detailed case studies with real metrics and outcomes
5. **Process** - 7-step methodology from discovery to support
6. **Technology Stack** - Categorized showcase of tools and frameworks
7. **Testimonials** - 6 authentic client reviews from international leaders
8. **Statistics** - Key metrics showing company scale and impact
9. **FAQ** - Expandable accordion with common questions
10. **Contact** - Full contact form, business information, and newsletter signup
11. **Footer** - Comprehensive sitemap and legal links

### Technical Excellence
- **React 19** - Latest React features and optimizations
- **TypeScript** - Type-safe codebase for reliability
- **Framer Motion** - Premium animation library for smooth interactions
- **Tailwind CSS 4** - Utility-first styling with custom theme
- **Vite** - Lightning-fast build tool and dev server
- **SEO Optimized** - Semantic HTML and proper meta tags
- **Accessible** - WCAG compliant with keyboard navigation
- **Performance** - Optimized bundle size and lazy loading

## 🎨 Design System

### Colors
- **Background**: Pure black (#000000)
- **Primary Text**: White with varying opacity levels
- **Accent Gradients**: Blue, purple, pink, cyan combinations
- **Borders**: White with 10-20% opacity for glassmorphic effect

### Typography
- **Font Family**: Inter (300-900 weights)
- **Headings**: 3xl to 7xl responsive scale
- **Body**: Base to xl with relaxed line-height
- **Tracking**: -0.04em for headings, 0.3-0.4em for labels

### Spacing
- **Sections**: 32-40 units padding (py-32 md:py-40)
- **Content**: 6-10 units horizontal padding
- **Gaps**: 6-24 units between elements
- **Rounded Corners**: 2xl (16px) consistently

### Animations
- **Easing**: cubic-bezier(0.16, 1, 0.3, 1) for smooth motion
- **Duration**: 0.3s to 0.8s based on element size
- **Delays**: Staggered 0.1s increments for sequential reveals
- **Hover**: 300-500ms transitions with glow effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Full-screen hero section (LOCKED)
│   ├── About.tsx             # Mission, vision, values
│   ├── Services.tsx          # Service offerings
│   ├── Projects.tsx          # Case studies
│   ├── Process.tsx           # Methodology steps
│   ├── Technologies.tsx      # Tech stack showcase
│   ├── Testimonials.tsx      # Client reviews
│   ├── Statistics.tsx        # Key metrics
│   ├── FAQ.tsx               # Questions accordion
│   ├── Contact.tsx           # Contact form & info
│   ├── Footer.tsx            # Site footer
│   ├── LoadingScreen.tsx     # Initial loader
│   ├── ScrollProgress.tsx    # Progress indicator
│   └── ScrollToTop.tsx       # Back-to-top button
├── App.tsx                   # Main application
├── index.css                 # Global styles & animations
└── main.tsx                  # Entry point
```

## 🎯 Key Components

### Custom Button Classes

#### `.btn-cut`
Large buttons with 12px octagonal cuts
```css
clip-path: polygon(
  12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px),
  calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px
);
```

#### `.btn-cut-border`
Outline variant with pseudo-element inner fill
```css
position: relative;
background: white;
/* Includes ::before pseudo-element for border effect */
```

#### `.btn-cut-sm`
Small social buttons with 8px cuts

### Animation Classes

#### `.anim-stagger`
Fade-up entrance animation
```css
opacity: 0;
animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
```

#### `.anim-fade`
Simple fade-in animation

## 📊 Content Overview

### Services
1. **AI Engineering** - ML models, NLP, computer vision
2. **Web Development** - Modern frameworks, performance optimization
3. **Creative Design** - Visual identity, motion design
4. **Automation Systems** - Workflow optimization, integrations
5. **Cloud Infrastructure** - AWS, Docker, Kubernetes
6. **Brand Identity** - Strategy, visual systems, guidelines

### Featured Projects
1. **Nexus Commerce** - E-commerce platform (GlobalRetail Inc.)
2. **Aurora Health** - Healthcare AI platform (MediCare Partners)
3. **Quantum Finance** - Trading intelligence (Meridian Capital)
4. **EduVerse Platform** - Learning platform (Global Learning Network)
5. **VelocityAI Logistics** - Supply chain optimization (TransWorld Shipping)
6. **Stellar Brand Studio** - Asset management (Stellar Creative Co.)

### Statistics
- **240+** Completed Projects
- **38** Countries Served
- **85+** Team Members
- **98%** Client Satisfaction
- **8** Years of Excellence
- **24** Industry Awards

## 🌐 Technology Stack

### Frontend
- React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js

### Backend
- Node.js, Python, Express, FastAPI, GraphQL, REST APIs

### AI & ML
- TensorFlow, PyTorch, OpenAI, LangChain, Hugging Face, scikit-learn

### Database
- PostgreSQL, MongoDB, Redis, Supabase, Firebase, Pinecone

### DevOps
- AWS, Docker, Kubernetes, GitHub Actions, Terraform, Vercel

### Animation
- GSAP, Lottie, Rive, WebGL, Canvas API, SVG

## 🏆 Design Principles

### Visual Language
- **Luxury**: Premium aesthetic matching Apple and Linear quality
- **Minimal**: Clean, focused design with purposeful whitespace
- **Dark**: Black background with light UI elements
- **Glassmorphic**: Frosted glass effects throughout
- **Modern**: Contemporary design trends and best practices

### Motion Design
- **Smooth**: Cubic-bezier easing for natural movement
- **Purposeful**: Animations guide attention and hierarchy
- **Performance**: GPU-accelerated transforms only
- **Accessible**: Respects prefers-reduced-motion

### Content Strategy
- **Authentic**: No Lorem Ipsum - all real, believable content
- **Professional**: Business-appropriate language and tone
- **Detailed**: Complete case studies with real metrics
- **Global**: International clients and perspectives

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: > 1440px

## ♿ Accessibility

- Semantic HTML5 structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Color contrast compliance
- Screen reader friendly

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🗄️ Backend & Database

### Supabase Integration
- **Database**: PostgreSQL with 15 production tables
- **Authentication**: Admin-only access with RLS
- **Storage**: Media buckets for images
- **Real-time**: Live updates for admin dashboard
- **Security**: Row Level Security on all tables

### Setup Instructions

1. **Create Supabase Project**
```bash
# Visit https://supabase.com and create a new project
```

2. **Run Database Schema**
```bash
# In Supabase SQL Editor, run:
# - supabase/schema.sql
# - supabase/seed.sql
```

3. **Configure Environment**
```bash
# Create .env file
cp .env.example .env

# Add your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. **Create Storage Buckets**
- projects
- testimonials
- media
- general

### Database Tables
- `admins` - Admin user accounts
- `users` - Website visitors
- `projects` - Portfolio projects
- `services` - Service offerings
- `statistics` - Key metrics
- `testimonials` - Client reviews
- `faq` - FAQ items
- `messages` - Contact form submissions
- `newsletter` - Email subscribers
- `media` - Uploaded files
- `website_settings` - Site configuration
- `seo` - SEO metadata
- And more...

## 🔐 Security Features

- ✅ Row Level Security (RLS) enabled
- ✅ Input validation and sanitization
- ✅ SQL injection protection
- ✅ XSS protection
- ✅ Secure authentication
- ✅ Environment variable management
- ✅ Service role key never exposed
- ✅ Public forms: INSERT only
- ✅ Admin dashboard: Full CRUD access

## 📝 Forms & Functionality

### Contact Form
- Validates email format
- Sanitizes inputs
- Saves to database
- Toast notifications
- Success/error handling

### Newsletter Subscription
- Duplicate email detection
- Reactivation of inactive subscriptions
- Email validation
- Database persistence

## 📄 License

This is a fictional company website created for demonstration purposes.

## 🙏 Credits

**Design & Development**: Premium creative technology showcase
**Fonts**: Inter by Rasmus Andersson
**Icons**: Lucide React
**Animation**: Framer Motion
**Backend**: Supabase
**Form Management**: React Hook Form
**Notifications**: React Hot Toast

---

**Built with ❤️ for Awwwards-level quality**

**Frontend**: React 19 + TypeScript + Tailwind CSS
**Backend**: Supabase (PostgreSQL + Auth + Storage)
**Deployment Ready**: Production-grade architecture

© 2026 VORTX. All rights reserved.
